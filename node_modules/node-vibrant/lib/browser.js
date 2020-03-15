"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var vibrant_1 = __importDefault(require("./vibrant"));
var browser_1 = __importDefault(require("./image/browser"));
vibrant_1.default.DefaultOpts.ImageClass = browser_1.default;
module.exports = vibrant_1.default;
//# sourceMappingURL=browser.js.map