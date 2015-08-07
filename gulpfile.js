var jshint = require('gulp-jshint');
var gulp   = require('gulp');

gulp.task('default', function () {
    gulp.src(['file.js'])
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('jshint-stylish'));
});
