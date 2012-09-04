define([
    'thrust/util', 'thrust/log', 'thrust/events', 'thrust/facade', 'has'
],
function (util, log, Events, facade, has)
{
    'use strict';
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
        has('DEBUG') && log.debug(format('Mediator: Creating new Mediator {0}', name));

        that.initEvents();

        that.subscribe('thrust/ready', function ()
        {
            has('DEBUG') && log.info('Mediator: Ready!');
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
