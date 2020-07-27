import { TopCrypto } from "./top-crypto";

const topCrypto = new TopCrypto();
topCrypto.init().then(() => {
    topCrypto.run();
})


       
