define(["require", "exports", 'thrust/convention', 'thrust/util'], function(require, exports, __c__, __util__) {
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
            thrust.data.subscribe('thrust/data/wait', waitCallback);
            thrust.data.subscribe('thrust/data/stop', stopCallback);
        },
        orbit: function (thrust) {
            thrust.data.unsubscribe('thrust/data/wait', waitCallback);
            thrust.data.unsubscribe('thrust/data/stop', stopCallback);
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
