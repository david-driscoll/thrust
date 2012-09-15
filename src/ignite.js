define(['require', 'thrust/config', 'thrust/util', 'module'],
function (require, config, util, module)
{
    var slice = Array.prototype.slice,
        isArray = util.isArray,
        toArray = util.toArray,
        each = util.each,
        map = util.map,
        any = util.any,
        all = util.all,
        when = util.when,
        extend = util.extend,
        flatten = util.flatten,
        pluck = util.pluck,
        isObject = util.isObject,

        reconcileArrays = function (config, settings, to)
        {
            var keys = util.keys(config);
            if (settings)
            {
                keys = util.union(util.keys(settings), keys);
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
                else if (isObject(x))
                {
                    reconcileArrays(x, null, to[i]);
                }
            });
        },
        stageOneComplete = {};

    /**
    Contructs a wire spec for thrust to launch from.

    @module thrust
    **/
    return {
        /**
       Merges a all the plugins configurations, with the default config, and then finally with
       any customized config from requirejs

       @method stageOne
       @param {Object} settings The settints to pass onto the thrust instance being created.
       **/
        stageOne: function (settings)
        {
            var that = this;

            if (stageOneComplete[settings.name])
            {
                return that.stateTwo(settings);
            }

            var plugins = ['thrust/mediator'].concat(settings.plugins || module.config().plugins || config.plugins || []),
                defer = when.defer();

            settings.plugins = plugins;

            require(plugins.map(function (x) { return x + '/config'; }), function ()
            {
                var args = arguments;
                plugins.forEach(function (plugin, i)
                {
                    var name = plugin.substring(plugin.lastIndexOf('/') + 1);
                    config[name] = args[i];
                });

                util.deepCopy(config, module.config());

                when.chain(that.stateTwo(settings), defer);
            });
            stageOneComplete[settings.name] = true;

            return defer;
        },
        /**
        Creates a thrust instance, from the given settings.
        Including the plugins, and given default modules.

        @method stateTwo
        @param {Object} settings The settints to pass onto the thrust instance being created.
        **/
        stateTwo: function (settings)
        {
            /*jshint loopfunc:true*/
            // Get the configuration
            var localConfig = util.deepCopy({}, config, settings),
                defer = when.defer();
            // Reconicle the arrays so they are properly arrays
            reconcileArrays(config, settings, localConfig);

            // Mediator is a required plugin, include all the others in addition to it.
            var plugins = localConfig.plugins,
                // The modules to load
                modulesToLoad = [],
                // The module configuration object
                modulesConfigurations = { thrust: 'thrust' };

            // Loop through all the plugins, creating a proper dependancy list.
            for (var i = 0, iLen = plugins.length; i < iLen; i++)
            {
                var plugin = plugins[i],
                    name = plugin.substring(plugin.lastIndexOf('/') + 1),
                    pluginConfig = localConfig[name];

                modulesToLoad.push(plugin);
                modulesToLoad.push(pluginConfig.conventions || []);
                modulesConfigurations[plugin] = pluginConfig;
            }

            // Name and cfg are default properties of the configuration context
            var orderedPlugins = ['name', 'cfg'],
                // We loop through until all the plugins are in proper order.
                reloop = true,
                iLen = modulesToLoad.length,
                i = 0;

            // Loop through all the plugins until we have a set that will load in proper order.
            while (i < iLen)
            {
                // The plugin
                var plugin = modulesToLoad[i],
                    // The implied plugin name
                    name = plugin.substring(plugin.lastIndexOf('/') + 1),
                    // The plugins configuration
                    pluginConfig = localConfig[name];

                // Check if the plugin has to resolve anything.
                if (pluginConfig.resolve && pluginConfig.resolve.length > 0 && !all(pluginConfig.resolve,
                    function (x)
                {
                        return any(orderedPlugins, function (z)
                {
                        return x === z || x === z;
                });
                })
                )
                {
                    // The modules to load.
                    // Also includes any conventions.
                    modulesToLoad.push.apply(modulesToLoad, modulesToLoad.splice(i, 2));
                }
                else
                {
                    // reorder the plugin
                    i += 2;
                    orderedPlugins.push(name);
                }
            }

            // The modules config
            var modules = localConfig.modules || [];
            // Thrust and thrust/module also need to be loaded.
            modulesToLoad.push.apply(modulesToLoad, ['thrust', 'thrust/module'].concat(modules || []));
            // Flatten the resultant array
            modulesToLoad = flatten(modulesToLoad);

            // Create the configuration spec
            var spec = {
                name: localConfig.name || 'global',
                cfg: localConfig
            };

            // Load everything
            require(modulesToLoad, function ()
            {
                // Get ready to loop
                var currentPlugin = null, allConventions = [];

                // Loop through all the modules being loaded
                for (var i = 0, iLen = modulesToLoad.length - (modules.length + 1) ; i < iLen; i++)
                {
                    // Get plugin and configuration
                    var plugin = modulesToLoad[i],
                        mConfig = modulesConfigurations[plugin];

                    // Check if we have a configuration object
                    if (mConfig)
                    {
                        // Load a new plugin.
                        var pluginClass = arguments[i],
                            // Get the plugin name
                            name = plugin.substring(plugin.lastIndexOf('/') + 1),
                            // Resolve all the required items.
                            resolveItems = map(mConfig.resolve, function (x) { return spec[x]; });

                        // Instantiate the plugin
                        currentPlugin = spec[name] = util.instantiate(pluginClass, resolveItems);
                        // Setup the conventions
                        currentPlugin.__conventions = [];
                    }
                        // Load all the conventions
                    else if (currentPlugin)
                    {
                        // Load the convention into the plugin
                        currentPlugin.__conventions.push(arguments[i]);
                        // Load the convention into the thrust instance.
                        allConventions.push(arguments[i]);
                    }
                }

                // The last current plugin, will always be thrust.
                currentPlugin.__conventions = allConventions;

                // Extend thrust with the spec
                extend(currentPlugin, spec);

                // Get the index of the given modules.
                var moduleIndex = arguments.length - (modules.length + 1),
                    // The module creater function
                    Module = arguments[moduleIndex],
                    // Get the definitions
                    moduleDefinitions = slice.call(arguments, moduleIndex + 1),
                    // Assign thrust
                    thrust = currentPlugin;

                // Loop over all the modules
                for (var i = 0, iLen = modules.length; i < iLen; i++)
                {
                    // Get the module name
                    var module = modules[i],
                        // Get the definition
                        definition = moduleDefinitions[i];

                    // Create the instance
                    var moduleInstance = new Module(thrust, definition, module);
                    // Inject it into the thrust instance
                    moduleInstance.thrustCreate(thrust);
                }

                defer.resolve(spec);
            }, defer.reject);

            return defer.promise;
        }
    };
});