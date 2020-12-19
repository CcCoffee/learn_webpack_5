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
  mode: 'production',
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
