
var notify 			= require('gulp-notify');
var lodash			= require('lodash');


module.exports = function( ops ){

	var gulp = ops.gulp;
	var config = ops.config;
	var browserSync = ops.browserSync;

	var settings = config.browserSync || {
		server: {
			baseDir: config.dest,
		},
		notify: false,
		ghostMode: false,
		port: config.uiPort,
	};

	var browserSyncTask = function( cb ){
		browserSync.init( settings );

		gulp.watch([
			config.dest+"/**/*.html",
		]).on( 'change', browserSync.reload );
	}

	gulp.task( 'browserSync', browserSyncTask );

	return browserSyncTask;

};