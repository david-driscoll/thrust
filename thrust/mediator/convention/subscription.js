define(["require", "exports", 'thrust/convention', 'thrust/util'], function(require, exports, __c__, __util__) {
    /// <reference path="../../interfaces/mediator/mediator.facade.d.ts" />
    /// <reference path="../../interfaces/convention.d.ts" />
    /// <reference path="../../../lib/DefinitelyTyped/requirejs/require-2.1.d.ts" />
    // Disabled until TS supports module per file in some way (ie exports is exports.<export> not  exports.moduleName.<export>)
    /*export module instance {*/
    'use strict';
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
