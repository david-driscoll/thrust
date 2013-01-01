/*! thrust-js - v0.1.0 - 2013-01-01 */
define('thrust/dom/jquery.interface',["require", "exports", 'jquery'], function(require, exports, __jQuery__) {
    var jQuery = __jQuery__;

    var jQueryMethodBlackList = [
'constructor', 
'init', 
'selector', 
'jquery', 
'ready', 
'extend', 
'queue', 
'dequeue', 
'clearQueue', 
'promise', 
'bind', 
'unbind', 
'live', 
'die', 
'delegate', 
'undelegate', 
'blur', 
'focus', 
'focusin', 
'focusout', 
'load', 
'resize', 
'scroll', 
'unload', 
'click', 
'dblclick', 
'mousedown', 
'mouseup', 
'mousemove', 
'mouseover', 
'mouseout', 
'mouseenter', 
'mouseleave', 
'change', 
'select', 
'submit', 
'keydown', 
'keypress', 
'keyup', 
'error', 
'domManip', 
'serialize', 
'serializeArray', 
'ajaxStart', 
'ajaxStop', 
'ajaxComplete', 
'ajaxError', 
'ajaxSuccess', 
'ajaxSend', 
'_toggle', 
'fadeTo', 
'stop', 
'slideDown', 
'slideUp', 
'slideToggle', 
'fadeIn', 
'fadeOut', 
'fadeToggle', 
'on', 
'off', 
'one'    ], slice = Array.prototype.slice;
    //#region jQuery Interface Layer
    function updatejQueryInternals(selector) {
        if(selector) {
            this._context = jQuery(selector);
        }
        this.context = this._context.context;
        this.selector = this._context.selector;
        for(var i = this.length || 0, iLen = this._context.context; i < iLen; i++) {
            delete this[i];
        }
        this.length = this._context.length;
        for(var i = 0, iLen = this.length; i < iLen; i++) {
            this[i] = this._context[i];
        }
    }
    exports.updatejQueryInternals = updatejQueryInternals;
    function initalizeContext(context) {
        this._context = context instanceof jQuery ? context : jQuery(context);
        updatejQueryInternals.call(this);
    }
    exports.initalizeContext = initalizeContext;
    function jQueryMethodWrap(method, DomFacade) {
        return function () {
            var args = slice.call(arguments);
            for(var i = 0, iLen = args.length; i < iLen; i++) {
                if(args[i] instanceof DomFacade) {
                    args[i] = args[i]._context;
                }
            }
            if(this._context) {
                var ret = this._context[method].apply(this._context, args);
                if(ret instanceof jQuery) {
                    if(ret.selector === this.selector && ret.context === this.context) {
                        updatejQueryInternals.call(this, ret);
                        return this;
                    }
                    return new DomFacade(this.module, this, ret, true);
                }
                updatejQueryInternals.call(this);
                return ret;
            }
        }
    }
    exports.jQueryMethodWrap = jQueryMethodWrap;
    function updateThrustDomPrototype(proto, DomFacade) {
        /*jshint loopfunc:true */
        for(var i in jQuery.fn) {
            if(Object.hasOwnProperty.call(jQuery.fn, i) && !proto[i] && !jQueryMethodBlackList.some(function (e, index) {
                return e === i;
            })) {
                proto[i] = jQueryMethodWrap(i, DomFacade);
            }
        }
        proto.$ = proto.find;
    }
    exports.updateThrustDomPrototype = updateThrustDomPrototype;
    //#endregion
    })
