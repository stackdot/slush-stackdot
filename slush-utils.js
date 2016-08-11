
const lodash = require('lodash')
const path = require('path')


module.exports = {

	format( string ){
		string = string.toLowerCase()
		return string.replace( /\s/g, '' )
	},

	getAppName(){
		let appname
		try {
			appname = require( path.join( process.cwd(), 'bower.json' ) ).name
		} catch (e) {
			try {
				appname = require( path.join( process.cwd(), 'package.json' ) ).name
			} catch (e) {}
		}
		if (!appname)
			appname = path.basename(process.cwd())
		return appname.replace( /[^\w\s]+?/g, ' ' )
	},

	camelize( str ){
		str = str.replace( /[-_]+/g, ' ' )
		return str.replace( /(?:^\w|[A-Z]|\b\w)/g, ( letter, index ) => {
			return index == 0 ? letter.toLowerCase() : letter.toUpperCase()
		}).replace( /\s+/g, '' )
	}

}
