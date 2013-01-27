define(["require", "exports"], function(require, exports) {
    'use strict';
    
    var objectCurlyRegex = /\{\{|\}\}|\{(.*?)\}/g, numberCurlyRegex = /\{\{|\}\}|\{(\d+)\}/g, slice = Array.prototype.slice;
    function format(str) {
        var formatArgs = [];
        for (var _i = 0; _i < (arguments.length - 1); _i++) {
            formatArgs[_i] = arguments[_i + 1];
        }
        if(typeof formatArgs[0] === 'object') {
            var a = formatArgs[0];
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
            return formatArgs[n] || '';
        });
    }
    exports.format = format;
    function getModuleNameForPath(name) {
        return (name.lastIndexOf('/') > -1 ? name.substring(name.lastIndexOf('/') + 1) : name).replace(/\./g, '-');
    }
    exports.getModuleNameForPath = getModuleNameForPath;
})
//@ sourceMappingURL=string.js.map
