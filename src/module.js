define(['thrust/util', 'thrust/log', 'has'],
function (util, log, has)
{
    var type = util.type,
        format = util.format,
        isObject = util.isObject,
        extend = util.extend,
        when = util.when,
        thrustCache = {},
        /**
        Moves all properties, that should exist outside of the module, into a private object for holding.

        @method moveToThrustCache
        @private
        @param {Object} from Object to extract items from
        @param {Object} to Object to place items on
        @param {Array} list Items to move from to the other object
        **/
        moveToThrustCache = function (from, to, list)
        {
            for (var i = 0, iLen = list.length; i < iLen; i++)
            {
                to[list[i]] = from[list[i]];
                delete from[list[i]];
            }
        },
        getEventNamespace = function (name, prefix)
        {
            if (!prefix) prefix = 'module-'; return '.' + (name === 'global' ? 'global' : prefix + name.replace(/\./g, '-'));
        },
        __optionalMethods = [     // Optional methods that may be on a module
            'start',
            'stop',
            'ready'
        ];

    /**
    The module is the heart of the thrust, every module gets one facade per module.

    @module thrust
    @class thrust.Module
    @param {Thrust} thrust The thrust instance
    @param {Object} def The module definition
    @param {String} [name] The module name.
    **/
    var Module = function (thrust, def, name)
    {
        name = this.name = (name || def.name);
        if (typeof def === 'function')
        {
            def = def(name);
            def.name = name;
        }
        var mid = this.mid = thrust.name + ':' + name;
        var tCache = thrustCache[def.hash || mid];

        this.instance = extend(def, tCache && tCache.instance || {});
        this.instance.name = (this.instance.name || name);
        this.instance.mid = mid;

        if (!this.instance.name)
            throw new Error('All Modules must have a name!');

        // Modules must have an init method and a destroy method, it's up to the module developer to populate these methods.
        for (var i = 0, iLen = thrust.__requiredMethods.length; i < iLen; i++)
            if (!def[thrust.__requiredMethods[i]])
                throw new Error(format('Required "{0}" method not found on module "{1}"!', thrust.__requiredMethods[i], name));

        // If the module name is undefined, bring the name into the module.
        if (typeof def.name === 'undefined')
            def.name = name;

        var thrustModule = thrustCache[mid] = extend(tCache || {}, {
            _started: false,
            name: util.getModuleNameForPath(name),
            module: this
        });

        delete thrustCache[def.hash];

        var facades = thrustModule.facades || (thrustModule.facades = {});
        if (!thrust.__conventionPluckPropertiesCache) thrust.__conventionPluckPropertiesCache = util.flatten(util.pluck(thrust.__conventions || [], 'properties'));

        // Move all special properties off to the thrust's internal method.
        moveToThrustCache(this.instance, thrustModule, thrust.__requiredMethods);
        moveToThrustCache(this.instance, thrustModule, __optionalMethods);
        moveToThrustCache(this.instance, thrustModule, thrust.__conventionPluckPropertiesCache);

        util.safeInvoke(thrust, 'createFacade', thrust, this.instance, facades);

        this.__namespace = getEventNamespace(this.instance.name);

        this.thrust = thrust;
    };

    var callFacadeMethods = function (method, mid)
    {
        var results = [];
        for (var i in thrustCache[mid].facades)
        {
            var moduleCache = thrustCache[mid],
                facade = moduleCache.facades[i];
            has('DEBUG') && log.debug(format('thrust/module: Calling facade "{0}" {1}()', i, method));
            if (facade[method] && isObject(facade))
                results.push(facade[method].call(facade, thrustCache[mid].module));
        }
        return results;
    };

    Module.prototype = {
        /**
        Getter/Setter for convention methods.
        Gets the value convention property (defined in the properties array of a facade).
        Sets the value of a convention property (for storing convention configuration)

        @param {String} property The property to get or set
        @param {object} [value] The value to set
        @method convention
        @returns {Object} The valaue.
        **/
        convention: function (property, value)
        {
            if (typeof value !== 'undefined')
            {
                thrustCache[this.mid][property] = value;
                return;
            }
            return thrustCache[this.mid][property];
        },
        /**
        Injects this module into the given thrust instance.

        @method thrustCreate
        @param {Thrust} thrust The thrust instance.
        **/
        thrustCreate: function (thrust)
        {
            thrust.__injectModule(this);
        },
        /**
        Makes a call to all the modules facades
        The order of the call depends on the order required.
        During the startup stage (init, start, ready) facades are called first.
        During the shutdown state (stop, destroy) facades are called last.
        This allows modules to startup and shutdown will all the tools it had to begin with.

        @method thrustCall
        @protected
        @param {String} method the method to call
        @param {Boolean} facadeAfter calls facade methods before or after module method.
        @param {Array} args Args to be passed onto the module method.
        **/
        thrustCall: function (method, facadeAfter, args)
        {
            var defer = when.defer(),
                results,
                that = this;

            has('DEBUG') && log.debug(format('thrust/module: Calling facades for "{0}"', that.name));
            var m = thrustCache[that.mid][method];
            if (!facadeAfter)
            {
                results = callFacadeMethods(method, that.mid);
                if (results)
                    when.chain(when.all(util.flattenToPromises(results)), defer);
                else
                    defer.resolve();

                if (m)
                {
                    var newDefer = when.defer();
                    defer.then(function ()
                    {
                        var result = m.apply(that.instance, args);
                        if (result)
                            when.chain(when.all(util.flattenToPromises(result)), newDefer);
                        else
                            newDefer.resolve();
                    });
                    defer = newDefer;
                }
            }
            else
            {
                var m = thrustCache[that.mid][method];
                if (m)
                {
                    results = m.apply(that.instance, args);
                    if (results)
                        when.chain(when.all(util.flattenToPromises(results)), defer);
                    else
                        defer.resolve();
                }
                else
                    defer.resolve();

                var newDefer = when.defer();
                defer.then(function ()
                {
                    var result = callFacadeMethods(method, that.mid);
                    if (result)
                        when.chain(when.all(util.flattenToPromises(result)), newDefer);
                    else
                        newDefer.resolve();
                });
                defer = newDefer;
            }

            return defer.promise;
        },
        /**
        Start the module, inside the thrust container it was created on.

        @method start
        **/
        start: function ()
        {
            var that = this;
            that.thrust.start(that.name);
        },
        /**
        Stop the module, inside the thrust container it was created on.

        @method start
        **/
        stop: function ()
        {
            var that = this;
            that.thrust.stop(that.name);
        }
    };

    /**
    AMD API
    load

    Handles fetching of a module instance.
    Format:
    thrust/module!{instance}:{moduleName}

    @method load
    @static
    @param {String} name The name of the instance that is being fetched
    @param {Function} parentRequire the require method to be loaded
    @param {Function} load Allows the load to inform that AMD for the value to hand off
    @param {Object} config The custom configuration.
    **/
    Module.load = function (name, parentRequire, load, config)
    {
        var parts = name.split(':'),
            instanceName = parts[0],
            moduleName = parts[1];

        require(['thrust!' + instanceName], function (thrust)
        {
            var module = thrust.modules[moduleName];
            if (!module)
                throw new Error(format('Module "{0}" does not exist on thrust instance "{1}".', moduleName, instanceName));

            load(module);
        });
    };

    Module.thrustCache = thrustCache;

    return Module;
});