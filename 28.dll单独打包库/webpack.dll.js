/*
  与 externals 不自己打包不同的是，dll 需要自己打包，由网站自己提供库。
  使用dll技术对某些库（第三方库：jquery、react、vue...）进行单独打包
  当你运行webpack时，默认查找 webpack.config.js 配置文件
  需求：需要先运行 webpack.dll.js 配置执行dll打包，再运行webpack第二次打包
    --> webpack --config webpack.dll.js
  优点：第二次打包不需要重新打包第三方库了，打包更快
*/
const { resolve } = require('path');
// eslint-disable-next-line import/no-extraneous-dependencies
const webpack = require('webpack');

module.exports = {
  entry: {
    // 最终打包生成的[name] --> jquery
    // ['jquery'] --> 要打包的库是jquery
    jquery: ['jquery'],
  },
  output: {
    filename: '[name].js', // jquery.js
    path: resolve(__dirname, 'dll'),
    library: '[name]_[hash]', // 打包的库里面向外暴露出去的内容叫什么名字
  },
  plugins: [
    // 打包生成一个manifest.json --> 提供和jquery映射
    new webpack.DllPlugin({
      name: '[name]_[hash]', // 映射库的暴露的内容名称
      path: resolve(__dirname, 'dll/manifest.json'), // 输出文件路径
    }),
  ],
  mode: 'production',
};
