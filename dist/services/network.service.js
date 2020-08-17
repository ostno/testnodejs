"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NetworkService = void 0;
var axios_1 = __importDefault(require("axios"));
var NetworkService = /** @class */ (function () {
    function NetworkService() {
    }
    NetworkService.prototype.get = function (url) {
        console.log(url);
        return axios_1.default.get(url);
    };
    return NetworkService;
}());
exports.NetworkService = NetworkService;
