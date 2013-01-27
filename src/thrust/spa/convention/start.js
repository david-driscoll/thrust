define(["require", "exports", 'thrust/convention', 'thrust/util'], function(require, exports, __c__, __util__) {
    'use strict';
    var c = __c__;

    var Convention = c.Convention;
    var util = __util__;

    var _ = util._;
    var methods = {
        orbit: function (thrust) {
            var router = thrust.spa;
            router.start();
            return thrust.spa.startingModulePromise || null;
        }
    };
    exports.start = new Convention(methods);
})
//@ sourceMappingURL=start.js.map
