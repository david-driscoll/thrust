/// <reference path="../../../lib/DefinitelyTyped/requirejs/require.d.ts" />

// Disabled until TS supports module per file in some way (ie exports is exports.<export> not  exports.moduleName.<export>)
//export module guid {

    'use strict';
    import _ = module('lodash')

    /**
    @module thrust.util
    @submodule thrust.util.obj
    **/
    
    /**
    Inverts an object.  The keys become values, and the values become keys.
    Does not do any copying.

    @method invert
    @param {Object} obj The object to invert.
    @returns {Object} The inverted object.
    **/

    var hasOwn = Object.prototype.hasOwnProperty;
    export function invert(obj : any) : any
    {
        var result = {};
        for (var i in obj)
            if (hasOwn.call(obj, i))
                result[obj[i]] = i;
        return result;
    }
