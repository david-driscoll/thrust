/// <reference path="../../../lib/DefinitelyTyped/requirejs/require.d.ts" />

// Disabled until TS supports module per file in some way (ie exports is exports.<export> not  exports.moduleName.<export>)
/*export module util {*/

import __ = module('lodash')
import __s = module('underscore.string');
import uuid = module('uuid');

'use strict';
/**
@class thrust.util
**/

declare var arguments;

__.mixin(__s);
export var _: ILodash = __;
export var _s: __s;

//#region function
var slice = Array.prototype.slice;
/**
A function that does nothing, or no operation.  Hence the name noop.

@method noop
**/
export function noop() { }
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
export function safeInvoke(collection: any, methodName: string, ...args: any[]) {
    /*jshint bitwise:false */
    var index, iteratee = collection, result;
    if (!collection) return [];
    var args = slice.call(arguments, 2),
        isFunc = typeof methodName == 'function',
        methodExists;
    var length = iteratee.length; index = -1;
    if (length === length >>> 0) {
        result = Array(length);
        while (++index < length) {
            methodExists = (isFunc ? methodName : iteratee[index][methodName]);
            methodExists && methodExists !== noop && (result[index] = methodExists.apply(iteratee[index], args));
        }
    }
    else {
        var skipProto = typeof iteratee == 'function' &&
          propertyIsEnumerable.call(iteratee, 'prototype');

        var props = _.keys(iteratee),
            propIndex = -1,
            length = props.length;

        result = Array(length);
        while (++propIndex < length) {
            index = props[propIndex];
            if (!(skipProto && index == 'prototype')) {
                methodExists = (isFunc ? methodName : iteratee[index][methodName]);
                methodExists && methodExists !== noop && (result[propIndex] = ((isFunc ? methodName : iteratee[index][methodName]).apply(iteratee[index], args)));
            }
        }
    }
    return result;
}

/**
 * Constructor used to beget objects that wire needs to create using new.
 * @param ctor {Function} real constructor to be invoked
 * @param args {Array} arguments to be supplied to ctor
 */
