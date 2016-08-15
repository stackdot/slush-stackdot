
module.exports = class <%=camelCased%>Service {
	constructor( $http ){
		console.log('New Service')
		this.$http = $http
		this.data = {
			item: ''
		}
	}
	get( callback ){
		return this.$http({
			method: 'GET',
			withCredentials: true,
			url: 'api_url'
		}).then(( res )=>{
			this.data.item = res.data
			callback( res.data )
		}).catch(( err )=>{
			console.log('Err', err)
		})
	}
}