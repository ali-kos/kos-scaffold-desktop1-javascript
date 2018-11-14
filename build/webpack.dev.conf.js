const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const CreateMenusPlugin = require('../lib/CreateMenusPlugin');
const merge = require('webpack-merge');
const config = require('./config');

process.env.NODE_ENV = 'development';
const baseWebpackConfig = require('./webpack.base.conf')('development');

const HOST = process.env.HOST;
const PORT = process.env.PORT && Number(process.env.PORT);
const devWebpackConfig = merge(baseWebpackConfig, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    hot: true,
    quiet: false,
    compress: true,
    clientLogLevel: 'warning',
    proxy: config.dev.proxyTable,
    publicPath: config.dev.assetsPublicPath,
    contentBase: false, // since we use CopyWebpackPlugin.
    watchOptions: {
      poll: config.dev.poll,
    },
  },
  plugins: [
    new CreateMenusPlugin({
      path: config.dev.createMenusPath,
    }),
    new HtmlWebpackPlugin({
      title: 'React简易开发环境',
      template: './index.html',
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
});

module.exports = devWebpackConfig;
