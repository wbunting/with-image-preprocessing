"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mmcq_1 = __importDefault(require("../mmcq"));
self.onmessage = function (event) {
    var data = event.data;
    var id = data.id, payload = data.payload;
    var response;
    try {
        var swatches = mmcq_1.default(payload.pixels, payload.opts);
        response = {
            id: id,
            type: 'return',
            payload: swatches
        };
    }
    catch (e) {
        response = {
            id: id,
            type: 'error',
            payload: e.message
        };
    }
    self.postMessage(response);
};
//# sourceMappingURL=worker.js.map