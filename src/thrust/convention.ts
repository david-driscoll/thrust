/// <reference path="interfaces/convention.d.ts" />
/// <reference path="../lib/DefinitelyTyped/requirejs/require-2.1.d.ts" />

// Disabled until TS supports module per file in some way (ie exports is exports.<export> not  exports.moduleName.<export>)
/*export module instance {*/

import util = module('thrust/util');
var _ = util._;

/**
	A Convention allows thrust to be as extendable as possible, by giving extension points at every step along the way.

@module thrust
**/

var methods = ['create', 'init', 'start', 'ready', 'stop', 'destroy', 'countdown', 'ignite', 'orbit', 'deorbit', 'splashdown'];

/**
	The convention class, takes an overloaded set of methods, for any method that needs to be overloaded.

@class thrust.Convention
@constructor
@param {Object} methods An object of applicable methods.
**/
export class Convention implements IThrustConvention
{
	private emptyPromise: Promise = null; // fake the promise for TS, by defualt we want to do a noop here.
	/**
		These properties are stripped off of any module, and held in a private space for other convention methods to use.
	@property properties
	@optional
	**/
	public properties: string[];

	constructor(methodOverrides: any)
	{
		_.extend(this, methodOverrides);
		var keys = _.difference(_.keys(methodOverrides), methods);
		_.each(keys, function (x: string)
		{
			if (_.isFunction(this[x]))
				this[x] = util.noop;
		}, this);
	}

	/**
		This is called during create of a module, generally used to create a facade, that is then bound to the module.
	@method create
	@optional
	@param {Thrust} thrust The thrust instance.
	@param {Module} module The module instance.
	@param {Object} facades All the facades already attached to the module.
	**/
	public create(thrust: IThrust, mod: IThrustModule, facades: IThrustModuleFacades): void {
	}
	/**
		This method is called during the thrust init phase, or an individual module's init phase

	@method init
	@optional
	@param {Object} facades The facades for the module.
	@returns {Promise} A promise may be returned, to delay the next phase from begining.
	**/
	public init(facades: IThrustFacade, mod: IThrustModule): Promise { return this.emptyPromise; }
	/**
		This method is called during the thrust start phase, or an individual module's start phase

	@method start
	@optional
	@param {Object} facades The facades for the module.
	@returns {Promise} A promise may be returned, to delay the next phase from begining.
	**/
	public start(facades: IThrustFacade, mod: IThrustModule): Promise { return this.emptyPromise; }
	/**
		This method is called during the thrust ready phase, or an individual module's ready phase

	@method ready
	@optional
	@param {Object} facades The facades for the module.
	@returns {Promise} A promise may be returned, to delay the next phase from begining.
	**/
	public ready(facades: IThrustFacade, mod: IThrustModule): Promise { return this.emptyPromise; }
	/**
		This method is called during the thrust stop phase, or an individual module's stop phase

	@method stop
	@optional
	@param {Object} facades The facades for the module.
	@returns {Promise} A promise may be returned, to delay the next phase from begining.
	**/
	public stop(facades: IThrustFacade, mod: IThrustModule): Promise { return this.emptyPromise; }
	/**
		This method is called during the thrust destroy phase, or an individual module's destroy phase

	@method destroy
	@optional
	@param {Object} facades The facades for the module.
	@returns {Promise} A promise may be returned, to delay the next phase from begining.
	**/
	public destroy(facades: IThrustFacade, mod: IThrustModule): Promise { return this.emptyPromise; }
	/**
		This is called during the init phase of a Thrust instance.
	@method countdown
	@optional
	@param {Thrust} thrust The thrust instance.
	@returns {Promise} A promise may be returned, to delay the next phase from begining.
	**/
	public countdown(thrust : IThrust): Promise { return this.emptyPromise; }
	/**
		This is called during the start phase of a Thrust instance.
	@method ignite
	@optional
	@param {Thrust} thrust The thrust instance.
	@returns {Promise} A promise may be returned, to delay the next phase from begining.
	**/
	public ignite(thrust : IThrust): Promise { return this.emptyPromise; }
	/**
		This is called during the ready phase of a Thrust instance.
	@method orbit
	@optional
	@param {Thrust} thrust The thrust instance.
	@returns {Promise} A promise may be returned, to delay the next phase from begining.
	**/
	public orbit(thrust : IThrust): Promise { return this.emptyPromise; }
	/**
		This is called during the stop phase of a Thrust instance.
	@method deorbit
	@optional
	@param {Thrust} thrust The thrust instance.
	@returns {Promise} A promise may be returned, to delay the next phase from begining.
	**/
	public deorbit(thrust : IThrust): Promise { return this.emptyPromise; }
	/**
		This is called during the destroy phase of a Thrust instance.
	@method splashdown
	@optional
	@param {Thrust} thrust The thrust instance.
	@returns {Promise} A promise may be returned, to delay the next phase from begining.
	**/
	public splashdown(thrust : IThrust): Promise { return this.emptyPromise; }
}

