const { resolve } = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// 定义nodejs环境变量，决定使用browserlist的哪个环境，默认使用production环境
// process.env.NODE_ENV = 'development';

// 复用loader
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
    filename: 'js/built.js',
    /**
     * With zero configuration,
     *   clean-webpack-plugin will remove files inside the directory below
     */
    path: resolve(__dirname, 'build'),
    publicPath: './',
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
            },
          },
          {
            test: /\.(jpg|jpeg|png|gif)/,
            loader: 'url-loader',
            options: {
              limit: 8 * 1024,
              name: '[hash:10].[ext]',
              outputPath: 'images',
              esModule: false, // 默认使用es 6模块化，与html-loader有冲突
            },
          },
          {
            test: /.html$/,
            loader: 'html-loader', // 处理 html 中的图片问题。使用 commonJs
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
      filename: 'css/built.css',
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
