/// <reference path="../../has.d.ts" />
/// <reference path="../interfaces/mediator/mediator.facade.d.ts" />
/// <reference path="../../../lib/DefinitelyTyped/requirejs/require-2.1.d.ts" />

// Disabled until TS supports module per file in some way (ie exports is exports.<export> not  exports.moduleName.<export>)
/*export module instance {*/

'use strict';

import util = module('thrust/util')
var _ = util._;
import log = module('thrust/log');
//import events = module('thrust/events');
import events = module('thrust/events');
var Events = events.Events;
import facade = module('thrust/facade');
import has = module('has');
export import config = module('thrust/config');
export import mediatorConfig = module('./config');
export var className = 'Mediator';

    // Variable declaration.
    var format  = util.format,   // string format method
        extend  = _.extend,   // object extension method
        type    = util.type,       // object type method
        when    = util.when,
        memoize = _.memoize,
        mediator,
        slice   = Array.prototype.slice;

    var c = config;

    //#region Facade
    /**
    Creates a new mediator facade for the given module.

    @for thrust.mediator
    @class thrust.mediator.MediatorFacade
    @constructor
    @param {thrust.Module} module The module to create the facade for
    @param {thrust.Mediator} parent The parent mediator to create the facade on.
    **/
    var MediatorFacade: IThrustMediatorFacade = (() =>
    {
    	var mediatorFacade = facade.createFacade(function (module, parent)
    	{
    		this.name = module.name;
    		this.module = module;
    		this.parent = parent;
    		this.__conventions = parent.__conventions;
    		this._callbacks = parent._callbacks;
    		this.initEvents();
    	});
    	_.extend(<any> mediatorFacade.prototype, Events);

    	/**
		During the start of a mediator facade, start creates the internal subscriptions array.
	
		@for thrust.mediator.MediatorFacade
		@method start
		**/
    	mediatorFacade.prototype.init = function (m: IThrustModuleInstance): Promise[]
    	{
    		if (!this._internalSubscriptions)
    			this._internalSubscriptions = [];
    		return null;
    	};

    	mediatorFacade.prototype.start = mediatorFacade.prototype.init;
    	/**
		Overrides the subscribe method, and tracks the any event that is bound.
	
		@for thrust.mediator.MediatorFacade
		@method subscribe
		**/
    	(<any> mediatorFacade).prototype.subscribe = function (events: string, callback: Function, context?: any)
    	{
    		this._internalSubscriptions.push({ events: events, callback: callback, context: context });
    		Events.subscribe.call(this, events, callback, context);
    	};

    	/**
		Unsubscribes from all events that were subscribed to.
	
		@for thrust.mediator.MediatorFacade
		@method stop
		**/
    	mediatorFacade.prototype.stop = function (m: IThrustModuleInstance): Promise[]
    	{
    		if (this._internalSubscriptions)
    		{
    			for (var i = this._internalSubscriptions.length - 1; i >= 0; i--)
    			{
    				var sub = this._internalSubscriptions[i];
    				this.unsubscribe(sub.events, sub.callback, sub.context);
    			}
    			delete this._internalSubscriptions;
    		}
    		return null;
    	};

    	return <IThrustMediatorFacade> mediatorFacade;
    })();

    //#endregion
    // Our default namespace prefix.

    /**
    Mediator class.
    This creates a instance of the mediator, for use inside thrust.

    @for thrust.mediator
    @class thrust.mediator.Mediator
    @constructor
    @param {String} name The name of the mediator.
    **/
    export class Mediator implements IThrustMediator
    {
    	public name: string;
		//#region Events
    	public initEvents(): any { }
    	public extend(to: Object, init?: bool): Object { return null; }

    	public subscribe(events: string, callback: Function, context?: any, once?: bool): any { }
    	public unsubscribe(events: string, callback: Function, context?: any): any{ }
    	public once(events: string, callback: Function, context?: any): any{ }

		public publish : IAsyncEvent;
		public fire : IAsyncEvent;
		//#endregion

    	constructor(name: string, config: any)
    	{
			var that = this,
				appPath = config && config.url && config.url.path;
			that.name = name;
			has('DEBUG') && log.debug(format('Mediator: Creating new Mediator {0}', name));

			that.initEvents();

			that.subscribe('thrust/ready', function ()
			{
				has('DEBUG') && log.info('Mediator: Ready!');
			});
    	}

    	public createFacade(thrust: IThrust, mod: IThrustModuleInstance, facades: IThrustModuleFacades): IThrustFacade
    	{
			if ((<any> mod).mediator && !(facades.mediator instanceof MediatorFacade))
				throw new Error('"mediator" is a reserved property');

            var mediator;
            if (facades.mediator)
            {
                facades.mediator.updateFacade(mod, this);
                mediator = facades.mediator;
            }
            else
            {
                mediator = facades.mediator = (<any> mod).mediator = new MediatorFacade(mod, this);
            }
            return mediator;
    	}

    	public static config = mediatorConfig;
    }
	// Get the actual event methods onto the Mediator
    _.extend(<any> Mediator.prototype, Events);
