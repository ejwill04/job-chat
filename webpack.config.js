const path = require('path');
const webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  context: __dirname,
  entry: [
    './app/index.js',
  ],
  output: {
    path: __dirname,
    filename: 'bundle.js',
    publicPath: '/',
  },
  module: {
    noParse: [
      /\/sinon\.js/,
    ],
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        loaders: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
      { test: /\.png$/,
        loader: 'url-loader?mimetype=image/png',
      },
    ],
  },
  sassLoader: {
    includedPaths: [
      path.join(__dirname, 'node_modules/normalize-scss/sass'),
    ],
  },
  resolve: {
    alias: {
      sinon: 'sinon/pkg/sinon.js',
    },
    extensions: ['', '.js', '.jsx', '.json', '.scss', '.css', '.png'],
  },
};
