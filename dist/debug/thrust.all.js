/*! thrust-js - v0.1.5 - 2013-01-26 */
define('thrust/util/when',["require", "exports", 'when', 'when/apply', 'when/delay', 'when/timeout', 'when/parallel', 'when/pipeline', 'when/sequence', 'when/cancelable'], function(require, exports, __w__, __whenApply__, __whenDelay__, __whenTimeout__, __whenParallel__, __whenPipeline__, __whenSequence__, __whenCancelable__) {
    
    
    
    var w = __w__;

    var whenApply = __whenApply__;

    var whenDelay = __whenDelay__;

    var whenTimeout = __whenTimeout__;

    var whenParallel = __whenParallel__;

    var whenPipeline = __whenPipeline__;

    var whenSequence = __whenSequence__;

    var whenCancelable = __whenCancelable__;

    exports.when = w;
    exports.apply = whenApply;
    exports.delay = whenDelay;
    exports.timeout = whenTimeout;
    exports.parallel = whenParallel;
    exports.pipeline = whenPipeline;
    exports.sequence = whenSequence;
    exports.cancelable = whenCancelable;
    exports.all = exports.when.all;
    exports.any = exports.when.any;
    exports.chain = exports.when.chain;
    exports.defer = exports.when.defer;
    exports.isPromise = exports.when.isPromise;
    exports.map = exports.when.map;
    exports.reduce = exports.when.reduce;
    exports.some = exports.when.some;
    exports.resolve = exports.when.resolve;
    exports.reject = exports.when.reject;
    exports.join = exports.when.join;
})
//@ sourceMappingURL=when.js.map
;
define('thrust/util/function',["require", "exports", 'lodash', './when'], function(require, exports, _____, __when__) {
    
    var _ = _____;

    var when = __when__;

    var slice = Array.prototype.slice;
    function noop() {
    }
    exports.noop = noop;
    var propertyIsEnumerable = noop.propertyIsEnumerable;
    function safeInvoke(collection, methodName) {
        var args = [];
        for (var _i = 0; _i < (arguments.length - 2); _i++) {
            args[_i] = arguments[_i + 2];
        }
        var index, iteratee = collection, result;
        if(!collection) {
            return [];
        }
        var args = slice.call(arguments, 2), isFunc = typeof methodName == 'function', methodExists;
        var length = iteratee.length;
        index = -1;
        if(length === length >>> 0) {
            result = Array(length);
            while(++index < length) {
                methodExists = (isFunc ? methodName : iteratee[index][methodName]);
                methodExists && methodExists !== noop && (result[index] = methodExists.apply(iteratee[index], args));
            }
        } else {
            var skipProto = typeof iteratee == 'function' && propertyIsEnumerable.call(iteratee, 'prototype');
            var props = _.keys(iteratee), propIndex = -1, length = props.length;
            result = Array(length);
            while(++propIndex < length) {
                index = props[propIndex];
                if(!(skipProto && index == 'prototype')) {
                    methodExists = (isFunc ? methodName : iteratee[index][methodName]);
                    methodExists && methodExists !== noop && (result[propIndex] = ((isFunc ? methodName : iteratee[index][methodName]).apply(iteratee[index], args)));
                }
            }
        }
        return result;
    }
    exports.safeInvoke = safeInvoke;
    function DynamiclyCreated(ctor, args) {
        return ctor.apply(this, args);
    }
    function instantiate(ctor, args, name) {
        DynamiclyCreated.prototype = ctor.prototype;
        DynamiclyCreated.prototype.constructor = ctor;
        var begotten = new DynamiclyCreated(ctor, args);
        DynamiclyCreated.prototype = void 0;
        return begotten;
    }
    exports.instantiate = instantiate;
    function flattenToPromises(array) {
        return _.flatten(array).filter(function (x) {
            return when.isPromise(x);
        });
    }
    exports.flattenToPromises = flattenToPromises;
})
//@ sourceMappingURL=function.js.map
;
define('thrust/util/object',["require", "exports"], function(require, exports) {
    
    
    var hasOwn = Object.prototype.hasOwnProperty;
    function invert(obj) {
        var result = {
        };
        for(var i in obj) {
            if(hasOwn.call(obj, i)) {
                result[obj[i]] = i;
            }
        }
        return result;
    }
    exports.invert = invert;
})
//@ sourceMappingURL=object.js.map
;
define('thrust/util/lib/type',["require", "exports", 'lodash'], function(require, exports, _____) {
    
    var _ = _____;

    var toString = Object.prototype.toString, class2type = {
    };
    var _type = function (obj) {
        return obj == null ? String(obj) : class2type[toString.call(obj)] || "object";
    };
    _.each("Boolean Number String Function Array Date RegExp Object".split(" "), function (name) {
        class2type["[object " + name + "]"] = name.toLowerCase();
    });
    exports.type = _type;
})
//@ sourceMappingURL=type.js.map
;
define('thrust/util/type',["require", "exports", 'lodash', './lib/type'], function(require, exports, _____, __libType__) {
    
    var _ = _____;

    var libType = __libType__;

    exports.type = libType.type;
    function isArrayLike(o) {
        return (o && !_.isString(o) && o.length !== undefined) || false;
    }
    exports.isArrayLike = isArrayLike;
    function isArrayOrArrayLike(o) {
        return _.isArray(o) || (isArrayLike(o));
    }
    exports.isArrayOrArrayLike = isArrayOrArrayLike;
})
//@ sourceMappingURL=type.js.map
;
define('thrust/util/guid',["require", "exports", 'lodash'], function(require, exports, _____) {
    
    var _ = _____;

    
    var S4 = function () {
return (((1 + Math.random()) * 65536) | 0).toString(16).substring(1);    }, guidRegex = /^(\{{0,1}([0-9a-fA-F]){8}-([0-9a-fA-F]){4}-([0-9a-fA-F]){4}-([0-9a-fA-F]){4}-([0-9a-fA-F]){12}\}{0,1})$/, emtptyGuid = '00000000-0000-0000-0000-000000000000';
    function newGuid() {
        return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
    }
    exports.newGuid = newGuid;
    function emptyGuid() {
        return emtptyGuid;
    }
    exports.emptyGuid = emptyGuid;
    function isGuid(guid) {
        return _.isString(guid) ? guidRegex.test(guid) : false;
    }
    exports.isGuid = isGuid;
    function isEmptyGuid(guid) {
        return guid === emtptyGuid;
    }
    exports.isEmptyGuid = isEmptyGuid;
})
//@ sourceMappingURL=guid.js.map
;
define('thrust/util/lib/param',["require", "exports", 'lodash', '../type', 'module'], function(require, exports, _____, __uType__, __m__) {
    
    var _ = _____;

    var uType = __uType__;

    var m = __m__;

    var r20 = /%20/g, rbracket = /\[\]$/;
    function param(a, traditional) {
        var prefix, s = [], add = function (key, value) {
value = _.isFunction(value) ? value() : (value == null ? "" : value);s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value);        };
        if(traditional === undefined) {
            traditional = !!m.config().traditionalEncoding;
        }
        if(uType.isArrayOrArrayLike(a)) {
            _.each(a, function (x) {
                add(x.name, x.value);
            });
        } else {
            for(prefix in a) {
                buildParams(prefix, a[prefix], traditional, add);
            }
        }
        return s.join("&").replace(r20, "+");
    }
    exports.param = param;
    function buildParams(prefix, obj, traditional, add) {
        if(_.isArray(obj)) {
            _.each(obj, function (i, v) {
                if(traditional || rbracket.test(prefix)) {
                    add(prefix, v);
                } else {
                    buildParams(prefix + "[" + (typeof v === "object" || _.isArray(v) ? i : "") + "]", v, traditional, add);
                }
            });
        } else {
            if(!traditional && obj != null && typeof obj === "object") {
                for(var name in obj) {
                    buildParams(prefix + "[" + name + "]", obj[name], traditional, add);
                }
            } else {
                add(prefix, obj);
            }
        }
    }
})
//@ sourceMappingURL=param.js.map
;
define('thrust/util/url',["require", "exports", './lib/param'], function(require, exports, __libParam__) {
    
    
    var libParam = __libParam__;

    
    
    var doubleSlashRegex = /\/\//g;
    exports.param = libParam;
    function cleanUrl(url) {
        return url.replace(doubleSlashRegex, '/');
    }
    exports.cleanUrl = cleanUrl;
    function fixupUrl(url, urlPath) {
        if(url.indexOf('http') === -1) {
            var path = urlPath.lastIndexOf('/') === urlPath.length - 1 ? urlPath.substring(0, -1) : urlPath;
            if(url.indexOf(path) === -1) {
                url = path + url;
            }
            url = cleanUrl(url);
        }
        return url;
    }
    exports.fixupUrl = fixupUrl;
})
//@ sourceMappingURL=url.js.map
;
define('thrust/util/string',["require", "exports"], function(require, exports) {
    
    
    var objectCurlyRegex = /\{\{|\}\}|\{(.*?)\}/g, numberCurlyRegex = /\{\{|\}\}|\{(\d+)\}/g, slice = Array.prototype.slice;
    function format(str) {
        var formatArgs = [];
        for (var _i = 0; _i < (arguments.length - 1); _i++) {
            formatArgs[_i] = arguments[_i + 1];
        }
        if(typeof formatArgs[0] === 'object') {
            var a = formatArgs[0];
            return str.replace(objectCurlyRegex, function (m, n) {
                if(m == '{{') {
                    return '{';
                }
                if(m == '}}') {
                    return '}';
                }
                return a && a[n] || '';
            });
        }
        return str.replace(numberCurlyRegex, function (m, n) {
            if(m == '{{') {
                return '{';
            }
            if(m == '}}') {
                return '}';
            }
            return formatArgs[n] || '';
        });
    }
    exports.format = format;
    function getModuleNameForPath(name) {
        return (name.lastIndexOf('/') > -1 ? name.substring(name.lastIndexOf('/') + 1) : name).replace(/\./g, '-');
    }
    exports.getModuleNameForPath = getModuleNameForPath;
})
//@ sourceMappingURL=string.js.map
;
define('thrust/util/lib/camelcase',["require", "exports"], function(require, exports) {
    
    var rmsPrefix = /^-ms-/, rdashAlpha = /-([\da-z])/gi, fcamelCase = function (all, letter) {
return (letter + "").toUpperCase();    };
    function camelCase(string) {
        return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase);
    }
    exports.camelCase = camelCase;
    function unCamelCase(str) {
        return str.replace(/([A-Z])/g, function (all, s) {
            return '-' + s.toLowerCase();
        });
    }
    exports.unCamelCase = unCamelCase;
})
//@ sourceMappingURL=camelcase.js.map
;
define('thrust/util/main',["require", "exports", 'lodash', './function', './object', './type', './guid', './url', './string', './when', './lib/camelcase'], function(require, exports, ______, __uFunction__, __uObject__, __uType__, __uGuid__, __uUrl__, __uString__, __uWhen__, __uLibCamelCase__) {
    var __ = ______;

    var uFunction = __uFunction__;

    var uObject = __uObject__;

    var uType = __uType__;

    var uGuid = __uGuid__;

    var uUrl = __uUrl__;

    var uString = __uString__;

    var uWhen = __uWhen__;

    var uLibCamelCase = __uLibCamelCase__;

    
    exports._ = __;
    exports.instantiate = uFunction.instantiate;
    exports.noop = uFunction.noop;
    exports.safeInvoke = uFunction.safeInvoke;
    exports.invert = uObject.invert;
    exports.type = uType.type;
    exports.isArrayLike = uType.isArrayLike;
    exports.isArrayOrArrayLike = uType.isArrayOrArrayLike;
    exports.emptyGuid = uGuid.emptyGuid;
    exports.isGuid = uGuid.isGuid;
    exports.isEmptyGuid = uGuid.isEmptyGuid;
    exports.newGuid = uGuid.newGuid;
    exports.getModuleNameForPath = uString.getModuleNameForPath;
    exports.format = uString.format;
    exports.param = uUrl.param;
    exports.cleanUrl = uUrl.cleanUrl;
    exports.fixupUrl = uUrl.fixupUrl;
    exports.when = uWhen;
    exports.flattenToPromises = uFunction.flattenToPromises;
    exports.camelCase = uLibCamelCase.camelCase;
    exports.unCamelCase = uLibCamelCase.unCamelCase;
})
//@ sourceMappingURL=main.js.map
;
define('thrust/util', ['thrust/util/main'], function (main) { return main; });

