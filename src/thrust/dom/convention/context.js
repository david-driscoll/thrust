define(["require", "exports", 'thrust/convention', 'thrust/util', '../jquery.interface'], function(require, exports, __c__, __util__, __jQueryInterface__) {
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

    var CONTEXT = 'context', updatejQueryInternals = jQueryInterface.updatejQueryInternals;
    var methods = {
        properties: [
            CONTEXT
        ],
        ready: function (facade, mod) {
            var context = mod.convention(CONTEXT);
            if(context) {
                updatejQueryInternals.call(facade, context);
            }
            return null;
        }
    };
    exports.context = new Convention(methods);
})
//@ sourceMappingURL=context.js.map
