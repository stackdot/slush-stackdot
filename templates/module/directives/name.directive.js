
var directiveTemplate = require('./<%=name%>.tpl.html');

module.exports = function(){

	var controller = ['$scope', function($scope){
		$scope.title = 'Directive Title';
	}];

	return {
		scope: { },
		restrict: 'E',
		replace: true,
		template: directiveTemplate,
		controller: controller
	};
};