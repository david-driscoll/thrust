/*! thrust-js - v0.1.5 - 2013-01-05 */
define('thrust/dom/subjquery',["require", "exports", 'jquery', 'thrust/util', 'thrust/log', 'has'], function(require, exports, __jQuery__, __util__, __log__, __has__) {
    /// <reference path="../../../lib/DefinitelyTyped/requirejs/require-2.1.d.ts" />
    // Disabled until TS supports module per file in some way (ie exports is exports.<export> not  exports.moduleName.<export>)
    /*export module instance {*/
    
    var jQuery = __jQuery__;

    var util = __util__;

    var _ = util._;
    var log = __log__;

    var has = __has__;

    var format = util.format, each = _.each, extend = _.extend, isObject = _.isObject, isFunction = _.isFunction, slice = Array.prototype.slice, GLOBAL = '.global';
    var jQueryFnMethodBlackList = [
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
        'fadeToggle'/*, 'on', 'off', 'one'*/ 
    ];
    function normalizeEvents(events, namespace) {
        if(!namespace) {
            return events;
        }
        if(isObject(events)) {
            // Create new object, so that original object will not be modified when binding.
            events = extend({
            }, events);
            for(var key in events) {
                if(key.indexOf('.') === -1) {
                    events[key + namespace] = events[key];
                    delete events[key];
                }
            }
            return events;
        } else {
            if(!events) {
                return namespace;
            }
            events = events.split(' ');
            for(var i = 0, iLen = events.length; i < iLen; i++) {
                var evt = events[i];
                if(evt.indexOf('.') === -1) {
                    events[i] = evt + namespace;
                }
            }
            return events.join(' ');
        }
    }
    /*
    Clone jquery
    Remove all excess methods we don't want to expose natively.
    overrload any methods we want to change behavior of (noteably on, one, and off)
    
    Instead of duplicating the jquery behavior we instead realign it to our own.
    */
    // jQuery sub
    function subJQuery() {
        var tQuery = function (selector, context, namespace) {
            return new tQuery.prototype.init(selector, context, namespace || (this && this.namespace));
        };
        _.merge(tQuery, jQuery);
        // Do not like
        // probably needed in some special unique cases
        tQuery.jQuery = jQuery;
        // expose events for doing special events as required.
        tQuery.event = (jQuery).event;
        tQuery.fn = tQuery.prototype = extend({
        }, jQuery.fn);
        tQuery.fn.constructor = tQuery;
        tQuery.fn.init = function init(selector, context, namespace) {
            var ioDom = context instanceof tQuery;
            if(context && context instanceof jQuery && !(ioDom)) {
                context = tQuery(context);
            }
            var result = jQuery.fn.init.call(this, selector, context, tQueryRoot);
            if(namespace) {
                result.namespace = namespace;
            } else {
                if(ioDom) {
                    result.namespace = context.namespace;
                }
            }
            return result;
        };
        tQuery.fn.init.prototype = tQuery.fn;
        var tQueryRoot = tQuery(document);
        // remove all not applicable methods off of fn.
        each(jQueryFnMethodBlackList, function (x) {
            if(tQuery.fn[x]) {
                tQuery.fn[x] = null;
                delete tQuery.fn[x];
            }
        });
        _.each([
            'on', 
            'one', 
            'off'
        ], function (x) {
            tQuery.fn[x] = _.wrap(tQuery.fn[x], function (f) {
                var args = [];
                for (var _i = 0; _i < (arguments.length - 1); _i++) {
                    args[_i] = arguments[_i + 1];
                }
                false && log.debug(format('tQuery[{0}]: Binding ' + x + ' events...', this.namespace));
                args[0] = normalizeEvents(args[0], this.namespace);
                return f.apply(this, args);
            });
        });
        tQuery.fn.query = tQuery.fn.$ = tQuery.fn.find;
        return tQuery;
    }
    exports.tQuery = subJQuery();
})
//@ sourceMappingURL=subjquery.js.map
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
define('thrust/dom/main',["require", "exports", './subjquery', 'thrust/util', 'thrust/log', 'thrust/facade', 'has', 'thrust/instance', './config'], function(require, exports, __subjquery__, __util__, __log__, __facade__, __has__, __instance__, __config__) {
    /// <reference path="../interfaces/dom/dom.d.ts" />
    /// <reference path="../../../lib/DefinitelyTyped/requirejs/require-2.1.d.ts" />
    // Disabled until TS supports module per file in some way (ie exports is exports.<export> not  exports.moduleName.<export>)
    /*export module instance {*/
    
    var subjquery = __subjquery__;

    var tQuery = subjquery.tQuery;
    var util = __util__;

    var _ = util._;
    var log = __log__;

    var facade = __facade__;

    var has = __has__;

    var instance = __instance__;

    var config = __config__;

    exports.className = 'Dom';
    var format = util.format, extend = _.extend, bind = _.bind, hasOwn = Object.prototype.hasOwnProperty, isObject = _.isObject, slice = Array.prototype.slice, when = util.when, isArray = _.isArray;
    //#region DomFacade
    var DomFacade = (function () {
        var domFacade = facade.createFacade(function (mod, parent) {
            this.name = parent.name;
            this.__conventions = parent.__conventions;
            this.context = tQuery(document, undefined, this.name);
        });
        domFacade.prototype.init = function (fake) {
            this._internalEvents = this._internalEvents || [];
            false && log.debug(format('Dom[{0}]: Initalizing {1}Dom facade', this.name, fake ? 'fake ' : ''));
            return this;
        };
        domFacade.prototype.start = function (m) {
            false && log.debug(format('Dom[{0}]: Starting Dom facade', this.name));
            return null;
        };
        domFacade.prototype.stop = function (m) {
            false && log.debug(format('Dom[{0}]: Stopping Dom facade', this.name));
            for(var i = this._internalEvents.length - 1; i >= 0; i--) {
                var sub = this._internalEvents[i];
                this._internalEvents.splice(i, 1);
                sub.context.off.apply(this, (isArray(sub)) ? sub : (isArray(sub.args)) ? sub.args : []);
            }
            return null;
        };
        domFacade.prototype.destroy = function (m) {
            false && log.debug(format('Dom[{0}]: Destroying Dom facade', this.name));
            delete this._internalEvents;
            return null;
        };
        return domFacade;
    })();
    //#endregion
    //#region Dom
    var Dom = (function () {
        //#endregion
        function Dom(name, mediator) {
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

            });
        }
        Dom.prototype.initEvents = //#region Events
        function () {
        };
        Dom.prototype.extend = function (to, init) {
            return null;
        };
        Dom.prototype.subscribe = function (events, callback, context, once) {
        };
        Dom.prototype.unsubscribe = function (events, callback, context) {
        };
        Dom.prototype.once = function (events, callback, context) {
        };
        Dom.config = config;
        Dom.prototype.createFacade = function (thrust, mod, facades) {
            if(facades.dom && !(facades.dom instanceof DomFacade)) {
                throw new Error('"dom" is a reserved property');
            }
            var dom;
            if(facades.dom) {
                facades.dom.updateFacade(mod, this);
                dom = facades.dom;
            } else {
                dom = facades.dom = new DomFacade(mod, this);
                mod.dom = mod.$ = dom.context;
            }
            return dom;
        };
        return Dom;
    })();
    exports.Dom = Dom;    
    //#endregion
    })
