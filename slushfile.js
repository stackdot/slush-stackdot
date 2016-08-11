'use strict'

var gulp = require('gulp')

gulp.task( 'module', require('./slush-module.js') )

gulp.task( 'default', require('./slush-app.js') )

