"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DisplayService = void 0;
var clear = require('clear');
var DisplayService = /** @class */ (function () {
    function DisplayService() {
    }
    DisplayService.prototype.showHeader = function () {
        console.log('    |----------------------------------- TopCrypto -------------------------------------|');
        console.log('    |                                                                                   |');
        console.log('    |------- real time cryptocurrencies status (data from coingecko.com) ---------------|');
        console.log('    |                                                                                   |');
        console.log('    |-----------------------------------------------------------------------------------|');
    };
    DisplayService.prototype.showHelp = function () {
        console.log('');
        console.log('Usage : yarn run start btc,xrp,eth,eos,bch,usdt,ltc,trx,xlm,ada --refresh 10 --currency EUR');
        console.log('');
        console.log('Options, use columnIDs : rank, abbr, name, price, change1h, change24h, change7d, marketCap, volume24h');
        console.log('--currency EUR  #USD by default');
        console.log('--help');
        console.log('--refresh 10 #refresh every 10s');
        console.log('');
    };
    DisplayService.prototype.clear = function () {
        clear();
    };
    return DisplayService;
}());
exports.DisplayService = DisplayService;
