/**
 * vscode 需要配置以下内容才能与prettierrc配置格式化
 {
  // eslint配置项，保存时自动修复
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  // 默认使用prettier格式化支持的文件
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  // 自动设定eslint工作区
  "eslint.workingDirectories": [{ "mode": "auto" }],
  "editor.formatOnSave": true
 }
 */

const log = () => {
  // eslint-disable-next-line no-console
  console.log('Hello world');
};

log();
