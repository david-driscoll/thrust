define(["require", "exports", 'lodash'], function(require, exports, _____) {
    /// <reference path="../../../lib/DefinitelyTyped/requirejs/require-2.1.d.ts" />
    // Disabled until TS supports module per file in some way (ie exports is exports.<export> not  exports.moduleName.<export>)
    //export module libType {
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
