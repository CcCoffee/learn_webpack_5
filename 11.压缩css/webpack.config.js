const { resolve } = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
// 提取css文件，单独的css文件使用link标签引入，不会出现闪屏现象，style标签则会。js文件也会减小。
//npm i mini-css-extract-plugin -D
const miniCssExtractPlugin = require("mini-css-extract-plugin")
const optimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')

//设置node环境变量，给postcss使用，否则postcss默认使用production配置
// process.env.NODE_ENV='development';

module.exports = {
  entry: './src/js/index.js',
  output: {
    path: resolve(__dirname, 'build'),
    filename: 'js/built.js',
    publicPath: './',
  },
  // loader一般处理兼容性处理，压缩靠插件完成
  // npm i optimize-css-assets-webpack-plugin -D
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          miniCssExtractPlugin.loader,
          "css-loader", // 将css整合到js文件中。
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                ident: 'postcss',
                 plugins: [
                  [
                    'postcss-preset-env',
                    {
                      // Options
                    },
                  ],
                ],
              }
            }
          }
        ]
      },
    ]
  },
  plugins: [
    new htmlWebpackPlugin({
      template: './src/index.html'
    }),
    new miniCssExtractPlugin({
      filename:'styles/built.css' // 确保目录结构一致
    }),
    // 压缩css，默认配置足够了，可以看到会被压缩成一行css
    new optimizeCssAssetsWebpackPlugin()
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