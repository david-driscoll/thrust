define(["require", "exports", 'thrust/convention', 'thrust/util', '../jquery.interface'], function(require, exports, __c__, __util__, __jQueryInterface__) {
    /// <reference path="../../interfaces/mediator/mediator.facade.d.ts" />
    /// <reference path="../../interfaces/mediator/mediator.d.ts" />
    /// <reference path="../../interfaces/dom/dom.facade.d.ts" />
    /// <reference path="../../interfaces/convention.d.ts" />
    /// <reference path="../../../../lib/DefinitelyTyped/requirejs/require-2.1.d.ts" />
    // Disabled until TS supports module per file in some way (ie exports is exports.<export> not  exports.moduleName.<export>)
    /*export module instance {*/
    'use strict';
    var c = __c__;

    var Convention = c.Convention;
    var util = __util__;

    var _ = util._;
    var jQueryInterface = __jQueryInterface__;

    var event = {
anyContainer: 'thrust-convention-container-any',
changeContainer: 'thrust-convention-container-change'    }, any = _.any, defer = _.defer, bind = _.bind, START = 'start-status', ANIMATE = 'animate', CONTAINER = 'container', CONTEXT = 'context', updatejQueryInternals = jQueryInterface.updatejQueryInternals;
    var methods = {
        properties: [
            ANIMATE
        ],
        init: function (facade, mod) {
            var that = this, mediator = mod.instance.mediator;
            mediator.subscribe(event.changeContainer, bind(that.change, that, mod));
            return null;
        },
        change: function (module, container) {
            if(module.convention(CONTAINER) === container) {
                if(module.convention(START)) {
                    var animate = module.convention(ANIMATE);
                    if(animate) {
                        var contextNode = module.instance.dom();
                        contextNode.removeClass(animate);
                    }
                }
            }
            return null;
        },
        ready: function (facade, mod) {
            var that = this, animate = mod.convention(ANIMATE), container = mod.convention(CONTAINER), context = mod.convention(CONTEXT), dom = facade;
            if(animate && container) {
                var clone = dom.clone().appendTo(dom.parent());
                clone.addClass(animate.replace(/\./g, ' ').trim());
                updatejQueryInternals.call(dom, clone);
                setTimeout(bind(that.cleanup, that, dom.parent(), animate, context), 2000);
            }
            return null;
        },
        cleanup: function (container, animate, context) {
            container.find(context).filter(':not(' + animate + ')').remove();
        }
    };
    exports.animateContainer = new Convention(methods);
})
//@ sourceMappingURL=animate.container.js.map
