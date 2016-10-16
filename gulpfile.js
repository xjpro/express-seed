var gulp = require('gulp');
var fs = require('fs-extra');
var path = require('path');

var concat = require('gulp-concat');
var sourceMaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var react = require('gulp-react');

gulp.task('default', ['build']);

gulp.task('build', [
	'clean',
	'move-assets',
	'bundle-js',
	'sass'
]);

gulp.task('watch', ['build'], () => {
	gulp.watch('./assets/**/*.scss', ['sass']); // watch sass changes
	gulp.watch(['./app/**/*.js*', '!./app/**/*.spec.js'], ['bundle-js']); // watch app js changes
});

gulp.task('clean', cb => {
	fs.remove(path.join(__dirname, 'dist'), cb);
});

gulp.task('clean-sass', cb => {
	fs.remove(path.join(__dirname, 'dist', 'style.css'), cb);
});

gulp.task('move-assets', ['clean'], () => {
	return gulp.src(['./assets/fonts/**/*.*','./assets/images/*.*'])
		.pipe(gulp.dest('dist'));
});

gulp.task('bundle-js', () => {
	return gulp.src(['./app/**/*.js*', '!./app/**/*.spec.js'])
		.pipe(sourceMaps.init())
		.pipe(react())
		.pipe(sourceMaps.write())
		.pipe(concat('app-bundle.js'))
		.pipe(gulp.dest('./dist'));
});

gulp.task('sass', ['clean-sass'], () => {
	return gulp.src('./assets/**/*.scss')
		.pipe(sourceMaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(sourceMaps.write())
		.pipe(gulp.dest('./dist'));
});