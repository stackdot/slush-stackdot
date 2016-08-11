var path = require('path');
var debug = require('debug')('base-gulp');

module.exports = function( config ){

	var testsBlob = 'app/**/*.spec.js';
	var webpackBlob = 'app/**/*.js';
	var appBlob = 'app/javascript/app.js';

	var files = [
		appBlob,
		testsBlob
	];

	debug('Karma files:', files);

	var options = {

		autoWatch: false,

		files: files,

		webpack: config.webpackConfig,

		webpackMiddleware: {
			noInfo: true
		},

		reporters: ['spec', 'coverage'],

		browsers: ['PhantomJS'],

		frameworks: ['angular', 'jasmine'],

		plugins: [
			'karma-phantomjs-launcher',
			'karma-jasmine',
			'karma-webpack',
			'karma-angular',
			'karma-spec-reporter',
			'karma-coverage'
		],

		preprocessors: { },

		coverageReporter: {
			type: 'text-summary',
			check: {
				global: {
					statements: 0,
					branches: 0,
					functions: 0,
					lines: 0,
					excludes: [
						testsBlob
					]
				}
			}
		}
	};

	options.preprocessors[ webpackBlob ] = ['webpack', 'coverage'];

	config.set( options );
};