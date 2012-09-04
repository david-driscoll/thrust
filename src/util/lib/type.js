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
define(['thrust/util/collection'],
function (uCollection)
{
    'use strict';
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