/*
  HMR: hot module replacement 模块替换
  作用：一个模块发生变化只会重新打包这个模块，而不是打包所有模块。极大的提升代码构建速度

  css 文件：可以使用 HMR 功能，因为 style-loader 内部实现了～
  js 文件：默认没有 HMR 功能 ---> 需要修改 js 代码，添加支持 HMR 功能的代码
    注意：HMR 功能对于 js的处理，只能处理非入口js文件的其他文件
  html 文件：即使加上 hot: true，默认没有 HMR 功能。html只有一个文件所以不能优化也不用做 HMR 文件
    同时会导致一个问题：html文件不能热更新了，本地代码没有重新编译并重新刷新浏览器。
    解决不能热更新：修改 entry 入口，将 html 加入。
*/
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: ['./src/index.js', './src/index.html'],
  output: {
    filename: 'js/built.js',
    path: resolve(__dirname, 'build'),
    publicPath: './',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'], // css最终并不会单独输出，而是打包到了js文件中
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          // 需要安装 less-loader 和 less
          'less-loader',
        ],
      },
      {
        // 处理css中的url图片资源，但是处理不了html中的img图片
        test: /\.(jpg|jpeg|png|gif)$/,
        // url-loader依赖于 file loader，所以需要下载这两个package
        loader: 'url-loader',
        options: {
          // 图片小于8kb就会使用base64处理
          // 优点：减少请求数量（减轻服务器压力）
          // 缺点：图片体积会更大（文件请求速度会更慢）
          limit: 8 * 1024,
          // 问题： 因为 url-loader 默认使用 es6 模块化解析，而html-loader引入图片是commonjs
          // 解析时会出现问题： [Object Module]
          // 解决： 关闭 url-loader 的 es6 模块化，使用 commonjs 解析
          esModule: false,
          // 给图片重命名
          // [hash:10] 取图片的 hash 的前 10 位
          // [ext] 取文件的拓展名
          name: '[hash:10].[ext]',
          outputPath: 'images',
        },
      },
      {
        test: /\.html$/,
        // 专门处理html文件的img图片（负责引入，从而能被url-loader进行处理）
        loader: 'html-loader',
      },
      {
        // 排除css/js/html资源，这样就可以原样打包其他资源，如字体图标，但文件名为hash值
        exclude: /\.(css|less|jpg|jpeg|png|gif|js|html)$/,
        loader: 'file-loader',
        options: {
          name: '[hash:10].[ext]',
          outputPath: 'media',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
  /*
    source-map：一种提供源代码到构建后代码映射的技术（如果构建后代码出错了，通过映射可以追踪源代码错误）

    [inline-|hidden-|eval-][nosources-][cheap-[module-]]source-map

    source-map: 外部
      错误代码准确信息 和 源代码的错误位置
    inline-source-map: 内联
      只生成一个内联source-map
      错误代码准确信息 和 源代码的错误位置
    hidden-source-map: 外部
      错误代码错误原因，但是没有错误位置
      不能追踪源代码错误，只能提示到构建后代码的错误位置
    eval-source-map: 内联
      每个文件都生成对应的 source-map，都在 eval
      错误代码准确信息 和 源代码的错误位置
    nosources-source-map: 外部
      错误代码准确信息，但是没有任何源代码信息
    cheap-source-map
      错误代码准确信息 和 源代码的错误位置
      只能精确到行
    cheap-module-source-map: 外部
      错误代码准确信息 和 源代码的错误位置
      module 会讲 loader 的source map 加入

    内联和外部的区别：1. 外部生成了文件，内联没有 2. 内联构建速度更快

    开发环境：速度快，调试更友好
      速度快（eval > inline > cheap > ...）
        eval-cheap-source-map
        eval-source-map
      调试更友好
        source-map
        cheap-module-source-map
        cheap-source-map

      ---> eval-source-map 调试更友好，react脚手架默认采用 / cheap-module-source-map 性能更好

    生产环境：源代码要不要隐藏？调试要不要更友好？
      内联会让代码体积变大，所以在生产环境不采用

      源代码要不要隐藏？
        nosources-source-map  全部隐藏
        hidden-source-map  只隐藏源代码，会提示构建后代码错误信息

      调试要不要更友好？
        --> source-map 调试友好/ cheap-module-source-map
  */
  devtool: 'eval-source-map',
  mode: 'development',
  // 开发服务器 devServer，用来自动编译，自动打开浏览器，自动刷新浏览器
  // 特点：只会在内存中编译打包，不会有任何输出
  // https://github.com/webpack/webpack-dev-server/issues/2759
  // 启动指令 use `webpack serve` to invoke the webpack-dev-server.
  // npm i webpack-dev-server -D 没必要全局安装
  devServer: {
    // 构建后的路径
    contentBase: resolve(__dirname, 'build'),
    // 启动gzip压缩
    compress: true,
    open: true,
    // 自动打开默认浏览器
    port: 3000,
    hot: true, // 开启 HMR 功能,
  },
};
