
var karma 			= require('karma');
var path            = require('path');
var debug           = require('debug')('base-gulp');

module.exports = function( ops ){
	var gulp = ops.gulp;
	var karmaServer = karma.Server;

	var configFile = './gulpfile.js/karma.conf.js';

	var webpackOps = require( __dirname+'/webpack.js' );
	webpackOps = webpackOps(ops);
	var webpackConfig = webpackOps.getOptions( false );

	var settings = {
		configFile: configFile,
		webpackConfig: webpackConfig,
		singleRun: true
	};

	var karmaTask = function( done ){
		new karmaServer(settings, done).start();
	};

	gulp.task('test:unit', karmaTask);

	return karmaTask;
};