// import gulp from 'gulp';
// import run from 'gulp-run-command'; // or `var run = require('gulp-run-command').default` for ES5
var gulp = require('gulp');
var run = require('gulp-run-command').default;

gulp.task('clean', run('rm -rf dist'))
gulp.task('watch-js', run('./node_modules/babel-cli/bin/babel.js --plugins transform-react-jsx src --watch  --out-dir dist'));
gulp.task('watch-css', run('./node_modules/stylus/bin/stylus -w src/homepage/style.styl -o dist/homepage/style.css'));
gulp.task('watch-all', () => {
  (gulp.parallel("watch-js", "watch-css")());
});

gulp.task('serve', run('node server.js'));
