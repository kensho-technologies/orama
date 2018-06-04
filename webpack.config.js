const HtmlPlugin = require('html-webpack-plugin')

module.exports = {
  entry: `${__dirname}/website`,
  plugins: [new HtmlPlugin({title: 'Orama'})],
  devtool: 'cheap-module-source-map',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader?cacheDirectory',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    alias: {orama: `${__dirname}/src`},
  },
  serve: {
    dev: {logLevel: 'warn'},
    open: true,
  },
}
