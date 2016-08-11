'use strict'

const gulp = require('gulp')

gulp.task( 'module', require('./slush-module.js') )
gulp.task( 'api', require('./slush-api.js') )
gulp.task( 'default', require('./slush-ui.js') )
