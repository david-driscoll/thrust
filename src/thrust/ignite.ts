/// <reference path="interfaces/thrust.d.ts" />
/// <reference path="../../lib/DefinitelyTyped/requirejs/require-2.1.d.ts" />

// Disabled until TS supports module per file in some way (ie exports is exports.<export> not  exports.moduleName.<export>)
/*export module instance {*/

'use strict';

import requireModule = module('module');
import util = module('thrust/util')
var _ = util._;

import log = module('./log');
import config = module('./config');
import tm = module('./capsule');
import instance = module('./instance');

var slice = Array.prototype.slice,
    isArray = _.isArray,
    toArray = _.toArray,
    isFunction = _.isFunction,
    each = _.each,
    map = _.map,
    any = _.any,
    all = _.all,
    when = util.when,
    extend = _.extend,
    flatten = _.flatten,
    pluck = _.pluck,
    isObject = _.isObject,
    keys = _.keys,
    union = _.union;

/*function reconcileArrays(config, settings, to)
{
    var keys = _.keys(config);
    if (settings)
    {
        keys = union(_.keys(settings), keys);
    }
    else
    {
        settings = {};
    }
    each(keys, function (i)
    {
        var x = settings[i] || config[i];
        if (isArray(x))
        {
            to[i] = toArray(settings[i] || to[i]);
        }
        else if (isObject(x) && !isFunction(x))
        {
            reconcileArrays(x, null, to[i]);
        }
    });
}*/

export function mergeSettings(settings: IThrustSettings): IThrustSettings {
    if ((<any> settings).__settingsMerged)
        return settings;
    var requireConfig = requireModule.config(),
        plugins = ['thrust/mediator'].concat(settings.plugins || requireConfig.plugins || config.plugins || []),
        conventions = [].concat(settings.conventions || requireModule.config().conventions || config.plugins || []);
    _.merge(settings, config, requireModule.config(), settings, { __settingsMerged: true, plugins: plugins, conventions : conventions });
    settings.plugins = plugins;
    settings.conventions = conventions;
}

