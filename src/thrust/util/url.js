define(["require", "exports", './lib/param'], function(require, exports, __libParam__) {
    /// <reference path="../../lib/DefinitelyTyped/requirejs/require-2.1.d.ts" />
    // Disabled until TS supports module per file in some way (ie exports is exports.<export> not  exports.moduleName.<export>)
    //export module guid {
    'use strict';
    
    var libParam = __libParam__;

    
    /**
    @module thrust.util
    @submodule thrust.util.url
    **/
    'use strict';
    var doubleSlashRegex = /\/\//g;
    /**
    jQuery param method to encode form parameters.
    
    @for thrust.util.url
    @method param
    **/
    exports.param = libParam;
    /**
    Cleans up double slashs in a url, used by thrust/data
    
    @method cleanUrl
    @param {String} url The url to clean
    @retrusn {String} The cleaned url
    **/
    function cleanUrl(url) {
        return url.replace(doubleSlashRegex, '/');
    }
    exports.cleanUrl = cleanUrl;
    /**
    Checks for existance of application path in the url, or http if the url is supposed to go to another location.
    
    @method fixupUrl
    @param {String} url The url to fixup
    @retrusn {String} The fixed url
    **/
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
