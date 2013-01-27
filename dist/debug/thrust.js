/*! thrust-js - v0.1.5 - 2013-01-27 */
define('thrust/util/main',["require", "exports", 'lodash', 'underscore.string', 'uuid', 'when', 'when/apply', 'when/delay', 'when/timeout', 'when/parallel', 'when/pipeline', 'when/sequence', 'when/cancelable'], function(require, exports, ______, ___s__, __uuid__, __w__, __whenApply__, __whenDelay__, __whenTimeout__, __whenParallel__, __whenPipeline__, __whenSequence__, __whenCancelable__) {
    /// <reference path="../../../lib/DefinitelyTyped/requirejs/require.d.ts" />
    // Disabled until TS supports module per file in some way (ie exports is exports.<export> not  exports.moduleName.<export>)
    /*export module util {*/
    var __ = ______;

    var _s = ___s__;

    var uuid = __uuid__;

    
    __.mixin(_s);
    exports._ = __;
    //#region function
    var slice = Array.prototype.slice;
    /**
    A function that does nothing, or no operation.  Hence the name noop.
    
    @method noop
    **/
    function noop() {
    }
    exports.noop = noop;
    var propertyIsEnumerable = noop.propertyIsEnumerable;
    /**
    Attempts to invoke, similar to _.invoke, but in this case it verifies that the property exist,
    and also verifies that it is a function, and not the noop method available in thrust.
    
    The intent is a method that allows override of functions, without creating custom code.
    
    @method saveInvoke
    @param {Array|Object} collection The container that has the items
    @param {String|Function} method The method name on every item, or the method to invoke against each item.
    @param {Object} [args]* The additional arguments to pass onto the method.
    **/
    function safeInvoke(collection, methodName) {
        var args = [];
        for (var _i = 0; _i < (arguments.length - 2); _i++) {
            args[_i] = arguments[_i + 2];
        }
        /*jshint bitwise:false */
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
            var props = exports._.keys(iteratee), propIndex = -1, length = props.length;
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
    /**
    * Constructor used to beget objects that wire needs to create using new.
    * @param ctor {Function} real constructor to be invoked
    * @param args {Array} arguments to be supplied to ctor
    */
    function DynamiclyCreated(ctor, args) {
        return ctor.apply(this, args);
    }
    /**
    * Creates an object by either invoking ctor as a function and returning the result,
    * or by calling new ctor().  It uses a simple heuristic to try to guess which approach
    * is the "right" one.
    *
    * @param ctor {Function} function or constructor to invoke
    * @param args {Array} array of arguments to pass to ctor in either case
    *
    * @returns The result of invoking ctor with args, with or without new, depending on
    * the strategy selected.
    */
    function instantiate(ctor, args, name) {
        DynamiclyCreated.prototype = ctor.prototype;
        DynamiclyCreated.prototype.constructor = ctor;
        var begotten = new DynamiclyCreated(ctor, args);
        DynamiclyCreated.prototype = void 0;
        return begotten;
    }
    exports.instantiate = instantiate;
    /**
    Flatten and filter arrays down to just the existing promises.
    
    @method flattenToPromises
    @param {Array} Array to flatten, and filter.
    @returns {Array of Promises}
    **/
    function flattenToPromises(array) {
        return exports._.flatten(array).filter(function (x) {
            return when.isPromise(x);
        });
    }
    exports.flattenToPromises = flattenToPromises;
    //#endregion
    //#region object
    /**
    Inverts an object.  The keys become values, and the values become keys.
    Does not do any copying.
    
    @method invert
    @param {Object} obj The object to invert.
    @returns {Object} The inverted object.
    **/
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
    //#endregion
    //#region type.ts
    /**
    Checks is the object is array like, like the aruguments object, but not a string, oe array.
    jQuery objects for example would report as array like.
    As well as knockout observable arrays report as array like.
    
    @method isArrayLike
    @param {Object} o The object to check
    @returns {Boolean} Is it true or false.
    **/
    function isArrayLike(o) {
        return (o && !exports._.isString(o) && o.length !== undefined) || false;
    }
    exports.isArrayLike = isArrayLike;
    /**
    Checks if the given object is array or array like.
    
    @method isArrayOrArrayLike
    @param {Object} o The object to check
    @returns {Boolean} Is it true or false.
    **/
    function isArrayOrArrayLike(o) {
        return exports._.isArray(o) || (isArrayLike(o));
    }
    exports.isArrayOrArrayLike = isArrayOrArrayLike;
    //#endregion
    //#region uuid
        var guidRegex = /^(\{{0,1}([0-9a-fA-F]){8}-([0-9a-fA-F]){4}-([0-9a-fA-F]){4}-([0-9a-fA-F]){4}-([0-9a-fA-F]){12}\}{0,1})$/, emtptyGuid = '00000000-0000-0000-0000-000000000000';
    /**
    Returns a new sudo guid, limiations in JavaScript make must more reliable guids fairly difficult to create.
    
    @for thrust.util
    @method newGuid
    @returns {Guid} The new guid.
    **/
    function newGuid() {
        return uuid.v4();
    }
    exports.newGuid = newGuid;
    /**
    Returns an empty guid.
    
    @method emptyGuid
    @returns {Guid} The emtpty guid.
    **/
    function emptyGuid() {
        return emtptyGuid;
    }
    exports.emptyGuid = emptyGuid;
    /**
    Checks if the given string is a guid.
    
    @method isGuid
    @param {Guid} guid
    @returns {Boolean} If the guid is a guid or not.
    **/
    function isGuid(guid) {
        return exports._.isString(guid) ? guidRegex.test(guid) : false;
    }
    exports.isGuid = isGuid;
    /**
    Checks if the Guid is an Empty Guid
    
    @method isEmptyGuid
    @param {Guid} guid
    @returns {Boolean} If the guid is a guid or not.
    **/
    function isEmptyGuid(guid) {
        return guid === emtptyGuid;
    }
    exports.isEmptyGuid = isEmptyGuid;
    //#endregion
    //#region string
        var objectCurlyRegex = /\{\{|\}\}|\{(.*?)\}/g, numberCurlyRegex = /\{\{|\}\}|\{(\d+)\}/g;
    /**
    C# style string format.
    
    @for thrust.util
    @method format
    **/
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
    //#endregion
    //#region url
        var doubleSlashRegex = /\/\//g, r20 = /%20/g, rbracket = /\[\]$/;
    /**
    jQuery param method to encode form parameters.
    
    @for thrust.util.url
    @method param
    **/
    function param(a, traditional) {
        var prefix, s = [], add = function (key, value) {
            // If value is a function, invoke it and return its value
            value = exports._.isFunction(value) ? value() : (value == null ? "" : value);
            s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value);
        };
        // Set traditional to true for jQuery <= 1.3.2 behavior.
        /*if (traditional === undefined)
        {
        // TODO Support for traditionalEncoding
        //traditional = !!m.config().traditionalEncoding;
        }*/
        // If an array was passed in, assume that it is an array of form elements.
        if(isArrayOrArrayLike(a)) {
            // Serialize the form elements
            exports._.each(a, function (x) {
                add(x.name, x.value);
            });
        } else {
            // If traditional, encode the "old" way (the way 1.3.2 or older
            // did it), otherwise encode params recursively.
            for(prefix in a) {
                buildParams(prefix, a[prefix], traditional, add);
            }
        }
        // Return the resulting serialization
        return s.join("&").replace(r20, "+");
    }
    exports.param = param;
    function buildParams(prefix, obj, traditional, add) {
        if(exports._.isArray(obj)) {
            // Serialize array item.
            exports._.each(obj, function (i, v) {
                if(traditional || rbracket.test(prefix)) {
                    // Treat each array item as a scalar.
                    add(prefix, v);
                } else {
                    // If array item is non-scalar (array or object), encode its
                    // numeric index to resolve deserialization ambiguity issues.
                    // Note that rack (as of 1.0.0) can't currently deserialize
                    // nested arrays properly, and attempting to do so may cause
                    // a server error. Possible fixes are to modify rack's
                    // deserialization algorithm or to provide an option or flag
                    // to force array serialization to be shallow.
                    buildParams(prefix + "[" + (typeof v === "object" || exports._.isArray(v) ? i : "") + "]", v, traditional, add);
                }
            });
        } else if(!traditional && obj != null && typeof obj === "object") {
            // Serialize object item.
            for(var name in obj) {
                buildParams(prefix + "[" + name + "]", obj[name], traditional, add);
            }
        } else {
            // Serialize scalar item.
            add(prefix, obj);
        }
    }
    /**
    Cleans up double slashs in a url, used by thrust/data
    
    @method cleanUrl
    @param {String} url The url to clean
    @retrusn {String} The cleaned url
    **/
    function cleanUrl(url) {
        return url.replace(doubleSlashRegex, '/');
    }
    exports.cleanUrl = cleanUrl;
    /**
    Checks for existance of application path in the url, or http if the url is supposed to go to another location.
    
    @method fixupUrl
    @param {String} url The url to fixup
    @retrusn {String} The fixed url
    **/
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
    //#endregion
    //#region when
    var w = __w__;

    //import w = module('when/debug');
    var whenApply = __whenApply__;

    var whenDelay = __whenDelay__;

    var whenTimeout = __whenTimeout__;

    var whenParallel = __whenParallel__;

    var whenPipeline = __whenPipeline__;

    var whenSequence = __whenSequence__;

    var whenCancelable = __whenCancelable__;

    /**
    @module thrust.util
    @submodule thrust.util.when
    **/
    (function (when) {
        when.when = w;
        /**
        when.apply, used to apply when results over a function, similar to jQuerys Deferred.
        See for more information: [https://github.com/cujojs/when/wiki/when-apply](https://github.com/cujojs/when/wiki/when-apply)
        
        @for thrust.util.when
        @method when.apply
        **/
        when.apply = whenApply;
        /**
        when.delay, creates a promise that resolves in x ms, using setTimeout.
        See for more information: [https://github.com/cujojs/when/wiki/when-delay](https://github.com/cujojs/when/wiki/when-delay)
        
        @method when.delay
        **/
        when.delay = whenDelay;
        /**
        when.timeout, creates a promise that will timeout if x ms if not resolved.
        See for more information: [https://github.com/cujojs/when/wiki/when-timeout](https://github.com/cujojs/when/wiki/when-timeout)
        
        @method when.timeout
        **/
        when.timeout = whenTimeout;
        /**
        when.parallel
        See for more information: [https://github.com/cujojs/when/wiki/when-parallel](https://github.com/cujojs/when/wiki/when-parallel)
        
        @method when.parallel
        **/
        when.parallel = whenParallel;
        /**
        when.pipeline
        See for more information: [https://github.com/cujojs/when/wiki/when-pipeline](https://github.com/cujojs/when/wiki/when-pipeline)
        
        @method when.pipeline
        **/
        when.pipeline = whenPipeline;
        /**
        when.sequence
        See for more information: [https://github.com/cujojs/when/wiki/when-sequence](https://github.com/cujojs/when/wiki/when-sequence)
        
        @method when.sequence
        **/
        when.sequence = whenSequence;
        /**
        when.cancelable
        See for more information: [https://github.com/cujojs/when/wiki/when-cancelable](https://github.com/cujojs/when/wiki/when-cancelable)
        
        @method when.cancelable
        **/
        when.cancelable = whenCancelable;
        when.all = when.when.all;
        when.any = when.when.any;
        when.chain = when.when.chain;
        when.defer = when.when.defer;
        when.isPromise = when.when.isPromise;
        when.map = when.when.map;
        when.reduce = when.when.reduce;
        when.some = when.when.some;
        when.resolve = when.when.resolve;
        when.reject = when.when.reject;
        when.join = when.when.join;
    })(exports.when || (exports.when = {}));
    var when = exports.when;
    //#endregion
    //#region camelCase
        var rmsPrefix = /^-ms-/, rdashAlpha = /-([\da-z])/gi, fcamelCase = function (all, letter) {
        return (letter + "").toUpperCase();
    };
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
    //#endreg
    })