define('thrust/capsule',["require", "exports", 'thrust/util', './log', 'has'], function(require, exports, __util__, __log__, __has__) {
    
    var util = __util__;

    var _ = util._;
    var log = __log__;

    var has = __has__;

    var type = util.type, format = util.format, each = _.each, isObject = _.isObject, extend = _.extend, when = util.when, flatten = _.flatten, pluck = _.pluck, flattenToPromises = util.flattenToPromises, thrustCache = {
    }, __optionalMethods = [
'start', 
'stop', 
'ready', 
'config', 
    ], __requiredMethods = [
'init', 
'destroy', 
    ];
    function moveToThrustCache(from, to, list) {
        for(var i = 0, iLen = list.length; i < iLen; i++) {
            to[list[i]] = from[list[i]];
            delete from[list[i]];
        }
    }
    function getEventNamespace(name, prefix) {
        if(!prefix) {
            prefix = 'module-';
        }
        return '.' + (name === 'global' ? 'global' : prefix + name.replace(/\./g, '-'));
    }
    function callFacadeMethods(method, moduleCache) {
        var m = moduleCache.module;
        var results = [];
        _.forOwn(moduleCache.facades, function (facade, i) {
            true && log.debug(format('thrust/capsule: Calling facade "{0}" {1}()', i, method));
            if(facade[method] && isObject(facade)) {
                results.push(facade[method].call(facade, m));
            }
        });
        results.push(util.safeInvoke((m.thrust).__thrustConventions, method, m, moduleCache.facades));
        return results;
    }
    var Module = (function () {
        function Module(thrust, def, name) {
            name = this.name = (name || def.name);
            if(typeof def === 'function') {
                def = def(name);
                def.name = name;
            }
            var mid = this.mid = thrust.name + ':' + name;
            var tCache = thrustCache[def.hash || mid];
            if(tCache) {
                _.keys(tCache).filter(function (x) {
                    return x.indexOf('config.') === 0;
                }).forEach(function (x) {
                    return delete tCache[x];
                });
            }
            this.instance = extend(def, tCache && tCache.instance || {
            });
            this.instance.name = (this.instance.name || name);
            this.instance.mid = mid;
            if(!this.instance.name) {
                throw new Error('All Modules must have a name!');
            }
            for(var i = 0, iLen = __requiredMethods.length; i < iLen; i++) {
                if(!def[__requiredMethods[i]]) {
                    throw new Error(format('Required "{0}" method not found on module "{1}"!', __requiredMethods[i], name));
                }
            }
            if(typeof def.name === 'undefined') {
                def.name = name;
            }
            var thrustModuleCacheItem = thrustCache[mid] = extend(tCache || {
            }, {
                _started: false,
                name: util.getModuleNameForPath(name),
                module: this
            });
            delete thrustCache[def.hash];
            var facades = thrustModuleCacheItem.facades || (thrustModuleCacheItem.facades = {
            });
            if(!thrust.__conventionPluckPropertiesCache) {
                thrust.__conventionPluckPropertiesCache = flatten(pluck(thrust.__conventions || [], 'properties')).filter(function (x) {
                    return x.indexOf('config.') !== 0;
                });
            }
            moveToThrustCache(this.instance, thrustModuleCacheItem, __requiredMethods);
            moveToThrustCache(this.instance, thrustModuleCacheItem, __optionalMethods);
            moveToThrustCache(this.instance, thrustModuleCacheItem, thrust.__conventionPluckPropertiesCache);
            util.safeInvoke(thrust, 'createFacade', thrust, this.instance, facades);
            this.__namespace = getEventNamespace(this.instance.name);
            this.thrust = thrust;
            this.cache = thrustCache[mid];
        }
        Module.thrustCache = thrustCache;
        Module.prototype.convention = function (property, value) {
            var tc = this.cache;
            if(property.indexOf('config.') === 0) {
                if(typeof tc[property] === 'undefined') {
                    tc[property] = this.getValueFromPath(property, tc) || false;
                }
            }
            if(typeof value !== 'undefined') {
                tc[property] = value;
                return;
            }
            return tc[property];
        };
        Module.prototype.getValueFromPath = function (path, object) {
            var paths = path.split('.'), v = object;
            _.each(paths, function (p) {
                v = v && v[p];
                if(!v) {
                    return false;
                }
            });
            return v;
        };
        Module.prototype.thrustCreate = function (thrust) {
            thrust.__injectModule(this);
        };
        Module.prototype.thrustCall = function (method, facadeAfter, args) {
            var seq = [], that = this;
            true && log.debug(format('thrust/capsule: Calling facades for "{0}"', that.name));
            var cache = this.cache, m = cache[method];
            seq.push(function () {
                var result = callFacadeMethods(method, cache);
                if(result && result.length) {
                    return when.all(flattenToPromises(result));
                }
            });
            if(m) {
                seq.push(function () {
                    var result = m.apply(that.instance, args);
                    if(result && result.length) {
                        return when.all(flattenToPromises(result));
                    }
                });
            }
            if(facadeAfter) {
                seq.push(seq.shift());
            }
            return when.sequence(seq);
        };
        Module.prototype.start = function () {
            var that = this;
            return that.thrust.start(that.name);
        };
        Module.prototype.stop = function () {
            var that = this;
            return that.thrust.stop(that.name);
        };
        return Module;
    })();
    exports.Module = Module;    
    function load(name, parentRequire, load, config) {
        var parts = name.split(':'), instanceName = parts[0], moduleName = parts[1];
        require([
            'thrust!' + instanceName
        ], function (thrust) {
            var module = thrust.modules[moduleName];
            if(!module) {
                throw new Error(format('Module "{0}" does not exist on thrust instance "{1}".', moduleName, instanceName));
            }
            load(module);
        });
    }
    exports.load = load;
})
//@ sourceMappingURL=capsule.js.map
;
define('thrust/instance',["require", "exports", 'thrust/util', 'thrust/capsule'], function(require, exports, __util__, __capsule__) {
    var util = __util__;

    var when = util.when;
    var capsule = __capsule__;

    exports.instances = {
    };
    exports.loadingInstances = {
    };
    function getInstance(name) {
        return exports.instances[name] || null;
    }
    exports.getInstance = getInstance;
    function fetchInstance(name) {
        var defer = exports.loadingInstances[name] || (exports.loadingInstances[name] = when.defer());
        return defer;
    }
    exports.fetchInstance = fetchInstance;
    function clearCache() {
        util._.each(util._.keys(exports.instances), function (x) {
            exports.instances[x] = null;
            delete exports.instances[x];
        });
        util._.each(util._.keys(exports.loadingInstances), function (x) {
            exports.loadingInstances[x] = null;
            delete exports.loadingInstances[x];
        });
        util._.each(util._.keys(capsule.Module.thrustCache), function (x) {
            capsule.Module.thrustCache[x] = null;
            delete capsule.Module.thrustCache[x];
        });
    }
    exports.clearCache = clearCache;
})
//@ sourceMappingURL=instance.js.map
;
define('thrust/config',["require", "exports", './instance'], function(require, exports, __thrustInstance__) {
    
    var thrustInstance = __thrustInstance__;

    exports.throwErrors = true;
    exports.async = true;
    exports.exposeGlobals = true;
    exports.url = {
        path: '/',
        traditionalEncoding: true
    };
    exports.log = {
        level: 4,
        enabled: true
    };
    exports.plugins = [];
    exports.modules = [];
    exports.childInstance = false;
    exports.automaticLifecycle = true;
    exports.autoStart = false;
    exports.conventions = [
        'thrust/convention/container', 
        'thrust/convention/autostart', 
        'thrust/convention/dependent.modules'
    ];
    function load(name, parentRequire, load, config) {
        var parts = name.split(':'), realName = parts[0], pluginName = parts[1] || false;
        var instanceDeferred = thrustInstance.fetchInstance(realName);
        instanceDeferred.promise.then(function (context) {
            var plugin = pluginName && context.cfg[pluginName] || context.config;
            if(!plugin) {
                throw new Error('Plugin "' + pluginName + '" does not exist on thrust instance "' + realName + '".');
            }
            load(plugin);
        });
    }
    exports.load = load;
})
//@ sourceMappingURL=config.js.map
;
define('thrust/log',["require", "exports", './config', 'thrust/util'], function(require, exports, __tConfig__, __util__) {
    var tConfig = __tConfig__;

    var util = __util__;

    
    var LEVEL = {
        DEBUG: 4,
        INFO: 3,
        WARN: 2,
        ERROR: 1
    };
    var console = window.console, timers = {
    }, cLog = (console && console.log) || false, cWarn = (console && console.warn) || false, cInfo = (console && console.info) || false, cError = (console && console.error) || false, cTime = (console && console['time']) || false, cTimeEnd = (console && console['timeEnd']) || false, slice = Array.prototype.slice, configLevel = tConfig.log.level || LEVEL.ERROR, logLevel = LEVEL[configLevel] || (typeof configLevel === 'string' && LEVEL[configLevel.toUpperCase()]) || (typeof configLevel === 'number' && configLevel) || LEVEL.ERROR;
    var logRunner = function (consoleMethod, logType) {
        var args = slice.call(arguments, 1);
        if(consoleMethod) {
            if(consoleMethod.apply) {
                consoleMethod.apply(console, args);
            } else {
                consoleMethod(args);
            }
        } else {
            if(!consoleMethod && cLog) {
                if(cLog.apply) {
                    cLog.apply(console, args);
                } else {
                    cLog(args);
                }
            }
        }
    };
    function debug() {
        var args = [];
        for (var _i = 0; _i < (arguments.length - 0); _i++) {
            args[_i] = arguments[_i + 0];
        }
        if(!tConfig.log.enabled) {
            return;
        }
        if(logLevel >= LEVEL.DEBUG) {
            var args = slice.call(arguments);
            args.unshift(cLog);
            logRunner.apply(this, args, 'log');
        }
    }
    exports.debug = debug;
    function info() {
        var args = [];
        for (var _i = 0; _i < (arguments.length - 0); _i++) {
            args[_i] = arguments[_i + 0];
        }
        if(!tConfig.log.enabled) {
            return;
        }
        if(logLevel >= LEVEL.INFO) {
            var args = slice.call(arguments);
            args.unshift(cInfo);
            logRunner.apply(this, args, 'info');
        }
    }
    exports.info = info;
    function warn() {
        var args = [];
        for (var _i = 0; _i < (arguments.length - 0); _i++) {
            args[_i] = arguments[_i + 0];
        }
        if(!tConfig.log.enabled) {
            return;
        }
        if(logLevel >= LEVEL.WARN) {
            var args = slice.call(arguments);
            args.unshift(cWarn);
            logRunner.apply(this, args, 'warn');
        }
    }
    exports.warn = warn;
    function error() {
        var args = [];
        for (var _i = 0; _i < (arguments.length - 0); _i++) {
            args[_i] = arguments[_i + 0];
        }
        if(!tConfig.log.enabled) {
            return;
        }
        if(logLevel >= LEVEL.ERROR) {
            var args = slice.call(arguments);
            args.unshift(cError);
            logRunner.apply(this, args, 'error');
        }
    }
    exports.error = error;
    function time(message) {
        var args = [];
        for (var _i = 0; _i < (arguments.length - 1); _i++) {
            args[_i] = arguments[_i + 1];
        }
        if(!tConfig.log.enabled) {
            return;
        }
        if(logLevel >= LEVEL.DEBUG) {
            timers[message] = {
                start: new Date().getTime()
            };
            var msg = util.format('{0}: timer started', message), args = slice.call(arguments, 1);
            args.unshift(msg);
            args.unshift(cTime);
            logRunner.apply(this, args);
        }
    }
    exports.time = time;
    function timeEnd(message) {
        var args = [];
        for (var _i = 0; _i < (arguments.length - 1); _i++) {
            args[_i] = arguments[_i + 1];
        }
        if(!tConfig.log.enabled) {
            return;
        }
        if(logLevel >= LEVEL.DEBUG) {
            timers[message].end = (new Date()).getTime();
            var time = timers[message].end - timers[message].start, msg = util.format('{0}: {1}ms', message, time);
            var args = slice.call(arguments, 1);
            args.unshift(msg);
            args.unshift(cTimeEnd);
            logRunner.apply(this, args);
        }
    }
    exports.timeEnd = timeEnd;
})
//@ sourceMappingURL=log.js.map
;
define('thrust/ignite',["require", "exports", 'module', 'thrust/util', './config', './capsule', './instance'], function(require, exports, __requireModule__, __util__, __config__, __tm__, __instance__) {
    
    var requireModule = __requireModule__;

    var util = __util__;

    var _ = util._;
    
    var config = __config__;

    var tm = __tm__;

    var instance = __instance__;

    var slice = Array.prototype.slice, isArray = _.isArray, toArray = _.toArray, isFunction = _.isFunction, each = _.each, map = _.map, any = _.any, all = _.all, when = util.when, extend = _.extend, flatten = _.flatten, pluck = _.pluck, isObject = _.isObject, keys = _.keys, union = _.union;
    function mergeSettings(settings) {
        if((settings).__settingsMerged) {
            return settings;
        }
        var requireConfig = requireModule.config(), plugins = [
'thrust/mediator'        ].concat(settings.plugins || requireConfig.plugins || config.plugins || []), conventions = [].concat(settings.conventions || requireModule.config().conventions || config.plugins || []);
        settings = _.merge({
        }, config, requireModule.config(), settings, {
            __settingsMerged: true,
            plugins: plugins,
            conventions: conventions
        });
        settings.plugins = plugins;
        settings.conventions = conventions;
        return settings;
    }
    exports.mergeSettings = mergeSettings;
    function fuse(settings) {
        var pipe = [];
        settings = mergeSettings(settings);
        if(!instance.instances[settings.name]) {
            pipe.push(stageOne);
        }
        pipe.push(stageTwo);
        if(settings.modules && settings.modules.length) {
            pipe.push(stageThree);
        }
        var promise = when.pipeline(pipe, settings);
        return promise;
    }
    exports.fuse = fuse;
    function stageOne(settings) {
        var plugins = settings.plugins, requireConfig = requireModule.config(), defer = when.defer();
        settings.plugins = plugins;
        require(plugins.map(function (x) {
            return x;
        }), function () {
            var args = arguments;
            plugins.forEach(function (plugin, i) {
                var name = plugin.substring(plugin.lastIndexOf('/') + 1), pluginSettings = settings[name] || {
                }, pluginRequireConfig = requireConfig[name] || {
                }, pluginClass = args[i][args[i].className];
                if(!config[name]) {
                    config[name] = _.merge(pluginClass.config, pluginRequireConfig || {
                    });
                }
                var conventions = [].concat(pluginSettings.conventions || pluginRequireConfig.conventions || config[name].conventions || []);
                settings[name] = _.merge({
                }, config[name], pluginSettings || {
                }, {
                    conventions: conventions
                });
                settings[name].conventions = conventions;
            });
            defer.resolve(settings);
        }, defer.reject);
        return defer.promise;
    }
    exports.stageOne = stageOne;
    function stageTwo(settings) {
        var localConfig = settings, defer = when.defer();
        var plugins = localConfig.plugins, modulesToLoad = [], thrustConventions = settings.conventions || [], modulesConfigurations = {
thrust: 'thrust'        };
        for(var i = 0, iLen = plugins.length; i < iLen; i++) {
            var plugin = plugins[i], name = plugin.substring(plugin.lastIndexOf('/') + 1), pluginConfig = localConfig[name];
            modulesToLoad.push(plugin);
            modulesToLoad.push(pluginConfig && pluginConfig.conventions || []);
            modulesConfigurations[plugin] = pluginConfig;
        }
        var orderedPlugins = [
'name', 
'cfg'        ], reloop = true, iLen = modulesToLoad.length, i = 0;
        while(i < iLen) {
            var plugin = modulesToLoad[i], name = plugin.substring(plugin.lastIndexOf('/') + 1), pluginConfig = localConfig[name];
            if(pluginConfig && pluginConfig.resolve && pluginConfig.resolve.length > 0 && !all(pluginConfig.resolve, function (x) {
                return any(orderedPlugins, function (z) {
                    return x === z || x === z;
                });
            })) {
                modulesToLoad.push.apply(modulesToLoad, modulesToLoad.splice(i, 2));
            } else {
                i += 2;
                orderedPlugins.push(name);
            }
        }
        var modules = localConfig.modules || [];
        modulesToLoad.push.apply(modulesToLoad, [
            'thrust', 
            settings.conventions || []
        ]);
        modulesToLoad = flatten(modulesToLoad);
        var spec = {
            name: localConfig.name || 'global',
            cfg: localConfig
        };
        require(modulesToLoad, function () {
            var args = [];
            for (var _i = 0; _i < (arguments.length - 0); _i++) {
                args[_i] = arguments[_i + 0];
            }
            var currentPlugin = null, allConventions = [];
            for(var i = 0, iLen = modulesToLoad.length; i < iLen - thrustConventions.length; i++) {
                var plugin = modulesToLoad[i], mConfig = modulesConfigurations[plugin];
                if(mConfig) {
                    var pluginObject = args[i], name = plugin.substring(plugin.lastIndexOf('/') + 1), resolveItems = map(mConfig.resolve, function (x) {
return spec[x];                    });
                    var pluginClass = pluginObject[pluginObject.className];
                    currentPlugin = spec[name] = util.instantiate(pluginClass, resolveItems);
                    currentPlugin.__conventions = [];
                } else {
                    if(currentPlugin) {
                        _.forOwn(args[i], function (x) {
                            return currentPlugin.__conventions.push(x);
                        });
                        _.forOwn(args[i], function (x) {
                            return allConventions.push(x);
                        });
                    }
                }
            }
            currentPlugin.__conventions = allConventions;
            var thrustConventionDefinitions = args.slice(modulesToLoad.length - thrustConventions.length);
            thrustConventionDefinitions = flatten(map(thrustConventionDefinitions, function (x) {
                return map(x, function (z) {
                    return z;
                });
            }));
            currentPlugin.__thrustConventions = thrustConventionDefinitions;
            allConventions.push.apply(allConventions, thrustConventionDefinitions);
            extend(currentPlugin, spec);
            defer.resolve(spec);
        }, defer.reject);
        return defer.promise;
    }
    exports.stageTwo = stageTwo;
    function stageThree(context) {
        var thrust = context.thrust, defer = when.defer(), modules = context.cfg.modules;
        modules = _.filter(modules, function (x) {
            return !thrust.modules[x];
        });
        require(modules, function () {
            var args = [];
            for (var _i = 0; _i < (arguments.length - 0); _i++) {
                args[_i] = arguments[_i + 0];
            }
            var Module = tm.Module;
            var moduleDefinitions = args;
            for(var i = 0, iLen = modules.length; i < iLen; i++) {
                var mod = modules[i], definition = moduleDefinitions[i];
                var moduleInstance = new Module(thrust, definition, mod);
                moduleInstance.thrustCreate(thrust);
            }
            defer.resolve(context);
        }, defer.reject);
        return defer.promise;
    }
    exports.stageThree = stageThree;
})
//@ sourceMappingURL=ignite.js.map
;
define('thrust/main',["require", "exports", 'thrust/util', './log', './instance', './ignite', './capsule', 'domReady', 'has', 'thrust/config'], function(require, exports, __util__, __log__, __thrustInstance__, __igniteSpec__, __m__, __domReady__, __has__, __tConfig__) {
    
    
    var util = __util__;

    var _ = util._;
    var log = __log__;

    var thrustInstance = __thrustInstance__;

    var igniteSpec = __igniteSpec__;

    var m = __m__;

    var Module = m.Module;
    var domReady = __domReady__;

    var has = __has__;

    var tConfig = __tConfig__;

    exports.className = 'Thrust';
    var INIT = 'init', START = 'start', READY = 'ready', STOP = 'stop', DESTROY = 'destroy', COUNTDOWN = 'countdown', IGNITE = 'ignite', ORBIT = 'orbit', DEPLOY = 'deploy', DEORBIT = 'deorbit', SPLASHDOWN = 'splashdown', INORBIT = 'inOrbit', memoize = _.memoize, each = _.each, map = _.map, extend = _.extend, when = util.when, bind = _.bind, isArray = _.isArray, slice = Array.prototype.slice, toArray = _.toArray, merge = _.merge, flatten = _.flatten, format = util.format, resolveMethods = [
INIT, 
START, 
READY, 
STOP, 
DESTROY    ], instances = thrustInstance.instances, loadingInstances = thrustInstance.loadingInstances, safeInvoke = util.safeInvoke;
    var runRunnerFactory = memoize(function (method) {
        var conventionMethod = (method === STOP && START) || (method === DESTROY && INIT) || method, conventionValue = !(method === STOP || method === DESTROY), unsetReady = method === STOP, conventionCheck = conventionMethod !== method, conventionName = format('{0}-status', conventionMethod), runner = runnerFactory(method, conventionName, conventionValue, unsetReady), logMessage = format('Thrust: {0}ing module "{{0}}" failed!', method), runningMessage = format('Thrust: Running {0} for module "{{0}}".', method);
        return function (names) {
            var args = [];
            for (var _i = 0; _i < (arguments.length - 1); _i++) {
                args[_i] = arguments[_i + 1];
            }
            var that = this;
            if(!isArray(names)) {
                names = [
                    names
                ];
            }
            var args, results = [];
            each(names, function (name) {
                true && log.debug(format(runningMessage, name));
                var mod = that.modules[name];
                if(!mod && !that.failedModules[name]) {
                    var loaderDefer = when.defer();
                    require([
                        name
                    ], function (moduleDefn) {
                        that.createModule(moduleDefn && moduleDefn.name || name, moduleDefn);
                        var result = runRunnerFactory(method).apply(that, [
                            moduleDefn.name
                        ].concat(args));
                        when.chain(when.all(flatten(result)), loaderDefer);
                    }, function () {
                        that.failedModules[name] = true;
                        loaderDefer.resolve();
                    });
                    results.push(loaderDefer.promise);
                } else {
                    if((conventionCheck && mod.convention(conventionName)) || !mod.convention(conventionName)) {
                        if(true && tConfig.throwErrors) {
                            results.push(runner(that, name, mod, args));
                        } else {
                            try  {
                                results.push(runner(that, name, mod, args));
                            } catch (e) {
                                true && log.error(format(logMessage, name), e, e.stack);
                            }
                        }
                    }
                }
            });
            return results.length && results;
        }
    });
    var runnerFactory = memoize(function (method, conventionName, conventionValue, unsetReady) {
        var eventName = format('thrust/module/{0}', method), infoFormat = format('Thrust: {0}ing module "{{0}}"', method.charAt(0).toUpperCase() + method.substring(1)), debugFormat = format('Thrust: Calling module "{{0}}" {0}()', method), compAfter = method === STOP || method === DESTROY || false;
        return function (that, name, mod, args) {
            true && log.info(format(infoFormat, name));
            true && log.debug(format(conventionName, name));
            return mod.thrustCall(method, compAfter, __getModuleArgs(that.name, name, args)).then(function () {
                that.mediator && that.mediator.fire(eventName, name);
                mod.convention(conventionName, conventionValue);
                if(unsetReady) {
                    mod.convention(READY + '-status', false);
                }
            });
        }
    });
    var allRunnerFactory = memoize(function (method) {
        var infoFormat = format('Thrust: {0}ing all modules... [{{0}}]', method.charAt(0).toUpperCase() + method.substring(1)), pluralName = format('thrust/module/all/{0}', method), checkAutoStart = method === INIT || method === START || method === READY;
        return function (that) {
            that.mediator && that.mediator.fire(pluralName);
            var modules = that.modules, results = [];
            true && log.info(format(infoFormat, map(modules, function (x, i) {
                return x.convention('autoStart') && i;
            }).join(', ')));
            each(modules, function (x, i) {
                if(!checkAutoStart || (checkAutoStart && x.convention('autoStart'))) {
                    results.push(that[method](i));
                }
            });
            if(that.startingModules && checkAutoStart) {
                true && log.info(format(infoFormat, that.startingModules.join(', ')));
                that[method](that.startingModules);
            }
            return when.all(results);
        }
    });
    function fireThrustEvent(that, event) {
        return function () {
            that.mediator && that.mediator.fire(event);
        }
    }
    function childrenCallMethod(that, method, stopping) {
        var items = [];
        each(that.children, function (child) {
            if(stopping) {
                child.__previousState = child.started;
            }
            if(child.cfg.autoStart || (!stopping && child.__previousState) || (stopping && child.started)) {
                items.push(child[method](false, true));
            }
        });
        if(items.length) {
            return when.all(items);
        }
    }
    function flattenWithAsync(that, arr) {
        return util.flattenToPromises(arr.concat(that.cfg.async && [
            when.delay(0)
        ] || []));
    }
    var thrustLogEvent;
    if(true) {
        thrustLogEvent = function (message, name) {
            return function () {
                log.debug(format.apply(format, [
                    message
                ].concat(toArray(arguments))));
            }
        };
    } else {
        thrustLogEvent = function () {
            return util.noop;
        };
    }
    var thrustShouldExecute = function (that, calledByParent, stopping) {
        if(that.parent && that.cfg.childInstance && !that.parent.started && !calledByParent) {
            log.warn(format('Cannot execute on child instance "{0}" parent instance "{1}" must be started first.', that.name, that.parent.name));
        }
        if(!stopping && that.started || stopping && !that.started) {
            log.warn(format('Cannot start thrust instance "{0}" since it already started', that.name));
        }
        return true;
    };
    function __getModuleArgs(instanceName, name, originalArgs) {
        var args = toArray(originalArgs);
        if(args.length) {
            return args;
        }
        var instanceRegistrations = Thrust.__moduleRegistrations[instanceName];
        if(instanceRegistrations && instanceRegistrations[name]) {
            return instanceRegistrations[name];
        }
        return args;
    }
    var Thrust = (function () {
        function Thrust(name) {
            this.__conventions = [];
            this.__conventionPluckPropertiesCache = null;
            this.__thrustConventions = [];
            this.cfg = merge(tConfig, {
                autoStart: false,
                async: false,
                childInstance: false,
                automaticLifecycle: true
            });
            this.config = merge(tConfig, {
                autoStart: false,
                async: false,
                childInstance: false,
                automaticLifecycle: true
            });
            this.name = name;
            this.modules = {
            };
            this.failedModules = {
            };
            this.children = [];
            this.started = false;
        }
        Thrust.__moduleRegistrations = {
        };
        Thrust.prototype.create = function (name, mod, preBuilt) {
            true && log.debug(format('Thrust: Creating new instance of "{0}"', name));
            var oldModule, that = this;
            if(preBuilt) {
                oldModule = mod;
                mod = mod.instance;
            }
            if(!preBuilt) {
                mod = new m.Module(that, mod, name);
            } else {
                mod = oldModule;
            }
            if(that.modules[mod.name]) {
                throw new Error(format('Duplicate module name "{0}".', name));
            }
            that.modules[mod.name] = mod;
            true && log.info(format('Thrust: Created module "{0}"', name));
            that.mediator.fire('thrust/module/create', name);
            if(that && that.started && mod.convention('autoStart')) {
                that.start(mod.name);
            }
            return mod;
        };
        Thrust.prototype.startup = function (event, eventType) {
            var that = this;
            var promise = when.all(flattenWithAsync(that, [
                safeInvoke(that.__conventions, event, that), 
                that[eventType](), 
                childrenCallMethod(that, event)
            ]));
            when.any([
                promise
            ]).then(fireThrustEvent(that, 'thrust/' + eventType));
            return promise;
        };
        Thrust.prototype._countdown = function (calledByParent) {
            var that = this;
            if(!thrustShouldExecute(that, calledByParent)) {
                return;
            }
            true && thrustLogEvent('Launch instance "{0}" in 5... 4... 3... 2... 1...', that.name);
            var promise = this.startup(COUNTDOWN, INIT);
            true && when.any([
                promise
            ]).then(thrustLogEvent('Thrust instance "{0}" has been initalized.', that.name));
            return promise;
        };
        Thrust.prototype.countdown = function (calledByParent) {
            var that = this;
            if(!thrustShouldExecute(that, calledByParent)) {
                return;
            }
            if(that.cfg.automaticLifecycle && (!that.cfg.childInstance)) {
                return Thrust.launchSequence(that, calledByParent);
            }
            return that._countdown(calledByParent);
        };
        Thrust.prototype.ignite = function (calledByParent) {
            var that = this;
            if(!thrustShouldExecute(that, calledByParent)) {
                return;
            }
            true && thrustLogEvent('Firing rockets for thurst instance "{0}".', that.name);
            var promise = this.startup(IGNITE, START);
            true && when.any([
                promise
            ]).then(thrustLogEvent('Thrust instance "{0}" has been started.', that.name));
            return promise;
        };
        Thrust.prototype.orbit = function (calledByParent) {
            var that = this;
            if(!thrustShouldExecute(that, calledByParent)) {
                return;
            }
            true && thrustLogEvent('Firing stage two thrusters for thrust instance "{0}".', that.name)();
            var domReadyDefer = when.defer();
            domReadyDefer.promise.then(fireThrustEvent(that, 'thrust/dom/ready'));
            domReady(domReadyDefer.resolve);
            var promise = when.all(flattenWithAsync(that, [
                domReadyDefer.promise, 
                safeInvoke(that.__conventions, ORBIT, that), 
                childrenCallMethod(that, ORBIT)
            ]));
            true && when.any([
                promise
            ]).then(thrustLogEvent('Thrust instance "{0}" is almost ready.', that.name));
            return promise;
        };
        Thrust.prototype.deploy = function (calledByParent) {
            var that = this;
            if(!thrustShouldExecute(that, calledByParent)) {
                return;
            }
            if(true) {
                var timeStart = that.config.debug.timeStart, timeEnd = new Date().getTime(), startTime = (timeEnd - timeStart), ttoDiv = document.getElementById('tto');
                if(ttoDiv) {
                    ttoDiv.innerHTML = startTime + 'ms';
                }
            }
            var promise = when.all(flattenWithAsync(that, [
                that.ready(), 
                childrenCallMethod(that, DEPLOY)
            ])).then(fireThrustEvent(that, 'thrust/ready'));
            true && when.any([
                promise
            ]).then(thrustLogEvent('Thrust instance "{0}" is now ready.', that.name));
            return promise;
        };
        Thrust.prototype.inOrbit = function () {
            var that = this;
            that.started = true;
            childrenCallMethod(that, INORBIT);
            if(true) {
                var timeStart = that.config.debug.timeStart, timeEnd = new Date().getTime(), startTime = (timeEnd - timeStart);
                log.info('Started in ' + startTime + 'ms');
                var ttrDiv = document.getElementById('ttr');
                if(ttrDiv) {
                    ttrDiv.innerHTML = startTime + 'ms';
                }
            }
        };
        Thrust.prototype.shutdown = function (event, eventType) {
            var that = this;
            var promise = when.all(flattenWithAsync(that, [
                childrenCallMethod(that, event, true), 
                that[eventType](), 
                safeInvoke(that.__conventions, event, that)
            ]));
            when.any([
                promise
            ]).then(fireThrustEvent(that, 'thrust/' + eventType));
            return promise;
        };
        Thrust.prototype._deorbit = function (calledByParent) {
            var that = this;
            if(!thrustShouldExecute(that, calledByParent, true)) {
                return;
            }
            true && thrustLogEvent('Reentering earths atmosphere for thrust instance "{0}".', that.name);
            var promise = this.shutdown(DEORBIT, STOP);
            true && when.any([
                promise
            ]).then(thrustLogEvent('Thrust instance "{0}" is now stopped.', that.name));
            return promise;
        };
        Thrust.prototype.deorbit = function (calledByParent) {
            var that = this;
            if(!thrustShouldExecute(that, calledByParent, true)) {
                return;
            }
            if(that.cfg.automaticLifecycle && (!that.cfg.childInstance)) {
                return when.sequence([
                    _.bind(that._deorbit, that), 
                    _.bind(that.splashdown, that)
                ], calledByParent);
            }
            return that._deorbit(calledByParent);
        };
        Thrust.prototype.splashdown = function (calledByParent) {
            var that = this;
            if(!thrustShouldExecute(that, calledByParent, true)) {
                return;
            }
            true && thrustLogEvent('Landing in the middle of the atlantic for thrust instance "{0}".', that.name);
            var promise = this.shutdown(SPLASHDOWN, DESTROY);
            true && when.any([
                promise
            ]).then(thrustLogEvent('Thrust instance "{0}" is now being destroyed', that.name));
            promise.then(function () {
                that.started = false;
            });
            return promise;
        };
        Thrust.prototype.moduleMethod = function (method, name, args, reverse, dependentMethods, startedMethods) {
            var that = this, pipe = [];
            if(!name) {
                var result = allRunnerFactory(method)(that);
                if(result) {
                    return result;
                }
            }
            var names = [];
            if(!isArray(name)) {
                names = [
                    name
                ];
            } else {
                names = (name);
            }
            if(dependentMethods && dependentMethods.length) {
                var items = {
                };
                for(var i = 0, iLen = names.length; i < iLen; i++) {
                    var n = names[i], mod = that.modules[n];
                    each(dependentMethods, function (x) {
                        if(!items[x]) {
                            items[x] = [];
                        }
                        if(!reverse && (!mod || !mod.convention(x + '-status')) || (reverse && mod.convention(x + '-status'))) {
                            items[x].push(n);
                        }
                    });
                }
                each(dependentMethods, function (x) {
                    if(items[x] && items[x].length) {
                        pipe.push(function () {
                            return when.all(flatten(that[x].apply(that, [
                                items[x]
                            ].concat(args))));
                        });
                    }
                });
            }
            pipe.push(function () {
                return when.all(flatten(runRunnerFactory(method).apply(that, [
                    names
                ].concat(args))));
            });
            if(that.started && startedMethods && startedMethods.length) {
                each(startedMethods, function (x) {
                    pipe.push(function () {
                        return when.all(flatten(that[x].apply(that, [
                            names
                        ].concat(args))));
                    });
                });
            }
            return when.pipeline(pipe);
        };
        Thrust.prototype.init = function (name) {
            var args = [];
            for (var _i = 0; _i < (arguments.length - 1); _i++) {
                args[_i] = arguments[_i + 1];
            }
            var that = this;
            return that.moduleMethod(INIT, name, args, false);
        };
        Thrust.prototype.start = function (name) {
            var args = [];
            for (var _i = 0; _i < (arguments.length - 1); _i++) {
                args[_i] = arguments[_i + 1];
            }
            var that = this;
            return that.moduleMethod(START, name, args, false, [
                INIT
            ], [
                READY
            ]);
        };
        Thrust.prototype.ready = function (name) {
            var args = [];
            for (var _i = 0; _i < (arguments.length - 1); _i++) {
                args[_i] = arguments[_i + 1];
            }
            var that = this;
            return that.moduleMethod(READY, name, args, false, [
                INIT, 
                START
            ]);
        };
        Thrust.prototype.stop = function (name) {
            var args = [];
            for (var _i = 0; _i < (arguments.length - 1); _i++) {
                args[_i] = arguments[_i + 1];
            }
            var that = this;
            return that.moduleMethod(STOP, name, args, true);
        };
        Thrust.prototype.destroy = function (name) {
            var args = [];
            for (var _i = 0; _i < (arguments.length - 1); _i++) {
                args[_i] = arguments[_i + 1];
            }
            var that = this, method = DESTROY;
            return that.moduleMethod(DESTROY, name, args, true, [
                STOP
            ]);
        };
        Thrust.prototype.__injectModule = function (module) {
            this.create(module.name, module, true);
        };
        Thrust.prototype.createModule = function (name, moduleDefn) {
            var that = this;
            if(that.modules[name]) {
                return that.modules[name];
            }
            var module = new Module(that, moduleDefn, name);
            that.__injectModule(module);
            return module;
        };
        Thrust.prototype.spawn = function (settings) {
            var that = this;
            return Thrust.launch(extend({
            }, {
                childInstance: true
            }, settings), true).then(function (context) {
                var thrust = context.thrust;
                that.children.push(thrust);
                thrust.parent = that;
                return context;
            });
        };
        Thrust.prototype.registerModule = function (name) {
            var that = this;
            Thrust.registerModule.apply(Thrust, [
                that.name
            ].concat(toArray(arguments)));
        };
        Thrust.launchSequence = function launchSequence(instance, calledByParent) {
            return when.sequence([
                _.bind(instance._countdown, instance), 
                _.bind(instance.ignite, instance), 
                _.bind(instance.orbit, instance), 
                _.bind(instance.deploy, instance), 
                _.bind(instance.inOrbit, instance)
            ], calledByParent);
        }
        Thrust.launch = function launch(settings, calledByParent) {
            if(!settings) {
                settings = {
                    name: 'global'
                };
            }
            if(!settings.name) {
                settings.name = 'global';
            }
            if(true) {
                settings.debug = {
                    timeStart: new Date().getTime()
                };
            }
            settings = igniteSpec.mergeSettings(settings);
            var pipe = [
                igniteSpec.fuse
            ];
            var setupDefer = Thrust.__fetchInstance(settings.name);
            pipe.push(function (context) {
                var thrust = context.thrust, modules = thrust.startingModules = context.cfg.modules, config = thrust.config = thrust.cfg;
                instances[thrust.name] = thrust;
                return context;
            });
            if(settings.automaticLifecycle) {
                pipe.push(function (context) {
                    var thrust = context.thrust, d = when.defer();
                    Thrust.launchSequence(thrust, calledByParent).then(function () {
                        return d.resolve(context);
                    });
                    return d.promise;
                });
            }
            var pipeline = when.pipeline(pipe, settings).then(function (context) {
                return setupDefer.resolve(context);
            });
            if(tConfig.exposeGlobals) {
                if(!window['Thrust']) {
                    window['Thrust'] = Thrust;
                }
                pipeline.then(function (context) {
                    window[settings.name] = context;
                });
            }
            return pipeline;
        }
        Thrust.getInstance = function getInstance(name) {
            return thrustInstance.getInstance(name);
        }
        Thrust.__fetchInstance = function __fetchInstance(name) {
            return thrustInstance.fetchInstance(name);
        }
        Thrust.createModule = function createModule(instanceName, name, moduleDefn) {
            var instance = Thrust.getInstance(instanceName);
            if(instance) {
                var module = new Module(instance, moduleDefn, name);
                instance.__injectModule(module);
                return module;
            }
        }
        Thrust.registerModule = function registerModule(instanceName, name) {
            if(!instanceName) {
                throw new Error('instanceName is required!');
            }
            if(!name) {
                throw new Error('name is required!');
            }
            if(!Thrust.__moduleRegistrations[instanceName]) {
                Thrust.__moduleRegistrations[instanceName] = {
                };
            }
            var args = toArray(arguments).slice(2);
            if(Thrust.__moduleRegistrations[instanceName][name]) {
                throw new Error(format('Module "{0}" already registered to instance "{1}"', name, instanceName));
            }
            Thrust.__moduleRegistrations[instanceName][name] = args || [];
        }
        Thrust.__getModuleArgs = __getModuleArgs;
        return Thrust;
    })();
    exports.Thrust = Thrust;    
    function load(name, parentRequire, load, config) {
        var parts = name.split(':'), realName = parts[0], pluginName = parts[1] || 'thrust';
        var instancePromise = Thrust.__fetchInstance(realName);
        instancePromise.promise.then(function (context) {
            var plugin = context[pluginName];
            if(!plugin) {
                throw new Error(format('Plugin "{0}" does not exist on thrust instance "{1}".', pluginName, realName));
            }
            load(plugin);
        });
    }
    exports.load = load;
})
//@ sourceMappingURL=main.js.map
;
define('thrust', ['thrust/main'], function (main) { return main; });

