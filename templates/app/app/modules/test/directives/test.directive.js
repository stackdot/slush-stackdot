
var directiveTemplate = require('./test.tpl.html');

module.exports = function(){

	var controller = ['$scope', function($scope){
		$scope.title = 'Directive Title';
	}];

	return {
		scope: { },
		restrict: 'E',
		replace: false,
		template: directiveTemplate,
		controller: controller
	};
};