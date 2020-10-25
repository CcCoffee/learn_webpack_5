/**
 * webpack.config.js webpack的配置文件
 * 指示webpack干哪些活（当你运行webpack指令的时候，会加载里面的配置）
 * 
 * 所有的构建工具都是基于nodejs平台运行的，模块化默认使用commonjs
 */
const { resolve } = require('path')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'built.js',
    // __dirname nodejs的变量，代表当前文件的目录的绝对路径
    path: resolve(__dirname, 'build')
  },
  // loader 的配置（处理资源）
  module: {
    rules: [
      // 详细loader配置，不同文件类型需要不同loader处理
      {
        // 匹配哪些文件
        test:/\.css$/,
        // 使用哪些loader进行处理
        use: [
          // use 数组中loader执行顺讯：从右到左，从下到上，依次执行
          // 2. 创建一个style标签，将 js 中的样式资源插入，添加到head中生效
          'style-loader',
          // 1. 将 css 文件变成 commonjs 模块加载到js中，里面内容是样式字符串
          'css-loader',
        ]
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          // 需要安装 less-loader 和 less
          'less-loader',
        ]
      }
    ]
  },
  plugins: [
    //详细plugins的配置
  ],
  mode: 'development',
  // mode: 'production',
}