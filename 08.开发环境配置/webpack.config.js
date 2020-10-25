/**
 * 开发环境配置：能让代码运行即可
 */
const {resolve} = require("path")
const htmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'js/built.js',
    path: resolve(__dirname, "build"),
    publicPath: './',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'] // css最终并不会单独输出，而是打包到了js文件中
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          // 需要安装 less-loader 和 less
          'less-loader',
        ]
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
          outputPath: 'images'
        }
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
          outputPath: 'media'
        }
      }
    ]
  },
  plugins: [
    new htmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
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
    port: 3000
  }
}