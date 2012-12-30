/// <reference path="../../interfaces/mediator/mediator.d.ts" />
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

    var CONTEXT    = 'context',
        EVENTS     = 'events',
        isFunction = _.isFunction,
        isString   = _.isString,
        isArray    = _.isArray;

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
    * * `function()` - This function will be run when the event is invoked.
    * * `string` - This string must point at a function, that exists on the module definition.
    * * `[function(), context]` - Where the context is the context that the function will be called with.
    * * `[string, context]` - Where the context is the context that the function will be called with.
    * * `[selector, function(), context]` - Where the selector is a jquery delegate selector.
    * * `[selector, string, context]` - Where the selector is a jquery delegate selector.
    *
    *
    * The following is an example of the events block in your module...
    *
    *
    *      events: {
    *          'focus': function() { alert('Test Function'); },
    *          'mouseover': 'mouseOver',
    *          'click': ['li', function() { alert('Test function'); }]
    *      },
    *      mouseOver: function() { alert('Test Function'); },
    *
    * @for thrust.dom.convention
    * @property events
    **/
    interface IThrustConventionDomEvent extends IThrustConventionProperties,
		IThrustConventionReady,
        IThrustConventionStop {}

    var methods: IThrustConventionDomEvent = {
        properties: [EVENTS],
        ready: function (facade: IThrustDomFacade, mod: IThrustModule): Promise
        {
            var events          = mod.convention(EVENTS),
                optionalContext = mod.convention(CONTEXT),
                dom             = optionalContext ? facade.query(optionalContext) : facade,
                moduleInstance  = mod.instance;

            if (events)
            {
                for (var event in events)
                {
                    var definition = events[event],
                        bindEvent;

                    if (isFunction(definition))
                    {
                        bindEvent = [event, definition];
                    }
                    // If the event method is a string, we search to verify that module method exists on the given module
                    //        then bind it, with the proper context.
                    else if (isString(definition))
                    {
                        bindEvent = [event, moduleInstance[definition]];
                    }
                        // If the event module is an array, we apply the array as if it were a direct call to subscribe, by pushing the event name on the front.
                    else if (isArray(definition))
                    {
                        bindEvent = definition;
                        for (var i = 0, iLen = definition.length; i < iLen; i++)
                        {
                            if (isString(definition[i]) && moduleInstance[definition[i]])
                            {
                                definition[i] = moduleInstance[definition[i]];
                            }
                        }
                        bindEvent.unshift(0);
                    }
                    // Call the on method, with our arguments.
                    dom.on.apply(dom, bindEvent);
                }
                //Save a reference of the context, for later unbinding.
                events.context = (<any> dom)._context[0];
            }
            return null;
        },
        stop: function (facade: IThrustDomFacade, mod: IThrustModule): Promise
        {
            var events = mod.convention(EVENTS),
                dom = facade;

            if (events)
            {
                dom.changeContext(events.context);
                delete events.context;

                if ((<any> dom)._context)
                    dom.off();
            }
            return null;
        }
    };
	export var event = new Convention(methods);