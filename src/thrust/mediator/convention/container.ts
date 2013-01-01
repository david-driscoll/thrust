/// <reference path="../../interfaces/mediator/mediator.facade.d.ts" />
/// <reference path="../../interfaces/facade.d.ts" />
/// <reference path="../../interfaces/convention.d.ts" />
/// <reference path="../../../../lib/DefinitelyTyped/requirejs/require-2.1.d.ts" />

// Disabled until TS supports module per file in some way (ie exports is exports.<export> not  exports.moduleName.<export>)
/*export module instance {*/

'use strict';
export import c = module('thrust/convention');
var Convention = c.Convention;
import util = module('thrust/util');
var _ = util._;

/**
@module thrust.mediator
@submodule thrust.mediator.convention
**/

var event     = {
        anyContainer: 'thrust/mediator/convention/container/any',
        changeContainer: 'thrust/mediator/convention/container/change'
    },
    any       = _.any,
    bind      = _.bind,
    CONTAINER = 'container',
    START     = 'start-status',
    defer     = _.defer;

/**
* # __thrust/mediator__ Convention - Container
*
* The `container` convention allows you to define a virtual `container`, for your modules to go in.
* Conceptually only one module can be in the box at once, so when one module starts, if the `container`
* already has a module in it, that module will be shutdown and replaced by this module.
*
*
* This convention lets you not worry about cleaning up your mess, you can just focus on what modules
* need to start, and if you have any common modules, like a main module area, it will swap automatically.
*
*
*     container: 'main',
*
*
* Any other module that also loads with container `main` will then get loaded into the container, and the
* currently active module will be stopped.
*
* @for thrust.mediator.convention
* @property container
**/
interface IThrustConventionMediatorContainer extends IThrustConventionProperties, IThrustConventionStart, IThrustConventionStop {}

var methods : IThrustConventionMediatorContainer = {
    properties: [CONTAINER],
    change: function (mod : IThrustModule, container : string)
    {
        var containerValue = mod.convention(CONTAINER);
        if (containerValue && container && containerValue === container)
        {
            if (mod.convention(START))
                defer(bind(mod.stop, mod));
        }
    },
    start: function (facade : IThrustMediatorFacade, mod: IThrustModule) : Promise
    {
        var that = this,
            containerValue = mod.convention(CONTAINER);
        if (containerValue)
        {
            facade.fire(event.changeContainer, containerValue);
            // Facade subscriptions get unsubscribed when stopping a module, so we need to resubscribe every time here.
            // This is probably better, as the events will be less chatty.
            facade.subscribe(event.changeContainer, bind(that.change, that, mod));
        }
        return undefined;
    },
    stop: function (facade : IThrustMediatorFacade, mod: IThrustModule) : Promise
    {
        return undefined;
    }
};

export var container = new Convention(methods);
