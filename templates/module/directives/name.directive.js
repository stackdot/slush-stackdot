
const directiveTemplate = require('./<%=name%>.tpl.html')

module.exports = () => {
	<% if(!controller){ %>
	let controller = ['$scope', ($scope) => {
		this.title = 'Directive Title'
	}]
	<% } %>
	return {
		scope: { },
		restrict: 'E',
		replace: false,
		template: directiveTemplate,<% if( controller ){ %>
		controller: '<%=camelCased%>Ctrl',<% } else { %>
		controller: controller,<% } %>
		controllerAs: 'ctrl'
	}

}