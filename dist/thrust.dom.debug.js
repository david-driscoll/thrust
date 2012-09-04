/*! Thrust JS Framework - v0.1.0 - 2012-09-03
* thrust-home
* Copyright (c) 2012 David Driscoll; Licensed MIT */


define('thrust/dom/jquery.interface',['jquery'],
function (jQuery)
{
    var jQueryMethodBlackList = ['constructor', 'init', 'selector', 'jquery', 'ready', 'extend', 'queue', 'dequeue', 'clearQueue', 'promise', 'bind', 'unbind', 'live', 'die', 'delegate', 'undelegate', 'blur', 'focus', 'focusin', 'focusout', 'load', 'resize', 'scroll', 'unload', 'click', 'dblclick', 'mousedown', 'mouseup', 'mousemove', 'mouseover', 'mouseout', 'mouseenter', 'mouseleave', 'change', 'select', 'submit', 'keydown', 'keypress', 'keyup', 'error', 'domManip', 'serialize', 'serializeArray', 'ajaxStart', 'ajaxStop', 'ajaxComplete', 'ajaxError', 'ajaxSuccess', 'ajaxSend', '_toggle', 'fadeTo', 'stop', 'slideDown', 'slideUp', 'slideToggle', 'fadeIn', 'fadeOut', 'fadeToggle', 'on', 'off', 'one'],
        slice = Array.prototype.slice;

    //#region jQuery Interface Layer
    var updatejQueryInternals = function (selector)
    {
        if (selector)
            this._context = jQuery(selector);
        this.context = this._context.context;
        this.selector = this._context.selector;

        for (var i = this.length || 0, iLen = this._context.context; i < iLen; i++)
            delete this[i];

        this.length = this._context.length;
        for (var i = 0, iLen = this.length; i < iLen; i++)
            this[i] = this._context[i];
    },
        initalizeContext = function (context)
        {
            this._context = context instanceof jQuery ? context : jQuery(context);
            updatejQueryInternals.call(this);
        },
        jQueryMethodWrap = function (method, DomFacade)
        {
            return function ()
            {
                var args = slice.call(arguments);
                for (var i = 0, iLen = args.length; i < iLen; i++)
                    if (args[i] instanceof DomFacade)
                        args[i] = args[i]._context;

                if (this._context)
                {
                    var ret = this._context[method].apply(this._context, args);

                    if (ret instanceof jQuery)
                    {
                        if (ret.selector === this.selector && ret.context === this.context)
                        {
                            updatejQueryInternals.call(this, ret);
                            return this;
                        }
                        return new DomFacade(this.module, this, ret, true);
                    }
                    updatejQueryInternals.call(this);
                    return ret;
                }
            };
        },
        updateThrustDomPrototype = function (proto, DomFacade)
        {
            /*jshint loopfunc:true */
            for (var i in jQuery.fn)
                if (Object.hasOwnProperty.call(jQuery.fn, i) && !proto[i] && !jQueryMethodBlackList.some(function (e, index) { return e === i; }))
                    proto[i] = jQueryMethodWrap(i, DomFacade);
            proto.$ = proto.find;
        };
    //#endregion

    return {
        updatejQueryInternals: updatejQueryInternals,
        updateThrustDomPrototype: updateThrustDomPrototype,
        initalizeContext: initalizeContext
    };
});
define('thrust/dom/main',[
    'jquery',
    'thrust/util',
    'thrust/log',
    './jquery.interface',
    'thrust/facade',
    'thrust/events',
    'has'
],
function (jQuery, util, log, jQueryInterface, facade, events, has)
{
    
    //#region Variable declaration
    var format                   = util.format,
        extend                   = util.extend,
        type                     = util.type,
        bind                     = util.bind,
        proxy                    = util.proxy,
        hasOwn                   = Object.prototype.hasOwnProperty,
        isObject                 = util.isSimpleObject,
        slice                    = Array.prototype.slice,
        when                     = util.when,
        initalizeContext         = jQueryInterface.initalizeContext,
        updatejQueryInternals    = jQueryInterface.updatejQueryInternals,
        updateThrustDomPrototype = jQueryInterface.updateThrustDomPrototype,
        Dom, DomMethods, DomPrototype;
    //#endregion

    //#region DataFacade
    var DomFacade = facade.createFacade(function (module, parent, context, fake)
    {
        this.name = parent.name;
        //this.module = module;
        //this.parent = parent;
        this.__conventions = parent.__conventions;
        //this._callbacks = parent._callbacks;
        //this.initEvents();

        // We're building a dom selector, aka jquery wrapper
        if (context && fake)
        {
            // Reference the parent module.
            this._parentDom = parent._parentDom;
            if (this._parentDom)
            {
                // Init the context
                initalizeContext.call(this, context);
            }
        }
        else
        {
            has('DEBUG') && log.debug('Dom: Creating new Dom facade');
            this._parentDom   = this;
            this._rootContext = true;

            this.changeContext(document);

            createFacade(this);
            this._internalEvents = [];
        }
    });
    util.extend(DomFacade.fn, {
        init: function (fake)
        {
            this._internalEvents = this._internalEvents || [];
            has('DEBUG') && log.debug(format('Dom[{0}]: Initalizing {1}Dom facade', this.namespace, fake ? 'fake ' : ''));
            return this;
        },
        start: function ()
        {
            has('DEBUG') && log.debug(format('Dom[{0}]: Starting Dom facade', this.namespace));
        },
        stop: function ()
        {
            has('DEBUG') && log.debug(format('Dom[{0}]: Stopping Dom facade', this.namespace));

            for (var i = this._internalEvents.length - 1; i >= 0; i--)
            {
                var sub = this._internalEvents[i];
                this._internalEvents.splice(i, 1);
                this.changeContext(sub.context);
                this.off.apply(this, (util.isArray(sub)) ? sub : (util.isArray(sub.args)) ? sub.args : []);
            }
        },
        destroy: function ()
        {
            if (this._rootContext)
            {
                has('DEBUG') && log.debug(format('Dom[{0}]: Destroying Dom facade', this.namespace));
                delete this._internalEvents;
            }

            this._context = null;
            delete this._context;
        }
    });
    //#endregion

    var createFacade = function (dom)
    {
        if (!dom.query)
            dom.query = bind(function (context)
            {
                if (typeof context !== 'undefined')
                    return new DomFacade(dom.module, dom, context, true);
                return dom;
            }, dom);
        return dom.query;
    };

    var normalizeEvents = function (events, namespace)
    {
        if (isObject(events))
        {
            for (var i in events)
            {
                events[i + namespace] = events[i];
                delete events[i];
            }
            return events;
        }
        else
        {
            if (!events)
                return namespace;

            events = events.split(' ');
            for (var i = 0, iLen = events.length; i < iLen; i++)
            {
                events.push(events[i] + namespace);
            }
            return events.slice(events.length / 2).join(' ');
        }
    };

    DomPrototype = {
        changeContext: function (selector)
        {
            has('DEBUG') && log.info(format('Dom[{0}]: Changing Dom context', this.namespace));
            updatejQueryInternals.call(this, selector);
            return this;
        },
        on: function (events)
        {
            has('DEBUG') && log.debug(format('Dom[{0}]: Binding events...', this.namespace));
            var args = slice.call(arguments);
            args[0] = normalizeEvents(events, this.namespace);
            this._context.on.apply(this._context, args);
            return this;
        },
        one: function (events)
        {
            has('DEBUG') && log.debug(format('Dom[{0}]: Binding one events...', this.namespace));
            var args = slice.call(arguments);
            args[0] = normalizeEvents(events, this.namespace);
            this._context.one.apply(this._context, args);
            return this;
        },
        off: function (events)
        {
            has('DEBUG') && log.debug(format('Dom[{0}]: Unbinding events...', this.namespace));
            var args = slice.call(arguments);
            args[0] = normalizeEvents(events, this.namespace);
            this._context.on.apply(this._context, args);
            return this;
        }
    };

    updateThrustDomPrototype(DomPrototype, DomFacade);
    util.extend(DomFacade.fn, DomPrototype);
    DomFacade.fn.$ = DomFacade.fn.find;

    //#region Dom
    Dom = function (name, mediator)
    {
        /// <summary>The Dom</summary>
        // Enforce new
        if (!(this instanceof Dom))
            return new Dom(name, mediator);

        if (!name)
            throw new Error('Dom: module name must be defined.');

        has('DEBUG') && log.debug('Data: Creating new Data');

        this.mediator = mediator;
        this._callbacks = this.mediator._callbacks;
        this.initEvents();
        this.name = name;
    };

    Dom.prototype = Dom.fn = util.extend({}, DomPrototype,
    {
        createFacade: function (thrust, module, facades)
        {
            if (module.dom && !(facades.dom instanceof DomFacade)) throw new Error('"dom" is a reserved property');

            var dom;
            if (facades.dom)
            {
                facades.dom.updateFacade(module, this, document);
                dom = facades.dom;
            }
            else
            {
                dom = facades.dom = new DomFacade(module, this, document);
                module.dom = module.$ = dom.query;
                module.dom.$ = module.dom.find = function (selector)
                {
                    return dom.find(selector);
                };
            }
            return dom;
        }
    }, events);

    //#endregion

    return Dom;
});

