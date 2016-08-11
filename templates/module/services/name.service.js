
module.exports = function( $http ){
	return {
		get: function( callback ){
			return $http({
				method: 'GET',
				withCredentials: true,
				url: 'api_url'
			});
		}
	};
};