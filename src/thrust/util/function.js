define(["require", "exports", 'lodash', './when'], function(require, exports, _____, __when__) {
    'use strict';
    var _ = _____;

    var when = __when__;

    var slice = Array.prototype.slice;
    function noop() {
    }
    exports.noop = noop;
    var propertyIsEnumerable = noop.propertyIsEnumerable;
    function safeInvoke(collection, methodName) {
        var args = [];
        for (var _i = 0; _i < (arguments.length - 2); _i++) {
            args[_i] = arguments[_i + 2];
        }
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
    function DynamiclyCreated(ctor, args) {
        return ctor.apply(this, args);
    }
    function instantiate(ctor, args, name) {
        DynamiclyCreated.prototype = ctor.prototype;
        DynamiclyCreated.prototype.constructor = ctor;
        var begotten = new DynamiclyCreated(ctor, args);
        DynamiclyCreated.prototype = void 0;
        return begotten;
    }
    exports.instantiate = instantiate;
    function flattenToPromises(array) {
        return _.flatten(array).filter(function (x) {
            return when.isPromise(x);
        });
    }
    exports.flattenToPromises = flattenToPromises;
})
//@ sourceMappingURL=function.js.map
