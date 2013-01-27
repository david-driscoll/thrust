/// <reference path="../../interfaces/mediator/convention/subscription.d.ts" />
/// <reference path="../../interfaces/mediator/mediator.d.ts" />
/// <reference path="../../interfaces/thrust.d.ts" />
/// <reference path="../../../../lib/DefinitelyTyped/requirejs/require.d.ts" />

// Disabled until TS supports module per file in some way (ie exports is exports.<export> not  exports.moduleName.<export>)
/*export module instance {*/

'use strict';
import c = module('thrust/convention');
var Convention = c.Convention;
import util = module('thrust/util');
var _ = util._;

/**
The facade convention, creates the mediator facade for each module.

@module thrust.mediator
@submodule thrust.mediator.convention
**/
var SUBSCRIPTIONS = 'config.mediator.subscriptions',
    isFunction = _.isFunction,
    isString = _.isString,
    isArray = _.isArray,
    isObject = _.isObject,
    isPlainObject = _.isPlainObject,
    forOwn = _.forOwn,
    each = _.each;

/**
* # __thrust/mediator__ Convention - Subscriptions
*
* The `subscriptions` property defines, predefined subscriptions for a module, and their appropriate definition
*
* By default the context of the subscription method, when run, will be your module,
*     it can be optionally defined by passing in an array.
*
*
* The definition can accept all of the following:
*
* * `function()` - This function will be run when the event is invoked.
* * `string` - This string must point at a function, that exists on the module definition.
* * `[function(), context]` - Where the context is the context that the function will be called with.
* * `[string, context]` - Where the context is the context that the function will be called with.
*
*
* The following is an exmaple of the events block in your module...
*
*
*     subscription: {
*         'event/area/name': myMethodHere,
*         'event/area/name2': 'methodDefinedOnTheModule',
*         'event/area/name3': [myMethodHere, myMethodContext],
*         'event/area/name4': ['methondDefinedOnTheModule', myMethodContext]
*     }
*
* @for thrust.mediator.convention
* @property subscriptions
**/
interface IThrustConventionMediatorSubscription extends IThrustConvention.Properties,
    IThrustConvention.Plugin.Start.Void,
    IThrustConvention.Plugin.Stop.Void {}

var arrayShortHandArgsInOrder = ['handler', 'context'];

var methods: IThrustConventionMediatorSubscription = {
    properties: [SUBSCRIPTIONS],
    start: function (mod: IThrustModule, facade: IThrustMediatorFacade): void
    {
        var subscriptions: ISubscriptionEvents = mod.convention(SUBSCRIPTIONS);

        if (subscriptions && !(<any> subscriptions)._subscriptionsSet)
        {
            var moduleInstance = mod.instance;
            forOwn(subscriptions, function (subscriptionCollection: ISubscriptionEvents[], subscriptionName)
            {
                if (!isArray(subscriptionCollection))
                    subscriptionCollection = [<any>[subscriptionCollection]];
                else if (subscriptionCollection.length && (!isArray(subscriptionCollection[0]) || isString(subscriptionCollection[0])))
                    subscriptionCollection = [<any> subscriptionCollection];

                each(subscriptionCollection, function (subscription: ISubscriptionEvent)
                {
                    if (isArray(subscription))
                    {
                        //newSubscription.push.apply(newSubscription, subscription);
                        each(subscription, (handlerObject, i) => {
                            var newSubscription = [subscriptionName];
                            if (isString(handlerObject))
                            {
                                newSubscription.push(mod.instance[handlerObject]);
                                if (subscription[i + 1])
                                    newSubscription.push(subscription[i + 1]);
                                //return false;
                            }
                            else if (isFunction(handlerObject))
                                {
                                newSubscription.push(handlerObject);
                                if (subscription[i + 1])
                                    newSubscription.push(subscription[i + 1]);
                                //return false;
                            }
                            else if (isPlainObject(handlerObject) && ('moduleHandler' in handlerObject || 'handler' in handlerObject))
                                {
                                //newSubscription = [subscriptionName];
                                if ('moduleHandler' in handlerObject)
                                    newSubscription.push(mod.instance[handlerObject.moduleHandler]);
                                if ('handler' in handlerObject)
                                {
                                    if (isString(handlerObject))
                                        newSubscription.push(mod.instance[handlerObject.handler]);
                                    else
                                        newSubscription.push(handlerObject.handler);
                                }
                                if ('context' in handlerObject)
                                    newSubscription.push(handlerObject.context);
                            }
                            if (newSubscription.length > 1)
                                facade.subscribe.apply(facade, newSubscription);
                        });
                    }
                })
            })
            mod.convention(SUBSCRIPTIONS)._subscriptionsSet = true;
        }
    },
    stop: function (mod: IThrustModule, facade: IThrustMediatorFacade): void
    {
        var subscriptions = mod.convention(SUBSCRIPTIONS);

        if (subscriptions && subscriptions._subscriptionsSet)
        {
            mod.convention(SUBSCRIPTIONS)._subscriptionsSet = false;
        }
    }
};
export var subscription = new Convention(methods);
