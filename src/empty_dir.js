'use strict';

// yarn add -D fs-extra
const fs = require('fs-extra');

/**
 * 指定ディレクトリを空にするタスク
 * @param {string} target - 空にするディレクトリの絶対パス
 * @return {Promise<void, Error>}
 */
function emptyDir(target) {
  return new Promise((resolve, reject) => {
    fs.emptyDir(target, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

module.exports = emptyDir;
