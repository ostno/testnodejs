import { TopCrypto } from "./top-crypto";
import { TopCryptoOptions } from "./top-crypto-options";
import { ArgumentReaderService } from "./services/argument-reader.service";

const options: TopCryptoOptions = new ArgumentReaderService().get();

const topCrypto = new TopCrypto(options);

topCrypto.run().catch(e => {
    const message = (e.message)? e.message : e;
    console.log(message);
});



