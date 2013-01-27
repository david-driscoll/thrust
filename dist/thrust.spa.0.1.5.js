/*! thrust-js - v0.1.5 - 2013-01-26 */
define('thrust/spa/config',["require", "exports"], function(require, exports) {
    
    exports.resolve = [
        'cfg', 
        'name', 
        'mediator'
    ];
    exports.conventions = [
        'thrust/spa/convention/start', 
        'thrust/spa/convention/spalink'
    ];
    exports.params = {
    };
    exports.routes = {
    };
    exports.fileExtension = '.html';
})
//@ sourceMappingURL=config.js.map
;
define('thrust/spa/main',["require", "exports", 'thrust/util', 'thrust', 'thrust/log', 'has', 'flatiron/director', 'thrust/instance', './config'], function(require, exports, __util__, __thrust__, __log__, __has__, __flatironRouter__, __instance__, __config__) {
    
    var util = __util__;

    var _ = util._;
    var thrust = __thrust__;

    var Thrust = thrust.Thrust;
    var log = __log__;

    var has = __has__;

    var flatironRouter = __flatironRouter__;

    var Router = flatironRouter.Router || flatironRouter;
    
    var instance = __instance__;

    var config = __config__;

    exports.className = 'SinglePageApplication';
    config;
    var each = _.each, isString = _.isString, isArray = _.isArray, isFunction = _.isFunction, isObject = _.isObject, isRegExp = _.isRegExp, extend = _.extend, once = _.once, when = util.when, bind = _.bind, invoke = _.invoke, pluck = _.pluck, map = _.map, defer = _.defer, reduce = _.reduce, memoize = _.memoize, toArray = _.toArray, format = util.format, START = 'start';
    var extractParams = function (route) {
        var params = [], index = route.indexOf(':'), slashIndex;
        while(index > -1) {
            slashIndex = route.indexOf('/', index);
            if(slashIndex === -1) {
                slashIndex = route.length;
            }
            params.push(route.substring(index, slashIndex - index + 1));
            route = route.substring(slashIndex);
            index = route.indexOf(':');
        }
        return params;
    };
    var eventFactory = function (event, mediator) {
        return function () {
            false && log.debug(format('Firing spa "{0}" with [{1}]', event, toArray(arguments).join(',')));
            mediator.fire.async.apply(mediator, [
                event
            ].concat(toArray(arguments)));
        }
    };
    var SinglePageApplication = (function () {
        function SinglePageApplication(config, instanceName, mediator) {
            this.startingModulePromise = null;
            var that = this;
            that.baseUrl = config.url.path;
            var spaConfig = config.spa;
            that.fileExtension = spaConfig.fileExtension;
            var routes = that.configureRoutes(spaConfig.routes), params = spaConfig.params;
            var eventFactory = memoize(function (event) {
                return function () {
                    false && log.debug(format('Firing spa "{0}" with [{1}]', event, toArray(arguments).join(',')));
                    mediator.fire.async.apply(mediator, [
                        event
                    ].concat(toArray(arguments)));
                }
            });
            var router = that.router = new Router(routes).configure({
                recurse: false,
                strict: false,
                async: false,
                html5history: true,
                notfound: eventFactory('thrust/spa/route/notfound'),
                before: eventFactory('thrust/spa/route/before'),
                on: eventFactory('thrust/spa/route/run'),
                after: eventFactory('thrust/spa/route/after')
            });
            _.each(params, function (x, i) {
                router.param(i, x);
            });
            that.start = function () {
                that.thrust = instance.getInstance(instanceName);
                that.router.init();
                mediator.fire.async('thrust/spa/start');
            };
            that.navigate = that.navigate.bind(that);
        }
        SinglePageApplication.prototype.navigate = function (location) {
            var that = this;
            var url = util.fixupUrl(location, that.baseUrl);
            that.router.setRoute(url);
        };
        SinglePageApplication.prototype.start = function () {
            this.thrust = instance.getInstance(this.instanceName);
            this.router.init();
            this.thrust.mediator.fire.async('thrust/spa/start');
        };
        SinglePageApplication.prototype.configureRoutes = function (routes) {
            var that = this, configuredRoutes = {
            };
            for(var route in routes) {
                if(_.has(routes, route)) {
                    var value = routes[route];
                    var realRoute = util.fixupUrl(route, that.baseUrl);
                    if(isFunction(value)) {
                        configuredRoutes[realRoute] = value;
                    } else {
                        if(isArray(value)) {
                            var modules = [], methods = [];
                            for(var i = 0, iLen = value.length; i < iLen; i++) {
                                var v = value[v];
                                if(isString(v) || isObject(v)) {
                                    modules.push(v);
                                } else {
                                    if(isFunction(v)) {
                                        methods.push(v);
                                    }
                                }
                            }
                            var moduleCallback = that.moduleStartCallback(route, modules);
                            methods.push(moduleCallback);
                            configuredRoutes[realRoute] = methods;
                        } else {
                            if(isString(value)) {
                                var moduleCallback = that.moduleStartCallback(route, value);
                                configuredRoutes[realRoute] = moduleCallback;
                            }
                        }
                    }
                }
            }
            return configuredRoutes;
        };
        SinglePageApplication.prototype.moduleStartCallback = function (route, modules) {
            var args = [], params = extractParams(route), that = this, fileExtension = that.fileExtension;
            if(isObject(modules)) {
                args = modules.args || args;
                modules = modules.path;
            }
            if(isString(modules)) {
                modules = [
                    modules
                ];
            }
            return function () {
                var ar = toArray(arguments), thrust = that.thrust, mappedModules = map(modules, function (modulePath) {
return reduce(ar, function (memo, arg, i) {
return memo.replace(params[i], arg.toLowerCase());                    }, modulePath).replace(fileExtension, '');                });
                var promise = thrust.start.apply(thrust, [
                    mappedModules
                ].concat(args));
                if(!that.thrust.started) {
                    promise.then(function () {
                        thrust.ready(mappedModules, args);
                    });
                }
                that.startingModulePromise = promise;
            }
        };
        SinglePageApplication.prototype.createFacade = function (thrust, mod, facades) {
            var that = this;
            if(mod.navigate) {
                throw new Error('"navigate" is a reserved property');
            }
            mod.navigate = that.navigate.bind(that);
            return null;
        };
        SinglePageApplication.config = config;
        return SinglePageApplication;
    })();
    exports.SinglePageApplication = SinglePageApplication;    
})
//@ sourceMappingURL=main.js.map
;
define('thrust/spa', ['thrust/spa/main'], function (main) { return main; });

