"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormatCryptoService = void 0;
var currencies_1 = require("../helpers/currencies");
var Table = require("console-table-printer").Table;
var FormatCryptoService = /** @class */ (function () {
    function FormatCryptoService() {
        this.currencyTitle = {
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
    FormatCryptoService.prototype.setAndPrint = function (rows, options) {
        if (rows.length === 0) {
            throw new Error('No data to display, add -h to display options');
        }
        if (options.filter) {
            rows = this.filter(options.filter, rows);
        }
        if (options.order) {
            rows = this.order(options.order, rows);
        }
        var table = this.createTable(options, rows);
        this.printTable(table);
    };
    FormatCryptoService.prototype.createTable = function (options, rows) {
        var _this = this;
        var columns = [];
        this.headerIds.forEach(function (headerId) {
            columns.push({ name: _this.currencyTitle[headerId] });
        });
        var p = new Table({
            columns: columns,
            title: this.getTitle(options)
        });
        rows.forEach(function (row) {
            var newRow = {};
            _this.headerIds.forEach(function (headerId) {
                newRow[_this.currencyTitle[headerId]] = _this.formatData(headerId, row[headerId]);
            });
            p.addRow(newRow, { color: _this.setColor(row) });
        });
        return p;
    };
    FormatCryptoService.prototype.printTable = function (table) {
        table.printTable(table);
    };
    FormatCryptoService.prototype.getTitle = function (options) {
        var source = 'coingecko.com';
        if (options.alternative) {
            source = 'alternative.me';
        }
        var title = "Refreshed at " + new Date().toLocaleTimeString() + " from " + source;
        if (options.filter) {
            title = " Filter : " + options.filter + "  ---- " + title;
        }
        if (options.order) {
            title = "Order by \"" + options.order + "\" ---- " + title;
        }
        return title;
    };
    FormatCryptoService.prototype.filter = function (filter, rows) {
        var filteredRows = [];
        var acceptedChars = /^[a-z0-9\.<>=]+$/;
        if (!acceptedChars.test(filter)) {
            throw new Error('Filter may only be composed of > < and = (ex rank>5)');
        }
        var comparators = ['>', '<', '='];
        comparators.forEach(function (comparator) {
            var split = filter.split(comparator);
            if (split.length === 2) {
                var key_1 = split[0];
                if (typeof rows[0][key_1] === 'undefined') {
                    throw new Error('Filter keys can only be : rank, price, change1h, change24h, change7d, marketCap, volume24h');
                }
                rows.forEach(function (row) {
                    var evalStr = row[key_1] + comparator + split[1];
                    if (eval(evalStr)) {
                        filteredRows.push(row);
                    }
                });
            }
        });
        return filteredRows;
    };
    FormatCryptoService.prototype.order = function (order, rows) {
        if (typeof rows[0][order] === 'undefined') {
            throw new Error('Order can only be by : rank, price, change1h, change24h, change7d, marketCap, volume24h');
        }
        return rows.sort(function (a, b) { return (a[order] > b[order]) ? 1 : -1; });
    };
    FormatCryptoService.prototype.setColor = function (row) {
        var color = 'white';
        if (row.change7d < 0) {
            color = 'red';
        }
        if (row.change7d > 15) {
            color = 'green';
        }
        return color;
    };
    FormatCryptoService.prototype.formatData = function (id, value) {
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
                updatedValue = symbol + '' + this.humanReadeableNumber(Math.round(Number(value)).toString());
                break;
            case 'volume24h':
                updatedValue = symbol + '' + this.humanReadeableNumber(Math.round(Number(value)).toString());
                break;
            case 'change1h':
                updatedValue = (Math.round(100 * Number(value)) / 100).toString() + '%';
                break;
            case 'change24h':
                updatedValue = (Math.round(100 * Number(value)) / 100).toString() + '%';
                break;
            case 'change7d':
                updatedValue = (Math.round(100 * Number(value)) / 100).toString() + '%';
                break;
        }
        return updatedValue;
    };
    FormatCryptoService.prototype.humanReadeableNumber = function (number) {
        var newString = [];
        var counter = 1;
        for (var i = number.split('').length - 1; i >= 0; i--) {
            newString.unshift(number[i]);
            if (counter < 3) {
                counter++;
            }
            else if (i > 0) {
                newString.unshift('.');
                counter = 1;
            }
        }
        return newString.join('');
    };
    FormatCryptoService.prototype.getCurrencySymbol = function () {
        var abbr = this.units.price.toLowerCase();
        return currencies_1.CURRENCIES[abbr];
    };
    FormatCryptoService.prototype.updateTitle = function () {
        var _this = this;
        this.headerIds.forEach(function (x) {
            var title = _this.currencyTitle[x];
            if (_this.units[x]) {
                title += " (" + _this.units[x] + ")";
            }
            _this.currencyTitle[x] = title;
        });
    };
    FormatCryptoService.prototype.setCurrencyUnit = function (currency) {
        this.units.price = currency.toUpperCase();
        this.units.marketCap = currency.toUpperCase();
        this.units.volume24h = currency.toUpperCase();
    };
    return FormatCryptoService;
}());
exports.FormatCryptoService = FormatCryptoService;
