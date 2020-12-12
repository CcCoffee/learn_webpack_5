const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/built.js',
    path: resolve(__dirname, 'build'),
  },
  module: {
    rules: [
      // 语法检查： npm i eslint-loader eslint -D
      // 只检查自己写的源代码，不检查第三方库
      // 设置检查规则：
      //   package.json中eslintConfig中设置
      //     "eslintConfig": {
      //        "extends": "airbnb-base"
      //      }
      // 著名的风格指南：airbnb
      //   airbnb --> npm i eslint-config-airbnb-base eslint-plugin-import eslint -D
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          // 自动修复 eslint的错误
          fix: true,
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
};