function DynamiclyCreated(ctor, args) {
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
export function instantiate(ctor, args, name) {
    DynamiclyCreated.prototype = ctor.prototype;
    DynamiclyCreated.prototype.constructor = ctor;
    var begotten = new DynamiclyCreated(ctor, args);
    DynamiclyCreated.prototype = void 0;
    return begotten;
}

/**
Flatten and filter arrays down to just the existing promises.

@method flattenToPromises 
@param {Array} Array to flatten, and filter.
@returns {Array of Promises} 
**/
export function flattenToPromises(array: any[]): Promise[] {
    return _.flatten(array).filter(function (x) {
        return when.isPromise(x);
    })
}
//#endregion
//#region object
/**
Inverts an object.  The keys become values, and the values become keys.
Does not do any copying.

@method invert
@param {Object} obj The object to invert.
@returns {Object} The inverted object.
**/

var hasOwn = Object.prototype.hasOwnProperty;
export function invert(obj: any): any {
    var result = {};
    for (var i in obj)
        if (hasOwn.call(obj, i))
            result[obj[i]] = i;
    return result;
}
//#endregion
//#region type
/**
Checks is the object is array like, like the aruguments object, but not a string, oe array.
jQuery objects for example would report as array like.
As well as knockout observable arrays report as array like.

@method isArrayLike
@param {Object} o The object to check
@returns {Boolean} Is it true or false.
**/
export function isArrayLike(o) {
    return (o && !_.isString(o) && o.length !== undefined) || false;
}

/**
Checks if the given object is array or array like.

@method isArrayOrArrayLike
@param {Object} o The object to check
@returns {Boolean} Is it true or false.
**/
export function isArrayOrArrayLike(o) {
    return _.isArray(o) || (isArrayLike(o));
}
//#endregion
//#region uuid
var guidRegex = /^(\{{0,1}([0-9a-fA-F]){8}-([0-9a-fA-F]){4}-([0-9a-fA-F]){4}-([0-9a-fA-F]){4}-([0-9a-fA-F]){12}\}{0,1})$/,
    emtptyGuid = '00000000-0000-0000-0000-000000000000';

/**
Returns a new sudo guid, limiations in JavaScript make must more reliable guids fairly difficult to create.

@for thrust.util
@method newGuid
@returns {Guid} The new guid.
**/
export function newGuid() { return uuid.v4() }
/**
Returns an empty guid.

@method emptyGuid
@returns {Guid} The emtpty guid.
**/
export function emptyGuid() { return emtptyGuid }
/**
Checks if the given string is a guid.

@method isGuid
@param {Guid} guid
@returns {Boolean} If the guid is a guid or not.
**/
export function isGuid(guid) {
    return _.isString(guid) ? guidRegex.test(guid) : false;
}
/**
Checks if the Guid is an Empty Guid

@method isEmptyGuid
@param {Guid} guid
@returns {Boolean} If the guid is a guid or not.
**/
export function isEmptyGuid(guid) { return guid === emtptyGuid; }
//#endregion
//#region string
var objectCurlyRegex = /\{\{|\}\}|\{(.*?)\}/g,
    numberCurlyRegex = /\{\{|\}\}|\{(\d+)\}/g;

/**
C# style string format.

@for thrust.util
@method format
**/
export function format(str, ...formatArgs: any[]): string {
    if (typeof formatArgs[0] === 'object') {
        var a = formatArgs[0];
        return str.replace(objectCurlyRegex, function (m, n) {
            if (m == '{{') { return '{'; }
            if (m == '}}') { return '}'; }
            return a && a[n] || '';
        });
    }
    return str.replace(numberCurlyRegex, function (m, n) {
        if (m == '{{') { return '{'; }
        if (m == '}}') { return '}'; }
        return formatArgs[n] || '';
    });
}

export function getModuleNameForPath(name: string): string { return (name.lastIndexOf('/') > -1 ? name.substring(name.lastIndexOf('/') + 1) : name).replace(/\./g, '-'); }
//#endregion
//#region url
var doubleSlashRegex = /\/\//g,
    r20 = /%20/g,
    rbracket = /\[\]$/;

/**
jQuery param method to encode form parameters.

@for thrust.util.url
@method param
**/
export function param(a: Object, traditional: bool) {
    var prefix,
        s = [],
        add = function (key, value) {
            // If value is a function, invoke it and return its value
            value = _.isFunction(value) ? value() : (value == null ? "" : value);
            s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value);
        };

    // Set traditional to true for jQuery <= 1.3.2 behavior.
    /*if (traditional === undefined)
    {
        // TODO Support for traditionalEncoding
        //traditional = !!m.config().traditionalEncoding;
    }*/

    // If an array was passed in, assume that it is an array of form elements.
    if (isArrayOrArrayLike(a)) {
        // Serialize the form elements
        _.each(a, function (x) {
            add(x.name, x.value);
        });
    }
    else {
        // If traditional, encode the "old" way (the way 1.3.2 or older
        // did it), otherwise encode params recursively.
        for (prefix in a) {
            buildParams(prefix, a[prefix], traditional, add);
        }
    }

    // Return the resulting serialization
    return s.join("&").replace(r20, "+");
}

function buildParams(prefix, obj: Object, traditional, add) {
    if (_.isArray(obj)) {
        // Serialize array item.
        _.each(obj, function (i, v) {
            if (traditional || rbracket.test(prefix)) {
                // Treat each array item as a scalar.
                add(prefix, v);

            }
            else {
                // If array item is non-scalar (array or object), encode its
                // numeric index to resolve deserialization ambiguity issues.
                // Note that rack (as of 1.0.0) can't currently deserialize
                // nested arrays properly, and attempting to do so may cause
                // a server error. Possible fixes are to modify rack's
                // deserialization algorithm or to provide an option or flag
                // to force array serialization to be shallow.
                buildParams(prefix + "[" + (typeof v === "object" || _.isArray(v) ? i : "") + "]", v, traditional, add);
            }
        });

    }
    else if (!traditional && obj != null && typeof obj === "object") {
        // Serialize object item.
        for (var name in obj) {
            buildParams(prefix + "[" + name + "]", obj[name], traditional, add);
        }

    } else {
        // Serialize scalar item.
        add(prefix, obj);
    }
}
/**
Cleans up double slashs in a url, used by thrust/data

@method cleanUrl
@param {String} url The url to clean
@retrusn {String} The cleaned url
**/
export function cleanUrl(url: string): string { return url.replace(doubleSlashRegex, '/'); }

