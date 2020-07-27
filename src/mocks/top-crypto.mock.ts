import { MarketServiceMock } from "./services/market.service.mock";
import { FormatTableServiceMock } from "./services/format-table.service.mock";
import { DisplayServiceMock } from "./services/display.service.mock";
import { CurrencyInfos, MarketService } from "../services/market.service";
import { FormatTableService } from "../services/format-table.service";
import { DisplayService } from "../services/display.service";

export interface Options {
    currency: string,
    abbrs: string[],
    ids: string[],
    refresh: boolean,
    refreshInterval: number,
}

export class TopCryptoMock {

    options: Options = {
        currency: 'USD',
        abbrs: [],
        ids: [],
        refresh: false,
        refreshInterval: 0,
    };

    marketService: MarketService = new MarketService();
    formatTableService: FormatTableService = new FormatTableServiceMock();
    displayService: DisplayService = new DisplayServiceMock();


    marketData: CurrencyInfos[] = [];

    setSymbols(abbrs: string) {
    }

    checkSafeSymbols() {
    }

    getCryptoIdFromSymbol(abbr: string): string {
        let id = '';
        return id;
    }

    getListOfCurrencies() {
        return this.marketService.getCoinList();
    }

    setOptions() {
    }

    async fetch() {
    }

    async print() {
    }

    async run() {
    }

    printTable(output: any) {
    }

}

