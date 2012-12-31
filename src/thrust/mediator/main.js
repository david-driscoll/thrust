define(["require", "exports", 'thrust/util', 'thrust/log', 'thrust/events', 'thrust/facade', 'has', 'thrust/config', './config'], function(require, exports, __util__, __log__, __events__, __facade__, __has__, __config__, __mediatorConfig__) {
    /// <reference path="../../has.d.ts" />
    /// <reference path="../interfaces/mediator/mediator.facade.d.ts" />
    /// <reference path="../../lib/DefinitelyTyped/requirejs/require-2.1.d.ts" />
    // Disabled until TS supports module per file in some way (ie exports is exports.<export> not  exports.moduleName.<export>)
    /*export module instance {*/
    'use strict';
    var util = __util__;

    var _ = util._;
    var log = __log__;

    //import events = module('thrust/events');
    var events = __events__;

    var Events = events.Events;
    var facade = __facade__;

    var has = __has__;

    var config = __config__;

    var mediatorConfig = __mediatorConfig__;

    exports.className = 'Mediator';
    // Variable declaration.
        var format = util.format, extend = // string format method
    _.extend, type = // object extension method
    util.type, when = // object type method
    util.when, memoize = _.memoize, mediator, slice = Array.prototype.slice;
    var c = config;
    //#region Facade
    /**
    Creates a new mediator facade for the given module.
    
    @for thrust.mediator
    @class thrust.mediator.MediatorFacade
    @constructor
    @param {thrust.Module} module The module to create the facade for
    @param {thrust.Mediator} parent The parent mediator to create the facade on.
    **/
    var MediatorFacade = (function () {
        var mediatorFacade = facade.createFacade(function (module, parent) {
            this.name = module.name;
            this.module = module;
            this.parent = parent;
            this.__conventions = parent.__conventions;
            this._callbacks = parent._callbacks;
            this.initEvents();
        });
        _.extend(mediatorFacade.prototype, Events);
        /**
        During the start of a mediator facade, start creates the internal subscriptions array.
        
        @for thrust.mediator.MediatorFacade
        @method start
        **/
        mediatorFacade.prototype.init = function (m) {
            if(!this._internalSubscriptions) {
                this._internalSubscriptions = [];
            }
            return null;
        };
        mediatorFacade.prototype.start = mediatorFacade.prototype.init;
        /**
        Overrides the subscribe method, and tracks the any event that is bound.
        
        @for thrust.mediator.MediatorFacade
        @method subscribe
        **/
        (mediatorFacade).prototype.subscribe = function (events, callback, context) {
            this._internalSubscriptions.push({
                events: events,
                callback: callback,
                context: context
            });
            Events.subscribe.call(this, events, callback, context);
        };
        /**
        Unsubscribes from all events that were subscribed to.
        
        @for thrust.mediator.MediatorFacade
        @method stop
        **/
        mediatorFacade.prototype.stop = function (m) {
            if(this._internalSubscriptions) {
                for(var i = this._internalSubscriptions.length - 1; i >= 0; i--) {
                    var sub = this._internalSubscriptions[i];
                    this.unsubscribe(sub.events, sub.callback, sub.context);
                }
                delete this._internalSubscriptions;
            }
            return null;
        };
        return mediatorFacade;
    })();
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
    var Mediator = (function () {
        //#endregion
        function Mediator(name, config) {
            var that = this, appPath = config && config.url && config.url.path;
            that.name = name;
            has('DEBUG') && log.debug(format('Mediator: Creating new Mediator {0}', name));
            that.initEvents();
            that.subscribe('thrust/ready', function () {
                has('DEBUG') && log.info('Mediator: Ready!');
            });
        }
        Mediator.prototype.initEvents = //#region Events
        function () {
        };
        Mediator.prototype.extend = function (to, init) {
            return null;
        };
        Mediator.prototype.subscribe = function (events, callback, context, once) {
        };
        Mediator.prototype.unsubscribe = function (events, callback, context) {
        };
        Mediator.prototype.once = function (events, callback, context) {
        };
        Mediator.prototype.createFacade = function (thrust, mod, facades) {
            if((mod).mediator && !(facades.mediator instanceof MediatorFacade)) {
                throw new Error('"mediator" is a reserved property');
            }
            var mediator;
            if(facades.mediator) {
                facades.mediator.updateFacade(mod, this);
                mediator = facades.mediator;
            } else {
                mediator = facades.mediator = (mod).mediator = new MediatorFacade(mod, this);
            }
            return mediator;
        };
        Mediator.config = mediatorConfig;
        return Mediator;
    })();
    exports.Mediator = Mediator;    
    // Get the actual event methods onto the Mediator
    _.extend(Mediator.prototype, Events);
})
//@ sourceMappingURL=main.js.map
