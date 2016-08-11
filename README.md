[![Node Version](https://img.shields.io/node/v/slush-stackdot.svg?maxAge=60)](https://www.npmjs.com/package/slush-stackdot) [![NPM Version](https://img.shields.io/npm/v/slush-stackdot.svg?maxAge=60)](https://www.npmjs.com/package/slush-stackdot) [![NPM License](https://img.shields.io/npm/l/slush-stackdot.svg?maxAge=60)](https://www.npmjs.com/package/slush-stackdot) 

[![Build Status](https://drone.stackdot.com/api/badges/stackdot/slush-stackdot/status.svg?maxAge=60)](https://drone.stackdot.com/stackdot/slush-stackdot) [![dependencies Status](https://david-dm.org/stackdot/slush-stackdot/status.svg?maxAge=60)](https://david-dm.org/stackdot/slush-stackdot)

<p align="center"><img src="etc/logo.png" /></p>

# Stackdot Slush Generator

Slush generator for:
- New UI Projects
- UI Modules
- New API Projects


### Getting Started:

First you need to install the slush generator.

Requirements:
- Slush installed globally `npm install slush -g`

Then to install the generator:

	npm install slush-stackdot -g


### To create a new UI project:

Run the following from the root directory of your new project:

	slush stackdot
	
	// Is the short have for:

	slush stackdot:ui

### Create a UI module:

Be in the directory of the new module. For instance if your new module name is going to be "header", you should run the following command from `app/modules/header`. Slush will populate this directory with the new module contents.

	slush stackdot:module

### Create a new API project

When creating a new API project you will have the option to include database(s)
- MongoDB
- LevelDB
- MySQL

Run the following from the root directory of your new project:

	slush stackdot:api






#### License

---

The MIT License

Copyright (c) 2014-2016 

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.