"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var top_crypto_1 = require("./top-crypto");
var topCrypto = new top_crypto_1.TopCrypto();
topCrypto.init().then(function () {
    topCrypto.run();
});
