define(["require", "exports", 'thrust/convention', 'thrust/util'], function(require, exports, __c__, __util__) {
    'use strict';
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
