/// <reference path="../../lib/DefinitelyTyped/requirejs/require-2.1.d.ts" />

// Disabled until TS supports module per file in some way (ie exports is exports.<export> not  exports.moduleName.<export>)
/*export module instance {*/

'use strict';
import util = module('thrust/util')
var _ = util._;

import log = module('./log');
import has = module('has');

var type = util.type,
	format = util.format,
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
		'ready'
	],
	__requiredMethods = [     // Required methods that must be on every module
		'init',
		'destroy'
    ];
/**
Moves all properties, that should exist outside of the module, into a private object for holding.

@method moveToThrustCache
@private
@param {Object} from Object to extract items from
@param {Object} to Object to place items on
@param {Array} list Items to move from to the other object
**/
function moveToThrustCache(from: any, to: any, list: string[])
{
	for (var i = 0, iLen = list.length; i < iLen; i++)
	{
		to[list[i]] = from[list[i]];
		delete from[list[i]];
	}
}

function getEventNamespace(name: string, prefix?: string)
{
	if (!prefix) prefix = 'module-'; return '.' + (name === 'global' ? 'global' : prefix + name.replace(/\./g, '-'));
}

function callFacadeMethods(method, moduleCache)
{
	var results = [];
	_.forOwn(moduleCache.facades, (facade, i) =>
	{
		has('DEBUG') && log.debug(format('thrust/capsule: Calling facade "{0}" {1}()', i, method));
		if (facade[method] && isObject(facade))
			results.push(facade[method].call(facade, moduleCache.module ));
	});
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
export class Module implements IThrustModule
{
	public thrust: IThrust;
	public name: string;
	public instance: IThrustModuleInstance;
	public mid: string;
	private __namespace: string;

	public static thrustCache: IThrustModuleCache = thrustCache;

	//var Module = 
	constructor(thrust : IThrust, def: any, name: string)
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
		for (var i = 0, iLen = __requiredMethods.length; i < iLen; i++)
			if (!def[__requiredMethods[i]])
				throw new Error(format('Required "{0}" method not found on module "{1}"!', __requiredMethods[i], name));

		// If the module name is undefined, bring the name into the module.
		if (typeof def.name === 'undefined')
			def.name = name;

		var thrustModuleCacheItem : IThrustModuleCacheInstance = thrustCache[mid] = extend(tCache || {}, {
			_started: false,
			name: util.getModuleNameForPath(name),
			module: this
		});

		delete thrustCache[def.hash];

		var facades : IThrustModuleFacades = thrustModuleCacheItem.facades || (thrustModuleCacheItem.facades = {});
		if (!thrust.__conventionPluckPropertiesCache)
			thrust.__conventionPluckPropertiesCache = flatten(pluck(thrust.__conventions || [], 'properties'));

		// Move all special properties off to the thrust's internal method.
		moveToThrustCache(this.instance, thrustModuleCacheItem, __requiredMethods);
		moveToThrustCache(this.instance, thrustModuleCacheItem, __optionalMethods);
		moveToThrustCache(this.instance, thrustModuleCacheItem, thrust.__conventionPluckPropertiesCache);

		util.safeInvoke(thrust, 'createFacade', thrust, this.instance, facades);

		this.__namespace = getEventNamespace(this.instance.name);

		this.thrust = thrust;
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
	public convention(property : string, value? : any) : any
	{
		if (typeof value !== 'undefined')
		{
			thrustCache[this.mid][property] = value;
			return;
		}
		return thrustCache[this.mid][property];
	}
	/**
	Injects this module into the given thrust instance.

	@method thrustCreate
	@param {Thrust} thrust The thrust instance.
	**/
	public thrustCreate(thrust : IThrust)
	{
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
	public thrustCall(method : string, facadeAfter :bool, args : any[]) : Promise
	{
		var defer = when.defer(),
			results,
			that = this;

		has('DEBUG') && log.debug(format('thrust/capsule: Calling facades for "{0}"', that.name));
		var cache = thrustCache[that.mid],
			m = cache[method];
		if (!facadeAfter)
		{
			results = callFacadeMethods(method, cache);
			if (results)
				when.chain(when.all(flattenToPromises(results)), defer);
			else
				defer.resolve();

			if (m)
			{
				var newDefer = when.defer();
				defer.promise.then(function ()
				{
					var result = m.apply(that.instance, args);
					if (result)
						when.chain(when.all(flattenToPromises(result)), newDefer);
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
					when.chain(when.all(flattenToPromises(results)), defer);
				else
					defer.resolve();
			}
			else
				defer.resolve();

			var newDefer = when.defer();
			defer.promise.then(function ()
			{
				var result = callFacadeMethods(method, cache);
				if (result)
					when.chain(when.all(flattenToPromises(result)), newDefer);
				else
					newDefer.resolve();
			});
			defer = newDefer;
		}

		return defer.promise;
	}
	/**
	Start the module, inside the thrust container it was created on.

	@method start
	**/
	public start()
	{
		var that = this;
		that.thrust.start(that.name);
	}
	/**
	Stop the module, inside the thrust container it was created on.

	@method start
	**/
	public stop()
	{
		var that = this;
		that.thrust.stop(that.name);
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
export function load(name, parentRequire, load, config)
{
	var parts = name.split(':'),
		instanceName = parts[0],
		moduleName = parts[1];

	require(['thrust!' + instanceName], function (thrust)
	{
		var module = thrust.modules[moduleName];
		if (!module )
			throw new Error(format('Module "{0}" does not exist on thrust instance "{1}".', moduleName, instanceName));

		load(module );
	});
}