define('thrust/convention',["require", "exports", 'thrust/util'], function(require, exports, __util__) {
    var util = __util__;

    var _ = util._;
    var methods = [
        'create', 
        'init', 
        'start', 
        'ready', 
        'stop', 
        'destroy', 
        'countdown', 
        'ignite', 
        'orbit', 
        'deorbit', 
        'splashdown'
    ];
    var Convention = (function () {
        function Convention(methodOverrides) {
            _.extend(this, methodOverrides);
            var keys = _.difference(methods, _.intersection(methods, _.keys(methodOverrides)));
            _.each(keys, function (x) {
                if(_.isFunction(this[x])) {
                    this[x] = util.noop;
                }
            }, this);
        }
        Convention.prototype.create = function (thrust, mod, facades) {
        };
        Convention.prototype.init = function (mod, facades) {
        };
        Convention.prototype.start = function (mod, facades) {
        };
        Convention.prototype.ready = function (mod, facades) {
        };
        Convention.prototype.stop = function (mod, facades) {
        };
        Convention.prototype.destroy = function (mod, facades) {
        };
        Convention.prototype.countdown = function (thrust) {
        };
        Convention.prototype.ignite = function (thrust) {
        };
        Convention.prototype.orbit = function (thrust) {
        };
        Convention.prototype.deorbit = function (thrust) {
        };
        Convention.prototype.splashdown = function (thrust) {
        };
        return Convention;
    })();
    exports.Convention = Convention;    
})
//@ sourceMappingURL=convention.js.map
;
define('thrust/events',["require", "exports", './log', './config', 'has', 'thrust/util'], function(require, exports, __log__, __tConfig__, __has__, __util__) {
    
    var log = __log__;

    var tConfig = __tConfig__;

    var has = __has__;

    var util = __util__;

    var _ = util._;
    var EventNode = (function () {
        function EventNode() {
            this.tail = null;
            this.next = null;
            this.callback = null;
            this.context = null;
            this.namespace = '';
            this.once = false;
        }
        return EventNode;
    })();
    exports.EventNode = EventNode;    
    var createAsyncEvent = function (object) {
        var f = function f(events) {
            var args = [];
            for (var _i = 0; _i < (arguments.length - 1); _i++) {
                args[_i] = arguments[_i + 1];
            }
            _trigger.apply(object, [
                false
            ].concat(slice.call(arguments)));
            return object;
        };
        f.async = function (events) {
            var args = [];
            for (var _i = 0; _i < (arguments.length - 1); _i++) {
                args[_i] = arguments[_i + 1];
            }
            _trigger.apply(object, [
                true
            ].concat(slice.call(arguments)));
            return object;
        };
        return f;
    };
    var slice = Array.prototype.slice, asyncFire, noop = util.noop, when = util.when, size = _.size, each = _.each, defer = _.defer, bind = _.bind, extend = _.extend, format = util.format;
    var eventSplitter = /\s+/, ALL = 'all', STARALL = '*all';
    function normalizeEvents(events, namespace) {
        var eventsArray = events.split(eventSplitter);
        for(var i = 0, iLen = eventsArray.length; i < iLen; i++) {
            if(eventsArray[i].indexOf('.') === -1) {
                eventsArray[i] = eventsArray[i] + namespace;
            }
        }
        return eventsArray.join(' ');
    }
    function _trigger(async, events) {
        var that = this, event, node, calls, tail, args, all, rest, namespace, onceNodes;
        if(!(calls = this._callbacks)) {
            return that;
        }
        all = calls.all;
        var eventsArray = events.split(eventSplitter);
        rest = slice.call(arguments, 2);
        while(event = eventsArray.shift()) {
            if(node = calls[event]) {
                triggerNodes(that, event, async, node, rest);
            }
            if(node = all) {
                triggerNodes(that, ALL, async, node, [
                    event
                ].concat(rest));
            }
        }
    }
    function triggerNodes(that, event, async, nodeList, args) {
        var tail, onceNodes = [];
        true && log.info(format('{0}: triggering {1} event "{2}"', that.__pubSubName, async && 'async' || '', event));
        each(nodeList, function (node) {
            tail = node.tail;
            while((node = node.next) !== tail) {
                triggerCallback(async, node.callback, node.context || that, args);
                node.once && onceNodes.push(node);
            }
        });
        if(onceNodes.length) {
            each(onceNodes, function (x) {
                that.unsubscribe(event, x.callback, x.context, x.namespace);
            });
        }
    }
    function triggerCallback(async, callback, context, args) {
        if(async) {
            defer(triggerAsyncCallback(callback, context, args), 0);
        } else {
            try  {
                return callback.apply(context, args);
            } catch (e) {
                if(tConfig.throwErrors) {
                    throw e;
                }
            }
        }
    }
    function triggerAsyncCallback(callback, context, args) {
        return function () {
            return callback.apply(context, args);
        }
    }
    function _offProcessNode(that, event, node, callback, context) {
        var tail, cb, ctx, ns;
        tail = node.tail;
        while((node = node.next) !== tail) {
            cb = node.callback;
            ctx = node.context;
            ns = node.namespace;
            if((callback && cb !== callback) || (context && ctx !== context)) {
                that.subscribe(event + (ns && ('.' + ns) || ''), cb, ctx);
            }
        }
    }
    function getNamespaceData(event) {
        var nsIndex = (event || '').indexOf('.'), hasNs = nsIndex > -1, namespace = hasNs ? event.substring(nsIndex + 1) : undefined, event = hasNs ? event.substring(0, nsIndex) : event;
        if(nsIndex === 0) {
            event = STARALL;
        }
        return {
            event: event,
            namespace: namespace
        };
    }
    exports.Events = (function () {
        var events = {
            subscribe: function (events, callback, context, once) {
                var calls, event, node, tail, list, nd;
                this.__namespace && (events = normalizeEvents(events, this.__namespace));
                var eventsArray = events.split(eventSplitter);
                calls = this._callbacks || (this._callbacks = {
                });
                while(event = eventsArray.shift()) {
                    nd = getNamespaceData(event);
                    event = nd.event;
                    list = calls[event] || (calls[event] = {
                    });
                    list = list[nd.namespace];
                    node = list ? list.tail : new EventNode();
                    node.next = tail = new EventNode();
                    node.context = context || this.__defaultContext || undefined;
                    node.callback = callback;
                    if(nd.namespace) {
                        node.namespace = nd.namespace;
                    }
                    if(once) {
                        node.once = once;
                    }
                    calls[event][nd.namespace] = {
                        tail: tail,
                        next: list ? list.next : node
                    };
                }
                return this;
            },
            once: function (events, callback, context) {
                return this.subscribe(events, callback, context, true);
            },
            unsubscribe: function (events, callback, context) {
                var event, calls, node, nd, ourNs, namespace, that = this, hasNs;
                ourNs = that.__namespace;
                ourNs && (ourNs = ourNs.substring(1));
                if(!(calls = that._callbacks)) {
                    return;
                }
                if(!(events || callback || context)) {
                    if(!ourNs) {
                        delete that._callbacks;
                    } else {
                        var cbs = that._callbacks;
                        for(var i in cbs) {
                            delete cbs[i][ourNs];
                            if(size(cbs[i]) === 0) {
                                delete cbs[i];
                            }
                        }
                    }
                    return that;
                }
                ourNs && (events = normalizeEvents(events, that.__namespace));
                var eventsArray = events ? events.split(eventSplitter) : _.keys(calls);
                while(event = eventsArray.shift()) {
                    nd = getNamespaceData(event);
                    event = nd.event;
                    namespace = nd.namespace;
                    hasNs = !!namespace;
                    if(!ourNs) {
                        node = calls[event];
                        delete calls[event];
                    } else {
                        if(calls[event]) {
                            node = calls[event][ourNs];
                            delete calls[event][ourNs];
                            if(size(calls[event]) === 0) {
                                delete calls[event];
                            }
                        }
                    }
                    if(!node || !(callback || context)) {
                        continue;
                    }
                    if(event !== STARALL && !callback) {
                        _offProcessNode(that, event, node, callback, context);
                    } else {
                        if(event === ALL || !callback) {
                            for(var i in calls) {
                                if(hasNs) {
                                    delete calls[i];
                                } else {
                                    node = calls[i];
                                    delete calls[i];
                                    _offProcessNode(that, i, node, callback, context);
                                }
                            }
                        } else {
                            _offProcessNode(that, event, node, callback, context);
                        }
                    }
                }
                return that;
            },
            __pubSubName: 'Events',
            initEvents: function (defaultContext) {
                this.fire = this.publish = createAsyncEvent(this);
                this.initEvents = noop;
                this.__pubSubName = this.name || 'Events';
                if(this.name && !this.__namespace) {
                    this.__namespace = '.' + this.name;
                }
                this.__defaultContext = defaultContext;
                return this;
            },
            extend: function (to, init) {
                _.extend(to, exports.Events);
                delete to.extend;
                init && to.initEvents();
                return to;
            }
        };
        events.fire = events.publish = createAsyncEvent({
        });
        return events;
    })();
})
//@ sourceMappingURL=events.js.map
;
define('thrust/facade',["require", "exports", 'thrust/util', './capsule'], function(require, exports, __util__, __tm__) {
    
    var util = __util__;

    var _ = util._;
    var tm = __tm__;

    var Module = tm.Module;
    var thrustCache = Module.thrustCache;
    var facadeMethods = [
'init', 
'start', 
'ready', 
'stop', 
'destroy'    ], defaultPrototype = {
    };
    function conventionFunctionFactory(name) {
        return function (m) {
            var that = this;
            var returnValues = [];
            if(m && !((m).convention)) {
                m = thrustCache[m.mid].module;
            }
            if(that.__conventions) {
                return util.safeInvoke(that.__conventions, name, m, that);
            }
        }
    }
    function methodWrap(method) {
        return function (f) {
            var args = Array.prototype.slice.call(arguments, 1);
            f.apply(this, args);
            return method.apply(this, args);
        }
    }
    for(var i = 0, iLen = facadeMethods.length; i < iLen; i++) {
        var method = facadeMethods[i];
        defaultPrototype[method] = conventionFunctionFactory(method);
    }
    function load(name, parentRequire, load, config) {
        var parts = name.split(':'), instanceName = parts[0], plugin = parts[1], pluginName = plugin.substring(plugin.lastIndexOf('/') + 1 || 0), hashKey = parts[2];
        if(!instanceName) {
            throw new Error('instanceName is required!');
        }
        if(!pluginName) {
            throw new Error('pluginName is required!');
        }
        if(!hashKey) {
            throw new Error('hashKey is required!');
        }
        require([
            'thrust!' + instanceName
        ], function (thrust) {
            var thrustPlugin = thrust[pluginName];
            if(!thrustPlugin) {
                require([
                    plugin
                ], function (p) {
                    load(p);
                });
                return;
            }
            var thrustModuleCacheItem = thrustCache[hashKey] || (thrustCache[hashKey] = {
                facades: {
                },
                instance: {
                }
            });
            var facade = thrustPlugin.createFacade(thrust, thrustModuleCacheItem.instance, thrustModuleCacheItem.facades);
            load(facade);
        });
    }
    exports.load = load;
    function createFacade(initMethod) {
        var f = (function () {
            var Facade = function (mod) {
                initMethod.apply(this, arguments);
                for(var i = 0, iLen = facadeMethods.length; i < iLen; i++) {
                    var method = facadeMethods[i];
                    if(this[method] !== defaultPrototype[method]) {
                        this[method] = _.wrap(this[method], methodWrap(defaultPrototype[method]));
                    }
                }
                this.mod = mod;
            };
            Facade.prototype = _.extend({
                updateFacade: function (mod, facade) {
                    initMethod.apply(this, arguments);
                }
            }, defaultPrototype);
            return Facade;
        })();
        return f;
    }
    exports.createFacade = createFacade;
})
//@ sourceMappingURL=facade.js.map
;
define('thrust/convention/autostart',["require", "exports", 'thrust/convention'], function(require, exports, __c__) {
    
    var c = __c__;

    var Convention = c.Convention;
    var methods = {
        properties: [
            'config.autoStart'
        ]
    };
    exports.autostart = new Convention(methods);
})
//@ sourceMappingURL=autostart.js.map
;
define('thrust/convention/container',["require", "exports", 'thrust/convention', 'thrust/util'], function(require, exports, __c__, __util__) {
    
    var c = __c__;

    var Convention = c.Convention;
    var util = __util__;

    var _ = util._;
    var event = {
anyContainer: 'thrust/convention/container/any',
changeContainer: 'thrust/convention/container/change'    }, any = _.any, bind = _.bind, CONTAINER = 'config.container', START = 'start-status', defer = _.defer;
    var methods = {
        properties: [
            CONTAINER
        ],
        change: function (mod, container) {
            var containerValue = mod.convention(CONTAINER);
            if(containerValue && container && containerValue === container) {
                if(mod.convention(START)) {
                    defer(bind(mod.stop, mod));
                }
            }
        },
        start: function (mod, facades) {
            var that = this, containerValue = mod.convention(CONTAINER);
            if(containerValue) {
                facades.mediator.fire(event.changeContainer, containerValue);
                facades.mediator.subscribe(event.changeContainer, bind(that.change, that, mod));
            }
        }
    };
    exports.container = new Convention(methods);
})
//@ sourceMappingURL=container.js.map
;
define('thrust/convention/dependent.modules',["require", "exports", 'thrust/convention', 'thrust/util'], function(require, exports, __c__, __util__) {
    
    var c = __c__;

    var Convention = c.Convention;
    var util = __util__;

    var _ = util._;
    var any = _.any, map = _.map, DMODULES = 'config.dependentModules', CMODULES = 'config.childModules', START = 'start-status', defer = _.defer, bind = _.bind;
    var invokedependentModules = function (mod, method) {
        var requiredModules = mod.convention(DMODULES);
        if(requiredModules) {
            return mod.thrust[method](requiredModules);
        }
    };
    var invokeChildModules = function (mod, method) {
        var requiredModules = mod.convention(CMODULES);
        if(requiredModules) {
            return mod.thrust[method](requiredModules);
        }
    };
    var methods = {
        properties: [
            DMODULES, 
            CMODULES
        ],
        start: function (mod, facades) {
            return [
                invokedependentModules(mod, 'start'), 
                invokeChildModules(mod, 'start')
            ];
        },
        ready: function (mod, facades) {
            if(!mod.thrust.started) {
                return [
                    invokedependentModules(mod, 'ready'), 
                    invokeChildModules(mod, 'ready')
                ];
            }
        },
        stop: function (mod, facades) {
            return invokeChildModules(mod, 'stop');
        },
        destroy: function (mod, facades) {
            return invokeChildModules(mod, 'destroy');
        }
    };
    exports.dependentModules = new Convention(methods);
})
//@ sourceMappingURL=dependent.modules.js.map
;
define('thrust/mediator/config',["require", "exports"], function(require, exports) {
    
    exports.resolve = [
        'name', 
        'cfg'
    ];
    exports.conventions = [
        'thrust/mediator/convention/subscription'
    ];
})
//@ sourceMappingURL=config.js.map
;
define('thrust/mediator/convention/subscription',["require", "exports", 'thrust/convention', 'thrust/util'], function(require, exports, __c__, __util__) {
    
    var c = __c__;

    var Convention = c.Convention;
    var util = __util__;

    var _ = util._;
    var SUBSCRIPTIONS = 'config.mediator.subscriptions', isFunction = _.isFunction, isString = _.isString, isArray = _.isArray, isObject = _.isObject, isPlainObject = _.isPlainObject, forOwn = _.forOwn, each = _.each;
    var arrayShortHandArgsInOrder = [
        'handler', 
        'context'
    ];
    var methods = {
        properties: [
            SUBSCRIPTIONS
        ],
        start: function (mod, facade) {
            var subscriptions = mod.convention(SUBSCRIPTIONS);
            if(subscriptions && !(subscriptions)._subscriptionsSet) {
                var moduleInstance = mod.instance;
                forOwn(subscriptions, function (subscriptionCollection, subscriptionName) {
                    if(!isArray(subscriptionCollection)) {
                        subscriptionCollection = [
                            [
                                subscriptionCollection
                            ]
                        ];
                    } else {
                        if(subscriptionCollection.length && (!isArray(subscriptionCollection[0]) || isString(subscriptionCollection[0]))) {
                            subscriptionCollection = [
                                subscriptionCollection
                            ];
                        }
                    }
                    each(subscriptionCollection, function (subscription) {
                        if(isArray(subscription)) {
                            each(subscription, function (handlerObject, i) {
                                var newSubscription = [
                                    subscriptionName
                                ];
                                if(isString(handlerObject)) {
                                    newSubscription.push(mod.instance[handlerObject]);
                                    if(subscription[i + 1]) {
                                        newSubscription.push(subscription[i + 1]);
                                    }
                                } else {
                                    if(isFunction(handlerObject)) {
                                        newSubscription.push(handlerObject);
                                        if(subscription[i + 1]) {
                                            newSubscription.push(subscription[i + 1]);
                                        }
                                    } else {
                                        if(isPlainObject(handlerObject) && ('moduleHandler' in handlerObject || 'handler' in handlerObject)) {
                                            if('moduleHandler' in handlerObject) {
                                                newSubscription.push(mod.instance[handlerObject.moduleHandler]);
                                            }
                                            if('handler' in handlerObject) {
                                                if(isString(handlerObject)) {
                                                    newSubscription.push(mod.instance[handlerObject.handler]);
                                                } else {
                                                    newSubscription.push(handlerObject.handler);
                                                }
                                            }
                                            if('context' in handlerObject) {
                                                newSubscription.push(handlerObject.context);
                                            }
                                        }
                                    }
                                }
                                if(newSubscription.length > 1) {
                                    facade.subscribe.apply(facade, newSubscription);
                                }
                            });
                        }
                    });
                });
                mod.convention(SUBSCRIPTIONS)._subscriptionsSet = true;
            }
        },
        stop: function (mod, facade) {
            var subscriptions = mod.convention(SUBSCRIPTIONS);
            if(subscriptions && subscriptions._subscriptionsSet) {
                mod.convention(SUBSCRIPTIONS)._subscriptionsSet = false;
            }
        }
    };
    exports.subscription = new Convention(methods);
})
//@ sourceMappingURL=subscription.js.map
;
define('thrust/data/config',["require", "exports"], function(require, exports) {
    
    exports.resolve = [
        'name', 
        'mediator', 
        'cfg'
    ];
    exports.conventions = [
        'thrust/data/convention/start'
    ];
    exports.cache = true;
    exports.startTimeout = 100;
    exports.finishTimeout = 2000;
})
//@ sourceMappingURL=config.js.map
;
define('thrust/data/event.types',["require", "exports"], function(require, exports) {
    exports.wait = 'thrust/data/wait';
    exports.start = 'thrust/data/start';
    exports.status = 'thrust/data/status';
    exports.stop = 'thrust/data/stop';
    exports.event = {
        beforeSend: 'thrust/data/event/before-send',
        start: 'thrust/data/event/start',
        send: 'thrust/data/event/send',
        error: 'thrust/data/event/error',
        success: 'thrust/data/event/sucess',
        complete: 'thrust/data/event/complete',
        stop: 'thrust/data/event/stop'
    };
})
//@ sourceMappingURL=event.types.js.map
;
define('thrust/data/event.factory',["require", "exports", 'thrust/convention', 'thrust/util', './event.types'], function(require, exports, __c__, __util__, __eventTypes__) {
    
    var c = __c__;

    var Convention = c.Convention;
    var util = __util__;

    var _ = util._;
    var eventTypes = __eventTypes__;

    var camelCase = util.camelCase, format = util.format, bind = _.bind, dataEvents = eventTypes.event, slice = Array.prototype.slice, memoize = _.memoize;
    var eventHandlers = {
        'before-send': true,
        'send': true,
        'error': true,
        'success': true,
        'complete': true,
        'start': true,
        'stop': true
    };
    function beforeSendMethod(jqXHR, settings) {
        this.fire(dataEvents['beforeSend'], jqXHR, settings);
    }
    exports.beforeSendMethod = beforeSendMethod;
    var eventFactory = memoize(function (event) {
        var evt = dataEvents[event];
        return function () {
            var args = slice.call(arguments, 0);
            args.unshift(evt);
            this.fire.apply(this.fire.async, args);
        }
    });
    var normalizeEvents = function (evts) {
        evts = evts.split(' ');
        for(var i = 0, iLen = evts.length; i < iLen; i++) {
            if(!eventHandlers[evts[i]]) {
                throw new Error(format('Event "{0}" is not a valid data event', evts[i]));
            }
            evts[i] = dataEvents[evts[i]];
        }
        return evts.join(' ');
    };
    var sendEventFactory = function (i) {
        return function (event, jqXHR, settings) {
            if(!settings.__mediator_data_fired__) {
                jqXHR.abort();
                throw new Error('Request aborted, all ajax calls must pass through thrust-data.');
            }
            if(!settings.silent) {
                eventFactory(i).apply(this, arguments);
            }
        }
    };
    function init(jDoc) {
        for(var i in eventHandlers) {
            var jqEvt = 'ajax-' + i, method = eventFactory(i);
            if(i === 'send') {
                method = bind(sendEventFactory(i), this);
            }
            jDoc.on(camelCase(jqEvt) + this.namespace, method);
        }
    }
    exports.init = init;
})
//@ sourceMappingURL=event.factory.js.map
;
define('thrust/data/response.queue',["require", "exports", 'thrust/convention', 'thrust/util', './event.types', 'jquery', 'thrust/log', 'has'], function(require, exports, __c__, __util__, __eventTypes__, __jQuery__, __log__, __has__) {
    
    var c = __c__;

    var Convention = c.Convention;
    var util = __util__;

    var _ = util._;
    var eventTypes = __eventTypes__;

    var jQuery = __jQuery__;

    var log = __log__;

    var has = __has__;

    var slice = Array.prototype.slice, format = util.format, extend = _.extend, when = util.when, uid = _.uniqueId, ajax = jQuery.ajax, dataEventWait = eventTypes.wait, dataEventStart = eventTypes.start, dataEventStop = eventTypes.stop, dataEventStatus = eventTypes.status, queue = {
    }, updateXHRInternals = function (dfo, xhr) {
return function () {
if(!dfo._xhr) {
dfo._xhr = xhr;dfo.getAllResponseHeaders = function () {
return dfo._xhr.getAllResponseHeaders();                };dfo.getResponseHeader = function () {
return dfo._xhr.getAllResponseHeadersgetResponseHeader();                };dfo.abort = function () {
return dfo._xhr.abort();                };dfo.setRequestHeader = function (name, value) {
return dfo._xhr.setRequestHeader(name, value);                };            }dfo.responseText = xhr.responseText;dfo.responseXML = xhr.responseXML;dfo.readyState = xhr.readyState;dfo.status = xhr.status;dfo.statusText = xhr.statusText;        }    }, argumentResolver = function (method) {
return function () {
return method(_.toArray(arguments));        }    }, deferControllerItemCallback = function (func) {
return function () {
return func.call(this, arguments[0][0]);        }    };
    var ResponseQueue = (function () {
        function ResponseQueue(module, startTimeout, finishTimeout) {
            this.startTimeout = startTimeout;
            this.finishTimeout = finishTimeout;
            this.module = module;
            this.namespace = module.namespace;
        }
        ResponseQueue.prototype.addToQueue = function (type, url, options) {
            var dfo = when.defer(), that = this;
            if(options.beforeSend) {
                var beforeSend = options.beforeSend;
                dfo.progress(function (eventType) {
                    if(eventType && eventType == 'before-send') {
                        var args = slice.call(arguments, 1);
                        beforeSend.apply(beforeSend, args);
                    }
                });
                delete options.beforeSend;
            }
            if(options.complete) {
                dfo.promise.always(options.complete);
                delete options.complete;
            }
            if(options.success) {
                dfo.promise.then(options.success);
                delete options.success;
            }
            if(options.error) {
                dfo.promise.otherwise(options.error);
                delete options.error;
            }
            var hasQueue = !!queue[type], list = queue[type] || (queue[type] = {
            }), tail = list.tail || (list.tail = list.next = {
            });
            extend(tail, {
                url: url,
                options: options,
                dfo: dfo
            });
            list.tail = tail.next = {
            };
            if(!hasQueue) {
                when.delay(that.startTimeout).then(that.process(type));
            }
            return dfo.promise;
        };
        ResponseQueue.prototype.process = function (type) {
            var parent = queue[type], node = parent, that = this, queryId = uid('dq');
            true && log.debug(format('Data[{0}]: Creating queue for type "{1}"', that.namespace, type));
            that.module.fire(dataEventWait, queryId, type);
            return function () {
                true && log.debug(format('Data[{0}]: Processing queue for type "{1}"', that.namespace, type));
                var whenQueue = [], deferController = when.defer(), returnCount = 0;
                deferController.promise.then(function () {
                    true && log.debug(format('Data[{0}]: Finishing queue for type "{1}"', that.namespace, type));
                    that.module.fire(dataEventStop, queryId, type, returnCount);
                });
                delete queue[type];
                var tail = node.tail, statusCallback = function () {
that.module.fire(dataEventStatus, queryId, type, ++returnCount);                };
                while((node = node.next) !== tail) {
                    var dfo = node.dfo, options = extend({
                    }, node.options), xhrDfo = when.defer(), xhr = node.xhr = ajax(node.url, options).then(argumentResolver(xhrDfo.resolve), argumentResolver(xhrDfo.reject));
                    xhrDfo.promise.then(statusCallback);
                    whenQueue.push(xhr);
                    when.all([
                        xhrDfo, 
                        deferController.promise
                    ], when.apply(dfo.resolve), when.apply(dfo.reject), updateXHRInternals(dfo, xhr));
                    dfo.progress('before-send', [
                        dfo, 
                        options
                    ]);
                }
                that.module.fire(dataEventStart, queryId, type, whenQueue.length);
                when.any([
                    when.all(whenQueue), 
                    when.delay(that.finishTimeout)
                ], deferController.resolve, deferController.resolve);
            }
        };
        return ResponseQueue;
    })();
    exports.ResponseQueue = ResponseQueue;    
})
//@ sourceMappingURL=response.queue.js.map
;
define('thrust/data/convention/start',["require", "exports", 'thrust/convention', 'thrust/util'], function(require, exports, __c__, __util__) {
    
    var c = __c__;

    var Convention = c.Convention;
    var util = __util__;

    var _ = util._;
    var when = util.when;
    var whenQueue = [];
    function waitCallback(uid) {
        var d = when.defer();
        d.resolver['uid'] = uid;
        whenQueue.push({
            uid: uid,
            resolver: d.resolver
        });
    }
    function stopCallback(uid) {
        var item = _.find(whenQueue, function (x) {
            return x.uid === uid;
        });
        whenQueue = _.without(whenQueue, item);
        item.resolver.resolve();
    }
    var methods = {
        countdown: function (thrust) {
            thrust.data.subscribe('thrust/data/wait', waitCallback);
            thrust.data.subscribe('thrust/data/stop', stopCallback);
        },
        orbit: function (thrust) {
            thrust.data.unsubscribe('thrust/data/wait', waitCallback);
            thrust.data.unsubscribe('thrust/data/stop', stopCallback);
            var defer = when.defer();
            if(thrust.cfg.data.finishTimeout === 0) {
                return when.all(whenQueue);
            }
            return when.any([
                when.all(whenQueue), 
                when.delay(thrust.cfg.data.finishTimeout)
            ], defer.resolve, defer.reject);
        }
    };
    exports.subscription = new Convention(methods);
})
//@ sourceMappingURL=start.js.map
;
define('thrust/dom/config',["require", "exports"], function(require, exports) {
    
    exports.resolve = [
        'name', 
        'mediator'
    ];
    exports.conventions = [
        'thrust/dom/convention/action', 
        'thrust/dom/convention/context', 
        'thrust/dom/convention/event'
    ];
})
//@ sourceMappingURL=config.js.map
;
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
                true && log.debug(format('tQuery[{0}]: Binding ' + x + ' events...', this.namespace));
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
define('thrust/dom/convention/action',["require", "exports", 'thrust/convention', 'thrust/util', '../subjquery'], function(require, exports, __c__, __util__, __subjquery__) {
    
    var c = __c__;

    var Convention = c.Convention;
    var util = __util__;

    var _ = util._;
    var subjquery = __subjquery__;

    var $ = subjquery.tQuery;
    var format = util.format, ACTIONS = 'config.dom.actions', ACTIONSSINGLE = 'actions', STRING = 'string', REGISTRATIONS = '_registrations', isFunction = _.isFunction, isString = _.isString, isArray = _.isArray;
    var getActionAttribute = function (eventName) {
        return 'data-action-' + eventName;
    };
    var ActionHandler = (function () {
        function ActionHandler() {
            this.events = {
            };
        }
        ActionHandler.prototype.register = function (eventName, actionName, action) {
            var events = this.events;
            if(!events[eventName]) {
                events[eventName] = {
                };
            }
            if(!events[eventName][actionName]) {
                events[eventName][actionName] = action;
            } else {
                throw new Error(format('The action {1} handler "{0}" has already been taken!', actionName, eventName));
            }
        };
        ActionHandler.prototype.unregister = function (eventName, actionName) {
            var events = this.events;
            if(events[eventName] && events[eventName][actionName]) {
                events[eventName][actionName] = null;
            }
        };
        ActionHandler.prototype.callbackFor = function (eventName, returnResults) {
            var events = this.events, actionAttribute = getActionAttribute(eventName), returnResultsDefined = typeof returnResults !== 'undefined';
            return function () {
                var attributeValue = $(this).attr(actionAttribute);
                if(typeof attributeValue === STRING) {
                    var action = events[eventName][attributeValue];
                    if(action) {
                        action.handler.apply(action.context || this, arguments);
                    }
                    if(returnResultsDefined) {
                        return returnResults;
                    }
                    return false;
                }
            }
        };
        ActionHandler.actionHandlers = {
        };
        ActionHandler.getFor = function getFor(name) {
            if(this.actionHandlers[name]) {
                return this.actionHandlers[name];
            }
            return (this.actionHandlers[name] = new ActionHandler());
        }
        return ActionHandler;
    })();    
    var events = {
        click: [
            'a', 
            'button', 
            'input[type="button"]', 
            'input[type="submit"]'
        ],
        dblclick: [
            'a', 
            'button', 
            'input[type="button"]', 
            'input[type="submit"]'
        ],
        mouseenter: [
            ''
        ],
        mouseleave: [
            ''
        ],
        focus: [
            'input'
        ],
        blur: [
            'input'
        ]
    };
    var arrayShortHandArgsInOrder = [
        'name', 
        'handler', 
        'context'
    ];
    var methods = {
        properties: [
            ACTIONS
        ],
        ignite: function (thrust) {
            var actionHandler = ActionHandler.getFor(thrust.name);
            thrust.dom.actionHandler = actionHandler;
            var $body = $(window.document.body);
            _.each(events, function (eventSelectors, eventName) {
                $body.on(eventName + '.' + ACTIONSSINGLE + thrust.name, eventSelectors.join(getActionAttribute(eventName) + ', '), actionHandler.callbackFor(eventName, true));
            });
        },
        deorbit: function (thrust) {
            var actionHandler = ActionHandler.getFor(thrust.name);
            var $body = $(window.document.body);
            _.each(events, function (eventSelectors, eventName) {
                $body.off('.' + ACTIONSSINGLE + thrust.name);
            });
        },
        ready: function (mod, facade) {
            var actions = mod.convention(ACTIONS), actionHandler = ActionHandler.getFor(mod.thrust.name), dom = facade, moduleInstance = mod.instance;
            if(actions) {
                _.forOwn(actions, function (actionCollection, eventName) {
                    if(!isArray(actionCollection)) {
                        actionCollection = [
                            actionCollection
                        ];
                    } else {
                        if(actionCollection.length && (!isArray(actionCollection[0]) || isString(actionCollection[0]))) {
                            actionCollection = [
                                actionCollection
                            ];
                        }
                    }
                    _.each(actionCollection, function (action) {
                        if(isArray(action)) {
                            var newAction = {
                                name: undefined
                            };
                            _.each(arrayShortHandArgsInOrder, function (x, i) {
                                if(x === 'handler' && isString(action[i])) {
                                    action[i] = mod.instance[action[i]];
                                }
                                newAction[x] = action[i];
                            });
                            action = newAction;
                        }
                        var actionName = action.name;
                        if(!action.handler && action.moduleHandler) {
                            action.handler = mod.instance[action.moduleHandler];
                        } else {
                            if(!action.handler) {
                                throw new Error('Must define either a handler or module handler.');
                            }
                        }
                        actionHandler.register(eventName, actionName, action);
                    });
                });
            }
        },
        stop: function (mod, facade) {
            var actions = mod.convention(ACTIONS), actionHandler = ActionHandler.getFor(mod.thrust.name), moduleInstance = mod.instance;
            if(actions) {
                for(var actionEvent in actions) {
                    var actionCollection = actions[actionEvent];
                    for(var actionName in actionCollection) {
                        actionHandler.unregister(actionEvent, actionName);
                    }
                }
            }
        }
    };
    exports.action = new Convention(methods);
})
//@ sourceMappingURL=action.js.map
;
define('thrust/dom/convention/animate.container',["require", "exports", 'thrust/convention', 'thrust/util'], function(require, exports, __c__, __util__) {
    
    var c = __c__;

    var Convention = c.Convention;
    var util = __util__;

    var _ = util._;
    var event = {
anyContainer: 'thrust-convention-container-any',
changeContainer: 'thrust-convention-container-change'    }, any = _.any, defer = _.defer, bind = _.bind, START = 'start-status', ANIMATE = 'animate', CONTAINER = 'container', CONTEXT = 'context';
    var methods = {
        properties: [
            ANIMATE
        ],
        init: function (mod, facade) {
            var that = this, mediator = mod.instance.mediator;
            mediator.subscribe(event.changeContainer, bind(that.change, that, mod));
        },
        change: function (module, container) {
            if(module.convention(CONTAINER) === container) {
                if(module.convention(START)) {
                    var animate = module.convention(ANIMATE);
                    if(animate) {
                        var contextNode = module.instance.dom();
                        contextNode.removeClass(animate);
                    }
                }
            }
        },
        ready: function (mod, facade) {
            var that = this, animate = mod.convention(ANIMATE), container = mod.convention(CONTAINER), context = mod.convention(CONTEXT), dom = facade;
            if(animate && container) {
                var clone = dom.context.clone().appendTo(dom.context.parent());
                clone.addClass(animate.replace(/\./g, ' ').trim());
                mod.instance.dom = mod.instance.$ = clone;
                setTimeout(bind(that.cleanup, that, dom.context.parent(), animate, context), 2000);
            }
        },
        cleanup: function (container, animate, context) {
            container.find(context).filter(':not(' + animate + ')').remove();
        }
    };
    exports.animateContainer = new Convention(methods);
})
//@ sourceMappingURL=animate.container.js.map
;
define('thrust/dom/convention/context',["require", "exports", 'thrust/convention', 'thrust/util', '../subjquery'], function(require, exports, __c__, __util__, __subjquery__) {
    
    var c = __c__;

    var Convention = c.Convention;
    var util = __util__;

    var _ = util._;
    var subjquery = __subjquery__;

    var tQuery = subjquery.tQuery;
    var CONTEXT = 'config.dom.context';
    var methods = {
        properties: [
            CONTEXT
        ],
        ready: function (mod, facade) {
            var context = mod.convention(CONTEXT);
            if(context) {
                mod.instance.dom = mod.instance.$ = tQuery(context, facade.context);
            }
        }
    };
    exports.context = new Convention(methods);
})
//@ sourceMappingURL=context.js.map
;
define('thrust/dom/convention/event',["require", "exports", 'thrust/convention', 'thrust/util'], function(require, exports, __c__, __util__) {
    
    var c = __c__;

    var Convention = c.Convention;
    var util = __util__;

    var _ = util._;
    var CONTEXT = 'config.dom.context', EVENTS = 'config.dom.events', isFunction = _.isFunction, isString = _.isString, isArray = _.isArray;
    var eventPropertyLoadOrder = [
        'selector', 
        'data', 
        'handler'
    ];
    var methods = {
        properties: [
            EVENTS
        ],
        ready: function (mod, facade) {
            var events = mod.convention(EVENTS), $context = facade.context, moduleInstance = mod.instance;
            if(events) {
                _.forIn(events, function (eventsCollection, event) {
                    if(!isArray(eventsCollection)) {
                        eventsCollection = [
                            eventsCollection
                        ];
                    } else {
                        if(eventsCollection.length && (!isArray(eventsCollection[0]) || isString(eventsCollection[0]))) {
                            eventsCollection = [
                                eventsCollection
                            ];
                        }
                    }
                    _.each(eventsCollection, function (definition) {
                        var bindEvent = [
                            event
                        ];
                        if(isArray(definition)) {
                            bindEvent.push.apply(bindEvent, definition);
                            var handler = bindEvent[bindEvent.length - 1];
                            if(isString(handler) && bindEvent.length === 2) {
                                bindEvent[bindEvent.length - 1] = mod.instance[handler];
                            } else {
                                if(!isString(handler) && !isFunction(handler) && bindEvent.length > 2 || bindEvent.length === 5) {
                                    handler = bindEvent[bindEvent.length - 2];
                                    if(isString(handler)) {
                                        bindEvent[bindEvent.length - 2] = mod.instance[handler];
                                    }
                                    bindEvent[bindEvent.length - 2] = _.bind(bindEvent[bindEvent.length - 2], bindEvent.pop());
                                } else {
                                    if(isString(handler)) {
                                        bindEvent[bindEvent.length - 1] = mod.instance[handler];
                                    }
                                }
                            }
                        } else {
                            _.each(eventPropertyLoadOrder, function (x) {
                                if(definition[x]) {
                                    var value = definition[x];
                                    if(x === 'handler' && definition.context) {
                                        value = _.bind(value, definition.context);
                                    }
                                    bindEvent.push(value);
                                }
                            });
                        }
                        $context.on.apply($context, bindEvent);
                    });
                });
            }
        },
        stop: function (mod, facade) {
            var events = mod.convention(EVENTS), $context = facade.context;
            if($context) {
                $context.off();
            }
        }
    };
    exports.event = new Convention(methods);
})
//@ sourceMappingURL=event.js.map
;
define('thrust/template/config',["require", "exports"], function(require, exports) {
    
    exports.resolve = [
        'cfg', 
        'data'
    ];
    exports.conventions = [
        'thrust/template/convention/template', 
        'thrust/template/convention/knockout.engine'
    ];
    exports.types = {
        'doT': 'doT',
        'precompiled': true
    };
    exports.evaluators = {
        'doT': {
            left: '{{= ',
            right: '}}'
        }
    };
    exports.defaultType = 'doT';
    exports.baseUrl = '';
    exports.extension = '.tmpl';
    exports.templatePaths = {
        'doT': 'doT'
    };
})
//@ sourceMappingURL=config.js.map
;
define('thrust/template/convention/knockout.engine',["require", "exports", 'thrust/convention', 'thrust/util', 'knockout'], function(require, exports, __c__, __util__, __ko__) {
    
    var c = __c__;

    var Convention = c.Convention;
    var util = __util__;

    var _ = util._;
    var ko = __ko__;

    var when = util.when, each = _.each, hasOwn = Object.prototype.hasOwnProperty, find = _.find, knockoutTemplates = {
    };
    var initKnockoutIntegration = function (templateManager) {
        var ThrustTemplateSource = (ko).templateSources.thrustTemplate = function (template) {
            this.template = template;
        };
        ThrustTemplateSource.prototype = {
            text: function () {
                var that = this;
                if(arguments.length === 0) {
                    return that.template.html;
                } else {
                    that.template.html = arguments[0];
                }
            },
            data: function (key) {
                var that = this;
                if(!that.template.data) {
                    that.template.data = {
                    };
                }
                if(arguments.length === 1) {
                    return that.template.data[key];
                } else {
                    that.template.data[key] = arguments[1];
                }
            }
        };
        var oldEngine = (ko).nativeTemplateEngine.instance;
        var conventionTemplateEngine = (ko).conventionTemplateEngine = function () {
        };
        conventionTemplateEngine.prototype = ko.utils.extend(new (ko).templateEngine(), {
            renderTemplateSource: function (templateSource, bindingContext, options) {
                if(templateSource.template) {
                    var evaluators = this.evaluators;
                    if(!evaluators) {
                        this.evaluators = evaluators = templateManager.config.evaluators[templateManager.config.defaultType];
                    }
                    var precompiled = templateSource['data']('precompiled');
                    if(!precompiled) {
                        precompiled = templateManager.compile('{{ with($data) { }} ' + templateSource.text() + " {{ } }}");
                        templateSource['data']('precompiled', precompiled);
                    }
                    var renderedMarkup = templateSource.template.compiled(bindingContext).replace(/\s+/g, " ");
                    return (ko).utils.parseHtmlFragment(renderedMarkup);
                }
                return oldEngine.renderTemplateSource.apply(oldEngine, arguments);
            },
            createJavaScriptEvaluatorBlock: function (script) {
                if(!this.evaluatorCache) {
                    var evaluators = templateManager.config.evaluators[templateManager.config.defaultType];
                    this.evaluatorCache = evaluators.left + script + evaluators.right;
                }
                return this.evaluatorCache;
            },
            makeTemplateSource: function (template, templateDocument) {
                if(typeof template == "string") {
                    var definition = templateManager.get(template);
                    if(definition) {
                        return new ThrustTemplateSource(definition);
                    }
                }
                return oldEngine.makeTemplateSource.apply(oldEngine, arguments);
            }
        });
        (ko).setTemplateEngine(new (ko).conventionTemplateEngine());
    };
    var methods = {
        countdown: function (thrust) {
            initKnockoutIntegration(thrust.template);
        }
    };
    exports.knockoutEngine = new Convention(methods);
})
//@ sourceMappingURL=knockout.engine.js.map
;
define('thrust/template/convention/template',["require", "exports", 'thrust/convention', 'thrust/util'], function(require, exports, __c__, __util__) {
    
    var c = __c__;

    var Convention = c.Convention;
    var util = __util__;

    var _ = util._;
    var TEMPLATES = 'templates', when = util.when, each = _.each, hasOwn = Object.prototype.hasOwnProperty, find = _.find;
    var methods = {
        properties: [
            TEMPLATES
        ],
        init: function (mod, facade) {
            var defer = when.defer();
            var templates = mod.convention(TEMPLATES), invertedTemplates = util.invert(templates), moduleInstance = mod.instance;
            if(templates) {
                var defers = [];
                each(templates, function (template) {
                    if(typeof template === 'string') {
                        defers.push(facade.fetch(template));
                    }
                });
                facade.loadingPromise = when.all(defers).then(function (loadedTemplates) {
                    _.each(invertedTemplates, function (x, i) {
                        var template = _.find(loadedTemplates, function (x) {
                            return x.shortName === i || x.name === i;
                        });
                        moduleInstance.templates[i] = template.compiled;
                    });
                });
            }
        },
        ready: function (mod, facade) {
            return facade.loadingPromise || undefined;
        }
    };
    exports.template = new Convention(methods);
})
//@ sourceMappingURL=template.js.map
;
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
define('thrust/mediator/main',["require", "exports", 'thrust/util', 'thrust/log', 'thrust/events', 'thrust/facade', 'has', 'thrust/config', './config'], function(require, exports, __util__, __log__, __events__, __facade__, __has__, __config__, __mediatorConfig__) {
    
    var util = __util__;

    var _ = util._;
    var log = __log__;

    var events = __events__;

    var Events = events.Events;
    var facade = __facade__;

    var has = __has__;

    var config = __config__;

    var mediatorConfig = __mediatorConfig__;

    exports.className = 'Mediator';
    var format = util.format, extend = _.extend, type = util.type, when = util.when, memoize = _.memoize, mediator, slice = Array.prototype.slice;
    var c = config;
    var MediatorFacade = (function () {
        var mediatorFacade = facade.createFacade(function (module, parent) {
            this.name = module.name;
            this.module = module;
            this.parent = parent;
            this.__conventions = parent.__conventions;
            this._callbacks = parent._callbacks;
            this.initEvents(module);
        });
        _.extend(mediatorFacade.prototype, Events);
        mediatorFacade.prototype.init = function (m) {
            if(!this._internalSubscriptions) {
                this._internalSubscriptions = [];
            }
            return null;
        };
        mediatorFacade.prototype.start = mediatorFacade.prototype.init;
        (mediatorFacade).prototype.subscribe = function (events, callback, context) {
            this._internalSubscriptions.push({
                events: events,
                callback: callback,
                context: context
            });
            Events.subscribe.call(this, events, callback, context);
        };
        mediatorFacade.prototype.stop = function (m) {
            if(this._internalSubscriptions) {
                for(var i = this._internalSubscriptions.length - 1; i >= 0; i--) {
                    var sub = this._internalSubscriptions[i];
                    this.unsubscribe(sub.events, sub.callback, sub.context);
                }
                this._internalSubscriptions = null;
            }
            return null;
        };
        return mediatorFacade;
    })();
    var Mediator = (function () {
        function Mediator(name, config) {
            var that = this, appPath = config && config.url && config.url.path;
            that.name = name;
            true && log.debug(format('Mediator: Creating new Mediator {0}', name));
            that.initEvents();
            that.subscribe('thrust/ready', function () {
                true && log.info('Mediator: Ready!');
            });
        }
        Mediator.prototype.initEvents = function () {
        };
        Mediator.prototype.extend = function (to, init) {
            return null;
        };
        Mediator.prototype.subscribe = function (events, callback, context, once) {
        };
        Mediator.prototype.unsubscribe = function (events, callback, context) {
        };
        Mediator.prototype.once = function (events, callback, context) {
        };
        Mediator.prototype.createFacade = function (thrust, mod, facades) {
            if(facades.mediator && !(facades.mediator instanceof MediatorFacade)) {
                throw new Error('"mediator" is a reserved property');
            }
            var mediator;
            if(facades.mediator) {
                facades.mediator.updateFacade(mod, this);
                mediator = facades.mediator;
            } else {
                mediator = facades.mediator = (mod).mediator = new MediatorFacade(mod, this);
            }
            return mediator;
        };
        Mediator.config = mediatorConfig;
        return Mediator;
    })();
    exports.Mediator = Mediator;    
    _.extend(Mediator.prototype, Events);
})
//@ sourceMappingURL=main.js.map
;
define('thrust/mediator', ['thrust/mediator/main'], function (main) { return main; });

