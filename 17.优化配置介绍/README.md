# webpack 性能优化

- 开发环境性能优化
- 生产环境性能优化

## 开发环境性能优化

- 优化打包构建速度
  - HMR
    - css --> style-loader 自己处理
    - js --> 自己写
    - html --> 不需要处理
- 优化代码调试
  - source-map

## 生产环境性能优化

- 优化打包构建速度
  - oneOf --> 相当于 break，减少无用 loader 的 test
  - babel 缓存
  - 多进程打包
  - externals
  - dll --> 可与 code split 结合，使用拆分第三方库 bundle 文件
- 优化代码运行的性能
  - 缓存（hash -> chunkhash -> contenthash）
  - tree shaking -> 减少体积
  - code split -> 并行加载，分单入口（较多）和多入口场景
  - 懒加载/预加载
  - pwa --> 离线可访问技术，serviceWorker + cache 实现
