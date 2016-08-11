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

	gutil.log( 'Creating UI project..' )

	const githubOrigin = utils.getGithubUrl()
	let repo = null
	let user = null
	let userRepo = null

	if( githubOrigin != '' ){
		
		repo = path.basename( githubOrigin ).trim()
		user = path.basename( path.resolve( githubOrigin, '../' ) ).trim()
		userRepo = `${user}/${repo}`.trim()
		console.log( 'GitHub url:', githubOrigin, repo, user )

	}
	

	inquirer.prompt([
		{
			type: 'input',
			name: 'name',
			message: 'Your app name',
			default: repo || utils.getAppName()
		}, {
			type: 'input',
			name: 'description',
			message: 'App Description',
			default: 'Another UI App..'
		}, {
			type: 'input',
			name: 'dockerhubRepo',
			message: `DockerHub Repo ( eg: ${userRepo} ) Leave blank not to configure`,
			default: ''
		}, {
			type: 'confirm',
			name: 'publishNPM',
			message: 'Attempt to publish NPM package on build',
			default: false
		}, {
			type: 'confirm',
			name: 'moveon',
			message: 'Continue?'
		}
	], ( answers ) => {

		answers.appNameSlug = _s.slugify( answers.name )
		answers.classifyAppName = _s.classify( answers.name )
		answers.repo = repo || ''
		answers.user = user || ''
		answers.userRepo = userRepo || ''
		answers.githubOrigin = githubOrigin || ''

		let features = answers.features

		if( !answers.moveon ){
			console.log( 'CANCELLED', answers )
			return done()
		}

		gulp.src( __dirname + '/templates/ui/**' )
			.pipe( template( answers ) )
			.pipe( rename(( file ) => {
				if( file.basename[0] === '_' ){
					file.basename = '.' + file.basename.slice( 1 )
				}
			}))
			.pipe( conflict('./') )
			.pipe( gulp.dest('./') )
			.pipe( install() )
			.on( 'finish', () => {
				done()
			})

	})

}