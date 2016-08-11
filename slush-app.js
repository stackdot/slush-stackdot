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
			message: 'App Name:',
			default: repo || utils.getAppName()
		}, {
			type: 'input',
			name: 'description',
			message: 'App Description:',
			default: 'Just Another UI App..'
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

		let features = answers.features

		if( !answers.moveon ){
			console.log( 'CANCELLED', answers )
			return done()
		}

		let src = [ `${__dirname}/templates/ui/**` ]
		if( !lodash.includes( answers.publish, 'Docker' ) ){
			src.push( `!${__dirname}/templates/ui/Dockerfile` )
			src.push( `!${__dirname}/templates/ui/_dockerignore` )
			src.push( `!${__dirname}/templates/ui/_nginx.conf` )
		}

		gulp.src( src )
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