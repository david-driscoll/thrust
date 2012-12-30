define(["require", "exports", 'lodash', './when'], function(require, exports, _____, __when__) {
    /// <reference path="../../lib/DefinitelyTyped/requirejs/require-2.1.d.ts" />
    // Disabled until TS supports module per file in some way (ie exports is exports.<export> not  exports.moduleName.<export>)
    //export module function {
    'use strict';
    var _ = _____;

    var when = __when__;

    /**
    @module thrust.util
    @submodule thrust.util.func
    **/
    var slice = Array.prototype.slice;
    /**
    A function that does nothing, or no operation.  Hence the name noop.
    
    @method noop
    **/
    function noop() {
    }
    exports.noop = noop;
    var propertyIsEnumerable = noop.propertyIsEnumerable;
    /**
    Attempts to invoke, similar to _.invoke, but in this case it verifies that the property exist,
    and also verifies that it is a function, and not the noop method available in thrust.
    
    The intent is a method that allows override of functions, without creating custom code.
    
    @method saveInvoke
    @param {Array|Object} collection The container that has the items
    @param {String|Function} method The method name on every item, or the method to invoke against each item.
    @param {Object} [args]* The additional arguments to pass onto the method.
    **/
    function safeInvoke(collection, methodName) {
        var args = [];
        for (var _i = 0; _i < (arguments.length - 2); _i++) {
            args[_i] = arguments[_i + 2];
        }
        /*jshint bitwise:false */
                var index, iteratee = collection, result;
        if(!collection) {
            return [];
        }
        var args = slice.call(arguments, 2), isFunc = typeof methodName == 'function', methodExists;
        var length = iteratee.length;
        index = -1;
        if(length === length >>> 0) {
            result = Array(length);
            while(++index < length) {
                methodExists = (isFunc ? methodName : iteratee[index][methodName]);
                methodExists && methodExists !== noop && (result[index] = methodExists.apply(iteratee[index], args));
            }
        } else {
            var skipProto = typeof iteratee == 'function' && propertyIsEnumerable.call(iteratee, 'prototype');
            var props = _.keys(iteratee), propIndex = -1, length = props.length;
            result = Array(length);
            while(++propIndex < length) {
                index = props[propIndex];
                if(!(skipProto && index == 'prototype')) {
                    methodExists = (isFunc ? methodName : iteratee[index][methodName]);
                    methodExists && methodExists !== noop && (result[propIndex] = ((isFunc ? methodName : iteratee[index][methodName]).apply(iteratee[index], args)));
                }
            }
        }
        return result;
    }
    exports.safeInvoke = safeInvoke;
    /**
    * Constructor used to beget objects that wire needs to create using new.
    * @param ctor {Function} real constructor to be invoked
    * @param args {Array} arguments to be supplied to ctor
    */
    function Begetter(ctor, args) {
        return ctor.apply(this, args);
    }
    /**
    * Creates an object by either invoking ctor as a function and returning the result,
    * or by calling new ctor().  It uses a simple heuristic to try to guess which approach
    * is the "right" one.
    *
    * @param ctor {Function} function or constructor to invoke
    * @param args {Array} array of arguments to pass to ctor in either case
    *
    * @returns The result of invoking ctor with args, with or without new, depending on
    * the strategy selected.
    */
    function instantiate(ctor, args) {
        Begetter.prototype = ctor.prototype;
        Begetter.prototype.constructor = ctor;
        var begotten = new Begetter(ctor, args);
        Begetter.prototype = void 0;
        return begotten;
    }
    exports.instantiate = instantiate;
    /**
    Flatten and filter arrays down to just the existing promises.
    
    @method flattenToPromises
    @param {Array} Array to flatten, and filter.
    @returns {Array of Promises}
    **/
    function flattenToPromises(array) {
        return _.flatten(array).filter(function (x) {
            return when.isPromise(x);
        });
    }
    exports.flattenToPromises = flattenToPromises;
})
//@ sourceMappingURL=function.js.map
