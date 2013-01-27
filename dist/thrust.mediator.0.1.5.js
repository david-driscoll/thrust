/*! thrust-js - v0.1.5 - 2013-01-26 */
define('thrust/mediator/config',["require", "exports"], function(require, exports) {
    
    exports.resolve = [
        'name', 
        'cfg'
    ];
    exports.conventions = [
        'thrust/mediator/convention/subscription'
    ];
})
//@ sourceMappingURL=config.js.map
;
define('thrust/mediator/main',["require", "exports", 'thrust/util', 'thrust/log', 'thrust/events', 'thrust/facade', 'has', 'thrust/config', './config'], function(require, exports, __util__, __log__, __events__, __facade__, __has__, __config__, __mediatorConfig__) {
    
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
            false && log.debug(format('Mediator: Creating new Mediator {0}', name));
            that.initEvents();
            that.subscribe('thrust/ready', function () {
                false && log.info('Mediator: Ready!');
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
;
define('thrust/mediator', ['thrust/mediator/main'], function (main) { return main; });

define('thrust/mediator/convention/subscription',["require", "exports", 'thrust/convention', 'thrust/util'], function(require, exports, __c__, __util__) {
    
    var c = __c__;

    var Convention = c.Convention;
    var util = __util__;

    var _ = util._;
    var SUBSCRIPTIONS = 'config.mediator.subscriptions', isFunction = _.isFunction, isString = _.isString, isArray = _.isArray, isObject = _.isObject, isPlainObject = _.isPlainObject, forOwn = _.forOwn, each = _.each;
    var arrayShortHandArgsInOrder = [
        'handler', 
        'context'
    ];
    var methods = {
        properties: [
            SUBSCRIPTIONS
        ],
        start: function (mod, facade) {
            var subscriptions = mod.convention(SUBSCRIPTIONS);
            if(subscriptions && !(subscriptions)._subscriptionsSet) {
                var moduleInstance = mod.instance;
                forOwn(subscriptions, function (subscriptionCollection, subscriptionName) {
                    if(!isArray(subscriptionCollection)) {
                        subscriptionCollection = [
                            [
                                subscriptionCollection
                            ]
                        ];
                    } else {
                        if(subscriptionCollection.length && (!isArray(subscriptionCollection[0]) || isString(subscriptionCollection[0]))) {
                            subscriptionCollection = [
                                subscriptionCollection
                            ];
                        }
                    }
                    each(subscriptionCollection, function (subscription) {
                        if(isArray(subscription)) {
                            each(subscription, function (handlerObject, i) {
                                var newSubscription = [
                                    subscriptionName
                                ];
                                if(isString(handlerObject)) {
                                    newSubscription.push(mod.instance[handlerObject]);
                                    if(subscription[i + 1]) {
                                        newSubscription.push(subscription[i + 1]);
                                    }
                                } else {
                                    if(isFunction(handlerObject)) {
                                        newSubscription.push(handlerObject);
                                        if(subscription[i + 1]) {
                                            newSubscription.push(subscription[i + 1]);
                                        }
                                    } else {
                                        if(isPlainObject(handlerObject) && ('moduleHandler' in handlerObject || 'handler' in handlerObject)) {
                                            if('moduleHandler' in handlerObject) {
                                                newSubscription.push(mod.instance[handlerObject.moduleHandler]);
                                            }
                                            if('handler' in handlerObject) {
                                                if(isString(handlerObject)) {
                                                    newSubscription.push(mod.instance[handlerObject.handler]);
                                                } else {
                                                    newSubscription.push(handlerObject.handler);
                                                }
                                            }
                                            if('context' in handlerObject) {
                                                newSubscription.push(handlerObject.context);
                                            }
                                        }
                                    }
                                }
                                if(newSubscription.length > 1) {
                                    facade.subscribe.apply(facade, newSubscription);
                                }
                            });
                        }
                    });
                });
                mod.convention(SUBSCRIPTIONS)._subscriptionsSet = true;
            }
        },
        stop: function (mod, facade) {
            var subscriptions = mod.convention(SUBSCRIPTIONS);
            if(subscriptions && subscriptions._subscriptionsSet) {
                mod.convention(SUBSCRIPTIONS)._subscriptionsSet = false;
            }
        }
    };
    exports.subscription = new Convention(methods);
})
//@ sourceMappingURL=subscription.js.map
;