const { resolve } = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

/*
  缓存：
    babel缓存
      cacheDirectory: true
      --> 让第二次打包构建速度更快
    文件资源缓存
      hash: 每次webpack构建打包会生成一个唯一的hash，作为文件名的一部分
        问题：当因为js和css同时使用一个hash，如果重新打包会导致所有缓存实效。（可能我只改了一个文件而导致所有缓存失效）
      chunkhash：根据chunk生成的hash。如果打包来源于同一个chunk，那么hash就一样
        问题：js和css的hash值还是一样的
          因为css是在js中被引入的，所以同属于一个chunk
      contenthash：根据文件的内容生成hash值，不同的文件hash值一定不一样
      --> 让代码上线运行缓存更好使用
*/
const commonCssLoader = [
  // 'style-loader',
  MiniCssExtractPlugin.loader,
  'css-loader', // 如果使用loader的默认配置就直接写字符串
  {
    // 如果需要修改配置就写成对象的方式
    // 还需要在package.json中定义browerlist
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
      },
    },
  },
];

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/built.[contenthash:10].js',
    /**
     * With zero configuration,
     *   clean-webpack-plugin will remove files inside the directory below
     */
    path: resolve(__dirname, 'build'),
    publicPath: '/',
  },
  target: ['web', 'es5'], // 兼容IE必须加上 target
  module: {
    rules: [
      /*
        正常来说，一个文件只能被一个loader处理。
        当一个文件要被多个loader处理，那么一定要指定laoder执行的先后顺序。
        限制性eslint-loader还是执行babel-loader呢？
        先执行eslint，再执行babel。
        1. 语法有错再执行babel就没有意义了。
        2. 转换成es 5后再进行语法检查会报语法错误
      */
      {
        // 在package.json 中添加eslintConfig --> airbnb
        // "eslintConfig": {
        //   "extends": "airbnb-base"
        // }
        test: /\.js$/,
        exclude: /node_modules/,
        // 优先执行
        enforce: 'pre',
        loader: 'eslint-loader',
        options: {
          fix: true, // 自动修复语法错误
        },
      },
      {
        // 以下loader只会匹配一个，相当于break
        // 注意：不能有两项配置处理同一种类型的文件，如eslint-loader和babel-loader都要处理js，
        // 这时候只需要保留一个在oneOf中其他的loader提取到oneOf以外即可
        oneOf: [
          {
            test: /\.css$/,
            use: [...commonCssLoader],
          },
          {
            test: /\.less$/,
            use: [...commonCssLoader, 'less-loader'],
          },
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env', // 对基本环境进行兼容性处理，如箭头函数，const let 三点运算符等
                  {
                    useBuiltIns: 'usage',
                    corejs: { version: 3 },
                    targets: {
                      chrome: '60',
                      firefox: '50',
                    },
                  },
                ],
              ],
              // 开启babel 缓存
              // 第二次构建时，会读取之前的缓存。避免重新构建所有js文件
              cacheDirectory: true,
            },
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
            exclude: /\.(css|less|js|html|jpg|jpeg|png|gif)/,
            loader: 'file-loader',
            options: {
              outputPath: 'media',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/built.[contenthash:10].css',
    }),
    new OptimizeCssAssetsWebpackPlugin(), // 压缩css
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
