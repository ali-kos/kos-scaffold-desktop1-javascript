const path = require('path');
const config = require('./config');
const utils = require('./utils');

function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

const baseWebpackConfig = () => {
  const devMode = process.env.NODE_ENV !== 'production';
  const assetsPath = function (_path) {
    const assetsSubDirectory = devMode
      ? config.dev.assetsSubDirectory
      : config.build.assetsSubDirectory;

    return path.posix.join(assetsSubDirectory, _path);
  };
  const sourceMapEnabled = !devMode
    ? config.build.productionSourceMap
    : config.dev.cssSourceMap;
  return {
    context: path.resolve(__dirname, '../'),
    entry: {
      app: './src/main.js',
    },
    output: {
      path: config.build.assetsRoot,
      filename: '[name].js',
      publicPath: !devMode
        ? config.build.assetsPublicPath
        : config.dev.assetsPublicPath,
    },
    resolve: {
      extensions: ['.js', '.json'],
      alias: {
        '@': resolve('src'),
      },
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)/,
          include: [resolve('src')],
          enforce: 'pre',
          loader: 'eslint-loader',
          options: {
            formatter: require('eslint-friendly-formatter'),
            emitWarning: !config.dev.showEslintErrorsInOverlay,
          },
        },
        {
          test: /\.(js|jsx)/,
          use: [
            {
              loader: 'babel-loader',
            },
          ],
          include: [resolve('src')],
        },
        ...utils.cssLoaders({
          sourceMap: sourceMapEnabled,
        }),
        {
          test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: assetsPath('img/[name].[hash:7].[ext]'),
          },
        },
        {
          test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: assetsPath('media/[name].[hash:7].[ext]'),
          },
        },
        {
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: assetsPath('fonts/[name].[hash:7].[ext]'),
          },
        },
      ],
    },
  };
};

module.exports = baseWebpackConfig;
