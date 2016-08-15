
module.exports = class <%=camelCased%>Service {
	constructor( $http ){
		console.log('New Service')
	}
	get( callback ){
		return $http({
			method: 'GET',
			withCredentials: true,
			url: 'api_url'
		})
	}
}