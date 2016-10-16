var gulp = require('gulp');
var fs = require('fs-extra');
var path = require('path');
var babel = require('gulp-babel');
var concat = require('gulp-concat');

gulp.task('default', ['build']);

gulp.task('build', [
	'clean',
	'bundle-js'
]);

gulp.task('clean', cb => {
	fs.remove(path.join(__dirname, 'dist'), cb);
});

gulp.task('bundle-js', () => {
	return gulp.src(['./app/**/*.js', '!./app/**/*.spec.js'])
		.pipe(babel({presets: ['es2015']}))
		.pipe(concat('app.js'))
		.pipe(gulp.dest('./dist'));
});