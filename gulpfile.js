'use strict';

const gulp    = require('gulp');
const eslint  = require('gulp-eslint');

const PATHS   = {
  js:     [`${__dirname}/app/**/*.js`, `${__dirname}/test/**/*.js`, './server.js'],
  index:  `${__dirname}/app/main/index.html`, 
  entry:  `${__dirname}/app/entry.js`,
  build:  `${__dirname}/build`
};

gulp.task('eslint', () => {
  return gulp.src(PATHS.js)
    .pipe(eslint())
    .pipe(eslint.format());
});

// gulp.task('app:clear', () => {
//   return del(PATHS.build + '/*');
// });
// 
// gulp.task('app:html', () => {
//   return gulp.src(PATHS.index)
//   .pipe(gulp.dest(PATHS.build));
// });
// 
// gulp.task('app:js', () => {
//   // return gulp.src(PATHS.entry)
//   //   .pipe(webpack(config))
//   //   .pipe(gulp.dest(PATHS.build));
// });

// gulp.task('app:build', ['app:clear', 'app:html', 'app:js'], () => {
//   
// });
