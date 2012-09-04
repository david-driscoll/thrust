define(['when/debug', 'when/apply', 'when/delay', 'when/timeout', 'thrust/util/array'],
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