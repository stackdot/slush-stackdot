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

Error.stackTraceLimit = Infinity;

module.exports = function( done ){

	gutil.log( 'Creating API project..' )

	let githubOrigin = utils.getGithubUrl()
	let repo, user, userRepo = null
	if( githubOrigin != '' ){
		githubOrigin = githubOrigin.trim()
		repo = path.basename( githubOrigin ).trim()
		user = path.basename( path.resolve( githubOrigin, '../' ) ).trim()
		userRepo = `${user}/${repo}`.trim()
		console.log( 'GitHub url:', githubOrigin, repo, user )
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
			type: 'input',
			name: 'port',
			message: 'Default port to run on:',
			default: 8080,
			validate: ( answer ) => {
				if( !lodash.inRange( answer, 79, 65001))
					return 'Port must be a number between 80-65000'
				return true
			}
		}, {
			type: 'confirm',
			name: 'raven',
			message: 'Include Raven library for sending logs to Sentry',
			default: false
		}, {
			type: 'checkbox',
			name: 'databases',
			message: 'Add libraries for database(s)?',
			choices: [
				{ name: 'MongoDB' },
				{ name: 'LevelDB' },
				{ name: 'MySQL' }
			]
		}, {
			type: 'checkbox',
			name: 'publish',
			message: 'Where to publish this app',
			choices: [
				{ name: 'NPM' },
				{ name: 'Docker' }
			]
		}, {
			type: 'input',
			name: 'dockerRepoName',
			message: `Docker Repo Name ( eg: ${userRepo || 'username/repo'} ):`,
			default: userRepo || '',
			when: ( answers ) => {
				return lodash.includes( answers.publish, 'Docker' )
			},
			validate: ( answer ) => {
				if( lodash.isEmpty( answer ) )
					return 'Should be in {{USERNAME}}/{{REPO}} format.'
				return true
			}
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
		answers.publishNPM = lodash.includes( answers.publish, 'NPM' )
		answers.dockerRepoName = answers.dockerRepoName || ''
		answers.includes = lodash.includes

		if( !answers.moveon ){
			console.log( 'CANCELLED', answers )
			return done()
		}

		let src = [ `${__dirname}/templates/api/**` ]
		// If not deploying to docker, dont copy the files:
		if( !lodash.includes( answers.publish, 'Docker' ) ){
			src.push( `!${__dirname}/templates/api/Dockerfile` )
			src.push( `!${__dirname}/templates/api/_dockerignore` )
		}

		// If we arent using Mongo, dont copy the schemas:
		if( !lodash.includes( answers.databases, 'MongoDB' ) ){
			src.push( `!${__dirname}/templates/api/app/schemas/**/*` )
		}

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