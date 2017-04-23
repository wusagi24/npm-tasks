'use strict';

// yarn add -D browser-sync
const bs = require('browser-sync').create();

/**
 * browsersync で開発サーバを立ち上げるタスク
 * @param {string}          serveDir - ドキュメントルートとするディレクトリ
 * @param {string|string[]} files    - ブラウザリロードの変更監視対象ファイルパス
 * @param {?number}         port     - サーバを立てるポート番号 デフォルトは 3000
 * @return {Promise}
 */
function browserSyncStart(serveDir, files, port = null) {
  return new Promise((resolve, reject) => {
    const config = {
      server: serveDir,
      files,
    };
    if (port) {
      config.port = port;
    }
    bs.init(config, err => {
      if (err) {
        reject(err);
      }
      resolve();
    });
  });
}

module.exports = browserSyncStart;
