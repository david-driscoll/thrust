define([
    'thrust/util', 'thrust/module'
],
function (util, Module)
{
    /**

    The Facade module offers the ability to create an interface or similar concept.
    With the Facade in thrust, it allows you to capture events from a module, when loaded via convention.
    Facades are mainly for use in thrust plugins.

    @module thrust
    **/

    /**
    Facades are mainly for use in thrust plugins.

    Facade has these built in methods:
    * init
    * start
    * ready
    * stop
    * destroy

    Behind the scenes the facade methods, invoke any conventions loaded for the plugin.

    @class thrust.Facade
    **/
    var thrustCache = Module.thrustCache;

    var Facade,
        format           = util.format,
        facadeMethods    = ['init', 'start', 'ready', 'stop', 'destroy'],
        defaultPrototype = {},

        conventionFunctionFactory = function (name) {
            return function (module) {
                var that = this;
                var returnValues = [];
                if (module && !module.convention)
                    module = thrustCache[module.mid].module;
                if (that.__conventions) {
                    return util.safeInvoke(that.__conventions, name, that, module);
                }
            };
        },
        methodWrap = function (method) {
            return function (f) {
                var args = Array.prototype.slice.call(arguments, 1);
                f.apply(this, args);
                return method.apply(this, args);
            };
        };

    for (var i = 0, iLen = facadeMethods.length; i < iLen; i++)
    {
        var method = facadeMethods[i];
        defaultPrototype[method] = conventionFunctionFactory(method);
    }

    /**
    Facade init

    Called during the init phase of a module startup.

    @method init
    @returns Promise any facade method may optionally return a promise to delay the start of the next phase.
    **/

    /**
    Facade start

    Called during the start phase of a module startup.

    @method start
    @returns Promise any facade method may optionally return a promise to delay the start of the next phase.
    **/

    /**
    Facade ready

    Called during the ready phase of a module startup.

    @method ready
    @returns Promise any facade method may optionally return a promise to delay the start of the next phase.
    **/

    /**
    Facade stop

    Called during the init phase of a module startup.

    @method stop
    @returns Promise any facade method may optionally return a promise to delay the start of the next phase.
    **/

    /**
    Facade destroy

    Called during the destroy phase of a module startup.

    @method destroy
    @returns Promise any facade method may optionally return a promise to delay the start of the next phase.
    **/

    return {
        /**
        AMD API
        load

        Handles fetching of a module instance

        Format:
        thrust/module!{instance}:{pluginName}:{hashKey}

        hasKey: is a unique key, that the module shares with the facade, allows for defining dependencies
                    in your define block, and get access to the modules facade.

        @method load
        @static
        @obsolete
        @param {String} name The name of the instance that is being fetched
        @param {Function} parentRequire the require method to be loaded
        @param {Function} load Allows the load to inform that AMD for the value to hand off
        @param {Object} config The custom configuration.
        **/
        load: function (name, parentRequire, load, config)
        {
            var parts = name.split(':'),
                instanceName = parts[0],
                plugin = parts[1],
                pluginName = plugin.substring(plugin.lastIndexOf('/')+1 || 0),
                hashKey = parts[2];

            if (!instanceName)
                throw new Error('instanceName is required!');
            if (!pluginName)
                throw new Error('pluginName is required!');
            if (!hashKey)
                throw new Error('hashKey is required!');

            require(['thrust!' + instanceName], function (thrust)
            {
                var plugin = thrust[pluginName];
                if (!plugin)
                {
                    require([plugin], function (p)
                    {
                        load(p);
                    });
                    return;
                }

                var thrustModuleCacheItem = thrustCache[hashKey] || (thrustCache[hashKey] = { facades: {}, instance: {} });

                var facade = plugin.createFacade(thrust, thrustModuleCacheItem.instance, thrustModuleCacheItem.facades);
                
                load(facade);
            });
        },
        createFacade: function(initMethod)
        {
            var Facade = function (module)
            {
                initMethod.apply(this, arguments);

                for (var i = 0, iLen = facadeMethods.length; i < iLen; i++)
                {
                    var method = facadeMethods[i];
                    if (this[method] !== defaultPrototype[method])
                    {
                        this[method] = util.wrap(this[method], methodWrap(defaultPrototype[method]));
                    }
                }

                this.module = module;
                //this.init(module);
            };

            Facade.fn = Facade.prototype = util.extend({
                updateFacade: function ()
                {
                    initMethod.apply(this, arguments);
                }
            }, defaultPrototype);
            
            return Facade;
        }
    };
});