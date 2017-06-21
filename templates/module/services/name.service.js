
module.exports = class <%=camelCased%>Service {

	constructor( $http ){
		this.$http = $http
		this.state = {
			data: {}
		}
	}

	// Post Request:
	post( data ){
		return this.$http({
			method: 'POST',
			withCredentials: true,
			url: `${window.API_BASE}/v1/post`,
			data: data
		})
	}

	// Get Request:
	get(){
		return this.$http({
			method: 'GET',
			withCredentials: true,
			url: `${window.API_BASE}/v1/get`
		})
	}

}