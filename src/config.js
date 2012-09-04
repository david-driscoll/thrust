define(['./instance'],
function (thrustInstance)
{
    /**
    Provides thrust configuration
    
    @module thrust
    @submodule thrust.config
    **/
    'use strict';

    var config = {
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
        throwErrors: true,
        /**
        Tells the framework to run in async mode, this may delay start up, but will make image loading and inital running appear faster.

        @property async
        @readOnly
        @type {Boolean}
        @default true
        **/
        async: true,
        url: {
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
        },
        log: {
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
        },
        /**
        Plugins for thrust to load, override with your own set if you have a different set.

        @property plugins
        @readOnly
        @type {Array}
        **/
        plugins: [
            'thrust/data',
            'thrust/dom',
            'thrust/template',
            'thrust/spa',
        ],
        /**
        The set of modules to preload with the inital wireup of the Thrust instance.

        @property modules
        @readOnly
        @type {Array}
        **/
        modules: [],
    };

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
    config.load = function (name, parentRequire, load, config)
    {
        var parts = name.split(':'),
            realName = parts[0],
            pluginName = parts[1] || false;

        var instancePromise = thrustInstance.fetchInstance(realName);
        instancePromise.then(function (context)
        {
            var plugin = pluginName && context.cfg[pluginName] || context.config;
            if (!plugin)
                throw new Error('Plugin "' + pluginName + '" does not exist on thrust instance "' + realName + '".');

            load(plugin);
        });
    };

    return config;
});