'use strict';

// yarn add -D fs-extra
const fs = require('fs-extra');

/**
 * 指定ディレクトリ階層を作成する mkdir -p
 * @param {string} dirPath - 作成するディレクトリ階層
 * @return {Promise<void, Error>}
 */
function mkdirp(dirPath) {
  return new Promise((resolve, reject) => {
    fs.mkdirp(dirPath, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

module.exports = mkdirp;
