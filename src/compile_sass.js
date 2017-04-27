'use strict';

const fs = require('fs');

// yarn add -D postcss precss postcss-sorting stylefmt csswring
const postcss = require('postcss');
// PostCSS plugins
const precss = require('precss');
const postcssSorting = require('postcss-sorting');
const stylefmt = require('stylefmt');
const csswring = require('csswring');
// PostCSS parser
const parser = require('postcss-comment'); // コメント解決


// TODO: node-sass とその他個別モジュールを使った構成に書き換える（脱 PostCSS）
/**
 * Sass の変換処理を行うタスク
 * @param {string}  src              - 変換元ファイルのパス
 * @param {string}  dist             - 変換後ファイルの出力先パス
 * @param {boolean} [minify=false]   - 圧縮をかけるか否か
 * @return {Promise}
 */
function compileSass(src, dist, minify = false) {
  const plugins = [
    precss,         // sass ライクな記法を処理
    postcssSorting, // ソート
    stylefmt,       // 整形
  ];

  if (minify) {
    plugins.push(csswring); // 圧縮
  }

  return new Promise((resolve, reject) => {
    fs.readFile(src, (err, sass) => {
      postcss(plugins)
        .process(sass, { from: src, to: dist, parser })
        .then(result => {
          fs.writeFile(dist, result.css, resolve);
          if (result.map) fs.writeFile(`${dist}.map`, result.map);
        })
        .catch(err => {
          reject(new Error(err));
        });
    });
  });
}

module.exports = compileSass;
