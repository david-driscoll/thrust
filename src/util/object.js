define(['lodash'], function (_)
{
    'use strict';
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