[![NPM Version](https://img.shields.io/npm/v/slush-stackdot.svg)](https://www.npmjs.com/package/slush-stackdot) [![Build Status](https://drone.stackdot.com/api/badges/stackdot/slush-stackdot/status.svg)](https://drone.stackdot.com/stackdot/slush-stackdot) [![dependencies Status](https://david-dm.org/stackdot/slush-stackdot/status.svg)](https://david-dm.org/stackdot/slush-stackdot)

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