//@ sourceMappingURL=jquery.interface.js.map
;
define('thrust/dom/config',["require", "exports"], function(require, exports) {
    /// <reference path="../../../lib/DefinitelyTyped/requirejs/require-2.1.d.ts" />
    // Disabled until TS supports module per file in some way (ie exports is exports.<export> not  exports.moduleName.<export>)
    /*export module instance {*/
    
    /**
    Resolves the given properties when creating an instance of the plugin.
    
    This is for internal thrust use.  Thrust uses this array to generate the properties that need to be handed
    to the plugin constructor method.
    
    @for thrust.dom.config
    @private
    @property resolve
    @readOnly
    @type {Array}
    **/
    exports.resolve = [
        'name', 
        'mediator'
    ];
    /**
    The set of conventions to load into thrust/dom.
    
    @property conventions
    @readOnly
    @type {Array}
    **/
    exports.conventions = [
        'thrust/dom/convention/action', 
        'thrust/dom/convention/context', 
        'thrust/dom/convention/event'
    ];
})
//@ sourceMappingURL=config.js.map
;
define('thrust/dom/main',["require", "exports", 'thrust/util', 'thrust/log', './jquery.interface', 'thrust/facade', 'thrust/events', 'has', 'thrust/instance', './config'], function(require, exports, __util__, __log__, __jQueryInterface__, __facade__, __events__, __has__, __instance__, __config__) {
    /// <reference path="../interfaces/dom/dom.d.ts" />
    /// <reference path="../interfaces/module.d.ts" />
    /// <reference path="../interfaces/dom/dom.facade.d.ts" />
    /// <reference path="../interfaces/mediator/mediator.d.ts" />
    /// <reference path="../interfaces/facade.d.ts" />
    /// <reference path="../../../lib/DefinitelyTyped/requirejs/require-2.1.d.ts" />
    // Disabled until TS supports module per file in some way (ie exports is exports.<export> not  exports.moduleName.<export>)
    /*export module instance {*/
    
    
    var util = __util__;

    var _ = util._;
    var log = __log__;

    var jQueryInterface = __jQueryInterface__;

    var facade = __facade__;

    var events = __events__;

    var Events = events.Events;
    var has = __has__;

    var instance = __instance__;

    var config = __config__;

    exports.className = 'Dom';
    //#region Variable declaration
        var format = util.format, extend = _.extend, bind = _.bind, hasOwn = Object.prototype.hasOwnProperty, isObject = _.isObject, slice = Array.prototype.slice, when = util.when, isArray = _.isArray, initalizeContext = jQueryInterface.initalizeContext, updatejQueryInternals = jQueryInterface.updatejQueryInternals, updateThrustDomPrototype = jQueryInterface.updateThrustDomPrototype, GLOBAL = '.global';
    //#endregion
    var createFacade = function (dom) {
        if(!dom.query) {
            dom.query = bind(function (context) {
                if(typeof context !== 'undefined') {
                    return new DomFacade(dom.module, dom, context, true);
                }
                return dom;
            }, dom);
        }
        return dom.query;
    };
    var normalizeEvents = function (events, namespace) {
        if(isObject(events)) {
            for(var key in events) {
                events[key + namespace] = events[key];
                delete events[key];
            }
            return events;
        } else {
            if(!events) {
                return namespace;
            }
            events = events.split(' ');
            for(var i = 0, iLen = events.length; i < iLen; i++) {
                events.push(events[i] + namespace);
            }
            return events.slice(events.length / 2).join(' ');
        }
    };
    //#region DomFacade
    var DomFacade = (function () {
        var domFacade = facade.createFacade(function (module, parent, context, fake) {
            this.name = parent.name;
            //this.module = module;
            //this.parent = parent;
            this.__conventions = parent.__conventions;
            this.namespace = parent.namespace;
            //this._callbacks = parent._callbacks;
            //this.initEvents();
            // We're building a dom selector, aka jquery wrapper
            if(context && fake) {
                // Reference the parent module.
                this._parentDom = parent._parentDom;
                if(this._parentDom) {
                    // Init the context
                    initalizeContext.call(this, context);
                }
            } else {
                false && log.debug('Dom: Creating new Dom facade');
                this._parentDom = this;
                this._rootContext = true;
                this.changeContext(document);
                createFacade(this);
                this._internalEvents = [];
            }
        });
        domFacade.prototype.init = function (fake) {
            this._internalEvents = this._internalEvents || [];
            false && log.debug(format('Dom[{0}]: Initalizing {1}Dom facade', this.namespace, fake ? 'fake ' : ''));
            return this;
        };
        domFacade.prototype.start = function (m) {
            false && log.debug(format('Dom[{0}]: Starting Dom facade', this.namespace));
            return null;
        };
        domFacade.prototype.stop = function (m) {
            false && log.debug(format('Dom[{0}]: Stopping Dom facade', this.namespace));
            for(var i = this._internalEvents.length - 1; i >= 0; i--) {
                var sub = this._internalEvents[i];
                this._internalEvents.splice(i, 1);
                this.changeContext(sub.context);
                this.off.apply(this, (isArray(sub)) ? sub : (isArray(sub.args)) ? sub.args : []);
            }
            return null;
        };
        domFacade.prototype.destroy = function (m) {
            if(this._rootContext) {
                false && log.debug(format('Dom[{0}]: Destroying Dom facade', this.namespace));
                delete this._internalEvents;
            }
            this._context = null;
            delete this._context;
            return null;
        };
        return domFacade;
    })();
    //#endregion
    var updatedDomPrototype = {
        changeContext: function (selector) {
            false && log.info(format('Dom[{0}]: Changing Dom context', this.namespace || GLOBAL));
            updatejQueryInternals.call(this, selector);
            return this;
        },
        on: function (events) {
            false && log.debug(format('Dom[{0}]: Binding events...', this.namespace || GLOBAL));
            var args = slice.call(arguments);
            args[0] = normalizeEvents(events, this.namespace || GLOBAL);
            this._context.on.apply(this._context, args);
            return this;
        },
        one: function (events) {
            false && log.debug(format('Dom[{0}]: Binding one events...', this.namespace || GLOBAL));
            var args = slice.call(arguments);
            args[0] = normalizeEvents(events, this.namespace || GLOBAL);
            this._context.one.apply(this._context, args);
            return this;
        },
        off: function (events) {
            false && log.debug(format('Dom[{0}]: Unbinding events...', this.namespace || GLOBAL));
            var args = slice.call(arguments);
            args[0] = normalizeEvents(events, this.namespace || GLOBAL);
            this._context.on.apply(this._context, args);
            return this;
        }
    };
    updateThrustDomPrototype(updatedDomPrototype, DomFacade);
    extend(DomFacade.prototype, updatedDomPrototype);
    DomFacade.prototype.$ = DomFacade.prototype.find;
    //#region Dom
    var UntypedDom = (function () {
        //#endregion
        function UntypedDom(name, mediator) {
            if(!name) {
                throw new Error('Dom: module name must be defined.');
            }
            false && log.debug('Data: Creating new Data');
            this.mediator = mediator;
            this._callbacks = (mediator)._callbacks;
            this.initEvents();
            this.name = name;
            var that = this;
            instance.fetchInstance(name).promise.then(function (thrust) {
                var mod = {
                }, facade = that.createFacade(thrust, mod, {
                });
                var aThat = that;
                aThat.query = aThat.$ = aThat.find = mod.$;
            });
        }
        UntypedDom.prototype.initEvents = //#region Events
        function () {
        };
        UntypedDom.prototype.extend = function (to, init) {
            return null;
        };
        UntypedDom.prototype.subscribe = function (events, callback, context, once) {
        };
        UntypedDom.prototype.unsubscribe = function (events, callback, context) {
        };
        UntypedDom.prototype.once = function (events, callback, context) {
        };
        UntypedDom.config = config;
        UntypedDom.prototype.createFacade = function (thrust, mod, facades) {
            if(mod.dom && !(facades.dom instanceof DomFacade)) {
                throw new Error('"dom" is a reserved property');
            }
            var dom;
            if(facades.dom) {
                facades.dom.updateFacade(mod, this, document);
                dom = facades.dom;
            } else {
                dom = facades.dom = new DomFacade(mod, this, document);
                mod.dom = mod.$ = dom.query;
                mod.dom.$ = mod.dom.find = function (selector) {
                    return dom.find(selector);
                };
            }
            return dom;
        };
        return UntypedDom;
    })();    
    var _dom = UntypedDom;
    extend(_dom.prototype, updatedDomPrototype, Events);
    exports.Dom = _dom;
    //#endregion
    })
