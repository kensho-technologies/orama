'use strict';

var webpack = require('webpack');

var plugins = [
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  })
];

var config = {
  entry: './src/main.js',
  output: {
    path: __dirname + '/dist/',
    filename: 'bundle.js',
    publicPath: '/'
  },
  plugins: plugins,
  resolve: {
    extensions: ['', '.js']
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel-loader'],
      exclude: /node_modules/
    }]
  },
};

if (process.env.NODE_ENV === 'production') {
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        screw_ie8: true,
        warnings: false
      }
    })
  );
} else {
  config.devtool = 'cheap-eval-source-map';
  config.devServer = {
    info: false,
    port: 3000,
    quiet: true
  };
  config.module.loaders[0].loaders.unshift('react-hot');
}

module.exports = config;
