'use strict';

// yarn add -D webpack webpack-dev-server
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

/**
 * webpack-dev-server を Node.js 経由で実行するタスク
 * @param {Object} webpackConfig - webpack の設定オブジェクト
 * @param {Object} devServerConfig - webpack-dev-server の設定オブジェクト
 * @return {Promise}
 */
function webpackDevServer(webpackConfig, devServerConfig) {
  const devServerUrl = `http://localhost:${devServerConfig.port}`;
  webpackConfig.entry.bundle.unshift(`webpack-dev-server/client?${devServerUrl}/`);
  const compiler = webpack(webpackConfig);
  const devServer = new WebpackDevServer(compiler, devServerConfig);

  return new Promise((resolve) => {
    devServer.listen(devServerConfig.port, '127.0.0.1', () => {
      resolve(devServerUrl);
    });
  });
}

module.exports = webpackDevServer;
