import { ArgumentReaderService } from "./argument-reader.service";

describe('TopCrypto', () => {

    let argumentReader: ArgumentReaderService;

    beforeEach(() => {
        argumentReader = new ArgumentReaderService();
    });

    describe('get', () => {
        test('should parse CLI arguments into a json object', () => {
            expect(argumentReader.getOptions(['btc', '--refresh', '4'])).toHaveProperty('refresh', 4);
            expect(argumentReader.getOptions(['btc', '-h'])).toHaveProperty('help', true);
        });
    });

});