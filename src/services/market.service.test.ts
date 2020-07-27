// The http requests are not mocked here, as we contact a third-party API it is good to check the data
import { MarketService, CurrencyInfos } from "./market.service";
import { Options } from "../top-crypto";

describe('MarketService', () => {

    let api: MarketService;

    beforeEach(() => {
        api = new MarketService();
    });

    describe('getMarket', () => {
        test('should return an array of currencies data given an array of currencies from coinGecko', async () => {
            const options: Options = {
                currency: 'usd',
                abbrs: ['bitcoin'],
                ids: ['01coin'],
                refresh: false,
                refreshInterval: 0,
            }
            const answer = await api.getMarket(options);
            await expect(answer.length).toBe(1);

            const expected: CurrencyInfos = {
                rank: expect.any(Number),
                abbr: expect.any(String),
                name: expect.any(String),
                price: expect.any(Number),
                change1h: expect.any(Number),
                change24h: expect.any(Number),
                change7d: expect.any(Number),
                marketCap: expect.any(Number),
                volume24h: expect.any(Number),
            }
            await expect(answer[0]).toMatchObject(expected);

        });
    });

});
