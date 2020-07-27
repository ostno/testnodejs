"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var format_table_service_1 = require("./format-table.service");
describe('formatTable', function () {
    var service;
    beforeEach(function () {
        service = new format_table_service_1.FormatTableService;
    });
    describe('getHead', function () {
        test('should return an array containing column headers', function () {
            expect(service.getHead())
                .toEqual(['Rank', 'Coin', 'Name', 'Price (USD)', 'Change 1H (%)', 'Change 24H (%)', 'Change 7D (%)', 'Market Cap (USD)', 'Volume 24H (USD)']);
        });
    });
});
