define(["require", "exports", 'lodash'], function(require, exports, _____) {
    'use strict';
    var _ = _____;

    var toString = Object.prototype.toString, class2type = {
    };
    var _type = function (obj) {
        return obj == null ? String(obj) : class2type[toString.call(obj)] || "object";
    };
    _.each("Boolean Number String Function Array Date RegExp Object".split(" "), function (name) {
        class2type["[object " + name + "]"] = name.toLowerCase();
    });
    exports.type = _type;
})
//@ sourceMappingURL=type.js.map
