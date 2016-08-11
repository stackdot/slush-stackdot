<%if(publishNPM){%>[![Node Version](https://img.shields.io/node/v/<%=appNameSlug%>.svg?maxAge=60)](https://www.npmjs.com/package/<%=appNameSlug%>) [![NPM Version](https://img.shields.io/npm/v/<%=appNameSlug%>.svg?maxAge=60)](https://www.npmjs.com/package/<%=appNameSlug%>)  [![NPM License](https://img.shields.io/npm/l/<%=appNameSlug%>.svg?maxAge=60)](https://www.npmjs.com/package/<%=appNameSlug%>) 

<% } %><%if( userRepo ){ %>[![Build Status](https://drone.stackdot.com/api/badges/<%=userRepo%>/status.svg?maxAge=60)](https://drone.stackdot.com/<%=userRepo%>) [![dependencies Status](https://david-dm.org/<%=userRepo%>/status.svg?maxAge=60)](https://david-dm.org/<%=userRepo%>)<% } %>

<%=classifyAppName%>
===

<%=description%>

Requirements:
---

- [NodeJS](https://nodejs.org/en/download/) ( Version 6+ )
 - We recommend using [Node Version Manager](https://github.com/creationix/nvm)
- Gulp: `npm install -g gulp`

To Get Started:
---

- Check out the repo locally
- run `npm install` inside the directory. (You only have to do this once)

Running the project:
---

Inside the directory run:

```bash
gulp
```

There are several options when using gulp, to list them, run:

```bash
gulp --help
```

Be sure to run `npm update` to ensure all the NPM dependencies are up to date.


Building for prod:
---

To build the project, which puts all built files into `public/` run the following:

```bash
gulp build
```

This will:

- minify all javascript files
- optimize all image files
- minify css files
- remove all `console.log` in the code





License
----

[MIT License](http://en.wikipedia.org/wiki/MIT_License)

