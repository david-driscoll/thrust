define(["require", "exports", 'lodash', './function', './object', './type', './guid', './url', './string', './when', './lib/camelcase'], function(require, exports, ______, __uFunction__, __uObject__, __uType__, __uGuid__, __uUrl__, __uString__, __uWhen__, __uLibCamelCase__) {
    var __ = ______;

    var uFunction = __uFunction__;

    var uObject = __uObject__;

    var uType = __uType__;

    var uGuid = __uGuid__;

    var uUrl = __uUrl__;

    var uString = __uString__;

    var uWhen = __uWhen__;

    var uLibCamelCase = __uLibCamelCase__;

    'use strict';
    exports._ = __;
    exports.instantiate = uFunction.instantiate;
    exports.noop = uFunction.noop;
    exports.safeInvoke = uFunction.safeInvoke;
    exports.invert = uObject.invert;
    exports.type = uType.type;
    exports.isArrayLike = uType.isArrayLike;
    exports.isArrayOrArrayLike = uType.isArrayOrArrayLike;
    exports.emptyGuid = uGuid.emptyGuid;
    exports.isGuid = uGuid.isGuid;
    exports.isEmptyGuid = uGuid.isEmptyGuid;
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
//@ sourceMappingURL=main.js.map
