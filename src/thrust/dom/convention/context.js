define(["require", "exports", 'thrust/convention', 'thrust/util', '../subjquery'], function(require, exports, __c__, __util__, __subjquery__) {
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
                mod.instance.dom = mod.instance.$ = tQuery(context, facade.context);
            }
        }
    };
    exports.context = new Convention(methods);
})
//@ sourceMappingURL=context.js.map
