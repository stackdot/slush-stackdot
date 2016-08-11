// <%=name%> modules components:
<% if(service === true){ %>
var service = require('./services/<%=name%>.service.js');<% } %><% if(controller === true){ %>
var controller = require('./controllers/<%=name%>.ctrl.js');<% } %><% if(directive === true){ %>
var directive = require('./directives/<%=name%>.directive.js');<% } %>

module.exports = angular.module('app.<%=camelCased%>', [])<% if(service === true){ %>
	.service('<%=camelCased%>Service', [ '$http', service ])<% } %><% if(controller === true){ %><% if(service === true){ %>
	.controller('<%=camelCased%>Ctrl', [ '<%=camelCased%>Service', controller ])<% } else { %>
	.controller('<%=camelCased%>Ctrl', [ controller ])<% } %><% } %><% if(directive === true){ %>
	.directive('<%=camelCased%>', [ directive ])
<% } %>;