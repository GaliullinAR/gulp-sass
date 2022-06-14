const gulp = require('gulp');
const scss = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const del = require('del');


function browser() {
  browserSync.init({
    server: {
      baseDir: 'app'
    },
    port: 8000,
    notify: false
  });
};

function build() {
  return gulp.src([
    'app/css/*.css',
    'images/**/*.*',
    'app/index.html',
    'app/fonst/*.*',
    'app/js/*.js',
  ], {base: 'app'})
    .pipe(gulp.dest('dist'))
}

function clear() {
  return del('dist')
}

function sass() {
  return gulp.src('app/scss/style.scss')
    .pipe(scss({
      outputStyle: 'compressed'
    }))
    .pipe(concat('style.min.css'))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.stream())
}

function watching() {
  gulp.watch(['app/scss/style.scss'], sass);
  gulp.watch(['app/index.html']).on('change', browserSync.reload);
}

exports.browser = browser;
exports.sass = sass;
exports.watching = watching;
exports.build = build;
exports.clear = clear;
exports.default = gulp.series(clear, sass, gulp.parallel(browser, watching));
