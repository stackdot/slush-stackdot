// <%=name%> controller:

<% if(service === true){ %>module.exports = function( <%=camelCased%>Service ){<% } else { %>module.exports = function(){<% } %>

	var self = this;

};