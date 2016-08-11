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
			message: 'Name of your module:',
			default: utils.getAppName()
		},{
			type: 'checkbox',
			name: 'components',
			message: 'Which pieces does this module need?',
			choices: [
				{ name: 'directive', checked: true },
				{ name: 'controller', checked: true },
				{ name: 'service', checked: true },
				{ name: 'styles', checked: true }
			],
			validate: ( answer ) => {
				if( answer.length < 1 )
					return 'Must select at least 1 component'
				if( lodash.intersection( answer, [ 'directive', 'controller', 'service' ] ).length < 1 )
					return 'Must contain a Directive, Service or Controller'
				return true
			}
		},{
			type: 'confirm',
			name: 'moveon',
			message: 'Continue?'
		}
	]).then(( answers ) => {

		
		let name = answers.name = _s.slugify( answers.name )
		answers.camelCased = utils.camelize( name )
		answers.includes = lodash.includes

		if( !answers.moveon ){
			console.log( 'CANCELLED', answers )
			return done()
		}

		let directories = []

		answers.directive = false
		if( lodash.includes( answers.components, 'directive' ) ){
			answers.directive = true
			directories.push( 'directives' )
		}

		answers.controller = false
		if( lodash.includes( answers.components, 'controller' )  ){
			answers.controller = true
			directories.push( 'controllers' )
		}

		answers.service = false
		if( lodash.includes( answers.components, 'service' )  ){
			answers.service = true
			directories.push( 'services' )
		}

		answers.styles = false
		if( lodash.includes( answers.components, 'styles' )  ){
			answers.styles = true
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

