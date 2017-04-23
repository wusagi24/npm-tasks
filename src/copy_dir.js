'use strict';

// yarn add -D fs-extra
const fs = require('fs-extra');

/**
 * 指定ディレクトリをコピーするタスク
 * @param {string} origin - コピー元ディレクトリの絶対パス
 * @param {string} target - コピー先ディレクトリの絶対パス
 * @return {Promise}
 */
function copyDir(origin, target) {
  return new Promise((resolve, reject) => {
    fs.copy(origin, target, (err) => {
      if (err) {
        reject(new Error(err));
      } else {
        resolve();
      }
    });
  });
}

module.exports = copyDir;
