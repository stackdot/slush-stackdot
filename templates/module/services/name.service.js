
module.exports = ( $http ) => {
	return {
		get: ( callback ) => {
			return $http({
				method: 'GET',
				withCredentials: true,
				url: 'api_url'
			})
		}
	}
}