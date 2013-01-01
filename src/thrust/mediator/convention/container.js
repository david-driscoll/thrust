define(["require", "exports", 'thrust/convention', 'thrust/util'], function(require, exports, __c__, __util__) {
    /// <reference path="../../interfaces/mediator/mediator.facade.d.ts" />
    /// <reference path="../../interfaces/facade.d.ts" />
    /// <reference path="../../interfaces/convention.d.ts" />
    /// <reference path="../../../../lib/DefinitelyTyped/requirejs/require-2.1.d.ts" />
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
        var event = {
anyContainer: 'thrust/mediator/convention/container/any',
changeContainer: 'thrust/mediator/convention/container/change'    }, any = _.any, bind = _.bind, CONTAINER = 'container', START = 'start-status', defer = _.defer;
    var methods = {
        properties: [
            CONTAINER
        ],
        change: function (mod, container) {
            var containerValue = mod.convention(CONTAINER);
            if(containerValue && container && containerValue === container) {
                if(mod.convention(START)) {
                    defer(bind(mod.stop, mod));
                }
            }
        },
        start: function (facade, mod) {
            var that = this, containerValue = mod.convention(CONTAINER);
            if(containerValue) {
                facade.fire(event.changeContainer, containerValue);
                // Facade subscriptions get unsubscribed when stopping a module, so we need to resubscribe every time here.
                // This is probably better, as the events will be less chatty.
                facade.subscribe(event.changeContainer, bind(that.change, that, mod));
            }
            return undefined;
        },
        stop: function (facade, mod) {
            return undefined;
        }
    };
    exports.container = new Convention(methods);
})
//@ sourceMappingURL=container.js.map
