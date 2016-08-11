
var notify 			= require('gulp-notify');
var lodash			= require('lodash');


module.exports = function( ops ){

	var gulp = ops.gulp;
	var config = ops.config;
	var browserSync = ops.browserSync;
	var gulpSequence = ops.gulpSequence;

	gulp.task('default', function( cb ){

		process.env.prod = false;
		return gulpSequence( 'clean', [ 'sass:watch', 'html:watch', 'webpack:watch', 'fonts:watch', 'images:watch' ], 'browserSync', cb );

	});

};