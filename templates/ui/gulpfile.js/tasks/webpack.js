


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
		console.log('DIR', __dirname, context);
		var modulesDirectories = path.join( __dirname, '../../node_modules/' );
		console.log('Modules', modulesDirectories);

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
			var prodOptions = {
				plugins: [
					// Minify the compiled JS:
					new webpack.optimize.UglifyJsPlugin({
						sourceMap: false,
						mangle: false
					}),
					// Make sure we dont have dupes:
					new webpack.optimize.DedupePlugin(),
				]
			};
			options = lodash.extend(options, prodOptions);

			// Strip out console.log for prod:
			options.module.loaders.push({
				test: /\.js$/,
				loader: 'strip-loader?strip[]=console.log'
			});
		}else{
			options.devtool = 'source-map';
		}
		return options;
	};

	// Dev version:
	var webPackTask = function( mode ){
		return function( callback ){
			var options = getOptions( (mode != 'dev'));
			console.log('Options:', options);
			var WPAC = webpack(options).watch(200, function(err, stats){
				console.log('WPAC done', err);
				if(err){
					notify({
						title: '',
						'subtitle': 'WebPack Error',
						'message': err.message,
						'icon': path.join(__dirname, 'app/images/logo.png'), // case sensitive
					});
				}
				if(mode == 'dev'){
					browserSync.reload();
					// On the initial compile, let gulp know the task is done
					if(!initialCompile){
						initialCompile = true;
						callback();
					}
				}else{
					callback();
				}
			});
		};
	};

	gulp.task('webpack:watch', webPackTask('dev'));
	gulp.task('webpack:production', webPackTask('prod'));

	return {
		getOptions: getOptions
	};

};
