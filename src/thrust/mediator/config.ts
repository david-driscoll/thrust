/// <reference path="../../../lib/DefinitelyTyped/requirejs/require.d.ts" />

// Disabled until TS supports module per file in some way (ie exports is exports.<export> not  exports.moduleName.<export>)
/*export module instance {*/

'use strict';
/**
Provides thrust configuration

@module thrust.mediator
@submodule thrust.mediator.config
**/

/**
Resolves the given properties when creating an instance of the plugin.

This is for internal thrust use.  Thrust uses this array to generate the properties that need to be handed
to the plugin constructor method.

@for thrust.mediator.config
@private
@property resolve
@readOnly
@type {Array}
**/
export var resolve = ['name', 'cfg'];
/**
The set of conventions to load into thrust/mediator.

@property conventions
@readOnly
@type {Array}
**/
export var conventions = ['thrust/mediator/convention/subscription'];
