/// <reference path="../../lib/DefinitelyTyped/requirejs/require.d.ts" />

// Disabled until TS supports module per file in some way (ie exports is exports.<export> not  exports.moduleName.<export>)
/*export module instance {*/

'use strict';
import util = module('thrust/util')
var _ = util._;

import log = module('./log');
import has = module('has');

var format = util.format,
    each = _.each,
    isObject = _.isObject,
    extend = _.extend,
    when = util.when,
    flatten = _.flatten,
    pluck = _.pluck,
    flattenToPromises = util.flattenToPromises,
    thrustCache: IThrustModuleCache = {},
    __optionalMethods = [     // Optional methods that may be on a module
        'start',
        'stop',
        'ready',
        'config',
    ],
    __requiredMethods = [     // Required methods that must be on every module
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
function moveToThrustCache(from: any, to: any, list: string[]) {
    for (var i = 0, iLen = list.length; i < iLen; i++) {
        to[list[i]] = from[list[i]];
        delete from[list[i]];
    }
}

function getEventNamespace(name: string, prefix?: string) {
    if (!prefix) prefix = 'module-'; return '.' + (name === 'global' ? 'global' : prefix + name.replace(/\./g, '-'));
}

function callFacadeMethods(method, moduleCache: IThrustModuleCacheInstance) {
    var m = moduleCache.module;
    var results = [];
    _.forOwn(moduleCache.facades, (facade, i) =>
    {
        has('DEBUG') && log.debug(format('thrust/capsule: Calling facade "{0}" {1}()', i, method));
        if (facade[method] && isObject(facade))
            results.push(facade[method].call(facade, m));
    });
    results.push(util.safeInvoke((<any> m.thrust).__thrustConventions, method, m, moduleCache.facades));
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
export class Module implements IThrustModule {
    public thrust: IThrust;
    public name: string;
    public instance: IThrustModuleInstancePrivate;
    public mid: string;
    private __namespace: string;
    private cache: IThrustModuleCacheInstance;

    public static thrustCache: IThrustModuleCache = thrustCache;

    //var Module = 
    constructor(thrust: IThrust, def: any, name: string) {
        name = this.name = (name || def.name);
        if (typeof def === 'function') {
            def = def(name);
            def.name = name;
        }
        var mid = this.mid = thrust.name + ':' + name;
        var tCache = thrustCache[def.hash || mid];

        // Clear any potential cached config objects, to make sure they refresh if the module is redefined.
        if (tCache)
            _.keys(tCache).filter((x) => x.indexOf('config.') === 0).forEach((x) => delete tCache[x]);

        this.instance = extend(def, tCache && tCache.instance || {});
        this.instance.name = (this.instance.name || name);
        this.instance.mid = mid;

        if (!this.instance.name)
            throw new Error('All Modules must have a name!');

        // Modules must have an init method and a destroy method, it's up to the module developer to populate these methods.
        for (var i = 0, iLen = __requiredMethods.length; i < iLen; i++)
            if (!def[__requiredMethods[i]])
                throw new Error(format('Required "{0}" method not found on module "{1}"!', __requiredMethods[i], name));

        // If the module name is undefined, bring the name into the module.
        if (typeof def.name === 'undefined')
            def.name = name;

        var thrustModuleCacheItem: IThrustModuleCacheInstance = thrustCache[mid] = extend(tCache || {}, {
            _started: false,
            name: util.getModuleNameForPath(name),
            module: this
        });

        delete thrustCache[def.hash];

        var facades: IThrustModuleFacades = thrustModuleCacheItem.facades || (thrustModuleCacheItem.facades = {});
        if (!thrust.__conventionPluckPropertiesCache)
            thrust.__conventionPluckPropertiesCache = flatten(pluck(thrust.__conventions || [], 'properties')).filter((x) => x.indexOf('config.') !== 0);

        // Move all special properties off to the thrust's internal method.
        moveToThrustCache(this.instance, thrustModuleCacheItem, __requiredMethods);
        moveToThrustCache(this.instance, thrustModuleCacheItem, __optionalMethods);
        moveToThrustCache(this.instance, thrustModuleCacheItem, thrust.__conventionPluckPropertiesCache);

        util.safeInvoke(thrust, 'createFacade', thrust, this.instance, facades);

        this.__namespace = getEventNamespace(this.instance.name);

        this.thrust = thrust;
        this.cache = thrustCache[mid];
    }

    /**
	Getter/Setter for convention methods.
	Gets the value convention property (defined in the properties array of a facade).
	Sets the value of a convention property (for storing convention configuration)

	@param {String} property The property to get or set
	@param {object} [value] The value to set
	@method convention
	@returns {Object} The valaue.
	**/
    public convention(property: string, value?: any): any {
        var tc = this.cache;
        if (property.indexOf('config.') === 0) {
            if (typeof tc[property] === 'undefined') {
                tc[property] = this.getValueFromPath(property, tc) || false;
            }
        }
        if (typeof value !== 'undefined') {
            tc[property] = value;
            return;
        }
        return tc[property];
    }

    private getValueFromPath(path: string, object: any) {
        var paths = path.split('.'),
            v = object;
        _.each(paths, (p) => { v = v && v[p]; if (!v) return false; });
        return v;
    }

    /**
	Injects this module into the given thrust instance.

	@method thrustCreate
	@param {Thrust} thrust The thrust instance.
	**/
    public thrustCreate(thrust: IThrust) {
        thrust.__injectModule(this);
    }
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
    public thrustCall(method: string, facadeAfter: bool, args: any[]): Promise {
        var seq = [],
            that = this;

        has('DEBUG') && log.debug(format('thrust/capsule: Calling facades for "{0}"', that.name));
        var cache = this.cache,
            m = cache[method];

        seq.push(() => {
            var result = callFacadeMethods(method, cache);
            if (result && result.length)
                return when.all(flattenToPromises(result));
        });

        if (m) {
            seq.push(() => {
                var result = m.apply(that.instance, args);
                if (result && result.length)
                    return when.all(flattenToPromises(result));
            });
        }

        if (facadeAfter) {
            seq.push(seq.shift());
        }

        return when.sequence(seq);
    }
    /**
	Start the module, inside the thrust container it was created on.

	@method start
	**/
    public start() {
        var that = this;
        return that.thrust.start(that.name);
    }
    /**
	Stop the module, inside the thrust container it was created on.

	@method start
	**/
    public stop() {
        var that = this;
        return that.thrust.stop(that.name);
    }
}

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
export function load(name, parentRequire, load, config) {
    var parts = name.split(':'),
        instanceName = parts[0],
        moduleName = parts[1];

    require(['thrust!' + instanceName], function (thrust) {
        var module = thrust.modules[moduleName];
        if (!module )
            throw new Error(format('Module "{0}" does not exist on thrust instance "{1}".', moduleName, instanceName));

        load(module );
    });
}