define('thrust/data/main',["require", "exports", 'thrust/convention', 'thrust/util', 'jquery', 'thrust/log', './config', 'thrust/config', './event.factory', './response.queue', 'thrust/events', 'thrust/facade', './event.types', 'has'], function(require, exports, __c__, __util__, __jQuery__, __log__, __config__, __tConfig__, __eventFactory__, __responseQueue__, __events__, __facade__, __eventTypes__, __has__) {
    
    var c = __c__;

    var Convention = c.Convention;
    var util = __util__;

    var _ = util._;
    var jQuery = __jQuery__;

    var log = __log__;

    var config = __config__;

    var tConfig = __tConfig__;

    var eventFactory = __eventFactory__;

    var responseQueue = __responseQueue__;

    var ResponseQueue = responseQueue.ResponseQueue;
    var events = __events__;

    var Events = events.Events;
    var facade = __facade__;

    var eventTypes = __eventTypes__;

    var has = __has__;

    exports.className = 'Data';
    config;
    var format = util.format, extend = _.extend, type = util.type, when = util.when, slice = Array.prototype.slice, ajax = jQuery.ajax, uid = _.uniqueId, dataEventWait = eventTypes['wait'], dataEventStart = eventTypes['start'], dataEventStop = eventTypes['stop'], dataEventStatus = eventTypes['status'], argumentResolver = function (method) {
return function () {
return method(_.toArray(arguments));        }    };
    jQuery.ajaxSettings.traditional = !!tConfig.url.traditionalEncoding;
    var jDoc = jQuery(document);
    eventFactory.init(jDoc);
    var DataFacade = (function () {
        var dataFacade = facade.createFacade(function (module, parent) {
            this.name = module.name + '-data';
            this.module = module;
            this.parent = parent;
            this.__conventions = parent.__conventions;
            this._callbacks = parent._callbacks;
            this.responseQueue = parent.responseQueue;
            this.initEvents();
            this.defaults = parent.defaults;
            this.appPath = parent.appPath;
        });
        _.extend(dataFacade.prototype, events);
        return dataFacade;
    })();
    var Data = (function () {
        function Data(name, mediator, config) {
            if(!name) {
                throw new Error('Data: module name must be defined.');
            }
            this.name = name;
            this.responseQueue = new ResponseQueue(this, config.data.startTimeout, config.data.finishTimeout);
            true && log.debug('Data: Creating new Data');
            this.mediator = mediator;
            this._callbacks = (this).mediator._callbacks;
            this.initEvents();
            this.defaults = {
                cache: config.data.cache,
                beforeSend: eventFactory.beforeSendMethod,
                contentType: 'application/json',
                type: 'POST',
                url: '',
                data: '',
                dataType: 'json',
                __mediator_data_fired__: true,
                silent: false
            };
            this.appPath = config.url.path + '/';
        }
        Data.prototype.initEvents = function () {
        };
        Data.prototype.extend = function (to, init) {
            return null;
        };
        Data.prototype.subscribe = function (events, callback, context, once) {
        };
        Data.prototype.unsubscribe = function (events, callback, context) {
        };
        Data.prototype.once = function (events, callback, context) {
        };
        Data.prototype.createFacade = function (thrust, mod, facades) {
            if(mod.data && !(facades.data instanceof DataFacade)) {
                throw new Error('"data" is a reserved property');
            }
            var data;
            if(facades.data) {
                facades.data.updateFacade(mod, this);
                data = facades.data;
            } else {
                data = facades.data = mod.data = new DataFacade(mod, this);
            }
            return data;
        };
        Data.prototype.getData = function (url, data, settings) {
            settings = !settings ? {
                data: data
            } : extend(settings, {
                data: data
            });
            return this.get(url, settings);
        };
        Data.prototype.postData = function (url, data, settings) {
            settings = !settings ? {
                data: JSON.stringify(data)
            } : extend(settings, {
                data: JSON.stringify(data)
            });
            return this.post(url, settings);
        };
        Data.prototype.get = function (url, settings) {
            if(settings === undefined && typeof url === 'object') {
                settings = url;
                url = settings.url;
            }
            if(url === undefined && settings.url !== undefined) {
                url = settings.url;
            }
            if(url === undefined) {
                throw new Error('No url is defined');
            }
            return this.ajax(url, extend(settings || {
            }, {
                type: 'get'
            }));
        };
        Data.prototype.post = function (url, settings) {
            if(settings === undefined && typeof url === 'object') {
                settings = url;
                url = settings.url;
            }
            if(url === undefined && settings.url !== undefined) {
                url = settings.url;
            }
            if(url === undefined) {
                throw new Error('No url is defined');
            }
            return this.ajax(url, extend(settings || {
            }, {
                type: 'post'
            }));
        };
        Data.prototype.ajax = function (url, settings) {
            var that = this, options, type, beforeSend;
            true && log.info(format('Data[{0}]: Fetching data from "{1}"', that.namespace, url));
            if(settings === undefined && typeof url === 'object') {
                settings = url;
                url = settings.url;
            }
            if(!settings) {
                settings = {
                };
            }
            if(url === undefined && settings.url !== undefined) {
                url = settings.url;
            }
            url = util.fixupUrl(url, that.appPath);
            if(settings.silent) {
                var dfo = when.defer();
                var queryId = uid('dq');
                type = settings.type.toLowerCase();
                options = extend({
                }, that.defaults, {
                    beforeSend: util.noop
                }, settings);
                ajax(url, options).then(argumentResolver(dfo.resolve), argumentResolver(dfo.reject));
                return dfo.promise;
            }
            options = extend({
            }, that.defaults, settings, {
                beforeSend: eventFactory.beforeSendMethod
            });
            type = options.type.toLowerCase();
            return this.responseQueue.addToQueue(type, url, options);
        };
        Data.config = config;
        return Data;
    })();
    exports.Data = Data;    
    _.extend(Data.prototype, Events);
    _.extend(DataFacade.prototype, Data.prototype);
    jQuery.ajax = (Data).prototype.ajax;
})
//@ sourceMappingURL=main.js.map
;
define('thrust/data', ['thrust/data/main'], function (main) { return main; });

