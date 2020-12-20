/* eslint-disable no-console */
// 引入 iconfont 样式文件
import '../styles/iconfont.css';
import '../styles/index.less';
import { print } from './print';

const log = () => {
  // eslint-disable-next-line no-console
  console.log('Hello world');
};

log();
print();

/*
  1. eslint 不认识 window、navigator变量
    解决：需要修改package.json 中eslintConfig配置
      "eslintConfig": {
        "extends": "airbnb-base",
        "env": {
          "browser": true
        }
      },
  2. sw 代码必须运行在服务器上
     --> nodejs
     --> npm i serve -g
         serve -s build 启动服务器将build目录下的所有文件作为静态资源暴露出去
*/
// 注册 serviceworker
// 处理兼容性问题
// 注意：这个demo测试不成功
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then(() => {
        console.log('sw 注册成功了～');
      })
      .catch(() => {
        console.log('sw 注册失败了～');
      });
  });
}
