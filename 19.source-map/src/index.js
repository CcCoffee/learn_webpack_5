/* eslint-disable no-console */
// 引入 iconfont 样式文件
import './styles/iconfont.css';
import './styles/index.less';
import print from './print';

console.log('index.js 文件被加载了');

print();

const log = () => {
  console.log('Hello');
};

log();

if (module.hot) {
  // 一旦 module.hot = true，说明开启了 HMR 功能 ---> 让 HMR 功能生效
  // 只需要配置自己正在调试的模块即可
  module.hot.accept('./print.js', () => {
    // 方法会监听 print.js 文件的变化，一旦发生变化，其他模块不会重新打包构建。会执行后面的回调函数
    // vue 和 react 都有各自的热更新插件

    /*
      修改print.js文件后浏览器输出以下日志。说明回调函数被调用

      index.js:56 [WDS] App updated. Recompiling...
      reloadApp.js:19 [WDS] App hot update...
      log.js:24 [HMR] Checking for updates on the server...
      print.js:7 hello print
      log.js:24 [HMR] Updated modules:
      log.js:24 [HMR]  - ./src/print.js
    */
    print();
  });
}
