import { TopCrypto } from "./top-crypto";
import { marketDataMock } from "./mocks/market-data-mock";

describe('TopCrypto', () => {

    let topCrypto: TopCrypto;
    let getAndDisplaySpy: jest.SpyInstance;
    const options: any = {
        currency: 'EUR',
        currencies: [],
        refresh: 0,
        help: false,
        alternative: false,
        filter: '',
        order: 'rank'
    }

    beforeEach(() => {
        topCrypto = new TopCrypto(options);
        getAndDisplaySpy = jest.spyOn(topCrypto, 'getAndDisplay').mockImplementation();
    });

    describe('run', () => {
        test('should show help if help option set', async () => {
            const spy = jest.spyOn(topCrypto.displayService, 'showHelp').mockImplementation(() => { });
            topCrypto.options.help = true;
            await topCrypto.run();
            await expect(spy).toHaveBeenCalled();
        });
        test('should call currency and update title in format service', async () => {
            topCrypto.options.currencies = ['btc'];
            topCrypto.options.help = false;
            const spy = jest.spyOn(topCrypto.formatService, 'setCurrencyUnit').mockImplementation(() => { });
            const spyUpdateTitle = jest.spyOn(topCrypto.formatService, 'updateTitle').mockImplementation(() => { });
            await topCrypto.run();
            await expect(spy).toHaveBeenCalled();
            await expect(spyUpdateTitle).toHaveBeenCalled();
        });
        test('should call get and display', async () => {
            await topCrypto.run();
            await expect(getAndDisplaySpy).toHaveBeenCalled();
        });
        test('should call get and display every second if refresh option is set to 1', async () => {
            topCrypto.options.refresh = 1;
            jest.useFakeTimers();
            await topCrypto.run();
            jest.advanceTimersByTime(3200);
            // One call initially then one every second
            await expect(getAndDisplaySpy).toHaveBeenCalledTimes(4);
        });
    });

    describe('getAndDisplay', () => {
        test('should get data from alternative (or coingecko) depending on options', async () => {
            getAndDisplaySpy.mockRestore();
            jest.spyOn(topCrypto.formatService, 'setAndPrint').mockImplementation();
            jest.spyOn(topCrypto.displayService, 'clear').mockImplementation();
            const spy = jest.spyOn(topCrypto.marketService, 'getCoinGeckoMarket').mockImplementation(async () => marketDataMock);
            await topCrypto.getAndDisplay();
            await expect(spy).toHaveBeenCalled();


            const spyAlternative = jest.spyOn(topCrypto.marketService, 'getAlternativeMarket').mockImplementation(async () => marketDataMock);
            topCrypto.options.alternative = true;
            await topCrypto.getAndDisplay();
            await expect(spyAlternative).toHaveBeenCalled();
        });
        test('should call clear and setAndPrint', async () => {
            getAndDisplaySpy.mockRestore();
            const spySetAndPrint = jest.spyOn(topCrypto.formatService, 'setAndPrint').mockImplementation();
            const spyClear = jest.spyOn(topCrypto.displayService, 'clear').mockImplementation();
            await topCrypto.getAndDisplay();
            await expect(spySetAndPrint).toHaveBeenCalled();
            await expect(spyClear).toHaveBeenCalled();
        });

    });

});
