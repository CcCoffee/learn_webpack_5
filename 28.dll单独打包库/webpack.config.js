const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'built.js',
    path: resolve(__dirname, 'build'),
  },
  module: {
    rules: [],
  },
  plugins: [
    new HtmlWebpackPlugin({
      // 复制一个HTML文件，并自动引入打包输出的所有资源（JS/CSS），不要在模版中手动引入
      template: './src/index.html',
    }),
    // 告诉 webpack 哪些库不参与打包，同时使用时的名称也得变～
    new webpack.DllReferencePlugin({
      manifest: resolve(__dirname, 'dll/manifest.json'),
    }),
    // 需要引入 npm i add-asset-html-webpack-plugin -D
    // 将某个文件打包输出去，并在html中自动引入该资源
    new AddAssetHtmlWebpackPlugin({
      filepath: resolve(__dirname, 'dll/jquery.js'),
      publicPath: './',
    }),
  ],
  mode: 'production',
};
