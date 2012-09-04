define(['lodash', './lib/type'],
function (_, type)
{
    'use strict';
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
