define([
    'require',
    'thrust',
    'thrust/util',
    'thrust/log',
    'has',
    'flatiron/director',
    'domReady',
    'thrust/instance'
],
function (require, Thrust, util, log, has, Router, domReady, instance)
{
    var each       = util.each,
        isString   = util.isString,
        isArray    = util.isArray,
        isFunction = util.isFunction,
        isObject   = util.isObject,
        isRegExp   = util.isRegExp,
        extend     = util.extend,
        once       = util.once,
        when       = util.when,
        bind       = util.bind,
        invoke     = util.invoke,
        pluck      = util.pluck,
        map        = util.map,
        defer      = util.defer,
        reduce     = util.reduce,
        memoize    = util.memoize,
        toArray    = util.toArray,
        format     = util.format,
        START      = 'start';


    var extractParams = function (route)
    {
        var params = [],
            index = route.indexOf(':'),
            slashIndex;
        while (index > -1)
        {
            slashIndex = route.indexOf('/', index);
            if (slashIndex === -1)
                slashIndex = route.length;
            params.push(route.substring(index, slashIndex - index + 1));
            route = route.substring(slashIndex);
            index = route.indexOf(':');
        }

        return params;
    };
    /**

    @for thrust.spa
    @class thrust.spa.SinglePageApp
    @constructor
    @param {Object} config The thrust instance configuration
    @param {String} instanceName The thrust instance name
    @param {thrust.mediatorMediator} mediator The thrust instance mediator
    **/
    var SinglePageApp = function (config, instanceName, mediator)
    {
        var that = this;
        that.baseUrl = config.url.path;

        config = config.spa;

        that.fileExtension = config.fileExtension;

        var routes = that.configureRoutes(config.routes),
            params = config.params;

        var eventFactory = memoize(function (event)
        {
            return function ()
            {
                has('DEBUG') && log.debug(format('Firing spa "{0}" with [{1}]', event, toArray(arguments).join(',')));
                mediator.fire.async.apply(mediator, [event].concat(toArray(arguments)));
            };
        });

        var router = that.router = new Router(routes)
            .configure({
                recurse: false,
                strict: false,
                async: false,
                html5history: true,
                notfound: eventFactory('thrust/spa/route/notfound'),
                before: eventFactory('thrust/spa/route/before'),
                on: eventFactory('thrust/spa/route/run'),
                after: eventFactory('thrust/spa/route/after'),
            });

        each(params, function (x, i)
        {
            router.param(i, x);
        });

        /**
        Start the single page app router.

        @method start
        **/
        that.start = function ()
        {
            that.thrust = instance.getInstance(instanceName);
            that.router.init();
            mediator.fire.async('thrust/spa/start');
        };

        that.navigate = that.navigate.bind(that);
    };

    SinglePageApp.prototype = {
        /**
        Hands the navigate method off to the module, so any module can trigger a navigation event.

        @for thrust.spa.SinglePageApp
        @method createFacade
        @param {thrust.Thrust} thrust The thrust instance
        @param {thrust.Module} module The module to create the facade for
        @param {Object} facades The facades already added for this module.
        **/
        createFacade: function (thrust, module, facades)
        {
            var that = this;
            if (module.navigate) throw new Error('"navigate" is a reserved property');

            // Already pre bound, so we only pass around 1 function per instance.
            module.navigate = that.navigate;
        },
        /**
        Navigates to the given url.

        @method navigate
        @param {String} location The location to navigate to.
        **/
        navigate: function(location)
        {
            var that = this;
            var url = util.fixupUrl(location, that.baseUrl);
            that.router.setRoute(url);
        },
        /**
        Configures the route object for the spa instance

        Routes can be in 4 forms

            {
                '/path/to/:foo': 'path/to/module',
                '/path/to/:bar': ['path/to/module1', 'path/to/module2'],
                '/path/to/:fb': { path: 'path/to/module', args: ['args', 'to', 'hand off to start'] }
                '/path/to/:foo/:bar': function(foo, bar){  custom handler }
            }

        @method configureRoutes
        @param {Object} routes Object of routes.
        **/
        configureRoutes: function (routes)
        {
            var that = this, configuredRoutes = {};
            each(routes, function (value, route)
            {
                var realRoute = util.fixupUrl(route, that.baseUrl);
                if (isFunction(value))
                {
                    configuredRoutes[realRoute] = value;
                }
                else if (isArray(value))
                {
                    var modules = [], methods = [];
                    for (var i = 0, iLen = value.length; i < iLen; i++)
                    {
                        var v = value[v];
                        if (isString(v) || isObject(v))
                            modules.push(v);
                        else if (isFunction(v))
                            methods.push(v);
                    }

                    var moduleCallback = that.__moduleStartCallback(route, modules);
                    methods.push(moduleCallback);
                    configuredRoutes[realRoute] = methods;
                }
                else if (isString(value))
                {
                    var moduleCallback = that.__moduleStartCallback(route, value);
                    configuredRoutes[realRoute] = moduleCallback;
                }
            });

            return configuredRoutes;
        },
        /**

        @method __moduleStartCallback
        @private
        @param {String | Array | Object} modules String to start a single module, Array to start many modules, Object to start a module with specific arguments.
        **/
        __moduleStartCallback: function(route, modules)
        {
            var args = [], params = extractParams(route),
                that = this,
                fileExtension = that.fileExtension;

            if (isObject(modules))
            {
                args = modules.args || args;
                modules = modules.path;
            }

            if (isString(modules))
            {
                modules = [modules];
            }

            return function ()
            {
                var ar = toArray(arguments),
                    thrust = that.thrust,
                    mappedModules = map(modules, function (modulePath)
                    {
                        return reduce(ar, function (memo, arg, i)
                        {
                            return memo.replace(params[i],
                                arg.toLowerCase());
                        }, modulePath).replace(fileExtension, '');
                    });

                var promise = thrust.start.apply(thrust, [mappedModules].concat(args));
                if (!that.thrust.started)
                    promise.then(function ()
                    {
                        thrust.ready(mappedModules, args);
                    });

                that.startingModulePromise = promise;
            };
        }
    };

    return SinglePageApp;
});