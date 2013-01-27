define(["require", "exports", 'thrust/convention', 'thrust/util'], function(require, exports, __c__, __util__) {
    /// <reference path="../../interfaces/dom/convention/event.d.ts" />
    /// <reference path="../../interfaces/mediator/mediator.d.ts" />
    /// <reference path="../../interfaces/dom/dom.d.ts" />
    /// <reference path="../../interfaces/thrust.d.ts" />
    /// <reference path="../../../../lib/DefinitelyTyped/requirejs/require.d.ts" />
    // Disabled until TS supports module per file in some way (ie exports is exports.<export> not  exports.moduleName.<export>)
    /*export module instance {*/
    'use strict';
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
                    } else if(eventsCollection.length && (!isArray(eventsCollection[0]) || isString(eventsCollection[0]))) {
                        eventsCollection = [
                            eventsCollection
                        ];
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
                            } else // We didnt find a function :(
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
                            } else if(isString(handler)) {
                                bindEvent[bindEvent.length - 1] = mod.instance[handler];
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
