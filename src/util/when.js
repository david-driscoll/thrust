define(['when/debug', 'when/apply', 'when/delay', 'when/timeout', 'thrust/util/array'],
function (when, apply, delay, timeout, util)
{
    /**
    @module thrust.util
    @submodule thrust.util.when
    **/

    var whenWrapper = function ()
    {
        return when.apply(when, arguments);
    };

    /**
    when.apply, used to apply when results over a function, similar to jQuerys Deferred.
    See for more information: [https://github.com/cujojs/when/wiki/when-apply](https://github.com/cujojs/when/wiki/when-apply)

    @for thrust.util.when
    @method when.apply
    **/
    whenWrapper.apply = apply,
    /**
    when.delay, creates a promise that resolves in x ms, using setTimeout.
    See for more information: [https://github.com/cujojs/when/wiki/when-delay](https://github.com/cujojs/when/wiki/when-delay)

    @method when.delay
    **/
    whenWrapper.delay = delay;
    /**
    when.timeout, creates a promise that will timeout if x ms if not resolved.
    See for more information: [https://github.com/cujojs/when/wiki/when-timeout](https://github.com/cujojs/when/wiki/when-timeout)

    @method when.timeout
    **/
    whenWrapper.timeout = timeout;

    whenWrapper.all = when.all;
    whenWrapper.any = when.any;
    whenWrapper.all = when.all;
    whenWrapper.any = when.any;
    whenWrapper.chain = when.chain;
    whenWrapper.defer = when.defer;
    whenWrapper.isPromise = when.isPromise;
    whenWrapper.map = when.map;
    whenWrapper.reduce = when.reduce;
    whenWrapper.some = when.some;
    whenWrapper.resolve = when.resolve;
    whenWrapper.reject = when.reject;

    return {
        /**
        Access to whenjs, the main library for promises.

        @method when
        **/
        when: whenWrapper,
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