// <%=name%> controller:

<% if(service === true){ %>module.exports = ( $scope, <%=camelCased%>Service ) => {<% } else { %>module.exports = ( $scope ) => {<% } %>

	$scope.title = '<%=camelCased%>'

}