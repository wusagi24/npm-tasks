'use strict';

const fs = require('fs');

// yarn add -D postcss postcss-import postcss-custom-properties postcss-nested postcss-sorting stylefmt autoprefixer csswring
const postcss = require('postcss');
const postcssImport = require('postcss-import');
const postcssCustomProp = require('postcss-custom-properties');
const postcssNested = require('postcss-nested');
const postcssSorting = require('postcss-sorting');
const stylefmt = require('stylefmt');
const autoprefixer = require('autoprefixer');
const csswring = require('csswring');

/**
 * PostCSS の変換処理を行うタスク
 * @param {string}  src              - 変換元ファイルのパス
 * @param {string}  dist             - 変換後ファイルの出力先パス
 * @param {Object}  [prefixOpt=null] - プレフィックスをつける設定 https://github.com/ai/browserslist
 * @param {boolean} [minify=false]   - 圧縮をかけるか否か
 * @return {Promise}
 */
function postcssCompiler(src, dist, prefixOpt = null, minify = false) {
  const plugins = [
    postcssImport,      // インポート
    postcssNested,      // ネスト
    postcssCustomProp,  // 変数
    postcssSorting,     // ソート
    stylefmt,           // 整形
  ];

  if (prefixOpt) {  // プレフィックス付加
    plugins.push(autoprefixer(prefixOpt));
  } else {
    plugins.push(autoprefixer);
  }
  if (minify) {     // 圧縮
    plugins.push(csswring);
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

module.exports = postcssCompiler;
