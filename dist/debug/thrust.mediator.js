/*! thrust-js - v0.1.0 - 2013-01-01 */
define('thrust/mediator/config',["require", "exports"], function(require, exports) {
    /// <reference path="../../../lib/DefinitelyTyped/requirejs/require-2.1.d.ts" />
    // Disabled until TS supports module per file in some way (ie exports is exports.<export> not  exports.moduleName.<export>)
    /*export module instance {*/
    
    /**
    Provides thrust configuration
    
    @module thrust.mediator
    @submodule thrust.mediator.config
    **/
    /**
    Resolves the given properties when creating an instance of the plugin.
    
    This is for internal thrust use.  Thrust uses this array to generate the properties that need to be handed
    to the plugin constructor method.
    
    @for thrust.mediator.config
    @private
    @property resolve
    @readOnly
    @type {Array}
    **/
    exports.resolve = [
        'name', 
        'cfg'
    ];
    /**
    The set of conventions to load into thrust/mediator.
    
    @property conventions
    @readOnly
    @type {Array}
    **/
    exports.conventions = [
        'thrust/mediator/convention/container', 
        'thrust/mediator/convention/subscription', 
        'thrust/mediator/convention/autostart', 
        'thrust/mediator/convention/dependent.modules'
    ];
})
//@ sourceMappingURL=config.js.map
;
define('thrust/mediator/main',["require", "exports", 'thrust/util', 'thrust/log', 'thrust/events', 'thrust/facade', 'has', 'thrust/config', './config'], function(require, exports, __util__, __log__, __events__, __facade__, __has__, __config__, __mediatorConfig__) {
    /// <reference path="../../has.d.ts" />
    /// <reference path="../interfaces/mediator/mediator.facade.d.ts" />
    /// <reference path="../../../lib/DefinitelyTyped/requirejs/require-2.1.d.ts" />
    // Disabled until TS supports module per file in some way (ie exports is exports.<export> not  exports.moduleName.<export>)
    /*export module instance {*/
    
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
            true && log.debug(format('Mediator: Creating new Mediator {0}', name));
            that.initEvents();
            that.subscribe('thrust/ready', function () {
                true && log.info('Mediator: Ready!');
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
;
define('thrust/mediator', ['thrust/mediator/main'], function (main) { return main; });

define('thrust/mediator/convention/autostart',["require", "exports", 'thrust/convention'], function(require, exports, __c__) {
    /// <reference path="../../interfaces/convention.d.ts" />
    /// <reference path="../../../../lib/DefinitelyTyped/requirejs/require-2.1.d.ts" />
    // Disabled until TS supports module per file in some way (ie exports is exports.<export> not  exports.moduleName.<export>)
    /*export module instance {*/
    
    var c = __c__;

    var Convention = c.Convention;
    /**
    @module thrust.mediator
    @submodule thrust.mediator.convention
    **/
    /**
    * # __thrust/mediator__ Convention - Auto Start
    *
    * The auto start property allows for a module, to be automatically started once it is
    * included into a thrust instnace, without having to explicity call start on the module.
    *
    *
    * This is useful for certian types of modules, usually persistant ones that always need to load regardless.
    * For example a navigation module, or user settings module.
    *
    * @for thrust.mediator.convention
    * @property autoStart
    **/
    var methods = {
        properties: [
            'autoStart'
        ]
    };
    exports.autostart = new Convention(methods);
})
//@ sourceMappingURL=autostart.js.map
;
define('thrust/mediator/convention/container',["require", "exports", 'thrust/convention', 'thrust/util'], function(require, exports, __c__, __util__) {
    /// <reference path="../../interfaces/mediator/mediator.facade.d.ts" />
    /// <reference path="../../interfaces/facade.d.ts" />
    /// <reference path="../../interfaces/convention.d.ts" />
    /// <reference path="../../../../lib/DefinitelyTyped/requirejs/require-2.1.d.ts" />
    // Disabled until TS supports module per file in some way (ie exports is exports.<export> not  exports.moduleName.<export>)
    /*export module instance {*/
    
    var c = __c__;

    var Convention = c.Convention;
    var util = __util__;

    var _ = util._;
    /**
    @module thrust.mediator
    @submodule thrust.mediator.convention
    **/
        var event = {
anyContainer: 'thrust/mediator/convention/container/any',
changeContainer: 'thrust/mediator/convention/container/change'    }, any = _.any, bind = _.bind, CONTAINER = 'container', START = 'start-status', defer = _.defer;
    var methods = {
        properties: [
            CONTAINER
        ],
        change: function (mod, container) {
            var containerValue = mod.convention(CONTAINER);
            if(containerValue && container && containerValue === container) {
                if(mod.convention(START)) {
                    defer(bind(mod.stop, mod));
                }
            }
        },
        start: function (facade, mod) {
            var that = this, containerValue = mod.convention(CONTAINER);
            if(containerValue) {
                facade.fire(event.changeContainer, containerValue);
                // Facade subscriptions get unsubscribed when stopping a module, so we need to resubscribe every time here.
                // This is probably better, as the events will be less chatty.
                facade.subscribe(event.changeContainer, bind(that.change, that, mod));
            }
            return undefined;
        },
        stop: function (facade, mod) {
            return undefined;
        }
    };
    exports.container = new Convention(methods);
})
//@ sourceMappingURL=container.js.map
;
define('thrust/mediator/convention/dependent.modules',["require", "exports", 'thrust/convention', 'thrust/util'], function(require, exports, __c__, __util__) {
    /// <reference path="../../interfaces/mediator/mediator.facade.d.ts" />
    /// <reference path="../../interfaces/convention.d.ts" />
    /// <reference path="../../../../lib/DefinitelyTyped/requirejs/require-2.1.d.ts" />
    // Disabled until TS supports module per file in some way (ie exports is exports.<export> not  exports.moduleName.<export>)
    /*export module instance {*/
    
    var c = __c__;

    var Convention = c.Convention;
    var util = __util__;

    var _ = util._;
    /**
    @module thrust.mediator
    @submodule thrust.mediator.convention
    **/
        var any = _.any, map = _.map, DMODULES = 'dependentModules', CMODULES = 'childModules', START = 'start-status', defer = _.defer, bind = _.bind;
    var invokedependentModules = function (module, method) {
        var requiredModules = module.convention(DMODULES);
        if(requiredModules) {
            return module.thrust[method](requiredModules);
        }
    };
    var invokeChildModules = function (module, method) {
        var requiredModules = module.convention(CMODULES);
        if(requiredModules) {
            return module.thrust[method](requiredModules);
        }
    };
    var methods = {
        properties: [
            DMODULES, 
            CMODULES
        ],
        start: function (facade, mod) {
            return util.when.all(util.flattenToPromises([
                invokedependentModules(mod, 'start'), 
                invokeChildModules(mod, 'start')
            ]));
        },
        ready: function (facade, mod) {
            if(!mod.thrust.started) {
                return util.when.all(util.flattenToPromises([
                    invokedependentModules(mod, 'ready'), 
                    invokeChildModules(mod, 'ready')
                ]));
            }
        },
        stop: function (facade, mod) {
            return invokeChildModules(mod, 'stop');
        },
        destroy: function (facade, mod) {
            return invokeChildModules(mod, 'destroy');
        }
    };
    exports.dependentModules = new Convention(methods);
})
//@ sourceMappingURL=dependent.modules.js.map
;
define('thrust/mediator/convention/subscription',["require", "exports", 'thrust/convention', 'thrust/util'], function(require, exports, __c__, __util__) {
    /// <reference path="../../interfaces/mediator/mediator.facade.d.ts" />
    /// <reference path="../../interfaces/convention.d.ts" />
    /// <reference path="../../../../lib/DefinitelyTyped/requirejs/require-2.1.d.ts" />
    // Disabled until TS supports module per file in some way (ie exports is exports.<export> not  exports.moduleName.<export>)
    /*export module instance {*/
    
    var c = __c__;

    var Convention = c.Convention;
    var util = __util__;

    var _ = util._;
    /**
    The facade convention, creates the mediator facade for each module.
    
    @module thrust.mediator
    @submodule thrust.mediator.convention
    **/
        var SUBSCRIPTIONS = 'subscriptions', isFunction = _.isFunction, isString = _.isString, isArray = _.isArray;
    var methods = {
        properties: [
            SUBSCRIPTIONS
        ],
        start: function (facade, mod) {
            var subscriptions = mod.convention(SUBSCRIPTIONS);
            if(subscriptions && !subscriptions._subscriptionsSet) {
                var moduleInstance = mod.instance;
                for(var subscription in subscriptions) {
                    var definition = subscriptions[subscription];
                    if(isFunction(definition)) {
                        definition = [
                            subscription, 
                            definition, 
                            moduleInstance
                        ];
                    } else {
                        if(isString(definition)) {
                            definition = [
                                subscription, 
                                moduleInstance[definition], 
                                moduleInstance
                            ];
                        } else {
                            if(isArray(definition)) {
                                if(isString(definition[0])) {
                                    definition[0] = moduleInstance[definition[0]];
                                }
                                definition.unshift(subscription);
                            }
                        }
                    }
                    facade.subscribe.apply(facade, definition);
                }
                mod.convention(SUBSCRIPTIONS)._subscriptionsSet = true;
            }
            return null;
        },
        stop: function (facade, mod) {
            var subscriptions = mod.convention(SUBSCRIPTIONS);
            if(subscriptions && subscriptions._subscriptionsSet) {
                mod.convention(SUBSCRIPTIONS)._subscriptionsSet = false;
            }
            return null;
        }
    };
    exports.subscription = new Convention(methods);
})
//@ sourceMappingURL=subscription.js.map
;