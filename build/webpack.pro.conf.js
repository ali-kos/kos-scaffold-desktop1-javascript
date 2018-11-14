const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const merge = require('webpack-merge');
const CreateMenusPlugin = require('../lib/CreateMenusPlugin');
const config = require('./config');

process.env.NODE_ENV = 'production';
const baseWebpackConfig = require('./webpack.base.conf')('development');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const assetsPath = function (_path) {
  const assetsSubDirectory =
    process.env.NODE_ENV !== 'production'
      ? config.dev.assetsSubDirectory
      : config.build.assetsSubDirectory;

  return path.posix.join(assetsSubDirectory, _path);
};

const proWebpackConfig = merge(baseWebpackConfig, {
  mode: 'production',
  output: {
    path: config.build.assetsRoot,
    filename: assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: assetsPath('js/[name].[chunkhash].js'),
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          // node_modules内的依赖库
          chunks: 'all',
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          minChunks: 1, // 被不同entry引用次数(import),1次的话没必要提取
          maxInitialRequests: 5,
          minSize: 0,
          priority: 100,
          // enforce: true?
        },
      },
    },
    minimizer: [new OptimizeCSSAssetsPlugin({}), new UglifyJsPlugin()],
  },
  plugins: [
    new CreateMenusPlugin({
      path: config.build.createMenusPath,
    }),
    new CleanWebpackPlugin([path.join(__dirname, '../dist')], {
      root: process.cwd(),
      verbose: true,
      dry: false,
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: assetsPath('css/[name].[hash].css'),
      chunkFilename: assetsPath('css/[id].[hash].css'),
      publicPath: '../',
    }),
    new HtmlWebpackPlugin({
      title: 'React简易开发环境',
      template: './index.html',
    }),
  ],
});
// console.log(proWebpackConfig)

module.exports = proWebpackConfig;
