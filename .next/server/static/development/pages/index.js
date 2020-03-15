module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../../../ssr-module-cache.js');
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./lib/getUnsplashImage.js":
/*!*********************************!*\
  !*** ./lib/getUnsplashImage.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var isomorphic_unfetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! isomorphic-unfetch */ "isomorphic-unfetch");
/* harmony import */ var isomorphic_unfetch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(isomorphic_unfetch__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var potrace__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! potrace */ "potrace");
/* harmony import */ var potrace__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(potrace__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var svgo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! svgo */ "svgo");
/* harmony import */ var svgo__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(svgo__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var node_vibrant__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! node-vibrant */ "node-vibrant");
/* harmony import */ var node_vibrant__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(node_vibrant__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var sharp__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! sharp */ "sharp");
/* harmony import */ var sharp__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(sharp__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! fs */ "fs");
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_5__);







const temporaryStoreImage = (slug, resp) => new Promise((resolve, reject) => {
  const fileStream = fs__WEBPACK_IMPORTED_MODULE_5___default.a.createWriteStream(`/tmp/${slug}.png`);

  if (!resp || !resp.body) {
    reject("no body on fetch response");
  } else {
    resp.body.pipe(fileStream);
    fileStream.on("finish", () => {
      resolve();
    });
    fileStream.on("error", err => {
      reject(err);
    });
  }
});

const removeTemporaryImage = slug => new Promise((resolve, reject) => {
  if (fs__WEBPACK_IMPORTED_MODULE_5___default.a.existsSync(`/tmp/${slug}.png`)) {
    fs__WEBPACK_IMPORTED_MODULE_5___default.a.unlink(`/tmp/${slug}.png`, err => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  }
});

function encodeSvgDataUri(svg) {
  var uriPayload = encodeURIComponent(svg).replace(/%0A/g, "").replace(/%20/g, " ").replace(/%3D/g, "=").replace(/%3A/g, ":").replace(/%2F/g, "/").replace(/%22/g, "'");
  return "data:image/svg+xml," + uriPayload;
}

const optimizeSvg = async svg => {
  var svgo = new svgo__WEBPACK_IMPORTED_MODULE_2___default.a({
    floatPrecision: 0
  });
  const result = await svgo.optimize(svg);
  return result.data;
};

const extractMostProminentColor = async filePath => {
  var vibrant = new node_vibrant__WEBPACK_IMPORTED_MODULE_3___default.a(filePath);
  const palette = await vibrant.getPalette();
  let mostProminentColor = "";
  let highestPopulation = 0;
  let color = "";
  let population = 0;
  Object.keys(palette).forEach(function (key) {
    if (palette[key] === null) {
      return;
    } // @ts-ignore


    color = palette[key].getHex(); // @ts-ignore

    population = palette[key].getPopulation();

    if (population > highestPopulation) {
      mostProminentColor = color;
      highestPopulation = population;
    }
  });
  return mostProminentColor;
};

function traceSvg(filePath, traceParams) {
  return new Promise(function (resolve, reject) {
    var trace = new potrace__WEBPACK_IMPORTED_MODULE_1__["Potrace"](traceParams);
    trace.loadImage(filePath, function (error) {
      if (error) {
        reject(error);
      } else {
        resolve(trace.getSVG());
      }
    });
  });
}

const generateSVGTrace = async (slug, options = {}) => {
  const traceParams = {
    turnPolicy: options.turnPolicy ? potrace__WEBPACK_IMPORTED_MODULE_1__["Potrace"][options.turnPolicy] : potrace__WEBPACK_IMPORTED_MODULE_1__["Potrace"].TURNPOLICY_MINORITY,
    turdSize: options.turdSize ? parseFloat(options.turdSize) : 100,
    alphaMax: options.alphaMax ? parseFloat(options.alphaMax) : 1,
    optCurve: options.optCurve ? options.optCurve : true,
    optTolerance: options.optTolerance ? parseFloat(options.optTolerance) : 0.2,
    threshold: options.threshold ? potrace__WEBPACK_IMPORTED_MODULE_1__["Potrace"][options.threshold] || parseFloat(options.threshold) : potrace__WEBPACK_IMPORTED_MODULE_1__["Potrace"].THRESHOLD_AUTO,
    blackOnWhite: options.flipColors ? !options.flipColors : true,
    background: options.background ? potrace__WEBPACK_IMPORTED_MODULE_1__["Potrace"][options.background] || options.background : potrace__WEBPACK_IMPORTED_MODULE_1__["Potrace"].COLOR_TRANSPARENT,
    color: potrace__WEBPACK_IMPORTED_MODULE_1__["Potrace"].COLOR_AUTO
  };
  const color = options.color ? potrace__WEBPACK_IMPORTED_MODULE_1__["Potrace"][options.color] || options.color : potrace__WEBPACK_IMPORTED_MODULE_1__["Potrace"].COLOR_AUTO;
  const getFillColor = color === potrace__WEBPACK_IMPORTED_MODULE_1__["Potrace"].COLOR_AUTO ? extractMostProminentColor(`/tmp/${slug}.png`) : Promise.resolve(color);
  const fillColor = await getFillColor;
  traceParams.color = fillColor;
  const svg = await traceSvg(`/tmp/${slug}.png`, traceParams);
  const optimizedSVG = await optimizeSvg(svg);
  const encodedSVG = encodeSvgDataUri(optimizedSVG);
  return encodedSVG;
};

const convertImageToWebP = slug => new Promise((resolve, reject) => {
  sharp__WEBPACK_IMPORTED_MODULE_4___default()(`/tmp/${slug}.png`).toFile(`${process.cwd()}/public/images/${slug}.webp`, (error, info) => {
    if (error) {
      reject(error);
    } else {
      resolve(info);
    }
  });
});

const getUnsplashImage = async photo => {
  const resp = await isomorphic_unfetch__WEBPACK_IMPORTED_MODULE_0___default()(`https://images.unsplash.com/${photo}?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80`);
  await temporaryStoreImage(photo, resp);
  await convertImageToWebP(photo);
  const svg = await generateSVGTrace(photo);
  await removeTemporaryImage(photo);
  return {
    svg,
    webp: photo
  };
};

/* harmony default export */ __webpack_exports__["default"] = (getUnsplashImage);

/***/ }),

