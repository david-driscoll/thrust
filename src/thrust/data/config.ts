/// <reference path="../../../lib/DefinitelyTyped/requirejs/require-2.1.d.ts" />

// Disabled until TS supports module per file in some way (ie exports is exports.<export> not  exports.moduleName.<export>)
/*export module instance {*/

'use strict';
/**
Provides thrust configuration

@module thrust.data
@submodule thrust.data.config
**/

/**
Resolves the given properties when creating an instance of the plugin.

This is for internal thrust use.  Thrust uses this array to generate the properties that need to be handed
to the plugin constructor method.

@for thrust.data.config
@private
@property resolve
@readOnly
@type {Array}
**/
export var resolve = ['name', 'mediator', 'cfg'];
/**
The set of conventions to load into thrust/dom.

@property conventions
@readOnly
@type {Array}
**/
export var conventions = [
	'thrust/data/convention/start'
];
/**
Decides if `thrust/data` should cache requests or not.

You should turn this to `false`, if you are experiencing caching issues and need to debug.

@property cache
@readOnly
@type {Boolean}
@default true
**/
export var cache = true;
/**
*
* `startTimeout` is part of queueing built into `thrust/data`.  It defines the wait time before requests
* are started.
*
*
* The queueing system works in the followig manner.  All requests that are queued together per HTTP
* request method (`GET`, `POST`, `PUT`, `DELETE`, `PATCH`, etc).  After the first request, the timer
* starts, once the timeout elapses, all the requests are shipped off at once.
*
*
* This counter intuitive if you're looking to get the request back immediately, but from a UX perspective
* this allows the UI to stay in sync and give the user a cohesive, instead of seeing loaders, show up and
* disappear at seemingly random intervals, the user does an action, and then sees a response.
*
*
* @property startTimeout
* @readOnly
* @type {Number}
* @default 500
**/
export var startTimeout = 100;
/**
*
* `finishTimeout` is part of queueing built into `thrust/data`.  It defines the wait time before the
* queue is completed.  If all the requests finish early, the timeout is canceled.
*
*
* The queueing system works in the followig manner.  All requests that are queued together per HTTP
* request method (`GET`, `POST`, `PUT`, `DELETE`, `PATCH`, etc).  After the requests are fired off
* `thrust/data` will wait until it gets a response from everyone of them.  If for some reason a request
* takes to long, and the timeout is hit, all the requests that have completed, will be releaseed, allowing
* the application to continue undisrupted.
*
*
* This counter intuitive if you're looking to get the request back immediately, but from a UX perspective
* this allows the UI to stay in sync and give the user a cohesive, instead of seeing loaders, show up and
* disappear at seemingly random intervals, the user does an action, and then sees a response.
*
*
@property finishTimeout
@readOnly
@type {Number}
@default 2000
**/
export var finishTimeout = 2000;
