"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var base_1 = require("./base");
var http = __importStar(require("http"));
var https = __importStar(require("https"));
var custom_1 = __importDefault(require("@jimp/custom"));
var types_1 = __importDefault(require("@jimp/types"));
var plugin_resize_1 = __importDefault(require("@jimp/plugin-resize"));
var Jimp = custom_1.default({
    types: [types_1.default],
    plugins: [plugin_resize_1.default]
});
var URL_REGEX = /^(\w+):\/\/.*/i;
var PROTOCOL_HANDLERS = {
    http: http, https: https
};
var NodeImage = /** @class */ (function (_super) {
    __extends(NodeImage, _super);
    function NodeImage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NodeImage.prototype._loadByProtocolHandler = function (handler, src) {
        return new Promise(function (resolve, reject) {
            handler.get(src, function (r) {
                var buf = Buffer.alloc(0);
                r.on('data', function (data) { buf = Buffer.concat([buf, data]); });
                r.on('end', function () { return resolve(buf); });
                r.on('error', function (e) { return reject(e); });
            }).on('error', function (e) { return reject(e); });
        });
    };
    NodeImage.prototype._loadFromPath = function (src) {
        var _this = this;
        var m = URL_REGEX.exec(src);
        if (m) {
            var protocol = m[1].toLocaleLowerCase();
            var handler = PROTOCOL_HANDLERS[protocol];
            if (!handler) {
                return Promise.reject(new Error("Unsupported protocol: " + protocol));
            }
            return this._loadByProtocolHandler(handler, src)
                .then(function (buf) { return _this._loadByJimp(buf); });
        }
        else {
            return this._loadByJimp(src);
        }
    };
    NodeImage.prototype._loadByJimp = function (src) {
        var _this = this;
        // NOTE: TypeScript doesn't support union type to overloads yet
        //       Use type assertion to bypass compiler error
        return Jimp.read(src)
            .then(function (result) {
            _this._image = result;
            return _this;
        });
    };
    NodeImage.prototype.load = function (image) {
        if (typeof image === 'string') {
            return this._loadFromPath(image);
        }
        else if (image instanceof Buffer) {
            return this._loadByJimp(image);
        }
        else {
            return Promise.reject(new Error('Cannot load image from HTMLImageElement in node environment'));
        }
    };
    NodeImage.prototype.clear = function () {
    };
    NodeImage.prototype.update = function (imageData) {
    };
    NodeImage.prototype.getWidth = function () {
        return this._image.bitmap.width;
    };
    NodeImage.prototype.getHeight = function () {
        return this._image.bitmap.height;
    };
    NodeImage.prototype.resize = function (targetWidth, targetHeight, ratio) {
        this._image.resize(targetWidth, targetHeight);
    };
    NodeImage.prototype.getPixelCount = function () {
        var bitmap = this._image.bitmap;
        return bitmap.width * bitmap.height;
    };
    NodeImage.prototype.getImageData = function () {
        return this._image.bitmap;
    };
    NodeImage.prototype.remove = function () {
    };
    return NodeImage;
}(base_1.ImageBase));
exports.default = NodeImage;
//# sourceMappingURL=node.js.map