//@ sourceMappingURL=main.js.map
;
define('thrust/util', ['thrust/util/main'], function (main) { return main; });

define('thrust/capsule',["require", "exports", 'thrust/util', './log', 'has'], function(require, exports, __util__, __log__, __has__) {
    /// <reference path="../../lib/DefinitelyTyped/requirejs/require.d.ts" />
    // Disabled until TS supports module per file in some way (ie exports is exports.<export> not  exports.moduleName.<export>)
    /*export module instance {*/
    
    var util = __util__;

    var _ = util._;
    var log = __log__;

    var has = __has__;

    var format = util.format, each = _.each, isObject = _.isObject, extend = _.extend, when = util.when, flatten = _.flatten, pluck = _.pluck, flattenToPromises = util.flattenToPromises, thrustCache = {
    }, __optionalMethods = [
        // Optional methods that may be on a module
        'start', 
        'stop', 
        'ready', 
        'config', 
        
    ], __requiredMethods = [
        // Required methods that must be on every module
        'init', 
        'destroy', 
        
    ];
    /**
    Moves all properties, that should exist outside of the module, into a private object for holding.
    
    @method moveToThrustCache
    @private
    @param {Object} from Object to extract items from
    @param {Object} to Object to place items on
    @param {Array} list Items to move from to the other object
    **/
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
    /**
    The module is the heart of the thrust, every module gets one facade per module.
    
    @module thrust
    @class thrust.Module
    @param {Thrust} thrust The thrust instance
    @param {Object} def The module definition
    @param {String} [name] The module name.
    **/
    var Module = (function () {
        //var Module =
        function Module(thrust, def, name) {
            name = this.name = (name || def.name);
            if(typeof def === 'function') {
                def = def(name);
                def.name = name;
            }
            var mid = this.mid = thrust.name + ':' + name;
            var tCache = thrustCache[def.hash || mid];
            // Clear any potential cached config objects, to make sure they refresh if the module is redefined.
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
            // Modules must have an init method and a destroy method, it's up to the module developer to populate these methods.
            for(var i = 0, iLen = __requiredMethods.length; i < iLen; i++) {
                if(!def[__requiredMethods[i]]) {
                    throw new Error(format('Required "{0}" method not found on module "{1}"!', __requiredMethods[i], name));
                }
            }
            // If the module name is undefined, bring the name into the module.
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
            // Move all special properties off to the thrust's internal method.
            moveToThrustCache(this.instance, thrustModuleCacheItem, __requiredMethods);
            moveToThrustCache(this.instance, thrustModuleCacheItem, __optionalMethods);
            moveToThrustCache(this.instance, thrustModuleCacheItem, thrust.__conventionPluckPropertiesCache);
            util.safeInvoke(thrust, 'createFacade', thrust, this.instance, facades);
            this.__namespace = getEventNamespace(this.instance.name);
            this.thrust = thrust;
            this.cache = thrustCache[mid];
        }
        Module.thrustCache = thrustCache;
        Module.prototype.convention = /**
        Getter/Setter for convention methods.
        Gets the value convention property (defined in the properties array of a facade).
        Sets the value of a convention property (for storing convention configuration)
        
        @param {String} property The property to get or set
        @param {object} [value] The value to set
        @method convention
        @returns {Object} The valaue.
        **/
        function (property, value) {
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
        Module.prototype.thrustCreate = /**
        Injects this module into the given thrust instance.
        
        @method thrustCreate
        @param {Thrust} thrust The thrust instance.
        **/
        function (thrust) {
            thrust.__injectModule(this);
        };
        Module.prototype.thrustCall = /**
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
        function (method, facadeAfter, args) {
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
        Module.prototype.start = /**
        Start the module, inside the thrust container it was created on.
        
        @method start
        **/
        function () {
            var that = this;
            return that.thrust.start(that.name);
        };
        Module.prototype.stop = /**
        Stop the module, inside the thrust container it was created on.
        
        @method start
        **/
        function () {
            var that = this;
            return that.thrust.stop(that.name);
        };
        return Module;
    })();
    exports.Module = Module;    
    /**
    AMD API
    load
    
    Handles fetching of a module instance.
    Format:
    thrust/capsule!{instance}:{moduleName}
    
    @method load
    @static
    @param {String} name The name of the instance that is being fetched
    @param {Function} parentRequire the require method to be loaded
    @param {Function} load Allows the load to inform that AMD for the value to hand off
    @param {Object} config The custom configuration.
    **/
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
    /// <reference path="interfaces/thrust.d.ts" />
    /// <reference path="../../lib/DefinitelyTyped/requirejs/require.d.ts" />
    // Disabled until TS supports module per file in some way (ie exports is exports.<export> not  exports.moduleName.<export>)
    /*export module instance {*/
    /**
    Gets the thrust instances.
    
    @module thrust
    **/
    var util = __util__;

    var when = util.when;
    var capsule = __capsule__;

    /**
    The available thrust instances
    index by name
    
    @for thrust.instance
    @property instances
    @private
    **/
    exports.instances = {
    };
    /**
    The loading thurst instances.
    index by name
    
    @property loadingInstances
    @private
    **/
    exports.loadingInstances = {
    };
    /**
    Gets a named thrust stance if it exists.
    
    @method getInstance
    @static
    @param {String} name The instance name
    @returns {Thrust} The thrust instance
    **/
    function getInstance(name) {
        return exports.instances[name] || null;
    }
    exports.getInstance = getInstance;
    /**
    Fetchs a named thrust stance if it exists.
    This loads asyncronously, as the instance may not be loaded
    
    @method fetchInstance
    @static
    @private
    @param {String} name The instance name
    @returns {Promise} To a thrust instance spec
    **/
    function fetchInstance(name) {
        var defer = exports.loadingInstances[name] || (exports.loadingInstances[name] = when.defer());
        return defer;
    }
    exports.fetchInstance = fetchInstance;
    /**
    Clears the Thrust Instance cache, this is used for unit testing, and clearing all the cache data each run.
    
    @method clearCache
    @static
    @private
    **/
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
    /*}*/ })
//@ sourceMappingURL=instance.js.map
;
define('thrust/config',["require", "exports", './instance'], function(require, exports, __thrustInstance__) {
    /// <reference path="../../lib/DefinitelyTyped/requirejs/require.d.ts" />
    // Disabled until TS supports module per file in some way (ie exports is exports.<export> not  exports.moduleName.<export>)
    /*export module config {*/
    
    var thrustInstance = __thrustInstance__;

    /**
    Provides thrust configuration
    
    @module thrust
    @submodule thrust.config
    **/
    /**
    This property, tells the framework if it should throw errors or not.
    In production it's recommended not to throw errors, that way if a component fails
    there is a chance the application can still recover.
    
    @for thrust.config
    @property throwErrors
    @readOnly
    @type {Boolean}
    @default false
    **/
    exports.throwErrors = true;
    /**
    Tells the framework to run in async mode, this may delay start up, but will make image loading and inital running appear faster.
    
    @property async
    @readOnly
    @type {Boolean}
    @default true
    **/
    exports.async = true;
    /**
    Tells thrust to expose each instance as a global, this allows legacy components to utilize parts of thrust, or easily
    get at your thrust instance during debugging.
    
    @property exposeGlobals
    @readOnly
    @type {Boolean}
    @default true
    **/
    exports.exposeGlobals = true;
    exports.url = {
        path: /**
        This property, gives the framework it's default path, if different than '/'
        
        @property url.path
        @readOnly
        @type {String}
        @default "/"
        **/
        '/',
        traditionalEncoding: /**
        This property, tells the framework how it should encode array form data.
        In general, for ASP.NET based applications, traditional should be true.
        For Ruby/Python based applications, this should be false.
        
        @property url.traditionalEncoding
        @readOnly
        @type {Boolean}
        @default false
        **/
        true
    };
    exports.log = {
        level: /**
        This lends to the log level of thrust.
        
        ERROR: 1
        WARN: 2
        INFO: 3
        DEBUG: 4
        
        @property log.level
        @readOnly
        @type {String}
        @default 1
        **/
        4,
        enabled: /**
        This toggles enabling on or off.
        
        @property log.enabled
        @readOnly
        @type {Boolean}
        @default false
        **/
        true
    };
    /**
    Plugins for thrust to load, override with your own set if you have a different set.
    
    @property plugins
    @readOnly
    @type {Array}
    **/
    exports.plugins = [];
    /**
    * The set of modules to preload with the inital wireup of the Thrust instance.
    *
    * Accepts the module path a string or the module as an object in the following format.
    *   Where args will be handed off to the module life cycle methods.
    *
    *    {
    *        path: '',
    *        args: []
    *    }
    *
    * @property modules
    * @readOnly
    * @type {Array}
    **/
    exports.modules = [];
    /**
    Used internally by thrust to determine if the life-cycle is controlled by thrust, or a parent instance.
    
    @property childInstance
    @readOnly
    @type {Boolean}
    **/
    exports.childInstance = false;
    /**
    Used internally by thrust to determine if thrust should control the life-cycle, or the consumer
    
    @property automaticLifecycle
    @readOnly
    @type {Boolean}
    **/
    exports.automaticLifecycle = true;
    /**
    Used internally by thrust to determin if the thrust instance should automatically start upon creation.
    
    @property autoStart
    @readOnly
    @type {Boolean}
    **/
    exports.autoStart = false;
    /**
    Define the conventions that unique to thrust, they are not specific to any one plugin.
    
    @property conventions
    @readOnly
    @type {Array}
    **/
    exports.conventions = [
        'thrust/convention/container', 
        'thrust/convention/autostart', 
        'thrust/convention/dependent.modules'
    ];
    /**
    AMD API
    load
    
    Handles fetching of a current config for the current thrust instance, or the config of the given plugin.
    Adding the : character requests a specific config plugin.
    thrust/config!global = thrust!global:config = Thrust instance config from the instance named global.
    
    @method load
    @static
    @param {String} name The name of the instance that is being fetched
    @param {Function} parentRequire the require method to be loaded
    @param {Function} load Allows the load to inform that AMD for the value to hand off
    @param {Object} config The custom configuration.
    **/
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
    /*}*/ })
//@ sourceMappingURL=config.js.map
;
define('thrust/log',["require", "exports", './config', 'thrust/util'], function(require, exports, __tConfig__, __util__) {
    /// <reference path="../../lib/DefinitelyTyped/requirejs/require.d.ts" />
    // Disabled until TS supports module per file in some way (ie exports is exports.<export> not  exports.moduleName.<export>)
    /*export module instance {*/
    var tConfig = __tConfig__;

    var util = __util__;

    /**
    A basic logger for the thrust framework.
    Disables debug logging when thrust is not in debug mode.
    
    @module thrust
    
    **/
    
    // Log levels
    var LEVEL = {
        DEBUG: 4,
        INFO: 3,
        WARN: 2,
        ERROR: 1
    };
    // Declare our variables
        var console = window.console, timers = {
    }, cLog = (console && console.log) || false, cWarn = (console && console.warn) || false, cInfo = (console && console.info) || false, cError = (console && console.error) || false, cTime = (console && console['time']) || false, cTimeEnd = (console && console['timeEnd']) || false, slice = Array.prototype.slice, configLevel = tConfig.log.level || LEVEL.ERROR, logLevel = LEVEL[configLevel] || (typeof configLevel === 'string' && LEVEL[configLevel.toUpperCase()]) || (typeof configLevel === 'number' && configLevel) || LEVEL.ERROR;
    // Various loggers to handle IE8/9 support.
    var logRunner = function (consoleMethod, logType) {
        // Show logs when enabled or if they are errors
        var args = slice.call(arguments, 1);
        if(consoleMethod) {
            if(consoleMethod.apply) {
                consoleMethod.apply(console, args);
            } else {
                consoleMethod(args);
            }
        } else if(!consoleMethod && cLog) {
            if(cLog.apply) {
                cLog.apply(console, args);
            } else {
                cLog(args);
            }
        }
    };
    /**
    A basic logger for the thrust framework.
    Disables debug logging when thrust is not in debug mode.
    
    @class thrust.Log
    **/
    /**
    Logs a debug type message using the console log method
    
    @method debug
    **/
    function debug() {
        var args = [];
        for (var _i = 0; _i < (arguments.length - 0); _i++) {
            args[_i] = arguments[_i + 0];
        }
        // Short circuit if logging is disabled.  This is as close to noop as we can get, incase there is a direct reference to this method.
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
    /**
    Logs a info type message using the console info method if available, otherwise it uses the console log method.
    
    @method info
    **/
    function info() {
        var args = [];
        for (var _i = 0; _i < (arguments.length - 0); _i++) {
            args[_i] = arguments[_i + 0];
        }
        // Short circuit if logging is disabled.  This is as close to noop as we can get, incase there is a direct reference to this method.
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
    /**
    Logs a warn type message using the console warn method if available, otherwise it uses the console log method.
    
    @method warn
    **/
    function warn() {
        var args = [];
        for (var _i = 0; _i < (arguments.length - 0); _i++) {
            args[_i] = arguments[_i + 0];
        }
        // Short circuit if logging is disabled.  This is as close to noop as we can get, incase there is a direct reference to this method.
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
    /**
    Logs a error type message using the console error method if available, otherwise it uses the console log method.
    
    @method error
    **/
    function error() {
        var args = [];
        for (var _i = 0; _i < (arguments.length - 0); _i++) {
            args[_i] = arguments[_i + 0];
        }
        // Short circuit if logging is disabled.  This is as close to noop as we can get, incase there is a direct reference to this method.
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
    /**
    Logs a time type message using the console time method if available, otherwise it uses the console log method.
    
    @method time
    **/
    function time(message) {
        var args = [];
        for (var _i = 0; _i < (arguments.length - 1); _i++) {
            args[_i] = arguments[_i + 1];
        }
        // Short circuit if logging is disabled.  This is as close to noop as we can get, incase there is a direct reference to this method.
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
    /**
    Logs a timeEnd type message using the console timeEnd method if available, otherwise it uses the console log method.
    Causes the timer to end, for the given message.
    
    @method timeEnd
    **/
    function timeEnd(message) {
        var args = [];
        for (var _i = 0; _i < (arguments.length - 1); _i++) {
            args[_i] = arguments[_i + 1];
        }
        // Short circuit if logging is disabled.  This is as close to noop as we can get, incase there is a direct reference to this method.
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
    /// <reference path="interfaces/thrust.d.ts" />
    /// <reference path="../../lib/DefinitelyTyped/requirejs/require.d.ts" />
    // Disabled until TS supports module per file in some way (ie exports is exports.<export> not  exports.moduleName.<export>)
    /*export module instance {*/
    
    var requireModule = __requireModule__;

    var util = __util__;

    var _ = util._;
    
    var config = __config__;

    var tm = __tm__;

    var instance = __instance__;

    var slice = Array.prototype.slice, isArray = _.isArray, toArray = _.toArray, isFunction = _.isFunction, each = _.each, map = _.map, any = _.any, all = _.all, when = util.when, extend = _.extend, flatten = _.flatten, pluck = _.pluck, isObject = _.isObject, keys = _.keys, union = _.union;
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
    function mergeSettings(settings) {
        if((settings).__settingsMerged) {
            return settings;
        }
        var requireConfig = requireModule.config(), plugins = [
            'thrust/mediator'
        ].concat(settings.plugins || requireConfig.plugins || config.plugins || []), conventions = [].concat(settings.conventions || requireModule.config().conventions || config.plugins || []);
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
    /**
    Creates a thrust instance, from the given settings.
    Including the plugins.
    
    @method stageTwo
    @param {Object} settings The settints to pass onto the thrust instance being created.
    **/
    function stageTwo(settings) {
        /*jshint loopfunc:true */
        // Get the configuration
                var localConfig = settings, defer = when.defer();
        // Mediator is a required plugin, include all the others in addition to it.
                var plugins = localConfig.plugins, modulesToLoad = // The modules to load
        [], thrustConventions = settings.conventions || [], modulesConfigurations = // The module configuration object
        {
            thrust: 'thrust'
        };
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
            'cfg'
        ], reloop = // We loop through until all the plugins are in proper order.
        true, iLen = modulesToLoad.length, i = 0;
        // Loop through all the plugins until we have a set that will load in proper order.
        while(i < iLen) {
            // The plugin
                        var plugin = modulesToLoad[i], name = // The implied plugin name
            plugin.substring(plugin.lastIndexOf('/') + 1), pluginConfig = // The plugins configuration
            localConfig[name];
            // Check if the plugin has to resolve any other plugins
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
            'thrust', 
            settings.conventions || []
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
            var args = [];
            for (var _i = 0; _i < (arguments.length - 0); _i++) {
                args[_i] = arguments[_i + 0];
            }
            // Get ready to loop
                        var currentPlugin = null, allConventions = [];
            // Loop through all the modules being loaded
            for(var i = 0, iLen = modulesToLoad.length; i < iLen - thrustConventions.length; i++) {
                // Get plugin and configuration
                                var plugin = modulesToLoad[i], mConfig = modulesConfigurations[plugin];
                // Check if we have a configuration object
                if(mConfig) {
                    // Load a new plugin.
                                        var pluginObject = args[i], name = // Get the plugin name
                    plugin.substring(plugin.lastIndexOf('/') + 1), resolveItems = // Resolve all the required items.
                    map(mConfig.resolve, function (x) {
                        return spec[x];
                    });
                    var pluginClass = pluginObject[pluginObject.className];
                    // Instantiate the plugin
                    currentPlugin = spec[name] = util.instantiate(pluginClass, resolveItems);
                    // Setup the conventions
                    currentPlugin.__conventions = [];
                } else // Load all the conventions
                if(currentPlugin) {
                    // Load the conventions into the plugin
                    _.forOwn(args[i], function (x) {
                        return currentPlugin.__conventions.push(x);
                    });
                    // Load the conventions into the thrust instance.
                    _.forOwn(args[i], function (x) {
                        return allConventions.push(x);
                    });
                }
            }
            // The last current plugin, will always be thrust.
            currentPlugin.__conventions = allConventions;
            var thrustConventionDefinitions = args.slice(modulesToLoad.length - thrustConventions.length);
            thrustConventionDefinitions = flatten(map(thrustConventionDefinitions, function (x) {
                return map(x, function (z) {
                    return z;
                });
            }));
            currentPlugin.__thrustConventions = thrustConventionDefinitions;
            allConventions.push.apply(allConventions, thrustConventionDefinitions);
            // Extend thrust with the spec
            extend(currentPlugin, spec);
            defer.resolve(spec);
        }, defer.reject);
        return defer.promise;
    }
    exports.stageTwo = stageTwo;
    /**
    Loads up the default modules as indicated to thrust.
    
    @method stageThree
    @param {Object} context The context to use to load the modules.
    **/
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
            defer.resolve(context);
        }, defer.reject);
        return defer.promise;
    }
    exports.stageThree = stageThree;
})
//@ sourceMappingURL=ignite.js.map
;
define('thrust/main',["require", "exports", 'thrust/util', './log', './instance', './ignite', './capsule', 'domReady', 'has', 'thrust/config'], function(require, exports, __util__, __log__, __thrustInstance__, __igniteSpec__, __m__, __domReady__, __has__, __tConfig__) {
    /// <reference path="interfaces/thrust.d.ts" />
    /// <reference path="../../lib/DefinitelyTyped/requirejs/require.d.ts" />
    // Disabled until TS supports module per file in some way (ie exports is exports.<export> not  exports.moduleName.<export>)
    /*export module instance {*/
    
    
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
    /**
    The thrust application!
    
    @module thrust
    @main thrust
    **/
        var INIT = 'init', START = 'start', READY = 'ready', STOP = 'stop', DESTROY = 'destroy', COUNTDOWN = 'countdown', IGNITE = 'ignite', ORBIT = 'orbit', DEPLOY = 'deploy', DEORBIT = 'deorbit', SPLASHDOWN = 'splashdown', INORBIT = 'inOrbit', memoize = _.memoize, each = _.each, map = _.map, extend = _.extend, when = util.when, bind = _.bind, isArray = _.isArray, slice = Array.prototype.slice, toArray = _.toArray, merge = _.merge, flatten = _.flatten, format = util.format, resolveMethods = [
        INIT, 
        START, 
        READY, 
        STOP, 
        DESTROY
    ], instances = thrustInstance.instances, loadingInstances = thrustInstance.loadingInstances, safeInvoke = util.safeInvoke;
    //#region Runner Factories
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
                    // try to fetch the module.
                    // returning the proper defer in it's place
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
                } else if((conventionCheck && mod.convention(conventionName)) || !mod.convention(conventionName)) {
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
            });
            return results.length && results;
        };
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
        };
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
        };
    });
    function fireThrustEvent(that, event) {
        return function () {
            that.mediator && that.mediator.fire(event);
        };
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
            };
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
    /**
    Gets the modules arguments from the registrations.
    
    If original args contains anything it is passed instead of the registrations.
    If the registrations are in place it will return them.
    
    @method __getModuleArgs
    @static
    @private
    @param {String} instanceName The thrust instance
    @param {String} name The module name
    @param {Array} originalArgs The original arguments passed into the calling method.
    **/
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
    //#endregion
    /**
    The primary thrust class.
    
    @class thrust.Thrust
    @constructor
    @param {String} name The name of this thrust instance
    @returns {Thrust}
    **/
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
        Thrust.prototype.create = /**
        Creates a new thrust module.
        
        @method create
        @param {String} name The unique module name.
        @param {Object} module The module defintion.
        @param {Boolean} preBuild Has this module been prebuilt, in other words has it been created, by wire.js and needs to be injected.
        @returns {Module} The new module instance.
        **/
        function (name, mod, preBuilt) {
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
            // Modules cannot have duplicate names, choose a new one.
            if(that.modules[mod.name]) {
                throw new Error(format('Duplicate module name "{0}".', name));
            }
            // m is the mediators internal module.
            that.modules[mod.name] = mod;
            true && log.info(format('Thrust: Created module "{0}"', name));
            // Notify the mediator that a module has been created.
            that.mediator.fire('thrust/module/create', name);
            if(that && that.started && mod.convention('autoStart')) {
                that.start(mod.name);
            }
            return mod;
        };
        Thrust.prototype.startup = //#region Global Runners
        function (event, eventType) {
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
        Thrust.prototype.countdown = /**
        Begins the countdown to thrusts start.
        Loading can be deferred by returning a promise from any convention, or module method.
        
        @method countdown
        @async
        @returns {Promise} The promise of when the countdown is completed.
        **/
        function (calledByParent) {
            var that = this;
            if(!thrustShouldExecute(that, calledByParent)) {
                return;
            }
            if(that.cfg.automaticLifecycle && (!that.cfg.childInstance)) {
                return Thrust.launchSequence(that, calledByParent);
            }
            return that._countdown(calledByParent);
        };
        Thrust.prototype.ignite = /**
        Begins the ingition as thrust starts up.
        Loading can be deferred by returning a promise from any convention, or module method.
        
        @method ignite
        @async
        @returns {Promise} The promise of when the ingition is completed.
        **/
        function (calledByParent) {
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
        Thrust.prototype.orbit = /**
        Thrust prepares for orbit.
        Loading can be deferred by returning a promise from any convention.
        
        @method orbit
        @async
        @returns {Promise} The promise of when thrust is in orbit.
        **/
        function (calledByParent) {
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
        Thrust.prototype.deploy = /**
        Thrust deploys components in orbit
        Loading can be deferred by returning a promise from any module method.
        
        @method deploy
        @async
        @returns {Promise} The promise of when thrust has fully deployed.
        **/
        function (calledByParent) {
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
        Thrust.prototype.deorbit = /**
        Begins the deorbit as thrust shutdown.
        Shutdown can be deferred by returning a promise from any convention, or module method.
        
        @method deorbit
        @async
        @returns {Promise} The promise of when the ingition is completed.
        **/
        function (calledByParent) {
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
        Thrust.prototype.splashdown = /**
        Begins the splashdown as thrust shutdown.
        Shutdown can be deferred by returning a promise from any convention, or module method.
        
        @method splashdown
        @async
        @returns {Promise} The promise of when the ingition is completed.
        **/
        function (calledByParent) {
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
        Thrust.prototype.__injectModule = //#endregion
        /**
        Injects a preconstructed module into the thrust instance.
        
        @method __injectModule
        @private
        @param {Module} module The module to inject.
        **/
        function (module) {
            this.create(module.name, module, true);
        };
        Thrust.prototype.createModule = /**
        Creates a module from the given definition object, with the given name.
        
        @method createModule
        @param {String} name The module name
        @param {Object} moduleDefn The module definition
        **/
        function (name, moduleDefn) {
            var that = this;
            if(that.modules[name]) {
                return that.modules[name];
            }
            var module = new Module(that, moduleDefn, name);
            that.__injectModule(module);
            return module;
        };
        Thrust.prototype.spawn = /**
        Launches another child module for thrust.
        
        @method spawn
        @param {Object} settings
        @returns {Promise} The promise that resolves once the child instance has fully loaded.  Resolves with the context that contains the thrust instance and all plugins that were loaded.
        **/
        function (settings) {
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
        Thrust.prototype.registerModule = /**
        Registers a specific module name, and arguments.  The arguments will be used when initantiating the module.
        
        @method registerModule
        @param {String} name The module name to assign the arguments with.
        @param {Object*} arguments, additional arguments that will be passed onto the moudle
        **/
        function (name) {
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
        };
        Thrust.launch = /**
        Initalizes a new Thrust instance based on the given settings.
        
        @method launch
        @static
        @param {Object} settings The module to inject
        **/
        function launch(settings, calledByParent) {
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
            // We're only going to expose globals if requested.  This is a potential usecase that may be needed for some teams.
            if(tConfig.exposeGlobals) {
                if(!window['Thrust']) {
                    window['Thrust'] = Thrust;
                }
                pipeline.then(function (context) {
                    window[settings.name] = context;
                });
            }
            return pipeline;
        };
        Thrust.getInstance = /**
        Gets a named thrust stance if it exists.
        
        @method getInstance
        @static
        @param {String} name The instance name
        @returns {Thrust} The thrust instance
        **/
        function getInstance(name) {
            return thrustInstance.getInstance(name);
        };
        Thrust.__fetchInstance = /**
        Fetchs a named thrust stance if it exists.
        This loads asyncronously, as the instance may not be loaded
        
        @method __fetchInstance
        @static
        @private
        @param {String} name The instance name
        @returns {Promise} To a thrust instance spec
        **/
        function __fetchInstance(name) {
            return thrustInstance.fetchInstance(name);
        };
        Thrust.createModule = /**
        Creates a new module and hands it off to the given instance, if that instance exists.
        
        @method createModule
        @static
        @param {String} instanceName The thrust instance name
        @param {String} name The module name
        @param {Object} moduleDefn The module definition
        **/
        function createModule(instanceName, name, moduleDefn) {
            var instance = Thrust.getInstance(instanceName);
            if(instance) {
                var module = new Module(instance, moduleDefn, name);
                instance.__injectModule(module);
                return module;
            }
        };
        Thrust.registerModule = /**
        Registers a specific module name, and arguments.  The arguments will be used when initantiating the module.
        
        @method registerModule
        @static
        @param {String} instanceName The thrust instance the module is to be associated with.
        @param {String} name The module name to assign the arguments with.
        @param {Object*} arguments, additional arguments that will be passed onto the moudle
        **/
        function registerModule(instanceName, name) {
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
        };
        Thrust.__getModuleArgs = __getModuleArgs;
        return Thrust;
    })();
    exports.Thrust = Thrust;    
    /**
    AMD API
    load
    
    Handles fetching of a current thurst instance, by expected name.
    Adding the : character requests a specific plugin.
    thrust!global = Thrust instance
    thrust!global:dom = The thrust dom plugin instance
    
    @method load
    @static
    @param {String} name The name of the instance that is being fetched
    @param {Function} parentRequire the require method to be loaded
    @param {Function} load Allows the load to inform that AMD for the value to hand off
    @param {Object} config The custom configuration.
    **/
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
    /// <reference path="interfaces/thrust.d.ts" />
    /// <reference path="../../lib/DefinitelyTyped/requirejs/require.d.ts" />
    // Disabled until TS supports module per file in some way (ie exports is exports.<export> not  exports.moduleName.<export>)
    /*export module instance {*/
    var util = __util__;

    var _ = util._;
    /**
    A Convention allows thrust to be as extendable as possible, by giving extension points at every step along the way.
    
    @module thrust
    **/
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
    /**
    The convention class, takes an overloaded set of methods, for any method that needs to be overloaded.
    
    @class thrust.Convention
    @constructor
    @param {Object} methods An object of applicable methods.
    **/
    var Convention = (function () {
        function Convention(methodOverrides) {
            _.extend(this, methodOverrides);
            var keys = _.difference(methods, _.intersection(methods, _.keys(methodOverrides)));
            _.each(keys, function (x) {
                if(_.isFunction(this[x])) {
                    // noop is used in safeinvoke, as a safe ignore function, no other noop will work correctly.
                    this[x] = util.noop;
                }
            }, this);
        }
        Convention.prototype.create = /**
        This is called during create of a module, generally used to create a facade, that is then bound to the module.
        @method create
        @optional
        @param {Thrust} thrust The thrust instance.
        @param {Module} module The module instance.
        @param {Object} facades All the facades already attached to the module.
        **/
        function (thrust, mod, facades) {
        };
        Convention.prototype.init = /**
        This method is called during the thrust init phase, or an individual module's init phase
        
        @method init
        @optional
        @param {Object} facades The facades for the module.
        @returns {Promise} A promise may be returned, to delay the next phase from begining.
        **/
        function (mod, facades) {
        };
        Convention.prototype.start = /**
        This method is called during the thrust start phase, or an individual module's start phase
        
        @method start
        @optional
        @param {Object} facades The facades for the module.
        @returns {Promise} A promise may be returned, to delay the next phase from begining.
        **/
        function (mod, facades) {
        };
        Convention.prototype.ready = /**
        This method is called during the thrust ready phase, or an individual module's ready phase
        
        @method ready
        @optional
        @param {Object} facades The facades for the module.
        @returns {Promise} A promise may be returned, to delay the next phase from begining.
        **/
        function (mod, facades) {
        };
        Convention.prototype.stop = /**
        This method is called during the thrust stop phase, or an individual module's stop phase
        
        @method stop
        @optional
        @param {Object} facades The facades for the module.
        @returns {Promise} A promise may be returned, to delay the next phase from begining.
        **/
        function (mod, facades) {
        };
        Convention.prototype.destroy = /**
        This method is called during the thrust destroy phase, or an individual module's destroy phase
        
        @method destroy
        @optional
        @param {Object} facades The facades for the module.
        @returns {Promise} A promise may be returned, to delay the next phase from begining.
        **/
        function (mod, facades) {
        };
        Convention.prototype.countdown = /**
        This is called during the init phase of a Thrust instance.
        @method countdown
        @optional
        @param {Thrust} thrust The thrust instance.
        @returns {Promise} A promise may be returned, to delay the next phase from begining.
        **/
        function (thrust) {
        };
        Convention.prototype.ignite = /**
        This is called during the start phase of a Thrust instance.
        @method ignite
        @optional
        @param {Thrust} thrust The thrust instance.
        @returns {Promise} A promise may be returned, to delay the next phase from begining.
        **/
        function (thrust) {
        };
        Convention.prototype.orbit = /**
        This is called during the ready phase of a Thrust instance.
        @method orbit
        @optional
        @param {Thrust} thrust The thrust instance.
        @returns {Promise} A promise may be returned, to delay the next phase from begining.
        **/
        function (thrust) {
        };
        Convention.prototype.deorbit = /**
        This is called during the stop phase of a Thrust instance.
        @method deorbit
        @optional
        @param {Thrust} thrust The thrust instance.
        @returns {Promise} A promise may be returned, to delay the next phase from begining.
        **/
        function (thrust) {
        };
        Convention.prototype.splashdown = /**
        This is called during the destroy phase of a Thrust instance.
        @method splashdown
        @optional
        @param {Thrust} thrust The thrust instance.
        @returns {Promise} A promise may be returned, to delay the next phase from begining.
        **/
        function (thrust) {
        };
        return Convention;
    })();
    exports.Convention = Convention;    
})
//@ sourceMappingURL=convention.js.map
;
define('thrust/events',["require", "exports", './log', './config', 'has', 'thrust/util'], function(require, exports, __log__, __tConfig__, __has__, __util__) {
    /// <reference path="interfaces/mediator/mediator.d.ts" />
    /// <reference path="interfaces/thrust.d.ts" />
    /// <reference path="../../lib/DefinitelyTyped/requirejs/require.d.ts" />
    // Disabled until TS supports module per file in some way (ie exports is exports.<export> not  exports.moduleName.<export>)
    /*export module instance {*/
    
    //     Backbone.js 0.9.1
    //     (c) 2010-2012 Jeremy Ashkenas, DocumentCloud Inc.
    //     Backbone may be freely distributed under the MIT license.
    //     For all details and documentation:
    //     http://backbonejs.org
    /**
    Thrust Events are based off of the Backbone event model, with special additions.
    
    * Events can be fired asyncronously.
    * Events can be namespaced.
    
    @module thrust
    **/
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
    /**
    Normalizes the given events to the expected namespace.
    
    @method normalizeEvents
    @private
    @param {String} events The events delimited by a space
    @param {String} namespace The namespace, including prefixed '.'
    **/
    function normalizeEvents(events, namespace) {
        var eventsArray = events.split(eventSplitter);
        for(var i = 0, iLen = eventsArray.length; i < iLen; i++) {
            if(eventsArray[i].indexOf('.') === -1) {
                eventsArray[i] = eventsArray[i] + namespace;
            }
        }
        return eventsArray.join(' ');
    }
    /**
    Trigger one or many events, firing all bound callbacks. Callbacks are
    passed the same arguments as `trigger` is, apart from the event name
    (unless you're listening on `"all"`, which will cause your callback to
    receive the true name of the event as the first argument).
    
    @method _trigger
    @private
    @param {Boolean} async Fire event async or sync
    @param {Object} events The events to be fired.
    delimited by a space.
    @param [args]* The arguments to pass onto the callback methods.
    @returns If async then returns a Promise, where the first argument contains all the returned values, as an array
    If sync then returns an array of the return values.
    If more than one event, returns an object of arrays or promises, with the key for each event.
    **/
    function _trigger(async, events) {
        /*jshint validthis:true */
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
    /**
    Triggers all events on a node.
    Also unbinds any node that is set to only be called once.
    
    @method triggerNodes
    @private
    @param {Object} that The event container context.
    @param {String} event The event to be bound or unbound.
    @param {Boolean} async Fire event async or sync
    @param {Object} node The node linked list.
    @param {Array} args The arguments to pass onto the triggered nodes
    
    **/
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
    /**
    Invokes a trigger callback
    
    @method triggerCallback
    @private
    @param {Boolean} async Fire event async or sync
    @param {Function} callback The callback method
    @param {Object} context The calling context
    @param {Array} args The arguments to call the callback with.
    @returns {Object} The returned value.
    For async calls, this is a promise
    For sync calls this is the value from the method.
    **/
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
    /**
    Creates an async event handler
    
    @method asyncEventFactory
    @private
    @param {Function} callback The callback method
    @param {Object} that The calling context
    @param {Array} args The arguments to call the callback with.
    @returns {Function} The callback for the given arguments.
    **/
    function triggerAsyncCallback(callback, context, args) {
        return function () {
            return callback.apply(context, args);
        };
    }
    /**
    Resubscribes to the appropriate events
    
    @method _offProcessNode
    @private
    @param {Object} that The event context
    @param {String} event The event
    @param {Object} node The node linked list.
    @param {Function} [callback] The event callback to unsubscribe
    @param {Object} [context] The event context to unsubscribe
    @param {String} [namespace] The namespace to unsubscribe
    **/
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
    /**
    Gets the namespace information, the real event to pass back onto the methods.
    
    @method getNamespaceData
    @private
    @param {String} event The event to capture namespace data from.
    @returns {Object} Containing event and namespace.
    **/
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
    /**
    Thrust Events are based off of the Backbone event model, with special additions.
    
    * Events can be fired asyncronously.
    * Events can be namespaced.
    
    @class thrust.Events
    **/
    exports.Events = (function () {
        var events = {
            subscribe: /**
            Bind one or more space separated events, `events`, to a `callback`
            function. Passing `"all"` will bind the callback to all events fired.
            
            @method subscribe
            @param {String} events Spave seperated events
            @param {Function} callback The callback method to be called when the events are fired.
            @param {Object} context The context to bind the calling function to.
            @param {Boolean} once Call this event only once.
            @chainable
            **/
            function (events, callback, context, once) {
                var calls, event, node, tail, list, nd;
                this.__namespace && (events = normalizeEvents(events, this.__namespace));
                var eventsArray = events.split(eventSplitter);
                calls = this._callbacks || (this._callbacks = {
                });
                // Create an immutable callback list, allowing traversal during
                // modification.  The tail is an empty object that will always be used
                // as the next node.
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
            once: /**
            Bind one or more space separated events, `events`, to a `callback`
            function. Passing `"all"` will bind the callback to all events fired.
            
            Each event will only be called once.
            
            @method once
            @param {String} events Spave seperated events
            @param {Function} callback The callback method to be called when the events are fired.
            @param {Object} context The context to bind the calling function to.
            @chainable
            **/
            function (events, callback, context) {
                return this.subscribe(events, callback, context, true);
            },
            unsubscribe: /**
            Remove one or many callbacks. If `context` is null, removes all callbacks
            with that function. If `callback` is null, removes all callbacks for the
            event. If `event` is null, removes all bound callbacks for all events.
            
            @method unsubscribe
            @param {String} events Spave seperated events
            @param {Function} callback The callback method to be called when the events are fired.
            @param {Object} context The context to bind the calling function to.
            @chainable
            **/
            function (events, callback, context) {
                var event, calls, node, nd, ourNs, namespace, that = this, hasNs;
                ourNs = that.__namespace;
                ourNs && (ourNs = ourNs.substring(1));
                // No events, or removing *all* events.
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
                // Loop through the listed events and contexts, splicing them out of the
                // linked list of callbacks if appropriate.
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
                    } else if(calls[event]) {
                        node = calls[event][ourNs];
                        delete calls[event][ourNs];
                        if(size(calls[event]) === 0) {
                            delete calls[event];
                        }
                    }
                    if(!node || !(callback || context)) {
                        continue;
                    }
                    /*if (event !== STARALL)
                    {
                    node = calls[event];
                    delete calls[event];
                    if (!node) continue;
                    }*/
                    if(event !== STARALL && !callback) {
                        _offProcessNode(that, event, node, callback, context);
                    } else if(event === ALL || !callback) {
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
                return that;
            },
            __pubSubName: /**
            Trigger one or many events, firing all bound callbacks. Callbacks are
            passed the same arguments as `trigger` is, apart from the event name
            (unless you're listening on `"all"`, which will cause your callback to
            receive the true name of the event as the first argument).
            
            @method fire
            @param {Object} events The events to be fired.
            delimited by a space.
            @param [args]* The arguments to pass onto the callback methods.
            @returns {Array of Values} If more than on event is fired, an Object of Arrays is returned.
            **/
            'Events',
            initEvents: /**
            Init's the Event module.
            This is only required if you wish to use fire.async, and namespacing.
            
            @method initEvents
            @chainable
            **/
            function (defaultContext) {
                this.fire = this.publish = createAsyncEvent(this);
                this.initEvents = noop;
                this.__pubSubName = this.name || 'Events';
                if(this.name && !this.__namespace) {
                    this.__namespace = '.' + this.name;
                }
                this.__defaultContext = defaultContext;
                return this;
            },
            extend: /**
            Extends Events into the given object.
            
            @method extend
            @param {Object} to The object ot extend events onto
            @param {Boolean} [init] Optionally init the events.
            **/
            function (to, init) {
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
    /// <reference path="interfaces/thrust.d.ts" />
    /// <reference path="../../lib/DefinitelyTyped/requirejs/require.d.ts" />
    // Disabled until TS supports module per file in some way (ie exports is exports.<export> not  exports.moduleName.<export>)
    /*export module instance {*/
    
    var util = __util__;

    var _ = util._;
    var tm = __tm__;

    var Module = tm.Module;
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
    var facadeMethods = [
        'init', 
        'start', 
        'ready', 
        'stop', 
        'destroy'
    ], defaultPrototype = {
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
        };
    }
    function methodWrap(method) {
        return function (f) {
            var args = Array.prototype.slice.call(arguments, 1);
            f.apply(this, args);
            return method.apply(this, args);
        };
    }
    for(var i = 0, iLen = facadeMethods.length; i < iLen; i++) {
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
    /**
    AMD API
    load
    
    Handles fetching of a module instance
    
    Format:
    thrust/capsule!{instance}:{pluginName}:{hashKey}
    
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
                //this.init(mod);
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
    /// <reference path="../interfaces/thrust.d.ts" />
    /// <reference path="../../../lib/DefinitelyTyped/requirejs/require.d.ts" />
    // Disabled until TS supports module per file in some way (ie exports is exports.<export> not  exports.moduleName.<export>)
    /*export module instance {*/
    
    var c = __c__;

    var Convention = c.Convention;
    /**
    @module thrust.mediator
    @submodule thrust.mediator.convention
    **/
    /**
    * # __thrust/mediator__ Convention - Auto Start
    *
    * The auto start property allows for a module, to be automatically started once it is
    * included into a thrust instnace, without having to explicity call start on the module.
    *
    *
    * This is useful for certian types of modules, usually persistant ones that always need to load regardless.
    * For example a navigation module, or user settings module.
    *
    * @for thrust.mediator.convention
    * @property autoStart
    **/
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
    /// <reference path="../interfaces/mediator/mediator.d.ts" />
    /// <reference path="../interfaces/thrust.d.ts" />
    /// <reference path="../../../lib/DefinitelyTyped/requirejs/require.d.ts" />
    // Disabled until TS supports module per file in some way (ie exports is exports.<export> not  exports.moduleName.<export>)
    /*export module instance {*/
    
    var c = __c__;

    var Convention = c.Convention;
    var util = __util__;

    var _ = util._;
    /**
    @module thrust.mediator
    @submodule thrust.mediator.convention
    **/
        var event = {
        anyContainer: 'thrust/convention/container/any',
        changeContainer: 'thrust/convention/container/change'
    }, any = _.any, bind = _.bind, CONTAINER = 'config.container', START = 'start-status', defer = _.defer;
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
                // Subscriptions get unsubscribed when stopping a module, so we need to resubscribe every time here.
                // This is probably better, as the events will be less chatty.
                facades.mediator.subscribe(event.changeContainer, bind(that.change, that, mod));
            }
        }
    };
    exports.container = new Convention(methods);
})
//@ sourceMappingURL=container.js.map
;
define('thrust/convention/dependent.modules',["require", "exports", 'thrust/convention', 'thrust/util'], function(require, exports, __c__, __util__) {
    /// <reference path="../interfaces/mediator/mediator.d.ts" />
    /// <reference path="../interfaces/thrust.d.ts" />
    /// <reference path="../../../lib/DefinitelyTyped/requirejs/require.d.ts" />
    // Disabled until TS supports module per file in some way (ie exports is exports.<export> not  exports.moduleName.<export>)
    /*export module instance {*/
    
    var c = __c__;

    var Convention = c.Convention;
    var util = __util__;

    var _ = util._;
    /**
    @module thrust.mediator
    @submodule thrust.mediator.convention
    **/
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