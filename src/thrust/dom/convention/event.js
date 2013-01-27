define(["require", "exports", 'thrust/convention', 'thrust/util'], function(require, exports, __c__, __util__) {
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
                            var handler = bindEvent[bindEvent.length - 1];
                            if(isString(handler) && bindEvent.length === 2) {
                                bindEvent[bindEvent.length - 1] = mod.instance[handler];
                            } else {
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
