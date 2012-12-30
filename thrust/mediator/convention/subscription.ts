/// <reference path="../../interfaces/mediator/mediator.facade.d.ts" />
/// <reference path="../../interfaces/convention.d.ts" />
/// <reference path="../../../lib/DefinitelyTyped/requirejs/require-2.1.d.ts" />

// Disabled until TS supports module per file in some way (ie exports is exports.<export> not  exports.moduleName.<export>)
/*export module instance {*/

'use strict';
export import c = module('thrust/convention');
var Convention = c.Convention;
import util = module('thrust/util');
var _ = util._;

    /**
    The facade convention, creates the mediator facade for each module.

    @module thrust.mediator
    @submodule thrust.mediator.convention
    **/
    var SUBSCRIPTIONS = 'subscriptions',
        isFunction    = _.isFunction,
        isString      = _.isString,
        isArray       = _.isArray;

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
    interface IThrustConventionMediatorSubscription extends IThrustConventionProperties, IThrustConventionStart, IThrustConventionStop {}

    var methods : IThrustConventionMediatorSubscription = {
        properties: [SUBSCRIPTIONS],
        start: function (facade : IThrustMediatorFacade, mod: IThrustModule) : Promise
        {
            var subscriptions = mod.convention(SUBSCRIPTIONS);

            if (subscriptions && !subscriptions._subscriptionsSet)
            {
                var moduleInstance = mod.instance;
                for (var subscription in subscriptions)
                {
                    var definition = subscriptions[subscription];
                    if (isFunction(definition))
                    {
                        definition = [subscription, definition, moduleInstance];
                    }
                    else if (isString(definition))
                    {
                        definition = [subscription, moduleInstance[definition], moduleInstance];
                    }
                    else if (isArray(definition))
                    {
                        if (isString(definition[0]))
                        {
                            definition[0] = moduleInstance[definition[0]];
                        }
                        definition.unshift(subscription);
                    }
                    facade.subscribe.apply(facade, definition);
                }
                mod.convention(SUBSCRIPTIONS)._subscriptionsSet = true;
            }
            return null;
        },
        stop: function (facade : IThrustMediatorFacade, mod: IThrustModule) : Promise
        {
            var subscriptions = mod.convention(SUBSCRIPTIONS);

            if (subscriptions && subscriptions._subscriptionsSet)
            {
                mod.convention(SUBSCRIPTIONS)._subscriptionsSet = false;
            }
            return null;
        }
    };
    export var subscription = new Convention(methods);
