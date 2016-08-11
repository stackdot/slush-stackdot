// test modules components:

var service = require('./services/test.service.js');
var controller = require('./controllers/test.ctrl.js');
var directive = require('./directives/test.directive.js');

module.exports = angular.module('app.test', [])
	.service('testService', [ '$http', service ])
	.controller('testCtrl', [ 'testService', controller ])
	.directive('test', [ directive ])
;