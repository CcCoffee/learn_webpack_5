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

 function add(x,y){
     return x+y;
 }

 console.log(add(1,2));

