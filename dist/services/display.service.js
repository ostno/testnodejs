"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DisplayService = void 0;
var clear = require('clear');
var DisplayService = /** @class */ (function () {
    function DisplayService() {
    }
    DisplayService.prototype.show = function (str) {
        console.log(str);
    };
    DisplayService.prototype.clear = function () {
        clear();
    };
    DisplayService.prototype.showHelp = function () {
        this.show('');
        this.show('     Usage : yarn start btc,xrp,eth,eos,bch,usdt,ltc,trx,xlm,ada --refresh 10 --currency USD --order change1h --filter "price<400" --alternative');
        this.show('');
        this.show('     Options, use columnIDs : rank, abbr, name, price, change1h, change24h, change7d, marketCap, volume24h');
        this.show('         --currency EUR  #USD by default');
        this.show('         -h # Display help');
        this.show('         --refresh 10 #Refresh every 10s');
        this.show('         --filter "price<30"');
        this.show('         --order price #Order ascending (using columnIds)');
        this.show('         --filter "price<30"');
        this.show('         --alternative #use alternative.me instead of coingecko.net');
        this.show('');
    };
    return DisplayService;
}());
exports.DisplayService = DisplayService;
