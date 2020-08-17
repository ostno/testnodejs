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
exports.MarketService = void 0;
var network_service_1 = require("./network.service");
var coin_list_1 = require("../helpers/coin-list");
var MarketService = /** @class */ (function () {
    function MarketService() {
        this.coinGeckoURL = 'https://api.coingecko.com/api/v3/';
        this.alternativeURL = 'https://api.alternative.me/v2/';
        this.networkService = new network_service_1.NetworkService();
    }
    MarketService.prototype.getCoinGeckoMarket = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var infos, currencySymbols, url, response, e_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        infos = [];
                        currencySymbols = options.currencies.map(function (symbol) { return _this.getCryptoIdFromSymbol(symbol); });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        url = this.coinGeckoURL +
                            'coins/markets?vs_currency=' +
                            options.currency +
                            '&ids=' +
                            currencySymbols.join() +
                            '&price_change_percentage=1h%2C24h%2C7d';
                        return [4 /*yield*/, this.networkService.get(url)];
                    case 2:
                        response = _a.sent();
                        if (!response.data) {
                            throw new Error('API error');
                        }
                        response.data.forEach(function (currencyDetails) {
                            infos.push(_this.selectedPropertiesFromCoinGeckoAnswer(currencyDetails));
                        });
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        console.error(e_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/, infos];
                }
            });
        });
    };
    MarketService.prototype.getCryptoIdFromSymbol = function (abbr) {
        var id = '';
        for (var i = 0; i < coin_list_1.CoinList.length; i++) {
            var elem = coin_list_1.CoinList[i];
            if (elem.symbol === abbr) {
                id = elem.id;
                break;
            }
        }
        return id;
    };
    MarketService.prototype.selectedPropertiesFromCoinGeckoAnswer = function (element) {
        return {
            rank: element.market_cap_rank,
            abbr: element.symbol,
            name: element.name,
            price: element.current_price,
            change1h: element.price_change_percentage_1h_in_currency,
            change24h: element.price_change_percentage_24h_in_currency,
            change7d: element.price_change_percentage_7d_in_currency,
            marketCap: element.market_cap,
            volume24h: element.total_volume,
        };
    };
    MarketService.prototype.getAlternativeMarket = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var infos, url, response, e_2;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        infos = [];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        url = this.alternativeURL + "ticker/?structure=array&convert=" + options.currency;
                        return [4 /*yield*/, this.networkService.get(url)];
                    case 2:
                        response = _a.sent();
                        if (!response.data) {
                            throw new Error('API error');
                        }
                        response.data.data.forEach(function (currencyDetails) {
                            if (options.currencies.indexOf(currencyDetails.symbol.toLowerCase()) !== -1) {
                                infos.push(_this.selectedPropertiesFromAlternativeAnswer(currencyDetails, options.currency));
                            }
                        });
                        return [3 /*break*/, 4];
                    case 3:
                        e_2 = _a.sent();
                        console.error(e_2);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/, infos];
                }
            });
        });
    };
    MarketService.prototype.selectedPropertiesFromAlternativeAnswer = function (element, currency) {
        return {
            rank: element.rank,
            abbr: element.symbol,
            name: element.name,
            price: element.quotes[currency].price,
            change1h: element.quotes[currency].percent_change_1h,
            change24h: element.quotes[currency].percent_change_24h,
            change7d: element.quotes[currency].percent_change_7d,
            marketCap: element.quotes[currency].market_cap,
            volume24h: element.quotes[currency].volume_24h,
        };
    };
    return MarketService;
}());
exports.MarketService = MarketService;
