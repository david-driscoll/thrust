/*! Thrust JS Framework - v0.1.0 - 2012-09-03
* thrust-home
* Copyright (c) 2012 David Driscoll; Licensed MIT */


define('thrust/spa/main',[
    'require',
    'thrust',
    'thrust/util',
    'thrust/log',
    'davis',
    'jquery',
    'domReady'
],
function (require, Thrust, util, log, Davis, jQuery, domReady)
{
    var each       = util.each,
        isString   = util.isString,
        isArray    = util.isArray,
        isFunction = util.isFunction,
        isObject   = util.isObject,
        extend     = util.extend,
        once       = util.once,
        when       = util.when,
        bind       = util.bind,
        invoke     = util.invoke,
        pluck      = util.pluck,
        map        = util.map,
        defer      = util.defer,
        memoize    = util.memoize,
        toArray    = util.toArray,
        START      = 'start';

    /**

    @for thrust.spa
    @class thrust.spa.SinglePageApp
    @constructor
    @param {Object} config The thrust instance configuration
    @param {String} instanceName The thrust instance name
    @param {thrust.mediatorMediator} mediator The thrust instance mediator
    **/
    var SinglePageApp = function (config, /* $ref : name */ instanceName, mediator)
    {
        // Need to build a shim for the jQuery methods Davis needs.
        if (!Davis.$) Davis.$ = jQuery;

        var that = this;
        that.baseUrl = config.url.path + '/';

        config = config.spa;

        that.thrustInstanceName = instanceName;
        that.router = new Davis.App();
        that.router.configure(function (config)
        {
            config.generateRequestOnPageLoad = true;
        });

        that.loadRoutes(config.routes);
        
        var eventFactory = memoize(function (event)
        {
            return function ()
            {
                mediator.fire.async.apply(mediator, [event].concat(toArray(arguments)));
            };
        });

        // Forward events
        // Technically we should wrap certian parts of the events, to offer a common api that won't shift.
        /**
        The `thrust/spa/start` event is wrapped by thrust, and fired through Davis.js.


        NOTE: Marked as private because this event exposes underlying Davis arguments, and may
        be changed in the future.

        @event thrust/spa/start
        @private
        **/
        that.router.bind('start', eventFactory('thrust/spa/start'));
        /**
        The `thrust/spa/route/lookup` event is wrapped by thrust, and fired through Davis.js.


        NOTE: Marked as private because this event exposes underlying Davis arguments, and may
        be changed in the future.

        @event thrust/spa/route/lookup
        @private
        **/
        that.router.bind('lookupRoute', eventFactory('thrust/spa/route/lookup'));
        /**
        The `thrust/spa/route/run` event is wrapped by thrust, and fired through Davis.js.


        NOTE: Marked as private because this event exposes underlying Davis arguments, and may
        be changed in the future.

        @event thrust/spa/route/run
        @private
        **/
        that.router.bind('runRoute', eventFactory('thrust/spa/route/run'));
        /**
        The `thrust/spa/route/run` event is wrapped by thrust, and fired through Davis.js.


        NOTE: Marked as private because this event exposes underlying Davis arguments, and may
        be changed in the future.

        @event thrust/spa/route/notfound
        @private
        **/
        that.router.bind('routeNotFound', eventFactory('thrust/spa/route/notfound'));
        /**
        The `thrust/spa/request/halt` event is wrapped by thrust, and fired through Davis.js.


        NOTE: Marked as private because this event exposes underlying Davis arguments, and may
        be changed in the future.

        @event thrust/spa/request/halt
        @private
        **/
        that.router.bind('requestHalted', eventFactory('thrust/spa/request/halt'));
        /**
        The `thrust/spa/unsupported` event is wrapped by thrust, and fired through Davis.js.

            
        NOTE: Marked as private because this event exposes underlying Davis arguments, and may
        be changed in the future.

        @event thrust/spa/unsupported
        @private
        **/
        that.router.bind('unsupported', eventFactory('thrust/spa/unsupported'));
    };

    SinglePageApp.prototype = {
        /**
        Start the single page app router.

        @method start
        **/
        start: function ()
        {
            var that = this;
            that.router.start();
        },
        /**
        Loads routes into the spa instance

        Routes can be in 3 forms

            {
                '/path/to/:foo': 'path/to/module',
                '/path/to/:bar': ['path/to/module1', 'path/to/module2'],
                '/path/to/:fb': { path: 'path/to/module', args: ['args', 'to', 'hand off to start'] }
                '/path/to/:foo/:bar': function(){  custom handler }
            }

        @method loadRoutes
        @param {Object} routes Object of routes.
        **/
        loadRoutes: function (routes)
        {
            var that = this;
            each(routes, function (value, route)
            {
                var realRoute = util.fixupUrl(that.baseUrl + route);
                if (isFunction(value))
                {
                    that.router.get(realRoute, value);
                    // Run custom function in davis.
                }
                /*else if (isArray(value))
                {
                    var routeResult = map(value, that.__processRoute);

                    that.router.get(realRoute, function (req)
                    {
                        invoke(routeResult, 'cb', req);
                    });

                    when.all(pluck(routeResult, 'promise'))
                        .then(bind(that.startModules, that, map(value, function(x)
                        {
                            return isObject(x) && x.args || [];
                        })));
                }*/
                else
                {
                    var routeResult = that.__processRoute(value);

                    that.router.get(realRoute, routeResult);
                    //routeResult.promise.then(bind(that.startModules, that, value.args || []));
                }
            });
        },
        /**
        Process each route node depending if it is an object or string.

        @method __processRoute
        @private
        @param {Object|String} value The module or module + args to process.
        **/
        __processRoute: function(value)
        {
            var that = this,
                args = value.args || [];

            if (isObject(value))
            {
                return that.routeGetModuleFactory(value.path, args);
            }
            else if (isString(value))
            {
                return that.routeGetModuleFactory(value, args);
            }
        },
        /**
        Creates a method that is handed off to the router
        When the route invokes that module, it will asyncronously load the given module, and return a promise for the result.

        @method routeGetModuleFactory
        @param {String} modulePath The path to the module
        @param {Function} themMethod The method that is called, after the function is resolved.
        @returns {Promise} The promise for when the module gets loaded.
        **/
        routeGetModuleFactory: function (modulePath, args)
        {
            var that = this;

            return function (req)
            {
                var mp;
                if (modulePath.indexOf(':') > -1)
                {
                    mp = util.reduce(req.params, function (memo, param, i) { return memo.replace(':' + i, param.toLowerCase()); }, modulePath);
                    if (mp.lastIndexOf('.') > -1)
                        mp = mp.substring(0, mp.lastIndexOf('.'));
                }
                that.startModules(args, mp);
            };
        },
        /**
        Starts the given modules, if only one module is passed in, it will start that individually.

        @method startModules
        @param {Array of Object} args to pass onto thrust's start method.
        @param {Array of Module|Module} modules The modules to start
        **/
        startModules: function (args, module)
        {
            var that = this;

            if (!that.thrust)
                that.thrust = Thrust.getInstance(that.thrustInstanceName);

            if (isArray(module))
            {
                each(module, function (x)
                {
                    defer(function ()
                    {
                        var promise = that.thrust.start.apply(that.thrust, [x].concat(args));
                        if (!that.thrust.started)
                            promise.then(function ()
                            {
                                that.thrust.ready(x);
                            });
                    });
                });
            }
            else
            {
                var promise = that.thrust.start.apply(that.thrust, [module].concat(args));
                if (!that.thrust.started)
                    promise.then(function ()
                    {
                        that.thrust.ready(module);
                    });

                that.startingModulePromise = [promise];
            }
        }
    };

    return SinglePageApp;
});
define('thrust/spa', ['thrust/spa/main'], function (main) { return main; });

define('thrust/spa/convention/start',['thrust/convention', 'thrust/util'],
function (Convention, util)
{
    /**
    @module thrust.spa
    @submodule thrust.spa.convention
    **/

    /**
    * # __thrust/spa__ Convention - Start
    *
    * The single page app start convention, does the actual starting of the plugin, in addition it also delays
    * full orbit, until any module it has started has been loaded.
    *
    * @for thrust.spa.convention
    * @property start
    **/
    return new Convention({
        orbit: function (thrust)
        {
            var router = thrust.spa;
            router.start();

            return thrust.spa.startingModulePromise || undefined;
        }
    });
});