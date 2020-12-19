const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: {
    // 多入口：有一个入口，最终输出就有一个bundle。多页应用对应多入口。单叶应用对应单入口
    main: './src/js/index.js',
    print: './src/js/print.js',
  },
  output: {
    // name：取文件名
    filename: 'js/[name].[contenthash:10].js',
    path: resolve(__dirname, 'build'),
    publicPath: '/',
  },
  target: ['web', 'es5'], // 兼容IE必须加上 target

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
      },
    }),
    new CleanWebpackPlugin(), // 每次build前删除build文件夹
  ],
  mode: 'production', // js 自动压缩
};
