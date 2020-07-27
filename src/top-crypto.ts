import { MarketService, CurrencyInfos } from './services/market.service';
import { FormatTableService } from './services/format-table.service';
import { DisplayService } from './services/display.service';
var argv = require('yargs').argv;

export interface Options {
    currency: string,
    abbrs: string[],
    ids: string[],
    refresh: boolean,
    refreshInterval: number,
}

export class TopCrypto {

    options: Options = {
        currency: 'usd',
        abbrs: [], // ex: btc
        ids: [],
        refresh: false,
        refreshInterval: 0,
    };

    marketService: MarketService = new MarketService();
    formatTableService: FormatTableService = new FormatTableService();
    displayService: DisplayService = new DisplayService();

    marketData: CurrencyInfos[] = [];

    async init() {
        this.displayService.showHeader();
        await this.getListOfCurrencies();
        this.setOptions();
        await this.run();
    }

    getListOfCurrencies() {
        return this.marketService.getCoinList();
    }

    setOptions() {

        if (!argv._[0] || argv._[0] === '') {
            throw new Error('wrong_options')
        }

        this.setSymbols(argv._[0]);
        this.checkSafeSymbols();

        if (argv.currency) {
            this.options.currency = argv.currency.toLowerCase();
            this.formatTableService.setCurrencyUnit(this.options.currency);
        }
        if (argv.refresh) {
            this.options.refresh = true;
            this.options.refreshInterval = Number(argv.refresh) * 1000;
        }

    }

    setSymbols(abbrs: string) {
        if (abbrs && /^[a-zA-Z,]+$/.test(abbrs)) {
            this.options.abbrs = abbrs.split(',');
        } else {
            throw new Error('wrong_options')
        }
    }

    checkSafeSymbols() {
        this.options.abbrs.forEach(abbr => {
            if (this.marketService.allowedSymbols.indexOf(abbr) === -1) {
                throw new Error('wrong_abbr')
            } else {
                this.options.ids.push(this.getCryptoIdFromSymbol(abbr));
            }
        });
    }

    getCryptoIdFromSymbol(abbr: string): string {
        let id = '';
        for (let i = 0; i < this.marketService.coinList.length; i++) {
            const elem = this.marketService.coinList[i];
            if (elem.symbol === abbr) {
                id = elem.id;
                break;
            }
        }
        return id;
    }

    async run() {

        await this.fetch();
        this.print();

        if (this.options.refresh) {
            setTimeout(async () => {
                await this.run();
                console.log('Refreshed : ' + new Date())
            }, this.options.refreshInterval);
        }

    }

    async fetch() {
        this.marketData = await this.marketService.getMarket(this.options);
    }

    async print() {
        this.formatTableService.create(this.marketData);
        this.displayService.clear();
        this.displayService.showHeader();
        console.log(this.formatTableService.get().toString());
    }

}

