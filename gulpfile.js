'use strict';
var gulp        = require('gulp'),
	gutil       = require('gulp-util'),
	source      = require('vinyl-source-stream'),
	browserify  = require('browserify'),
	watchify    = require('watchify'),
	babelify    = require('babelify'),
	less        = require('gulp-less'),
	connect     = require('gulp-connect'),
	open = require('gulp-open'),
	dest        = './dist';




var notify = require('gulp-notify'); // Provides notification to both the console and Growel
var rename = require('gulp-rename'); // Rename sources
var buffer = require('vinyl-buffer'); // Vinyl stream support
var merge = require('utils-merge'); // Object merge tool
var duration = require('gulp-duration'); // Time aspects of your gulp process

// Configuration for Gulp
var config = {
	js: {
		src: './src/js/index.js',
		watch: './src/js/**/*',
		outputDir: './dist/js/',
		outputFile: 'index.js',
	},
};




// Error reporting function
function mapError(err) {
	if (err.fileName) {
		// Regular error
		gutil.log(gutil.colors.red(err.name)
			+ ': ' + gutil.colors.yellow(err.fileName.replace(__dirname + '/src/js/', ''))
			+ ': ' + 'Line ' + gutil.colors.magenta(err.lineNumber)
			+ ' & ' + 'Column ' + gutil.colors.magenta(err.columnNumber || err.column)
			+ ': ' + gutil.colors.blue(err.description));
	} else {
		// Browserify error..
		gutil.log(gutil.colors.red(err.name)
			+ ': '
			+ gutil.colors.yellow(err.message));
	}
}

// Completes the final file outputs
function bundle(bundler) {
	var bundleTimer = duration('Javascript bundle time');
	bundler
		.bundle()
		.on('error', mapError) // Map error reporting
		.pipe(source('index.js')) // Set source name
		.pipe(buffer()) // Convert to gulp pipeline
		.pipe(rename(config.js.outputFile)) // Rename the output file
		.pipe(gulp.dest(config.js.outputDir)) // Set the output folder
		.pipe(notify({
			message: 'Generated file: <%= file.relative %>',
		})) // Output the file being created
		.pipe(bundleTimer); // Output time timing of the file creation

	bundler.on('time', function (time) {
		gutil.log('✅ ', gutil.colors.green('Built Scripts in'), gutil.colors.cyan(time + 'ms'));
	});
}
gulp.task('less',function () {
	gulp.src('./src/less/style.less').pipe(gulp.dest('./dist/less'));
	gulp.src('./src/less/rtl.less')
		.pipe(less({}))
		.pipe(gulp.dest('./dist/css'))
		.pipe(connect.reload());
	return gulp.src('./src/less/app.less')
		.pipe(less({}))
		.pipe(gulp.dest('./dist/css'))
		.pipe(connect.reload());
});

gulp.task('copy',function () {
	gulp.src('./src/img/**/*.*').pipe(gulp.dest('./dist/img'));
	gulp.src('./src/fonts/*.*').pipe(gulp.dest('./dist/fonts'));
	gulp.src('./src/js/libs/**/*').pipe(gulp.dest('./dist/js/libs'));
	gulp.src('./src/css/**/*').pipe(gulp.dest('./dist/css'));
	gulp.src('./src/**/*.html').pipe(gulp.dest('./dist'));

});

gulp.task('build-reload',['less'], function() {
	gulp.src('src/**/*').pipe(connect.reload());
});

gulp.task('watch', ['build-reload'], function() {
	gulp.watch('src/**/*', ['build-reload']);
});

gulp.task('server', function() {
	connect.server({
		root: dest,
		host: 'localhost',
		port: 3000,
		livereload: false
	});
});

gulp.task('open', function(){
	var options = {
		uri: 'localhost:3000',
		app: 'google-chrome',
	};
	gulp.src('')
		.pipe(open(options));
});

gulp.task('default',['copy','less','watch','server'], function() {
	var args = merge(watchify.args, { debug: false }); // Merge in default watchify args with browserify arguments
	var bundler = browserify(config.js.src, args) // Browserify
		.plugin(watchify, {ignoreWatch: ['**/node_modules/**', '**/bower_components/**']}) // Watchify to watch source file changes
		.transform(babelify, {presets: ['es2015', 'react']}); // Babel tranforms

	bundle(bundler); // Run the bundle the first time (required for Watchify to kick in)

	bundler.on('update', function() {
		bundle(bundler); // Re-run bundle on source updates
	});
});


