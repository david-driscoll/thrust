define(["require", "exports", './lib/param'], function(require, exports, __libParam__) {
    'use strict';
    
    var libParam = __libParam__;

    
    'use strict';
    var doubleSlashRegex = /\/\//g;
    exports.param = libParam;
    function cleanUrl(url) {
        return url.replace(doubleSlashRegex, '/');
    }
    exports.cleanUrl = cleanUrl;
    function fixupUrl(url, urlPath) {
        if(url.indexOf('http') === -1) {
            var path = urlPath.lastIndexOf('/') === urlPath.length - 1 ? urlPath.substring(0, -1) : urlPath;
            if(url.indexOf(path) === -1) {
                url = path + url;
            }
            url = cleanUrl(url);
        }
        return url;
    }
    exports.fixupUrl = fixupUrl;
})
//@ sourceMappingURL=url.js.map