/**
Checks for existance of application path in the url, or http if the url is supposed to go to another location.

@method fixupUrl
@param {String} url The url to fixup
@retrusn {String} The fixed url
**/
export function fixupUrl(url: string, urlPath?: string): string {
    if (url.indexOf('http') === -1) {
        var path = urlPath.lastIndexOf('/') === urlPath.length - 1 ? urlPath.substring(0, -1) : urlPath;
        if (url.indexOf(path) === -1) {
            url = path + url;
        }
        url = cleanUrl(url);
    }
    return url;
}
//#endregion
//#region when
import w = module('when');
//import w = module('when/debug');
import whenApply = module('when/apply');
import whenDelay = module('when/delay');
import whenTimeout = module('when/timeout');
import whenParallel = module('when/parallel');
import whenPipeline = module('when/pipeline');
import whenSequence = module('when/sequence');
import whenCancelable = module('when/cancelable');

/**
@module thrust.util
@submodule thrust.util.when
**/
export module when {
    export var when = w;
    /**
	when.apply, used to apply when results over a function, similar to jQuerys Deferred.
	See for more information: [https://github.com/cujojs/when/wiki/when-apply](https://github.com/cujojs/when/wiki/when-apply)

	@for thrust.util.when
	@method when.apply
	**/
    export var apply = whenApply;
    /**
	when.delay, creates a promise that resolves in x ms, using setTimeout.
	See for more information: [https://github.com/cujojs/when/wiki/when-delay](https://github.com/cujojs/when/wiki/when-delay)

	@method when.delay
	**/
    export var delay = whenDelay;
    /**
	when.timeout, creates a promise that will timeout if x ms if not resolved.
	See for more information: [https://github.com/cujojs/when/wiki/when-timeout](https://github.com/cujojs/when/wiki/when-timeout)

	@method when.timeout
	**/
    export var timeout = whenTimeout;

    /**
	when.parallel
	See for more information: [https://github.com/cujojs/when/wiki/when-parallel](https://github.com/cujojs/when/wiki/when-parallel)

	@method when.parallel
	**/
    export var parallel = whenParallel;

    /**
	when.pipeline
	See for more information: [https://github.com/cujojs/when/wiki/when-pipeline](https://github.com/cujojs/when/wiki/when-pipeline)

	@method when.pipeline
	**/
    export var pipeline = whenPipeline;

    /**
	when.sequence
	See for more information: [https://github.com/cujojs/when/wiki/when-sequence](https://github.com/cujojs/when/wiki/when-sequence)

	@method when.sequence
	**/
    export var sequence = whenSequence;

    /**
	when.cancelable
	See for more information: [https://github.com/cujojs/when/wiki/when-cancelable](https://github.com/cujojs/when/wiki/when-cancelable)

	@method when.cancelable
	**/
    export var cancelable = whenCancelable;

    export var all = when.all;
    export var any = when.any;
    export var chain = when.chain;
    export var defer = when.defer;
    export var isPromise = when.isPromise;
    export var map = when.map;
    export var reduce = when.reduce;
    export var some = when.some;
    export var resolve = when.resolve;
    export var reject = when.reject;
    export var join = when.join;
}
//#endregion
//#region camelCase
var rmsPrefix = /^-ms-/,
    rdashAlpha = /-([\da-z])/gi,
    fcamelCase = function (all, letter) {
        return (letter + "").toUpperCase();
    };

export function camelCase(string) {
    return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase);
}
export function unCamelCase(str) {
    return str.replace(/([A-Z])/g, function (all, s) { return '-' + s.toLowerCase(); });
}
//#endregion