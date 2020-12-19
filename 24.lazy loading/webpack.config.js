const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: './src/js/index.js',
  output: {
    // name：取文件名
    filename: 'js/[name].[contenthash:10].js',
    path: resolve(__dirname, 'build'),
    publicPath: './',
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
  /*
    可以将node_modules中代码单独打包一个chunk最终输出
    自动分析多入口chunk中，有没有公共的文件（不能太小，几十KB）。如果有会打包成单独的一个chunk
  */
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  mode: 'production', // js 自动压缩
};
