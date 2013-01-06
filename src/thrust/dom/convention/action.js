define(["require", "exports", 'thrust/convention', 'thrust/util', '../subjquery'], function(require, exports, __c__, __util__, __subjquery__) {
    /// <reference path="../../interfaces/dom/convention/action.d.ts" />
    /// <reference path="../../interfaces/dom/dom.d.ts" />
    /// <reference path="../../interfaces/thrust.d.ts" />
    /// <reference path="../../../../lib/DefinitelyTyped/requirejs/require-2.1.d.ts" />
    // Disabled until TS supports module per file in some way (ie exports is exports.<export> not  exports.moduleName.<export>)
    /*export module instance {*/
    'use strict';
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
