"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormatTableServiceMock = void 0;
var FormatTableServiceMock = /** @class */ (function () {
    function FormatTableServiceMock() {
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
    FormatTableServiceMock.prototype.create = function (rows) {
    };
    FormatTableServiceMock.prototype.format = function () {
    };
    FormatTableServiceMock.prototype.getArrayOfCurrenciesInfos = function (currencyInfos) {
        return [];
    };
    FormatTableServiceMock.prototype.formatData = function (id, value) {
        return '';
    };
    FormatTableServiceMock.prototype.getCurrencySymbol = function () {
        return '$';
    };
    FormatTableServiceMock.prototype.getHead = function () {
        return [];
    };
    FormatTableServiceMock.prototype.get = function () {
    };
    FormatTableServiceMock.prototype.setCurrencyUnit = function (currency) {
    };
    return FormatTableServiceMock;
}());
exports.FormatTableServiceMock = FormatTableServiceMock;
