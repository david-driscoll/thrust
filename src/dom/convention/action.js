define([
    'thrust/convention',
    'thrust/util',
    'jquery'
],
function (Convention, util, $)
{
    var format     = util.format,
        ACTIONS    = 'actions',
        STRING     = 'string',
        isFunction = util.isFunction,
        isString   = util.isString,
        isArray    = util.isArray;

    var actionHandlers = {
        _registrations: {},
        register: function (eventName, acionName, handler, context)
        {
            var that = this;
            if (!that._registrations[eventName])
                that._registrations[eventName] = {};

            if (!that._registrations[eventName][acionName])
            {
                that._registrations[eventName][acionName] = handler;
                if (context) that._registrations[eventName][acionName].context = context;
            }
            else
                throw new Error(format('The action {1} handler "{0}" has already been taken!', acionName, eventName));
        },
        unregister: function (eventName, acionName)
        {
            var that = this;
            if (that._registrations[eventName] && that._registrations[eventName][acionName])
            {
                that._registrations[eventName][acionName] = null;
                delete that._registrations[eventName][acionName];
            }
        },
        callbackFor: function (eventName, returnResults)
        {
            var that = this;
            var actionAttribute = 'data-action-' + eventName,
                returnResultsDefined = typeof returnResults !== 'undefined';

            return function ()
            {
                var attributeValue = $(this).attr(actionAttribute);
                if (typeof attributeValue === STRING)
                {
                    var method = that._registrations[eventName][attributeValue];
                    if (method)
                        method.apply(method.context || this, arguments);
                    if (returnResultsDefined)
                        return returnResults;
                    return false;
                }
            };
        }
    };

    /**
    @module thrust.dom
    @submodule thrust.dom.convention
    **/

    /**
    * # __thrust/dom__ Convention - Actions
    *
    * The dom action convention allows you to create custom actions, that execute when a certian event happen.
    *
    *
    *## Supported events
    * * `click`
    *
    * NOTE: More events will be added when they make sense to add them.
    *
    *
    * The definition can accept all of the following:
    *
    * * `function()` - This function will be run when the action is invoked.
    * * `string` - This string must point at a function, that exists on the module definition.
    * * `[function(), context]` - Where the context is the context that the function will be called with.
    * * `[string, context]` - Where the context is the context that the function will be called with.
    *
    *
    * The definition that is used to define an action is below...
    *
    * NOTE: The below is written as if it were part of a module definition.
    *
    *
    *     actions: {
    *         'click': {
    *             'doFunction': function()
    *             {
    *                 alert('My awesome alert here!');
    *             },
    *             'doString': 'actionString',
    *             'doContextFunction': [function()
    *             {
    *                 alert('My awesome alert here!');
    *             }, context],
    *             'doString': ['actionString', context],
    *         }
    *     },
    *     actionString: function()
    *     {
    *         alert('My awesome alert here!');
    *     }
    *
    * To utlize the action, simply add a `data-action-{event}` attribute, with the name of the action as the va;ie to any of the following elements:
    *
    * * `a`
    * * `button`
    * * `input[type="button"]`
    * * `input[type="submit"]`
    *
    * @for thrust.dom.convention
    * @property actions
    **/
    return new Convention({
        properties: [ACTIONS],
        ignite: function()
        {
            $(window.document.body).on('click.' + ACTIONS, 'a, button, input[type="button"], input[type="submit"]', actionHandlers.callbackFor('click', false));
        },
        ready: function (facade, module)
        {
            var actions = module.convention(ACTIONS),
                dom = facade,
                moduleInstance = module.instance;

            if (actions)
            {
                for (var actionEvent in actions)
                {
                    var actionCollection = actions[actionEvent];
                    for (var actionName in actionCollection)
                    {
                        var action = actionCollection[actionName],
                            args;

                        if (isFunction(action))
                        {
                            args = [actionEvent, actionName, action];
                        }
                        else if (isString(action))
                        {
                            args = [actionEvent, actionName, moduleInstance[action]];
                        }
                        else if (isArray(action))
                        {
                            if (isFunction(action[0]))
                            {
                                args = [actionEvent, actionName].concat(action);
                            }
                            else if (isString(action[0]))
                            {
                                action[0] = moduleInstance[action[0]];
                                args = [actionEvent, actionName].concat(action);
                            }
                        }
                        actionHandlers.register.apply(actionHandlers, args);
                    }
                }
            }
        },
        stop: function (facade, module)
        {
            var dom = facade,
                actions = module.convention(ACTIONS),
                moduleInstance = module.instance,
                dom = facade.dom;

            if (actions)
            {
                for (var actionEvent in actions)
                {
                    var actionCollection = actions[actionEvent];
                    for (var actionName in actionCollection)
                    {
                        actionHandlers.unregister(actionEvent, actionName);
                    }
                }
            }
        }
    });
});