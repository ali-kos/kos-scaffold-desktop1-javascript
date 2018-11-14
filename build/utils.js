const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require('path');
function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

exports.cssLoaders = function (options) {
    const devMode = process.env.NODE_ENV !== 'production'

    options = options || {}

    const extractLoader = {
        loader: MiniCssExtractPlugin.loader,
        options: {
            publicPath: "../../"
        }
    }

    const styleLoader = {
        loader: 'style-loader',
    }

    const cssLoaderModules = {
        loader: 'css-loader',
        options: {
            sourceMap: options.sourceMap,
            modules: true,
            localIdentName: '[local]___[hash:base64:5]',
            importLoaders: 1
        }
    }

    const cssLoaderNoModules = {
      loader: 'css-loader',
      options: {
        sourceMap: options.sourceMap,
        importLoaders: 1,
      }
    }

    const postcssLoader = {
        loader: 'postcss-loader',
        options: {
            sourceMap: options.sourceMap
        }
    }

    function generateLoaders (precompile, type) {
      const cssLoader = type === 'node_modules' ? cssLoaderNoModules : cssLoaderModules
      const use = !devMode ? [extractLoader, cssLoader, postcssLoader] : [styleLoader, cssLoader, postcssLoader]

      if (precompile.type !== 'css') {
        use.push({
          loader: precompile.type + '-loader',
          options: Object.assign({}, precompile.options || {}, {
            sourceMap: options.sourceMap
          })
        })
      }

      let loader = {
        test: precompile.test,
        use
      }

      if(type === 'node_modules'){
        loader.include = [resolve('node_modules/')]
      }else{
        loader.exclude = [resolve('node_modules/')]
      }

      return loader
    }

    // https://vue-loader.vuejs.org/en/configurations/extract-css.html
    const cssPrecompile = [
      {
        test: /\.css$/,
        type: 'css'
      },
      {
        test: /\.less/,
        type: 'less',
        options: { javascriptEnabled: true }
      },
      {
        test: /\.sass/,
        type: 'sass'
      },

      {
        test: /\.stylus/,
        type: 'stylus'
      },
      {
        test: /\.styl/,
        type: 'styl'
      }
    ]
    let loaders = []

    cssPrecompile.forEach(_ => {
      loaders.push(generateLoaders(_))
      loaders.push(generateLoaders(_,'node_modules'))
    })

    return loaders
}