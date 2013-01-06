define(["require", "exports", 'thrust/util', 'thrust/capsule'], function(require, exports, __util__, __capsule__) {
    /// <reference path="interfaces/thrust.d.ts" />
    /// <reference path="../../lib/DefinitelyTyped/requirejs/require-2.1.d.ts" />
    // Disabled until TS supports module per file in some way (ie exports is exports.<export> not  exports.moduleName.<export>)
    /*export module instance {*/
    /**
    Gets the thrust instances.
    
    @module thrust
    **/
    var util = __util__;

    var when = util.when;
    var capsule = __capsule__;

    /**
    The available thrust instances
    index by name
    
    @for thrust.instance
    @property instances
    @private
    **/
    exports.instances = {
    };
    /**
    The loading thurst instances.
    index by name
    
    @property loadingInstances
    @private
    **/
    exports.loadingInstances = {
    };
    /**
    Gets a named thrust stance if it exists.
    
    @method getInstance
    @static
    @param {String} name The instance name
    @returns {Thrust} The thrust instance
    **/
    function getInstance(name) {
        return exports.instances[name] || null;
    }
    exports.getInstance = getInstance;
    /**
    Fetchs a named thrust stance if it exists.
    This loads asyncronously, as the instance may not be loaded
    
    @method fetchInstance
    @static
    @private
    @param {String} name The instance name
    @returns {Promise} To a thrust instance spec
    **/
    function fetchInstance(name) {
        var defer = exports.loadingInstances[name] || (exports.loadingInstances[name] = when.defer());
        return defer;
    }
    exports.fetchInstance = fetchInstance;
    /**
    Clears the Thrust Instance cache, this is used for unit testing, and clearing all the cache data each run.
    
    @method clearCache
    @static
    @private
    **/
    function clearCache() {
        util._.each(util._.keys(exports.instances), function (x) {
            exports.instances[x] = null;
        });
        util._.each(util._.keys(exports.loadingInstances), function (x) {
            exports.loadingInstances[x] = null;
        });
        util._.each(util._.keys(capsule.Module.thrustCache), function (x) {
            capsule.Module.thrustCache[x] = null;
        });
    }
    exports.clearCache = clearCache;
    /*}*/ })
//@ sourceMappingURL=instance.js.map
