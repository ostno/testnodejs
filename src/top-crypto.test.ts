import { TopCrypto } from "./top-crypto";

describe('TopCrypto', () => {

    let topCrypto: TopCrypto;

    // To prevent console.log to be called (best would be to use proper mocks)
    let logSpy: jest.SpyInstance = jest.spyOn(console, 'log').mockImplementation(() => { });

    beforeEach(() => {
        topCrypto = new TopCrypto();
    });

    describe('init', () => {
        test('should show header, get list of currencies, set options and run', async () => {

            const spyDisplay = jest.spyOn(topCrypto.displayService, 'showHeader').mockImplementation(async () => { });
            const spyGetList = jest.spyOn(topCrypto, 'getListOfCurrencies').mockImplementation(async () => { });
            const sypSetOptions = jest.spyOn(topCrypto, 'setOptions').mockImplementation(() => { });
            const spyRun = jest.spyOn(topCrypto, 'run').mockImplementation(async () => { });

            await topCrypto.init();

            await expect(spyDisplay).toHaveBeenCalled();
            expect(spyGetList).toHaveBeenCalled();
            expect(sypSetOptions).toHaveBeenCalled();
            expect(spyRun).toHaveBeenCalled();

        });
    });

    describe('setSymbols', () => {
        test('should set options.abbrs as array from string aa,bb,cc', () => {
            topCrypto.setSymbols('aa,bb,cc')
            expect(topCrypto.options.abbrs).toEqual(['aa', 'bb', 'cc']);
        });
        test('should throw an error if string contain other char than alpha and comma', () => {
            expect(() => { topCrypto.setSymbols('aa,bb,cc"') }).toThrowError();
        });
    });

    describe('print', () => {
        test('should create table, clear screen and console log', async () => {
            const spyCreate = jest.spyOn(topCrypto.formatTableService, 'create').mockImplementation(() => { });
            const spyClear = jest.spyOn(topCrypto.displayService, 'clear').mockImplementation(() => { });
            const spyGetTable = jest.spyOn(topCrypto.formatTableService, 'get').mockImplementation(() => { return 'fakeoutput' });
            topCrypto.print();
            expect(spyCreate).toHaveBeenCalled();
            expect(spyClear).toHaveBeenCalled();
            expect(logSpy).toHaveBeenCalledWith('fakeoutput');
        });
    });

    describe('run', () => {
        test('should call fetch and print', async () => {
            const fetchSpy = jest.spyOn(topCrypto, 'fetch')
                .mockImplementation(async () => { return {} as any });
            const spyPrint = jest.spyOn(topCrypto, 'print').mockImplementation(async () => { });
            await topCrypto.run();
            await expect(fetchSpy).toHaveBeenCalled();
            await expect(spyPrint).toHaveBeenCalled();
        });
    });

    describe('fetch', () => {
        test('should call API to get market', async () => {
            const getMarketSpy = jest.spyOn(topCrypto.marketService, 'getMarket')
                .mockImplementation(async () => { return {} as any });
            await topCrypto.fetch();
            await expect(getMarketSpy).toHaveBeenCalled();
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    })

});
