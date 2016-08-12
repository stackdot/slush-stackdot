


module.exports = function( ops ){

	var gulp = ops.gulp;
	var config = ops.config;
	var env = ops.env;
	var browserSync = ops.browserSync;
	var initialCompile = false;

	if(!config.tasks.webpack) return;

	var path 			= require('path');
	var lodash 			= require('lodash');
	var notify 			= require('gulp-notify');
	var webpack 		= require('webpack');
	var raw 			= require('raw-loader');

	var getOptions = function(PROD){

		PROD = PROD || Boolean.parse(process.env.prod);
		var context = path.join( __dirname, '../../', config.app, config.tasks.webpack.src );
		var dest = path.join( __dirname, '../../', config.dest, config.tasks.webpack.dest );
		var modulesDirectories = path.join( __dirname, '../../node_modules/' );

		// Default DEV settings:
		var options = {
			context: context,
			entry: config.tasks.webpack.artifacts,
			output: {
				path: dest,
				filename: config.tasks.webpack.output
			},
			node: {
				fs: 'empty'
			},
			resolve: {
				root: [ context ],
				// modulesDirectories: [ modulesDirectories ],
				alias: config.tasks.webpack.alias,
			},
			module: {
				loaders: config.tasks.webpack.loaders
			},
			plugins: [
				new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.bundle.js')
			],
			noParse: config.tasks.webpack.noParse || []
		};

		// PROD options ( minify, etc )
		if(PROD === true){
			options.plugins.push(
				// Minify the compiled JS:
				new webpack.optimize.UglifyJsPlugin({
					sourceMap: false,
					mangle: false
				})
			);
			options.plugins.push(
				// Make sure we dont have dupes:
				new webpack.optimize.DedupePlugin()
			);

			// Strip out console.log for prod:
			// options.module.loaders.push({
			// 	test: /\.js$/,
			// 	loader: 'strip-loader?strip[]=console.log'
			// });
		}else{
			options.devtool = 'source-map';
		}
		return options;
	};

	// Dev version:
	var webPackTask_Watch = function( callback ){
		var options = getOptions();
		var WPAC = webpack(options).watch(200, function(err, stats){
			if(err){
				notify({
					title: '',
					'subtitle': 'WebPack Error',
					'message': err.message,
					'icon': path.join(__dirname, 'app/images/logo.png'), // case sensitive
				});
			}
			browserSync.reload();
			// On the initial compile, let gulp know the task is done
			if(!initialCompile){
				initialCompile = true;
				callback();
			}
		});
	};

	// Prod version:
	var webPackTask_Production = function( callback ){
		var options = getOptions(true);
		var WPAC = webpack(options, function(err, stats){
			// logger(err, stats)
			if(err){
				notify({
					title: '',
					'subtitle': 'WebPack Error',
					'message': err.message,
					'icon': path.join(__dirname, 'app/images/logo.png'), // case sensitive
				});
			}
			callback(err);
		});
	};

	gulp.task('webpack:watch', webPackTask_Watch);
	gulp.task('webpack:production', webPackTask_Production);

	return {
		getOptions: getOptions
	};

};
