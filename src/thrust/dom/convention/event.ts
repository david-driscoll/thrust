/// <reference path="../../interfaces/dom/convention/event.d.ts" />
/// <reference path="../../interfaces/mediator/mediator.d.ts" />
/// <reference path="../../interfaces/dom/dom.d.ts" />
/// <reference path="../../interfaces/thrust.d.ts" />
/// <reference path="../../../../lib/DefinitelyTyped/requirejs/require.d.ts" />

// Disabled until TS supports module per file in some way (ie exports is exports.<export> not  exports.moduleName.<export>)
/*export module instance {*/

'use strict';
import c = module('thrust/convention');
var Convention = c.Convention;

import util = module('thrust/util');
var _ = util._;

var CONTEXT = 'config.dom.context',
    EVENTS = 'config.dom.events',
    isFunction = _.isFunction,
    isString = _.isString,
    isArray = _.isArray;

/**
@module thrust.dom
@submodule thrust.dom.convention
**/

/**
* # __thrust/dom__ Convention - Events
*
* The dom events convention, allows you to automatically bind events for your module.  Using this module you can bind common events like
* mouse over, click, etc, to a method or handler.
*
* The definition can accept all of the following:
*
*     {
*         name: 'actionName',
*         handler: Function, the function to be invoked.
*         moduleHandler: string name of the property on the module that contains this function.
*         context: context to call the function with (this will override the default context set by the underling dom engine)
*         selector: Optional the deglegate selector to apply for this event.
*         data: Optional data that will be available in the event object.
*     }
*
*
* The definitions also accept a short hand array:
*
*     [{, selector} {, data}, handler {, context}]
*    
* The following is an example of the events block in your module...
*
*     config: {
*         dom: {
*             events: {
*                 'click': [{
*                     handler:  function()
*                     {
*                         alert('My awesome alert here!');
*                     }
*                 }],
*                 'focus': [{
*                     moduleHandler: 'mouseOver',
*                 },{
*                     selector: 'li',
*                     handler: function()
*                     {
*                         alert('Test function');
*                     },
*                 },['actionString', someObject]
*                 }]
*             }
*         }
*     },
*     actionString: function()
*     {
*         alert('My awesome alert here!');
*     }
*
*
* @for thrust.dom.convention
* @property events
**/
interface IThrustConventionDomEvent extends IThrustConvention.Properties,
    IThrustConvention.Plugin.Ready.Void,
    IThrustConvention.Plugin.Stop.Void {}

interface IDomEventPrivate extends IDomEvent {
    $context?: TQuery;
}

var eventPropertyLoadOrder = ['selector', 'data', 'handler'];

var methods: IThrustConventionDomEvent = {
    properties: [EVENTS],
    ready: function (mod: IThrustModule, facade: IThrustDomFacade): void {
        var events: IDomEventsConfig = mod.convention(EVENTS),
            $context = facade.context,
            moduleInstance = mod.instance;

        if (events) {
            _.forIn(events, function (eventsCollection, event) {
                //var eventsCollection = events[event];
                if (!isArray(eventsCollection))
                    eventsCollection = [<any> eventsCollection];
                else if (eventsCollection.length && (!isArray(eventsCollection[0]) || isString(eventsCollection[0])))
                    eventsCollection = [<any> eventsCollection];

                _.each(eventsCollection, function (definition: IDomEventPrivate) {
                    var bindEvent = <any[]> [event];

                    if (isArray(definition)) {

                        bindEvent.push.apply(bindEvent, definition);
                        // We have one edgecase here
                        // If the short hand array, has a context that is a string or function
                        // and it doesnt have information for both selector and data, this will fail
                        // We can recover when all 5 possible items are defined.
                        var handler = bindEvent[bindEvent.length - 1];

                        // We were asked for a method on the module.
                        if (isString(handler) && bindEvent.length === 2) {
                            bindEvent[bindEvent.length - 1] = mod.instance[handler];
                        }
                            // We didnt find a function :(
                            //  EDGE CASE: If context is a function, we will assume all is well
                            //              Even if the handler is a string that needs to be referenced.
                            // Work arrounds:
                            //      Shorthand: add null/empty values for selector and data
                            //      Longhand: switch to long hand as it has more explicit syntax.
                        else if (!isString(handler) && !isFunction(handler) && bindEvent.length > 2 || bindEvent.length === 5) {
                            handler = bindEvent[bindEvent.length - 2];
                            if (isString(handler))
                                bindEvent[bindEvent.length - 2] = mod.instance[handler];

                            bindEvent[bindEvent.length - 2] = _.bind(bindEvent[bindEvent.length - 2], bindEvent.pop());
                        }
                        else if (isString(handler)) {
                            bindEvent[bindEvent.length - 1] = mod.instance[handler];
                        }
                    }
                    else {
                        _.each(eventPropertyLoadOrder, function (x) {
                            if (definition[x]) {
                                var value = definition[x];
                                if (x === 'handler' && definition.context)
                                    value = _.bind(value, definition.context);

                                bindEvent.push(value);
                            }
                        })
                    }

                    // Call the on method, with our arguments.
                    $context.on.apply($context, bindEvent);
                })
            })
        }
    },
    stop: function (mod: IThrustModule, facade: IThrustDomFacade): void {
        var events: IDomEventsConfig = mod.convention(EVENTS),
            $context = facade.context;

        if ($context)
            $context.off();
    }
};
export var event = new Convention(methods);