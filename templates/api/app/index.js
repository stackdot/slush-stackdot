'use strict'


// Settings:
const PORT 			= process.env.PORT || <%=port%>
<% if(includes( databases, 'MongoDB')){
		%>const MONGO_HOST 	= process.env.MONGO_HOST || 'mongodb://localhost/<%=appNameSlug%>'
<% } if(includes( databases, 'LevelDB')){ 
 		%>const LEVEL_DB_DIR 	= process.env.LEVEL_DB_DIR || './lvldb'
<% } if(includes( databases, 'MySQL')){ 
 		%>const MYSQL_URL 	= process.env.MYSQL_URL || 'mysql://root:root@localhost/<%=appNameSlug%>'
<% } %>


// Modules
const colors 	= require('colors')
const lodash 	= require('lodash')
const Promise 	= require('bluebird')
const debug 	= require('debug')('<%=appNameSlug%>:main')
const lodash 	= require('lodash')
<% if(includes( databases, 'MongoDB')){
		%>const Mongoose 	= require('mongoose')
<% } if(includes( databases, 'LevelDB')){ 
 		%>const levelup 	= require('level')
<% } if(includes( databases, 'MySQL')){ 
 		%>const _MySQL 	= require('mysql')
<% } %>


<% if(includes( databases, 'MongoDB')){ %>
// Connect to MongoDB:
Mongoose.Promise = Promise
Mongoose.connect( MONGO_HOST, { useMongoClient: true })
debug( `Connected to MongoDB`.green )
// If the connection throws an error
Mongoose.connection.on("error", (err) => {
	let msg = { app: '<%=appNameSlug%>', event: 'Mongoose Error', error: err }
	console.log(JSON.stringify( msg ))
	process.exit(1);
})
// When the connection is disconnected
Mongoose.connection.on('disconnected', () => {
	let msg = { app: '<%=appNameSlug%>', event: 'Mongoose Disconnected' }
	console.log(JSON.stringify( msg ))
	process.exit(1);
})
<% } if(includes( databases, 'LevelDB')){ %>
// Connect to LevelDB:
const LevelDB = levelup( LEVEL_DB_DIR, {
	valueEncoding: 'json',
	cacheSize: 16 * 1024 * 1024
})
debug( `Connected to LevelDB`.green )
<% } if(includes( databases, 'MySQL')){ %>
// Connect to MySQL:
const MySQL = _MySQL.createConnection( MYSQL_URL )
MySQL.connect((err) => {
	if( err ) throw err
	debug( `Connected to MySQL`.green )
})
<% } %>






// REST API Server:
require('restify-loader')({
	// Restify Loader Params:
	dir: __dirname,
	name: '<%=appNameSlug%>',
	version: '1.0.1',
	dirs: {
		libs: 'libs',
		middleware: 'middleware',<% if(includes( databases, 'MongoDB')){ %>
		schemas: 'schemas'<% } %>
	},<% if(raven){ %>
	raven: {
		context: {
			ENV: process.env.ENVIRONMENT || "localhost"
		},
		DSN: process.env.SENTRY_DSN || 'DSN_KEY'
	}<% } %>

},{

	// Route Paras:
<% if(includes( databases, 'MongoDB')){
%>	Mongoose: Mongoose,
<% } if(includes( databases, 'LevelDB')){ 
 %>	LevelDB: LevelDB,
<% } if(includes( databases, 'MySQL')){ 
 %>	MySQL: MySQL,
<% } %>
	log: ( msg ) => {
		console.log(JSON.stringify(msg))
	}

}).then(( server ) => {

	// All routes are ready and registered, call optional onLoaded method:
	lodash.each( server.LoadedRoutes, ( route ) => {
		if( route.onLoaded ) route.onLoaded( server )
	})

	debug('<%=appNameSlug%> API Setup')
	// Listen for connections:
	server.listen(PORT, () => debug( `Listening to port: ${PORT}`.good ) )

})



