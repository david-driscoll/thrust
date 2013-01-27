define(["require", "exports", 'thrust/util', 'thrust/log', 'thrust/events', 'thrust/facade', 'has', 'thrust/config', './config'], function(require, exports, __util__, __log__, __events__, __facade__, __has__, __config__, __mediatorConfig__) {
    'use strict';
    var util = __util__;

    var _ = util._;
    var log = __log__;

    var events = __events__;

    var Events = events.Events;
    var facade = __facade__;

    var has = __has__;

    var config = __config__;

    var mediatorConfig = __mediatorConfig__;

    exports.className = 'Mediator';
    var format = util.format, extend = _.extend, type = util.type, when = util.when, memoize = _.memoize, mediator, slice = Array.prototype.slice;
    var c = config;
    var MediatorFacade = (function () {
        var mediatorFacade = facade.createFacade(function (module, parent) {
            this.name = module.name;
            this.module = module;
            this.parent = parent;
            this.__conventions = parent.__conventions;
            this._callbacks = parent._callbacks;
            this.initEvents(module);
        });
        _.extend(mediatorFacade.prototype, Events);
        mediatorFacade.prototype.init = function (m) {
            if(!this._internalSubscriptions) {
                this._internalSubscriptions = [];
            }
            return null;
        };
        mediatorFacade.prototype.start = mediatorFacade.prototype.init;
        (mediatorFacade).prototype.subscribe = function (events, callback, context) {
            this._internalSubscriptions.push({
                events: events,
                callback: callback,
                context: context
            });
            Events.subscribe.call(this, events, callback, context);
        };
        mediatorFacade.prototype.stop = function (m) {
            if(this._internalSubscriptions) {
                for(var i = this._internalSubscriptions.length - 1; i >= 0; i--) {
                    var sub = this._internalSubscriptions[i];
                    this.unsubscribe(sub.events, sub.callback, sub.context);
                }
                this._internalSubscriptions = null;
            }
            return null;
        };
        return mediatorFacade;
    })();
    var Mediator = (function () {
        function Mediator(name, config) {
            var that = this, appPath = config && config.url && config.url.path;
            that.name = name;
            has('DEBUG') && log.debug(format('Mediator: Creating new Mediator {0}', name));
            that.initEvents();
            that.subscribe('thrust/ready', function () {
                has('DEBUG') && log.info('Mediator: Ready!');
            });
        }
        Mediator.prototype.initEvents = function () {
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
            if(facades.mediator && !(facades.mediator instanceof MediatorFacade)) {
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
    _.extend(Mediator.prototype, Events);
})
//@ sourceMappingURL=main.js.map
