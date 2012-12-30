define(["require", "exports", 'module', 'thrust/util', './config', './capsule'], function(require, exports, __requireModule__, __util__, __config__, __tm__) {
    /// <reference path="interfaces/thrust.d.ts" />
    /// <reference path="../lib/DefinitelyTyped/requirejs/require-2.1.d.ts" />
    // Disabled until TS supports module per file in some way (ie exports is exports.<export> not  exports.moduleName.<export>)
    /*export module instance {*/
    'use strict';
    var requireModule = __requireModule__;

    var util = __util__;

    var _ = util._;
    
    var config = __config__;

    var tm = __tm__;

    var slice = Array.prototype.slice, isArray = _.isArray, toArray = _.toArray, isFunction = _.isFunction, each = _.each, map = _.map, any = _.any, all = _.all, when = util.when, extend = _.extend, flatten = _.flatten, pluck = _.pluck, isObject = _.isObject, keys = _.keys, union = _.union, stageOneComplete = {
    };
    function reconcileArrays(config, settings, to) {
        var keys = _.keys(config);
        if(settings) {
            keys = union(_.keys(settings), keys);
        } else {
            settings = {
            };
        }
        each(keys, function (i) {
            var x = settings[i] || config[i];
            if(isArray(x)) {
                to[i] = toArray(settings[i] || to[i]);
            } else {
                if(isObject(x) && !isFunction(x)) {
                    reconcileArrays(x, null, to[i]);
                }
            }
        });
    }
    /**
    Contructs a wire spec for thrust to launch from.
    
    @module thrust
    **/
    /**
    Merges a all the plugins configurations, with the default config, and then finally with
    any customized config from requirejs
    
    @method stageOne
    @param {Object} settings The settints to pass onto the thrust instance being created.
    **/
    function stageOne(settings) {
        /*jshint validthis:true */
        var that = this;
        if(stageOneComplete[settings.name]) {
            return that.stateTwo(settings);
        }
        var plugins = [
'thrust/mediator'        ].concat(settings.plugins || requireModule.config().plugins || config.plugins || []), defer = when.defer();
        settings.plugins = plugins;
        require(plugins.map(function (x) {
            return x;
        }), function () {
            var args = arguments;
            plugins.forEach(function (plugin, i) {
                var name = plugin.substring(plugin.lastIndexOf('/') + 1);
                var pluginClass = args[i][args[i].className];
                config[name] = pluginClass.config;
            });
            _.merge(config, requireModule.config());
            when.chain(that.stateTwo(settings), defer);
        });
        stageOneComplete[settings.name] = true;
        return defer.promise;
    }
    exports.stageOne = stageOne;
    /**
    Creates a thrust instance, from the given settings.
    Including the plugins.
    
    @method stateTwo
    @param {Object} settings The settints to pass onto the thrust instance being created.
    **/
    function stateTwo(settings) {
        /*jshint loopfunc:true */
        // Get the configuration
                var localConfig = _.merge({
        }, config, settings), defer = when.defer();
        // Reconicle the arrays so they are properly arrays
        reconcileArrays(config, settings, localConfig);
        // Mediator is a required plugin, include all the others in addition to it.
                var plugins = localConfig.plugins, modulesToLoad = // The modules to load
        [], modulesConfigurations = // The module configuration object
        {
thrust: 'thrust'        };
        // Loop through all the plugins, creating a proper dependancy list.
        for(var i = 0, iLen = plugins.length; i < iLen; i++) {
            var plugin = plugins[i], name = plugin.substring(plugin.lastIndexOf('/') + 1), pluginConfig = localConfig[name];
            modulesToLoad.push(plugin);
            modulesToLoad.push(pluginConfig && pluginConfig.conventions || []);
            modulesConfigurations[plugin] = pluginConfig;
        }
        // Name and cfg are default properties of the configuration context
                var orderedPlugins = [
'name', 
'cfg'        ], reloop = // We loop through until all the plugins are in proper order.
        true, iLen = modulesToLoad.length, i = 0;
        // Loop through all the plugins until we have a set that will load in proper order.
        while(i < iLen) {
            // The plugin
                        var plugin = modulesToLoad[i], name = // The implied plugin name
            plugin.substring(plugin.lastIndexOf('/') + 1), pluginConfig = // The plugins configuration
            localConfig[name];
            // Check if the plugin has to resolve anything.
            if(pluginConfig && pluginConfig.resolve && pluginConfig.resolve.length > 0 && !all(pluginConfig.resolve, function (x) {
                return any(orderedPlugins, function (z) {
                    return x === z || x === z;
                });
            })) {
                // The modules to load.
                // Also includes any conventions.
                modulesToLoad.push.apply(modulesToLoad, modulesToLoad.splice(i, 2));
            } else {
                // reorder the plugin
                i += 2;
                orderedPlugins.push(name);
            }
        }
        // The modules config
        var modules = localConfig.modules || [];
        // Thrust and thrust/capsule also need to be loaded.
        modulesToLoad.push.apply(modulesToLoad, [
            'thrust'
        ]);
        // Flatten the resultant array
        modulesToLoad = flatten(modulesToLoad);
        // Create the configuration spec
        var spec = {
            name: localConfig.name || 'global',
            cfg: localConfig
        };
        // Load everything
        require(modulesToLoad, function () {
            // Get ready to loop
                        var currentPlugin = null, allConventions = [];
            // Loop through all the modules being loaded
            for(var i = 0, iLen = modulesToLoad.length; i < iLen; i++) {
                // Get plugin and configuration
                                var plugin = modulesToLoad[i], mConfig = modulesConfigurations[plugin];
                // Check if we have a configuration object
                if(mConfig) {
                    // Load a new plugin.
                                        var pluginObject = arguments[i], name = // Get the plugin name
                    plugin.substring(plugin.lastIndexOf('/') + 1), resolveItems = // Resolve all the required items.
                    map(mConfig.resolve, function (x) {
return spec[x];                    });
                    var pluginClass = pluginObject[pluginObject.className];
                    // Instantiate the plugin
                    currentPlugin = spec[name] = util.instantiate(pluginClass, resolveItems);
                    // Setup the conventions
                    currentPlugin.__conventions = [];
                } else {
                    // Load all the conventions
                    if(currentPlugin) {
                        // Load the conventions into the plugin
                        _.forOwn(arguments[i], function (x) {
                            return currentPlugin.__conventions.push(x);
                        });
                        // Load the conventions into the thrust instance.
                        _.forOwn(arguments[i], function (x) {
                            return allConventions.push(x);
                        });
                    }
                }
            }
            // The last current plugin, will always be thrust.
            currentPlugin.__conventions = allConventions;
            // Extend thrust with the spec
            extend(currentPlugin, spec);
            defer.resolve(spec);
        }, defer.reject);
        return defer.promise;
    }
    exports.stateTwo = stateTwo;
    /**
    Loads up the default modules as indicated to thrust.
    
    @method stageThree
    @param {Object} context The context to use to load the modules.
    **/
    function stageThree(context) {
        var thrust = context.thrust, defer = when.defer(), modules = context.cfg.modules;
        require(modules, function () {
            var args = [];
            for (var _i = 0; _i < (arguments.length - 0); _i++) {
                args[_i] = arguments[_i + 0];
            }
            var Module = tm.Module;
            // Get the definitions
            var moduleDefinitions = args;
            // Loop over all the modules
            for(var i = 0, iLen = modules.length; i < iLen; i++) {
                // Get the module name
                                var mod = modules[i], definition = // Get the definition
                moduleDefinitions[i];
                // Create the instance
                var moduleInstance = new Module(thrust, definition, mod);
                // Inject it into the thrust instance
                moduleInstance.thrustCreate(thrust);
            }
            defer.resolve();
        }, defer.reject);
        return defer.promise;
    }
    exports.stageThree = stageThree;
})
//@ sourceMappingURL=ignite.js.map
