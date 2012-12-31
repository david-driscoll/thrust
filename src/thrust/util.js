define(["require", "exports", './util/function', './util/object', './util/type', './util/guid', './util/url', './util/string', './util/when', './util/lib/camelcase', './util/l2o'], function(require, exports, __uFunction__, __uObject__, __uType__, __uGuid__, __uUrl__, __uString__, __uWhen__, __uLibCamelCase__, __ul2o__) {
    
    var uFunction = __uFunction__;

    var uObject = __uObject__;

    var uType = __uType__;

    var uGuid = __uGuid__;

    var uUrl = __uUrl__;

    var uString = __uString__;

    var uWhen = __uWhen__;

    var uLibCamelCase = __uLibCamelCase__;

    var ul2o = __ul2o__;

    'use strict';
    exports._ = exports._;
    exports.linq = ul2o;
    exports.instantiate = uFunction.instantiate;
    exports.noop = uFunction.noop;
    exports.safeInvoke = uFunction.safeInvoke;
    exports.invert = uObject.invert;
    exports.type = uType.type;
    exports.isArrayLike = uType.isArrayLike;
    exports.isArrayOrArrayLike = uType.isArrayOrArrayLike;
    exports.emptyGuid = uGuid.emptyGuid;
    exports.isGuid = uGuid.isGuid;
    exports.isGuidEmpty = uGuid.isGuidEmpty;
    exports.newGuid = uGuid.newGuid;
    exports.getModuleNameForPath = uString.getModuleNameForPath;
    exports.format = uString.format;
    exports.param = uUrl.param;
    exports.cleanUrl = uUrl.cleanUrl;
    exports.fixupUrl = uUrl.fixupUrl;
    exports.when = uWhen;
    exports.flattenToPromises = uFunction.flattenToPromises;
    exports.camelCase = uLibCamelCase.camelCase;
    exports.unCamelCase = uLibCamelCase.unCamelCase;
})
//@ sourceMappingURL=util.js.map
