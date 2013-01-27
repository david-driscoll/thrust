/// <reference path="../interfaces/mediator/mediator.d.ts" />
/// <reference path="../interfaces/thrust.d.ts" />
/// <reference path="../../../lib/DefinitelyTyped/requirejs/require.d.ts" />

// Disabled until TS supports module per file in some way (ie exports is exports.<export> not  exports.moduleName.<export>)
/*export module instance {*/

'use strict';
import c = module('thrust/convention');
var Convention = c.Convention;
import util = module('thrust/util');
var _ = util._;

/**
@module thrust.mediator
@submodule thrust.mediator.convention
**/

var any = _.any,
    map = _.map,
    DMODULES = 'config.dependentModules',
    CMODULES = 'config.childModules',
    START = 'start-status',
    defer = _.defer,
    bind = _.bind;

var invokedependentModules = function (mod : IThrustModule , method : string) : Promise
{
    var requiredModules = mod.convention(DMODULES);
    if (requiredModules)
    {
        return mod.thrust[method](requiredModules);
    }
};

var invokeChildModules = function (mod : IThrustModule , method : string) : Promise
{
    var requiredModules = mod.convention(CMODULES);
    if (requiredModules)
    {
        return mod.thrust[method](requiredModules);
    }
};

/**
* # __thrust/mediator__ Convention - Dependant Modules
*
* The dependent module convention introduces two properties to a module.
*
* `dependentModules` {Array}<br />
* These are modules that must be started along side your module, but aren't required to be stopped with your module.
* As an example you have an alerts module, this gives you alerts at the top of your page.  Your account settings module
* may be dependent on alerts, so it can fire events into the module, but alerts is not bound to the life cycle of your settings module.
*
*
* `childModules` {Array}<br />
* These are modules that must be started and stopped along side your module.  An example of this would be a context module
* that perhaps gives changes state to an object that is clicked in your module.
*
* @for thrust.mediator.convention
* @property modules
**/

interface IThrustConventionMediatorDependentModules extends IThrustConvention.Properties,
    IThrustConvention.Start.PromiseArray,
    IThrustConvention.Ready.PromiseArray,
    IThrustConvention.Stop.PromiseObject,
    IThrustConvention.Destroy.PromiseObject 
{}

var methods: IThrustConventionMediatorDependentModules = {
    properties: [DMODULES, CMODULES],
    start: function (mod: IThrustModule, facades: IThrustModuleFacades): Promise[]
    {
        return [invokedependentModules(mod, 'start'), invokeChildModules(mod, 'start')];
    },
    ready: function (mod: IThrustModule, facades: IThrustModuleFacades): Promise[]
    {
        if (!mod.thrust.started)
            return [invokedependentModules(mod, 'ready'), invokeChildModules(mod, 'ready')];
    },
    stop: function (mod: IThrustModule, facades: IThrustModuleFacades): Promise
    {
        return invokeChildModules(mod, 'stop');
    },
    destroy: function (mod: IThrustModule, facades: IThrustModuleFacades): Promise
    {
        return invokeChildModules(mod, 'destroy');
    }
};
export var dependentModules = new Convention(methods);
