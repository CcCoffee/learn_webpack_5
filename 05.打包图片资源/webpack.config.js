const {resolve} = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    'filename': 'built.js',
    'path': resolve(__dirname, 'build'),
    // 解决img引入图片时 Error: Automatic publicPath is not supported in this browser
    // https://blog.csdn.net/qq_46038620/article/details/109143134
    'publicPath': './',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader"
        ]
      },
      {
        test: /\.less$/,
        // 使用多个 loader 处理时用 use
        use: [
          "style-loader",
          "css-loader",
          "less-loader"
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
          name: '[hash:10].[ext]'
        }
      },
      {
        test: /\.html$/,
        // 专门处理html文件的img图片（负责引入，从而能被url-loader进行处理）
        loader: 'html-loader',
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  mode: 'development'
}