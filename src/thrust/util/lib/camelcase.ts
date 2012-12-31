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

    export function camelCase(string)
    {
        return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase);
    }
    export function unCamelCase(str)
    {
        return str.replace(/([A-Z])/g, function (all, s) { return '-' + s.toLowerCase(); });
    }
