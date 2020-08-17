import { MarketService } from "./market.service";
import { NetworkServiceMock } from "../mocks/services/network.service.mock";
import { marketDataMock } from "../mocks/market-data-mock";

describe('MarketService', () => {

    let service: MarketService;

    beforeEach(() => {
        service = new MarketService();
        service.networkService = new NetworkServiceMock();
    });

    describe('Verify url', () => {
        test('coinGeckoURL : https://api.coingecko.com/api/v3', () => {
            expect(service.coinGeckoURL).toEqual('https://api.coingecko.com/api/v3/');
        });
        test('alternativeURL : https://api.alternative.me/v2/', () => {
            expect(service.alternativeURL).toEqual('https://api.alternative.me/v2/');
        });
    });

    describe('getCoinGeckoMarket', () => {
        test('should send proper url to network service', async () => {
            const spy = jest.spyOn(service.networkService, 'get')
                .mockImplementation(async () => { return { data: [marketDataMock] }; })
            const options = {
                currency: 'EUR',
                currencies: ['btc'],
                refresh: 10,
                help: false,
                alternative: false,
                filter: '',
                order: 'rank'
            };
            await service.getCoinGeckoMarket(options);
            const url = service.coinGeckoURL +'coins/markets?vs_currency=EUR&ids=bitcoin&price_change_percentage=1h%2C24h%2C7d';
            expect(spy).toHaveBeenCalledWith(url);
        });
       
    });

});