console.log('index.js 被加载了');

/*
  懒加载：前提是webpack在构建bundle时进行了代码分割。之后才可以对这个单个js文件进行懒加载
  不会重复加载。
  预加载：webpackPrefetch: true 一开始就发起网络请求，在使用之前提前加载这个js文件。IE浏览器有兼容性问题，慎用
  正常加载可以认为是并行加载（同一时间加载多个文件）；预加载 prefetch：等其他资源加载完毕，浏览器空闲了再偷偷下载
*/
// eslint-disable-next-line no-undef
document.getElementById('btn').onclick = function () {
  import(/* webpackChunkName: 'print', webpackPrefetch: true */ './print')
    .then(({ print }) => {
      print();
    })
    .catch((err) => {});
};
