'use strict';

const exec = require('child_process').exec;

/**
 * webpack の CLI 経由でコンパイルするタスク
 * @param {string} configPath - webpack の設定ファイルのパス
 * @return {Promise<string, Error>} - webpack 実行時のログ出力
 */
function webpackCLICompile(configPath) {
  return new Promise((resolve, reject) => {
    exec(`webpack --config ${configPath}`, (err, stdout) => {
      if (err) {
        reject(new Error(stdout));
        return;
      }
      resolve(stdout);
    });
  });
}

module.exports = webpackCLICompile;
