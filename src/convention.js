define([
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