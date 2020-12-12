// import '@babel/polyfill'; // 方案二全量兼容

const add = (x, y) => x + y; // presets: ['@babel/preset-env']

// eslint-disable-next-line no-console
console.log(add(1, 3));
// eslint-disable-next-line no-console
console.log('test...');
// eslint-disable-next-line no-new
const promise = new Promise((resolve) => {
  setTimeout(() => {
    resolve();
  }, 1000);
});

// eslint-disable-next-line no-console
console.log(promise);
