<%if(publishNPM){%>[![NPM Version](https://img.shields.io/npm/v/appNameSlug.svg)](https://www.npmjs.com/package/appNameSlug) <% } %><%if( userRepo ){ %>[![Build Status](https://drone.stackdot.com/api/badges/<%=userRepo%>/status.svg)](https://drone.stackdot.com/<%=userRepo%>) [![dependencies Status](https://david-dm.org/<%=userRepo%>/status.svg)](https://david-dm.org/<%=userRepo%>)<% } %>

# <%=classifyAppName%>

<%=description%>

### Requirements:

- [NodeJS](https://nodejs.org/en/download/) ( Version 6+ )
 - We recommend using [Node Version Manager](https://github.com/creationix/nvm)

---

### To Get Started:

- Check out the repo locally
- run `npm install` inside the directory. (You only have to do this once)

---

### Running the project:

Inside the directory run:

	npm start

There are several options, to list them, run:

	npm start --help

Be sure to run `npm update` to ensure all the NPM dependencies are up to date.






