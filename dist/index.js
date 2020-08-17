"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var top_crypto_1 = require("./top-crypto");
var argument_reader_service_1 = require("./services/argument-reader.service");
var options = new argument_reader_service_1.ArgumentReaderService().get();
var topCrypto = new top_crypto_1.TopCrypto(options);
topCrypto.run().catch(function (e) {
    var message = (e.message) ? e.message : e;
    console.log(message);
});
