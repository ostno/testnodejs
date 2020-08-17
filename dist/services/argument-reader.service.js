"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArgumentReaderService = void 0;
var ArgumentReaderService = /** @class */ (function () {
    function ArgumentReaderService() {
    }
    ArgumentReaderService.prototype.get = function () {
        var args = process.argv.slice(2, process.argv.length);
        return this.getOptions(args);
    };
    ArgumentReaderService.prototype.getOptions = function (args) {
        if (!args || args.length === 0) {
            throw new Error('Options needed, add -h to see options');
        }
        var options = {
            currency: 'EUR',
            currencies: [],
            refresh: 10,
            help: false,
            alternative: false,
            filter: '',
            order: 'rank'
        };
        options.currencies = args[0].split(',');
        for (var i = 1; i < args.length; i++) {
            var word = args[i];
            var nextWord = args[i + 1];
            // Case for -h (because --help is caught by node and not received by process.argv)
            if (word === '-h') {
                options.help = true;
            }
            if (word.startsWith('--')) {
                if (nextWord && !nextWord.startsWith('-')) {
                    options[word.replace('--', '')] = (!isNaN(nextWord)) ? Number(nextWord) : nextWord;
                }
                else {
                    options[word.replace('--', '')] = true;
                }
            }
        }
        return options;
    };
    return ArgumentReaderService;
}());
exports.ArgumentReaderService = ArgumentReaderService;