define('thrust/dom/main',["require", "exports", './subjquery', 'thrust/util', 'thrust/log', 'thrust/facade', 'has', 'thrust/instance', './config'], function(require, exports, __subjquery__, __util__, __log__, __facade__, __has__, __instance__, __config__) {
    
    var subjquery = __subjquery__;

    var tQuery = subjquery.tQuery;
    var util = __util__;

    var _ = util._;
    var log = __log__;

    var facade = __facade__;

    var has = __has__;

    var instance = __instance__;

    var config = __config__;

    exports.className = 'Dom';
    var format = util.format, extend = _.extend, bind = _.bind, hasOwn = Object.prototype.hasOwnProperty, isObject = _.isObject, slice = Array.prototype.slice, when = util.when, isArray = _.isArray;
    var DomFacade = (function () {
        var domFacade = facade.createFacade(function (mod, parent) {
            this.name = parent.name;
            this.__conventions = parent.__conventions;
            this.context = tQuery(document, undefined, this.name);
        });
        domFacade.prototype.init = function (fake) {
            this._internalEvents = this._internalEvents || [];
            true && log.debug(format('Dom[{0}]: Initalizing {1}Dom facade', this.name, fake ? 'fake ' : ''));
            return this;
        };
        domFacade.prototype.start = function (m) {
            true && log.debug(format('Dom[{0}]: Starting Dom facade', this.name));
            return null;
        };
        domFacade.prototype.stop = function (m) {
            true && log.debug(format('Dom[{0}]: Stopping Dom facade', this.name));
            for(var i = this._internalEvents.length - 1; i >= 0; i--) {
                var sub = this._internalEvents[i];
                this._internalEvents.splice(i, 1);
                sub.context.off.apply(this, (isArray(sub)) ? sub : (isArray(sub.args)) ? sub.args : []);
            }
            return null;
        };
        domFacade.prototype.destroy = function (m) {
            true && log.debug(format('Dom[{0}]: Destroying Dom facade', this.name));
            delete this._internalEvents;
            return null;
        };
        return domFacade;
    })();
    var Dom = (function () {
        function Dom(name, mediator) {
            if(!name) {
                throw new Error('Dom: module name must be defined.');
            }
            true && log.debug('Data: Creating new Data');
            this.mediator = mediator;
            this._callbacks = (mediator)._callbacks;
            this.initEvents();
            this.name = name;
            var that = this;
            instance.fetchInstance(name).promise.then(function (thrust) {
                var mod = {
                }, facade = that.createFacade(thrust, mod, {
                });

            });
        }
        Dom.prototype.initEvents = function () {
        };
        Dom.prototype.extend = function (to, init) {
            return null;
        };
        Dom.prototype.subscribe = function (events, callback, context, once) {
        };
        Dom.prototype.unsubscribe = function (events, callback, context) {
        };
        Dom.prototype.once = function (events, callback, context) {
        };
        Dom.config = config;
        Dom.prototype.createFacade = function (thrust, mod, facades) {
            if(facades.dom && !(facades.dom instanceof DomFacade)) {
                throw new Error('"dom" is a reserved property');
            }
            var dom;
            if(facades.dom) {
                facades.dom.updateFacade(mod, this);
                dom = facades.dom;
            } else {
                dom = facades.dom = new DomFacade(mod, this);
            }
            return dom;
        };
        return Dom;
    })();
    exports.Dom = Dom;    
})
//@ sourceMappingURL=main.js.map
;
define('thrust/dom', ['thrust/dom/main'], function (main) { return main; });

