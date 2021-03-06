const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: './src/js/index.js',
  // entry: {
  //   // 多入口：有一个入口，最终输出就有一个bundle。多页应用对应多入口。单叶应用对应单入口
  //   main: './src/js/index.js',
  //   print: './src/js/print.js',
  // },
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
  /*
    可以将node_modules中代码单独打包一个chunk最终输出。（还可以使用dll对第三方库再次进行单独的打包，能够进行细化）
    这样输出至少有两个js文件，另一个是自己写的代码。
    还可以通过import语法对执行的js源代码进行分割，只要js代码是通过import引入的，就会被webpack发现并分割成一个单独文件
    自动分析多入口chunk中，有没有公共的文件（不能太小，几十KB）。如果有会打包成单独的一个chunk
  */
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  mode: 'production', // js 自动压缩
};
