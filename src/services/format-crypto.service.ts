import { CurrencyInfos } from "../currency-info";
import { CURRENCIES } from "../helpers/currencies";
import { TopCryptoOptions } from "../top-crypto-options";
const { Table } = require("console-table-printer");

export interface Units {
    price: string,
    change1h: string,
    change24h: string,
    change7d: string,
    marketCap: string,
    volume24h: string
}

export class FormatCryptoService {

    currencyTitle: { [key: string]: string } = {
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

    headerIds = ['rank', 'abbr', 'name', 'price', 'change1h', 'change24h', 'change7d', 'marketCap', 'volume24h'];

    units: Units = {
        price: 'USD',
        change1h: '%',
        change24h: '%',
        change7d: '%',
        marketCap: 'USD',
        volume24h: 'USD'
    };

    setAndPrint(rows: CurrencyInfos[], options: TopCryptoOptions) {

        if(rows.length === 0) {
            throw new Error('No data to display, add -h to display options');
        }
        if (options.filter) {
            rows = this.filter(options.filter, rows);
        }
        if (options.order) {
            rows = this.order(options.order, rows);
        }

        const table = this.createTable(options, rows);

        this.printTable(table);

    }

    createTable(options: TopCryptoOptions, rows: CurrencyInfos[]) {
        const columns: any = [];
        this.headerIds.forEach(headerId => {
            columns.push({ name: this.currencyTitle[headerId] });
        });

        const p = new Table({
            columns,
            title: this.getTitle(options)
        });

        rows.forEach((row: any) => {
            const newRow: any = {};
            this.headerIds.forEach(headerId => {
                newRow[this.currencyTitle[headerId]] = this.formatData(headerId, row[headerId]);

            });
            p.addRow(newRow, { color: this.setColor(row) });
        });
        return p;
    }

    printTable(table: any) {
        table.printTable(table);
    }

    getTitle(options: TopCryptoOptions): string {
        let source = 'coingecko.com';
        if (options.alternative) {
            source = 'alternative.me';
        }
        let title = `Refreshed at ${new Date().toLocaleTimeString()} from ${source}`;
        if (options.filter) {
            title = ` Filter : ${options.filter}  ---- ${title}`;
        }
        if (options.order) {
            title = `Order by "${options.order}" ---- ${title}`;
        }
        return title;
    }

    filter(filter: string, rows: any[]) {
        const filteredRows: any = [];
        const acceptedChars = /^[a-z0-9\.<>=]+$/;
        if (!acceptedChars.test(filter)) {
            throw new Error('Filter may only be composed of > < and = (ex rank>5)')
        }

        const comparators = ['>', '<', '='];

        comparators.forEach(comparator => {
            const split = filter.split(comparator);
            if (split.length === 2) {
                const key: any = split[0];
                if (typeof rows[0][key] === 'undefined') {
                    throw new Error('Filter keys can only be : rank, price, change1h, change24h, change7d, marketCap, volume24h');
                }
                rows.forEach(row => {
                    const evalStr = row[key] + comparator + split[1];
                    if (eval(evalStr)) {
                        filteredRows.push(row);
                    }
                })
            }
        })
        return filteredRows;
    }

    order(order: string, rows: any[]) {
        if (typeof rows[0][order] === 'undefined') {
            throw new Error('Order can only be by : rank, price, change1h, change24h, change7d, marketCap, volume24h');
        }
        return rows.sort((a, b) => (a[order] > b[order]) ? 1 : -1);
    }

    setColor(row: CurrencyInfos): string {
        let color = 'white';
        if (row.change7d < 0) {
            color = 'red';
        }
        if (row.change7d > 15) {
            color = 'green';
        }
        return color;
    }

    formatData(id: string, value: number | string): any {
        let updatedValue = value;
        const symbol = this.getCurrencySymbol();
        switch (id) {
            case 'rank':
                updatedValue = '#' + value;
                break
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
    }

    humanReadeableNumber(number: string) {
        let newString: string[] = [];
        let counter = 1;
        for (let i = number.split('').length - 1; i >= 0; i--) {
            newString.unshift(number[i]);
            if (counter < 3) {
                counter++;
            } else if (i > 0) {
                newString.unshift('.');
                counter = 1;
            }
        }
        return newString.join('');
    }

    getCurrencySymbol(): string {
        const abbr = this.units.price.toLowerCase();
        return CURRENCIES[abbr];
    }

    updateTitle() {
        this.headerIds.forEach(x => {
            let title = this.currencyTitle[x];
            if (this.units[x as keyof Units]) {
                title += ` (${this.units[x as keyof Units]})`
            }
            this.currencyTitle[x] = title;
        });
    }

    setCurrencyUnit(currency: string) {
        this.units.price = currency.toUpperCase();
        this.units.marketCap = currency.toUpperCase();
        this.units.volume24h = currency.toUpperCase();
    }

}