//@ sourceMappingURL=main.js.map
;
define('thrust/dom', ['thrust/dom/main'], function (main) { return main; });

define('thrust/dom/convention/action',["require", "exports", 'thrust/convention', 'thrust/util', 'jquery'], function(require, exports, __c__, __util__, __$__) {
    /// <reference path="../../interfaces/dom/dom.facade.d.ts" />
    /// <reference path="../../interfaces/convention.d.ts" />
    /// <reference path="../../../../lib/DefinitelyTyped/requirejs/require-2.1.d.ts" />
    // Disabled until TS supports module per file in some way (ie exports is exports.<export> not  exports.moduleName.<export>)
    /*export module instance {*/
    
    var c = __c__;

    var Convention = c.Convention;
    var util = __util__;

    var _ = util._;
    var $ = __$__;

    var format = util.format, ACTIONS = 'actions', STRING = 'string', REGISTRATIONS = '_registrations', isFunction = _.isFunction, isString = _.isString, isArray = _.isArray;
    var ActionHandler = (function () {
        function ActionHandler() {
            this.events = {
            };
        }
        ActionHandler.prototype.register = function (eventName, actionName, handler, context) {
            var events = this.events;
            if(!events[eventName]) {
                events[eventName] = {
                };
            }
            if(!events[eventName][actionName]) {
                events[eventName][actionName] = handler;
                if(context) {
                    events[eventName][actionName].context = context;
                }
            } else {
                throw new Error(format('The action {1} handler "{0}" has already been taken!', actionName, eventName));
            }
        };
        ActionHandler.prototype.unregister = function (eventName, actionName) {
            var events = this.events;
            if(events[eventName] && events[eventName][actionName]) {
                events[eventName][actionName] = null;
            }
        };
        ActionHandler.prototype.callbackFor = function (eventName, returnResults) {
            var events = this.events, actionAttribute = 'data-action-' + eventName, returnResultsDefined = typeof returnResults !== 'undefined';
            return function () {
                var attributeValue = $(this).attr(actionAttribute);
                if(typeof attributeValue === STRING) {
                    var method = events[eventName][attributeValue];
                    if(method) {
                        method.apply(method.context || this, arguments);
                    }
                    if(returnResultsDefined) {
                        return returnResults;
                    }
                    return false;
                }
            }
        };
        ActionHandler.actionHandlers = {
        };
        ActionHandler.getFor = function getFor(name) {
            if(this.actionHandlers[name]) {
                return this.actionHandlers[name];
            }
            return new ActionHandler();
        }
        return ActionHandler;
    })();    
    var methods = {
        properties: [
            ACTIONS
        ],
        ignite: function (thrust) {
            var actionHandler = ActionHandler.getFor(thrust.name);
            $(window.document.body).on('click.' + ACTIONS, 'a, button, input[type="button"], input[type="submit"]', actionHandler.callbackFor('click', false));
            return null;
        },
        ready: function (facade, mod) {
            var actions = mod.convention(ACTIONS), actionHandler = ActionHandler.getFor(mod.thrust.name), dom = facade, moduleInstance = mod.instance;
            if(actions) {
                for(var actionEvent in actions) {
                    var actionCollection = actions[actionEvent];
                    for(var actionName in actionCollection) {
                        var action = actionCollection[actionName], args;
                        if(isFunction(action)) {
                            args = [
                                actionEvent, 
                                actionName, 
                                action
                            ];
                        } else {
                            if(isString(action)) {
                                args = [
                                    actionEvent, 
                                    actionName, 
                                    moduleInstance[action]
                                ];
                            } else {
                                if(isArray(action)) {
                                    if(isFunction(action[0])) {
                                        args = [
                                            actionEvent, 
                                            actionName
                                        ].concat(action);
                                    } else {
                                        if(isString(action[0])) {
                                            action[0] = moduleInstance[action[0]];
                                            args = [
                                                actionEvent, 
                                                actionName
                                            ].concat(action);
                                        }
                                    }
                                }
                            }
                        }
                        actionHandler.register.apply(actionHandler, args);
                    }
                }
            }
            return null;
        },
        stop: function (facade, mod) {
            var actions = mod.convention(ACTIONS), actionHandler = ActionHandler.getFor(mod.thrust.name), moduleInstance = mod.instance;
            if(actions) {
                for(var actionEvent in actions) {
                    var actionCollection = actions[actionEvent];
                    for(var actionName in actionCollection) {
                        actionHandler.unregister(actionEvent, actionName);
                    }
                }
            }
            return null;
        }
    };
    exports.action = new Convention(methods);
})
//@ sourceMappingURL=action.js.map
;
define('thrust/dom/convention/animate.container',["require", "exports", 'thrust/convention', 'thrust/util', '../jquery.interface'], function(require, exports, __c__, __util__, __jQueryInterface__) {
    /// <reference path="../../interfaces/mediator/mediator.facade.d.ts" />
    /// <reference path="../../interfaces/mediator/mediator.d.ts" />
    /// <reference path="../../interfaces/dom/dom.facade.d.ts" />
    /// <reference path="../../interfaces/convention.d.ts" />
    /// <reference path="../../../../lib/DefinitelyTyped/requirejs/require-2.1.d.ts" />
    // Disabled until TS supports module per file in some way (ie exports is exports.<export> not  exports.moduleName.<export>)
    /*export module instance {*/
    
    var c = __c__;

    var Convention = c.Convention;
    var util = __util__;

    var _ = util._;
    var jQueryInterface = __jQueryInterface__;

    var event = {
anyContainer: 'thrust-convention-container-any',
changeContainer: 'thrust-convention-container-change'    }, any = _.any, defer = _.defer, bind = _.bind, START = 'start-status', ANIMATE = 'animate', CONTAINER = 'container', CONTEXT = 'context', updatejQueryInternals = jQueryInterface.updatejQueryInternals;
    var methods = {
        properties: [
            ANIMATE
        ],
        init: function (facade, mod) {
            var that = this, mediator = mod.instance.mediator;
            mediator.subscribe(event.changeContainer, bind(that.change, that, mod));
            return null;
        },
        change: function (module, container) {
            if(module.convention(CONTAINER) === container) {
                if(module.convention(START)) {
                    var animate = module.convention(ANIMATE);
                    if(animate) {
                        var contextNode = module.instance.dom();
                        contextNode.removeClass(animate);
                    }
                }
            }
            return null;
        },
        ready: function (facade, mod) {
            var that = this, animate = mod.convention(ANIMATE), container = mod.convention(CONTAINER), context = mod.convention(CONTEXT), dom = facade;
            if(animate && container) {
                var clone = dom.clone().appendTo(dom.parent());
                clone.addClass(animate.replace(/\./g, ' ').trim());
                updatejQueryInternals.call(dom, clone);
                setTimeout(bind(that.cleanup, that, dom.parent(), animate, context), 2000);
            }
            return null;
        },
        cleanup: function (container, animate, context) {
            container.find(context).filter(':not(' + animate + ')').remove();
        }
    };
    exports.animateContainer = new Convention(methods);
})
//@ sourceMappingURL=animate.container.js.map
;
define('thrust/dom/convention/context',["require", "exports", 'thrust/convention', 'thrust/util', '../jquery.interface'], function(require, exports, __c__, __util__, __jQueryInterface__) {
    /// <reference path="../../interfaces/mediator/mediator.d.ts" />
    /// <reference path="../../interfaces/dom/dom.facade.d.ts" />
    /// <reference path="../../interfaces/convention.d.ts" />
    /// <reference path="../../../../lib/DefinitelyTyped/requirejs/require-2.1.d.ts" />
    // Disabled until TS supports module per file in some way (ie exports is exports.<export> not  exports.moduleName.<export>)
    /*export module instance {*/
    
    var c = __c__;

    var Convention = c.Convention;
    var util = __util__;

    var _ = util._;
    var jQueryInterface = __jQueryInterface__;

    var CONTEXT = 'context', updatejQueryInternals = jQueryInterface.updatejQueryInternals;
    var methods = {
        properties: [
            CONTEXT
        ],
        ready: function (facade, mod) {
            var context = mod.convention(CONTEXT);
            if(context) {
                updatejQueryInternals.call(facade, context);
            }
            return null;
        }
    };
    exports.context = new Convention(methods);
})
//@ sourceMappingURL=context.js.map
;
define('thrust/dom/convention/event',["require", "exports", 'thrust/convention', 'thrust/util'], function(require, exports, __c__, __util__) {
    /// <reference path="../../interfaces/mediator/mediator.d.ts" />
    /// <reference path="../../interfaces/dom/dom.facade.d.ts" />
    /// <reference path="../../interfaces/convention.d.ts" />
    /// <reference path="../../../../lib/DefinitelyTyped/requirejs/require-2.1.d.ts" />
    // Disabled until TS supports module per file in some way (ie exports is exports.<export> not  exports.moduleName.<export>)
    /*export module instance {*/
    
    var c = __c__;

    var Convention = c.Convention;
    var util = __util__;

    var _ = util._;
    var CONTEXT = 'context', EVENTS = 'events', isFunction = _.isFunction, isString = _.isString, isArray = _.isArray;
    var methods = {
        properties: [
            EVENTS
        ],
        ready: function (facade, mod) {
            var events = mod.convention(EVENTS), optionalContext = mod.convention(CONTEXT), dom = optionalContext ? facade.query(optionalContext) : facade, moduleInstance = mod.instance;
            if(events) {
                for(var event in events) {
                    var definition = events[event], bindEvent;
                    if(isFunction(definition)) {
                        bindEvent = [
                            event, 
                            definition
                        ];
                    } else {
                        // If the event method is a string, we search to verify that module method exists on the given module
                        //        then bind it, with the proper context.
                        if(isString(definition)) {
                            bindEvent = [
                                event, 
                                moduleInstance[definition]
                            ];
                        } else {
                            // If the event module is an array, we apply the array as if it were a direct call to subscribe, by pushing the event name on the front.
                            if(isArray(definition)) {
                                bindEvent = definition;
                                for(var i = 0, iLen = definition.length; i < iLen; i++) {
                                    if(isString(definition[i]) && moduleInstance[definition[i]]) {
                                        definition[i] = moduleInstance[definition[i]];
                                    }
                                }
                                bindEvent.unshift(0);
                            }
                        }
                    }
                    // Call the on method, with our arguments.
                    dom.on.apply(dom, bindEvent);
                }
                //Save a reference of the context, for later unbinding.
                events.context = (dom)._context[0];
            }
            return null;
        },
        stop: function (facade, mod) {
            var events = mod.convention(EVENTS), dom = facade;
            if(events) {
                dom.changeContext(events.context);
                delete events.context;
                if((dom)._context) {
                    dom.off();
                }
            }
            return null;
        }
    };
    exports.event = new Convention(methods);
})
//@ sourceMappingURL=event.js.map
;