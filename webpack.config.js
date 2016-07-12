const webpack       = require('webpack');
// const validate      = require('webpack-validator');

const autoprefixer  = require('autoprefixer');
const ExtractPlugin = require('extract-text-webpack-plugin');
const CleanPlugin   = require('clean-webpack-plugin');
const production    = process.env.npm_lifecycle_event === 'build:production';
const API_URL       = production ? process.env.npm_config_production_url : process.env.npm_config_dev_url;

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
    __API_URL__:     JSON.stringify(API_URL), 
    __DEVONLY__:     !production, 
    __COOKIE_NAME__: JSON.stringify(process.env.npm_config_auth_cookie_name)
  })
];

if (process.env.npm_lifecycle_event !== 'start:dev') {
  plugins.push(new CleanPlugin('build'));
}


if (production) {
  plugins = plugins.concat([
    new webpack.optimize.UglifyJsPlugin({
      mangle:   true, 
      compress: {
        warnings: false
      }
    })
  ]);
}

module.exports = {
  debug:  !production, 
  entry:  {
    bundle:     ['bootstrap-loader/extractStyles', PATHS.entry],
    // unlike loaders, this goes left to right
    vendor:     ['angular', 'angular-route', 'angular-cookies']
  },
  output: {
    path:     PATHS.build,
    filename: '[name].js', 
  },
  module: {
    preLoaders: [
      {
        test:   /-directive\.js/,
        // only load the template into the directives 
        loader: 'baggage?[dir]-view.html=template', 
      },
      {
        test:   /index\.js$/,
        // load the styles into all of the entry files, should be pulled out by the text extract into bundle.css
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
        loader:   ExtractPlugin.extract('style', 'css?sourceMap!postcss?sourceMap!resolve-url?sourceMap!sass?sourceMap', { allChunks: true }),
      }, 
      {
        test:     /\.(png|jpe?g|svg)$/, 
        loaders:   ['url?limit=10000', 'image-webpack?bypassOnDebug']
      }, 
      {
        test:     /\.html$/, 
        loaders:  ['html']
      }, 
      {
        test:     /\.(ttf|eot)$/, 
        loader:   'file'
      }, 
      {
        test:     /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader:   'url?limit=10000'
      },
      {
        test:     /\.json$/,
        loader:   'json'
      }
    ]
  }, 
  devServer: {
    devtool:            'eval-source-map',
    contentBase:        PATHS.build, 
    historyApiFallback: true,
    inline:             true,
    progress:           true,
    stats:              'errors-only'
  }, 
  stats: {
    reasons:            true,
    errorDetails:       true
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
