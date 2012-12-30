define(["require", "exports", 'thrust/convention', 'thrust/util', 'jquery'], function(require, exports, __c__, __util__, __$__) {
    /// <reference path="../../interfaces/dom/dom.facade.d.ts" />
    /// <reference path="../../interfaces/convention.d.ts" />
    /// <reference path="../../../lib/DefinitelyTyped/requirejs/require-2.1.d.ts" />
    // Disabled until TS supports module per file in some way (ie exports is exports.<export> not  exports.moduleName.<export>)
    /*export module instance {*/
    'use strict';
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
