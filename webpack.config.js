var path = require("path")
var webpack = require('webpack')
var BundleTracker = require('webpack-bundle-tracker') // bridge
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const sassLoaders = [
  'css-loader',
  'sass-loader'
]

module.exports = {
  context: __dirname,

  // entry: './webpack_assets/js/index', // entry point of our app. assets/js/index.js should require other js modules and dependencies it needs
  entry: './webpack_assets/js/index.js',
  output: {
      path: path.resolve('./django_webpack/static/bundles/'),
      filename: "[name].js",
  },

  plugins: [
    new BundleTracker({filename: './webpack-stats.json'}),
    new ExtractTextPlugin('[name].css'),
    new webpack.OldWatchingPlugin()
  ],

  module: {
    loaders: [
      { test: /\.js?$/, exclude: /node_modules/, loader: 'babel-loader'}, // to transform JSX into JS
      { test: /\.scss$/, loader: ExtractTextPlugin.extract('style-loader', sassLoaders.join('!'))}
    ],
  },
  sassLoader: {
    includePaths: [path.resolve("./webpack_assets/sass")]
  },

  resolve: {
    modulesDirectories: ['node_modules', 'bower_components'],
    extensions: ['', '.js', '.jsx', '.scss']
  },
}
