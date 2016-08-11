// <%=name%> modules components:
<% if(service === true){ %>
const service = require('./services/<%=name%>.service.js')<% } %><% if(controller === true){ %>
const controller = require('./controllers/<%=name%>.ctrl.js')<% } %><% if(directive === true){ %>
const directive = require('./directives/<%=name%>.directive.js')<% } %>

module.exports = angular.module('app.<%=camelCased%>', [] )<% if(service === true){ %>
	.service( '<%=camelCased%>Service', [ '$http', service ] )<% } %><% if(controller === true){ %><% if(service === true){ %>
	.controller( '<%=camelCased%>Ctrl', [ '$scope', '<%=camelCased%>Service', controller ] )<% } else { %>
	.controller( '<%=camelCased%>Ctrl', [ '$scope', controller ] )<% } %><% } %><% if(directive === true){ %>
	.directive( '<%=camelCased%>', [ directive ] )
<% } %>