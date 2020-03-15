"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
/* global Window */
var worker_1 = __importDefault(require("./quantizer/worker"));
var Vibrant = require("./browser");
// TODO: use this as webpack entry instead. Let webpack generate UMD module wrapper.
Vibrant.Quantizer.WebWorker = worker_1.default;
module.exports = Vibrant;
//# sourceMappingURL=browser.worker.js.map