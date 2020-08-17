"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var argument_reader_service_1 = require("./argument-reader.service");
describe('TopCrypto', function () {
    var argumentReader;
    beforeEach(function () {
        argumentReader = new argument_reader_service_1.ArgumentReaderService();
    });
    describe('get', function () {
        test('should parse CLI arguments into a json object', function () {
            expect(argumentReader.getOptions(['btc', '--refresh', '4'])).toHaveProperty('refresh', 4);
            expect(argumentReader.getOptions(['btc', '-h'])).toHaveProperty('help', true);
        });
    });
});
