'use strict'

const gulp = require('gulp')

gulp.task( 'module', require('./slush-module.js') )
gulp.task( 'api', require('./slush-api.js') )
gulp.task( 'lib', require('./slush-lib.js') )
gulp.task( 'ui', require('./slush-ui.js') )
gulp.task( 'default', [ 'ui' ] )
