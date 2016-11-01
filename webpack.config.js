var webpack = require('webpack')
var path = require("path")
var BundleTracker = require('webpack-bundle-tracker') // bridge

var autoprefixer = require('autoprefixer');
const bootstrapEntryPoints = require('./webpack.bootstrap.config.js');
var ExtractTextPlugin = require('extract-text-webpack-plugin')
// var BTL = require('bootstrap-loader');

const sassLoaders = [
  'css-loader',
  'postcss-loader',
  'sass-loader',
  'sass-resources'
]

const autoprefixerBrowsers = [
  "Android 2.3",
  "Android >= 4",
  "Chrome >= 20",
  "Firefox >= 24",
  "Explorer >= 8",
  "iOS >= 6",
  "Opera >= 12",
  "Safari >= 6"
]

module.exports = {
  context: __dirname,

  // entry: './webpack_assets/js/index', // entry point of our app. assets/js/index.js should require other js modules and dependencies it needs
  entry: [
    bootstrapEntryPoints.dev,
    './webpack_assets/js/index.js',
  ],
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
      { test: /\.css$/, loaders: ['style', 'css', 'postcss'] },
      { test: /\.scss$/, loaders: ['style', 'css', 'postcss', 'sass'] },
      {
        test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url?limit=10000',
      },
      {
        test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
        loader: 'file',
      },
       // Bootstrap 3
      { test: /bootstrap-sass\/assets\/javascripts\//, loader: 'imports?jQuery=jquery' },
    ],
  },
  postcss: [ autoprefixer({ browsers: autoprefixerBrowsers }) ],
  sassLoader: {
    includePaths: [path.resolve("./webpack_assets/sass")]
  },
  sassResources: './sass-resources.scss',
  resolve: {
    modulesDirectories: ['node_modules', 'bower_components'],
    extensions: ['', '.js', '.jsx', '.scss']
  },
}
