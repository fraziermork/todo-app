// Karma configuration
// Generated on Wed Jul 13 2016 19:31:18 GMT-0700 (PDT)

const webpackConfig = require('./webpack.config');
delete webpackConfig.entry;


const entryFilepath = `${__dirname}/frontend/app/entry.js`;
const testsFilepath = `${__dirname}/frontend/**/*.test.js`;

const preprocessors = {};
preprocessors[entryFilepath] = ['webpack'];
preprocessors[testsFilepath] = ['webpack'];


const browsers = [];
if (process.env.TRAVIS) {
  browsers.push('Chrome_travis_ci');
} else {
  browsers.push('Chrome');
}


module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',
    

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      'node_modules/angular/angular.js', 
      'node_modules/angular-route/angular-route.js', 
      'node_modules/angular-cookies/angular-cookies.js', 
      'node_modules/angular-drag-and-drop-lists/angular-drag-and-drop-lists.js',
      'node_modules/angular-mocks/angular-mocks.js',
      // 'node_modules/bootstrap-loader/extractStyles.js',
      entryFilepath,
      testsFilepath,
    ],


    // list of files to exclude
    exclude: [
    ],
    
    webpack: webpackConfig,

    preprocessors: preprocessors,

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: browsers,


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,
    
    // Custom stuff for running tests with chrome on travis 
    // https://swizec.com/blog/how-to-run-javascript-tests-in-chrome-on-travis/swizec/6647
    customLaunchers: {
      Chrome_travis_ci: {
        base: 'Chrome', 
        flags: ['--no-sandbox'],
      },
      
    },
    
  })
};
