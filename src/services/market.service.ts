import axios from 'axios';
import { Options } from '../top-crypto';

export interface CurrencyInfos {
    rank: number;
    abbr: string;
    name: string;
    price: number;
    change1h: number;
    change24h: number;
    change7d: number;
    marketCap: number;
    volume24h: number;
}

export class MarketService {

    baseUrl = 'https://api.coingecko.com/api/v3/';
    coinList: {
        id: string,
        symbol: string,
        name: string
    }[] = [];
    allowedSymbols: string[] = [];

    async getCoinList() {

        try {
            const url = this.baseUrl + 'coins/list';
            const response: any = await axios.get(url);
            this.coinList = response.data;
            this.coinList.forEach(({ symbol }) => {
                this.allowedSymbols.push(symbol);
            });
        } catch (e) {
            console.error(e);
        }

    }

    async getMarket(options: Options): Promise<CurrencyInfos[]> {
        let infos: CurrencyInfos[] = [];
        try {
            const url = this.baseUrl +
                'coins/markets?vs_currency=' +
                options.currency +
                '&ids=' +
                options.ids.join() +
                '&price_change_percentage=1h%2C24h%2C7d';
            const response = await axios.get(url);
            response.data.forEach((currencyDetails: any) => {
                infos.push(this.selectedProperties(currencyDetails));
            });
        } catch (e) {
            console.error(e);
        }
        return infos;
    }

    selectedProperties(element: any): CurrencyInfos {
        return {
            rank: element.market_cap_rank,
            abbr: element.symbol,
            name: element.name,
            price: element.current_price,
            change1h: element.price_change_percentage_1h_in_currency,
            change24h: element.price_change_percentage_24h_in_currency,
            change7d: element.price_change_percentage_7d_in_currency,
            marketCap: element.market_cap,
            volume24h: element.high_24h,
        }
    }

}
