/* eslint-disable no-console */

const log = () => {
  console.log('Hello world');
};

log();

/*
 通过js代码，让某个文件被单独打包成一个chunk
 import 动态导入语法：能将某个文件单独打包。一般用在路由懒加载
 通过webpack注释给生成的js文件起个名字 webpackChunkName: 'print'
*/
import(/* webpackChunkName: 'print' */ './print')
  .then(({ print }) => {
    print();
  })
  .catch((err) => {
    console.log('加载print.js失败');
  });
