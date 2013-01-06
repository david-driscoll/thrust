/// <reference path="../interfaces/dom/dom.d.ts" />
/// <reference path="../../../lib/DefinitelyTyped/requirejs/require-2.1.d.ts" />

// Disabled until TS supports module per file in some way (ie exports is exports.<export> not  exports.moduleName.<export>)
/*export module instance {*/

'use strict';

import subjquery = module('./subjquery');
var tQuery = subjquery.tQuery;

import util = module('thrust/util');
var _ = util._;
import log = module('thrust/log');
import facade = module('thrust/facade');
import has = module('has');
import instance = module('thrust/instance');
export import config = module('./config');
export var className = 'Dom';

var format = util.format,
	extend = _.extend,
	bind = _.bind,
	hasOwn = Object.prototype.hasOwnProperty,
	isObject = _.isObject,
	slice = Array.prototype.slice,
	when = util.when,
	isArray = _.isArray;
//#region DomFacade
var DomFacade: IThrustDomFacade = (() =>
{
	var domFacade = facade.createFacade(function (mod, parent)
	{
		this.name = parent.name;
		this.__conventions = parent.__conventions;
		this.context = tQuery(document, undefined, this.name);
	});

	domFacade.prototype.init = function (fake)
	{
		this._internalEvents = this._internalEvents || [];
		has('DEBUG') && log.debug(format('Dom[{0}]: Initalizing {1}Dom facade', this.name, fake ? 'fake ' : ''));
		return this;
	};

	domFacade.prototype.start = function (m: IThrustModuleInstance): Promise[]
	{
		has('DEBUG') && log.debug(format('Dom[{0}]: Starting Dom facade', this.name));
		return null;
	};

	domFacade.prototype.stop = function (m: IThrustModuleInstance): Promise[]
	{
		has('DEBUG') && log.debug(format('Dom[{0}]: Stopping Dom facade', this.name));

		for (var i = this._internalEvents.length - 1; i >= 0; i--)
		{
			var sub = this._internalEvents[i];
			this._internalEvents.splice(i, 1);
			sub.context.off.apply(this, (isArray(sub)) ? sub : (isArray(sub.args)) ? sub.args : []);
		}
		return null;
	};

	domFacade.prototype.destroy = function (m: IThrustModuleInstance): Promise[]
	{
		has('DEBUG') && log.debug(format('Dom[{0}]: Destroying Dom facade', this.name));
		delete this._internalEvents;
		return null;
	}

	return <IThrustDomFacade> domFacade;
})();
//#endregion

//#region Dom
export class Dom implements IThrustDom
{
	public name: string;
	public mediator: IThrustMediator;
	public _callbacks: any;
	//#region Events
	public initEvents(): any { }
	public extend(to: Object, init?: bool): Object { return null; }

	public subscribe(events: string, callback: Function, context?: any, once?: bool): any { }
	public unsubscribe(events: string, callback: Function, context?: any): any{ }
	public once(events: string, callback: Function, context?: any): any{ }

	public publish: IAsyncEvent;
	public fire: IAsyncEvent;
	//#endregion

	constructor(name: string, mediator: IThrustMediator)
	{
		if (!name)
			throw new Error('Dom: module name must be defined.');

		has('DEBUG') && log.debug('Data: Creating new Data');

		this.mediator = mediator;
		this._callbacks = (<any> mediator)._callbacks;
		this.initEvents();
		this.name = name;

		var that = this;
		instance.fetchInstance(name).promise.then(function (thrust: IThrust)
		{
			var mod: IThrustModuleInstance = <any> {},
				facade = that.createFacade(thrust, mod, {});
		});
	}

	public static config = config;

	public createFacade(thrust: IThrust, mod: IThrustModuleInstance, facades: IThrustModuleFacades): IThrustFacade
	{
		if (facades.dom && !(facades.dom instanceof DomFacade)) throw new Error('"dom" is a reserved property');

		var dom;
		if (facades.dom)
		{
			facades.dom.updateFacade(mod, this);
			dom = facades.dom;
		}
		else
		{
			dom = facades.dom = new DomFacade(mod, this);
			mod.dom = mod.$ = dom.context;
		}
		return dom;
	}
}
//#endregion