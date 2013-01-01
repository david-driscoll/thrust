define(["require", "exports"], function(require, exports) {
    /// <reference path="../../../lib/DefinitelyTyped/requirejs/require-2.1.d.ts" />
    // Disabled until TS supports module per file in some way (ie exports is exports.<export> not  exports.moduleName.<export>)
    //export module guid {
    'use strict';
    
    var objectCurlyRegex = /\{\{|\}\}|\{(.*?)\}/g, numberCurlyRegex = /\{\{|\}\}|\{(\d+)\}/g, slice = Array.prototype.slice;
    /**
    C# style string format.
    
    @for thrust.util
    @method format
    **/
    function format(str) {
        var args = [];
        for (var _i = 0; _i < (arguments.length - 1); _i++) {
            args[_i] = arguments[_i + 1];
        }
        var args = slice.call(arguments, 1);
        if(typeof args[0] === 'object') {
            var a = args[0];
            return str.replace(objectCurlyRegex, function (m, n) {
                if(m == '{{') {
                    return '{';
                }
                if(m == '}}') {
                    return '}';
                }
                return a && a[n] || '';
            });
        }
        return str.replace(numberCurlyRegex, function (m, n) {
            if(m == '{{') {
                return '{';
            }
            if(m == '}}') {
                return '}';
            }
            return args[n] || '';
        });
    }
    exports.format = format;
    function getModuleNameForPath(name) {
        return (name.lastIndexOf('/') > -1 ? name.substring(name.lastIndexOf('/') + 1) : name).replace(/\./g, '-');
    }
    exports.getModuleNameForPath = getModuleNameForPath;
})
//@ sourceMappingURL=string.js.map
