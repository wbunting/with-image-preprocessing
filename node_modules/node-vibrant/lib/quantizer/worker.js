"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var pool_1 = __importDefault(require("./worker/pool"));
var quantizeInWorker = function (pixels, opts) {
    return pool_1.default.instance.quantize(pixels, opts);
};
exports.default = quantizeInWorker;
//# sourceMappingURL=worker.js.map