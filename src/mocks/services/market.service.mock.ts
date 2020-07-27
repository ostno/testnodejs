import { Options } from '../../top-crypto';

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

export class MarketServiceMock {

    baseUrl = 'https://api.coingecko.com/api/v3/';
    coinList: {
        id: string,
        symbol: string,
        name: string
    }[] = [];
    allowedSymbols: string[] = [];

    async getCoinList() {
    }

    async getMarket(options: Options): Promise<CurrencyInfos[]> {
        return [{
            rank: 0,
            abbr: 'usd',
            name: 'usd',
            price: 0,
            change1h: 0,
            change24h: 0,
            change7d: 0,
            marketCap: 0,
            volume24h: 0,
        }]
    }

    selectedProperties(element: any): CurrencyInfos {
        return {
            rank: 0,
            abbr: 'usd',
            name: 'usd',
            price: 0,
            change1h: 0,
            change24h: 0,
            change7d: 0,
            marketCap: 0,
            volume24h: 0,
        }
    }

}