//@ sourceMappingURL=main.js.map
;
define('thrust/dom', ['thrust/dom/main'], function (main) { return main; });

define('thrust/dom/convention/action',["require", "exports", 'thrust/convention', 'thrust/util', '../subjquery'], function(require, exports, __c__, __util__, __subjquery__) {
    /// <reference path="../../interfaces/dom/convention/action.d.ts" />
    /// <reference path="../../interfaces/dom/dom.d.ts" />
    /// <reference path="../../interfaces/thrust.d.ts" />
    /// <reference path="../../../../lib/DefinitelyTyped/requirejs/require-2.1.d.ts" />
    // Disabled until TS supports module per file in some way (ie exports is exports.<export> not  exports.moduleName.<export>)
    /*export module instance {*/
    
    var c = __c__;

    var Convention = c.Convention;
    var util = __util__;

    var _ = util._;
    var subjquery = __subjquery__;

    var $ = subjquery.tQuery;
    var format = util.format, ACTIONS = 'config.dom.actions', ACTIONSSINGLE = 'actions', STRING = 'string', REGISTRATIONS = '_registrations', isFunction = _.isFunction, isString = _.isString, isArray = _.isArray;
    var getActionAttribute = function (eventName) {
        return 'data-action-' + eventName;
    };
    var ActionHandler = (function () {
        function ActionHandler() {
            this.events = {
            };
        }
        ActionHandler.prototype.register = function (eventName, actionName, action) {
            var events = this.events;
            if(!events[eventName]) {
                events[eventName] = {
                };
            }
            if(!events[eventName][actionName]) {
                events[eventName][actionName] = action;
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
            var events = this.events, actionAttribute = getActionAttribute(eventName), returnResultsDefined = typeof returnResults !== 'undefined';
            return function () {
                var attributeValue = $(this).attr(actionAttribute);
                if(typeof attributeValue === STRING) {
                    var action = events[eventName][attributeValue];
                    if(action) {
                        action.handler.apply(action.context || this, arguments);
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
            return (this.actionHandlers[name] = new ActionHandler());
        }
        return ActionHandler;
    })();    
    var events = {
        click: [
            'a', 
            'button', 
            'input[type="button"]', 
            'input[type="submit"]'
        ],
        dblclick: [
            'a', 
            'button', 
            'input[type="button"]', 
            'input[type="submit"]'
        ],
        mouseenter: [
            ''
        ],
        mouseleave: [
            ''
        ],
        focus: [
            'input'
        ],
        blur: [
            'input'
        ]
    };
    var arrayShortHandArgsInOrder = [
        'name', 
        'handler', 
        'context'
    ];
    var methods = {
        properties: [
            ACTIONS
        ],
        ignite: function (thrust) {
            var actionHandler = ActionHandler.getFor(thrust.name);
            thrust.dom.actionHandler = actionHandler;
            var $body = $(window.document.body);
            _.each(events, function (eventSelectors, eventName) {
                // using thrust name, as callback needs to be per thrust instance
                // in the event of multiple thrust instances.
                $body.on(eventName + '.' + ACTIONSSINGLE + thrust.name, eventSelectors.join(getActionAttribute(eventName) + ', '), actionHandler.callbackFor(eventName, true));
            });
        },
        deorbit: function (thrust) {
            var actionHandler = ActionHandler.getFor(thrust.name);
            var $body = $(window.document.body);
            _.each(events, function (eventSelectors, eventName) {
                $body.off('.' + ACTIONSSINGLE + thrust.name);
            });
        },
        ready: function (mod, facade) {
            var actions = mod.convention(ACTIONS), actionHandler = ActionHandler.getFor(mod.thrust.name), dom = facade, moduleInstance = mod.instance;
            if(actions) {
                _.forOwn(actions, function (actionCollection, eventName) {
                    if(!isArray(actionCollection)) {
                        actionCollection = [
                            actionCollection
                        ];
                    } else {
                        if(actionCollection.length && (!isArray(actionCollection[0]) || isString(actionCollection[0]))) {
                            actionCollection = [
                                actionCollection
                            ];
                        }
                    }
                    _.each(actionCollection, function (action) {
                        if(isArray(action)) {
                            var newAction = {
                                name: undefined
                            };
                            _.each(arrayShortHandArgsInOrder, function (x, i) {
                                if(x === 'handler' && isString(action[i])) {
                                    action[i] = mod.instance[action[i]];
                                }
                                newAction[x] = action[i];
                            });
                            action = newAction;
                        }
                        var actionName = action.name;
                        if(!action.handler && action.moduleHandler) {
                            action.handler = mod.instance[action.moduleHandler];
                        } else {
                            if(!action.handler) {
                                throw new Error('Must define either a handler or module handler.');
                            }
                        }
                        actionHandler.register(eventName, actionName, action);
                    });
                });
            }
        },
        stop: function (mod, facade) {
            var actions = mod.convention(ACTIONS), actionHandler = ActionHandler.getFor(mod.thrust.name), moduleInstance = mod.instance;
            if(actions) {
                for(var actionEvent in actions) {
                    var actionCollection = actions[actionEvent];
                    for(var actionName in actionCollection) {
                        actionHandler.unregister(actionEvent, actionName);
                    }
                }
            }
        }
    };
    exports.action = new Convention(methods);
})
//@ sourceMappingURL=action.js.map
;
define('thrust/dom/convention/animate.container',["require", "exports", 'thrust/convention', 'thrust/util'], function(require, exports, __c__, __util__) {
    /// <reference path="../../interfaces/dom/dom.d.ts" />
    /// <reference path="../../interfaces/mediator/mediator.d.ts" />
    /// <reference path="../../interfaces/thrust.d.ts" />
    /// <reference path="../../../../lib/DefinitelyTyped/requirejs/require-2.1.d.ts" />
    // Disabled until TS supports module per file in some way (ie exports is exports.<export> not  exports.moduleName.<export>)
    /*export module instance {*/
    
    var c = __c__;

    var Convention = c.Convention;
    var util = __util__;

    var _ = util._;
    var event = {
anyContainer: 'thrust-convention-container-any',
changeContainer: 'thrust-convention-container-change'    }, any = _.any, defer = _.defer, bind = _.bind, START = 'start-status', ANIMATE = 'animate', CONTAINER = 'container', CONTEXT = 'context';
    var methods = {
        properties: [
            ANIMATE
        ],
        init: function (mod, facade) {
            var that = this, mediator = mod.instance.mediator;
            mediator.subscribe(event.changeContainer, bind(that.change, that, mod));
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
        },
        ready: function (mod, facade) {
            var that = this, animate = mod.convention(ANIMATE), container = mod.convention(CONTAINER), context = mod.convention(CONTEXT), dom = facade;
            if(animate && container) {
                var clone = dom.context.clone().appendTo(dom.context.parent());
                clone.addClass(animate.replace(/\./g, ' ').trim());
                mod.instance.dom = mod.instance.$ = clone;
                setTimeout(bind(that.cleanup, that, dom.context.parent(), animate, context), 2000);
            }
        },
        cleanup: function (container, animate, context) {
            container.find(context).filter(':not(' + animate + ')').remove();
        }
    };
    exports.animateContainer = new Convention(methods);
})
//@ sourceMappingURL=animate.container.js.map
;
define('thrust/dom/convention/context',["require", "exports", 'thrust/convention', 'thrust/util', '../subjquery'], function(require, exports, __c__, __util__, __subjquery__) {
    /// <reference path="../../interfaces/dom/convention/context.d.ts" />
    /// <reference path="../../interfaces/mediator/mediator.d.ts" />
    /// <reference path="../../interfaces/dom/dom.d.ts" />
    /// <reference path="../../interfaces/thrust.d.ts" />
    /// <reference path="../../../../lib/DefinitelyTyped/requirejs/require-2.1.d.ts" />
    // Disabled until TS supports module per file in some way (ie exports is exports.<export> not  exports.moduleName.<export>)
    /*export module instance {*/
    
    var c = __c__;

    var Convention = c.Convention;
    var util = __util__;

    var _ = util._;
    var subjquery = __subjquery__;

    var tQuery = subjquery.tQuery;
    var CONTEXT = 'config.dom.context';
    var methods = {
        properties: [
            CONTEXT
        ],
        ready: function (mod, facade) {
            var context = mod.convention(CONTEXT);
            if(context) {
                mod.instance.dom = mod.instance.$ = facade.context = tQuery(context, mod.instance.$);
            }
        }
    };
    exports.context = new Convention(methods);
})
//@ sourceMappingURL=context.js.map
;
define('thrust/dom/convention/event',["require", "exports", 'thrust/convention', 'thrust/util'], function(require, exports, __c__, __util__) {
    /// <reference path="../../interfaces/dom/convention/event.d.ts" />
    /// <reference path="../../interfaces/mediator/mediator.d.ts" />
    /// <reference path="../../interfaces/dom/dom.d.ts" />
    /// <reference path="../../interfaces/thrust.d.ts" />
    /// <reference path="../../../../lib/DefinitelyTyped/requirejs/require-2.1.d.ts" />
    // Disabled until TS supports module per file in some way (ie exports is exports.<export> not  exports.moduleName.<export>)
    /*export module instance {*/
    
    var c = __c__;

    var Convention = c.Convention;
    var util = __util__;

    var _ = util._;
    var CONTEXT = 'config.dom.context', EVENTS = 'config.dom.events', isFunction = _.isFunction, isString = _.isString, isArray = _.isArray;
    var eventPropertyLoadOrder = [
        'selector', 
        'data', 
        'handler'
    ];
    var methods = {
        properties: [
            EVENTS
        ],
        ready: function (mod, facade) {
            var events = mod.convention(EVENTS), $context = facade.context, moduleInstance = mod.instance;
            if(events) {
                _.forIn(events, function (eventsCollection, event) {
                    //var eventsCollection = events[event];
                    if(!isArray(eventsCollection)) {
                        eventsCollection = [
                            eventsCollection
                        ];
                    } else {
                        if(eventsCollection.length && (!isArray(eventsCollection[0]) || isString(eventsCollection[0]))) {
                            eventsCollection = [
                                eventsCollection
                            ];
                        }
                    }
                    _.each(eventsCollection, function (definition) {
                        var bindEvent = [
                            event
                        ];
                        if(isArray(definition)) {
                            bindEvent.push.apply(bindEvent, definition);
                            // We have one edgecase here
                            // If the short hand array, has a context that is a string or function
                            // and it doesnt have information for both selector and data, this will fail
                            // We can recover when all 5 possible items are defined.
                            var handler = bindEvent[bindEvent.length - 1];
                            // We were asked for a method on the module.
                            if(isString(handler) && bindEvent.length === 2) {
                                bindEvent[bindEvent.length - 1] = mod.instance[handler];
                            } else {
                                // We didnt find a function :(
                                //  EDGE CASE: If context is a function, we will assume all is well
                                //              Even if the handler is a string that needs to be referenced.
                                // Work arrounds:
                                //      Shorthand: add null/empty values for selector and data
                                //      Longhand: switch to long hand as it has more explicit syntax.
                                if(!isString(handler) && !isFunction(handler) && bindEvent.length > 2 || bindEvent.length === 5) {
                                    handler = bindEvent[bindEvent.length - 2];
                                    if(isString(handler)) {
                                        bindEvent[bindEvent.length - 2] = mod.instance[handler];
                                    }
                                    bindEvent[bindEvent.length - 2] = _.bind(bindEvent[bindEvent.length - 2], bindEvent.pop());
                                } else {
                                    if(isString(handler)) {
                                        bindEvent[bindEvent.length - 1] = mod.instance[handler];
                                    }
                                }
                            }
                        } else {
                            _.each(eventPropertyLoadOrder, function (x) {
                                if(definition[x]) {
                                    var value = definition[x];
                                    if(x === 'handler' && definition.context) {
                                        value = _.bind(value, definition.context);
                                    }
                                    bindEvent.push(value);
                                }
                            });
                        }
                        // Call the on method, with our arguments.
                        $context.on.apply($context, bindEvent);
                    });
                });
            }
        },
        stop: function (mod, facade) {
            var events = mod.convention(EVENTS), $context = facade.context;
            if($context) {
                $context.off();
            }
        }
    };
    exports.event = new Convention(methods);
})
//@ sourceMappingURL=event.js.map
;