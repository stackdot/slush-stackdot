'use strict'


const inquirer		= require('inquirer')
const _s			= require('underscore.string')
const conflict		= require('gulp-conflict')
const path			= require('path')
const async			= require('async')
const gulp			= require('gulp')
const gutil			= require('gulp-util')
const template		= require('gulp-template')
const rename		= require('gulp-rename')
const lodash		= require('lodash')
const _				= require('underscore')
const utils 		= require('./slush-utils.js')



module.exports = function( done ){

	inquirer.prompt([
		{
			type: 'input',
			name: 'name',
			message: 'Name of your module.',
			default: utils.getAppName()
		},{
			type: 'confirm',
			name: 'directive',
			message: 'Does the module include a DIRECTIVE?',
			default: true
		},{
			type: 'confirm',
			name: 'controller',
			message: 'Does the module include a CONTROLLER?',
			default: true
		},{
			type: 'confirm',
			name: 'service',
			message: 'Does the module include a SERVICE?',
			default: true
		},{
			type: 'confirm',
			name: 'styles',
			message: 'Does the module include a SASS Styles?',
			default: true
		},{
			type: 'confirm',
			name: 'moveon',
			message: 'Continue?'
		}
	], ( answers ) => {

		
		let name = answers.name = _s.slugify( answers.name )
		answers.camelCased = utils.camelize( name )

		let directories = []
		if( answers.directive === true ){
			directories.push( 'directives' )
		}
		if( answers.controller === true ){
			directories.push( 'controllers' )
		}
		if( answers.service === true ){
			directories.push( 'services' )
		}
		if( answers.styles === true ){
			directories.push( 'styles' )
		}

		async.each( directories, ( directory, callback ) => {
			gulp.src( __dirname + '/templates/module/'+directory+'/**' )
				.pipe( template( answers ) )
				.pipe( rename(( file ) => {
					file.basename = file.basename.replace( 'name', name )
				}))
				.pipe( conflict( './'+directory+'/' ) )
				.pipe( gulp.dest( './'+directory+'/' ) )
				.on( 'finish', () => {
					callback()
				})
		}, () => {
			gulp.src( __dirname + '/templates/module/index.js' )
				.pipe( template( answers ) )
				.pipe( rename(( file ) => {
					file.basename = file.basename.replace('name', name)
				}))
				.pipe( conflict( './' ) )
				.pipe( gulp.dest( './' ) )
				.on( 'finish', () => {
					done()
				})
		})
		

	})

}

