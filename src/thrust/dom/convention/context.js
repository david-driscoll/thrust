define(["require", "exports", 'thrust/convention', 'thrust/util', '../subjquery'], function(require, exports, __c__, __util__, __subjquery__) {
    /// <reference path="../../interfaces/dom/convention/context.d.ts" />
    /// <reference path="../../interfaces/mediator/mediator.d.ts" />
    /// <reference path="../../interfaces/dom/dom.d.ts" />
    /// <reference path="../../interfaces/thrust.d.ts" />
    /// <reference path="../../../../lib/DefinitelyTyped/requirejs/require-2.1.d.ts" />
    // Disabled until TS supports module per file in some way (ie exports is exports.<export> not  exports.moduleName.<export>)
    /*export module instance {*/
    'use strict';
    var c = __c__;

    var Convention = c.Convention;
    var util = __util__;

    var _ = util._;
    var subjquery = __subjquery__;

    var tQuery = subjquery.tQuery;
    var CONTEXT = 'config.dom.context';
    var methods = {
        properties: [
            CONTEXT
        ],
        ready: function (mod, facade) {
            var context = mod.convention(CONTEXT);
            if(context) {
                mod.instance.dom = mod.instance.$ = facade.context = tQuery(context, mod.instance.$);
            }
        }
    };
    exports.context = new Convention(methods);
})
//@ sourceMappingURL=context.js.map
