/**
 * loader: 1. 下载 2. 使用（配置loader）
 * plugins: 1. 下载 2. 引入 3. 使用
 */
const { resolve } = require('path')
//npm i html-webpack-plugin -D
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'built.js',
    path: resolve(__dirname, 'build')
  },
  module: {
    rules: [
 
    ],
  },
  plugins: [
    /**
     * new HtmlWebpackPlugin();
     * 功能：默认会创建一个空的HTML文件，自动引入打包输出的所有资源（JS/CSS）
     * 需求：需要有结构（有内容标签的完整HTML文件）,可以使用tempalte参数
     * 可以发现生成的html自动引用了js文件
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Webpack App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1"></head>
        <body>
        <script src="built.js"></script></body>
      </html>
     */
    new HtmlWebpackPlugin({
      // 复制一个HTML文件，并自动引入打包输出的所有资源（JS/CSS），不要在模版中手动引入
      template: './src/index.html'
    })
  ],
  mode: 'development'
}