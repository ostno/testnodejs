import { TopCryptoOptions } from "./top-crypto-options";
import { MarketService } from "./services/market.service";
import { DisplayService } from "./services/display.service";
import { FormatCryptoService } from "./services/format-crypto.service";

export class TopCrypto {

    marketService = new MarketService();
    formatService = new FormatCryptoService();
    displayService = new DisplayService();

    constructor(public options: TopCryptoOptions) { }

    async run() {

        if (this.options.help) {

            this.displayService.showHelp();

        } else {

            this.formatService.setCurrencyUnit(this.options.currency);
            this.formatService.updateTitle();

            await this.getAndDisplay();

            if (this.options.refresh) {
                setInterval(async () => {

                    await this.getAndDisplay();

                }, this.options.refresh * 1000);
            }
        }
    }

    async getAndDisplay() {

        let data;
        if (this.options.alternative) {
            data = await this.marketService.getAlternativeMarket(this.options);
        } else {
            data = await this.marketService.getCoinGeckoMarket(this.options);
        }
        this.displayService.clear();
        await this.formatService.setAndPrint(data, this.options);

    }

}

