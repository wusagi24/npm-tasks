'use strict';

const fs = require('fs');

// yarn add -D postcss postcss-cssnext postcss-sorting stylefmt csswring
const postcss = require('postcss');
// PostCSS plugins
const cssnext = require('postcss-cssnext');
const postcssSorting = require('postcss-sorting');
const stylefmt = require('stylefmt');
const csswring = require('csswring');

/**
 * PostCSS の変換処理を行うタスク
 * @param {string}  src              - 変換元ファイルのパス
 * @param {string}  dist             - 変換後ファイルの出力先パス
 * @param {boolean} [minify=false]   - 圧縮をかけるか否か
 * @return {Promise}
 */
function compilePpostcss(src, dist, minify = false) {
  const plugins = [
    postcssSorting, // ソート
    cssnext,        // cssnext
    stylefmt,       // 整形
  ];

  if (minify) {
    plugins.push(csswring); // 圧縮
  }

  return new Promise((resolve, reject) => {
    fs.readFile(src, (err, scss) => {
      postcss(plugins)
        .process(scss, { from: src, to: dist })
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

module.exports = compilePpostcss;
