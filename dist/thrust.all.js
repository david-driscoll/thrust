/*! Thrust JS Framework - v0.1.0 - 2012-09-03
* thrust-home
* Copyright (c) 2012 David Driscoll; Licensed MIT */


define('thrust/util/array',['lodash'], function (_)
{
    
    /**
    @module thrust.util
    @submodule thrust.util.array
    **/

    /**
        This method is an underscore/lodash helper.
        For documentation please see [http://underscorejs.org/#first](http://underscorejs.org/#first)

    @for thrust.util.array
    @method first
    **/

    /**
        This method is an underscore/lodash helper.
        For documentation please see [http://underscorejs.org/#first](http://underscorejs.org/#first)

    @method head
    **/

    /**
        This method is an underscore/lodash helper.
        For documentation please see [http://underscorejs.org/#initial](http://underscorejs.org/#initial)

    @method initial
    **/

    /**
        This method is an underscore/lodash helper.
        For documentation please see [http://underscorejs.org/#last](http://underscorejs.org/#last)

    @method last
    **/

    /**
        This method is an underscore/lodash helper.
        For documentation please see [http://underscorejs.org/#rest](http://underscorejs.org/#rest)

    @method tail
    **/

    /**
        This method is an underscore/lodash helper.
        For documentation please see [http://underscorejs.org/#rest](http://underscorejs.org/#rest)

    @method rest
    **/

    /**
        This method is an underscore/lodash helper.
        For documentation please see [http://underscorejs.org/#compact](http://underscorejs.org/#compact)

    @method compact
    **/

    /**
        This method is an underscore/lodash helper.
        For documentation please see [http://underscorejs.org/#flatten](http://underscorejs.org/#flatten)

    @method flatten
    **/

    /**
        This method is an underscore/lodash helper.
        For documentation please see [http://underscorejs.org/#without](http://underscorejs.org/#without)

    @method without
    **/

    /**
        This method is an underscore/lodash helper.
        For documentation please see [http://underscorejs.org/#union](http://underscorejs.org/#union)

    @method union
    **/

    /**
        This method is an underscore/lodash helper.
        For documentation please see [http://underscorejs.org/#intersection](http://underscorejs.org/#intersection)

    @method intersection
    **/

    /**
        This method is an underscore/lodash helper.
        For documentation please see [http://underscorejs.org/#difference](http://underscorejs.org/#difference)

    @method difference
    **/

    /**
        This method is an underscore/lodash helper.
        For documentation please see [http://underscorejs.org/#uniq](http://underscorejs.org/#uniq)

    @method uniq
    **/

    /**
        This method is an underscore/lodash helper.
        For documentation please see [http://underscorejs.org/#uniq](http://underscorejs.org/#uniq)

    @method unique
    **/

    /**
        This method is an underscore/lodash helper.
        For documentation please see [http://underscorejs.org/#zip](http://underscorejs.org/#zip)

    @method zip
    **/

    /**
        This method is an underscore/lodash helper.
        For documentation please see [http://underscorejs.org/#indexOf](http://underscorejs.org/#indexOf)

    @method indexOf
    **/

    /**
        This method is an underscore/lodash helper.
        For documentation please see [http://underscorejs.org/#lastIndexOf](http://underscorejs.org/#lastIndexOf)

    @method lastIndexOf
    **/

    /**
        This method is an underscore/lodash helper.
        For documentation please see [http://underscorejs.org/#range](http://underscorejs.org/#range)

    @method range
    **/

    var exports = _.pick(_, 'first', 'head', 'initial', 'last', 'tail', 'rest', 'compact', 'flatten', 'without', 'union', 'intersection', 'difference', 'uniq', 'unique', 'zip', 'indexOf', 'lastIndexOf', 'range');
    return exports;
});
/// <reference path="collection.js" />
define('thrust/util/collection',['lodash'], function (_)
{
    
    /**
    @module thrust.util
    @submodule thrust.util.collection
    **/

    /**
    This method is an underscore/lodash helper.
    For documentation please see [http://underscorejs.org/#each](http://underscorejs.org/#each)

    @for thrust.util.collection
    @method each
    **/

    /**
    This method is an underscore/lodash helper.
    For documentation please see [http://underscorejs.org/#each](http://underscorejs.org/#each)

    @method forEach
    **/

    /**
    This method is an underscore/lodash helper.
    For documentation please see [http://underscorejs.org/#map](http://underscorejs.org/#map)

    @method map
    **/

    /**
    This method is an underscore/lodash helper.
    For documentation please see [http://underscorejs.org/#map](http://underscorejs.org/#map)

    @method collect
    **/

    /**
    This method is an underscore/lodash helper.
    For documentation please see [http://underscorejs.org/#reduce](http://underscorejs.org/#reduce)

    @method reduce
    **/

    /**
    This method is an underscore/lodash helper.
    For documentation please see [http://underscorejs.org/#reduce](http://underscorejs.org/#reduce)

    @method inject
    **/

    /**
    This method is an underscore/lodash helper.
    For documentation please see [http://underscorejs.org/#reduce](http://underscorejs.org/#reduce)

    @method foldl
    **/

    /**
    This method is an underscore/lodash helper.
    For documentation please see [http://underscorejs.org/#reduceRight](http://underscorejs.org/#reduceRight)

    @method foldr
    **/

    /**
    This method is an underscore/lodash helper.
    For documentation please see [http://underscorejs.org/#reduceRight](http://underscorejs.org/#reduceRight)

    @method reduceRight
    **/

    /**
    This method is an underscore/lodash helper.
    For documentation please see [http://underscorejs.org/#find](http://underscorejs.org/#find)

    @method find
    **/

    /**
    This method is an underscore/lodash helper.
    For documentation please see [http://underscorejs.org/#find](http://underscorejs.org/#find)

    @method detect
    **/

    /**
    This method is an underscore/lodash helper.
    For documentation please see [http://underscorejs.org/#filter](http://underscorejs.org/#filter)

    @method filter
    **/

    /**
    This method is an underscore/lodash helper.
    For documentation please see [http://underscorejs.org/#filter](http://underscorejs.org/#filter)

    @method select
    **/

    /**
    This method is an underscore/lodash helper.
    For documentation please see [http://underscorejs.org/#reject](http://underscorejs.org/#reject)

    @method reject
    **/

    /**
    This method is an underscore/lodash helper.
    For documentation please see [http://underscorejs.org/#all](http://underscorejs.org/#all)

    @method all
    **/

    /**
    This method is an underscore/lodash helper.
    For documentation please see [http://underscorejs.org/#all](http://underscorejs.org/#all)

    @method every
    **/

    /**
    This method is an underscore/lodash helper.
    For documentation please see [http://underscorejs.org/#any](http://underscorejs.org/#any)

    @method any
    **/

    /**
    This method is an underscore/lodash helper.
    For documentation please see [http://underscorejs.org/#any](http://underscorejs.org/#any)

    @method some
    **/

    /**
    This method is an underscore/lodash helper.
    For documentation please see [http://underscorejs.org/#include](http://underscorejs.org/#include)

    @method include
    **/

    /**
    This method is an underscore/lodash helper.
    For documentation please see [http://underscorejs.org/#include](http://underscorejs.org/#include)

    @method contains
    **/

    /**
    This method is an underscore/lodash helper.
    For documentation please see [http://underscorejs.org/#invoke](http://underscorejs.org/#invoke)

    @method invoke
    **/

    /**
    This method is an underscore/lodash helper.
    For documentation please see [http://underscorejs.org/#pluck](http://underscorejs.org/#pluck)

    @method pluck
    **/

    /**
    This method is an underscore/lodash helper.
    For documentation please see [http://underscorejs.org/#max](http://underscorejs.org/#max)

    @method max
    **/

    /**
    This method is an underscore/lodash helper.
    For documentation please see [http://underscorejs.org/#min](http://underscorejs.org/#min)

    @method min
    **/

    /**
    This method is an underscore/lodash helper.
    For documentation please see [http://underscorejs.org/#sortBy](http://underscorejs.org/#sortBy)

    @method sortBy
    **/

    /**
    This method is an underscore/lodash helper.
    For documentation please see [http://underscorejs.org/#groupBy](http://underscorejs.org/#groupBy)

    @method groupBy
    **/

    /**
    This method is an underscore/lodash helper.
    For documentation please see [http://underscorejs.org/#sortedIndex](http://underscorejs.org/#sortedIndex)

    @method sortedIndex
    **/

    /**
    This method is an underscore/lodash helper.
    For documentation please see [http://underscorejs.org/#shuffle](http://underscorejs.org/#shuffle)

    @method shuffle
    **/

    /**
    This method is an underscore/lodash helper.
    For documentation please see [http://underscorejs.org/#toArray](http://underscorejs.org/#toArray)

    @method toArray
    **/

    /**
    This method is an underscore/lodash helper.
    For documentation please see [http://underscorejs.org/#size](http://underscorejs.org/#size)

    @method size
    **/

    /**
    This method is an underscore/lodash helper.
    For documentation please see [http://underscorejs.org/#extend](http://underscorejs.org/#extend)

    @method extend
    **/

    var exports = _.pick(_, 'each', 'forEach', 'map', 'collect', 'reduce', 'inject', 'foldl', 'reduceRight', 'foldr', 'find', 'detect', 'filter', 'select', 'reject', 'all', 'every', 'any', 'some', 'include',
        'contains', 'invoke', 'pluck', 'max', 'min', 'sortBy', 'groupBy', 'sortedIndex', 'shuffle', 'toArray', 'size', 'extend');
    return exports;
});
define('thrust/util/function',['lodash'], function (_)
{
    
    /**
    @module thrust.util
    @submodule thrust.util.func
    **/

    /**
    This method is an underscore/lodash helper.
    For documentation please see [http://underscorejs.org/#bind](http://underscorejs.org/#bind)

    @for thrust.util.func
    @method bind
    **/

    /**
    This method is an underscore/lodash helper.
    For documentation please see [http://underscorejs.org/#bindAll](http://underscorejs.org/#bindAll)

    @method bindAll
    **/

    /**
    This method is an underscore/lodash helper.
    For documentation please see [http://underscorejs.org/#memoize](http://underscorejs.org/#memoize)

    @method memoize
    **/

    /**
    This method is an underscore/lodash helper.
    For documentation please see [http://underscorejs.org/#delay](http://underscorejs.org/#delay)

    @method delay
    **/

    /**
    This method is an underscore/lodash helper.
    For documentation please see [http://underscorejs.org/#defer](http://underscorejs.org/#defer)

    @method defer
    **/

    /**
    This method is an underscore/lodash helper.
    For documentation please see [http://underscorejs.org/#throttle](http://underscorejs.org/#throttle)

    @method throttle
    **/

    /**
    This method is an underscore/lodash helper.
    For documentation please see [http://underscorejs.org/#debounce](http://underscorejs.org/#debounce)

    @method debounce
    **/

    /**
    This method is an underscore/lodash helper.
    For documentation please see [http://underscorejs.org/#once](http://underscorejs.org/#once)

    @method once
    **/

    /**
    This method is an underscore/lodash helper.
    For documentation please see [http://underscorejs.org/#after](http://underscorejs.org/#after)

    @method after
    **/

    /**
    This method is an underscore/lodash helper.
    For documentation please see [http://underscorejs.org/#wrap](http://underscorejs.org/#wrap)

    @method wrap
    **/

    /**
    This method is an underscore/lodash helper.
    For documentation please see [http://underscorejs.org/#compose](http://underscorejs.org/#compose)

    @method compose
    **/

    /**
    This method is an underscore/lodash helper.
    For documentation please see [http://underscorejs.org/#uniqueId](http://underscorejs.org/#uniqueId)

    @method uniqueId
    **/

    /**
    This method is an underscore/lodash helper.
    For documentation please see [http://underscorejs.org/#escape](http://underscorejs.org/#escape)

    @method escape
    **/

    /**
    This method is an underscore/lodash helper.
    For documentation please see [http://underscorejs.org/#result](http://underscorejs.org/#result)

    @method result
    **/

    var slice = Array.prototype.slice;
    var exports = _.pick(_, 'bind', 'bindAll', 'memoize', 'delay', 'defer', 'throttle', 'debounce', 'once', 'after', 'wrap', 'compose', 'uniqueId', 'escape', 'result');

    /**
    A function that does nothing, or no operation.  Hence the name noop.

    @method noop
    **/
    var noop = exports.noop = function () { };

    /**
    Attempts to invoke, similar to _.invoke, but in this case it verifies that the property exist,
        and also verifies that it is a function, and not the noop method available in thrust.

        The intent is a method that allows override of functions, without creating custom code.

    @method saveInvoke
    @param {Array|Object} collection The container that has the items
    @param {String|Function} method The method name on every item, or the method to invoke against each item.
    @param {Object} [args]* The additional arguments to pass onto the method.
    **/
    exports.safeInvoke = function (collection, methodName)
    {
        var index, iteratee = collection, result;
        if (!collection) return [];
        var args = slice.call(arguments, 2),
            isFunc = typeof methodName == 'function',
            methodExists;
        var length = iteratee.length; index = -1;
        if (length === length >>> 0)
        {
            result = Array(length);
            while (++index < length)
            {
                methodExists = (isFunc ? methodName : iteratee[index][methodName]);
                methodExists && methodExists !== noop && (result[index] = methodExists.apply(iteratee[index], args));
            }
        }
        else
        {
            var skipProto = typeof iteratee == 'function' &&
              propertyIsEnumerable.call(iteratee, 'prototype');

            var props = _.keys(iteratee),
                propIndex = -1,
                length = props.length;

            result = Array(length);
            while (++propIndex < length)
            {
                index = props[propIndex];
                if (!(skipProto && index == 'prototype'))
                {
                    methodExists = (isFunc ? methodName : iteratee[index][methodName]);
                    methodExists && methodExists !== noop && (result[propIndex] = ((isFunc ? methodName : iteratee[index][methodName]).apply(iteratee[index], args)));
                }
            }
        };
        return result;
    };

    /**
	 * Constructor used to beget objects that wire needs to create using new.
	 * @param ctor {Function} real constructor to be invoked
	 * @param args {Array} arguments to be supplied to ctor
	 */
    function Begetter(ctor, args)
    {
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
    exports.instantiate = function (ctor, args)
    {
        Begetter.prototype = ctor.prototype;
        Begetter.prototype.constructor = ctor;
        var begotten = new Begetter(ctor, args);
        Begetter.prototype = void 0;
        return begotten;
    };

    return exports;
});
define('thrust/util/object',['lodash'], function (_)
{
    
    /**
    @module thrust.util
    @submodule thrust.util.obj
    **/

    /**
    This method is an underscore/lodash helper.
    For documentation please see [http://underscorejs.org/#keys](http://underscorejs.org/#keys)

    @for thrust.util.obj
    @method keys
    **/

    /**
    This method is an underscore/lodash helper.
    For documentation please see [http://underscorejs.org/#values](http://underscorejs.org/#values)

    @method values
    **/

    /**
    This method is an underscore/lodash helper.
    For documentation please see [http://underscorejs.org/#functions](http://underscorejs.org/#functions)

    @method functions
    **/

    /**
    This method is an underscore/lodash helper.
    For documentation please see [http://underscorejs.org/#functions](http://underscorejs.org/#functions)

    @method methods
    **/

    /**
    This method is an underscore/lodash helper.
    For documentation please see [http://underscorejs.org/#pick](http://underscorejs.org/#pick)

    @method pick
    **/

    /**
    This method is an underscore/lodash helper.
    For documentation please see [http://underscorejs.org/#defaults](http://underscorejs.org/#defaults)

    @method defaults
    **/

    /**
    This method is an underscore/lodash helper.
    For documentation please see [http://underscorejs.org/#clone](http://underscorejs.org/#clone)

    @method clone
    **/

    /**
    This method is an underscore/lodash helper.
    For documentation please see [http://underscorejs.org/#tap](http://underscorejs.org/#tap)

    @method tap
    **/

    /**
    This method is an underscore/lodash helper.
    For documentation please see [http://underscorejs.org/#has](http://underscorejs.org/#has)

    @method has
    **/

    var exports = _.pick(_, 'keys', 'methods', 'functions', 'methods', 'pick', 'defaults', 'clone', 'tap', 'has');

    /**
    Inverts an object.  The keys become values, and the values become keys.
    Does not do any copying.

    @method invert
    @param {Object} obj The object to invert.
    @returns {Object} The inverted object.
    **/

    var hasOwn = Object.prototype.hasOwnProperty;
    exports.invert = function (obj)
    {
        var result = {};
        for (var i in obj)
            if (hasOwn.call(obj, i))
                result[obj[i]] = i;
        return result;
    };
    
    return exports;
});
/*!
 * jQuery JavaScript lib v1.7.2
 * http://jquery.com/
 *
 * Copyright 2011, John Resig
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 * Copyright 2011, The Dojo Foundation
 * Released under the MIT, BSD, and GPL Licenses.
 *
 * Date: Wed Mar 21 12:46:34 2012 -0700
 */
define('thrust/util/lib/type',['thrust/util/collection'],
function (uCollection)
{
    
    var toString = Object.prototype.toString,
        class2type = {};
    
    var type = function (obj)
    {
        return obj == null ?
            String(obj) :
            class2type[toString.call(obj)] || "object";
    };

    uCollection.each("Boolean Number String Function Array Date RegExp Object".split(" "), function (name, i)
    {
        class2type["[object " + name + "]"] = name.toLowerCase();
    });

    return { type: type };
});
define('thrust/util/type',['lodash', './lib/type'],
function (_, type)
{
    
    /**
    @module thrust.util
    @submodule thrust.util.type
    **/

    /**
    This method is an underscore/lodash helper.
    For documentation please see [http://underscorejs.org/#isEqual](http://underscorejs.org/#isEqual)

    @for thrust.util.type
    @method isEqual
    **/

    /**
    This method is an underscore/lodash helper.
    For documentation please see [http://underscorejs.org/#isEmpty](http://underscorejs.org/#isEmpty)

    @method isEmpty
    **/

    /**
    This method is an underscore/lodash helper.
    For documentation please see [http://underscorejs.org/#isElement](http://underscorejs.org/#isElement)

    @method isElement
    **/

    /**
    This method is an underscore/lodash helper.
    For documentation please see [http://underscorejs.org/#isArray](http://underscorejs.org/#isArray)

    @method isArray
    **/

    /**
    This method is an underscore/lodash helper.
    For documentation please see [http://underscorejs.org/#isObject](http://underscorejs.org/#isObject)

    @method isObject
    **/

    /**
    This method is an underscore/lodash helper.
    For documentation please see [http://underscorejs.org/#isArguments](http://underscorejs.org/#isArguments)

    @method isArguments
    **/

    /**
    This method is an underscore/lodash helper.
    For documentation please see [http://underscorejs.org/#isFunction](http://underscorejs.org/#isFunction)

    @method isFunction
    **/

    /**
    This method is an underscore/lodash helper.
    For documentation please see [http://underscorejs.org/#isString](http://underscorejs.org/#isString)

    @method isString
    **/

    /**
    This method is an underscore/lodash helper.
    For documentation please see [http://underscorejs.org/#isNumber](http://underscorejs.org/#isNumber)

    @method isNumber
    **/

    /**
    This method is an underscore/lodash helper.
    For documentation please see [http://underscorejs.org/#isFinite](http://underscorejs.org/#isFinite)

    @method isFinite
    **/

    /**
    This method is an underscore/lodash helper.
    For documentation please see [http://underscorejs.org/#isBoolean](http://underscorejs.org/#isBoolean)

    @method isBoolean
    **/

    /**
    This method is an underscore/lodash helper.
    For documentation please see [http://underscorejs.org/#isDate](http://underscorejs.org/#isDate)

    @method isDate
    **/

    /**
    This method is an underscore/lodash helper.
    For documentation please see [http://underscorejs.org/#isRegExp](http://underscorejs.org/#isRegExp)

    @method isRegExp
    **/

    /**
    This method is an underscore/lodash helper.
    For documentation please see [http://underscorejs.org/#isNaN](http://underscorejs.org/#isNaN)

    @method isNaN
    **/

    /**
    This method is an underscore/lodash helper.
    For documentation please see [http://underscorejs.org/#isNull](http://underscorejs.org/#isNull)

    @method isNull
    **/

    /**
    This method is an underscore/lodash helper.
    For documentation please see [http://underscorejs.org/#isUndefined](http://underscorejs.org/#isUndefined)

    @method isUndefined
    **/

    var exports = _.pick(_, 'isEqual', 'isEmpty', 'isElement', 'isArray', 'isObject', 'isArguments', 'isFunction', 'isString', 'isNumber', 'isFinite', 'isBoolean', 'isDate', 'isRegExp', 'isNaN', 'isNull', 'isUndefined');

    _.extend(exports, {
        /**
        Returns the type of the given Object

        NOTE: currently this type has been loaded from jQuery source code.

        @method type
        **/
        type: type.type,
        /**
        Checks is the object is array like, like the aruguments object, but not a string, oe array.
        jQuery objects for example would report as array like.
        As well as knockout observable arrays report as array like.

        @method isArrayLike
        @param {Object} o The object to check
        @returns {Boolean} Is it true or false.
        **/
        isArrayLike: function (o)
        {
            return (o && !exports.isString(o) && o.length !== undefined) || false;
        },
        /**
        Checks if the given object is array or array like.

        @method isArrayOrArrayLike
        @param {Object} o The object to check
        @returns {Boolean} Is it true or false.
        **/
        isArrayOrArrayLike: function (o)
        {
            return exports.isArray(o) || (exports.isArrayLike(o));
        }
    });

    return exports;
});

define('thrust/util/guid',['./type'],
function (type)
{
    
    /**
    @module thrust.util
    @submodule thrust.util
    **/

    var S4 = function ()
    {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    },
    guidRegex = /^(\{{0,1}([0-9a-fA-F]){8}-([0-9a-fA-F]){4}-([0-9a-fA-F]){4}-([0-9a-fA-F]){4}-([0-9a-fA-F]){12}\}{0,1})$/,
    emtptyGuid = '00000000-0000-0000-0000-000000000000';

    var exports = {
        /**
        Returns a new sudo guid, limiations in JavaScript make must more reliable guids fairly difficult to create.

        @for thrust.util
        @method newGuid
        @returns {Guid} The new guid.
        **/
        newGuid: function () { return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4()); },
        /**
        Returns an empty guid.

        @method emptyGuid
        @returns {Guid} The emtpty guid.
        **/
        emptyGuid: function () { return emtptyGuid; },
        /**
        Checks if the given string is a guid.

        @method isGuid
        @param {Guid} guid
        @returns {Boolean} If the guid is a guid or not.
        **/
        isGuid: function (guid)
        {
            return type.isString(guid) ? guidRegex.test(guid) : false;
        },
        /**
        Checks if the Guid is an Empty Guid

        @method isGuidEmpty
        @param {Guid} guid
        @returns {Boolean} If the guid is a guid or not.
        **/
        isGuidEmpty: function (guid) { return guid === emtptyGuid; }
    };
    return exports;
});
/*!
 * jQuery JavaScript lib v1.7.2
 * http://jquery.com/
 *
 * Copyright 2011, John Resig
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 * Copyright 2011, The Dojo Foundation
 * Released under the MIT, BSD, and GPL Licenses.
 *
 * Date: Wed Mar 21 12:46:34 2012 -0700
 */
