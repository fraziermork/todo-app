const webpack       = require('webpack');
// const validate      = require('webpack-validator');

const autoprefixer  = require('autoprefixer');
const ExtractPlugin = require('extract-text-webpack-plugin');
const CleanPlugin   = require('clean-webpack-plugin');
const production    = process.env.NODE_ENV === 'production';

const PATHS = {
  entry: `${__dirname}/app/entry`, 
  build: `${__dirname}/build`
};

let plugins = [
  new ExtractPlugin('bundle.css'),
  new webpack.optimize.CommonsChunkPlugin({
    name:       'vendor', 
    children:   true,
    minChunks:  2
  }),
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.DefinePlugin({
    __API_URL__: process.env.API_URL
  }), 
  new CleanPlugin('build')
];

if (production) {
  plugins = plugins.concat([
    new webpack.optimize.UglifyJsPlugin({
      mangle:   true, 
      compress: {
        warnins: false
      }
    })
  ]);
}

module.exports = {
  debug:  !production, 
  entry:  {
    bundle:     PATHS.entry,
    vendor:     ['angular-route', 'angular']
  },
  output: {
    path:     PATHS.build,
    filename: '[name].js', 
    // pathName: 'build/'
  },
  module: {
    preloaders: [
      {
        test:   /\-directive.js/,
        // only load the template into the directives 
        loader: 'baggage?[dir]-view.html=template', 
      },
      {
        test:   /\.js/,
        // load the styles into all of them, they should get pulled out by the extract plugin
        loader: 'baggage?[dir].scss'
      }
    ], 
    loaders: [
      {
        test:     /\.js$/, 
        loaders: ['babel'],
        include: `${__dirname}/app`
      }, 
      {
        test:     /\.css$/, 
        loader:   ExtractPlugin.extract('style', 'css!postcss', { allChunks: true }),
      }, 
      {
        test:     /\.scss$/, 
        loader:   ExtractPlugin.extract('style', 'css!postcss!sass', { allChunks: true }),
      }, 
      {
        test:     /\.(png|jpe?g|svg)/, 
        loaders:   ['url?limit=10000', 'image-webpack']
      }, 
      {
        test:     /\.html/, 
        loaders:  ['html']
      }, 
      {
        test:     /\.(ttf|eot)/, 
        loader:   'file'
      }, 
      {
        test:     /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader:   'url'
      }
    ]
  }, 
  devServer: {
    devtool:            'eval-source-map',
    contentBase:        PATHS.build, 
    historyApiFallback: true,
    hot:                true,
    inline:             true,
    progress:           true,
    stats:              'errors-only'
  }, 
  stats: {
    reasons:      true,
    errorDetails: true
  },
  plugins: plugins,
  postcss: function() {
    return [autoprefixer({
      browsers: [
        // This list taken from the bootstrap-sass docs 
        'Android 2.3',
        'Android >= 4',
        'Chrome >= 20',
        'Firefox >= 24',
        'Explorer >= 8',
        'iOS >= 6',
        'Opera >= 12',
        'Safari >= 6'
      ]
    })];
  }
};
