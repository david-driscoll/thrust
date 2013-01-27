define(["require", "exports", 'thrust/convention', 'thrust/util'], function(require, exports, __c__, __util__) {
    'use strict';
    var c = __c__;

    var Convention = c.Convention;
    var util = __util__;

    var _ = util._;
    var event = {
anyContainer: 'thrust/convention/container/any',
changeContainer: 'thrust/convention/container/change'    }, any = _.any, bind = _.bind, CONTAINER = 'config.container', START = 'start-status', defer = _.defer;
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
        start: function (mod, facades) {
            var that = this, containerValue = mod.convention(CONTAINER);
            if(containerValue) {
                facades.mediator.fire(event.changeContainer, containerValue);
                facades.mediator.subscribe(event.changeContainer, bind(that.change, that, mod));
            }
        }
    };
    exports.container = new Convention(methods);
})
//@ sourceMappingURL=container.js.map
