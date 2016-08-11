<%if(publishNPM){%>[![Node Version](https://img.shields.io/node/v/<%=appNameSlug%>.svg?maxAge=60)](https://www.npmjs.com/package/<%=appNameSlug%>) [![NPM Version](https://img.shields.io/npm/v/<%=appNameSlug%>.svg?maxAge=60)](https://www.npmjs.com/package/<%=appNameSlug%>)  [![NPM License](https://img.shields.io/npm/l/<%=appNameSlug%>.svg?maxAge=60)](https://www.npmjs.com/package/<%=appNameSlug%>) 

<% } %><%if( userRepo ){ %>[![Build Status](https://drone.stackdot.com/api/badges/<%=userRepo%>/status.svg?maxAge=60)](https://drone.stackdot.com/<%=userRepo%>) [![dependencies Status](https://img.shields.io/david/<%=userRepo%>.svg?maxAge=60)](https://david-dm.org/<%=userRepo%>)<% } %>

<%=classifyAppName%>
===

<%=description%>

Requirements:
---

- [NodeJS](https://nodejs.org/en/download/) ( Version 6+ )
 - We recommend using [Node Version Manager](https://github.com/creationix/nvm)

To Get Started:
---

- Check out the repo locally
- run `npm install` inside the directory. (You only have to do this once)

Running the project:
---

Inside the directory run:

```bash
npm start
```

There are several options, to list them, run:

```bash
npm start --help
```

Be sure to run `npm update` to ensure all the NPM dependencies are up to date.

Enabling the Debugger
---

To enable [debug](https://github.com/visionmedia/debug) logs, enable them via environment variables.

To see all debug logs from this app:

```bash
DEBUG=<%=appNameSlug%>* npm start
```

To see more specific log(s), narrow the results. For instance to see only `Route` logs, do the following:

```bash
DEBUG=<%=appNameSlug%>:route:* npm start
```













License
----

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