/***/ "./pages/index.js":
/*!************************!*\
  !*** ./pages/index.js ***!
  \************************/
/*! exports provided: getStaticProps, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getStaticProps", function() { return getStaticProps; });
/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! styled-jsx/style */ "styled-jsx/style");
/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(styled_jsx_style__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _lib_getUnsplashImage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../lib/getUnsplashImage */ "./lib/getUnsplashImage.js");
var _jsxFileName = "/Users/willbunting/Documents/Github/with-image-preprocessing/pages/index.js";

var __jsx = react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement;



const Page = ({
  image
}) => {
  return __jsx("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 6
    },
    __self: undefined
  }, __jsx("div", {
    className: "jsx-1669243343" + " " + "container",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 7
    },
    __self: undefined
  }, __jsx("div", {
    className: "jsx-1669243343" + " " + "invisible",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 8
    },
    __self: undefined
  }), __jsx("img", {
    src: image.svg,
    className: "jsx-1669243343",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 9
    },
    __self: undefined
  }), __jsx("img", {
    src: `/images/${image.webp}.webp`,
    className: "jsx-1669243343",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 10
    },
    __self: undefined
  }), __jsx(styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a, {
    id: "1669243343",
    __self: undefined
  }, ".container.jsx-1669243343{width:100%;height:800px;position:relative;}.invisible.jsx-1669243343{width:100%;paddingbottom:55%;}img.jsx-1669243343{position:absolute;top:0;left:0;width:100%;height:100%;}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy93aWxsYnVudGluZy9Eb2N1bWVudHMvR2l0aHViL3dpdGgtaW1hZ2UtcHJlcHJvY2Vzc2luZy9wYWdlcy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFVb0IsQUFHd0IsQUFNQSxBQUtPLFdBVkwsQUFNSyxPQUtaLE1BVlksQUFXWCxLQUxULEVBTWEsV0FYYixBQVljLFlBQ2QiLCJmaWxlIjoiL1VzZXJzL3dpbGxidW50aW5nL0RvY3VtZW50cy9HaXRodWIvd2l0aC1pbWFnZS1wcmVwcm9jZXNzaW5nL3BhZ2VzL2luZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IGdldFVuc3BsYXNoSW1hZ2UgZnJvbSBcIi4uL2xpYi9nZXRVbnNwbGFzaEltYWdlXCI7XG5cbmNvbnN0IFBhZ2UgPSAoeyBpbWFnZSB9KSA9PiB7XG4gIHJldHVybiAoXG4gICAgPGRpdj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaW52aXNpYmxlXCIgLz5cbiAgICAgICAgPGltZyBzcmM9e2ltYWdlLnN2Z30gLz5cbiAgICAgICAgPGltZyBzcmM9e2AvaW1hZ2VzLyR7aW1hZ2Uud2VicH0ud2VicGB9IC8+XG4gICAgICAgIDxzdHlsZSBqc3g+e2BcbiAgICAgICAgICAuY29udGFpbmVyIHtcbiAgICAgICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICAgICAgaGVpZ2h0OiA4MDBweDtcbiAgICAgICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAuaW52aXNpYmxlIHtcbiAgICAgICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICAgICAgcGFkZGluZ2JvdHRvbTogNTUlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGltZyB7XG4gICAgICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgICAgICB0b3A6IDA7XG4gICAgICAgICAgICBsZWZ0OiAwO1xuICAgICAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICAgICAgfVxuICAgICAgICBgfTwvc3R5bGU+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRTdGF0aWNQcm9wcygpIHtcbiAgY29uc3QgaW1hZ2UgPSBhd2FpdCBnZXRVbnNwbGFzaEltYWdlKFwicGhvdG8tMTU1ODk4MDM5NC0wYTA2YzQ2MzE3MzNcIik7XG5cbiAgcmV0dXJuIHtcbiAgICBwcm9wczoge1xuICAgICAgaW1hZ2VcbiAgICB9XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IFBhZ2U7XG4iXX0= */\n/*@ sourceURL=/Users/willbunting/Documents/Github/with-image-preprocessing/pages/index.js */")));
};

