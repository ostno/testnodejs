import { Units } from "../../services/format-table.service";
import { CurrencyInfos } from "../../services/market.service";

export class FormatTableServiceMock {

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
    }

    format() {
    }

    getArrayOfCurrenciesInfos(currencyInfos: CurrencyInfos): any[] {
        return [];
    }

    formatData(id: string, value: number | string): any {
        return '';
    }

    getCurrencySymbol() {
        return '$';
    }

    getHead() {
        return [];
    }

    get() {
    }

    setCurrencyUnit(currency: string) {
    }

}