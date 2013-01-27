define(["require", "exports", 'thrust/convention', 'thrust/util'], function(require, exports, __c__, __util__) {
    'use strict';
    var c = __c__;

    var Convention = c.Convention;
    var util = __util__;

    var _ = util._;
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
