/// <reference path="../../lib/DefinitelyTyped/requirejs/require.d.ts" />

// Disabled until TS supports module per file in some way (ie exports is exports.<export> not  exports.moduleName.<export>)
/*export module config {*/
'use strict';
import thrustInstance = module('./instance');

/**
Provides thrust configuration

@module thrust
@submodule thrust.config
**/

/**
This property, tells the framework if it should throw errors or not.
In production it's recommended not to throw errors, that way if a component fails
there is a chance the application can still recover.

@for thrust.config
@property throwErrors
@readOnly
@type {Boolean}
@default false
**/
export var throwErrors = true

/**
Tells the framework to run in async mode, this may delay start up, but will make image loading and inital running appear faster.

@property async
@readOnly
@type {Boolean}
@default true
**/
export var async = true

/**
Tells thrust to expose each instance as a global, this allows legacy components to utilize parts of thrust, or easily
get at your thrust instance during debugging.

@property exposeGlobals
@readOnly
@type {Boolean}
@default true
**/
export var exposeGlobals = true

export var url = {
    /**
    This property, gives the framework it's default path, if different than '/'
    
    @property url.path
    @readOnly
    @type {String}
    @default "/"
    **/
    path: '/',
    /**
    This property, tells the framework how it should encode array form data.
    In general, for ASP.NET based applications, traditional should be true.
    For Ruby/Python based applications, this should be false.
    
    @property url.traditionalEncoding
    @readOnly
    @type {Boolean}
    @default false
    **/
    traditionalEncoding: true
}

export var log = {
    /**
    This lends to the log level of thrust.

        ERROR: 1
        WARN: 2
        INFO: 3
        DEBUG: 4
    
    @property log.level
    @readOnly
    @type {String}
    @default 1
    **/
    level: 4,
    /**
    This toggles enabling on or off.
    
    @property log.enabled
    @readOnly
    @type {Boolean}
    @default false
    **/
    enabled: true
}

/**
Plugins for thrust to load, override with your own set if you have a different set.

@property plugins
@readOnly
@type {Array}
**/
export var plugins = []

/**
* The set of modules to preload with the inital wireup of the Thrust instance.
*
* Accepts the module path a string or the module as an object in the following format.
*   Where args will be handed off to the module life cycle methods.
*
*    {
*        path: '',
*        args: []
*    }
*
* @property modules
* @readOnly
* @type {Array}
**/
export var modules = []

/**
Used internally by thrust to determine if the life-cycle is controlled by thrust, or a parent instance.

@property childInstance
@readOnly
@type {Boolean}
**/
export var childInstance = false

/**
Used internally by thrust to determine if thrust should control the life-cycle, or the consumer

@property automaticLifecycle
@readOnly
@type {Boolean}
**/
export var automaticLifecycle = true

/**
Used internally by thrust to determin if the thrust instance should automatically start upon creation.

@property autoStart
@readOnly
@type {Boolean}
**/
export var autoStart = false

/**
Define the conventions that unique to thrust, they are not specific to any one plugin.

@property conventions
@readOnly
@type {Array}
**/
export var conventions: string[] = [
    'thrust/convention/container',
    'thrust/convention/autostart',
    'thrust/convention/dependent.modules'];

/**
AMD API
load

Handles fetching of a current config for the current thrust instance, or the config of the given plugin.
Adding the : character requests a specific config plugin.
thrust/config!global = thrust!global:config = Thrust instance config from the instance named global.

@method load
@static
@param {String} name The name of the instance that is being fetched
@param {Function} parentRequire the require method to be loaded
@param {Function} load Allows the load to inform that AMD for the value to hand off
@param {Object} config The custom configuration.
**/
export function load(name: string, parentRequire, load, config)
{
    var parts = name.split(':'),
        realName = parts[0],
        pluginName = parts[1] || false;

    var instanceDeferred = thrustInstance.fetchInstance(realName);
    instanceDeferred.promise.then(function (context)
    {
        var plugin = pluginName && context.cfg[pluginName] || context.config;
        if (!plugin)
            throw new Error('Plugin "' + pluginName + '" does not exist on thrust instance "' + realName + '".');

        load(plugin);
    });
}
/*}*/