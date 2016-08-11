'use strict'


// 3rd party modules:
const angular = require('angular')
const router = require('angular-ui-router')
require('angular-animate')
require('angular-aria')
require('angular-material/angular-material')


// Local modules:
require('modules/test')


// Create App:
angular.module('app', [
	'ui.router',
	'app.test',
	'ngMaterial',
]).config(['$stateProvider', '$urlRouterProvider', '$mdThemingProvider', function( $stateProvider, $urlRouterProvider, $mdThemingProvider ){

	// URL Routing:
	$urlRouterProvider.otherwise('/test')
	$stateProvider
		.state('test', {
			url: '/test',
			views: {
				content: {
					template: '<test></test>',
				}
			}
		})


}])
.controller('app.main', ['$scope', '$state', function( $scope, $state ){

	console.log('Stackdot App Controller')

}])

