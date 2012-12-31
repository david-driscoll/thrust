define(["require", "exports", 'thrust/convention', 'thrust/util'], function(require, exports, __c__, __util__) {
    /// <reference path="../../interfaces/mediator/mediator.facade.d.ts" />
    /// <reference path="../../interfaces/convention.d.ts" />
    /// <reference path="../../../lib/DefinitelyTyped/requirejs/require-2.1.d.ts" />
    // Disabled until TS supports module per file in some way (ie exports is exports.<export> not  exports.moduleName.<export>)
    /*export module instance {*/
    'use strict';
    var c = __c__;

    var Convention = c.Convention;
    var util = __util__;

    var _ = util._;
    /**
    @module thrust.mediator
    @submodule thrust.mediator.convention
    **/
        var any = _.any, map = _.map, DMODULES = 'dependentModules', CMODULES = 'childModules', START = 'start-status', defer = _.defer, bind = _.bind;
    var invokedependentModules = function (module, method) {
        var requiredModules = module.convention(DMODULES);
        if(requiredModules) {
            return module.thrust[method](requiredModules);
        }
    };
    var invokeChildModules = function (module, method) {
        var requiredModules = module.convention(CMODULES);
        if(requiredModules) {
            return module.thrust[method](requiredModules);
        }
    };
    var methods = {
        properties: [
            DMODULES, 
            CMODULES
        ],
        start: function (facade, mod) {
            return util.when.all(util.flattenToPromises([
                invokedependentModules(mod, 'start'), 
                invokeChildModules(mod, 'start')
            ]));
        },
        ready: function (facade, mod) {
            if(!mod.thrust.started) {
                return util.when.all(util.flattenToPromises([
                    invokedependentModules(mod, 'ready'), 
                    invokeChildModules(mod, 'ready')
                ]));
            }
        },
        stop: function (facade, mod) {
            return invokeChildModules(mod, 'stop');
        },
        destroy: function (facade, mod) {
            return invokeChildModules(mod, 'destroy');
        }
    };
    exports.dependentModules = new Convention(methods);
})
//@ sourceMappingURL=dependent.modules.js.map
