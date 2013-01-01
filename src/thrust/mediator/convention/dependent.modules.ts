/// <reference path="../../interfaces/mediator/mediator.facade.d.ts" />
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

    var any      = _.any,
        map      = _.map,
        DMODULES = 'dependentModules',
        CMODULES = 'childModules',
        START    = 'start-status',
        defer    = _.defer,
        bind     = _.bind;

    var invokedependentModules = function (module, method)
    {
        var requiredModules = module.convention(DMODULES);
        if (requiredModules)
        {
            return module.thrust[method](requiredModules);
        }
    };

    var invokeChildModules = function (module, method)
    {
        var requiredModules = module.convention(CMODULES);
        if (requiredModules)
        {
            return module.thrust[method](requiredModules);
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

    interface IThrustConventionMediatorDependentModules extends IThrustConventionProperties, IThrustConventionStart, IThrustConventionReady, IThrustConventionStop, IThrustConventionDestroy{}
    var methods : IThrustConventionMediatorDependentModules = {
        properties: [DMODULES, CMODULES],
        start: function (facade : IThrustMediatorFacade, mod: IThrustModule) : Promise
        {
            return util.when.all(util.flattenToPromises([invokedependentModules(mod, 'start'), invokeChildModules(mod, 'start')]));
        },
        ready: function (facade : IThrustMediatorFacade, mod: IThrustModule) : Promise
        {
            if (!mod.thrust.started)
                return util.when.all(util.flattenToPromises([invokedependentModules(mod, 'ready'), invokeChildModules(mod, 'ready')]));
        },
        stop: function (facade : IThrustMediatorFacade, mod: IThrustModule) : Promise
        {
            return invokeChildModules(mod, 'stop');
        },
        destroy: function (facade : IThrustMediatorFacade, mod: IThrustModule) : Promise
        {
            return invokeChildModules(mod, 'destroy');
        }
    };
    export var dependentModules = new Convention(methods);
