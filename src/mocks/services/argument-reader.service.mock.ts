import { TopCryptoOptions } from "../../top-crypto-options";

export class ArgumentReaderServiceMock {
    argv: any;
    get(): TopCryptoOptions {
        return {
            currency: 'EUR',
            currencies: [],
            refresh: 10,
            help: false,
            alternative: false,
            filter: '',
            order: 'rank'
        };
    }
    getOptions(str: string[]): TopCryptoOptions{
        return {
            currency: 'EUR',
            currencies: [],
            refresh: 10,
            help: false,
            alternative: false,
            filter: '',
            order: 'rank'
        };
    }
}