## Webpack 五个核心概念
### 1. Entry
入口指示Webpack以哪个入口文件为起点开始打包，分析构建内部依赖图

### 2. Output
输出指示 webpack 打包后的资源bundels输出到哪里去，以及如何命名。

### 3. Loader
Loader 让 webpack 能够去处理那些非 javascript 问题（webpack 自身只理解javascript）。
> 处理css 和img时需要loader翻译成 js

### 4. Plugins
插件可以用于执行范围更广的任务。插件的范围包括，从打包优化和压缩，一直到重新定义环境中的变量等。

### 5. Mode
模式指示webpack使用相应模式的配置

选项 | 描述 | 特点
---|----|---
development | 会将process.env.NODE_ENV的值设为 development。启用 NamedChunkPlugin 和 NamedModulesPlugin。| 能让代码本地调试运行的环境，配置简单
production | 会将process.env.NODE_ENV的值设为 production。启用 FlagDependencyUsagePlugin, FlagIncludeChunksPlugin, ModulesConcatenationPlugin, NoEmitOnErrorsPlugin, OccurrentOrderPlugin, SideEffectsFlagPlugin 和 UglifyJsPlugin | 能让代码本地调试运行的环境

