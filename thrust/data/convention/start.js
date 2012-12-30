define(["require", "exports", 'thrust/convention', 'thrust/util'], function(require, exports, __c__, __util__) {
    /// <reference path="../../interfaces/data/data.config.d.ts" />
    /// <reference path="../../interfaces/data/data.d.ts" />
    /// <reference path="../../interfaces/convention.d.ts" />
    /// <reference path="../../../lib/DefinitelyTyped/requirejs/require-2.1.d.ts" />
    // Disabled until TS supports module per file in some way (ie exports is exports.<export> not  exports.moduleName.<export>)
    /*export module instance {*/
    'use strict';
    var c = __c__;

    var Convention = c.Convention;
    var util = __util__;

    var _ = util._;
    var when = util.when;
    var whenQueue = [];
    function waitCallback(uid) {
        var d = when.defer();
        d.resolver['uid'] = uid;
        whenQueue.push({
            uid: uid,
            resolver: d.resolver
        });
    }
    function stopCallback(uid) {
        var item = _.find(whenQueue, function (x) {
            return x.uid === uid;
        });
        whenQueue = _.without(whenQueue, item);
        item.resolver.resolve();
    }
    var methods = {
        countdown: function (thrust) {
            // Subscribe to the wait and stop events
            thrust.data.subscribe('thrust/data/wait', waitCallback);
            thrust.data.subscribe('thrust/data/stop', stopCallback);
            return null;
        },
        orbit: function (thrust) {
            // Unsubscribe from the wait and stop events
            thrust.data.unsubscribe('thrust/data/wait', waitCallback);
            thrust.data.unsubscribe('thrust/data/stop', stopCallback);
            // defer until any of the events that were captured are resolved, or the delay passes.
            var defer = when.defer();
            if(thrust.cfg.data.finishTimeout === 0) {
                return when.all(whenQueue);
            }
            return when.any([
                when.all(whenQueue), 
                when.delay(thrust.cfg.data.finishTimeout)
            ], defer.resolve, defer.reject);
        }
    };
    exports.subscription = new Convention(methods);
})
//@ sourceMappingURL=start.js.map
