"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* global Window */
var worker_1 = __importDefault(require("./quantizer/worker"));
var Vibrant = require("./browser");
(function (ns) {
    ns.Vibrant = Vibrant;
    Vibrant.Quantizer.WebWorker = worker_1.default;
})((typeof window === 'object' && window instanceof Window) ? window : module.exports);
//# sourceMappingURL=bundle.worker.js.map