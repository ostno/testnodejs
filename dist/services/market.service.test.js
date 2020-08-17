"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var market_service_1 = require("./market.service");
var network_service_mock_1 = require("../mocks/services/network.service.mock");
var market_data_mock_1 = require("../mocks/market-data-mock");
describe('MarketService', function () {
    var service;
    beforeEach(function () {
        service = new market_service_1.MarketService();
        service.networkService = new network_service_mock_1.NetworkServiceMock();
    });
    describe('Verify url', function () {
        test('coinGeckoURL : https://api.coingecko.com/api/v3', function () {
            expect(service.coinGeckoURL).toEqual('https://api.coingecko.com/api/v3/');
        });
        test('alternativeURL : https://api.alternative.me/v2/', function () {
            expect(service.alternativeURL).toEqual('https://api.alternative.me/v2/');
        });
    });
    describe('getCoinGeckoMarket', function () {
        test('should send proper url to network service', function () { return __awaiter(void 0, void 0, void 0, function () {
            var spy, options, url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        spy = jest.spyOn(service.networkService, 'get')
                            .mockImplementation(function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                            return [2 /*return*/, { data: [market_data_mock_1.marketDataMock] }];
                        }); }); });
                        options = {
                            currency: 'EUR',
                            currencies: ['btc'],
                            refresh: 10,
                            help: false,
                            alternative: false,
                            filter: '',
                            order: 'rank'
                        };
                        return [4 /*yield*/, service.getCoinGeckoMarket(options)];
                    case 1:
                        _a.sent();
                        url = service.coinGeckoURL + 'coins/markets?vs_currency=EUR&ids=bitcoin&price_change_percentage=1h%2C24h%2C7d';
                        expect(spy).toHaveBeenCalledWith(url);
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