define('thrust/template/main',["require", "exports", 'thrust/util', 'domReady', 'thrust/facade', './config'], function(require, exports, __util__, __domReady__, __facade__, __config__) {
    
    var util = __util__;

    var _ = util._;
    
    
    var domReady = __domReady__;

    var facade = __facade__;

    var config = __config__;

    exports.className = 'Template';
    config;
    var LONG = 'long', SHORT = 'short', ID = 'id', deepCopy = _.merge, format = util.format, each = _.each, bind = _.bind, when = util.when, reduce = _.reduce, memoize = _.memoize, map = _.map, extend = _.extend, getLongName = function (name, type) {
        var that = this, result = (that.shortName(name) + '.' + (type || that.config.defaultType) + that.config.extension).toLowerCase();
        return result;
    };
    var getShortName = function (name) {
        var that = this, result = reduce(that.templateTypes, function (memo, x) {
return memo.replace('.' + x.toLowerCase() + that.config.extension, '');        }, name.toLowerCase()).toLowerCase();
        return result;
    };
    var getTemplateId = function (name) {
        var that = this, result = that.shortName(name).replace(/\//g, '-');
        return result;
    };
    var Template = (function () {
        function Template(config, data) {
            var that = this, templateConfig = this.config = config.template;
            that.templateTypes = map(templateConfig.types, function (x, i) {
                return i;
            });
            that.templates = {
                long: {
                },
                short: {
                },
                id: {
                }
            };
            that.longName = memoize(bind(getLongName, that));
            that.shortName = memoize(bind(getShortName, that));
            that.templateId = memoize(bind(getTemplateId, that));
            that.engines = {
            };
            that.data = data;
            require([
                (templateConfig.templatePaths[templateConfig.defaultType] || 'thrust/template/' + templateConfig.defaultType)
            ], function (engine) {
                that.engines[templateConfig.defaultType] = engine;
                domReady(function () {
                    (_(document.getElementsByTagName('script'))).filter(function (x) {
                        return !!x.getAttribute('data-template');
                    }).each(bind(that.createFromDomNode, that));
                });
            });
        }
        Template.prototype.get = function (name) {
            var template = null, that = this, templates = that.templates;
            if(template = templates.long[that.longName(name)]) {
                return template;
            } else {
                if(template = templates.short[that.shortName(name)]) {
                    return template;
                } else {
                    if(template = templates.id[that.templateId(name)]) {
                        return template;
                    }
                }
            }
            return null;
        };
        Template.prototype.set = function (name, type, compiledTemplate, html) {
            var that = this, shortName = that.shortName(name), templateId = that.templateId(name), longName = that.longName(name, type), templates = that.templates;
            templates.long[longName] = templates.short[shortName] = templates.id[templateId] = {
                name: name,
                shortName: name,
                id: templateId,
                type: type,
                html: html,
                compiled: compiledTemplate
            };
        };
        Template.prototype.has = function (name) {
            var that = this;
            return !!that.get(name);
        };
        Template.prototype.newTemplate = function (name, type, html, engine) {
            var that = this, template = that.get(name);
            if(!template) {
                if(type == 'precompiled') {
                    that.set(name, type, html, html.toString());
                } else {
                    var templatingMethod;
                    var compiledTemplate = this.compile(html, engine);
                    that.set(name, type, compiledTemplate, html);
                }
            }
            return that.get(name);
        };
        Template.prototype.compile = function (html, engine) {
            var that = this, templatingMethod;
            if(!engine) {
                engine = that.engines[that.config.defaultType];
            }
            if(typeof engine === 'function') {
                templatingMethod = engine;
            } else {
                if(typeof engine.template === 'function') {
                    templatingMethod = engine.template;
                }
            }
            return templatingMethod(html);
        };
        Template.prototype.fetch = function (name, type) {
            var that = this, type = type || that.config.defaultType, shortName = that.shortName(name), longName = that.longName(name, type), template;
            var defer = when.defer();
            if(template = that.get(name)) {
                defer.resolve(template);
                return defer.promise;
            }
            that.data.get(that.config.baseUrl + longName, {
                contentType: 'text/plain',
                dataType: 'text',
                silent: true
            }).then(when.apply(function (data) {
                if(type == 'precompiled') {
                    var template = that.newTemplate(name, type, data);
                    defer.resolve(template);
                } else {
                    if(that.engines[type]) {
                        var template = that.newTemplate(name, type, data, that.engines[type]);
                        defer.resolve(template);
                    } else {
                        require([
                            (that.config.templatePaths[type] || 'thrust/template/' + type)
                        ], function (engine) {
                            that.engines[type] = engine;
                            var template = that.newTemplate(name, type, data, engine);
                            defer.resolve(template);
                        });
                    }
                }
            }), defer.reject);
            return defer.promise;
        };
        Template.prototype.createFromDomNode = function (element) {
            var that = this;
            that.newTemplate(element.getAttribute('data-template'), element.getAttribute('data-type'), element.text);
        };
        Template.prototype.createFacade = function (thrust, mod, facades) {
            var templateInstance = thrust.template;
            var facade = facades.template = new TemplateFacade(mod, this);
            mod.templates = {
                fetch: bind(templateInstance.fetch, templateInstance),
                get: bind(templateInstance.get, templateInstance),
                has: bind(templateInstance.has, templateInstance)
            };
            return facade;
        };
        Template.config = config;
        return Template;
    })();
    exports.Template = Template;    
    var TemplateFacade = (function () {
        var templateFacade = facade.createFacade(function (module, parent) {
            this.name = module.name + '-template';
            this.module = module;
            this.parent = parent;
            this.__conventions = parent.__conventions;
            extend(this, {
                fetch: bind(parent.fetch, parent),
                get: bind(parent.get, parent),
                has: bind(parent.has, parent)
            });
        });
        return templateFacade;
    })();
})
//@ sourceMappingURL=main.js.map
;
define('thrust/template', ['thrust/template/main'], function (main) { return main; });

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
            true && log.debug(format('Firing spa "{0}" with [{1}]', event, toArray(arguments).join(',')));
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
                    true && log.debug(format('Firing spa "{0}" with [{1}]', event, toArray(arguments).join(',')));
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
