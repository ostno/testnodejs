import { CurrencyInfos } from "./market.service";
import { CURRENCIES } from "./currencies";

export const CURRENCY_TITLE: { [key: string]: string } = {
    rank: 'Rank',
    abbr: 'Coin',
    name: 'Name',
    price: 'Price',
    change1h: 'Change 1H',
    change24h: 'Change 24H',
    change7d: 'Change 7D',
    marketCap: 'Market Cap',
    volume24h: 'Volume 24H',
}

export interface Units {
    price: string,
    change1h: string,
    change24h: string,
    change7d: string,
    marketCap: string,
    volume24h: string
}

const Table = require('cli-table3');

export class FormatTableService {

    table: any;
    headerIds = ['rank', 'abbr', 'name', 'price', 'change1h', 'change24h', 'change7d', 'marketCap', 'volume24h'];
    units: Units = {
        price: 'USD',
        change1h: '%',
        change24h: '%',
        change7d: '%',
        marketCap: 'USD',
        volume24h: 'USD'
    };

    create(rows: CurrencyInfos[]) {
        this.format();
        rows.forEach(infos => {
            const row = this.getArrayOfCurrenciesInfos(infos);
            this.table.push(row);
        });
    }

    format() {
        this.table = new Table({
            head: this.getHead()
        });
    }

    getArrayOfCurrenciesInfos(currencyInfos: CurrencyInfos): any[] {
        return this.headerIds.map(id => this.formatData(id, currencyInfos[id as keyof CurrencyInfos]));
    }

    formatData(id: string, value: number | string): any {
        let updatedValue = value;
        const symbol = this.getCurrencySymbol();
        switch (id) {
            case 'rank':
                updatedValue = '#' + value;
                break
            case 'price':
                updatedValue = symbol + '' + value;
                break;
            case 'marketCap':
                updatedValue = symbol + '' + value;
                break;
            case 'volume24h':
                updatedValue = symbol + '' + value;
                break;
        }
        return updatedValue;
    }

    getCurrencySymbol(): string {
        const abbr = this.units.price.toLowerCase();
        return CURRENCIES[abbr];
    }

    getHead() {
        return this.headerIds.map((x: string) => {
            let title = CURRENCY_TITLE[x];
            if (this.units[x as keyof Units]) {
                title += ` (${this.units[x as keyof Units]})`
            }
            return title;
        });
    }

    get() {
        return this.table;
    }

    setCurrencyUnit(currency: string) {
        this.units.price = currency.toUpperCase();
        this.units.marketCap = currency.toUpperCase();
        this.units.volume24h = currency.toUpperCase();
    }

}