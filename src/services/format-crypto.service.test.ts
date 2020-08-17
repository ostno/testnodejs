import { FormatCryptoService } from "./format-crypto.service";
import { TopCryptoOptions } from "../top-crypto-options";
import { marketDataMock } from "../mocks/market-data-mock";

const { Table } = require("console-table-printer");

describe('formatTable', () => {

    let service: FormatCryptoService;
    let options: TopCryptoOptions = {
        currency: 'EUR',
        currencies: [],
        refresh: 10,
        help: false,
        alternative: false,
        filter: '',
        order: 'rank'
    };
    let spyOrder: jest.SpyInstance;
    let spyFilter: jest.SpyInstance;
    let spyCreate: jest.SpyInstance;
    let spyPrint: jest.SpyInstance;

    function setSpy() {
        spyOrder = jest.spyOn(service, 'order').mockImplementation(() => marketDataMock);
        spyFilter = jest.spyOn(service, 'filter').mockImplementation(() => marketDataMock);
        spyCreate = jest.spyOn(service, 'createTable').mockImplementation(() => []);
        spyPrint = jest.spyOn(service, 'printTable').mockImplementation(() => []);
    }

    beforeEach(() => {
        service = new FormatCryptoService;
        jest.spyOn(service, 'printTable').mockImplementation(() => { });
    });

    describe('setAndPrint', () => {
        test('should order and filter rows if option set', () => {
            setSpy();
            options.filter = 'rank>3';
            service.setAndPrint(marketDataMock, options);
            expect(spyOrder).toHaveBeenCalledWith('rank', marketDataMock);
            expect(spyFilter).toHaveBeenCalledWith('rank>3', marketDataMock);
        });
        test('should create table and print', () => {
            setSpy();
            service.setAndPrint(marketDataMock, options);
            expect(spyCreate).toHaveBeenCalled();
            expect(spyPrint).toHaveBeenCalled();
        });
    });

    describe('filter', () => {
        test('should throw error if invalid', () => {
            let filter = 'fake>3';
            expect(() => { service.filter(filter, marketDataMock) }).toThrowError();
            filter = 'rank*3';
            expect(() => { service.filter(filter, marketDataMock) }).toThrowError();
        });
    });

    describe('order', () => {
        test('should throw error if invalid', () => {
            let order = 'fake';
            expect(() => { service.order(order, marketDataMock) }).toThrowError();
        });
    });

})