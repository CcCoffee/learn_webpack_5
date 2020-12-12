const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/built.js',
    path: resolve(__dirname, 'build'),
  },
  target: ['web', 'es5'], // 兼容IE必须加上 target
  module: {
    rules: [
      // js 兼容性处理
      // 1. 基本兼容性处理 npm i babel-loader @babel/core @babel/preset-env -D
      //   问题：只能转换基本的语法，如 Promise 无法转换
      // 2. 全部js 兼容性处理 --> npm i @babel/polyfill，只需要在js中直接import即可
      //   问题：只要解决部分兼容性问题时，也会把所有兼容性代码引入，体积太大。
      //        ℹ ｢wdm｣: asset js/built.js 872 KiB [emitted] (name: main)
      // 3. 按需兼容 --> npm i core-js -D
      //   此方案与第二种方案互斥，需要删除第二种方案的import语句
      //   ℹ ｢wdm｣: asset js/built.js 207 KiB [emitted] (name: main)
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          // 预设，指示 babel 如何进行兼容性处理
          presets: [
            ['@babel/preset-env', {
              // 按需加载兼容性代码
              useBuiltIns: 'usage',
              // 指定corejs版本
              corejs: {
                version: 3,
              },
              // 指定兼容性做到哪个版本的浏览器
              targets: {
                ie: '9',
                chrome: '60',
                firefox: '50',
                safari: '10',
                edge: '17',
              },
            }],
          ],
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
  mode: 'development',
  devServer: {
    // 构建后的路径
    contentBase: resolve(__dirname, 'build'),
    // 启动gzip压缩
    compress: true,
    open: false,
    // 自动打开默认浏览器
    port: 3000,
  },
  devtool: 'inline-source-map',
};
