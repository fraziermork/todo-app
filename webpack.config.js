const webpack       = require('webpack');
const autoprefixer  = require('autoprefixer');
const ExtractPlugin = require('extract-text-webpack-plugin');
const CleanPlugin   = require('clean-webpack-plugin');

// set by the npm script that was run
const production    = process.env.NODE_ENV === 'production' || process.npm_lifecycle_event === 'build:production';

// set in the .npmrc file
const API_URL       = process.env.API_URL || process.env.npm_config_dev_url;

const PATHS = {
  entry: `${__dirname}/frontend/app/entry`, 
  build: `${__dirname}/frontend/build`
};

let plugins = [
  new ExtractPlugin('bundle.css'),
  new webpack.optimize.CommonsChunkPlugin({
    name:       'vendor', 
    children:   true,
    minChunks:  2
  }),
  new webpack.optimize.OccurenceOrderPlugin(),
  new CleanPlugin('build'),
  new webpack.DefinePlugin({
    // Deployment url of the backend or localhost for testing
    __API_URL__:            JSON.stringify(API_URL), 
    
    // Controls whether console logs and other dev features take place
    // TODO: switch from boolean to regex? Not sure if webpack smart enough for that
    __DEVONLY__:            !production, 
    
    // The name of the cookie to attach as X-`${__COOKIE_NAME__}` as a header for authentication
    __COOKIE_NAME__:        JSON.stringify(process.env.npm_config_auth_cookie_name), 
    
    // The break point from mobile to fullscreen, currently defined as 992 px, the bootstrap md breakpoint
    __MOBILE_BREAK_POINT__: process.env.npm_config_mobile_break_point
  })
];

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
    bundle:     [
      'bootstrap-loader/extractStyles', 
      PATHS.entry
    ],
    
    // unlike loaders, this goes left to right, top to bottom
    vendor:     [
      'angular', 
      'angular-route', 
      'angular-cookies', 
      'angular-drag-and-drop-lists'
    ]
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
        loader:   ExtractPlugin.extract('style', 'css!postcss!sass', { allChunks: true }),
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
    progress:           true,
    stats:              'errors-only'
  }, 
  stats: {
    reasons:            true,
    errorDetails:       true
  },
  plugins: plugins,
  
  // Copied from postcss loader instructions
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
