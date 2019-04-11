var fs = require('fs');
var path = require('path');
var glob = require('glob');
var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var WebpackShellPlugin = require('webpack-shell-plugin');
var nodeExternals = require('webpack-node-externals')

var entries = [];

glob.sync("./lib/ext/*/dist/*.js").forEach(function(ext) {
  console.log('Loading Extension: ', ext);
  entries.push(ext);
});

entries.push('./src/index.js');

module.exports = {
  target: 'node',
  externals: [nodeExternals()],
  entry: entries,
  output: {
    path: path.join(__dirname, "public"),
    filename: 'bundle.js'
  },
  resolveLoader: {
    modulesDirectories: ['node_modules']
  },
  plugins: [
    new WebpackShellPlugin({
      onBuildStart:['node ' + path.resolve(__dirname, 'scripts/generateResources.js')]
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      }
    }),
    new webpack.NoErrorsPlugin(),
    new webpack.IgnorePlugin(/vertx/)
  ],
  debug: true,
  devtool: 'source-map',
  resolve: {
    extensions: ['', '.js', '.scss'],
    alias: {
      Root: path.resolve(__dirname, 'src'),
      Game: path.resolve(__dirname, 'src/game'),
      Events: path.resolve(__dirname, '../shared/events'),
      Network: path.resolve(__dirname, 'src/network'),
      Redux: path.resolve(__dirname, 'src/redux'),
      Extensions: path.resolve(__dirname, 'src/ext'),
      Util: path.resolve(__dirname, 'src/util')
    }
  },
  module: {
    preLoaders: [
      { test: /\.jsx?$/,    loader: 'babel', include: path.join(__dirname, 'src') },
      { test: /\.scss$/,    loader: 'style!css!sass' },
      { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' }
    ],
    loaders: [
      { test: /\.jsx?$/, loader: 'babel', exclude: /node_modules/ }
    ]
  }
};