define('thrust/dom', ['thrust/dom/main'], function (main) { return main; });

define('thrust/dom/convention/action',[
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
define('thrust/dom/convention/context',['thrust/convention', '../jquery.interface'],
function (Convention, jQueryInterface)
{
    var CONTEXT         = 'context',
        updatejQueryInternals = jQueryInterface.updatejQueryInternals;

    /**
    @module thrust.dom
    @submodule thrust.dom.convention
    **/

    /**
    * # __thrust/dom__ Convention - Context
    *
    * The context convention allows you to specific a selector for your module.  This selector can be anything that is compatable with jQuerys Sizzle engine.
    *
    * Then the default context of your modules `dom()` / `$()` will be that selector.  In addition any internal find `dom.find` / `dom.$` / `$.find` / `dom.$`,
    * will also have the selector as the root context.
    *
    *
    *     {
    *         context: '#myDiv'
    *     }
    *
    *
    *
    * @for thrust.dom.convention
    * @property context
    **/
    return new Convention({
        properties: [CONTEXT],
        ready: function (facade, module)
        {
            var context = module.convention(CONTEXT),
                dom     = facade;

            if (context)
            {
                updatejQueryInternals.call(dom, context);
            }
        }
    });
});
define('thrust/dom/convention/event',[
    'thrust/convention',
    'thrust/util'
],
function (Convention, util)
{
    var CONTEXT    = 'context',
        EVENTS     = 'events',
        isFunction = util.isFunction,
        isString   = util.isString,
        isArray    = util.isArray;

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
    return new Convention({
        properties: [EVENTS],
        ready: function (facade, module)
        {
            var events          = module.convention(EVENTS),
                optionalContext = module.convention(CONTEXT),
                dom             = optionalContext ? facade.query(optionalContext) : facade,
                moduleInstance  = module.instance;

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
                events.context = dom._context[0];
            }
        },
        stop: function (facade, module)
        {
            var events = module.convention(EVENTS),
                dom = facade;

            if (events)
            {
                dom.changeContext(events.context);
                delete events.context;

                if (dom._context)
                    dom.off();
            }
        }
    });
});