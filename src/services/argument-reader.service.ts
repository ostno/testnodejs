import { TopCryptoOptions } from "../top-crypto-options";

export class ArgumentReaderService {


    get(): TopCryptoOptions {
        const args = process.argv.slice(2, process.argv.length);
        return this.getOptions(args);
    }

    getOptions(args: string[]): TopCryptoOptions {

        if (!args || args.length === 0) {
            throw new Error('Options needed, add -h to see options');
        }

        const options: any = {
            currency: 'EUR',
            currencies: [],
            refresh: 10,
            help: false,
            alternative: false,
            filter: '',
            order: 'rank'
        }

        options.currencies = args[0].split(',');

        for (let i = 1; i < args.length; i++) {

            const word = args[i];
            const nextWord = args[i + 1];

            // Case for -h (because --help is caught by node and not received by process.argv)
            if (word === '-h') {
                options.help = true;
            }
            if (word.startsWith('--')) {
                if (nextWord && !nextWord.startsWith('-')) {
                    options[word.replace('--', '')] = (!isNaN(nextWord as any)) ? Number(nextWord) : nextWord;
                } else {
                    options[word.replace('--', '')] = true;
                }
            }
        }

        return options;
    }

}