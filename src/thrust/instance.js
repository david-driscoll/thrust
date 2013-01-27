define(["require", "exports", 'thrust/util', 'thrust/capsule'], function(require, exports, __util__, __capsule__) {
    var util = __util__;

    var when = util.when;
    var capsule = __capsule__;

    exports.instances = {
    };
    exports.loadingInstances = {
    };
    function getInstance(name) {
        return exports.instances[name] || null;
    }
    exports.getInstance = getInstance;
    function fetchInstance(name) {
        var defer = exports.loadingInstances[name] || (exports.loadingInstances[name] = when.defer());
        return defer;
    }
    exports.fetchInstance = fetchInstance;
    function clearCache() {
        util._.each(util._.keys(exports.instances), function (x) {
            exports.instances[x] = null;
            delete exports.instances[x];
        });
        util._.each(util._.keys(exports.loadingInstances), function (x) {
            exports.loadingInstances[x] = null;
            delete exports.loadingInstances[x];
        });
        util._.each(util._.keys(capsule.Module.thrustCache), function (x) {
            capsule.Module.thrustCache[x] = null;
            delete capsule.Module.thrustCache[x];
        });
    }
    exports.clearCache = clearCache;
})
//@ sourceMappingURL=instance.js.map
