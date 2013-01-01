/// <reference path="../interfaces/spa/spa.d.ts" />
/// <reference path="../interfaces/spa/spa.facade.d.ts" />
/// <reference path="../interfaces/spa/spa.config.d.ts" />
/// <reference path="../interfaces/mediator/mediator.d.ts" />
/// <reference path="../../../lib/DefinitelyTyped/requirejs/require-2.1.d.ts" />

// Disabled until TS supports module per file in some way (ie exports is exports.<export> not  exports.moduleName.<export>)
/*export module instance {*/

'use strict';
import util = module('thrust/util');
var _ = util._;

    import thrust = module('thrust');
    var Thrust = thrust.Thrust;
    import log = module('thrust/log');
    import has = module('has');
	export import flatironRouter = module('flatiron/director');
	var Router = <any> flatironRouter.Router || flatironRouter;
    import domReady = module('domReady');
    import instance = module('thrust/instance');
    export import config = module('./config');
    export var className = 'SinglePageApplication';
config;

    var each       = _.each,
        isString   = _.isString,
        isArray    = _.isArray,
        isFunction = _.isFunction,
        isObject   = _.isObject,
        isRegExp   = _.isRegExp,
        extend     = _.extend,
        once       = _.once,
        when       = util.when,
        bind       = _.bind,
        invoke     = _.invoke,
        pluck      = _.pluck,
        map        = _.map,
        defer      = _.defer,
        reduce     = _.reduce,
        memoize    = _.memoize,
        toArray    = _.toArray,
        format     = util.format,
        START      = 'start';

    var extractParams = function (route : string) : string[]
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
	
	var eventFactory = function (event : string, mediator : IThrustMediator)
	{
		return function ()
		{
			has('DEBUG') && log.debug(format('Firing spa "{0}" with [{1}]', event, toArray(arguments).join(',')));
			mediator.fire.async.apply(mediator, [event].concat(toArray(arguments)));
		};
	};
    /**

    @for thrust.spa
    @class thrust.spa.SinglePageApp
    @constructor
    @param {Object} config The thrust instance configuration
    @param {String} instanceName The thrust instance name
    @param {thrust.mediatorMediator} mediator The thrust instance mediator
    **/
	export class SinglePageApplication implements IThrustSpa
	{
		public name: string;
		public baseUrl : string;
		public fileExtension : string;
		public instanceName : string;
		public router : flatironRouter.FlatironRouter;
		public thrust : IThrust;
		public startingModulePromise : Promise = null;
		
		constructor(config : IThrustConfig, instanceName, mediator)
		{
			var that = this;
			that.baseUrl = config.url.path;

			var spaConfig = config.spa;

			that.fileExtension = spaConfig.fileExtension;

			var routes = that.configureRoutes(spaConfig.routes),
				params = spaConfig.params;

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

			_.each(<Object> params, function (x, i)
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
		}

		/**
        Navigates to the given url.

        @method navigate
        @param {String} location The location to navigate to.
        **/
        public navigate(location : string) : void
        {
            var that = this;
            var url = util.fixupUrl(location, that.baseUrl);
            that.router.setRoute(url);
        }

        /**
        Start the single page app router.

        @method start
        **/
        public start()
        {
            this.thrust = instance.getInstance(this.instanceName);
            this.router.init();
            this.thrust.mediator.fire.async('thrust/spa/start');
        }
		
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
        private configureRoutes(routes : Object) : Object
        {
            var that = this,
			    configuredRoutes = {};
			
			// each(routes, function (value, route) {
			for (var route in routes)
			{
				if (_.has(routes, route))
				{
					var value = routes[route];
					
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

						var moduleCallback = that.moduleStartCallback(route, modules);
						methods.push(moduleCallback);
						configuredRoutes[realRoute] = methods;
					}
					else if (isString(value))
					{
						var moduleCallback = that.moduleStartCallback(route, value);
						configuredRoutes[realRoute] = moduleCallback;
					}
				}
			}
			//});

            return configuredRoutes;
        }
        /**

        @method moduleStartCallback
        @private
        @param {String | Array | Object} modules String to start a single module, Array to start many modules, Object to start a module with specific arguments.
        **/
        private moduleStartCallback(route : string, modules : any) : Function
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
                {
                	promise.then(function ()
                	{
                		thrust.ready(mappedModules, args);
                	});
                }

                that.startingModulePromise = promise;
            };
        }
		
		/**
        Hands the navigate method off to the module, so any module can trigger a navigation event.

        @for thrust.spa.SinglePageApp
        @method createFacade
        @param {thrust.Thrust} thrust The thrust instance
        @param {thrust.Module} mod The module to create the facade for
        @param {Object} facades The facades already added for this module.
        **/
        public createFacade(thrust : IThrust, mod : IThrustModuleInstance, facades : IThrustModuleFacades) : IThrustFacade
        {
            var that = this;
            if (mod.navigate) throw new Error('"navigate" is a reserved property');

            // Already pre bound, so we only pass around 1 function per instance.
            mod.navigate = that.navigate.bind(that);
			
			return null;
        }

		public static config = config;
    }
