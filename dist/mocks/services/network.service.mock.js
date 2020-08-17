"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NetworkServiceMock = void 0;
var NetworkServiceMock = /** @class */ (function () {
    function NetworkServiceMock() {
    }
    NetworkServiceMock.prototype.get = function (url) {
        return Promise.resolve({});
    };
    return NetworkServiceMock;
}());
exports.NetworkServiceMock = NetworkServiceMock;
