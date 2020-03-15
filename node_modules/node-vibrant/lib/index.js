"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var vibrant_1 = __importDefault(require("./vibrant"));
var node_1 = __importDefault(require("./image/node"));
vibrant_1.default.DefaultOpts.ImageClass = node_1.default;
module.exports = vibrant_1.default;
//# sourceMappingURL=index.js.map