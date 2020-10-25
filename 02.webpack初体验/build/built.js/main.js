/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is not neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/data.json":
/*!***********************!*\
  !*** ./src/data.json ***!
  \***********************/
/*! default exports */
/*! export name [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: module */
/***/ ((module) => {

eval("module.exports = {\"name\":\"Kevin\"};\n\n//# sourceURL=webpack://webpack_test/./src/data.json?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! namespace exports */
/*! exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _data_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./data.json */ \"./src/data.json\");\n/**\n * webpack的入口文件\n * \n * 1. 运行指令：\n * 开发环境：webpack ./src/index.js -o ./build/built.js --mode=development\n * webpack会以 ./src/index.js 为入口文件开始打包，打包后输出到 ./build/built.js\n * 整体打包环境是开发环境\n * \n   % webpack ./src/index.js -o ./build/built.js --mode=development\n   [webpack-cli] Compilation finished\n   asset main.js 1.16 KiB [emitted] (name: main)\n   ./src/index.js 339 bytes [built] [code generated]\n   webpack 5.2.0 compiled successfully in 94 ms\n * \n * 生产环境：webpack ./src/index.js -o ./build/built.js --mode=production\n * webpack会以 ./src/index.js 为入口文件开始打包，打包后输出到 ./build/built.js\n * 整体打包环境是开发环境。\n * \n   % webpack ./src/index.js -o ./build/built.js --mode=production\n   [webpack-cli] Compilation finished\n   asset main.js 15 bytes [emitted] [minimized] (name: main) #压缩，输出文件体积非常小\n   ./src/index.js 339 bytes [built] [code generated]\n   webpack 5.2.0 compiled successfully in 201 ms\n * \n */\n\n\n\n function add(x,y){\n     return x+y;\n }\n\n console.log(add(1,2));\n\n console.log(_data_json__WEBPACK_IMPORTED_MODULE_0__);\n\n//# sourceURL=webpack://webpack_test/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./src/index.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;