define(['./lib/param', 'module'],
function (param, module)
{
    /**
    @module thrust.util
    @submodule thrust.util.url
    **/
    'use strict';
    var urlPath          = (module.config && module.config().path || ''),
        path             = urlPath.lastIndexOf('/') === urlPath.length - 1 ? urlPath.substring(0, -1) : urlPath,
        doubleSlashRegex = /\/\//g;

    var exports = {
        /**
        jQuery param method to encode form parameters.

        @for thrust.util.url
        @method param
        **/
        param: param,
        /**
        Cleans up double slashs in a url, used by thrust/data

        @method cleanUrl
        @param {String} url The url to clean
        @retrusn {String} The cleaned url
        **/
        cleanUrl: function (url) { return url.replace(doubleSlashRegex, '/'); },
        /**
        Checks for existance of application path in the url, or http if the url is supposed to go to another location.

        @method fixupUrl
        @param {String} url The url to fixup
        @retrusn {String} The fixed url
        **/
        fixupUrl: function (url)
        {
            if (url.indexOf('http') === -1)
            {
                if (url.indexOf(urlPath) === -1)
                {
                    url = urlPath + url;
                }
                url = exports.cleanUrl(path + url);
            }
            return url;
        }
    };
    return exports;
});