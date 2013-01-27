/// <reference path="../../../lib/DefinitelyTyped/requirejs/require.d.ts" />

// Disabled until TS supports module per file in some way (ie exports is exports.<export> not  exports.moduleName.<export>)
//export module function {

    'use strict';
    import _ = module('lodash')

    import libType = module('./lib/type')

    /**
    @module thrust.util
    @submodule thrust.util.type
    **/

    /**
    Returns the type of the given Object

    NOTE: currently this type has been loaded from jQuery source code.

    @method type
    **/
    export var type = libType.type;

    /**
    Checks is the object is array like, like the aruguments object, but not a string, oe array.
    jQuery objects for example would report as array like.
    As well as knockout observable arrays report as array like.

    @method isArrayLike
    @param {Object} o The object to check
    @returns {Boolean} Is it true or false.
    **/
    export function isArrayLike(o)
    {
        return (o && !_.isString(o) && o.length !== undefined) || false;
    }

    /**
    Checks if the given object is array or array like.

    @method isArrayOrArrayLike
    @param {Object} o The object to check
    @returns {Boolean} Is it true or false.
    **/
    export function isArrayOrArrayLike(o)
    {
        return _.isArray(o) || (isArrayLike(o));
    }
