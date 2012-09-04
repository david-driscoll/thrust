/// <reference path="collection.js" />
define(['lodash'], function (_)
{
    'use strict';
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