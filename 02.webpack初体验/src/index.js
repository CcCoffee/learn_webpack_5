/**
 * webpack的入口文件
 * 
 * 1. 运行指令：
 * 开发环境：webpack ./src/index.js -o ./build/built.js --mode=development
 * webpack会以 ./src/index.js 为入口文件开始打包，打包后输出到 ./build/built.js
 * 整体打包环境是开发环境
 * 
   % webpack ./src/index.js -o ./build/built.js --mode=development
   [webpack-cli] Compilation finished
   asset main.js 1.16 KiB [emitted] (name: main)
   ./src/index.js 339 bytes [built] [code generated]
   webpack 5.2.0 compiled successfully in 94 ms
 * 
 * 生产环境：webpack ./src/index.js -o ./build/built.js --mode=production
 * webpack会以 ./src/index.js 为入口文件开始打包，打包后输出到 ./build/built.js
 * 整体打包环境是开发环境。
 * 
   % webpack ./src/index.js -o ./build/built.js --mode=production
   [webpack-cli] Compilation finished
   asset main.js 15 bytes [emitted] [minimized] (name: main) #压缩，输出文件体积非常小
   ./src/index.js 339 bytes [built] [code generated]
   webpack 5.2.0 compiled successfully in 201 ms
 * 
 * 2. 结论：
 * 2.1 webpack 能够处理js/json资源，不能处理css/img文件
 * 2.2 生产环境和开发环境将es6模块化编译成浏览器能够识别的模块化
 * 2.3 生产环境比开发环境多一个压缩 js 代码
 */

// webpack 能够处理json 文件
import json from './data.json'
 /**
    % webpack ./src/index.js -o ./build/built.js --mode=development
    % node build/built.js/main.js 
    3
    { name: 'Kevin' }
  */
console.log(json);

// 打包出现以下异常，说明webpack无法直接处理css文件
// ERROR in ./src/index.css 1:5
// Module parse failed: Unexpected token (1:5)
// You may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders
// > body {
// |     background-color: red;
// | }
//  @ ./src/index.js 37:1-21
// import './index.css'

function add(x,y){
    return x+y;
}
console.log(add(1,2));

