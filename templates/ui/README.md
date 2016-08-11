<%if( userRepo ){ %>[![Build Status](https://drone.stackdot.com/api/badges/<%=userRepo%>/status.svg)](https://drone.stackdot.com/<%=userRepo%>) [![dependencies Status](https://david-dm.org/<%=userRepo%>/status.svg)](https://david-dm.org/<%=userRepo%>)<% } %>

# <%=classifyAppName%>

<%=description%>

### Requirements:

- NodeJS: `https://nodejs.org/en/download/`
- Gulp: `npm install -g gulp`

---

### To Get Started:

- Check out the repo locally
- run `npm install` inside the directory. (You only have to do this once)

---

### Running the project:

Inside the directory run:

	gulp

There are several options when using gulp, to list them, run:

	gulp --help

Be sure to run `npm update` to ensure all the NPM dependencies are up to date.


---

#### Building for prod:

To build the project, which puts all built files into `public/` run the following:

	gulp build

This will:

- minify all javascript files
- optimize all image files
- minify css files
- remove all `console.log` in the code

---





