import { TopCryptoOptions } from "../top-crypto-options";
import { CurrencyInfos } from "../currency-info";
import { NetworkService } from "./network.service";
import { CoinList } from "../helpers/coin-list";

export class MarketService {
    coinGeckoURL = 'https://api.coingecko.com/api/v3/';
    alternativeURL = 'https://api.alternative.me/v2/';

    networkService = new NetworkService();

    async getCoinGeckoMarket(options: TopCryptoOptions): Promise<CurrencyInfos[]> {
        let infos: CurrencyInfos[] = [];
        const currencySymbols = options.currencies.map(symbol => this.getCryptoIdFromSymbol(symbol));
        try {
            const url = this.coinGeckoURL +
                'coins/markets?vs_currency=' +
                options.currency +
                '&ids=' +
                currencySymbols.join() +
                '&price_change_percentage=1h%2C24h%2C7d';
            const response = await this.networkService.get(url);
            if (!response.data) {
                throw new Error('API error');
            }
            response.data.forEach((currencyDetails: any) => {
                infos.push(this.selectedPropertiesFromCoinGeckoAnswer(currencyDetails));
            });
        } catch (e) {
            console.error(e);
        }
        return infos;
    }


    getCryptoIdFromSymbol(abbr: string): string {
        let id = '';
        for (let i = 0; i < CoinList.length; i++) {
            const elem = CoinList[i];
            if (elem.symbol === abbr) {
                id = elem.id;
                break;
            }
        }
        return id;
    }


    selectedPropertiesFromCoinGeckoAnswer(element: any): CurrencyInfos {
        return {
            rank: element.market_cap_rank,
            abbr: element.symbol,
            name: element.name,
            price: element.current_price,
            change1h: element.price_change_percentage_1h_in_currency,
            change24h: element.price_change_percentage_24h_in_currency,
            change7d: element.price_change_percentage_7d_in_currency,
            marketCap: element.market_cap,
            volume24h: element.total_volume,
        }
    }

    async getAlternativeMarket(options: TopCryptoOptions): Promise<CurrencyInfos[]> {
        let infos: CurrencyInfos[] = [];
        try {
            const url = `${this.alternativeURL}ticker/?structure=array&convert=${options.currency}`
            const response = await this.networkService.get(url);
            if (!response.data) {
                throw new Error('API error');
            }
            response.data.data.forEach((currencyDetails: any) => {
                if (options.currencies.indexOf(currencyDetails.symbol.toLowerCase()) !== -1) {
                    infos.push(this.selectedPropertiesFromAlternativeAnswer(currencyDetails, options.currency));
                }
            });
        } catch (e) {
            console.error(e);
        }
        return infos;
    }

    selectedPropertiesFromAlternativeAnswer(element: any, currency: string): CurrencyInfos {
        return {
            rank: element.rank,
            abbr: element.symbol,
            name: element.name,
            price: element.quotes[currency].price,
            change1h: element.quotes[currency].percent_change_1h,
            change24h: element.quotes[currency].percent_change_24h,
            change7d: element.quotes[currency].percent_change_7d,
            marketCap: element.quotes[currency].market_cap,
            volume24h: element.quotes[currency].volume_24h,
        }
    }



}