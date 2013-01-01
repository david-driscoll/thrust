/// <reference path="../../../../lib/DefinitelyTyped/requirejs/require-2.1.d.ts" />

// Disabled until TS supports module per file in some way (ie exports is exports.<export> not  exports.moduleName.<export>)
//export module libType {

    'use strict';
    import _ = module('lodash')
    
    var toString = Object.prototype.toString,
        class2type = {};
    
    var _type = function (obj)
    {
        return obj == null ?
            String(obj) :
            class2type[toString.call(obj)] || "object";
    };

    _.each("Boolean Number String Function Array Date RegExp Object".split(" "),
        function (name : string)
    {
        class2type["[object " + name + "]"] = name.toLowerCase();
    });

    export var type = _type;