define('thrust/util/lib/param',['thrust/util/collection', 'thrust/util/type', 'module'],
function (uCollection, uType, module)
{
    
    var r20 = /%20/g,
        rbracket = /\[\]$/;
    var param = function (a, traditional)
    {
        var prefix,
            s   = [],
            add = function (key, value)
            {
                // If value is a function, invoke it and return its value
                value = uType.isFunction(value) ? value() : (value == null ? "" : value);
                s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value);
            };

        // Set traditional to true for jQuery <= 1.3.2 behavior.
        if (traditional === undefined)
        {
            traditional = !!module.config().traditionalEncoding;
        }

        // If an array was passed in, assume that it is an array of form elements.
        if (uType.isArrayOrArrayLike(a))
        {
            // Serialize the form elements
            uCollection.each(a, function (x)
            {
                add(x.name, x.value);
            });
        }
        else
        {
            // If traditional, encode the "old" way (the way 1.3.2 or older
            // did it), otherwise encode params recursively.
            for (prefix in a)
            {
                buildParams(prefix, a[prefix], traditional, add);
            }
        }

        // Return the resulting serialization
        return s.join("&").replace(r20, "+");
    };

    function buildParams(prefix, obj, traditional, add)
    {
        if (jQuery.isArray(obj))
        {
            // Serialize array item.
            jQuery.each(obj, function (i, v)
            {
                if (traditional || rbracket.test(prefix))
                {
                    // Treat each array item as a scalar.
                    add(prefix, v);

                } else
                {
                    // If array item is non-scalar (array or object), encode its
                    // numeric index to resolve deserialization ambiguity issues.
                    // Note that rack (as of 1.0.0) can't currently deserialize
                    // nested arrays properly, and attempting to do so may cause
                    // a server error. Possible fixes are to modify rack's
                    // deserialization algorithm or to provide an option or flag
                    // to force array serialization to be shallow.
                    buildParams(prefix + "[" + (typeof v === "object" || jQuery.isArray(v) ? i : "") + "]", v, traditional, add);
                }
            });

        }
        else if (!traditional && obj != null && typeof obj === "object")
        {
            // Serialize object item.
            for (var name in obj)
            {
                buildParams(prefix + "[" + name + "]", obj[name], traditional, add);
            }

        } else
        {
            // Serialize scalar item.
            add(prefix, obj);
        }
    }
    return { param: param };
});
define('thrust/util/url',['./lib/param', 'module'],
function (param, module)
{
    /**
    @module thrust.util
    @submodule thrust.util.url
    **/
    
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
define('thrust/util/string',[],function ()
{
    var objectCurlyRegex = /\{\{|\}\}|\{(.*?)\}/g,
        numberCurlyRegex = /\{\{|\}\}|\{(\d+)\}/g,
        slice            = Array.prototype.slice,
        format           = function (str)
        {
            var args = slice.call(arguments, 1);
            if (typeof args[0] === 'object')
            {
                var a = args[0];
                return str.replace(objectCurlyRegex, function (m, n)
                {
                    if (m == '{{') { return '{'; }
                    if (m == '}}') { return '}'; }
                    return a && a[n] || '';
                });
            }
            return str.replace(numberCurlyRegex, function (m, n)
            {
                if (m == '{{') { return '{'; }
                if (m == '}}') { return '}'; }
                return args[n] || '';
            });
        };

    String.prototype.format = function () { return format.apply(null, [this].concat(slice.call(arguments))); };

    return {
        /**
        C# style string format.

        @for thrust.util
        @method format
        **/
        format: format,
        getModuleNameForPath: function (name) { return (name.lastIndexOf('/') > -1 ? name.substring(name.lastIndexOf('/') + 1) : name).replace(/\./g, '-'); }
    };
});
/** @license MIT License (c) copyright B Cavalier & J Hann */

/*jshint devel: true*/
/*global console:true, setTimeout:true*/

/**
 * This is a drop-in replacement for the when module that sets up automatic
 * debug output for promises created or consumed by when.js.  Use this
 * instead of when to help with debugging.
 *
 * WARNING: This module **should never** be use this in a production environment.
 * It exposes details of the promise
 *
 * In an AMD environment, you can simply change your path or package mappings:
 *
 * paths: {
 *   // 'when': 'path/to/when/when'
 *   'when': 'path/to/when/debug'
 * }
 *
 * or
 *
 * packages: [
 *   // { name: 'when', location: 'path/to/when', main: 'when' }
 *   { name: 'when', location: 'path/to/when', main: 'debug' }
 * ]
 *
 * In a CommonJS environment, you can directly require this module where
 * you would normally require 'when':
 *
 * // var when = require('when');
 * var when = require('when/debug');
 *
 * Or you can temporarily modify the package.js to point main at debug.
 * For example, when/package.json:
 *
 * ...
 * "main": "./debug"
 * ...
 *
 * @author brian@hovercraftstudios.com
 */
(function(define) {
define('when/debug',['./when'], function(when) {

	var promiseId, freeze, pending, exceptionsToRethrow, undef;

	promiseId = 0;
	freeze = Object.freeze || function(o) { return o; };
	pending = {};

	exceptionsToRethrow = {
		RangeError: 1,
		ReferenceError: 1,
		SyntaxError: 1,
		TypeError: 1
	};

	/**
	 * Setup debug output handlers for the supplied promise.
	 * @param p {Promise} A trusted (when.js) promise
	 * @return p
	 */
	function debugPromise(p) {
		// TODO: Need to find a way for promises returned by .then()
		// to also be debug promises.
		p.then(
			undef,
			function(err) {
				if(p.id) {
					console.error(p.toString());
				} else {
					console.error('[object Promise] REJECTED:', err);
				}

				return when.reject(err);
			}
		);

		return p;
	}

	function wrapCallback(cb) {
		if(typeof cb != 'function') {
			return cb;
		}

		return function(v) {
			try {
				return cb(v);
			} catch(err) {
				if(err) {
					if (err.name in exceptionsToRethrow) {
						setTimeout(function() {
							throw err;
						}, 0);
					} else if (err.stack) {
						console.error(err.stack);
					}
				}

				throw err;
			}
		};
	}

	function wrapCallbacks(callbacks) {
		var cb, args, len, i;

		args = [];

		for(i = 0, len = callbacks.length; i < len; i++) {
			args[i] = typeof (cb = callbacks[i]) == 'function'
				? wrapCallback(cb)
				: cb;
		}

		return args;
	}

	/**
	 * Helper to form debug string for promises depending on their
	 * current state
	 * @param name
	 * @param id
	 * @param status
	 * @param value
	 */
	function toString(name, id, status, value) {
		var s = '[object ' + name + ' ' + id + '] ' + status;

		if(value !== pending) {
			s += ': ' + value;
		}

		return s;
	}

	function F() {}
	function beget(o) {
		F.prototype = o;
		o = new F();
		F.prototype = undef;

		return o;
	}

	/**
	 * Replacement for when() that sets up debug logging on the
	 * returned promise.
	 */
	function whenDebug() {
		return debugPromise(when.apply(null, wrapCallbacks(arguments)));
	}

	/**
	 * Replacement for when.defer() that sets up debug logging
	 * on the created Deferred, its resolver, and its promise.
	 * @param [id] anything optional identifier for this Deferred that will show
	 * up in debug output
	 * @return {Deferred} a Deferred with debug logging
	 */
	function deferDebug() {
		var d, status, value, origResolve, origReject, origThen, id;

		// Delegate to create a Deferred;
		d = when.defer();

		status = 'pending';
		value = pending;

		// if no id provided, generate one.  Not sure if this is
		// useful or not.
		id = arguments[arguments.length - 1];
		if(id === undef) {
			id = ++promiseId;
		}

		// Promise and resolver are frozen, so have to delegate
		// in order to setup toString() on promise, resolver,
		// and deferred
		d.promise = beget(d.promise);
		d.promise.toString = function() {
			return toString('Promise', id, status, value);
		};

		d.resolver = beget(d.resolver);
		d.resolver.toString = function() {
			return toString('Resolver', id, status, value);
		};

		origResolve = d.resolver.resolve;
		d.resolve = d.resolver.resolve = function(val) {
			value = val;
			status = 'resolving';
			return origResolve.apply(undef, arguments);
		};

		origReject = d.resolver.reject;
		d.reject = d.resolver.reject = function(err) {
			value = err;
			status = 'REJECTING';
			return origReject.apply(undef, arguments);
		};

		d.toString = function() {
			return toString('Deferred', id, status, value);
		};

		// Setup final state change handlers
		d.then(
			function(v) { status = 'resolved'; return v; },
			function(e) { status = 'REJECTED'; return when.reject(e); }
		);

		// Experimenting with setting up ways to also debug promises returned
		// by .then().  Also need to find a way to extend the id in a way that
		// makes it obvious the returned promise is NOT the original, but is
		// related to it--it's downstream in the promise chain.
		origThen = d.promise.then;
		d.then = d.promise.then = function(cb, eb, pb) {

			var id = d.id + '>' + (++promiseId);

			var p = origThen.apply(null, wrapCallbacks(arguments));

			p.id = id;
			p = beget(p);
			p.toString = function() {
				return toString('Promise', p.id, status, value);
			};
			
			// See below. Not sure if debug promises should be frozen
			return freeze(p);
		};

		// Add an id to all directly created promises.  It'd be great
		// to find a way to propagate this id to promise created by .then()
		d.id = d.promise.id = d.resolver.id = id;

		// Attach debug handlers after the substitute promise
		// has been setup, so the id can be logged.
		//debugPromise(d.promise);

		// TODO: Should we still freeze these?
		// Seems safer for now to err on the side of caution and freeze them,
		// but it could be useful to all them to be modified during debugging.
		freeze(d.promise);
		freeze(d.resolver);

		return d;
	}

	whenDebug.defer = deferDebug;
	whenDebug.isPromise = when.isPromise;

	function makeDebug(name, func) {
		whenDebug[name] = function() {
			return debugPromise(func.apply(when, arguments));
		};
	}

	// For each method we haven't already replaced, replace it with
	// one that sets up debug logging on the returned promise
	for(var p in when) {
		if(when.hasOwnProperty(p) && !(p in whenDebug)) {
			makeDebug(p, when[p]);
		}
	}

	return whenDebug;

});
})(typeof define == 'function'
	? define
	: function (deps, factory) { typeof module != 'undefined'
		? (module.exports = factory(require('./when')))
		: (this.when      = factory(this.when));
	}
	// Boilerplate for AMD, Node, and browser global
);

/** @license MIT License (c) copyright B Cavalier & J Hann */

/**
 * apply.js
 * Helper for using arguments-based and variadic callbacks with any
 * {@link Promise} that resolves to an array.
 *
 * @author brian@hovercraftstudios.com
 */

(function(define) {
define('when/apply',[],function() {

    var toString = Object.prototype.toString;
    
    /**
     * Creates a function that accepts a function that takes individual
     * arguments (it can be variadic, too), and returns a new function that
     * takes a single array as its only param:
     *
     * function argBased(a, b, c) {
     *   return a + b + c;
     * }
     *
     * argBased(1, 2, 3); // 6
     *
     * // Create an array-based version of argBased
     * var arrayBased = apply(argBased);
     * var inputs = [1, 2, 3];
     *
     * arrayBased(inputs); // 6
     *
     * With promises:
     *
     * var d = when.defer();
     * d.promise.then(arrayBased);
     *
     * d.resolve([1, 2, 3]); // arrayBased called with args 1, 2, 3 -> 6
     *
     * @param f {Function} arguments-based function
     *
     * @returns {Function} a new function that accepts an array
     */
    return function(f) {
        /**
         * @param array {Array} must be an array of arguments to use to apply the original function
         *
         * @returns the result of applying f with the arguments in array.
         */
        return function(array) {
            // It better be an array
            if(toString.call(array) != '[object Array]') {
                throw new Error('apply called with non-array arg');
            }

            return f.apply(null, array);
        };
    };

});
})(typeof define == 'function'
    ? define
    : function (factory) { typeof module != 'undefined'
        ? (module.exports  = factory())
        : (this.when_apply = factory());
    }
    // Boilerplate for AMD, Node, and browser global
);



/** @license MIT License (c) copyright B Cavalier & J Hann */

/*global setTimeout:true*/

/**
 * delay.js
 *
 * Helper that returns a promise that resolves after a delay.
 *
 * @author brian@hovercraftstudios.com
 */

(function(define) {
define('when/delay',['./when'], function(when) {

    var undef;

    /**
     * Creates a new promise that will resolve after a msec delay.  If promise
     * is supplied, the delay will start *after* the supplied promise is resolved.
     *
     * Usage:
     * // Do something after 1 second, similar to using setTimeout
     * delay(1000).then(doSomething);
     * // or
     * when(delay(1000), doSomething);
     *
     * // Do something 1 second after triggeringPromise resolves
     * delay(triggeringPromise, 1000).then(doSomething, handleRejection);
     * // or
     * when(delay(triggeringPromise, 1000), doSomething, handleRejection);
     *
     * @param [promise] anything - any promise or value after which the delay will start
     * @param msec {Number} delay in milliseconds
     */
    return function delay(promise, msec) {
        if(arguments.length < 2) {
            msec = promise >>> 0;
            promise = undef;
        }

        var deferred = when.defer();

        setTimeout(function() {
            deferred.resolve(promise);
        }, msec);

        return deferred.promise;
    };

});
})(typeof define == 'function'
    ? define
    : function (deps, factory) { typeof module != 'undefined'
        ? (module.exports = factory(require('./when')))
        : (this.when_delay = factory(this.when));
    }
    // Boilerplate for AMD, Node, and browser global
);



/** @license MIT License (c) copyright B Cavalier & J Hann */

/*global setTimeout:true, clearTimeout:true*/

/**
 * timeout.js
 *
 * Helper that returns a promise that rejects after a specified timeout,
 * if not explicitly resolved or rejected before that.
 *
 * @author brian@hovercraftstudios.com
 */

(function(define) {
define('when/timeout',['./when'], function(when) {

    var undef;

    /**
     * Returns a new promise that will automatically reject after msec if
     * the supplied promise doesn't resolve or reject before that.
     *
     * Usage:
     *
     * var d = when.defer();
     * // Setup d however you need
     *
     * // return a new promise that will timeout if d doesn't resolve/reject first
     * return timeout(d.promise, 1000);
     *
     * @param promise anything - any promise or value that should trigger
     *  the returned promise to resolve or reject before the msec timeout
     * @param msec {Number} timeout in milliseconds
     *
     * @returns {Promise}
     */
    return function timeout(promise, msec) {
        var deferred, timeoutRef;

        deferred = when.defer();

        timeoutRef = setTimeout(function onTimeout() {
            timeoutRef && deferred.reject(new Error('timed out'));
        }, msec);

        function cancelTimeout() {
            clearTimeout(timeoutRef);
            timeoutRef = undef;
        }

        when(promise,
            function(value) {
                cancelTimeout();
                deferred.resolve(value);
            },
            function(reason) {
                cancelTimeout();
                deferred.reject(reason);
            }
        );

        return deferred.promise;
    };

});
})(typeof define == 'function'
    ? define
    : function (deps, factory) { typeof module != 'undefined'
        ? (module.exports = factory(require('./when')))
        : (this.when_timeout = factory(this.when));
    }
    // Boilerplate for AMD, Node, and browser global
);



define('thrust/util/when',['when/debug', 'when/apply', 'when/delay', 'when/timeout', 'thrust/util/array'],
function (when, apply, delay, timeout, util)
{
    /**
    @module thrust.util
    @submodule thrust.util.when
    **/

    /**
    when.apply, used to apply when results over a function, similar to jQuerys Deferred.
    See for more information: [https://github.com/cujojs/when/wiki/when-apply](https://github.com/cujojs/when/wiki/when-apply)

    @for thrust.util.when
    @method when.apply
    **/
    when.apply = apply,
    /**
    when.delay, creates a promise that resolves in x ms, using setTimeout.
    See for more information: [https://github.com/cujojs/when/wiki/when-delay](https://github.com/cujojs/when/wiki/when-delay)

    @method when.delay
    **/
    when.delay = delay;
    /**
    when.timeout, creates a promise that will timeout if x ms if not resolved.
    See for more information: [https://github.com/cujojs/when/wiki/when-timeout](https://github.com/cujojs/when/wiki/when-timeout)

    @method when.timeout
    **/
    when.timeout = timeout;

    return {
        /**
        Access to whenjs, the main library for promises.

        @method when
        **/
        when: when,
        /**
        Flatten and filter arrays down to just the existing promises.

        @method flattenToPromises 
        @param {Array} Array to flatten, and filter.
        @returns {Array of Promises} 
        **/
        flattenToPromises: function (array)
        {
            return util.flatten(array).filter(function (x)
            {
                return when.isPromise(x);
            })
        }
    };
});
/*!
 * jQuery JavaScript lib v1.7.2
 * http://jquery.com/
 *
 * Copyright 2011, John Resig
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 * Copyright 2011, The Dojo Foundation
 * Released under the MIT, BSD, and GPL Licenses.
 *
 * Date: Wed Mar 21 12:46:34 2012 -0700
 */
define('thrust/util/lib/extend',['thrust/util/collection', 'thrust/util/type'],
function (uCollection, uType)
{
    
    var extend = function ()
    {
        var options, name, src, copy, copyIsArray, clone,
            target = arguments[0] || {},
            i      = 1,
            length = arguments.length,
            deep   = false;

        // Handle a deep copy situation
        if (typeof target === "boolean")
        {
            deep = target;
            target = arguments[1] || {};
            // skip the boolean and the target
            i = 2;
        }

        // Handle case when target is a string or something (possible in deep copy)
        if (typeof target !== "object" && !uType.isFunction(target))
        {
            target = {};
        }

        // extend jQuery itself if only one argument is passed
        if (length === i)
        {
            target = this;
            --i;
        }

        for (; i < length; i++)
        {
            // Only deal with non-null/undefined values
            if ((options = arguments[i]) != null)
            {
                // Extend the base object
                for (name in options)
                {
                    src = target[name];
                    copy = options[name];

                    // Prevent never-ending loop
                    if (target === copy)
                    {
                        continue;
                    }

                    // Recurse if we're merging plain objects or arrays
                    if (deep && copy && (uType.isObject(copy) || (copyIsArray = uType.isArray(copy))))
                    {
                        if (copyIsArray)
                        {
                            copyIsArray = false;
                            clone = src && uType.isArray(src) ? src : [];

                        } else
                        {
                            clone = src && uType.isObject(src) ? src : {};
                        }

                        // Never move original objects, clone them
                        target[name] = extend(deep, clone, copy);

                        // Don't bring in undefined values
                    } else if (copy !== undefined)
                    {
                        target[name] = copy;
                    }
                }
            }
        }

        // Return the modified object
        return target;
    };
    return {
        altExtend: extend,
        deepCopy: function ()
        {
            var args = Array.prototype.slice.call(arguments);
            return extend.apply(null, [true].concat(args));
        }
    };
});
define('thrust/util/lib/camelcase',[],function()
{
    
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
define('thrust/util/main',[
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
define('thrust/util', ['thrust/util/main'], function (main) { return main; });

define('thrust/instance',['thrust/util'],
function(util)
{
    /**
    Gets the thrust instances.

    @module thrust
    **/
    var when = util.when;
    return {
        /**
        The available thrust instances
        index by name

        @for thrust.instance
        @property instances
        @private
        **/
        instances: {},
        /**
        The loading thurst instances.
        index by name

        @property loadingInstances
        @private
        **/
        loadingInstances: {},
        /**
        Gets a named thrust stance if it exists.
    
        @method getInstance
        @static
        @param {String} name The instance name
        @returns {Thrust} The thrust instance
        **/
        getInstance: function (name)
        {
            return this.instances[name] || false;
        },
        /**
        Fetchs a named thrust stance if it exists.
        This loads asyncronously, as the instance may not be loaded
    
        @method __fetchInstance
        @static
        @private
        @param {String} name The instance name
        @returns {Promise} To a thrust instance spec
        **/
        fetchInstance: function (name)
        {
            return this.loadingInstances[name] || (this.loadingInstances[name] = when.defer());
        }
    };
});
define('thrust/config',['./instance'],
function (thrustInstance)
{
    /**
    Provides thrust configuration
    
    @module thrust
    @submodule thrust.config
    **/
    

    var config = {
        /**
        This property, tells the framework if it should throw errors or not.
        In production it's recommended not to throw errors, that way if a component fails
        there is a chance the application can still recover.

        @for thrust.config
        @property throwErrors
        @readOnly
        @type {Boolean}
        @default false
        **/
        throwErrors: true,
        /**
        Tells the framework to run in async mode, this may delay start up, but will make image loading and inital running appear faster.

        @property async
        @readOnly
        @type {Boolean}
        @default true
        **/
        async: true,
        url: {
            /**
            This property, gives the framework it's default path, if different than '/'
            
            @property url.path
            @readOnly
            @type {String}
            @default "/"
            **/
            path: '/',
            /**
            This property, tells the framework how it should encode array form data.
            In general, for ASP.NET based applications, traditional should be true.
            For Ruby/Python based applications, this should be false.
            
            @property url.traditionalEncoding
            @readOnly
            @type {Boolean}
            @default false
            **/
            traditionalEncoding: true
        },
        log: {
            /**
            This lends to the log level of thrust.

                ERROR: 1
                WARN: 2
                INFO: 3
                DEBUG: 4
            
            @property log.level
            @readOnly
            @type {String}
            @default 1
            **/
            level: 4,
            /**
            This toggles enabling on or off.
            
            @property log.enabled
            @readOnly
            @type {Boolean}
            @default false
            **/
            enabled: true
        },
        /**
        Plugins for thrust to load, override with your own set if you have a different set.

        @property plugins
        @readOnly
        @type {Array}
        **/
        plugins: [
            'thrust/data',
            'thrust/dom',
            'thrust/template',
            'thrust/spa',
        ],
        /**
        The set of modules to preload with the inital wireup of the Thrust instance.

        @property modules
        @readOnly
        @type {Array}
        **/
        modules: [],
    };

    /**
    AMD API
    load

    Handles fetching of a current config for the current thrust instance, or the config of the given plugin.
    Adding the : character requests a specific config plugin.
    thrust/config!global = thrust!global:config = Thrust instance config from the instance named global.

    @method load
    @static
    @param {String} name The name of the instance that is being fetched
    @param {Function} parentRequire the require method to be loaded
    @param {Function} load Allows the load to inform that AMD for the value to hand off
    @param {Object} config The custom configuration.
    **/
    config.load = function (name, parentRequire, load, config)
    {
        var parts = name.split(':'),
            realName = parts[0],
            pluginName = parts[1] || false;

        var instancePromise = thrustInstance.fetchInstance(realName);
        instancePromise.then(function (context)
        {
            var plugin = pluginName && context.cfg[pluginName] || context.config;
            if (!plugin)
                throw new Error('Plugin "' + pluginName + '" does not exist on thrust instance "' + realName + '".');

            load(plugin);
        });
    };

    return config;
});
define('thrust/log',['thrust/config', 'thrust/util'],
function (tConfig, util)
{
    /**
        A basic logger for the thrust framework.
        Disables debug logging when thrust is not in debug mode.

    @module thrust

    **/
    
    // Log levels
    var LEVEL = {
        DEBUG: 4,
        INFO: 3,
        WARN: 2,
        ERROR: 1
    };

    // Declare our variables
    var console     = window.console,
        timers      = {},
        log         = (console && console.log) || false,
        warn        = (console && console.warn) || false,
        info        = (console && console.info) || false,
        error       = (console && console.error) || false,
        time        = (console && console.time) || false,
        timeEnd     = (console && console.timeEnd) || false,
        slice       = Array.prototype.slice,
        configLevel = tConfig.log.level || LEVEL.ERROR,
        logLevel    = LEVEL[configLevel] || (typeof configLevel === 'string' && LEVEL[configLevel.toUpperCase()]) || (typeof configLevel  === 'number' && configLevel) || LEVEL.ERROR;

    // Various loggers to handle IE8/9 support.
    var logRunner = function (consoleMethod, logType)
    {
        // Show logs when enabled or if they are errors
        var args = slice.call(arguments, 1);
        if (consoleMethod)
        {
            if (consoleMethod.apply)
                consoleMethod.apply(console, args);
            else
                consoleMethod(args);
        }
        else if (!consoleMethod && log)
        {
            if (log.apply)
                log.apply(console, args);
            else
                log(args);
        }
    };

    /**
    A basic logger for the thrust framework.
        Disables debug logging when thrust is not in debug mode.

    @class thrust.Log
    **/
    var Log = {
        /**
        Logs a debug type message using the console log method
        
        @method debug
        **/
        debug: function ()
        {
            // Short circuit if logging is disabled.  This is as close to noop as we can get, incase there is a direct reference to this method.
            if (!tConfig.log.enabled) return;
            if (logLevel >= LEVEL.DEBUG)
            {
                var args = slice.call(arguments);
                args.unshift(log);

                logRunner.apply(this, args, 'log');
            }
        },
        /**
        Logs a info type message using the console info method if available, otherwise it uses the console log method.

        @method info
        **/
        info: function ()
        {
            // Short circuit if logging is disabled.  This is as close to noop as we can get, incase there is a direct reference to this method.
            if (!tConfig.log.enabled) return;
            if (logLevel >= LEVEL.INFO)
            {
                var args = slice.call(arguments);
                args.unshift(info);

                logRunner.apply(this, args, 'info');
            }
        },
        /**
        Logs a warn type message using the console warn method if available, otherwise it uses the console log method.

        @method warn
        **/
        warn: function ()
        {
            // Short circuit if logging is disabled.  This is as close to noop as we can get, incase there is a direct reference to this method.
            if (!tConfig.log.enabled) return;
            if (logLevel >= LEVEL.WARN)
            {
                var args = slice.call(arguments);
                args.unshift(warn);

                logRunner.apply(this, args, 'warn');
            }
        },
        /**
        Logs a error type message using the console error method if available, otherwise it uses the console log method.

        @method error
        **/
        error: function ()
        {
            // Short circuit if logging is disabled.  This is as close to noop as we can get, incase there is a direct reference to this method.
            if (!tConfig.log.enabled) return;
            if (logLevel >= LEVEL.ERROR)
            {
                var args = slice.call(arguments);
                args.unshift(error);

                logRunner.apply(this, args, 'error');
            }
        },
        /**
        Logs a time type message using the console time method if available, otherwise it uses the console log method.

        @method time
        **/
        time: function (message)
        {
            // Short circuit if logging is disabled.  This is as close to noop as we can get, incase there is a direct reference to this method.
            if (!tConfig.log.enabled) return;
            if (logLevel >= LEVEL.DEBUG)
            {
                timers[message] = { start: new Date().getTime() };
                var msg = util.format('{0}: timer started', message),
                    args = slice.call(arguments, 1);
                args.unshift(msg);
                args.unshift(time);

                logRunner.apply(this, args);
            }
        },
        /**
        Logs a timeEnd type message using the console timeEnd method if available, otherwise it uses the console log method.
        Causes the timer to end, for the given message.

        @method timeEnd
        **/
        timeEnd: function (message)
        {
            // Short circuit if logging is disabled.  This is as close to noop as we can get, incase there is a direct reference to this method.
            if (!tConfig.log.enabled) return;
            if (logLevel >= LEVEL.DEBUG)
            {
                timers[message].end = new Date.getTime();
                var time = timers[message].end - timers[message].start,
                    msg = util.format('{0}: {1}ms', message, time);
                var args = slice.call(arguments, 1);
                args.unshift(msg);
                args.unshift(timeEnd);

                logRunner.apply(this, args);
            }
        }
    };

    return Log;
});

define('thrust/ignite',['require', 'thrust/config', 'thrust/util', 'module'],
function(require, config, util, module)
{
    var slice = Array.prototype.slice,
        isArray = util.isArray,
        toArray = util.toArray,
        each = util.each,
        map = util.map,
        any = util.any,
        all = util.all,
        when = util.when,
        extend = util.extend,
        flatten = util.flatten,
        pluck = util.pluck,
        isObject = util.isObject,

        reconcileArrays = function (from, to)
        {
            each(from, function (x, i)
            {
                if (isArray(x))
                {
                    to[i] = toArray(to[i]);
                }
                else if (isObject(x))
                {
                    reconcileArrays(x, to[i]);
                }
            });
        },
        stageOneComplete = false;

    /**
    Contructs a wire spec for thrust to launch from.

    @module thrust
    **/
    return {
         /**
        Merges a all the plugins configurations, with the default config, and then finally with
        any customized config from requirejs

        @method stageOne
        @param {Object} settings The settints to pass onto the thrust instance being created.
        **/
        stageOne: function (settings)
        {
            var that = this;

            if (stageOneComplete)
            {
                return that.stateTwo(settings);
            }
            
            var plugins = ['thrust/mediator'].concat(settings.plugins || module.config().plugins || config.plugins || []),
                defer = when.defer();

            require(plugins.map(function (x) { return x + '/config'; }), function ()
            {
                var args = arguments;
                plugins.forEach(function (plugin, i)
                {
                    var name = plugin.substring(plugin.lastIndexOf('/') + 1);
                    config[name] = args[i];
                });

                util.deepCopy(config, module.config());

                when.chain(that.stateTwo(settings), defer);
            });
            stageOneComplete = true;

            return defer;
        },
        /**
        Creates a thrust instance, from the given settings.
        Including the plugins, and given default modules.

        @method stateTwo
        @param {Object} settings The settints to pass onto the thrust instance being created.
        **/
        stateTwo: function(settings)
        {
            /*jshint loopfunc:true*/
            // Get the configuration
            var localConfig = util.deepCopy({}, config, settings),
                defer       = when.defer();
            // Reconicle the arrays so they are properly arrays
            reconcileArrays(config, localConfig);

            // Mediator is a required plugin, include all the others in addition to it.
            var plugins = ['thrust/mediator'].concat(localConfig.plugins || []),
                // The modules to load
                modulesToLoad = [],
                // The module configuration object
                modulesConfigurations = { thrust: 'thrust' };

            // Loop through all the plugins, creating a proper dependancy list.
            for (var i = 0, iLen = plugins.length; i < iLen; i++)
            {
                var plugin = plugins[i],
                    name = plugin.substring(plugin.lastIndexOf('/') + 1),
                    pluginConfig = localConfig[name];

                modulesToLoad.push(plugin);
                modulesToLoad.push(pluginConfig.conventions || []);
                modulesConfigurations[plugin] = pluginConfig;
            }

            // Name and cfg are default properties of the configuration context
            var orderedPlugins = ['name', 'cfg'],
                // We loop through until all the plugins are in proper order.
                reloop = true,
                iLen = modulesToLoad.length,
                i = 0;

            // Loop through all the plugins until we have a set that will load in proper order.
            while (i < iLen)
            {
                // The plugin
                var plugin = modulesToLoad[i],
                    // The implied plugin name
                    name = plugin.substring(plugin.lastIndexOf('/') + 1),
                    // The plugins configuration
                    pluginConfig = localConfig[name];

                // Check if the plugin has to resolve anything.
                if (pluginConfig.resolve && pluginConfig.resolve.length > 0 && !all(pluginConfig.resolve,
                    function (x)
                    {
                        return any(orderedPlugins, function (z)
                        {
                        return x === z || x === z;
                        });
                    })
                )
                {
                    // The modules to load.
                    // Also includes any conventions.
                    modulesToLoad.push.apply(modulesToLoad, modulesToLoad.splice(i, 2));
                }
                else
                {
                    // reorder the plugin
                    i += 2;
                    orderedPlugins.push(name);
                }
            }
            
            // The modules config
            var modules = localConfig.modules || [];
            // Thrust and thrust/module also need to be loaded.
            modulesToLoad.push.apply(modulesToLoad, ['thrust', 'thrust/module'].concat(modules || []));
            // Flatten the resultant array
            modulesToLoad = flatten(modulesToLoad);

            // Create the configuration spec
            var spec = {
                name: localConfig.name || 'global',
                cfg: localConfig
            };

            // Load everything
            require(modulesToLoad, function ()
            {
                // Get ready to loop
                var currentPlugin = null, allConventions = [];

                // Loop through all the modules being loaded
                for (var i = 0, iLen = modulesToLoad.length - (modules.length + 1); i < iLen; i++)
                {
                    // Get plugin and configuration
                    var plugin = modulesToLoad[i],
                        mConfig = modulesConfigurations[plugin];

                    // Check if we have a configuration object
                    if (mConfig)
                    {
                        // Load a new plugin.
                        var pluginClass = arguments[i],
                            // Get the plugin name
                            name = plugin.substring(plugin.lastIndexOf('/') + 1),
                            // Resolve all the required items.
                            resolveItems = map(mConfig.resolve, function(x) { return spec[x]; });

                        // Instantiate the plugin
                        currentPlugin = spec[name] = util.instantiate(pluginClass, resolveItems);
                        // Setup the conventions
                        currentPlugin.__conventions = [];
                    }
                    // Load all the conventions
                    else if (currentPlugin)
                    {
                        // Load the convention into the plugin
                        currentPlugin.__conventions.push(arguments[i]);
                        // Load the convention into the thrust instance.
                        allConventions.push(arguments[i]);
                    }
                }

                // The last current plugin, will always be thrust.
                currentPlugin.__conventions = allConventions;

                // Extend thrust with the spec
                extend(currentPlugin, spec);

                // Get the index of the given modules.
                var moduleIndex = arguments.length - (modules.length + 1),
                    // The module creater function
                    Module = arguments[moduleIndex],
                    // Get the definitions
                    moduleDefinitions = slice.call(arguments, moduleIndex + 1),
                    // Assign thrust
                    thrust = currentPlugin;

                // Loop over all the modules
                for (var i = 0, iLen = modules.length; i < iLen; i++)
                {
                    // Get the module name
                    var module = modules[i],
                        // Get the definition
                        definition = moduleDefinitions[i];

                    // Create the instance
                    var moduleInstance = new Module(thrust, definition, module);
                    // Inject it into the thrust instance
                    moduleInstance.thrustCreate(thrust);
                }

                defer.resolve(spec);
            }, defer.reject);

            return defer.promise;
        }
    };
});
;(function(g){

    // summary: A simple feature detection function/framework.
    //
    // name: String
    //      The name of the feature to detect, as defined by the overall `has` tests.
    //      Tests can be registered via `has.add(testname, testfunction)`.
    //
    // example:
    //      mylibrary.bind = has("native-bind") ? function(fn, context){
    //          return fn.bind(context);
    //      } : function(fn, context){
    //          return function(){
    //              fn.apply(context, arguments);
    //          }
    //      }

    var NON_HOST_TYPES = { "boolean": 1, "number": 1, "string": 1, "undefined": 1 },
        VENDOR_PREFIXES = ["Webkit", "Moz", "O", "ms", "Khtml"],
        d = isHostType(g, "document") && g.document,
        el = d && isHostType(d, "createElement") && d.createElement("DiV"),
        freeExports = typeof exports == "object" && exports,
        freeModule = typeof module == "object" && module,
        testCache = {}
    ;

    function has(/* String */name){
        if(typeof testCache[name] == "function"){
            testCache[name] = testCache[name](g, d, el);
        }
        return testCache[name]; // Boolean
    }

    function add(/* String */name, /* Function */test, /* Boolean? */now){
        // summary: Register a new feature detection test for some named feature
        //
        // name: String
        //      The name of the feature to test.
        //
        // test: Function
        //      A test function to register. If a function, queued for testing until actually
        //      needed. The test function should return a boolean indicating
        //      the presence of a feature or bug.
        //
        // now: Boolean?
        //      Optional. Omit if `test` is not a function. Provides a way to immediately
        //      run the test and cache the result.
        // example:
        //      A redundant test, testFn with immediate execution:
        //  |       has.add("javascript", function(){ return true; }, true);
        //
        // example:
        //      Again with the redundantness. You can do this in your tests, but we should
        //      not be doing this in any internal has.js tests
        //  |       has.add("javascript", true);
        //
        // example:
        //      Three things are passed to the testFunction. `global`, `document`, and a generic element
        //      from which to work your test should the need arise.
        //  |       has.add("bug-byid", function(g, d, el){
        //  |           // g  == global, typically window, yadda yadda
        //  |           // d  == document object
        //  |           // el == the generic element. a `has` element.
        //  |           return false; // fake test, byid-when-form-has-name-matching-an-id is slightly longer
        //  |       });
        testCache[name] = now ? test(g, d, el) : test;
    }

    // cssprop adapted from http://gist.github.com/598008 (thanks, ^pi)
    function cssprop(name, el){
        var supported = false,
            capitalized = name.charAt(0).toUpperCase() + name.slice(1),
            length = VENDOR_PREFIXES.length,
            style = el.style;

        if(typeof style[name] == "string"){
            supported = true;
        }else{
            while(length--){
                if(typeof style[VENDOR_PREFIXES[length] + capitalized] == "string"){
                    supported = true;
                    break;
                }
            }
        }
        return supported;
    }

    function clearElement(el){
        if(el){
            while(el.lastChild){
                el.removeChild(el.lastChild);
            }
        }
        return el;
    }

    // Host objects can return type values that are different from their actual
    // data type. The objects we are concerned with usually return non-primitive
    // types of object, function, or unknown.
    function isHostType(object, property){
        var type = typeof object[property];
        return type == "object" ? !!object[property] : !NON_HOST_TYPES[type];
    }

        has.add = add;
    has.clearElement = clearElement;
    has.cssprop = cssprop;
    has.isHostType = isHostType;
    has._tests = testCache;

    has.add("dom", function(g, d, el){
        return d && el && isHostType(g, "location") && isHostType(d, "documentElement") &&
            isHostType(d, "getElementById") && isHostType(d, "getElementsByName") &&
            isHostType(d, "getElementsByTagName") && isHostType(d, "createComment") &&
            isHostType(d, "createElement") && isHostType(d, "createTextNode") &&
            isHostType(el, "appendChild") && isHostType(el, "insertBefore") &&
            isHostType(el, "removeChild") && isHostType(el, "getAttribute") &&
            isHostType(el, "setAttribute") && isHostType(el, "removeAttribute") &&
            isHostType(el, "style") && typeof el.style.cssText == "string";
    });

    // Stop repeat background-image requests and reduce memory consumption in IE6 SP1
    // http://misterpixel.blogspot.com/2006/09/forensic-analysis-of-ie6.html
    // http://blogs.msdn.com/b/cwilso/archive/2006/11/07/ie-re-downloading-background-images.aspx?PageIndex=1
    // http://support.microsoft.com/kb/823727
    try{
        document.execCommand("BackgroundImageCache", false, true);
    }catch(e){}

    // Expose has()
    // some AMD build optimizers, like r.js, check for specific condition patterns like the following:
    if(typeof define == "function" && typeof define.amd == "object" && define.amd){
        define("has",[], function(){
            return has;
        });
    }
    // check for `exports` after `define` in case a build optimizer adds an `exports` object
    else if(freeExports){
        // in Node.js or RingoJS v0.8.0+
        if(freeModule && freeModule.exports == freeExports){
          (freeModule.exports = has).has = has;
        }
        // in Narwhal or RingoJS v0.7.0-
        else{
          freeExports.has = has;
        }
    }
    // in a browser or Rhino
    else{
        // use square bracket notation so Closure Compiler won't munge `has`
        // http://code.google.com/closure/compiler/docs/api-tutorial3.html#export
        g["has"] = has;
    }
})(this);

define('thrust/module',['thrust/util', 'thrust/log', 'has'],
function (util, log, has)
{
    var type = util.type,
        format = util.format,
        isObject = util.isObject,
        extend = util.extend,
        when = util.when,
        thrustCache = {},
        /**
        Moves all properties, that should exist outside of the module, into a private object for holding.

        @method moveToThrustCache
        @private
        @param {Object} from Object to extract items from
        @param {Object} to Object to place items on
        @param {Array} list Items to move from to the other object
        **/
        moveToThrustCache = function (from, to, list)
        {
            for (var i = 0, iLen = list.length; i < iLen; i++)
            {
                to[list[i]] = from[list[i]];
                delete from[list[i]];
            }
        },
        getEventNamespace = function (name, prefix)
        {
            if (!prefix) prefix = 'module-'; return '.' + (name === 'global' ? 'global' : prefix + name.replace(/\./g, '-'));
        },
        __optionalMethods = [     // Optional methods that may be on a module
            'start',
            'stop',
            'ready'
        ];

    /**
    The module is the heart of the thrust, every module gets one facade per module.

    @module thrust
    @class thrust.Module
    @param {Thrust} thrust The thrust instance
    @param {Object} def The module definition
    @param {String} [name] The module name.
    **/
    var Module = function (thrust, def, name)
    {
        name = this.name = (name || def.name);
        var mid = this.mid = thrust.name + ':' + name;
        var tCache = thrustCache[def.hash || mid];

        this.instance = extend(def, tCache && tCache.instance || {});
        this.instance.name = (this.instance.name || name);
        this.instance.mid = mid;

        if (!this.instance.name)
            throw new Error('All Modules must have a name!');

        // Modules must have an init method and a destroy method, it's up to the module developer to populate these methods.
        for (var i = 0, iLen = thrust.__requiredMethods.length; i < iLen; i++)
            if (!def[thrust.__requiredMethods[i]])
                throw new Error(format('Required "{0}" method not found on module "{1}"!', thrust.__requiredMethods[i], name));

        // If the module name is undefined, bring the name into the module.
        if (typeof def.name === 'undefined')
            def.name = name;

        var thrustModule = thrustCache[mid] = extend(tCache || {}, {
            _started: false,
            name: util.getModuleNameForPath(name),
            module: this
        });

        delete thrustCache[def.hash];

        var facades = thrustModule.facades || (thrustModule.facades = {});
        if (!thrust.__conventionPluckPropertiesCache) thrust.__conventionPluckPropertiesCache = util.flatten(util.pluck(thrust.__conventions || [], 'properties'));

        // Move all special properties off to the thrust's internal method.
        moveToThrustCache(this.instance, thrustModule, thrust.__requiredMethods);
        moveToThrustCache(this.instance, thrustModule, __optionalMethods);
        moveToThrustCache(this.instance, thrustModule, thrust.__conventionPluckPropertiesCache);

        util.safeInvoke(thrust, 'createFacade', thrust, this.instance, facades);

        this.__namespace = getEventNamespace(this.instance.name);

        this.thrust = thrust;
    };

    var callFacadeMethods = function (method, mid)
    {
        var results = [];
        for (var i in thrustCache[mid].facades)
        {
            var moduleCache = thrustCache[mid],
                facade = moduleCache.facades[i];
            false && log.debug(format('thrust/module: Calling facade "{0}" {1}()', i, method));
            if (facade[method] && isObject(facade))
                results.push(facade[method].call(facade, thrustCache[mid].module));
        }
        return results;
    };

    Module.prototype = {
        /**
        Getter/Setter for convention methods.
        Gets the value convention property (defined in the properties array of a facade).
        Sets the value of a convention property (for storing convention configuration)

        @param {String} property The property to get or set
        @param {object} [value] The value to set
        @method convention
        @returns {Object} The valaue.
        **/
        convention: function (property, value)
        {
            if (typeof value !== 'undefined')
            {
                thrustCache[this.mid][property] = value;
                return;
            }
            return thrustCache[this.mid][property];
        },
        /**
        Injects this module into the given thrust instance.

        @method thrustCreate
        @param {Thrust} thrust The thrust instance.
        **/
        thrustCreate: function (thrust)
        {
            thrust.__injectModule(this);
        },
        /**
        Makes a call to all the modules facades
        The order of the call depends on the order required.
        During the startup stage (init, start, ready) facades are called first.
        During the shutdown state (stop, destroy) facades are called last.
        This allows modules to startup and shutdown will all the tools it had to begin with.

        @method thrustCall
        @protected
        @param {String} method the method to call
        @param {Boolean} facadeAfter calls facade methods before or after module method.
        @param {Array} args Args to be passed onto the module method.
        **/
        thrustCall: function (method, facadeAfter, args)
        {
            var defer = when.defer(),
                results,
                that = this;

            false && log.debug(format('thrust/module: Calling facades for "{0}"', that.name));
            var m = thrustCache[that.mid][method];
            if (!facadeAfter)
            {
                results = callFacadeMethods(method, that.mid);
                if (results)
                    when.chain(when.all(util.flattenToPromises(results)), defer);
                else
                    defer.resolve();

                if (m)
                {
                    var newDefer = when.defer();
                    defer.then(function ()
                    {
                        var result = m.apply(that.instance, args);
                        if (result)
                            when.chain(when.all(util.flattenToPromises(result)), newDefer);
                        else
                            newDefer.resolve();
                    });
                    defer = newDefer;
                }
            }
            else
            {
                var m = thrustCache[that.mid][method];
                if (m)
                {
                    results = m.apply(that.instance, args);
                    if (results)
                        when.chain(when.all(util.flattenToPromises(results)), defer);
                    else
                        defer.resolve();
                }
                else
                    defer.resolve();

                var newDefer = when.defer();
                defer.then(function ()
                {
                    var result = callFacadeMethods(method, that.mid);
                    if (result)
                        when.chain(when.all(util.flattenToPromises(result)), newDefer);
                    else
                        newDefer.resolve();
                });
                defer = newDefer;
            }

            return defer.promise;
        },
        /**
        Start the module, inside the thrust container it was created on.

        @method start
        **/
        start: function ()
        {
            var that = this;
            that.thrust.start(that.name);
        },
        /**
        Stop the module, inside the thrust container it was created on.

        @method start
        **/
        stop: function ()
        {
            var that = this;
            that.thrust.stop(that.name);
        }
    };

    /**
    AMD API
    load

    Handles fetching of a module instance

    @method load
    @static
    @param {String} name The name of the instance that is being fetched
    @param {Function} parentRequire the require method to be loaded
    @param {Function} load Allows the load to inform that AMD for the value to hand off
    @param {Object} config The custom configuration.
    **/
    Module.load = function (name, parentRequire, load, config)
    {
        var parts = name.split(':'),
            instanceName = parts[0],
            moduleName = parts[1];

        require(['thrust!' + instanceName], function (thrust)
        {
            var module = thrust.modules[moduleName];
            if (!module)
                throw new Error(format('Module "{0}" does not exist on thrust instance "{1}".', moduleName, instanceName));

            load(module);
        });
    };

    Module.thrustCache = thrustCache;

    return Module;
});
/**
 * @license RequireJS domReady 2.0.1 Copyright (c) 2010-2012, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/requirejs/domReady for details
 */
/*jslint */
/*global require: false, define: false, requirejs: false,
  window: false, clearInterval: false, document: false,
  self: false, setInterval: false */


define('domReady',[],function () {
    

    var isTop, testDiv, scrollIntervalId,
        isBrowser = typeof window !== "undefined" && window.document,
        isPageLoaded = !isBrowser,
        doc = isBrowser ? document : null,
        readyCalls = [];

    function runCallbacks(callbacks) {
        var i;
        for (i = 0; i < callbacks.length; i += 1) {
            callbacks[i](doc);
        }
    }

    function callReady() {
        var callbacks = readyCalls;

        if (isPageLoaded) {
            //Call the DOM ready callbacks
            if (callbacks.length) {
                readyCalls = [];
                runCallbacks(callbacks);
            }
        }
    }

    /**
     * Sets the page as loaded.
     */
    function pageLoaded() {
        if (!isPageLoaded) {
            isPageLoaded = true;
            if (scrollIntervalId) {
                clearInterval(scrollIntervalId);
            }

            callReady();
        }
    }

    if (isBrowser) {
        if (document.addEventListener) {
            //Standards. Hooray! Assumption here that if standards based,
            //it knows about DOMContentLoaded.
            document.addEventListener("DOMContentLoaded", pageLoaded, false);
            window.addEventListener("load", pageLoaded, false);
        } else if (window.attachEvent) {
            window.attachEvent("onload", pageLoaded);

            testDiv = document.createElement('div');
            try {
                isTop = window.frameElement === null;
            } catch (e) {}

            //DOMContentLoaded approximation that uses a doScroll, as found by
            //Diego Perini: http://javascript.nwbox.com/IEContentLoaded/,
            //but modified by other contributors, including jdalton
            if (testDiv.doScroll && isTop && window.external) {
                scrollIntervalId = setInterval(function () {
                    try {
                        testDiv.doScroll();
                        pageLoaded();
                    } catch (e) {}
                }, 30);
            }
        }

        //Check if document already complete, and if so, just trigger page load
        //listeners. Latest webkit browsers also use "interactive", and
        //will fire the onDOMContentLoaded before "interactive" but not after
        //entering "interactive" or "complete". More details:
        //http://dev.w3.org/html5/spec/the-end.html#the-end
        //http://stackoverflow.com/questions/3665561/document-readystate-of-interactive-vs-ondomcontentloaded
        //Hmm, this is more complicated on further use, see "firing too early"
        //bug: https://github.com/requirejs/domReady/issues/1
        //so removing the || document.readyState === "interactive" test.
        //There is still a window.onload binding that should get fired if
        //DOMContentLoaded is missed.
        if (document.readyState === "complete") {
            pageLoaded();
        }
    }

    /** START OF PUBLIC API **/

    /**
     * Registers a callback for DOM ready. If DOM is already ready, the
     * callback is called immediately.
     * @param {Function} callback
     */
    function domReady(callback) {
        if (isPageLoaded) {
            callback(doc);
        } else {
            readyCalls.push(callback);
        }
        return domReady;
    }

    domReady.version = '2.0.1';

    /**
     * Loader Plugin API method
     */
    domReady.load = function (name, req, onLoad, config) {
        if (config.isBuild) {
            onLoad(null);
        } else {
            domReady(onLoad);
        }
    };

    /** END OF PUBLIC API **/

    return domReady;
});

define('thrust/main',[
    'require', 'thrust/log', 'thrust/util', 'thrust/config', './ignite', 'thrust/module', 'domReady', 'module', './instance', 'has'
],
function (require, log, util, tConfig, igniteSpec, Module, domReady, module, thrustInstance, has)
{
    /**
        The thrust application!

    @module thrust
    @main thrust
    **/
    

    var INIT             = 'init',
        START            = 'start',
        READY            = 'ready',
        STOP             = 'stop',
        DESTROY          = 'destroy',
        COUNTDOWN        = 'countdown',
        IGNITE           = 'ignite',
        ORBIT            = 'orbit',
        DEORBIT          = 'deorbit',
        SPLASHDOWN       = 'splashdown',
        memoize          = util.memoize,
        each             = util.each,
        map              = util.map,
        when             = util.when,
        bind             = util.bind,
        type             = util.type,
        isArray          = util.isArray,
        slice            = Array.prototype.slice,
        toArray          = util.toArray,
        format           = util.format,
        resolveMethods   = [INIT, START, READY, STOP, DESTROY],
        instances        = thrustInstance.instances,
        loadingInstances = thrustInstance.loadingInstances;

    /**
        The primary thrust class.
    
    @class thrust.Thrust
    @constructor
    @param {String} name The name of this thrust instance
    @returns {Thrust}
    **/
    var Thrust = function (name)
    {
        this.name = name;
        this.modules = {};
        this.failedModules = {};
        false && log.info(name);
    };

    //#region Runner Factories
    var runRunnerFactory, runnerFactory, allRunnerFactory;
    runRunnerFactory = memoize(function (method)
    {
        var conventionMethod = (method === STOP && START) || (method === DESTROY && INIT) || method,
            conventionValue = !(method === STOP || method === DESTROY),
            unsetReady = method === STOP,
            conventionCheck = conventionMethod !== method,
            conventionName = format('{0}-status', conventionMethod),
            runner = runnerFactory(method, conventionName, conventionValue, unsetReady),
            logMessage = format('Thrust: {0}ing module "{{0}}" failed!', method),
            runningMessage = format('Thrust: Running {0} for module "{{0}}".', method);

        return function (names)
        {
            var that = this;
            if (!isArray(names))
                names = [names];
            var args = slice.call(arguments, 1),
                results = [];
            each(names, function (name)
            {
                false && log.debug(format(runningMessage, name));
                var mod = that.modules[name];

                if (!mod && !that.failedModules[name])
                {
                    // try to fetch the module.
                    // returning the proper defer in it's place
                    var loaderDefer = when.defer();

                    require([name], function (moduleDefn)
                    {
                        that.createModule(moduleDefn.name || name, moduleDefn);

                        var result = runRunnerFactory(method).apply(that, [name].concat(args));
                        when.chain(when.all(util.flatten(result)), loaderDefer);
                    }, function ()
                    {
                        that.failedModules[name] = true;
                        loaderDefer.resolve();
                    });

                    results.push(loaderDefer);
                }
                else if ((conventionCheck && mod.convention(conventionName)) || !mod.convention(conventionName))
                {
                    if (tConfig.throwErrors)
                    {
                        results.push(runner(that, name, mod, args));
                    }
                    else
                    {
                        try
                        {
                            results.push(runner(that, name, mod, args));
                        }
                        catch (e)
                        {
                            false && log.error(format(logMessage, name), e, e.stack);
                        }
                    }
                }
            });

            return results;
        };
    });

    runnerFactory = memoize(function (method, conventionName, conventionValue, unsetReady)
    {
        var eventName = format('thrust/module/{0}', method),
            infoFormat = format('Thrust: {0}ing module "{{0}}"', method.charAt(0).toUpperCase() + method.substring(1)),
            debugFormat = format('Thrust: Calling module "{{0}}" {0}()', method),
            compAfter = method === STOP || method === DESTROY || false;

        return function (that, name, mod, args)
        {
            false && log.info(format(infoFormat, name));
            false && log.debug(format(conventionName, name));
            return mod.thrustCall(method, compAfter, args).then(function ()
            {
                that.mediator.fire(eventName, name);
                mod.convention(conventionName, conventionValue);
                if (unsetReady) mod.convention(READY + '-status', false);
            });
        };
    });

    allRunnerFactory = memoize(function (method)
    {
        var infoFormat = format('Thrust: {0}ing all modules... [{{0}}]', method.charAt(0).toUpperCase() + method.substring(1)),
            pluralName = format('thrust/module/all/{0}', method),
            checkAutoStart = method === INIT || method === START;

        return function (that)
        {
            that.mediator.fire(pluralName);
            var modules = that.modules,
                results = [];

            false && log.info(format(infoFormat, util.map(modules, function(x, i) { return x.convention('autoStart') && i; }).join(', ')));
            each(modules, function (x, i)
            {
                if (!checkAutoStart || (checkAutoStart && x.convention('autoStart')))
                    results.push(that[method](i));
            });

            if (that.startingModules && checkAutoStart)
            {
                false && log.info(format(infoFormat, that.startingModules.join(', ')));
                that[method](that.startingModules);
            }

            return when.all(results);
        };
    });

    var flattenWithAsync = function (that, arr)
    {
        return util.flatten(arr.concat(that.cfg.async && [when.delay(0)] || []));
    };
    //#endregion
    
    Thrust.prototype = Thrust.fn = {
        /**
            Required methods, that every module must implement.
    
        @property __requiredMethods
        @protected
        **/
        __requiredMethods: [     // Required methods that must be on every module
            'init',
            'destroy'
        ],
        __conventions: [],
        cfg: { async: false },
        /**
            Creates a new thrust module.

        @method create
        @param {String} name The unique module name.
        @param {Object} module The module defintion.
        @param {Boolean} preBuild Has this module been prebuilt, in other words has it been created, by wire.js and needs to be injected.
        @returns {Module} The new module instance.
        **/
        create: function (name, module, preBuilt)
        {
            false && log.debug(format('Thrust: Creating new instance of "{0}"', name));

            var oldModule;
            if (preBuilt)
            {
                oldModule = module;
                module = module.instance;
            }

            if (!preBuilt)
                module = new Module(this, module, name);
            else
                module = oldModule;

            // Modules cannot have duplicate names, choose a new one.
            if (this.modules[module.name])
                throw new Error(format('Duplicate module name "{0}".', name));

            // m is the mediators internal module.
            this.modules[module.name] = module;

            false && log.info(format('Thrust: Created module "{0}"', name));
            // Notify the mediator that a module has been created.
            this.mediator.fire('thrust/module/create', name);

            if (this.mediator.started && module.convention('autoStart'))
                this.mediator.start(module.name);

            return module;
        },
        //#region Global Runners
        /**
            Begins the countdown to thrusts start.
            Loading can be deferred by returning a promise from any convention, or module method.

        @method countdown
        @async
        @returns {Promise} The promise of when the countdown is completed.
        **/
        countdown: function ()
        {
            var that = this;
            false && log.debug(format('Launch instance "{0}" in 5... 4... 3... 2... 1...', that.name));
            return when.all(flattenWithAsync(that, [
                util.safeInvoke(that.__conventions, COUNTDOWN, that),
                that.init()
            ]))
                .then(function () { that.mediator.fire('thrust/init'); })
                .then(function() { false && log.debug(format('Thrust instance "{0}" has been initalized.', that.name)); })
                .then(bind(that.ignite, that));
        },
        /**
            Begins the ingition as thrust starts up.
            Loading can be deferred by returning a promise from any convention, or module method.

        @method ignite
        @async
        @returns {Promise} The promise of when the ingition is completed.
        **/
        ignite: function ()
        {
            var that = this;
            false && log.debug(format('Firing rockets for thurst instance "{0}".', that.name));
            return when.all(flattenWithAsync(that, [
                util.safeInvoke(that.__conventions, IGNITE, that),
                that.start()
            ]))
                .then(function () { that.mediator.fire('thrust/start'); })
                .then(function () { false && log.debug(format('Thrust instance "{0}" has been started.', that.name)); })
                .then(bind(that.orbit, that));
        },
        /**
            Thrust prepares for orbit.
            Loading can be deferred by returning a promise from any convention.

        @method orbit
        @async
        @returns {Promise} The promise of when thrust is in orbit.
        **/
        orbit: function ()
        {
            var that = this;
            false && log.debug(format('Firing stage two thrusters for thrust instance "{0}".', that.name));
            var domReadyDefer = when.defer();
            domReadyDefer.then(function () { that.mediator.fire('thrust/dom/ready'); });
            domReady(domReadyDefer.resolve);

            return when.all(flattenWithAsync(that, [
                domReadyDefer.promise,
                util.safeInvoke(that.__conventions, ORBIT, that)
            ])).then(function ()
            {
                if (false)
                {
                    var timeStart = that.config.debug.timeStart,
                    timeEnd       = new Date().getTime(),
                    startTime     = (timeEnd - timeStart),
                    ttoDiv        = document.getElementById('tto');

                    if (ttoDiv)
                        ttoDiv.innerHTML = startTime + 'ms';
                }

                when.all(flattenWithAsync(that, [that.ready()]))
                    .then(function () { that.mediator.fire('thrust/ready'); })
                    .then(function () { false && log.debug(format('Thrust instance "{0}" is now ready.', that.name)); })
                    .then(bind(that.inOrbit, that));
            });
        },
        inOrbit: function ()
        {
            var that = this;
            that.started = true;

            if (false)
            {
                var timeStart = that.config.debug.timeStart,
                    timeEnd = new Date().getTime(),
                    startTime = (timeEnd - timeStart);

                log.info('Started in ' + startTime + 'ms');

                var ttrDiv = document.getElementById('ttr');
                if (ttrDiv)
                    ttrDiv.innerHTML = startTime + 'ms';
            }
        },
        /**
            Begins the deorbit as thrust shutdown.
            Shutdown can be deferred by returning a promise from any convention, or module method.

        @method deorbit
        @async
        @returns {Promise} The promise of when the ingition is completed.
        **/
        deorbit: function ()
        {
            var that = this;
            false && log.debug(format('Reentering earths atmosphere for thrust instance "{0}".', that.name));
            return when.all(flattenWithAsync(that, [
                that.stop(),
                util.safeInvoke(that.__conventions, DEORBIT, that)
            ]))
                .then(function () { that.mediator.fire('thrust/stop'); })
                .then(function () { false && log.debug(format('Thrust instance "{0}" is now stopped.', that.name)); })
                .then(bind(that.orbit, that));
        },
        /**
            Begins the splashdown as thrust shutdown.
            Shutdown can be deferred by returning a promise from any convention, or module method.

        @method splashdown
        @async
        @returns {Promise} The promise of when the ingition is completed.
        **/
        splashdown: function ()
        {
            var that = this;
            false && log.debug(format('Landing in the middle of the atlantic for thrust instance "{0}".', that.name));
            return when.all(flattenWithAsync(that, [
                that.stop(),
                util.safeInvoke(that.__conventions, SPLASHDOWN, that)
            ]))
                .then(function () { that.mediator.fire('thrust/destroy'); })
                .then(function () { false && log.debug(format('Thrust instance "{0}" is now being destroyed', that.name)); });
            // do destroy
        },
        //#endregion
        //#region Module runners
        /**
            Begins the initalization process for a module.  This runs as part of the
                countdown phase, during start up, or in order, when creating modules.
            Loading can be deferred by returning a promise from any convention, or module method.

        @method init
        @param {String|Array of String} [name] The name of the module.  If name is null, all modules
            that return the property autoStart will be inited.
        @returns {Promise} The promise of when the init is completed.
        **/
        init: memoize(function (name)
        {
            var that = this, method = INIT;

            var result = !name && allRunnerFactory(method)(that);
            if (result)
                return result;

            var args = arguments;
            if (isArray(name))
                result = map(name, function (x) { return that.init(x); });
            else
                result = runRunnerFactory(method).apply(that, arguments);

            return when.all(util.flatten(result));
        }),
        /**
            Begins the startup process for a module.  This runs as part of the
                ignite phase, during start up, or in order, when creating modules.
            Loading can be deferred by returning a promise from any convention, or module method.

        @method start
        @param {String|Array of String} [name] The name of the module.  If name is null, all modules
            that return the property autoStart will be started.
        @returns {Promise} The promise of when the init is completed.
        **/
        start: function (name)
        {
            var that = this, method = START;

            var result = !name && allRunnerFactory(method)(that);
            if (result)
                return result;

            if (!isArray(name))
                name = [name];

            var items = [];
            for (var i = 0, iLen = name.length; i < iLen; i++)
            {
                var n = name[i],
                    mod = that.modules[n];

                if (!mod)
                {
                    items.push(that.init.call(that, [n].concat(slice.call(arguments, 1))));
                }
                else if (!mod.convention(INIT + '-status'))
                {
                    items.push(that.init.call(that, [n].concat(slice.call(arguments, 1))));
                }
            }

            var startDefer = when.defer(),
                args = util.toArray(arguments);
            when.all(util.flatten(items)).then(function ()
            {
                var results = [];
                results.push(runRunnerFactory(method).apply(that, args));

                var resultsDefer = when.all(util.flatten(results));
                if (that.started)
                {
                    var runReady = function () { when.chain(that.ready.apply(that, args), startDefer); };
                    resultsDefer.then(runReady);
                }
                else
                {
                    when.chain(resultsDefer, startDefer);
                }
            });

            return startDefer.promise;
        },
        /**
            Begins the ready process for a module.  This runs as part of the
                orbit phase, during ready, or in order, when creating modules.
            Loading can be deferred by returning a promise from any convention, or module method.

        @method ready
        @param {String|Array of String} [name] The name of the module.  If name is null, all modules
            that return the property autoStart will be started.
        @returns {Promise} The promise of when the init is completed.
        **/
        ready: function (name)
        {
            var that = this, method = READY;

            var result = !name && allRunnerFactory(method)(that);
            if (result)
                return result;

            if (!isArray(name))
                name = [name];

            var items = [];
            for (var i = 0, iLen = name.length; i < iLen; i++)
            {
                var n = name[i],
                    mod = that.modules[n];
                if (!mod.convention(START + '-status') && !that.started)
                {
                    items.push(that.start.apply(that, [n].concat(slice.call(arguments, 1))));
                }
            }

            items.push(runRunnerFactory(method).apply(that, arguments));

            return when.all(util.flatten(items));
        },
        /**
            Begins the stop process for a module.  This runs as part of the
                deorbit phase, during stop, or in order, when creating modules.
            Loading can be deferred by returning a promise from any convention, or module method.

        @method stop
        @param {String|Array of String} [name] The name of the module.  If name is null, all modules
            will be stopped.
        @returns {Promise} The promise of when the stop is completed.
        **/
        stop: function (name)
        {
            var that = this, method = STOP;

            var result = !name && allRunnerFactory(method)(that);
            if (result)
                return result;

            if (!isArray(name))
                name = [name];

            result = runRunnerFactory(method).apply(that, arguments);
            return when.all(util.flatten(result));
        },
        /**
            Begins the destroy process for a module.  This runs as part of the
                slashdown phase, during destroy, or in order, when creating modules.
            Loading can be deferred by returning a promise from any convention, or module method.

        @method destroy
        @param {String|Array of String} [name] The name of the module.  If name is null, all modules
            will be destroyed.
        @returns {Promise} The promise of when the destroy is completed.
        **/
        destroy: function (name)
        {
            var that = this, method = DESTROY;

            var result = !name && allRunnerFactory(method)(that);
            if (result)
                return result;

            if (!isArray(name))
                name = [name];

            var items = [];
            for (var i = 0, iLen = name.length; i < iLen; i++)
            {
                var n = name[i],
                    mod = that.modules[n];

                if (!mod.convention(STOP + '-status'))
                {
                    items.push(that.stop.call(that, [n].concat(slice.call(arguments, 1))));
                }
            }

            items.push(runRunnerFactory(method).apply(that, arguments));
            return when.all(util.flatten(items));
        },
        //#endregion
        /**
            Injects a preconstructed module into the thrust instance.

        @method __injectModule
        @private
        @param {Module} module The module to inject.
        **/
        __injectModule: function (module)
        {
            this.create(module.name, module, true);
        },
        /**
        Creates a module from the given definition object, with the given name.

        @method createModule
        @param {String} name The module name
        @param {Object} moduleDefn The module definition
        **/
        createModule: function (name, moduleDefn)
        {
            var that = this;
            if (that.modules[name]) return that.modules[name];

            var module = new Module(that, moduleDefn, name);

            that.__injectModule(module);

            return module;
        }
    };

    /**
        Initalizes a new Thrust instance based on the given settings.

    @method launch
    @static
    @param {Object} settings The module to inject
    **/
    Thrust.launch = function (settings)
    {
        if (!settings)
            settings = { name: 'global' };

        if (!settings.name)
            settings.name = 'global';

        if (false)
        {
            settings.debug = { timeStart: new Date().getTime() };
        }

        var setupDefer = Thrust.__fetchInstance(settings.name);

        setupDefer.then(function (context)
        {
            var thrust = context.thrust;
            thrust.startingModules = context.cfg.modules;
            thrust.config = thrust.cfg;
            instances[thrust.name] = thrust;
            thrust.countdown();

            return context;
        })
        .then(function (context)
        {
            window.thrust = context.thrust;
        });

        when.chain(igniteSpec.stageOne(settings), setupDefer);

        return setupDefer.promise;
    };

    /**
    Gets a named thrust stance if it exists.

    @method getInstance
    @static
    @param {String} name The instance name
    @returns {Thrust} The thrust instance
    **/
    Thrust.getInstance = function (name)
    {
        return thrustInstance.getInstance(name);
    };

    /**
    Fetchs a named thrust stance if it exists.
    This loads asyncronously, as the instance may not be loaded

    @method __fetchInstance
    @static
    @private
    @param {String} name The instance name
    @returns {Promise} To a thrust instance spec
    **/
    Thrust.__fetchInstance = function (name)
    {
        return thrustInstance.fetchInstance(name);
    };

    /**
    Creates a new module and hands it off to the given instance, if that instance exists.

    @method createModule
    @static
    @param {String} instanceName The thrust instance name
    @param {String} name The module name
    @param {Object} moduleDefn The module definition
    **/
    Thrust.createModule = function (instanceName, name, moduleDefn)
    {
        var instance = Thrust.getInstance(instanceName);
        if (instance)
        {
            var module = new Module(instance, moduleDefn, name);
            instance.__injectModule(module);
            return module;
        }
    };

    /**
    AMD API
    load

    Handles fetching of a current thurst instance, by expected name.
    Adding the : character requests a specific plugin.
    thrust!global = Thrust instance
    thrust!global:dom = The thrust dom plugin instance

    @method load
    @static
    @param {String} name The name of the instance that is being fetched
    @param {Function} parentRequire the require method to be loaded
    @param {Function} load Allows the load to inform that AMD for the value to hand off
    @param {Object} config The custom configuration.
    **/
    Thrust.load = function (name, parentRequire, load, config)
    {
        var parts = name.split(':'),
            realName = parts[0],
            pluginName = parts[1] || 'thrust';

        var instancePromise = Thrust.__fetchInstance(realName);
        instancePromise.then(function (context)
        {
            var plugin = context[pluginName];
            if (!plugin)
                throw new Error(format('Plugin "{0}" does not exist on thrust instance "{1}".', pluginName, realName));

            load(plugin);
        });
    };

    return Thrust;
});

define('thrust', ['thrust/main'], function (main) { return main; });

define('thrust/convention',[
    'thrust/util'
],
function (util)
{
    /**
        A Convention allows thrust to be as extendable as possible, by giving extension points at every step along the way.

    @module thrust
    **/

    /**
        The convention class, takes an overloaded set of methods, for any method that needs to be overloaded.

    @class thrust.Convention
    @constructor
    @param {Object} methods An object of applicable methods.
    **/
    var Convention = function (methods)
    {
        if (!(this instanceof Convention))
            return new Convention(methods);

        util.extend(this, methods);
    };

    Convention.fn = Convention.prototype = {
        /**
            These properties are stripped off of any module, and held in a private space for other convention methods to use.
        @property properties
        @optional
        **/
        properties: [],
        /**
            This is called during create of a module, generally used to create a facade, that is then bound to the module.
        @method create
        @optional
        @param {Thrust} thrust The thrust instance.
        @param {Module} module The module instance.
        @param {Object} facades All the facades already attached to the module.
        **/
        create: util.noop,
        /**
            This method is called during the thrust init phase, or an individual module's init phase

        @method init
        @optional
        @param {Object} facades The facades for the module.
        @returns {Promise} A promise may be returned, to delay the next phase from begining.
        **/
        init: util.noop,
        /**
            This method is called during the thrust start phase, or an individual module's start phase

        @method start
        @optional
        @param {Object} facades The facades for the module.
        @returns {Promise} A promise may be returned, to delay the next phase from begining.
        **/
        start: util.noop,
        /**
            This method is called during the thrust ready phase, or an individual module's ready phase

        @method ready
        @optional
        @param {Object} facades The facades for the module.
        @returns {Promise} A promise may be returned, to delay the next phase from begining.
        **/
        ready: util.noop,
        /**
            This method is called during the thrust stop phase, or an individual module's stop phase

        @method stop
        @optional
        @param {Object} facades The facades for the module.
        @returns {Promise} A promise may be returned, to delay the next phase from begining.
        **/
        stop: util.noop,
        /**
            This method is called during the thrust destroy phase, or an individual module's destroy phase

        @method destroy
        @optional
        @param {Object} facades The facades for the module.
        @returns {Promise} A promise may be returned, to delay the next phase from begining.
        **/
        destroy: util.noop,
        /**
            This is called during the init phase of a Thrust instance.
        @method countdown
        @optional
        @param {Thrust} thrust The thrust instance.
        @returns {Promise} A promise may be returned, to delay the next phase from begining.
        **/
        countdown: util.noop,
        /**
            This is called during the start phase of a Thrust instance.
        @method ignite
        @optional
        @param {Thrust} thrust The thrust instance.
        @returns {Promise} A promise may be returned, to delay the next phase from begining.
        **/
        ignite: util.noop,
        /**
            This is called during the ready phase of a Thrust instance.
        @method orbit
        @optional
        @param {Thrust} thrust The thrust instance.
        @returns {Promise} A promise may be returned, to delay the next phase from begining.
        **/
        orbit: util.noop,
        /**
            This is called during the stop phase of a Thrust instance.
        @method deorbit
        @optional
        @param {Thrust} thrust The thrust instance.
        @returns {Promise} A promise may be returned, to delay the next phase from begining.
        **/
        deorbit: util.noop,
        /**
            This is called during the destroy phase of a Thrust instance.
        @method splashdown
        @optional
        @param {Thrust} thrust The thrust instance.
        @returns {Promise} A promise may be returned, to delay the next phase from begining.
        **/
        splashdown: util.noop
    };

    return Convention;
});
define('thrust/events',[
    'thrust/util', 'thrust/log', 'thrust/config', 'has'
],
function (util, log, tConfig, has)
{
    /**
    Thrust Events are based off of the Backbone event model, with special additions.

    * Events can be fired asyncronously.
    * Events can be namespaced.

    @module thrust
    **/

    
    //     Backbone.js 0.9.1
    //     (c) 2010-2012 Jeremy Ashkenas, DocumentCloud Inc.
    //     Backbone may be freely distributed under the MIT license.
    //     For all details and documentation:
    //     http://backbonejs.org

    var slice  = Array.prototype.slice,
        asyncFire,
        noop   = util.noop,
        when   = util.when,
        size   = util.size,
        each   = util.each,
        defer  = util.defer,
        bind   = util.bind,
        extend = util.extend,
        format = util.format;

    var eventSplitter = /\s+/, _trigger, triggerCallback, triggerAsyncCallback, triggerNodes, ALL = 'all', STARALL = '*all', normalizeEvents, getNamespaceData, _offProcessNode;
    /**
    Normalizes the given events to the expected namespace.

    @method normalizeEvents
    @private
    @param {String} events The events delimited by a space
    @param {String} namespace The namespace, including prefixed '.'
    **/
    normalizeEvents = function (events, namespace)
    {
        events = events.split(eventSplitter);
        for (var i = 0, iLen = events.length; i < iLen; i++)
        {
            events[i] = events[i] + namespace;
        }
        return events.join(' ');
    };

    /**
    Trigger one or many events, firing all bound callbacks. Callbacks are
    passed the same arguments as `trigger` is, apart from the event name
    (unless you're listening on `"all"`, which will cause your callback to
    receive the true name of the event as the first argument).

    @method _trigger
    @private
    @param {Boolean} async Fire event async or sync
    @param {Object} events The events to be fired.
        delimited by a space.
    @param [args]* The arguments to pass onto the callback methods.
    @returns If async then returns a Promise, where the first argument contains all the returned values, as an array
             If sync then returns an array of the return values.
             If more than one event, returns an object of arrays or promises, with the key for each event.
    **/
    _trigger = function (async, events)
    {
        var that = this, event, node, calls, tail, args, all, rest, namespace, onceNodes;
        if (!(calls = this._callbacks)) return that;
        all = calls.all;
        events = events.split(eventSplitter);
        rest = slice.call(arguments, 2);

        while (event = events.shift())
        {
            if (node = calls[event])
            {
                triggerNodes(that, event, async, node, rest);
            }
            if (node = all)
            {
                triggerNodes(that, ALL, async, node, [event].concat(rest));
            }
        }
    };

    /**
    Triggers all events on a node.
    Also unbinds any node that is set to only be called once.

    @method triggerNodes
    @private
    @param {Object} that The event container context.
    @param {String} event The event to be bound or unbound.
    @param {Boolean} async Fire event async or sync
    @param {Object} node The node linked list.
    @param {Array} args The arguments to pass onto the triggered nodes

    **/
    triggerNodes = function (that, event, async, nodeList, args)
    {
        var tail, onceNodes = [];

        false && log.info(format('{0}: triggering {1} event "{2}"', that.__pubSubName, async && 'async' || '', event));

        each(nodeList, function (node)
        {
            tail = node.tail;
            while ((node = node.next) !== tail)
            {
                triggerCallback(async, node.callback, node.context || that, args);
                node.once && onceNodes.push(node);
            }
        });
        if (onceNodes.length) each(onceNodes, function (x) { that.unsubscribe(event, x.callback, x.context, x.namespace); });
    };

    /**
    Invokes a trigger callback

    @method triggerCallback
    @private
    @param {Boolean} async Fire event async or sync
    @param {Function} callback The callback method
    @param {Object} context The calling context
    @param {Array} args The arguments to call the callback with.
    @returns {Object} The returned value.
        For async calls, this is a promise
        For sync calls this is the value from the method.
    **/
    triggerCallback = function (async, callback, context, args)
    {
        if (async)
        {
            defer(triggerAsyncCallback(callback, context, args), 0);
        }
        else
        {
            try { return callback.apply(context, args); }
            catch (e) { if (tConfig.throwErrors) throw e; }
        }
    };

    /**
    Creates an async event handler

    @method asyncEventFactory
    @private
    @param {Function} callback The callback method
    @param {Object} that The calling context
    @param {Array} args The arguments to call the callback with.
    @returns {Function} The callback for the given arguments.
    **/
    triggerAsyncCallback = function (callback, context, args)
    {
        return function ()
        {
            return callback.apply(context, args);
        };
    };

    /**
    Resubscribes to the appropriate events

    @method _offProcessNode
    @private
    @param {Object} that The event context
    @param {String} event The event
    @param {Object} node The node linked list.
    @param {Function} [callback] The event callback to unsubscribe
    @param {Object} [context] The event context to unsubscribe
    @param {String} [namespace] The namespace to unsubscribe
    **/
    _offProcessNode = function (that, event, node, callback, context)
    {
        var tail, cb, ctx, ns;
        tail = node.tail;
        while ((node = node.next) !== tail)
        {
            cb = node.callback;
            ctx = node.context;
            ns = node.namespace;
            if ((callback && cb !== callback) || (context && ctx !== context))
            {
                that.subscribe(event + (ns && ('.' + ns) || ''), cb, ctx);
            }
        }
    };

    /**
    Gets the namespace information, the real event to pass back onto the methods.

    @method getNamespaceData
    @private
    @param {String} event The event to capture namespace data from.
    @returns {Object} Containing event and namespace.
    **/
    getNamespaceData = function(event)
    {
        var nsIndex = (event || '').indexOf('.'),
            hasNs = nsIndex > -1,
            namespace = hasNs ? event.substring(nsIndex + 1) : undefined,
            event = hasNs ? event.substring(0, nsIndex) : event;

        if (nsIndex === 0)
            event = STARALL;

        return { event: event, namespace: namespace };
    };

    /**
    Thrust Events are based off of the Backbone event model, with special additions.

    * Events can be fired asyncronously.
    * Events can be namespaced.

    @class thrust.Events
    **/
    var Events = {
        /**
        Bind one or more space separated events, `events`, to a `callback`
        function. Passing `"all"` will bind the callback to all events fired.

        @method subscribe
        @param {String} events Spave seperated events
        @param {Function} callback The callback method to be called when the events are fired.
        @param {Object} context The context to bind the calling function to.
        @param {Boolean} once Call this event only once.
        @chainable
        **/
        subscribe: function (events, callback, context, once)
        {
            var calls, event, node, tail, list, nd;
            this.__namespace && (events = normalizeEvents(events, this.__namespace));

            events = events.split(eventSplitter);
            calls = this._callbacks || (this._callbacks = {});

            // Create an immutable callback list, allowing traversal during
            // modification.  The tail is an empty object that will always be used
            // as the next node.
            while (event = events.shift())
            {
                nd = getNamespaceData(event);
                event = nd.event;
                list = calls[event] || (calls[event] = {});
                list = list[nd.namespace];
                node = list ? list.tail : {};
                node.next = tail = {};
                node.context = context;
                node.callback = callback;
                node.namespace = nd.namespace;
                node.once = once;
                calls[event][nd.namespace] = { tail: tail, next: list ? list.next : node };
            }

            return this;
        },
        /**
        Bind one or more space separated events, `events`, to a `callback`
        function. Passing `"all"` will bind the callback to all events fired.

        Each event will only be called once.

        @method once
        @param {String} events Spave seperated events
        @param {Function} callback The callback method to be called when the events are fired.
        @param {Object} context The context to bind the calling function to.
        @chainable
        **/
        once: function (events, callback, context)
        {
            return this.subscribe(events, callback, context, true);
        },
        /**
        Remove one or many callbacks. If `context` is null, removes all callbacks
        with that function. If `callback` is null, removes all callbacks for the
        event. If `event` is null, removes all bound callbacks for all events.

        @method unsubscribe
        @param {String} events Spave seperated events
        @param {Function} callback The callback method to be called when the events are fired.
        @param {Object} context The context to bind the calling function to.
        @chainable
        **/
        unsubscribe: function (events, callback, context)
        {
            var event, calls, node, nd, ourNs, namespace, that = this, hasNs;

            ourNs = that.__namespace; ourNs && (ourNs = ourNs.substring(1));
            // No events, or removing *all* events.
            if (!(calls = that._callbacks)) return;
            if (!(events || callback || context))
            {
                if (!ourNs)
                    delete that._callbacks;
                else
                {
                    var cbs = that._callbacks;
                    for (var i in cbs)
                    {
                        delete cbs[i][ourNs];
                        if (size(cbs[i]) === 0) delete cbs[i];
                    }
                }
                return that;
            }

            // Loop through the listed events and contexts, splicing them out of the
            // linked list of callbacks if appropriate.
            ourNs && (events = normalizeEvents(events, that.__namespace));
            events = events ? events.split(eventSplitter) : util.keys(calls);
            while (event = events.shift())
            {
                nd = getNamespaceData(event);
                event = nd.event;
                namespace = nd.namespace;
                hasNs = !!namespace;
                if (!ourNs)
                {
                    node = calls[event];
                    delete calls[event];
                }
                else if (calls[event])
                {
                    node = calls[event][ourNs];
                    delete calls[event][ourNs];
                    if (size(calls[event]) === 0) delete calls[event];
                }
                if (!node || !(callback || context)) continue;

                /*if (event !== STARALL)
                {
                    node = calls[event];
                    delete calls[event];
                    if (!node) continue;
                }*/
                if (event !== STARALL && !callback)
                {
                    _offProcessNode(that, event, node, callback, context);
                }
                else if (event === ALL || !callback)
                {
                    for (var i in calls)
                    {
                        if (hasNs)
                        {
                            delete calls[i];
                        }
                        else
                        {
                            node = calls[i];
                            delete calls[i];
                            _offProcessNode(that, i, node, callback, context);
                        }
                    }
                }
                else
                {
                    _offProcessNode(that, event, node, callback, context);
                }
            }
            return that;
        },
        /**
            Trigger one or many events, firing all bound callbacks. Callbacks are
            passed the same arguments as `trigger` is, apart from the event name
            (unless you're listening on `"all"`, which will cause your callback to
            receive the true name of the event as the first argument).
        
            @method fire
            @param {Object} events The events to be fired.
                delimited by a space.
            @param [args]* The arguments to pass onto the callback methods.
            @returns {Array of Values} If more than on event is fired, an Object of Arrays is returned.
        **/
        fire: function (events)
        {
            _trigger.apply(this, [false].concat(slice.call(arguments)));
            return this;
        },
        __pubSubName: 'Events',
        /**
        Init's the Event module.
        This is only required if you wish to use fire.async, and namespacing.

        @method initEvents
        @chainable
        **/
        initEvents: function ()
        {
            this.publish = this.fire = bind(Events.fire, this);
            this.fire.async = bind(asyncFire, this);
            this.initEvents = noop;
            this.__pubSubName = this.name || 'Events';
            if (this.name && !this.__namespace) this.__namespace = '.' + this.name;

            return this;
        },
        /**
        Extends Events into the given object.

        @method extend
        @param {Object} to The object ot extend events onto
        @param {Boolean} [init] Optionally init the events.
        **/
        extend: function (to, init)
        {
            util.extend(to, Events);
            delete to.extend;
            init && to.initEvents();
            return to;
        }
    };

    /**
        Trigger one or many events, firing all bound callbacks. Callbacks are
        passed the same arguments as `trigger` is, apart from the event name
        (unless you're listening on `"all"`, which will cause your callback to
        receive the true name of the event as the first argument).

        fire.async runs its events immediately.
    
        @method fire.async
        @param {Object} events The events to be fired.
            delimited by a space.
        @param [args]* The arguments to pass onto the callback methods.
        @async
        @returns {Array of Promise} If more than on event is fired, an Object of Promise Arrays is returned.
    **/
    /**
        Trigger one or many events, firing all bound callbacks. Callbacks are
        passed the same arguments as `trigger` is, apart from the event name
        (unless you're listening on `"all"`, which will cause your callback to
        receive the true name of the event as the first argument).

        publish.async runs its events immediately.
        publish.async is an alias for fire.
    
        @method publish.async
        @param {Object} events The events to be fired.
            delimited by a space.
        @param [args]* The arguments to pass onto the callback methods.
        @async
        @returns {Array of Promise} If more than on event is fired, an Object of Promise Arrays is returned.
    **/
    asyncFire = function (events)
    {
        _trigger.apply(this, [true].concat(slice.call(arguments)));
        return this;
    };

    /**
        Trigger one or many events, firing all bound callbacks. Callbacks are
        passed the same arguments as `trigger` is, apart from the event name
        (unless you're listening on `"all"`, which will cause your callback to
        receive the true name of the event as the first argument).

        publish is an alias for fire.
    
        @method publish
        @param {Object} events The events to be fired.
            delimited by a space.
        @param [args]* The arguments to pass onto the callback methods.
        @returns If async then returns a Promise, where the first argument contains all the returned values, as an array
                 If sync then returns an array of the return values.
                 If more than one event, returns an object of arrays or promises, with the key for each event.
    **/
    Events.publish = Events.fire;

    return Events;
});

define('thrust/facade',[
    'thrust/util', 'thrust/module'
],
function (util, Module)
{
    /**

    The Facade module offers the ability to create an interface or similar concept.
    With the Facade in thrust, it allows you to capture events from a module, when loaded via convention.
    Facades are mainly for use in thrust plugins.

    @module thrust
    **/

    /**
    Facades are mainly for use in thrust plugins.

    Facade has these built in methods:
    * init
    * start
    * ready
    * stop
    * destroy

    Behind the scenes the facade methods, invoke any conventions loaded for the plugin.

    @class thrust.Facade
    **/
    var thrustCache = Module.thrustCache;

    var Facade,
        format           = util.format,
        facadeMethods    = ['init', 'start', 'ready', 'stop', 'destroy'],
        defaultPrototype = {},

        conventionFunctionFactory = function (name) {
            return function (module) {
                var that = this;
                var returnValues = [];
                if (module && !module.convention)
                    module = thrustCache[module.mid].module;
                if (that.__conventions) {
                    return util.safeInvoke(that.__conventions, name, that, module);
                }
            };
        },
        methodWrap = function (method) {
            return function (f) {
                var args = Array.prototype.slice.call(arguments, 1);
                f.apply(this, args);
                return method.apply(this, args);
            };
        };

    for (var i = 0, iLen = facadeMethods.length; i < iLen; i++)
    {
        var method = facadeMethods[i];
        defaultPrototype[method] = conventionFunctionFactory(method);
    }

    /**
    Facade init

    Called during the init phase of a module startup.

    @method init
    @returns Promise any facade method may optionally return a promise to delay the start of the next phase.
    **/

    /**
    Facade start

    Called during the start phase of a module startup.

    @method start
    @returns Promise any facade method may optionally return a promise to delay the start of the next phase.
    **/

    /**
    Facade ready

    Called during the ready phase of a module startup.

    @method ready
    @returns Promise any facade method may optionally return a promise to delay the start of the next phase.
    **/

    /**
    Facade stop

    Called during the init phase of a module startup.

    @method stop
    @returns Promise any facade method may optionally return a promise to delay the start of the next phase.
    **/

    /**
    Facade destroy

    Called during the destroy phase of a module startup.

    @method destroy
    @returns Promise any facade method may optionally return a promise to delay the start of the next phase.
    **/

    return {
        /**
        AMD API
        load

        Handles fetching of a module instance

        @method load
        @static
        @param {String} name The name of the instance that is being fetched
        @param {Function} parentRequire the require method to be loaded
        @param {Function} load Allows the load to inform that AMD for the value to hand off
        @param {Object} config The custom configuration.
        **/
        load: function (name, parentRequire, load, config)
        {
            var parts = name.split(':'),
                instanceName = parts[0],
                plugin = parts[1],
                pluginName = plugin.substring(plugin.lastIndexOf('/')+1 || 0),
                hashKey = parts[2];

            if (!instanceName)
                throw new Error('instanceName is required!');
            if (!pluginName)
                throw new Error('pluginName is required!');
            if (!hashKey)
                throw new Error('hashKey is required!');

            require(['thrust!' + instanceName], function (thrust)
            {
                var plugin = thrust[pluginName];
                if (!plugin)
                {
                    require([plugin], function (p)
                    {
                        load(p);
                    });
                    return;
                }

                var thrustModuleCacheItem = thrustCache[hashKey] || (thrustCache[hashKey] = { facades: {}, instance: {} });

                var facade = plugin.createFacade(thrust, thrustModuleCacheItem.instance, thrustModuleCacheItem.facades);
                
                load(facade);
            });
        },
        createFacade: function(initMethod)
        {
            var Facade = function (module)
            {
                initMethod.apply(this, arguments);

                for (var i = 0, iLen = facadeMethods.length; i < iLen; i++)
                {
                    var method = facadeMethods[i];
                    if (this[method] !== defaultPrototype[method])
                    {
                        this[method] = util.wrap(this[method], methodWrap(defaultPrototype[method]));
                    }
                }

                this.module = module;
                //this.init(module);
            };

            Facade.fn = Facade.prototype = util.extend({
                updateFacade: function ()
                {
                    initMethod.apply(this, arguments);
                }
            }, defaultPrototype);
            
            return Facade;
        }
    };
});
define('thrust/mediator/main',[
    'thrust/util', 'thrust/log', 'thrust/events', 'thrust/facade', 'has'
],
function (util, log, Events, facade, has)
{
    
    // Variable declaration.
    var format  = util.format,   // string format method
        extend  = util.extend,   // object extension method
        type    = util.type,       // object type method
        when    = util.when,
        memoize = util.memoize,
        mediator,
        slice   = Array.prototype.slice;

    //#region Facade
    /**
    Creates a new mediator facade for the given module.

    @for thrust.mediator
    @class thrust.mediator.MediatorFacade
    @constructor
    @param {thrust.Module} module The module to create the facade for
    @param {thrust.Mediator} parent The parent mediator to create the facade on.
    **/
    var MediatorFacade = facade.createFacade(function (module, parent)
    {
        this.name          = module.name;
        this.module        = module;
        this.parent        = parent;
        this.__conventions = parent.__conventions;
        this._callbacks    = parent._callbacks;
        this.initEvents();
    });
    util.extend(MediatorFacade.fn, Events);

    /**
    During the start of a mediator facade, start creates the internal subscriptions array.

    @for thrust.mediator.MediatorFacade
    @method start
    **/
    MediatorFacade.fn.init = MediatorFacade.fn.start = function ()
    {
        if (!this._internalSubscriptions)
            this._internalSubscriptions = [];
    };

    /**
    Overrides the subscribe method, and tracks the any event that is bound.

    @for thrust.mediator.MediatorFacade
    @method subscribe
    **/
    MediatorFacade.fn.subscribe = function (events, callback, context)
    {
        this._internalSubscriptions.push({ events: events, callback: callback, context: context });
        Events.subscribe.call(this, events, callback, context);
    };

    /**
    Unsubscribes from all events that were subscribed to.

    @for thrust.mediator.MediatorFacade
    @method stop
    **/
    MediatorFacade.fn.stop = function (facade)
    {
        var module = facade.module;

        if (this._internalSubscriptions)
        {
            for (var i = this._internalSubscriptions.length - 1; i >= 0; i--)
            {
                var sub = this._internalSubscriptions[i];
                this.unsubscribe(sub.events, sub.callback, sub.context);
            }
            delete this._internalSubscriptions;
        }
    };

    //#endregion
    // Our default namespace prefix.

    /**
    Mediator class.
    This creates a instance of the mediator, for use inside thrust.

    @for thrust.mediator
    @class thrust.mediator.Mediator
    @constructor
    @param {String} name The name of the mediator.
    **/
    var Mediator = function (name)
    {
        if (!(this instanceof Mediator))
            return new Mediator(name);

        var that = this;
        that.name = name;
        false && log.debug(format('Mediator: Creating new Mediator {0}', name));

        that.initEvents();

        that.subscribe('thrust/ready', function ()
        {
            false && log.info('Mediator: Ready!');
        });

        that.subscribe('thrust/navigate', function (path)
        {
            if (path === window.location.pathname)
                window.location.reload();
            window.location = util.fixupUrl(path);
        });
    };

    var MediatorPrototype = {
        /**
        Creates a new MediatorFacade, based on the given module.

        @for thrust.mediator.Mediator
        @method createFacade
        @param {thrust.Thrust} thrust The thrust instance
        @param {thrust.Module} module The module to create the facade for
        @param {Object} facades The facades already added for this module.
        **/
        createFacade: function (thrust, module, facades)
        {
            if (module.mediator && !(facades.mediator instanceof MediatorFacade)) throw new Error('"mediator" is a reserved property');

            var mediator;
            if (facades.mediator)
            {
                facades.mediator.updateFacade(module, this);
                mediator = facades.mediator;
            }
            else
            {
                mediator = facades.mediator = module.mediator = new MediatorFacade(module, this);
            }
            return mediator;
        }
    };

    util.extend(MediatorPrototype, Events);

    // Extend our prototype to include the prototype generated above.
    Mediator.prototype = Mediator.fn = MediatorPrototype;

    return Mediator;
});

define('thrust/mediator', ['thrust/mediator/main'], function (main) { return main; });

define('thrust/mediator/convention/autostart',['thrust/convention'],
function (Convention)
{
    /**
    @module thrust.mediator
    @submodule thrust.mediator.convention
    **/

    /**
    * # __thrust/mediator__ Convention - Auto Start
    *
    * The auto start property allows for a module, to be automatically started once it is
    * included into a thrust instnace, without having to explicity call start on the module.
    *
    *
    * This is useful for certian types of modules, usually persistant ones that always need to load regardless.
    * For example a navigation module, or user settings module.
    *
    * @for thrust.mediator.convention
    * @property autoStart
    **/
    return new Convention({
        properties: ['autoStart']
    });
});
define('thrust/mediator/convention/container',['thrust/convention', 'thrust/util'],
function (Convention, util)
{
    /**
    @module thrust.mediator
    @submodule thrust.mediator.convention
    **/

    var event     = {
            anyContainer: 'thrust/mediator/convention/container/any',
            changeContainer: 'thrust/mediator/convention/container/change'
        },
        any       = util.any,
        bind      = util.bind,
        CONTAINER = 'container',
        START     = 'start-status',
        defer     = util.defer,
        bind      = util.bind;

    /**
    * # __thrust/mediator__ Convention - Container
    *
    * The `container` convention allows you to define a virtual `container`, for your modules to go in.
    * Conceptually only one module can be in the box at once, so when one module starts, if the `container`
    * already has a module in it, that module will be shutdown and replaced by this module.
    *
    *
    * This convention lets you not worry about cleaning up your mess, you can just focus on what modules
    * need to start, and if you have any common modules, like a main module area, it will swap automatically.
    *
    *
    *     container: 'main',
    *
    *
    * Any other module that also loads with container `main` will then get loaded into the container, and the
    * currently active module will be stopped.
    *
    * @for thrust.mediator.convention
    * @property container
    **/
    return new Convention({
        properties: [CONTAINER],
        change: function (module, container)
        {
            var containerValue = module.convention(CONTAINER);
            if (containerValue && container && containerValue === container)
            {
                if (module.convention(START))
                    defer(bind(module.stop, module));
            }
        },
        start: function (facade, module)
        {
            var that = this,
                containerValue = module.convention(CONTAINER);
            if (containerValue)
            {
                facade.fire(event.changeContainer, containerValue);
                // Facade subscriptions get unsubscribed when stopping a module, so we need to resubscribe every time here.
                // This is probably better, as the events will be less chatty.
                facade.subscribe(event.changeContainer, bind(that.change, that, module));
            }
        },
        stop: function (facade)
        {
        }
    });
});
define('thrust/mediator/convention/dependant.modules',['require', 'thrust/convention', 'thrust/util', 'thrust'],
function (require, Convention, util, thrust)
{
    /**
    @module thrust.mediator
    @submodule thrust.mediator.convention
    **/

    var any      = util.any,
        map      = util.map,
        DMODULES = 'dependantModules',
        CMODULES = 'childModules',
        START    = 'start-status',
        defer    = util.defer,
        bind     = util.bind;

    var invokeDependantModules = function (module, method)
    {
        var requiredModules = module.convention(DMODULES);
        if (requiredModules)
        {
            return module.thrust[method](requiredModules);
        }
    };

    var invokeChildModules = function (module, method)
    {
        var requiredModules = module.convention(CMODULES);
        if (requiredModules)
        {
            return module.thrust[method](requiredModules);
        }
    };

    /**
    * # __thrust/mediator__ Convention - Dependant Modules
    *
    * The dependant module convention introduces two properties to a module.
    *
    * `dependantModules` {Array}<br />
    * These are modules that must be started along side your module, but aren't required to be stopped with your module.
    * As an example you have an alerts module, this gives you alerts at the top of your page.  Your account settings module
    * may be dependant on alerts, so it can fire events into the module, but alerts is not bound to the life cycle of your settings module.
    *
    *
    * `childModules` {Array}<br />
    * These are modules that must be started and stopped along side your module.  An example of this would be a context module
    * that perhaps gives changes state to an object that is clicked in your module.
    *
    * @for thrust.mediator.convention
    * @property modules
    **/
    return new Convention({
        properties: [DMODULES, CMODULES],
        init: function (facade, module)
        {
        },
        start: function (facade, module)
        {
            return util.when.all(util.flattenToPromises([invokeDependantModules(module, 'start'), invokeChildModules(module, 'start')]));
        },
        ready: function (facade, module)
        {
            if (!module.thrust.started)
                return util.when.all(util.flattenToPromises([invokeDependantModules(module, 'ready'), invokeChildModules(module, 'ready')]));
        },
        stop: function (facade, module)
        {
            return invokeChildModules(module, 'stop');
        },
        destroy: function (facade, module)
        {
            return invokeChildModules(module, 'destroy');
        }
    });
});
define('thrust/mediator/convention/subscription',[
    'thrust/convention',
    'thrust/util',
    'thrust/events'
],
function (Convention, util, Events)
{
    /**
    The facade convention, creates the mediator facade for each module.

    @module thrust.mediator
    @submodule thrust.mediator.convention
    **/
    var SUBSCRIPTIONS = 'subscriptions',
        isFunction    = util.isFunction,
        isString      = util.isString,
        isArray       = util.isArray;

    /**
    * # __thrust/mediator__ Convention - Subscriptions
    *
    * The `subscriptions` property defines, predefined subscriptions for a module, and their appropriate definition
    *
    * By default the context of the subscription method, when run, will be your module,
    *     it can be optionally defined by passing in an array.
    *
    *
    * The definition can accept all of the following:
    *
    * * `function()` - This function will be run when the event is invoked.
    * * `string` - This string must point at a function, that exists on the module definition.
    * * `[function(), context]` - Where the context is the context that the function will be called with.
    * * `[string, context]` - Where the context is the context that the function will be called with.
    *
    *
    * The following is an exmaple of the events block in your module...
    *
    *
    *     subscription: {
    *         'event/area/name': myMethodHere,
    *         'event/area/name2': 'methodDefinedOnTheModule',
    *         'event/area/name3': [myMethodHere, myMethodContext],
    *         'event/area/name4': ['methondDefinedOnTheModule', myMethodContext]
    *     }
    *
    * @for thrust.mediator.convention
    * @property subscriptions
    **/
    return new Convention({
        properties: [SUBSCRIPTIONS],
        start: function (facade, module)
        {
            var subscriptions = module.convention(SUBSCRIPTIONS);

            if (subscriptions && !subscriptions._subscriptionsSet)
            {
                var moduleInstance = module.instance;
                for (var subscription in subscriptions)
                {
                    var definition = subscriptions[subscription];
                    if (isFunction(definition))
                    {
                        definition = [subscription, definition, moduleInstance];
                    }
                    else if (isString(definition))
                    {
                        definition = [subscription, moduleInstance[definition], moduleInstance];
                    }
                    else if (isArray(definition))
                    {
                        if (isString(definition[0]))
                        {
                            definition[0] = moduleInstance[definition[0]];
                        }
                        definition.unshift(subscription);
                    }
                    facade.subscribe.apply(facade, definition);
                }
                module.convention(SUBSCRIPTIONS)._subscriptionsSet = true;
            }
        },
        stop: function (facade, module)
        {
            var subscriptions = module.convention(SUBSCRIPTIONS);

            if (subscriptions && subscriptions._subscriptionsSet)
            {
                module.convention(SUBSCRIPTIONS)._subscriptionsSet = false;
            }
        }
    });
});
/*! Thrust JS Framework - v0.1.0 - 2012-09-03
* thrust-home
* Copyright (c) 2012 David Driscoll; Licensed MIT */


define('thrust/data/config',['require'],function (thrustInstance)
{
    /**
    Provides thrust configuration
    
    @module thrust.data
    @submodule thrust.data.config
    **/
    

    var config = {
        /**
        Resolves the given properties when creating an instance of the plugin.

        This is for internal thrust use.  Thrust uses this array to generate the properties that need to be handed
        to the plugin constructor method.

        @for thrust.data.config
        @private
        @property resolve
        @readOnly
        @type {Array}
        **/
        resolve: ['name', 'mediator', 'cfg'],
        /**
        Decides if `thrust/data` should cache requests or not.

        You should turn this to `false`, if you are experiencing caching issues and need to debug.

        @property cache
        @readOnly
        @type {Boolean}
        @default true
        **/
        cache: true,
        /**
        *
        * `startTimeout` is part of queueing built into `thrust/data`.  It defines the wait time before requests
        * are started.
        *
        *
        * The queueing system works in the followig manner.  All requests that are queued together per HTTP
        * request method (`GET`, `POST`, `PUT`, `DELETE`, `PATCH`, etc).  After the first request, the timer
        * starts, once the timeout elapses, all the requests are shipped off at once.
        *
        *
        * This counter intuitive if you're looking to get the request back immediately, but from a UX perspective
        * this allows the UI to stay in sync and give the user a cohesive, instead of seeing loaders, show up and
        * disappear at seemingly random intervals, the user does an action, and then sees a response.
        *
        *
        * @property startTimeout
        * @readOnly
        * @type {Number}
        * @default 500
        **/
        startTimeout: 100,
        /**
        *
        * `finishTimeout` is part of queueing built into `thrust/data`.  It defines the wait time before the
        * queue is completed.  If all the requests finish early, the timeout is canceled.
        *
        *
        * The queueing system works in the followig manner.  All requests that are queued together per HTTP
        * request method (`GET`, `POST`, `PUT`, `DELETE`, `PATCH`, etc).  After the requests are fired off
        * `thrust/data` will wait until it gets a response from everyone of them.  If for some reason a request
        * takes to long, and the timeout is hit, all the requests that have completed, will be releaseed, allowing
        * the application to continue undisrupted.
        *
        *
        * This counter intuitive if you're looking to get the request back immediately, but from a UX perspective
        * this allows the UI to stay in sync and give the user a cohesive, instead of seeing loaders, show up and
        * disappear at seemingly random intervals, the user does an action, and then sees a response.
        *
        *
        @property finishTimeout
        @readOnly
        @type {Number}
        @default 2000
        **/
        finishTimeout: 2000,
        /**
        The set of conventions to load into thrust/dom.

        @property conventions
        @readOnly
        @type {Array}
        **/
        conventions: [
            'thrust/data/convention/start'
        ]
    };
    return config;
});
/**

@module thrust.data
@for thrust.data
**/
define('thrust/data/event.types',{
    /**
    The `thrust/data/wait` event is fired once a data call is made.

    @event thrust/data/wait
    @param {String} queryId The internal id of the outbound queue.
    @param {String} type The type of the outbound event queue (Get/Post/etc)
    **/
    wait: 'thrust/data/wait',
    /**
    The `thrust/data/start` event is fired the queue is started.

    @event thrust/data/start
    @param {String} queryId The internal id of the outbound queue.
    @param {String} type The type of the outbound event queue (Get/Post/etc)
    @param {Number} count The outgoing call count
    **/
    start: 'thrust/data/start',
    /**
    The `thrust/data/status` event is fired for every item that returns from the queue.

    NOTE: It is entirely possible for `thrust/data/status** to be called after `thrust/data/stop** if several
        calls take to long to complete.  This is intended, and potentially useful information.

    @event thrust/data/status
    @param {String} queryId The internal id of the outbound queue.
    @param {String} type The type of the outbound event queue (Get/Post/etc)
    @param {Number} count The current completed call count for this queue.
    **/
    status: 'thrust/data/status',
    /**
    The `thrust/data/stop` event is fired when all items in the queue return, or the finishedTimeout setting elapses.

    @event thrust/data/stop
    @param {String} queryId The internal id of the outbound queue.
    @param {String} type The type of the outbound event queue (Get/Post/etc)
    @param {Number} count The (current) completed call count for this queue.
    **/
    stop: 'thrust/data/stop',
    event: {
        /**
        The `thrust/data/event/before-send` event is wrapped by thrust, and fired through jQuery.


        NOTE: Marked as private because this event exposes underlying jQuery arguments, and may
        be changed in the future.

        @event thrust/data/event/before-send
        @private
        **/
        beforeSend: 'thrust/data/event/before-send',
        /**
        The `thrust/data/event/start` event is wrapped by thrust, and fired through jQuery.


        NOTE: Marked as private because this event exposes underlying jQuery arguments, and may
        be changed in the future.

        @event thrust/data/event/start
        @private
        **/
        start: 'thrust/data/event/start',
        /**
        The `thrust/data/event/send` event is wrapped by thrust, and fired through jQuery.


        NOTE: Marked as private because this event exposes underlying jQuery arguments, and may
        be changed in the future.

        @event thrust/data/event/send
        @private
        **/
        send: 'thrust/data/event/send',
        /**
        The `thrust/data/event/error` event is wrapped by thrust, and fired through jQuery.


        NOTE: Marked as private because this event exposes underlying jQuery arguments, and may
        be changed in the future.

        @event thrust/data/event/error
        @private
        **/
        error: 'thrust/data/event/error',
        /**
        The `thrust/data/event/success` event is wrapped by thrust, and fired through jQuery.


        NOTE: Marked as private because this event exposes underlying jQuery arguments, and may
        be changed in the future.

        @event thrust/data/event/success
        @private
        **/
        success: 'thrust/data/event/sucess',
        /**
        The `thrust/data/event/complete` event is wrapped by thrust, and fired through jQuery.


        NOTE: Marked as private because this event exposes underlying jQuery arguments, and may
        be changed in the future.

        @event thrust/data/event/complete
        @private
        **/
        complete: 'thrust/data/event/complete',
        /**
        The `thrust/data/event/stop` event is wrapped by thrust, and fired through jQuery.


        NOTE: Marked as private because this event exposes underlying jQuery arguments, and may
        be changed in the future.

        @event thrust/data/event/stop
        @private
        **/
        stop: 'thrust/data/event/stop'
    }
});
define('thrust/data/event.factory',['thrust/util', './event.types'],
function(util, eventTypes)
{
    
    var camelCase   = util.camelCase,
        format      = util.format,
        bind        = util.bind,
        dataEvents  = eventTypes['event'],
        slice       = Array.prototype.slice,
        memoize     = util.memoize;

    /**
    The event factory links jQuery Events up to thrust centric events.
    The event factory would be replaced if we were ever moved off of the jQuery dependancy.

    @module thrust.data
    **/

    var eventHandlers = {    // Supported event handlers
        'before-send' : true,
        'send'        : true,
        'error'       : true,
        'success'     : true,
        'complete'    : true,
        'start'       : true,
        'stop'        : true
    };

    var beforeSendMethod = function (jqXHR, settings)
    {
        this.fire(dataEvents['beforeSend'], jqXHR, settings);
    };

    var eventFactory = memoize(function (event)
    {
        var evt = dataEvents[event];
        return function ()
        {
            var args = slice.call(arguments, 0);
            args.unshift(evt);
            this.fire.apply(this.fire.async, args);
        };
    });

    var normalizeEvents = function (evts)
    {
        evts = evts.split(' ');
        for (var i = 0, iLen = evts.length; i < iLen; i++)
        {
            if (!eventHandlers[evts[i]])
                throw new Error(format('Event "{0}" is not a valid data event', evts[i]));
            evts[i] = dataEvents[evts[i]];
        }
        return evts.join(' ');
    };

    var sendEventFactory = function (i)
    {
        return function (event, jqXHR, settings)
        {
            if (!settings.__mediator_data_fired__)
            {
                jqXHR.abort();
                throw new Error('Request aborted, all ajax calls must pass through thrust-data.');
            }
            if (!settings.silent)
            {
                eventFactory(i).apply(this, arguments);
            }
        };
    };

    return {
        /**
        Binds all the jQuery data events and creates event native thrust events out of them.

        @for thrust.data
        @private
        @method init
        @param {jQuery} A jQuery instance wrapping 'document'
        **/
        init: function(jDoc)
        {
            for (var i in eventHandlers)
            {
                var jqEvt = 'ajax-' + i,
                    method = eventFactory(i);

                if (i === 'send')
                {
                    method = bind(sendEventFactory(i), this);
                }
                jDoc.on(camelCase(jqEvt) + this.namespace, method);
            }
        },
        /**
        Wraps beforeSend, which is a custom property on the jQuery ajax data call.

        @method beforeSendMethod
        @private
        **/
        beforeSendMethod: beforeSendMethod,
    };
});
define('thrust/data/response.queue',['jquery', 'thrust/util', 'thrust/config', 'thrust/log', './event.types', 'has'],
function(jQuery, util, config, log, eventTypes, has)
{
    var slice              = Array.prototype.slice,
        format             = util.format,
        extend             = util.extend,
        when               = util.when,
        uid                = util.uniqueId,
        ajax               = jQuery.ajax,
        dataEventWait      = eventTypes['wait'],
        dataEventStart     = eventTypes['start'],
        dataEventStop      = eventTypes['stop'],
        dataEventStatus    = eventTypes['status'],
        queue              = {},
        updateXHRInternals = function (dfo, xhr)
        {
            return function ()
            {
                if (!dfo._xhr)
                {
                    dfo._xhr = xhr;
                    dfo.getAllResponseHeaders = function () { return dfo._xhr.getAllResponseHeaders(); };
                    dfo.getResponseHeader = function () { return dfo._xhr.getAllResponseHeadersgetResponseHeader(); };
                    dfo.abort = function () { return dfo._xhr.abort(); };
                    dfo.setRequestHeader = function (name, value) { return dfo._xhr.setRequestHeader(name, value); };
                }

                dfo.responseText = xhr.responseText;
                dfo.responseXML = xhr.responseXML;
                dfo.readyState = xhr.readyState;
                dfo.status = xhr.status;
                dfo.statusText = xhr.statusText;
            };
        },
        argumentResolver = function (method)
        {
            return function ()
            {
                return method(util.toArray(arguments));
            };
        },
        deferControllerItemCallback = function (func)
        {
            return function ()
            {
                return func.call(this, arguments[0][0]);
            };
        };

    /**
    The response queue class handles creation of a queue or batching system.
    With this system, we can batch up all our server requests, and request them from the server all around the same time.
    In addition to that, when the requests come back we can also spool them together, so that the calls don't resolve until
    either all the calls come back, or a specific time has elapsed.

    @for thrust.data
    @class thrust.data.ResponseQueue
    @constructor
    @param {thrust.Module} module The module to create the response queue for
    @param {Number} startTimeout The time to wait for additional requests.
    @param {Number} finishTimeout The maximum time to wait for requests to return.
    **/
    var ResponseQueue = function (module, startTimeout, finishTimeout)
    {
        this.startTimeout = startTimeout;
        this.finishTimeout = finishTimeout;
        this.module = module;
    };

    ResponseQueue.prototype = {
        /**
        Adds a request to the queue
        Queues are split up by HTTP type, so GET requests go with GET requests and POST requests go with POST requests.

        @method addToQueue
        @param {String} type The request type (POST, GET, etc)
        @param {String} url The request url to queue up
        @param {Object} options The request options.
        @returns {Promise} The promise that will resolve or reject, when the request is completed.
        **/
        addToQueue: function (type, url, options)
        {
            var dfo  = when.defer(),
                that = this;

            if (options.beforeSend)
            {
                var beforeSend = options.beforeSend;
                dfo.progress(function (eventType)
                {
                    if (eventType && eventType == 'before-send')
                    {
                        var args = slice.call(arguments, 1);
                        beforeSend.apply(beforeSend, args);
                    }
                });
                delete options.beforeSend;
            }

            if (options.complete)
            {
                dfo.always(options.complete);
                delete options.complete;
            }
            if (options.success)
            {
                dfo.then(options.success);
                delete options.success;
            }

            if (options.error)
            {
                dfo.otherwise(options.error);
                delete options.error;
            }

            var hasQueue = !!queue[type],
                list = queue[type] || (queue[type] = {}),
                tail = list.tail || (list.tail = list.next = {});

            extend(tail, { url: url, options: options, dfo: dfo });
            list.tail = tail.next = {};

            if (!hasQueue)
                when.delay(that.startTimeout).then(that.process(type));

            return dfo.promise;
        },
        /**
        Returns a function, that will process the given queue after the start time has elapsed.

        @method process
        @param {String} type The queue type, to process.
        @returns {Function} The function that will do the work on the queue.
        **/
        process: function (type)
        {
            var parent  = queue[type],
                node    = parent,
                that    = this,
                queryId = uid('dq');

            false && log.debug(format('Data[{0}]: Creating queue for type "{1}"', that.namespace, type));
            that.module.fire(dataEventWait, queryId, type);

            return function ()
            {
                false && log.debug(format('Data[{0}]: Processing queue for type "{1}"', that.namespace, type));
                var whenQueue = [], deferController = when.defer(), returnCount = 0;

                deferController.then(function ()
                {
                    false && log.debug(format('Data[{0}]: Finishing queue for type "{1}"', that.namespace, type));
                    that.module.fire(dataEventStop, queryId, type, returnCount);
                });

                delete queue[type];

                var tail = node.tail,
                    statusCallback = function () { that.module.fire(dataEventStatus, queryId, type, ++returnCount); };

                while ((node = node.next) !== tail)
                {
                    var dfo = node.dfo,
                        options = extend({}, node.options),
                        xhrDfo = when.defer(),
                        xhr = node.xhr = ajax(node.url, options).then(argumentResolver(xhrDfo.resolve), argumentResolver(xhrDfo.reject));

                    xhrDfo.then(statusCallback);
                    whenQueue.push(xhr);

                    when.all([xhrDfo, deferController.promise], when.apply(dfo.resolve), when.apply(dfo.reject), updateXHRInternals(dfo, xhr));

                    dfo.progress('before-send', [dfo, options]);
                }

                that.module.fire(dataEventStart, queryId, type, whenQueue.length);

                when.any([when.all(whenQueue), when.delay(that.finishTimeout)], deferController.resolve, deferController.resolve);
            };
        }
    };

    return ResponseQueue;
});
define('thrust/data/main',[
    'jquery',
    'thrust/util',
    'thrust/log',
    'thrust/data/config',
    'thrust/config',
    './event.factory',
    './response.queue',
    'thrust/events',
    'thrust/facade',
    './event.types',
    'has'
],
function (jQuery, util, log, config, tConfig, eventFactory, ResponseQueue, events, facade, eventTypes, has)
{
    
    // Variable declaration.
    var format          = util.format,
        extend          = util.extend,
        type            = util.type,
        when            = util.when,
        slice           = Array.prototype.slice,
        ajax            = jQuery.ajax,
        uid             = util.uniqueId,
        dataEventWait   = eventTypes['wait'],
        dataEventStart  = eventTypes['start'],
        dataEventStop   = eventTypes['stop'],
        dataEventStatus = eventTypes['status'],
        argumentResolver = function (method)
        {
            return function ()
            {
                return method(util.toArray(arguments));
            };
        };

    jQuery.ajaxSettings.traditional = !!tConfig.url.traditionalEncoding;

    var jDoc = jQuery(document);

    eventFactory.init(jDoc);
    //#region DataFacade
    /**
    The data facade that is handed off to modules.


    Enables data transport, using jQuery for thrust.

    @for thrust.data
    @class thrust.data.DataFacade
    @param {thrust.Module} module The module to create the facade for
    @param {thrust.data.Data} parent The parent thrust data object to create the facade for.
    @constructor
    **/
    var DataFacade = facade.createFacade(function (module, parent)
    {
        this.name = module.name + '-data';
        this.module = module;
        this.parent = parent;
        this.__conventions = parent.__conventions;
        this._callbacks = parent._callbacks;
        this.responseQueue = parent.responseQueue;
        this.initEvents();

        this.defaults = parent.defaults;
    });
    util.extend(DataFacade.fn, events);
    //#endregion

    /**
    The master data plugin.


    Enables data transport, using jQuery for thrust.

    @for thrust.data
    @class thrust.data.Data
    @param {String} name The thrust instance name.
    @param {thrust.mediator.Mediator} mediator The thrust mediator instance.
    @param {Object} config The thrust instance configuration.
    @constructor
    **/
    var Data = function (name, mediator, config)
    {
        // Enforce new
        if (!(this instanceof Data))
            return new Data(name, mediator);

        if (!name)
            throw new Error('Data: module name must be defined.');

        this.responseQueue = new ResponseQueue(this, config.data.startTimeout, config.data.finishTimeout);

        false && log.debug('Data: Creating new Data');

        this.mediator = mediator;
        this._callbacks = this.mediator._callbacks;
        this.initEvents();

        this.defaults = {
            cache: config.data.cache,
            beforeSend: eventFactory.beforeSendMethod,
            contentType: 'application/json',
            type: 'POST',
            url: '',
            data: '',
            dataType: 'json',
            __mediator_data_fired__: true,
            silent: false
        };
    };

    var DataMethods = {
        /**
        Creates a DataFacade for the given module.

        @for thrust.data.Data
        @method createFacade
        @param {Thrust} thrust The thrust instance
        @param {Module} module The module
        @param {Object} facades The available facades
        @returns {DataFacade} The new DataFacade
        **/
        createFacade: function (thrust, module, facades)
        {
            if (module.data && !(facades.data instanceof DataFacade)) throw new Error('"data" is a reserved property');

            var data;
            if (facades.data)
            {
                facades.data.updateFacade(module, this);
                data = facades.data;
            }
            else
            {
                data = facades.data = module.data = new DataFacade(module, this);
            }
            return data;
        },
    };

    var DataPrototype = {
        /**
        Does a GET to the server, for the given data and settings.

        @for thrust.data.Data
        @method getData
        @param {String} url The url to get data from
        @param {Object} data The data to pass to the given url
        @param {Object} settings The settings of the task to be done
            @param {Boolean} settings.cache Do we cache this call or not.
            @param {Boolean} settings.silent Do we use the built in data queue.
        @returns {Promise} The promise if this request completes or fails
        **/
        /**
        Does a GET to the server, for the given data and settings.

        @for thrust.data.DataFacade
        @method getData
        @param {String} url The url to get data from
        @param {Object} data The data to pass to the given url
        @param {Object} settings The settings of the task to be done
            @param {Boolean} settings.cache Do we cache this call or not.
            @param {Boolean} settings.silent Do we use the built in data queue.
        @returns {Promise} The promise if this request completes or fails
        **/
        getData: function (url, data, settings)
        {
            settings = !settings ? { data: data } : extend(settings, { data: data });
            return this.get(url, settings);
        },
        /**
        Does a POST to the server, for the given data and settings.

        @for thrust.data.Data
        @method postData
        @param {String} url The url to get data from
        @param {Object} data The data to pass to the given url
        @param {Object} settings The settings of the task to be done
            @param {Boolean} settings.cache Do we cache this call or not.
            @param {Boolean} settings.silent Do we use the built in data queue.
        @returns {Promise} The promise if this request completes or fails
        **/
        /**
        Does a POST to the server, for the given data and settings.

        @for thrust.data.DataFacade
        @method postData
        @param {String} url The url to get data from
        @param {Object} data The data to pass to the given url
        @param {Object} settings The settings of the task to be done
            @param {Boolean} settings.cache Do we cache this call or not.
            @param {Boolean} settings.silent Do we use the built in data queue.
        @returns {Promise} The promise if this request completes or fails
        **/
        postData: function (url, data, settings)
        {
            settings = !settings ? { data: JSON.stringify(data) } : extend(settings, { data: JSON.stringify(data) });
            return this.post(url, settings);
        },
        /**
        Does a GET to the server, using the given settings.

        Data must be passed in using settings: { data: {} } otherwise use getData.

        @for thrust.data.Data
        @method get
        @param {String} url The url to get data from
        @param {Object} settings The settings of the task to be done
            @param {Boolean} settings.cache Do we cache this call or not.
            @param {Boolean} settings.silent Do we use the built in data queue.
        @returns {Promise} The promise if this request completes or fails
        **/
        /**
        Does a GET to the server, using the given settings.

        Data must be passed in using settings: { data: {} } otherwise use getData.

        @for thrust.data.DataFacade
        @method get
        @param {String} url The url to get data from
        @param {Object} settings The settings of the task to be done
            @param {Boolean} settings.cache Do we cache this call or not.
            @param {Boolean} settings.silent Do we use the built in data queue.
        @returns {Promise} The promise if this request completes or fails
        **/
        get: function (url, settings, skipQueue)
        {
            if (settings === undefined && typeof url === 'object')
            {
                settings = url;
                url = settings.url;
            }

            if (url === undefined && settings.url !== undefined)
                url = settings.url;
            if (url === undefined)
                throw new Error('No url is defined');

            return this.ajax(url, extend(settings || {}, { type: 'get' }), skipQueue);
        },
        /**
        Does a POST to the server, using the given settings.

        Data must be passed in using settings: { data: {} } otherwise use postData.

        @for thrust.data.Data
        @method post
        @param {String} url The url to get data from
        @param {Object} settings The settings of the task to be done
            @param {Boolean} settings.cache Do we cache this call or not.
            @param {Boolean} settings.silent Do we use the built in data queue.
        @returns {Promise} The promise if this request completes or fails
        **/
        /**
        Does a POST to the server, using the given settings.

        Data must be passed in using settings: { data: {} } otherwise use postData.

        @for thrust.data.DataFacade
        @method post
        @param {String} url The url to get data from
        @param {Object} settings The settings of the task to be done
            @param {Boolean} settings.cache Do we cache this call or not.
            @param {Boolean} settings.silent Do we use the built in data queue.
        @returns {Promise} The promise if this request completes or fails
        **/
        post: function (url, settings, skipQueue)
        {
            if (settings === undefined && typeof url === 'object')
            {
                settings = url;
                url = settings.url;
            }

            if (url === undefined && settings.url !== undefined)
                url = settings.url;
            if (url === undefined)
                throw new Error('No url is defined');

            return this.ajax(url, extend(settings || {}, { type: 'post' }), skipQueue);
        },
        /**
        Does an ajax call to the given url, with the given settings.

        @for thrust.data.Data
        @method ajax
        @param {String} url The url to get data from
        @param {Object} settings The settings of the task to be done
            @param {Boolean} settings.cache Do we cache this call or not.
            @param {Boolean} settings.silent Do we use the built in data queue.
        @returns {Promise} The promise if this request completes or fails
        **/
        /**
        Does an ajax call to the given url, with the given settings.

        @for thrust.data.DataFacade
        @method ajax
        @param {String} url The url to get data from
        @param {Object} settings The settings of the task to be done
            @param {Boolean} settings.cache Do we cache this call or not.
            @param {Boolean} settings.silent Do we use the built in data queue.
        @returns {Promise} The promise if this request completes or fails
        **/
        ajax: function (url, settings, skipQueue)
        {
            var that = this, options, type, beforeSend;
            false && log.info(format('Data[{0}]: Fetching data from "{1}"', that.namespace, url));

            if (settings === undefined && typeof url === 'object')
            {
                settings = url;
                url = settings.url;
            }
            if (!settings)
                settings = {};

            if (url === undefined && settings.url !== undefined)
                url = settings.url;


            url = util.fixupUrl(url);

            var module = (that.module && that.module.module);
            if (settings.silent)
            {
                var dfo = when.defer();

                var queryId = uid('dq');
                type = settings.type.toLowerCase();

                options = extend({}, that.defaults, { beforeSend: util.noop }, settings);

                ajax(url, options).then(argumentResolver(dfo.resolve), argumentResolver(dfo.reject));
                return dfo.promise;
            }

            options = extend({}, that.defaults, settings, { beforeSend: eventFactory.beforeSendMethod });

            type = options.type.toLowerCase();

            return this.responseQueue.addToQueue(type, url, options);
        }
    };

    util.extend(DataFacade.fn, DataPrototype);

    Data.prototype = Data.fn = util.extend({}, DataMethods, DataPrototype, events);

    // Take a hold of jQuery... this is sure to be contravesial
    jQuery.ajax = Data.ajax;

    return Data;
});

define('thrust/data', ['thrust/data/main'], function (main) { return main; });

define('thrust/data/convention/start',['thrust/convention', 'thrust/util'],
function (Convention, util)
{
    var when = util.when;
    var whenQueue = [],
        waitCallback = function (uid)
        {
            var defer = when.defer();
            defer.resolver.uid = uid;

            whenQueue.push({ uid: uid, resolver: defer.resolver });
        },
        stopCallback = function (uid)
        {
            var item = util.find(whenQueue, function (x) { return x.uid === uid; });
            whenQueue = util.without(whenQueue, item);

            item.resolver.resolve();
        };

    /**
    * @module thrust.data
    * @submodule thrust.data.convention
    **/

    /**
    *
    * # __thrust/data__ Convention - Start
    *
    * The data start convention, delays thrusts ready (orbit) event, until a timeout, or all the calls return, which ever happens first.
    *
    * This convention allows your applicfation to delay it's loading, until all the data that is required to be preloaded has ben loaded.
    *
    *## Why is this useful?
    *
    * Take an example you have a complex application, that needs data from several different API's. Perhaps you're loading tweets from twitter,
    * user profile information from your server, and the pages main content.
    *
    *
    * The typical page will load and do all it's operations on DOM Ready, and fire off it's data requests.  You then perhaps have a loader up
    * on the tweet box, and the users profile picture.
    *
    *
    * A Thrust base page, will have an overall loader up.  As it starts up the modules, any module that fires off a data request will have that
    * request captured.  Once all requests have been completed, thrust completes loading, and any modules that were expecting data, will have it
    * immediately with their ready call.
    *
    *
    *##That's cool, but what if I need a long running call?
    *
    *
    * That's a good point sometimes your application does not need to be blocked, maybe you expect that call to be long running, or you don't
    * really know if it'll be long running or not.  Using data plugin API you can pass the following option, and the queue will be bypassed.
    *
    *
    *    { silent: true }
    *
    *
    * @for thrust.data.convention
    * @property start
    **/
    return new Convention({
        countdown: function(thrust)
        {
            // Subscribe to the wait and stop events
            thrust.data.subscribe('thrust/data/wait', waitCallback);
            thrust.data.subscribe('thrust/data/stop', stopCallback);
        },
        orbit: function (thrust)
        {
            // Unsubscribe from the wait and stop events
            thrust.data.unsubscribe('thrust/data/wait', waitCallback);
            thrust.data.unsubscribe('thrust/data/stop', stopCallback);

            // defer until any of the events that were captured are resolved, or the delay passes.
            var defer = when.defer();

            if (thrust.cfg.data.finishTimeout === 0)
            {
                return when.all(whenQueue);
            }
            return when.any([when.all(whenQueue), when.delay(thrust.cfg.data.finishTimeout)], defer.resolve, defer.reject);
        }
    });
});
/*! Thrust JS Framework - v0.1.0 - 2012-09-03
* thrust-home
* Copyright (c) 2012 David Driscoll; Licensed MIT */


define('thrust/dom/jquery.interface',['jquery'],
function (jQuery)
{
    var jQueryMethodBlackList = ['constructor', 'init', 'selector', 'jquery', 'ready', 'extend', 'queue', 'dequeue', 'clearQueue', 'promise', 'bind', 'unbind', 'live', 'die', 'delegate', 'undelegate', 'blur', 'focus', 'focusin', 'focusout', 'load', 'resize', 'scroll', 'unload', 'click', 'dblclick', 'mousedown', 'mouseup', 'mousemove', 'mouseover', 'mouseout', 'mouseenter', 'mouseleave', 'change', 'select', 'submit', 'keydown', 'keypress', 'keyup', 'error', 'domManip', 'serialize', 'serializeArray', 'ajaxStart', 'ajaxStop', 'ajaxComplete', 'ajaxError', 'ajaxSuccess', 'ajaxSend', '_toggle', 'fadeTo', 'stop', 'slideDown', 'slideUp', 'slideToggle', 'fadeIn', 'fadeOut', 'fadeToggle', 'on', 'off', 'one'],
        slice = Array.prototype.slice;

    //#region jQuery Interface Layer
    var updatejQueryInternals = function (selector)
    {
        if (selector)
            this._context = jQuery(selector);
        this.context = this._context.context;
        this.selector = this._context.selector;

        for (var i = this.length || 0, iLen = this._context.context; i < iLen; i++)
            delete this[i];

        this.length = this._context.length;
        for (var i = 0, iLen = this.length; i < iLen; i++)
            this[i] = this._context[i];
    },
        initalizeContext = function (context)
        {
            this._context = context instanceof jQuery ? context : jQuery(context);
            updatejQueryInternals.call(this);
        },
        jQueryMethodWrap = function (method, DomFacade)
        {
            return function ()
            {
                var args = slice.call(arguments);
                for (var i = 0, iLen = args.length; i < iLen; i++)
                    if (args[i] instanceof DomFacade)
                        args[i] = args[i]._context;

                if (this._context)
                {
                    var ret = this._context[method].apply(this._context, args);

                    if (ret instanceof jQuery)
                    {
                        if (ret.selector === this.selector && ret.context === this.context)
                        {
                            updatejQueryInternals.call(this, ret);
                            return this;
                        }
                        return new DomFacade(this.module, this, ret, true);
                    }
                    updatejQueryInternals.call(this);
                    return ret;
                }
            };
        },
        updateThrustDomPrototype = function (proto, DomFacade)
        {
            /*jshint loopfunc:true */
            for (var i in jQuery.fn)
                if (Object.hasOwnProperty.call(jQuery.fn, i) && !proto[i] && !jQueryMethodBlackList.some(function (e, index) { return e === i; }))
                    proto[i] = jQueryMethodWrap(i, DomFacade);
            proto.$ = proto.find;
        };
    //#endregion

    return {
        updatejQueryInternals: updatejQueryInternals,
        updateThrustDomPrototype: updateThrustDomPrototype,
        initalizeContext: initalizeContext
    };
});
define('thrust/dom/main',[
    'jquery',
    'thrust/util',
    'thrust/log',
    './jquery.interface',
    'thrust/facade',
    'thrust/events',
    'has'
],
function (jQuery, util, log, jQueryInterface, facade, events, has)
{
    
    //#region Variable declaration
    var format                   = util.format,
        extend                   = util.extend,
        type                     = util.type,
        bind                     = util.bind,
        proxy                    = util.proxy,
        hasOwn                   = Object.prototype.hasOwnProperty,
        isObject                 = util.isSimpleObject,
        slice                    = Array.prototype.slice,
        when                     = util.when,
        initalizeContext         = jQueryInterface.initalizeContext,
        updatejQueryInternals    = jQueryInterface.updatejQueryInternals,
        updateThrustDomPrototype = jQueryInterface.updateThrustDomPrototype,
        Dom, DomMethods, DomPrototype;
    //#endregion

    //#region DataFacade
    var DomFacade = facade.createFacade(function (module, parent, context, fake)
    {
        this.name = parent.name;
        //this.module = module;
        //this.parent = parent;
        this.__conventions = parent.__conventions;
        //this._callbacks = parent._callbacks;
        //this.initEvents();

        // We're building a dom selector, aka jquery wrapper
        if (context && fake)
        {
            // Reference the parent module.
            this._parentDom = parent._parentDom;
            if (this._parentDom)
            {
                // Init the context
                initalizeContext.call(this, context);
            }
        }
        else
        {
            false && log.debug('Dom: Creating new Dom facade');
            this._parentDom   = this;
            this._rootContext = true;

            this.changeContext(document);

            createFacade(this);
            this._internalEvents = [];
        }
    });
    util.extend(DomFacade.fn, {
        init: function (fake)
        {
            this._internalEvents = this._internalEvents || [];
            false && log.debug(format('Dom[{0}]: Initalizing {1}Dom facade', this.namespace, fake ? 'fake ' : ''));
            return this;
        },
        start: function ()
        {
            false && log.debug(format('Dom[{0}]: Starting Dom facade', this.namespace));
        },
        stop: function ()
        {
            false && log.debug(format('Dom[{0}]: Stopping Dom facade', this.namespace));

            for (var i = this._internalEvents.length - 1; i >= 0; i--)
            {
                var sub = this._internalEvents[i];
                this._internalEvents.splice(i, 1);
                this.changeContext(sub.context);
                this.off.apply(this, (util.isArray(sub)) ? sub : (util.isArray(sub.args)) ? sub.args : []);
            }
        },
        destroy: function ()
        {
            if (this._rootContext)
            {
                false && log.debug(format('Dom[{0}]: Destroying Dom facade', this.namespace));
                delete this._internalEvents;
            }

            this._context = null;
            delete this._context;
        }
    });
    //#endregion

    var createFacade = function (dom)
    {
        if (!dom.query)
            dom.query = bind(function (context)
            {
                if (typeof context !== 'undefined')
                    return new DomFacade(dom.module, dom, context, true);
                return dom;
            }, dom);
        return dom.query;
    };

    var normalizeEvents = function (events, namespace)
    {
        if (isObject(events))
        {
            for (var i in events)
            {
                events[i + namespace] = events[i];
                delete events[i];
            }
            return events;
        }
        else
        {
            if (!events)
                return namespace;

            events = events.split(' ');
            for (var i = 0, iLen = events.length; i < iLen; i++)
            {
                events.push(events[i] + namespace);
            }
            return events.slice(events.length / 2).join(' ');
        }
    };

    DomPrototype = {
        changeContext: function (selector)
        {
            false && log.info(format('Dom[{0}]: Changing Dom context', this.namespace));
            updatejQueryInternals.call(this, selector);
            return this;
        },
        on: function (events)
        {
            false && log.debug(format('Dom[{0}]: Binding events...', this.namespace));
            var args = slice.call(arguments);
            args[0] = normalizeEvents(events, this.namespace);
            this._context.on.apply(this._context, args);
            return this;
        },
        one: function (events)
        {
            false && log.debug(format('Dom[{0}]: Binding one events...', this.namespace));
            var args = slice.call(arguments);
            args[0] = normalizeEvents(events, this.namespace);
            this._context.one.apply(this._context, args);
            return this;
        },
        off: function (events)
        {
            false && log.debug(format('Dom[{0}]: Unbinding events...', this.namespace));
            var args = slice.call(arguments);
            args[0] = normalizeEvents(events, this.namespace);
            this._context.on.apply(this._context, args);
            return this;
        }
    };

    updateThrustDomPrototype(DomPrototype, DomFacade);
    util.extend(DomFacade.fn, DomPrototype);
    DomFacade.fn.$ = DomFacade.fn.find;

    //#region Dom
    Dom = function (name, mediator)
    {
        /// <summary>The Dom</summary>
        // Enforce new
        if (!(this instanceof Dom))
            return new Dom(name, mediator);

        if (!name)
            throw new Error('Dom: module name must be defined.');

        false && log.debug('Data: Creating new Data');

        this.mediator = mediator;
        this._callbacks = this.mediator._callbacks;
        this.initEvents();
        this.name = name;
    };

    Dom.prototype = Dom.fn = util.extend({}, DomPrototype,
    {
        createFacade: function (thrust, module, facades)
        {
            if (module.dom && !(facades.dom instanceof DomFacade)) throw new Error('"dom" is a reserved property');

            var dom;
            if (facades.dom)
            {
                facades.dom.updateFacade(module, this, document);
                dom = facades.dom;
            }
            else
            {
                dom = facades.dom = new DomFacade(module, this, document);
                module.dom = module.$ = dom.query;
                module.dom.$ = module.dom.find = function (selector)
                {
                    return dom.find(selector);
                };
            }
            return dom;
        }
    }, events);

    //#endregion

    return Dom;
});

define('thrust/dom', ['thrust/dom/main'], function (main) { return main; });

define('thrust/dom/convention/action',[
    'thrust/convention',
    'thrust/util',
    'jquery'
],
function (Convention, util, $)
{
    var format     = util.format,
        ACTIONS    = 'actions',
        STRING     = 'string',
        isFunction = util.isFunction,
        isString   = util.isString,
        isArray    = util.isArray;

    var actionHandlers = {
        _registrations: {},
        register: function (eventName, acionName, handler, context)
        {
            var that = this;
            if (!that._registrations[eventName])
                that._registrations[eventName] = {};

            if (!that._registrations[eventName][acionName])
            {
                that._registrations[eventName][acionName] = handler;
                if (context) that._registrations[eventName][acionName].context = context;
            }
            else
                throw new Error(format('The action {1} handler "{0}" has already been taken!', acionName, eventName));
        },
        unregister: function (eventName, acionName)
        {
            var that = this;
            if (that._registrations[eventName] && that._registrations[eventName][acionName])
            {
                that._registrations[eventName][acionName] = null;
                delete that._registrations[eventName][acionName];
            }
        },
        callbackFor: function (eventName, returnResults)
        {
            var that = this;
            var actionAttribute = 'data-action-' + eventName,
                returnResultsDefined = typeof returnResults !== 'undefined';

            return function ()
            {
                var attributeValue = $(this).attr(actionAttribute);
                if (typeof attributeValue === STRING)
                {
                    var method = that._registrations[eventName][attributeValue];
                    if (method)
                        method.apply(method.context || this, arguments);
                    if (returnResultsDefined)
                        return returnResults;
                    return false;
                }
            };
        }
    };

    /**
    @module thrust.dom
    @submodule thrust.dom.convention
    **/

    /**
    * # __thrust/dom__ Convention - Actions
    *
    * The dom action convention allows you to create custom actions, that execute when a certian event happen.
    *
    *
    *## Supported events
    * * `click`
    *
    * NOTE: More events will be added when they make sense to add them.
    *
    *
    * The definition can accept all of the following:
    *
    * * `function()` - This function will be run when the action is invoked.
    * * `string` - This string must point at a function, that exists on the module definition.
    * * `[function(), context]` - Where the context is the context that the function will be called with.
    * * `[string, context]` - Where the context is the context that the function will be called with.
    *
    *
    * The definition that is used to define an action is below...
    *
    * NOTE: The below is written as if it were part of a module definition.
    *
    *
    *     actions: {
    *         'click': {
    *             'doFunction': function()
    *             {
    *                 alert('My awesome alert here!');
    *             },
    *             'doString': 'actionString',
    *             'doContextFunction': [function()
    *             {
    *                 alert('My awesome alert here!');
    *             }, context],
    *             'doString': ['actionString', context],
    *         }
    *     },
    *     actionString: function()
    *     {
    *         alert('My awesome alert here!');
    *     }
    *
    * To utlize the action, simply add a `data-action-{event}` attribute, with the name of the action as the va;ie to any of the following elements:
    *
    * * `a`
    * * `button`
    * * `input[type="button"]`
    * * `input[type="submit"]`
    *
    * @for thrust.dom.convention
    * @property actions
    **/
    return new Convention({
        properties: [ACTIONS],
        ignite: function()
        {
            $(window.document.body).on('click.' + ACTIONS, 'a, button, input[type="button"], input[type="submit"]', actionHandlers.callbackFor('click', false));
        },
        ready: function (facade, module)
        {
            var actions = module.convention(ACTIONS),
                dom = facade,
                moduleInstance = module.instance;

            if (actions)
            {
                for (var actionEvent in actions)
                {
                    var actionCollection = actions[actionEvent];
                    for (var actionName in actionCollection)
                    {
                        var action = actionCollection[actionName],
                            args;

                        if (isFunction(action))
                        {
                            args = [actionEvent, actionName, action];
                        }
                        else if (isString(action))
                        {
                            args = [actionEvent, actionName, moduleInstance[action]];
                        }
                        else if (isArray(action))
                        {
                            if (isFunction(action[0]))
                            {
                                args = [actionEvent, actionName].concat(action);
                            }
                            else if (isString(action[0]))
                            {
                                action[0] = moduleInstance[action[0]];
                                args = [actionEvent, actionName].concat(action);
                            }
                        }
                        actionHandlers.register.apply(actionHandlers, args);
                    }
                }
            }
        },
        stop: function (facade, module)
        {
            var dom = facade,
                actions = module.convention(ACTIONS),
                moduleInstance = module.instance,
                dom = facade.dom;

            if (actions)
            {
                for (var actionEvent in actions)
                {
                    var actionCollection = actions[actionEvent];
                    for (var actionName in actionCollection)
                    {
                        actionHandlers.unregister(actionEvent, actionName);
                    }
                }
            }
        }
    });
});
define('thrust/dom/convention/context',['thrust/convention', '../jquery.interface'],
function (Convention, jQueryInterface)
{
    var CONTEXT         = 'context',
        updatejQueryInternals = jQueryInterface.updatejQueryInternals;

    /**
    @module thrust.dom
    @submodule thrust.dom.convention
    **/

    /**
    * # __thrust/dom__ Convention - Context
    *
    * The context convention allows you to specific a selector for your module.  This selector can be anything that is compatable with jQuerys Sizzle engine.
    *
    * Then the default context of your modules `dom()` / `$()` will be that selector.  In addition any internal find `dom.find` / `dom.$` / `$.find` / `dom.$`,
    * will also have the selector as the root context.
    *
    *
    *     {
    *         context: '#myDiv'
    *     }
    *
    *
    *
    * @for thrust.dom.convention
    * @property context
    **/
    return new Convention({
        properties: [CONTEXT],
        ready: function (facade, module)
        {
            var context = module.convention(CONTEXT),
                dom     = facade;

            if (context)
            {
                updatejQueryInternals.call(dom, context);
            }
        }
    });
});
define('thrust/dom/convention/event',[
    'thrust/convention',
    'thrust/util'
],
function (Convention, util)
{
    var CONTEXT    = 'context',
        EVENTS     = 'events',
        isFunction = util.isFunction,
        isString   = util.isString,
        isArray    = util.isArray;

    /**
    @module thrust.dom
    @submodule thrust.dom.convention
    **/

    /**
    * # __thrust/dom__ Convention - Events
    *
    * The dom events convention, allows you to automatically bind events for your module.  Using this module you can bind common events like
    * mouse over, click, etc, to a method or handler.
    *
    * The definition can accept all of the following:
    *
    * * `function()` - This function will be run when the event is invoked.
    * * `string` - This string must point at a function, that exists on the module definition.
    * * `[function(), context]` - Where the context is the context that the function will be called with.
    * * `[string, context]` - Where the context is the context that the function will be called with.
    * * `[selector, function(), context]` - Where the selector is a jquery delegate selector.
    * * `[selector, string, context]` - Where the selector is a jquery delegate selector.
    *
    *
    * The following is an example of the events block in your module...
    *
    *
    *      events: {
    *          'focus': function() { alert('Test Function'); },
    *          'mouseover': 'mouseOver',
    *          'click': ['li', function() { alert('Test function'); }]
    *      },
    *      mouseOver: function() { alert('Test Function'); },
    *
    * @for thrust.dom.convention
    * @property events
    **/
    return new Convention({
        properties: [EVENTS],
        ready: function (facade, module)
        {
            var events          = module.convention(EVENTS),
                optionalContext = module.convention(CONTEXT),
                dom             = optionalContext ? facade.query(optionalContext) : facade,
                moduleInstance  = module.instance;

            if (events)
            {
                for (var event in events)
                {
                    var definition = events[event],
                        bindEvent;

                    if (isFunction(definition))
                    {
                        bindEvent = [event, definition];
                    }
                    // If the event method is a string, we search to verify that module method exists on the given module
                    //        then bind it, with the proper context.
                    else if (isString(definition))
                    {
                        bindEvent = [event, moduleInstance[definition]];
                    }
                        // If the event module is an array, we apply the array as if it were a direct call to subscribe, by pushing the event name on the front.
                    else if (isArray(definition))
                    {
                        bindEvent = definition;
                        for (var i = 0, iLen = definition.length; i < iLen; i++)
                        {
                            if (isString(definition[i]) && moduleInstance[definition[i]])
                            {
                                definition[i] = moduleInstance[definition[i]];
                            }
                        }
                        bindEvent.unshift(0);
                    }
                    // Call the on method, with our arguments.
                    dom.on.apply(dom, bindEvent);
                }
                //Save a reference of the context, for later unbinding.
                events.context = dom._context[0];
            }
        },
        stop: function (facade, module)
        {
            var events = module.convention(EVENTS),
                dom = facade;

            if (events)
            {
                dom.changeContext(events.context);
                delete events.context;

                if (dom._context)
                    dom.off();
            }
        }
    });
});
/*! Thrust JS Framework - v0.1.0 - 2012-09-03
* thrust-home
* Copyright (c) 2012 David Driscoll; Licensed MIT */


define('thrust/template/main',[
    'require',
    'thrust/util',
    'thrust/data',
    'thrust/log',
    'thrust/config',
    'domReady',
    'lodash',
    'thrust/facade'
],
    function (require, util, tData, log, config, domReady, _, facade)
    {
        var LONG        = 'long',
            SHORT       = 'short',
            ID          = 'id',
            templates   = {
                long: {},
                short: {},
                id: {}
            },
            deepCopy    = util.deepCopy,
            format      = util.format,
            each        = util.each,
            bind        = util.bind,
            when        = util.when,
            memoize     = util.memoize,
            getLongName = function (name, type)
            {
                var that = this;
                return (that.shortName(name) + '.' + (type || that.defaultType) + that.extension).toLowerCase();
            },
            getShortName = function (name)
            {
                var that = this;
                return util.reduce(that.templateTypes, function (memo, x) { return memo.replace('.' + x.toLowerCase() + that.extension, ''); }, name.toLowerCase()).toLowerCase();
            },
            getTemplateId = function (name)
            {
                return this.shortName(name).replace(/\//g, '-');
            };
        /**
        @module thrust.template
        @requires thrust.data
        **/

        /**
        The template plugin consturctor.

        @for thrust.template
        @class thrust.template.Template
        @param {Object} config The thrust config object
        @param {Object} data The thrust data instance
        @uses thrust.data.Data
        @constructor
        **/
        var Template = function (config, data)
        {
            var that           = this;
            config             = config.template;
            that.extension     = config.extension;
            that.templatePaths = config.types;
            that.templateTypes = util.map(config.types, function (x, i) { return i; });
            that.baseUrl       = config.baseUrl;
            that.defaultType   = config.defaultType;
            that.evaluators    = config.evaluators;
            that.templates     = deepCopy({}, templates);
            that.longName      = memoize(bind(getLongName, that));
            that.shortName     = memoize(bind(getShortName, that));
            that.templateId    = memoize(bind(getTemplateId, that));
            that.engines       = {};
            that.data          = data;

            require([(that.templatePaths[config.defaultType] || 'thrust/template/' + config.defaultType)], function (engine)
            {
                that.engines[config.defaultType] = engine;

                domReady(function ()
                {
                    _(document.getElementsByTagName('script'))
                        .filter(function(x) { return !!x.getAttribute('data-template'); })
                        .forEach(bind(that.createFromDomNode, that));
                });
            });
        };

        Template.prototype = {
            /**
            Gets a template from the cache if it has been fetched. False otherwise.

            @for thrust.template.Template
            @method get
            @param {String} name The template name to try and get.
            @returns {Function} The template object
            **/
            /**
            Gets a template from the cache if it has been fetched. False otherwise.

            @for thrust.template.TemplateFacade
            @method get
            @param {String} name The template name to try and get.
            @returns {Function} The template object
            **/
            get: function (name)
            {
                var template = null, that = this, templates = that.templates;
                if (template = templates[LONG][that.longName(name)])
                    return template;
                else if (template = templates[SHORT][that.shortName(name)])
                    return template;
                else if (template = templates[ID][that.templateId(name)])
                    return template;
                return false;
            },
            /**
            Sets a template to the cache, with the given information

            @for thrust.template.Template
            @method set
            @param {String} name The template name
            @param {String} type The template engine type
            @param {Function} compiledTemplate The compiled template method
            @param {String} html The template HTML.
            **/
            set: function (name, type, compiledTemplate, html)
            {
                var that = this,
                    shortName = that.shortName(name),
                    templateId = that.templateId(name),
                    longName = that.longName(name, type),
                    templates = that.templates;

                templates[LONG][longName] = templates[SHORT][shortName] = templates[ID][templateId] = {
                    name: name,
                    shortName: name,
                    id: templateId,
                    type: type,
                    html: html,
                    compiled: compiledTemplate
                };
            },
            /**
            Checks if the template exists in the cache.

            @for thrust.template.Template
            @method has
            @param {String} name The template name
            @returns {Boolean} Wether the template exists or not.
            **/
            /**
            Checks if the template exists in the cache.

            @for thrust.template.TemplateFacade
            @method has
            @param {String} name The template name
            @returns {Boolean} Wether the template exists or not.
            **/
            has: function (name)
            {
                var that = this;
                return !!that.get(name);
            },
            /**
            Creates a new template given the information

            @for thrust.template.Template
            @method newTemplate
            @param {String} name The template name
            @param {String} type The template engine type
            @param {String} html The template HTML.
            @param {String} engine The template engine
            @returns {Object} The new template instance.
            **/
            newTemplate: function (name, type, html, engine)
            {
                var that = this, template = that.get(name);
                if (!template)
                {
                    if (type == 'precompiled')
                    {
                        that.set(name, type, html, html.toString());
                    }
                    else
                    {
                        var templatingMethod;

                        var compiledTemplate = this.compile(html, engine);
                        that.set(name, type, compiledTemplate, html);
                    }
                }
                return that.get(name);
            },
            /**
            Compiles a template given the html and the engine type.

            @for thrust.template.Template
            @method compile
            @param {String} html The html to generate the template from
            @param {String} engine The template engine that is being used.
            @returns {Function} The compiled template method
            **/
            compile: function(html, engine)
            {
                var that = this, templatingMethod;
                if (!engine)
                    engine = that.engines[that.defaultType];

                if (typeof engine === 'function')
                    templatingMethod = engine;
                else if (typeof engine.template === 'function')
                    templatingMethod = engine.template;

                return templatingMethod(html);
            },
            /**
            Fetchs a template from the server, or template store.

            @for thrust.template.Template
            @method fetch
            @param {String} name The template name
            @param {String} [type] The template type if not the default
            @returns {Promise} The promise for when the template has been loaded.
            **/
            /**
            Fetchs a template from the server, or template store.

            @for thrust.template.TemplateFacade
            @method fetch
            @param {String} name The template name
            @param {String} [type] The template type if not the default
            @returns {Promise} The promise for when the template has been loaded.
            **/
            fetch: function (name, type)
            {
                var that = this,
                    type = type || that.defaultType,
                    shortName = that.shortName(name),
                    longName = that.longName(name, type),
                    template;

                var defer = when.defer();

                if (template = that.get(name))
                {
                    defer.resolve(template);
                    return defer.promise;
                }

                that.data.get(that.baseUrl + longName, { contentType: 'text/plain', dataType: 'text', silent: true }).then(when.apply(function (data)
                {
                    if (type == 'precompiled')
                    {
                        var template = that.newTemplate(name, type, data);
                        defer.resolve(template);
                    }
                    else
                    {
                        if (that.engines[type])
                        {
                            var template = that.newTemplate(name, type, data, that.engines[type]);
                            defer.resolve(template);
                        }
                        else
                        {
                            require([(that.templatePaths[type] || 'thrust/template/' + type)], function (engine)
                            {
                                that.engines[type] = engine;
                                var template = that.newTemplate(name, type, data, engine);
                                defer.resolve(template);
                            });
                        }
                    }
                }), defer.reject);

                return defer.promise;
            },
            /**
            Creates a new template from the given DOM Node

            @for thrust.template.Template
            @method createFromDomNode
            @protected
            @param {Node} element THe dome element.
            **/
            createFromDomNode:  function (element)
            {
                var that = this;
                that.newTemplate(
                    element.getAttribute('data-template'),
                    element.getAttribute('data-type'),
                    element.text
                );
            }
        };

        /**

        @for thrust.template
        @class thrust.template.TemplateFacade
        @constructor
        @param {thrust.Module} module The module to create the facade for
        @param {thrust.template.Template} parent The template instance to create the facade for.
        **/
        var TemplateFacade = facade.createFacade(function (module, parent)
        {
            this.name = module.name + '-template';
            this.module = module;
            this.parent = parent;
            this.__conventions = parent.__conventions;

            util.extend(this, {
                fetch: bind(parent.fetch, parent),
                get: bind(parent.get, parent),
                has: bind(parent.has, parent)
            });
        });

        /**

        @for thrust.template.Template
        @method createFacade
        @param {thrust.Thrust} thrust The thrust instance
        @param {thrust.Module} module The module to create the facade for
        @param {Object} facades The facades already added for this module.
        **/
        Template.prototype.createFacade = function (thrust, module, facades)
        {
            var templateInstance = thrust.template;

            facades.template = new TemplateFacade(module, this);
            module.templates = {
                fetch: bind(templateInstance.fetch, templateInstance),
                get: bind(templateInstance.get, templateInstance),
                has: bind(templateInstance.has, templateInstance)
            };
        };

        return Template;
    });
define('thrust/template', ['thrust/template/main'], function (main) { return main; });

define('thrust/template/convention/template',['thrust/convention', 'thrust/util'],
function (Convention, util)
{
    var TEMPLATES = 'templates',
        when = util.when,
        each = util.each,
        hasOwn = Object.prototype.hasOwnProperty,
        find = util.find;

    /**
    @module thrust.template
    @submodule thrust.template.convention
    **/

    /**
    * # __thrust/template__ Convention - Templates
    *
    * The `templates` convention takes a list of template paths, that need to be fetched for this module.
    * When the module starts, the templates will be fetched automatically by the modules code, in addition
    * the template ready method will be held until all the templates have returned with a value.
    *
    *
    * When the templates have been resolved, your module will have an object on it with the values of the templates location.
    * In addition the templates object will have a get, fetch and has method, to get different templates if required further
    * down the line.
    *
    * @for thrust.template.convention
    * @property templates
    **/
    return new Convention({
        properties: [TEMPLATES],
        init: function(facade, module)
        {
            var defer = when.defer();

            var templates = module.convention(TEMPLATES),
                invertedTemplates = util.invert(templates),
                moduleInstance = module.instance;

            if (templates)
            {
                facade.defers = [];
                each(templates, function(template)
                {
                    if (typeof template === 'string')
                    {
                        facade.defers.push(facade.fetch(template));
                    }
                });
                facade.defers = when.all(facade.defers).then(function (loadedTemplates)
                {
                    /*jshint loopfunc:true */
                    for (var i in invertedTemplates)
                    {
                        if (hasOwn.call(invertedTemplates, i))
                        {
                            var template = find(loadedTemplates, function (x) { return x.shortName === i || x.name === i; });
                            moduleInstance.templates[i] = template.compiled;
                        }
                    }
                });
            }
        },
        ready: function (facade)
        {
            return [facade.defers] || undefined;
        }
    });
});
define('thrust/template/convention/knockout.engine',['thrust/convention', 'thrust/util', 'knockout'],
function (Convention, util, ko)
{
    var when = util.when,
        each = util.each,
        hasOwn = Object.prototype.hasOwnProperty,
        find = util.find,
        knockoutTemplates = {};

    var initKnockoutIntegration = function (templateManager)
    {
        var ThrustTemplateSource = ko.templateSources.thrustTemplate = function (template)
        {
            this.template = template;
        };

        ThrustTemplateSource.prototype = {
            text: function ()
            {
                var that = this;
                if (arguments.length === 0)
                {
                    return that.template.html;
                }
                else
                {
                    that.template.html = arguments[0];
                    //throw new Error('Thrust Template does not support rewriting...');
                }
            },
            data: function (key)
            {
                var that = this;
                if (!that.template.data) that.template.data = {};
                if (arguments.length === 1)
                {
                    return that.template.data[key];
                }
                else
                {
                    that.template.data[key] = arguments[1];
                }
            }
        };

        // Begin integration of template plugin, with Knockout.
        var oldEngine = ko.nativeTemplateEngine.instance;

        var conventionTemplateEngine = ko.conventionTemplateEngine = function () { };
        conventionTemplateEngine.prototype = ko.utils.extend(new ko.templateEngine(),
        {
            renderTemplateSource: function (templateSource, bindingContext, options)
            {
                if (templateSource.template)
                {
                    var evaluators = this.evaluators;
                    if (!evaluators)
                    {
                        this.evaluators = evaluators = templateManager.evaluators[templateManager.defaultType];
                    }

                    var precompiled = templateSource['data']('precompiled');
                    if (!precompiled)
                    {
                        precompiled = templateManager.compile('{{ with($data) { }} ' + templateSource.text() + " {{ } }}");
                        templateSource['data']('precompiled', precompiled);
                    }

                    // Run the template and parse its output into an array of DOM elements
                    var renderedMarkup = templateSource.template.compiled(bindingContext).replace(/\s+/g, " ");
                    return ko.utils.parseHtmlFragment(renderedMarkup);
                }

                return oldEngine.renderTemplateSource.apply(oldEngine, arguments);
            },
            createJavaScriptEvaluatorBlock: function (script)
            {
                if (!this.evaluatorCache)
                {
                    var evaluators = templateManager.evaluators[templateManager.defaultType];
                    this.evaluatorCache = evaluators.left + script + evaluators.right;
                }
                return this.evaluatorCache;
            },
            makeTemplateSource: function (template, templateDocument)
            {
                // Named template
                if (typeof template == "string")
                {
                    var definition = templateManager.get(template);
                    if (definition)
                        return new ThrustTemplateSource(definition);
                }

                return oldEngine.makeTemplateSource.apply(oldEngine, arguments);
            }
        });

        ko.setTemplateEngine(new ko.conventionTemplateEngine());
    };

    /**
    @module thrust.template
    @submodule thrust.template.convention
    **/

    /**
    * # __thrust/template__ Convention - Knockout Engine
    *
    * The knockout engine convention is less of a convention and instead introduces a new custom knockout template engine
    * This engine takes the the same template path, that you'd use to fetch a template instead of the dom id, to fetch the template
    * when using knockout templates by name.
    *
    *
    * This allows you to follow the same convention in both your modules, as you would your views and templates.
    *
    * @for thrust.template.convention
    * @property templates
    **/
    return new Convention({
        countdown: function (thrust)
        {
            initKnockoutIntegration(thrust.template);
        }
    });
});
/*! Thrust JS Framework - v0.1.0 - 2012-09-03
* thrust-home
* Copyright (c) 2012 David Driscoll; Licensed MIT */


define('thrust/spa/main',[
    'require',
    'thrust',
    'thrust/util',
    'thrust/log',
    'davis',
    'jquery',
    'domReady'
],
function (require, Thrust, util, log, Davis, jQuery, domReady)
{
    var each       = util.each,
        isString   = util.isString,
        isArray    = util.isArray,
        isFunction = util.isFunction,
        isObject   = util.isObject,
        extend     = util.extend,
        once       = util.once,
        when       = util.when,
        bind       = util.bind,
        invoke     = util.invoke,
        pluck      = util.pluck,
        map        = util.map,
        defer      = util.defer,
        memoize    = util.memoize,
        toArray    = util.toArray,
        START      = 'start';

    /**

    @for thrust.spa
    @class thrust.spa.SinglePageApp
    @constructor
    @param {Object} config The thrust instance configuration
    @param {String} instanceName The thrust instance name
    @param {thrust.mediatorMediator} mediator The thrust instance mediator
    **/
    var SinglePageApp = function (config, /* $ref : name */ instanceName, mediator)
    {
        // Need to build a shim for the jQuery methods Davis needs.
        if (!Davis.$) Davis.$ = jQuery;

        var that = this;
        that.baseUrl = config.url.path + '/';

        config = config.spa;

        that.thrustInstanceName = instanceName;
        that.router = new Davis.App();
        that.router.configure(function (config)
        {
            config.generateRequestOnPageLoad = true;
        });

        that.loadRoutes(config.routes);
        
        var eventFactory = memoize(function (event)
        {
            return function ()
            {
                mediator.fire.async.apply(mediator, [event].concat(toArray(arguments)));
            };
        });

        // Forward events
        // Technically we should wrap certian parts of the events, to offer a common api that won't shift.
        /**
        The `thrust/spa/start` event is wrapped by thrust, and fired through Davis.js.


        NOTE: Marked as private because this event exposes underlying Davis arguments, and may
        be changed in the future.

        @event thrust/spa/start
        @private
        **/
        that.router.bind('start', eventFactory('thrust/spa/start'));
        /**
        The `thrust/spa/route/lookup` event is wrapped by thrust, and fired through Davis.js.


        NOTE: Marked as private because this event exposes underlying Davis arguments, and may
        be changed in the future.

        @event thrust/spa/route/lookup
        @private
        **/
        that.router.bind('lookupRoute', eventFactory('thrust/spa/route/lookup'));
        /**
        The `thrust/spa/route/run` event is wrapped by thrust, and fired through Davis.js.


        NOTE: Marked as private because this event exposes underlying Davis arguments, and may
        be changed in the future.

        @event thrust/spa/route/run
        @private
        **/
        that.router.bind('runRoute', eventFactory('thrust/spa/route/run'));
        /**
        The `thrust/spa/route/run` event is wrapped by thrust, and fired through Davis.js.


        NOTE: Marked as private because this event exposes underlying Davis arguments, and may
        be changed in the future.

        @event thrust/spa/route/notfound
        @private
        **/
        that.router.bind('routeNotFound', eventFactory('thrust/spa/route/notfound'));
        /**
        The `thrust/spa/request/halt` event is wrapped by thrust, and fired through Davis.js.


        NOTE: Marked as private because this event exposes underlying Davis arguments, and may
        be changed in the future.

        @event thrust/spa/request/halt
        @private
        **/
        that.router.bind('requestHalted', eventFactory('thrust/spa/request/halt'));
        /**
        The `thrust/spa/unsupported` event is wrapped by thrust, and fired through Davis.js.

            
        NOTE: Marked as private because this event exposes underlying Davis arguments, and may
        be changed in the future.

        @event thrust/spa/unsupported
        @private
        **/
        that.router.bind('unsupported', eventFactory('thrust/spa/unsupported'));
    };

    SinglePageApp.prototype = {
        /**
        Start the single page app router.

        @method start
        **/
        start: function ()
        {
            var that = this;
            that.router.start();
        },
        /**
        Loads routes into the spa instance

        Routes can be in 3 forms

            {
                '/path/to/:foo': 'path/to/module',
                '/path/to/:bar': ['path/to/module1', 'path/to/module2'],
                '/path/to/:fb': { path: 'path/to/module', args: ['args', 'to', 'hand off to start'] }
                '/path/to/:foo/:bar': function(){  custom handler }
            }

        @method loadRoutes
        @param {Object} routes Object of routes.
        **/
        loadRoutes: function (routes)
        {
            var that = this;
            each(routes, function (value, route)
            {
                var realRoute = util.fixupUrl(that.baseUrl + route);
                if (isFunction(value))
                {
                    that.router.get(realRoute, value);
                    // Run custom function in davis.
                }
                /*else if (isArray(value))
                {
                    var routeResult = map(value, that.__processRoute);

                    that.router.get(realRoute, function (req)
                    {
                        invoke(routeResult, 'cb', req);
                    });

                    when.all(pluck(routeResult, 'promise'))
                        .then(bind(that.startModules, that, map(value, function(x)
                        {
                            return isObject(x) && x.args || [];
                        })));
                }*/
                else
                {
                    var routeResult = that.__processRoute(value);

                    that.router.get(realRoute, routeResult);
                    //routeResult.promise.then(bind(that.startModules, that, value.args || []));
                }
            });
        },
        /**
        Process each route node depending if it is an object or string.

        @method __processRoute
        @private
        @param {Object|String} value The module or module + args to process.
        **/
        __processRoute: function(value)
        {
            var that = this,
                args = value.args || [];

            if (isObject(value))
            {
                return that.routeGetModuleFactory(value.path, args);
            }
            else if (isString(value))
            {
                return that.routeGetModuleFactory(value, args);
            }
        },
        /**
        Creates a method that is handed off to the router
        When the route invokes that module, it will asyncronously load the given module, and return a promise for the result.

        @method routeGetModuleFactory
        @param {String} modulePath The path to the module
        @param {Function} themMethod The method that is called, after the function is resolved.
        @returns {Promise} The promise for when the module gets loaded.
        **/
        routeGetModuleFactory: function (modulePath, args)
        {
            var that = this;

            return function (req)
            {
                var mp;
                if (modulePath.indexOf(':') > -1)
                {
                    mp = util.reduce(req.params, function (memo, param, i) { return memo.replace(':' + i, param.toLowerCase()); }, modulePath);
                    if (mp.lastIndexOf('.') > -1)
                        mp = mp.substring(0, mp.lastIndexOf('.'));
                }
                that.startModules(args, mp);
            };
        },
        /**
        Starts the given modules, if only one module is passed in, it will start that individually.

        @method startModules
        @param {Array of Object} args to pass onto thrust's start method.
        @param {Array of Module|Module} modules The modules to start
        **/
        startModules: function (args, module)
        {
            var that = this;

            if (!that.thrust)
                that.thrust = Thrust.getInstance(that.thrustInstanceName);

            if (isArray(module))
            {
                each(module, function (x)
                {
                    defer(function ()
                    {
                        var promise = that.thrust.start.apply(that.thrust, [x].concat(args));
                        if (!that.thrust.started)
                            promise.then(function ()
                            {
                                that.thrust.ready(x);
                            });
                    });
                });
            }
            else
            {
                var promise = that.thrust.start.apply(that.thrust, [module].concat(args));
                if (!that.thrust.started)
                    promise.then(function ()
                    {
                        that.thrust.ready(module);
                    });

                that.startingModulePromise = [promise];
            }
        }
    };

    return SinglePageApp;
});
define('thrust/spa', ['thrust/spa/main'], function (main) { return main; });

define('thrust/spa/convention/start',['thrust/convention', 'thrust/util'],
function (Convention, util)
{
    /**
    @module thrust.spa
    @submodule thrust.spa.convention
    **/

    /**
    * # __thrust/spa__ Convention - Start
    *
    * The single page app start convention, does the actual starting of the plugin, in addition it also delays
    * full orbit, until any module it has started has been loaded.
    *
    * @for thrust.spa.convention
    * @property start
    **/
    return new Convention({
        orbit: function (thrust)
        {
            var router = thrust.spa;
            router.start();

            return thrust.spa.startingModulePromise || undefined;
        }
    });
});