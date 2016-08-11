'use strict'


// Load in Route Class
const Route = require('restify-loader/route')
const lodash = require('lodash')


// Create Route
module.exports = class Status extends Route {

	init(){
		this.debug( 'Status API' )
		this.addListeners()
	}

	addListeners(){
		this.debug( 'Adding Listeners' )
		this.server.get({
			url: '/v1/status',
			validation: {}
		}, this.getStatus.bind( this ))
	}

	getStatus( req, res, next ){
		return res.send({
			status: 'OK'
		})
	}

}