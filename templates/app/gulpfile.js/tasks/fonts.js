


module.exports = function( ops ){

	var gulp = ops.gulp;
	var config = ops.config;
	var env = ops.env;

	var browserSync = ops.browserSync;

	if(!config.tasks.fonts) return;

	var lodash 			= require('lodash');
	var path 			= require('path');
	var notify 			= require('gulp-notify');
	var changed 		= require('gulp-changed');

	var sources = lodash.map(config.tasks.fonts.src, function( src ){
		return path.join( src );
	});

	var paths = {
		src: sources,
		dest: path.join( config.dest, config.tasks.fonts.dest )
	};

	var fontsTask = function( cb ){
		var PROD = Boolean.parse(process.env.prod);
		var stream = gulp.src( paths.src )
			.pipe(changed(paths.dest))
			.pipe(gulp.dest(paths.dest));
		if(!PROD)
			stream = stream.pipe( browserSync.stream() );
		return stream;
	};

	gulp.task('fonts', fontsTask);
	gulp.task('fonts:watch', ['fonts'], function(){
		return gulp.watch( paths.src, ['fonts'] );
	});
	return fontsTask;

};