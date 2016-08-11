'use strict'


// passed in ops:
const gulp 				= require('gulp')
const lodash 			= require('lodash')
const browserSync 		= require('browser-sync')
const gulpSequence 		= require('gulp-sequence').use(gulp)
const program 			= require('commander')
const requireDir		= require('require-dir')



const vendors = [
	'angular',
	'angular-ui-router',
	'angular-animate',
	'angular-aria',
	'angular-material',
	'lodash',
	'q'
]


var config = {
	app: './app',
	dest: './public',
	uiPort: 5000,
	tasks: {
		sass: {
			dest: 'styles',
			paths: [
				'node_modules/',
				'node_modules/font-awesome/scss'
			],
			artifacts: {
				'app': {
					src: [
						'app/styles/app.scss',
						'app/modules/**/*.scss'
					]
				}
			}
		},
		webpack: {
			src: '',
			dest: '',
			artifacts: {
				app: './app',
				vendors: vendors,
			},
			output: '[name].bundle.js',
			loaders: [{ test: /\.html$/, loader: 'raw' }],
			noParse: vendors
		},
		html: {
			src: '*.html'
		},
		images: {
			src: [
				'app/images/**/*.+(png|jpg|gif|jpeg)'
			],
			dest: 'images'
		},
		fonts: {
			src: [
				'node_modules/font-awesome/fonts/**/*'
			],
			dest: 'styles/fonts'
		},
	}
}



program
	.version('0.1.1')
	.option('-d, --dontbuild', 'Dont build the app before running the tests')
	.option('-F, --fix', 'Attempt to fix the lint errors when running')
	.parse(process.argv)


let env = 'dev'
const falsy = /^(?:f(?:alse)?|no?|0+)$/i
Boolean.parse = (val) => {
	return !falsy.test(val) && !!val;
}

// custom additions to ops:
let ops = {}
ops.gulp = gulp
ops.config = config
ops.browserSync = browserSync
ops.program = program
ops.gulpSequence = gulpSequence
ops.prod = function(){
	return false
}
ops.env = env


// Require all tasks in gulpfile.js/tasks, including subfolders
let tasks = requireDir( './tasks' )

// load each gulp task and pass it ops:
tasks = lodash.each( tasks, (task) => task( ops ) )
