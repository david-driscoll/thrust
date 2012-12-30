define(["require", "exports", 'thrust/convention', 'thrust/util'], function(require, exports, __c__, __util__) {
    /// <reference path="../../interfaces/mediator/mediator.d.ts" />
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
