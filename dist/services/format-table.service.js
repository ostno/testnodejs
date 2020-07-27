"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormatTableService = exports.CURRENCY_TITLE = void 0;
var currencies_1 = require("./currencies");
exports.CURRENCY_TITLE = {
    rank: 'Rank',
    abbr: 'Coin',
    name: 'Name',
    price: 'Price',
    change1h: 'Change 1H',
    change24h: 'Change 24H',
    change7d: 'Change 7D',
    marketCap: 'Market Cap',
    volume24h: 'Volume 24H',
};
var Table = require('cli-table3');
var FormatTableService = /** @class */ (function () {
    function FormatTableService() {
        this.headerIds = ['rank', 'abbr', 'name', 'price', 'change1h', 'change24h', 'change7d', 'marketCap', 'volume24h'];
        this.units = {
            price: 'USD',
            change1h: '%',
            change24h: '%',
            change7d: '%',
            marketCap: 'USD',
            volume24h: 'USD'
        };
    }
    FormatTableService.prototype.create = function (rows) {
        var _this = this;
        this.format();
        rows.forEach(function (infos) {
            var row = _this.getArrayOfCurrenciesInfos(infos);
            _this.table.push(row);
        });
    };
    FormatTableService.prototype.format = function () {
        this.table = new Table({
            head: this.getHead()
        });
    };
    FormatTableService.prototype.getArrayOfCurrenciesInfos = function (currencyInfos) {
        var _this = this;
        return this.headerIds.map(function (id) { return _this.formatData(id, currencyInfos[id]); });
    };
    FormatTableService.prototype.formatData = function (id, value) {
        var updatedValue = value;
        var symbol = this.getCurrencySymbol();
        switch (id) {
            case 'rank':
                updatedValue = '#' + value;
                break;
            case 'price':
                updatedValue = symbol + '' + value;
                break;
            case 'marketCap':
                updatedValue = symbol + '' + value;
                break;
            case 'volume24h':
                updatedValue = symbol + '' + value;
                break;
        }
        return updatedValue;
    };
    FormatTableService.prototype.getCurrencySymbol = function () {
        var abbr = this.units.price.toLowerCase();
        return currencies_1.CURRENCIES[abbr];
    };
    FormatTableService.prototype.getHead = function () {
        var _this = this;
        return this.headerIds.map(function (x) {
            var title = exports.CURRENCY_TITLE[x];
            if (_this.units[x]) {
                title += " (" + _this.units[x] + ")";
            }
            return title;
        });
    };
    FormatTableService.prototype.get = function () {
        return this.table;
    };
    FormatTableService.prototype.setCurrencyUnit = function (currency) {
        this.units.price = currency.toUpperCase();
        this.units.marketCap = currency.toUpperCase();
        this.units.volume24h = currency.toUpperCase();
    };
    return FormatTableService;
}());
exports.FormatTableService = FormatTableService;
