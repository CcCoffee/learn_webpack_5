const { resolve } = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
// 提取css文件，单独的css文件使用link标签引入，不会出现闪屏现象，style标签则会。js文件也会减小。
//npm i mini-css-extract-plugin -D
const miniCssExtractPlugin = require("mini-css-extract-plugin")


module.exports = {
  entry: './src/js/index.js',
  output: {
    path: resolve(__dirname, 'build'),
    filename: 'js/built.js',
    publicPath: './',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          // 创建 style标签，将样式插入
          // "style-loader",

          // step 2
          // 代替style-loader， 提取js中的 css 成单独文件，并在html文件中引用，这个样单独文件没必要创建标签了
          miniCssExtractPlugin.loader,
          "css-loader" // 将css整合到js文件中。
        ]
      },
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"]
      },
      {
        test: /\.(jpg|jpeg|png|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 8*1024,
          esModule: false,
          name: '[hash:10].[ext]',
          outputPath: 'images'
        }
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
      {
        exclude: /\.(js|jsx|html|jpg|jpeg|png|gif|css|less)$/,
        loader: 'file-loader',
        options: {
          name: '[hash:10].[ext]',
          output: 'media'
        }
      }
    ]
  },
  plugins: [
    new htmlWebpackPlugin({
      template: './src/index.html'
    }),
    // step 1
    new miniCssExtractPlugin({
      filename:'styles/built.css' // 确保目录结构一致
    })
  ],
  mode: 'development',
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