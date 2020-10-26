const { resolve } = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
// 提取css文件，单独的css文件使用link标签引入，不会出现闪屏现象，style标签则会。js文件也会减小。
//npm i mini-css-extract-plugin -D
const miniCssExtractPlugin = require("mini-css-extract-plugin")

//设置node环境变量，给postcss使用，否则postcss默认使用production配置
// process.env.NODE_ENV='development';

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
          "css-loader", // 将css整合到js文件中。

          // 使用loader的默认配置
          // "postcss-loader",

          // 修改loader的配置
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                ident: 'postcss',
                  // postcss 的插件
                  // 帮助postcss首先找到package.json的browerslist里面的配置，通过配置加载指定的css兼容性样式。
                  /*
                    "browerslist": {
                      // 开发环境-》 设置node环境变量：process.env.NODE_ENV='development'
                      "development": [
                        "last 1 chrome version",
                        "last 1 firefox version",
                        "last 1 safari version"
                      ],
                      // 默认使用生产环境的
                      "production": [
                        ">0.2%", // 覆盖基本上全部的浏览器
                        "not dead", // 不要已经死的浏览器
                        "not op_mini all"
                      ]
                    },

                    执行webpack后的构建结果：
                    #box1 {
                        width: 200px;
                        height: 100px;
                        background-color: red;
                        display: flex;
                        -webkit-backface-visibility: hidden; #自动添加对浏览器的兼容性支持，不用程序员操心
                                backface-visibility: hidden;
                    }
                  */
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