define([
    'thrust/convention',
    'thrust/util',
    'thrust/events'
],
function (Convention, util, Events)
{
    /**
    The facade convention, creates the mediator facade for each module.

    @module thrust.mediator
    @submodule thrust.mediator.convention
    **/
    var SUBSCRIPTIONS = 'subscriptions',
        isFunction    = util.isFunction,
        isString      = util.isString,
        isArray       = util.isArray;

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
    return new Convention({
        properties: [SUBSCRIPTIONS],
        start: function (facade, module)
        {
            var subscriptions = module.convention(SUBSCRIPTIONS);

            if (subscriptions && !subscriptions._subscriptionsSet)
            {
                var moduleInstance = module.instance;
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
                module.convention(SUBSCRIPTIONS)._subscriptionsSet = true;
            }
        },
        stop: function (facade, module)
        {
            var subscriptions = module.convention(SUBSCRIPTIONS);

            if (subscriptions && subscriptions._subscriptionsSet)
            {
                module.convention(SUBSCRIPTIONS)._subscriptionsSet = false;
            }
        }
    });
});