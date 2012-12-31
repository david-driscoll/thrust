/// <reference path="../../interfaces/dom/dom.facade.d.ts" />
/// <reference path="../../interfaces/convention.d.ts" />
/// <reference path="../../../lib/DefinitelyTyped/requirejs/require-2.1.d.ts" />

// Disabled until TS supports module per file in some way (ie exports is exports.<export> not  exports.moduleName.<export>)
/*export module instance {*/

	'use strict';
	export import c = module('thrust/convention');
	var Convention = c.Convention;

	import util = module('thrust/util');
	var _ = util._;

	import $ = module('jquery');

    var format     = util.format,
        ACTIONS    = 'actions',
        STRING     = 'string',
		REGISTRATIONS = '_registrations',
        isFunction = _.isFunction,
        isString   = _.isString,
        isArray    = _.isArray;

    interface IActionHandlerCollection
    {
    	[name: string]: IActionHandler;
    }
    interface IActionHandler
    {
    	register(eventName: string, acionName: string, handler: Function, context: any): void;
    	unregister(eventName: string, acionName: string): void;
    	callbackFor(eventName, returnResults): Function;
    }

    interface IActionHandlerEventCollection
    {
    	[event: string]: IActionHandlerEvent;
    }
	interface IActionHandlerEvent
    {
		[action: string]: IActionHandlerEventAction;
    }
	interface IActionHandlerEventAction extends Function
	{
		context: any;
	}

    class ActionHandler implements IActionHandler
    {
    	public events: IActionHandlerEventCollection = {};
    	public register(eventName: string, actionName: string, handler: Function, context: any): void
    	{
    		var events = this.events;
			if (!events[eventName])
    			events[eventName] = {};

    		if (!events[eventName][actionName])
    		{
    			events[eventName][actionName] = <IActionHandlerEventAction> handler;
    			if (context)
					events[eventName][actionName].context = context;
    		}
    		else
    			throw new Error(format('The action {1} handler "{0}" has already been taken!', actionName, eventName));
    	}

    	public unregister(eventName: string, actionName: string): void
    	{
			var events = this.events;
			if (events[eventName] && events[eventName][actionName])
    		{
    			events[eventName][actionName] = null;
    		}
    	}

    	public callbackFor(eventName : string, returnResults): Function
    	{
			var events = this.events,
				actionAttribute = 'data-action-' + eventName,
				returnResultsDefined = typeof returnResults !== 'undefined';

    		return function ()
    		{
    			var attributeValue = $(this).attr(actionAttribute);
    			if (typeof attributeValue === STRING)
    			{
    				var method = events[eventName][attributeValue];
    				if (method)
    					method.apply(method.context || this, arguments);
    				if (returnResultsDefined)
    					return returnResults;
    				return false;
    			}
    		};
    	}

    	public static actionHandlers: IActionHandlerCollection = {};
    	public static getFor(name: string) : IActionHandler
    	{
			if (this.actionHandlers[name])
				return this.actionHandlers[name];
			return new ActionHandler();
    	}
    }
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
    interface IThrustConventionDomAction extends IThrustConventionProperties, IThrustConventionIgnite, IThrustConventionReady, IThrustConventionStop {}

    var methods : IThrustConventionDomAction = {
        properties: [ACTIONS],
        ignite: function(thrust: IThrust): Promise
        {
        	var actionHandler = ActionHandler.getFor(thrust.name);
        	$(window.document.body).on('click.' + ACTIONS, 'a, button, input[type="button"], input[type="submit"]', actionHandler.callbackFor('click', false));
            return null;
        },
        ready: function (facade : IThrustDomFacade, mod: IThrustModule) : Promise
        {
            var actions = mod.convention(ACTIONS),
				actionHandler = ActionHandler.getFor(mod.thrust.name),
                dom = facade,
                moduleInstance = mod.instance;

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
                        actionHandler.register.apply(actionHandler, args);
                    }
                }
            }
            return null;
        },
        stop: (facade : IThrustDomFacade, mod: IThrustModule) : Promise
        {
            var actions = mod.convention(ACTIONS),
				actionHandler = ActionHandler.getFor(mod.thrust.name),
				moduleInstance = mod.instance;

            if (actions)
            {
                for (var actionEvent in actions)
                {
                    var actionCollection = actions[actionEvent];
                    for (var actionName in actionCollection)
                    {
                        actionHandler.unregister(actionEvent, actionName);
                    }
                }
            }
            return null;
        }
    };
    export var action = new Convention(methods);