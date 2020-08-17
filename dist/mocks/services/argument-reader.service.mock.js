"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArgumentReaderServiceMock = void 0;
var ArgumentReaderServiceMock = /** @class */ (function () {
    function ArgumentReaderServiceMock() {
    }
    ArgumentReaderServiceMock.prototype.get = function () {
        return {
            currency: 'EUR',
            currencies: [],
            refresh: 10,
            help: false,
            alternative: false,
            filter: '',
            order: 'rank'
        };
    };
    ArgumentReaderServiceMock.prototype.getOptions = function (str) {
        return {
            currency: 'EUR',
            currencies: [],
            refresh: 10,
            help: false,
            alternative: false,
            filter: '',
            order: 'rank'
        };
    };
    return ArgumentReaderServiceMock;
}());
exports.ArgumentReaderServiceMock = ArgumentReaderServiceMock;
