define(["require", "exports", 'lodash', './lib/type'], function(require, exports, _____, __libType__) {
    'use strict';
    var _ = _____;

    var libType = __libType__;

    exports.type = libType.type;
    function isArrayLike(o) {
        return (o && !_.isString(o) && o.length !== undefined) || false;
    }
    exports.isArrayLike = isArrayLike;
    function isArrayOrArrayLike(o) {
        return _.isArray(o) || (isArrayLike(o));
    }
    exports.isArrayOrArrayLike = isArrayOrArrayLike;
})
//@ sourceMappingURL=type.js.map
