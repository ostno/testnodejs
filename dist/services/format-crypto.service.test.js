"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var format_crypto_service_1 = require("./format-crypto.service");
var market_data_mock_1 = require("../mocks/market-data-mock");
var Table = require("console-table-printer").Table;
describe('formatTable', function () {
    var service;
    var options = {
        currency: 'EUR',
        currencies: [],
        refresh: 10,
        help: false,
        alternative: false,
        filter: '',
        order: 'rank'
    };
    var spyOrder;
    var spyFilter;
    var spyCreate;
    var spyPrint;
    function setSpy() {
        spyOrder = jest.spyOn(service, 'order').mockImplementation(function () { return market_data_mock_1.marketDataMock; });
        spyFilter = jest.spyOn(service, 'filter').mockImplementation(function () { return market_data_mock_1.marketDataMock; });
        spyCreate = jest.spyOn(service, 'createTable').mockImplementation(function () { return []; });
        spyPrint = jest.spyOn(service, 'printTable').mockImplementation(function () { return []; });
    }
    beforeEach(function () {
        service = new format_crypto_service_1.FormatCryptoService;
        jest.spyOn(service, 'printTable').mockImplementation(function () { });
    });
    describe('setAndPrint', function () {
        test('should order and filter rows if option set', function () {
            setSpy();
            options.filter = 'rank>3';
            service.setAndPrint(market_data_mock_1.marketDataMock, options);
            expect(spyOrder).toHaveBeenCalledWith('rank', market_data_mock_1.marketDataMock);
            expect(spyFilter).toHaveBeenCalledWith('rank>3', market_data_mock_1.marketDataMock);
        });
        test('should create table and print', function () {
            setSpy();
            service.setAndPrint(market_data_mock_1.marketDataMock, options);
            expect(spyCreate).toHaveBeenCalled();
            expect(spyPrint).toHaveBeenCalled();
        });
    });
    describe('filter', function () {
        test('should throw error if invalid', function () {
            var filter = 'fake>3';
            expect(function () { service.filter(filter, market_data_mock_1.marketDataMock); }).toThrowError();
            filter = 'rank*3';
            expect(function () { service.filter(filter, market_data_mock_1.marketDataMock); }).toThrowError();
        });
    });
    describe('order', function () {
        test('should throw error if invalid', function () {
            var order = 'fake';
            expect(function () { service.order(order, market_data_mock_1.marketDataMock); }).toThrowError();
        });
    });
});
