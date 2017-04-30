'use strict';

const fs = require('fs');

// yarn add -D node-sass postcss autoprefixer postcss-sorting stylefmt csswring
const sass = require('node-sass');
const postcss = require('postcss');
// PostCSS plugins
const autoprefixer = require('autoprefixer');
const postcssSorting = require('postcss-sorting');
const stylefmt = require('stylefmt');
const csswring = require('csswring');

/**
 * Sass の変換処理を行うタスク
 * @param {string}  src              - 変換元ファイルのパス
 * @param {string}  dist             - 変換後ファイルの出力先パス
 * @param {boolean} [minify=false]   - 圧縮をかけるか否か
 * @return {Promise}
 */
function compileSass(src, dist, minify = false) {
  return buildSass(src)
    .then(css => processPostCSS(css, minify))
    .then(data => outputFile(dist, data));
}

function buildSass(file) {
  const opts = {
    file: file,
  };
  return new Promise((resolve, reject) => {
    sass.render(opts, (err, data) => {
      if (err) reject(err);
      else resolve(data.css.toString());
    });
  });
}

function processPostCSS(css, minify) {
  const plugins = [
    postcssSorting, // ソート
    autoprefixer,   // プレフィックス付与
    stylefmt,       // 整形
  ];

  if (minify) {
    plugins.push(csswring); // 圧縮
  }

  return new Promise((resolve, reject) => {
    postcss(plugins).process(css)
      .then(result => {
        resolve(result.css);
      })
      .catch(err => {
        reject(new Error(err));
      });
  });
}

function outputFile(path, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, err => {
      if (err) reject(err);
      else resolve();
    });
  });
}

module.exports = compileSass;