define('thrust/dom/subjquery',["require", "exports", 'jquery', 'thrust/util', 'thrust/log', 'has'], function(require, exports, __jQuery__, __util__, __log__, __has__) {
    
    var jQuery = __jQuery__;

    var util = __util__;

    var _ = util._;
    var log = __log__;

    var has = __has__;

    var format = util.format, each = _.each, extend = _.extend, isObject = _.isObject, isFunction = _.isFunction, slice = Array.prototype.slice, GLOBAL = '.global';
    var jQueryFnMethodBlackList = [
        'ready', 
        'extend', 
        'queue', 
        'dequeue', 
        'clearQueue', 
        'promise', 
        'bind', 
        'unbind', 
        'live', 
        'die', 
        'delegate', 
        'undelegate', 
        'blur', 
        'focus', 
        'focusin', 
        'focusout', 
        'load', 
        'resize', 
        'scroll', 
        'unload', 
        'click', 
        'dblclick', 
        'mousedown', 
        'mouseup', 
        'mousemove', 
        'mouseover', 
        'mouseout', 
        'mouseenter', 
        'mouseleave', 
        'change', 
        'select', 
        'submit', 
        'keydown', 
        'keypress', 
        'keyup', 
        'error', 
        'serialize', 
        'serializeArray', 
        'ajaxStart', 
        'ajaxStop', 
        'ajaxComplete', 
        'ajaxError', 
        'ajaxSuccess', 
        'ajaxSend', 
        '_toggle', 
        'fadeTo', 
        'stop', 
        'slideDown', 
        'slideUp', 
        'slideToggle', 
        'fadeIn', 
        'fadeOut', 
        'fadeToggle'
    ];
    function normalizeEvents(events, namespace) {
        if(!namespace) {
            return events;
        }
        if(isObject(events)) {
            events = extend({
            }, events);
            for(var key in events) {
                if(key.indexOf('.') === -1) {
                    events[key + namespace] = events[key];
                    delete events[key];
                }
            }
            return events;
        } else {
            if(!events) {
                return namespace;
            }
            events = events.split(' ');
            for(var i = 0, iLen = events.length; i < iLen; i++) {
                var evt = events[i];
                if(evt.indexOf('.') === -1) {
                    events[i] = evt + namespace;
                }
            }
            return events.join(' ');
        }
    }
    function subJQuery() {
        var tQuery = function (selector, context, namespace) {
            return new tQuery.prototype.init(selector, context, namespace || (this && this.namespace));
        };
        _.merge(tQuery, jQuery);
        tQuery.jQuery = jQuery;
        tQuery.event = (jQuery).event;
        tQuery.fn = tQuery.prototype = extend({
        }, jQuery.fn);
        tQuery.fn.constructor = tQuery;
        tQuery.fn.init = function init(selector, context, namespace) {
            var ioDom = context instanceof tQuery;
            if(context && context instanceof jQuery && !(ioDom)) {
                context = tQuery(context);
            }
            var result = jQuery.fn.init.call(this, selector, context, tQueryRoot);
            if(namespace) {
                result.namespace = namespace;
            } else {
                if(ioDom) {
                    result.namespace = context.namespace;
                }
            }
            return result;
        };
        tQuery.fn.init.prototype = tQuery.fn;
        var tQueryRoot = tQuery(document);
        each(jQueryFnMethodBlackList, function (x) {
            if(tQuery.fn[x]) {
                tQuery.fn[x] = null;
                delete tQuery.fn[x];
            }
        });
        _.each([
            'on', 
            'one', 
            'off'
        ], function (x) {
            tQuery.fn[x] = _.wrap(tQuery.fn[x], function (f) {
                var args = [];
                for (var _i = 0; _i < (arguments.length - 1); _i++) {
                    args[_i] = arguments[_i + 1];
                }
                false && log.debug(format('tQuery[{0}]: Binding ' + x + ' events...', this.namespace));
                args[0] = normalizeEvents(args[0], this.namespace);
                return f.apply(this, args);
            });
        });
        tQuery.fn.query = tQuery.fn.$ = tQuery.fn.find;
        return tQuery;
    }
    exports.tQuery = subJQuery();
})
//@ sourceMappingURL=subjquery.js.map
;
define('thrust/spa/convention/spalink',["require", "exports", 'thrust/convention', 'thrust/util', 'thrust/dom/subjquery'], function(require, exports, __c__, __util__, __subjquery__) {
    
    var c = __c__;

    var Convention = c.Convention;
    var util = __util__;

    var _ = util._;
    var subjquery = __subjquery__;

    var $ = subjquery.tQuery;
    var parseFullHref = function (href) {
        var baseUrl = location.pathname.substring(0, location.pathname.lastIndexOf('/'));
        if(href.indexOf('/') != -1) {
            href = href.substring(href.lastIndexOf('/'));
        } else {
            href = '/' + href;
        }
        return baseUrl + href;
    };
    var methods = {
        orbit: function (thrust) {
            var config = thrust.config, spa = thrust.spa;
            $.on('click', 'a', function (e) {
                var link = parseFullHref(this.getAttribute('href'));
                if(link.indexOf(config.url.path) === 0) {
                    spa.navigate(link);
                    e.preventDefault();
                    e.stopImmediatePropagation();
                    return false;
                }
            });
        }
    };
    exports.spalink = new Convention(methods);
})
//@ sourceMappingURL=spalink.js.map
;
define('thrust/spa/convention/start',["require", "exports", 'thrust/convention', 'thrust/util'], function(require, exports, __c__, __util__) {
    
    var c = __c__;

    var Convention = c.Convention;
    var util = __util__;

    var _ = util._;
    var methods = {
        orbit: function (thrust) {
            var router = thrust.spa;
            router.start();
            return thrust.spa.startingModulePromise || null;
        }
    };
    exports.start = new Convention(methods);
})
//@ sourceMappingURL=start.js.map
;