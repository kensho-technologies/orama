const HtmlPlugin = require('html-webpack-plugin')

const {WEBPACK_SERVE} = process.env

module.exports = {
  entry: `${__dirname}/website`,
  plugins: [new HtmlPlugin({title: 'Orama'})],
  devtool: WEBPACK_SERVE ? 'cheap-module-source-map' : 'source-map',
  mode: WEBPACK_SERVE ? 'development' : 'production',
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