async function getStaticProps() {
  const image = await Object(_lib_getUnsplashImage__WEBPACK_IMPORTED_MODULE_2__["default"])("photo-1558980394-0a06c4631733");
  return {
    props: {
      image
    }
  };
}
/* harmony default export */ __webpack_exports__["default"] = (Page);

/***/ }),

/***/ 3:
/*!******************************!*\
  !*** multi ./pages/index.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/willbunting/Documents/Github/with-image-preprocessing/pages/index.js */"./pages/index.js");


/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),

/***/ "isomorphic-unfetch":
/*!*************************************!*\
  !*** external "isomorphic-unfetch" ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("isomorphic-unfetch");

/***/ }),

/***/ "node-vibrant":
/*!*******************************!*\
  !*** external "node-vibrant" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("node-vibrant");

/***/ }),

/***/ "potrace":
/*!**************************!*\
  !*** external "potrace" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("potrace");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ "sharp":
/*!************************!*\
  !*** external "sharp" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("sharp");

/***/ }),

/***/ "styled-jsx/style":
/*!***********************************!*\
  !*** external "styled-jsx/style" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("styled-jsx/style");

/***/ }),

/***/ "svgo":
/*!***********************!*\
  !*** external "svgo" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("svgo");

/***/ })

/******/ });
//# sourceMappingURL=index.js.map