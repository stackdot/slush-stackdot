

var path 			= require('path');
var notify 			= require('gulp-notify');

module.exports = function( ops ){

	var gulp = ops.gulp;
	var config = ops.config;
	var env = ops.env;
	var browserSync = ops.browserSync;

	var paths = {
		src: path.join( config.app, config.tasks.html.src ),
		dest: path.join( config.dest )
	};

	var htmlTask = function(){
		var PROD = Boolean.parse(process.env.prod);
		var stream = gulp.src( paths.src )
			.pipe(gulp.dest( paths.dest ));
		if(!PROD)
			stream = stream.pipe(browserSync.stream());
		return stream;
	};

	gulp.task('html', htmlTask);
	gulp.task('html:watch', ['html'], function(){
		return gulp.watch( paths.src, ['html'] );
	});

	return htmlTask;

};
