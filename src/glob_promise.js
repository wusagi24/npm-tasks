'use strict';

// yarn add -D glob
const glob = require('glob');

/**
 * glob をコールバックから Promise に書き換えた task
 * @param {string}  pattern - 検索に利用する glob パターン
 * @param {?string} base    - 検索をかけるルートパス
 * @return {Promise<string[], Error>} - マッチしたパス群を返す Promise オブジェクト
 */
function globPromise(pattern, base = null) {
  const opts = {
    cwd: (base) ? base : process.cwd(),
    matchBase: true,
  };

  return new Promise((resolve, reject) => {
    glob(pattern, opts, (err, files) => {
      if (err) {
        reject(err);
      } else {
        resolve(files);
      }
    });
  });
}

module.exports = globPromise;
