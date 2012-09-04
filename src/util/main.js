define([
    'lodash',
    //#region Our Methods
    './array',
    './collection',
    './function',
    './object',
    './type',
    './guid',
    './url',
    './string',
    './when',
    //#endregion
    //#region Third Party Methods
    './lib/extend',
    './lib/camelcase'
    //#endregion
],
function (_, uArray, uCollection, uFunction, uObject, uType)
{
    'use strict';
    /**
    @class thrust.util
    @uses thrust-util.array
    @uses thrust-util.collection
    @uses thrust-util.func
    @uses thrust-util.obj
    @uses thrust-util.type
    @uses thrust-util.url
    @uses thrust-util.when
    **/

    var args = Array.prototype.slice.call(arguments, 1);
    // Bring everything together.
    var exports = uCollection.extend.apply({
        /**
        Reference to lodash
        @property _
        @type {_}
        **/
        _: _,
        /**
        Reference to array methods
        @property array
        @type {Object}
        **/
        array: uArray,
        /**
        Reference to collection methods
        @property collection
        @type {Object}
        **/
        collection: uCollection,
        /**
        Reference to function methods
        @property function
        @type {Object}
        **/
        func: uFunction,
        /**
        Reference to object methods
        @property obj
        @type {Object}
        **/
        obj: uObject,
        /**
        Reference to type methods
        @property type
        @type {Object}
        **/
        type: uType
    }, args);
    return exports;
});