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
define(['thrust/util/collection', 'thrust/util/type', 'module'],
function (uCollection, uType, module)
{
    'use strict';
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