export function fuse(settings: IThrustSettings): Promise {
    var pipe = [];
    settings = mergeSettings(settings);


    if (!instance.instances[settings.name]) {
        pipe.push(stageOne);
    }

    pipe.push(stageTwo);

	if (settings.modules && settings.modules.length) {
		pipe.push(stageThree);
	}
    
	var promise = when.pipeline(pipe, settings);
	return promise;
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
export function stageOne(settings: IThrustSettings): Promise {
    /*jshint validthis:true */
    var plugins = settings.plugins,
        requireConfig = requireModule.config(),
        defer = when.defer();

    settings.plugins = plugins;

    require(plugins.map(function (x) { return x; }), function () {
        var args = arguments;
        plugins.forEach(function (plugin, i) {
            var name = plugin.substring(plugin.lastIndexOf('/') + 1),
                pluginSettings = settings[name] || {},
				pluginRequireConfig = requireConfig[name] || {},
                pluginClass = args[i][args[i].className];
            if (!config[name]) {
                config[name] = _.merge(pluginClass.config, pluginRequireConfig || {});
            }
			var conventions = [].concat(pluginSettings.conventions || pluginRequireConfig.conventions || config[name].conventions || []);
            settings[name] = _.merge({}, config[name], pluginSettings || {}, { conventions: conventions });
            settings[name].conventions = conventions;
        });
        defer.resolve(settings);
    }, defer.reject);

    return defer.promise;
}
/**
Creates a thrust instance, from the given settings.
Including the plugins.

@method stageTwo
@param {Object} settings The settints to pass onto the thrust instance being created.
**/
export function stageTwo(settings: IThrustSettings): Promise {
    /*jshint loopfunc:true */
    // Get the configuration
    var localConfig = settings,
        defer = when.defer();

    // Mediator is a required plugin, include all the others in addition to it.
    var plugins = localConfig.plugins,
        // The modules to load
        modulesToLoad: string[] = [],
        thrustConventions = settings.conventions || [],
        // The module configuration object
        modulesConfigurations = { thrust: 'thrust' };

    // Loop through all the plugins, creating a proper dependancy list.
    for (var i = 0, iLen = plugins.length; i < iLen; i++) {
        var plugin = plugins[i],
            name = plugin.substring(plugin.lastIndexOf('/') + 1),
            pluginConfig = localConfig[name];

        modulesToLoad.push(plugin);
        modulesToLoad.push(pluginConfig && pluginConfig.conventions || []);
        modulesConfigurations[plugin] = pluginConfig;
    }

    // Name and cfg are default properties of the configuration context
    var orderedPlugins = ['name', 'cfg'],
        // We loop through until all the plugins are in proper order.
        reloop = true,
        iLen = modulesToLoad.length,
        i = 0;

    // Loop through all the plugins until we have a set that will load in proper order.
    while (i < iLen) {
        // The plugin
        var plugin = modulesToLoad[i],
            // The implied plugin name
            name = plugin.substring(plugin.lastIndexOf('/') + 1),
            // The plugins configuration
            pluginConfig = localConfig[name];

        // Check if the plugin has to resolve any other plugins
        if (pluginConfig && pluginConfig.resolve && pluginConfig.resolve.length > 0 &&
            !all(pluginConfig.resolve, (x) => any(orderedPlugins, (z) => x === z || x === z))
        ) {
            // The modules to load.
            // Also includes any conventions.
            modulesToLoad.push.apply(modulesToLoad, modulesToLoad.splice(i, 2));
        }
        else {
            // reorder the plugin
            i += 2;
            orderedPlugins.push(name);
        }
    }

    // The modules config
    var modules = localConfig.modules || [];
    // Thrust and thrust/capsule also need to be loaded.
    modulesToLoad.push.apply(modulesToLoad, ['thrust', <any> settings.conventions || []]);
    // Flatten the resultant array
    modulesToLoad = flatten(modulesToLoad);

    // Create the configuration spec
    var spec = {
        name: localConfig.name || 'global',
        cfg: localConfig
    };

    // Load everything
    require(modulesToLoad, (...args: any[]) =>
    {
        // Get ready to loop
        var currentPlugin = null, allConventions = [];

        // Loop through all the modules being loaded
        for (var i = 0, iLen = modulesToLoad.length ; i < iLen - thrustConventions.length; i++) {
            // Get plugin and configuration
            var plugin = modulesToLoad[i],
                mConfig = modulesConfigurations[plugin];

            // Check if we have a configuration object
            if (mConfig) {
                // Load a new plugin.
                var pluginObject = args[i],
                    // Get the plugin name
                    name = plugin.substring(plugin.lastIndexOf('/') + 1),
                    // Resolve all the required items.
                    resolveItems = map(mConfig.resolve, (x) => spec[x]);

                var pluginClass = pluginObject[pluginObject.className];
                // Instantiate the plugin
                currentPlugin = spec[name] = util.instantiate(pluginClass, resolveItems);
                // Setup the conventions
                currentPlugin.__conventions = [];
            }
                // Load all the conventions
            else if (currentPlugin) {
                // Load the conventions into the plugin
                _.forOwn(args[i], (x) => currentPlugin.__conventions.push(x));
                // Load the conventions into the thrust instance.
                _.forOwn(args[i], (x) => allConventions.push(x));
            }
        }

        // The last current plugin, will always be thrust.
        currentPlugin.__conventions = allConventions;
        var thrustConventionDefinitions = args.slice(modulesToLoad.length - thrustConventions.length);
        thrustConventionDefinitions = flatten(map(thrustConventionDefinitions, (x) => map(x, (z) => z)));
        currentPlugin.__thrustConventions = thrustConventionDefinitions;
        allConventions.push.apply(allConventions, thrustConventionDefinitions);

        // Extend thrust with the spec
        extend(currentPlugin, spec);

        defer.resolve(spec);
    }, defer.reject);

    return defer.promise;
}
/**
Loads up the default modules as indicated to thrust.

@method stageThree
@param {Object} context The context to use to load the modules.
**/
export function stageThree(context): Promise {
    var thrust = context.thrust,
        defer = when.defer(),
        modules = context.cfg.modules;

    modules = _.filter(modules, (x) => !thrust.modules[x]);

    require(modules, (...args: any[]) =>
    {
        var Module = tm.Module;
        // Get the definitions
        var moduleDefinitions = args;

        // Loop over all the modules
        for (var i = 0, iLen = modules.length; i < iLen; i++) {
            // Get the module name
            var mod = modules[i],
                // Get the definition
                definition = moduleDefinitions[i];

            // Create the instance
            var moduleInstance = new Module(thrust, definition, mod);
            // Inject it into the thrust instance
            moduleInstance.thrustCreate(thrust);
        }
        defer.resolve(context);
    }, defer.reject);

    return defer.promise;
}