'use strict'


const inquirer		= require('inquirer')
const _s			= require('underscore.string')
const conflict		= require('gulp-conflict')
const path			= require('path')
const gulp			= require('gulp')
const gutil			= require('gulp-util')
const template		= require('gulp-template')
const install		= require('gulp-install')
const rename		= require('gulp-rename')
const lodash		= require('lodash')
const _				= require('underscore')
const utils			= require( './slush-utils.js' )



module.exports = function( done ){

	gutil.log( 'Creating React UI project..' )

	let githubOrigin = utils.getGithubUrl()
	let repo, user, userRepo = null
	if( githubOrigin != '' ){
		githubOrigin = githubOrigin.trim()
		repo = path.basename( githubOrigin ).trim()
		user = path.basename( path.resolve( githubOrigin, '../' ) ).trim()
		userRepo = `${user}/${repo}`.trim()
	}
	

	inquirer.prompt([
		{
			type: 'input',
			name: 'name',
			message: 'App Name:',
			default: repo || utils.getAppName()
		}, {
			type: 'input',
			name: 'description',
			message: 'App Description:',
			default: 'Just Another UI App..'
		}, {
			type: 'confirm',
			name: 'install',
			message: 'Run NPM Install Now?',
			default: true
		}, {
			type: 'confirm',
			name: 'moveon',
			message: 'Continue?'
		}
	]).then(( answers ) => {

		answers.appNameSlug = _s.slugify( answers.name )
		answers.classifyAppName = _s.classify( answers.name )
		answers.repo = repo || ''
		answers.user = user || ''
		answers.userRepo = userRepo || ''
		answers.githubOrigin = githubOrigin || ''
		answers.includes = lodash.includes

		if( !answers.moveon ){
			console.log( 'CANCELLED', answers )
			return done()
		}

		let src = [ `${__dirname}/templates/react-ui/**/*`, `${__dirname}/templates/react-ui/**/**/*` ]

		let stream = gulp.src( src )
			.pipe( template( answers, { 'interpolate': /<%=([\s\S]+?)%>/g } ) )
			.pipe( rename(( file ) => {
				if( file.basename[0] === '_' ){
					file.basename = '.' + file.basename.slice( 1 )
				}
			}))
			.pipe( conflict('./') )
			.pipe( gulp.dest('./') )

		if( answers.install ){
			stream = stream.pipe( install() )
		}
		stream.on( 'finish', () => done() )

	})

}