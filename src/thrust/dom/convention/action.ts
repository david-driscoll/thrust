/// <reference path="../../interfaces/dom/convention/action.d.ts" />
/// <reference path="../../interfaces/dom/dom.d.ts" />
/// <reference path="../../interfaces/thrust.d.ts" />
/// <reference path="../../../../lib/DefinitelyTyped/requirejs/require-2.1.d.ts" />

// Disabled until TS supports module per file in some way (ie exports is exports.<export> not  exports.moduleName.<export>)
/*export module instance {*/

	'use strict';
	export import c = module('thrust/convention');
	var Convention = c.Convention;

	import util = module('thrust/util');
	var _ = util._;

	import subjquery = module('../subjquery');
	var $ = subjquery.tQuery;

    var format     = util.format,
        ACTIONS    = 'config.dom.actions',
        ACTIONSSINGLE = 'actions',
        STRING     = 'string',
		REGISTRATIONS = '_registrations',
        isFunction = _.isFunction,
        isString   = _.isString,
        isArray    = _.isArray;

    var getActionAttribute = function (eventName) { return 'data-action-' + eventName; };

        class ActionHandler implements IThrustDomActionHandler
    {
    	public events: IThrustDomActionHandlerEventCollection = {};
    	public register(eventName: string, actionName: string, action : IDomActionEvent): void
    	{
    		var events = this.events;
			if (!events[eventName])
    			events[eventName] = {};

    		if (!events[eventName][actionName])
    		{
    			events[eventName][actionName] = action;
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
				actionAttribute = getActionAttribute(eventName),
				returnResultsDefined = typeof returnResults !== 'undefined';

    		return function ()
    		{
    			var attributeValue = $(this).attr(actionAttribute);
    			if (typeof attributeValue === STRING)
    			{
    				var action = events[eventName][attributeValue];
    				if (action)
    					action.handler.apply(action.context || this, arguments);
    				if (returnResultsDefined)
    					return returnResults;
    				return false;
    			}
    		};
    	}

    	public static actionHandlers: IThrustDomActionHandlerCollection = {};
    	public static getFor(name: string) : IThrustDomActionHandler
    	{
			if (this.actionHandlers[name])
				return this.actionHandlers[name];
			return (this.actionHandlers[name] = new ActionHandler());
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
	* * `dblclick`
	* * `mouseenter`
	* * `mouseleave`
	* * `focus`
	* * `blur`
    *
    * NOTE: More events will be added when they make sense to add them.
    *
    *
    * The definitions accept an object with the following format.
	*
	*     {
	*         name: 'actionName',
	*         handler: {Function|string of Function name on the module}
	*         context: context to call the function with.
	*     }
    *
    * The definitions also accept a short hand array:
    *
    *     [name, handler {, context}]
    *
    *
    * The definition that is used to define an action is below...
    *
    * NOTE: The below is written as if it were part of a module definition.
    *
    *
    *     config: {
    *         dom: {
	*             actions: {
    *                'click': [{
	*                     name: 'doFunction',
	*                     handler:  function()
    *                     {
    *                          alert('My awesome alert here!');
    *                     }
	*                 },['doString','actionString'],
	*                 },{
    *                     name: 'doContextFunction'
	*                     handler: function()
    *                     {
    *                         alert('My awesome alert here!');
    *                     },
	*                     context: someObject
	*                 },{
    *                     name: 'doString',
	*                     handler: 'actionString',
	*                     context: someObject
    *                 }]
    *             }
    *         }
    *     },
    *     actionString: function()
    *     {
    *         alert('My awesome alert here!');
    *     }
    *
    * To utlize the action, simply add a `data-action-{event}` attribute, with the name of the action as the value to any of the following elements:
    *
	* * click/dblclick:
    * ** `a`
    * ** `button`
    * ** `input[type="button"]`
    * ** `input[type="submit"]`
	* * mouseenter/mouseleave:
	* ** <any>
	* * focus/blur:
	* ** input
    *
    * @for thrust.dom.convention
    * @property actions
    **/
    interface IThrustConventionDomAction extends IThrustConvention.Properties,
        IThrustConvention.Ignite.Void,
        IThrustConvention.Deorbit.Void,
        IThrustConvention.Plugin.Ready.Void,
        IThrustConvention.Plugin.Stop.Void {}

    var events = {
		click: ['a', 'button', 'input[type="button"]', 'input[type="submit"]'],
		dblclick: ['a', 'button', 'input[type="button"]', 'input[type="submit"]'],
		mouseenter: [''],
		mouseleave: [''],
		focus: ['input'],
		blur: ['input'],
    }

    var arrayShortHandArgsInOrder = ['name', 'handler', 'context'];

    var methods : IThrustConventionDomAction = {
        properties: [ACTIONS],
        ignite: function(thrust: IThrust): void
        {
        	var actionHandler = ActionHandler.getFor(thrust.name);
        	thrust.dom.actionHandler = actionHandler;

        	var $body = $(window.document.body);
        	_.each(events, function (eventSelectors : string[], eventName : string)
        	{
                // using thrust name, as callback needs to be per thrust instance
                // in the event of multiple thrust instances.
				$body.on(eventName + '.' + ACTIONSSINGLE + thrust.name,
					eventSelectors.join(getActionAttribute(eventName) + ', '),
					actionHandler.callbackFor(eventName, true)
				);
        	});
        },
        deorbit: function(thrust: IThrust): void
        {
        	var actionHandler = ActionHandler.getFor(thrust.name);

        	var $body = $(window.document.body);
        	_.each(events, function (eventSelectors : string[], eventName : string)
        	{
        	    $body.off('.' + ACTIONSSINGLE + thrust.name);
        	});
        },
        ready: function (mod: IThrustModule, facade : IThrustDomFacade) : void
        {
            var actions : IDomActionsConfig = mod.convention(ACTIONS),
				actionHandler = ActionHandler.getFor(mod.thrust.name),
                dom = facade,
                moduleInstance = mod.instance;

            if (actions)
            {
            	_.forOwn(actions, function (actionCollection: IDomActionEvent[], eventName : string)
            	{
                    if (!isArray(actionCollection))
                        actionCollection = [<any> actionCollection];
                    else if (actionCollection.length && (!isArray(actionCollection[0]) || isString(actionCollection[0])))
                        actionCollection = [<any> actionCollection];

            		_.each(actionCollection, function (action : IDomActionEvent)
            		{
            		    if (isArray(action))
            		    {
            		        var newAction : IDomActionEvent = { name: undefined };
            		        _.each(arrayShortHandArgsInOrder, function (x, i)
            		        {
                                if (x === 'handler' && isString(action[i]))
                                    action[i] = mod.instance[action[i]];
            		            newAction[x] = action[i];
            		        });
            		        action = newAction;
            		    }
            		    
                        var actionName = action.name;
                        if (!action.handler && action.moduleHandler)
                            action.handler = mod.instance[action.moduleHandler];
                        else if (!action.handler)
                            throw new Error('Must define either a handler or module handler.')

            		    actionHandler.register(eventName, actionName, action);
            		})
            	})
            }
        },
        stop: (mod: IThrustModule, facade : IThrustDomFacade) : void
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
        }
    };
    export var action = new Convention(methods);