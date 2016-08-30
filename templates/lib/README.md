[![Node Version](https://img.shields.io/node/v/<%=appNameSlug%>.svg?maxAge=60)](https://www.npmjs.com/package/<%=appNameSlug%>) [![NPM Version](https://img.shields.io/npm/v/<%=appNameSlug%>.svg?maxAge=60)](https://www.npmjs.com/package/<%=appNameSlug%>)  [![NPM License](https://img.shields.io/npm/l/<%=appNameSlug%>.svg?maxAge=60)](https://www.npmjs.com/package/<%=appNameSlug%>) 

<%if( userRepo ){ %>[![Build Status](https://drone.stackdot.com/api/badges/<%=userRepo%>/status.svg?maxAge=60)](https://drone.stackdot.com/<%=userRepo%>) [![dependencies Status](https://img.shields.io/david/<%=userRepo%>.svg?maxAge=60)](https://david-dm.org/<%=userRepo%>) [![Coverage Status](https://coveralls.io/repos/github/<%=userRepo%>/badge.svg?branch=master)](https://coveralls.io/github/<%=userRepo%>?branch=master)<% } %>





<%=classifyAppName%>
===

<%=description%>







Requirements:
---

- [NodeJS](https://nodejs.org/en/download/) ( Version 6+ )
 - We recommend using [Node Version Manager](https://github.com/creationix/nvm)






To Get Started:
---

- Install the package in your project

```bash
npm install <%=appNameSlug%> --save
```

To use:
```javascript

const NewLib = require('<%=appNameSlug%>')({
	// Params for your Lib
	foo: 'bar'
})

```

<%if( userRepo ){ %>
[JSDocs Documentation](https://<%=user%>.github.io/<%=repo%>/index.html)
<% } %>







Enabling the Debugger
---

To enable [debug](https://github.com/visionmedia/debug) logs, enable them via environment variables.

To see all debug logs from this app, set the env variable:

```bash
DEBUG=<%=appNameSlug%>*
```

Running with your project:

```bash
DEBUG=<%=appNameSlug%>* node myproject.js
```










License
----

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
