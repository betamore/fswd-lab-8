var path = require('path'),
    webpack = require('webpack'),
    BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
  entry: './app/index.js',
  output: {
      path: path.join(__dirname, 'public'),
      publicPath: '/',
      filename: 'bundle.js'
  },
  resolve: {
      modules: [path.resolve(__dirname, "app"), "node_modules"]
  },
  module: {
    loaders: [
      // the url-loader uses DataUrls.
      // the file-loader emits files.
      {test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff'},
      {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=application/octet-stream'},
      {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader'},
      {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=image/svg+xml'}
    ],
  },

  plugins: [
      new webpack.ProvidePlugin({
          'window.jQuery': 'jquery'
      }),
      new BrowserSyncPlugin(
  // BrowserSync options
  {
    // browse to http://localhost:3000/ during development
    host: 'localhost',
    port: 3000,
    // proxy the Webpack Dev Server endpoint
    // (which should be serving on http://localhost:3100/)
    // through BrowserSync
    proxy: 'http://localhost:8000/'
  },
  // plugin options
  {
    // prevent BrowserSync from reloading the page
    // and let Webpack Dev Server take care of this
    reload: false
  }
)

  ],

  devtool: 'inline-source-map'
};
