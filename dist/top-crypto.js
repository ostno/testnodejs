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
exports.TopCrypto = void 0;
var market_service_1 = require("./services/market.service");
var format_table_service_1 = require("./services/format-table.service");
var display_service_1 = require("./services/display.service");
var argv = require('yargs').argv;
var TopCrypto = /** @class */ (function () {
    function TopCrypto() {
        this.options = {
            currency: 'usd',
            abbrs: [],
            ids: [],
            refresh: false,
            refreshInterval: 0,
        };
        this.marketService = new market_service_1.MarketService();
        this.formatTableService = new format_table_service_1.FormatTableService();
        this.displayService = new display_service_1.DisplayService();
        this.marketData = [];
    }
    TopCrypto.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.displayService.showHeader();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.getListOfCurrencies()];
                    case 2:
                        _a.sent();
                        this.setOptions();
                        return [4 /*yield*/, this.run()];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        e_1 = _a.sent();
                        this.displayService.showHelp();
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    TopCrypto.prototype.getCryptoIdFromSymbol = function (abbr) {
        var id = '';
        for (var i = 0; i < this.marketService.coinList.length; i++) {
            var elem = this.marketService.coinList[i];
            if (elem.symbol === abbr) {
                id = elem.id;
                break;
            }
        }
        return id;
    };
    TopCrypto.prototype.getListOfCurrencies = function () {
        return this.marketService.getCoinList();
    };
    TopCrypto.prototype.setOptions = function () {
        if (!argv._[0] || argv._[0] === '') {
            throw new Error('wrong_options');
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
    };
    TopCrypto.prototype.setSymbols = function (abbrs) {
        if (abbrs && /^[a-zA-Z,]+$/.test(abbrs)) {
            this.options.abbrs = abbrs.split(',');
        }
        else {
            throw new Error('wrong_options');
        }
    };
    TopCrypto.prototype.checkSafeSymbols = function () {
        var _this = this;
        this.options.abbrs.forEach(function (abbr) {
            if (_this.marketService.allowedSymbols.indexOf(abbr) === -1) {
                throw new Error('wrong_abbr');
            }
            else {
                _this.options.ids.push(_this.getCryptoIdFromSymbol(abbr));
            }
        });
    };
    TopCrypto.prototype.print = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.formatTableService.create(this.marketData);
                this.displayService.clear();
                this.displayService.showHeader();
                console.log(this.formatTableService.get().toString());
                return [2 /*return*/];
            });
        });
    };
    TopCrypto.prototype.run = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fetch()];
                    case 1:
                        _a.sent();
                        this.print();
                        if (this.options.refresh) {
                            setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.run()];
                                        case 1:
                                            _a.sent();
                                            console.log('Refreshed : ' + new Date());
                                            return [2 /*return*/];
                                    }
                                });
                            }); }, this.options.refreshInterval);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    TopCrypto.prototype.fetch = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.marketService.getMarket(this.options)];
                    case 1:
                        _a.marketData = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return TopCrypto;
}());
exports.TopCrypto = TopCrypto;
