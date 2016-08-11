
const inquirer = require('inquirer')
const _s = require('underscore.string')
const conflict = require('gulp-conflict')
const path = require('path')
const gulp = require('gulp')
const gutil = require('gulp-util')
const template = require('gulp-template')
const rename = require('gulp-rename')
const lodash = require('lodash')
const _ = require('underscore')


const utils = require( './slush-utils.js' )


module.exports = function( done ){

	gutil.log( 'Base UI app.' )

	inquirer.prompt([
		{
			type: 'input',
			name: 'name',
			message: 'Your app name',
			default: utils.getAppName()
		}, {
			type: 'input',
			name: 'dockerhubRepo',
			message: 'DockerHub Repo ( eg: username/image ) Leave blank not to configure',
			default: ''
		}, {
			type: 'confirm',
			name: 'moveon',
			message: 'Continue?'
		}
	], function( answers ){

		answers.appNameSlug = _s.slugify(answers.name)
		answers.classifyAppName = _s.classify(answers.name)
		let features = answers.features

		var hasFeature = function( feat ){
			return features.indexOf(feat) !== -1
		}

		return console.log('Answers', answers)

		if (!answers.moveon)
			return done()

		

		console.log('Final answers:', answers)

		gulp.src(__dirname + '/templates/app/**')
			.pipe(template( answers ))
			.pipe(rename(function (file) {
				if (file.basename[0] === '_') {
					file.basename = '.' + file.basename.slice(1)
				}
			}))
			.pipe(conflict('./'))
			.pipe(gulp.dest('./'))
			.pipe(install())
			.on('finish', function () {
				done()
			})

	})

}