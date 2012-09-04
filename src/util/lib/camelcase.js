define(function()
{
    'use strict';
    /// <summary>
    /// Import jQuerys camelcase method.
    /// </summary>
    /// <returns></returns>
    var rmsPrefix  = /^-ms-/,
        rdashAlpha = /-([\da-z])/gi,
        fcamelCase = function (all, letter)
        {
            return (letter + "").toUpperCase();
        };

    var exports = {
        camelCase: function (string)
        {
            return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase);
        },
        unCamelCase: function (str)
        {
            return str.replace(/([A-Z])/g, function (all, s) { return '-' + s.toLowerCase(); });
        }
    };

    return exports;
});