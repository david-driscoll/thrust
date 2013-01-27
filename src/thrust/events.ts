/// <reference path="interfaces/mediator/mediator.d.ts" />
/// <reference path="interfaces/thrust.d.ts" />
/// <reference path="../../lib/DefinitelyTyped/requirejs/require.d.ts" />

// Disabled until TS supports module per file in some way (ie exports is exports.<export> not  exports.moduleName.<export>)
/*export module instance {*/

    'use strict';
    //     Backbone.js 0.9.1
    //     (c) 2010-2012 Jeremy Ashkenas, DocumentCloud Inc.
    //     Backbone may be freely distributed under the MIT license.
    //     For all details and documentation:
    //     http://backbonejs.org

    /**
    Thrust Events are based off of the Backbone event model, with special additions.

    * Events can be fired asyncronously.
    * Events can be namespaced.

    @module thrust
    **/

    import log = module('./log');
    import tConfig = module('./config');
    import has = module('has');
    import util = module('thrust/util')
    var _ = util._;

    export class EventNode implements IEventNode {
        public tail: IEventNode;
        public next: IEventNode;
        public callback: Function;
        public context: any;
        public namespace: string;
        public once: bool;

        constructor() {
        	this.tail = null;
            this.next = null;
            this.callback = null;
            this.context = null;
            this.namespace = '';
            this.once = false;
        }
    }

    var createAsyncEvent = (object : any) : IAsyncEvent => {
        var f : any = function f(events : string, ...args : any[]) : any
        {
            _trigger.apply(object, [false].concat(slice.call(arguments)));
            return object;
        };

        f.async = function(events : string, ...args : any[]) : any
        {
            _trigger.apply(object, [true].concat(slice.call(arguments)));
            return object;
        };

        return f;
    }

    var slice  = Array.prototype.slice,
        asyncFire,
        noop   = util.noop,
        when   = util.when,
        size   = _.size,
        each   = _.each,
        defer  = _.defer,
        bind   = _.bind,
        extend = _.extend,
        format = util.format;

    var eventSplitter = /\s+/, ALL = 'all', STARALL = '*all';
    /**
    Normalizes the given events to the expected namespace.

    @method normalizeEvents
    @private
    @param {String} events The events delimited by a space
    @param {String} namespace The namespace, including prefixed '.'
    **/
    function normalizeEvents(events : string, namespace : string)
    {
        var eventsArray = events.split(eventSplitter);
        for (var i = 0, iLen = eventsArray.length; i < iLen; i++)
        {
            if (eventsArray[i].indexOf('.') === -1)
                eventsArray[i] = eventsArray[i] + namespace;
        }
        return eventsArray.join(' ');
    }

    /**
    Trigger one or many events, firing all bound callbacks. Callbacks are
    passed the same arguments as `trigger` is, apart from the event name
    (unless you're listening on `"all"`, which will cause your callback to
    receive the true name of the event as the first argument).

    @method _trigger
    @private
    @param {Boolean} async Fire event async or sync
    @param {Object} events The events to be fired.
        delimited by a space.
    @param [args]* The arguments to pass onto the callback methods.
    @returns If async then returns a Promise, where the first argument contains all the returned values, as an array
             If sync then returns an array of the return values.
             If more than one event, returns an object of arrays or promises, with the key for each event.
    **/
    function _trigger(async : bool, events : string)
    {
		/*jshint validthis:true */
        var that = this, event, node, calls, tail, args, all, rest, namespace, onceNodes;
        if (!(calls = this._callbacks)) return that;
        all = calls.all;
        var eventsArray = events.split(eventSplitter);
        rest = slice.call(arguments, 2);

        while (event = eventsArray.shift())
        {
            if (node = calls[event])
            {
                triggerNodes(that, event, async, node, rest);
            }
            if (node = all)
            {
                triggerNodes(that, ALL, async, node, [event].concat(rest));
            }
        }
    }

    /**
    Triggers all events on a node.
    Also unbinds any node that is set to only be called once.

    @method triggerNodes
    @private
    @param {Object} that The event container context.
    @param {String} event The event to be bound or unbound.
    @param {Boolean} async Fire event async or sync
    @param {Object} node The node linked list.
    @param {Array} args The arguments to pass onto the triggered nodes

    **/
    function triggerNodes(that : any, event : string, async : bool, nodeList : IEventNode[], args : any[])
    {
        var tail, onceNodes : IEventNode[] = [];

        has('DEBUG') && log.info(format('{0}: triggering {1} event "{2}"', that.__pubSubName, async && 'async' || '', event));

        each(nodeList, function (node : IEventNode)
        {
            tail = node.tail;
            while ((node = node.next) !== tail)
            {
                triggerCallback(async, node.callback, node.context || that, args);
                node.once && onceNodes.push(node);
            }
        });
        if (onceNodes.length) each(onceNodes, function (x) { that.unsubscribe(event, x.callback, x.context, x.namespace); });
    }

    /**
    Invokes a trigger callback

    @method triggerCallback
    @private
    @param {Boolean} async Fire event async or sync
    @param {Function} callback The callback method
    @param {Object} context The calling context
    @param {Array} args The arguments to call the callback with.
    @returns {Object} The returned value.
        For async calls, this is a promise
        For sync calls this is the value from the method.
    **/
    function triggerCallback(async : bool, callback : Function, context : any, args : any[])
    {
    	if (async)
    	{
    		defer(triggerAsyncCallback(callback, context, args), 0);
    	}
    	else
    	{
    		try { return callback.apply(context, args); }
            catch (e) { if (tConfig.throwErrors) throw e; }
    	}
    }

    /**
    Creates an async event handler

    @method asyncEventFactory
    @private
    @param {Function} callback The callback method
    @param {Object} that The calling context
    @param {Array} args The arguments to call the callback with.
    @returns {Function} The callback for the given arguments.
    **/
    function triggerAsyncCallback(callback : Function, context : any, args : any[])
    {
        return function ()
        {
            return callback.apply(context, args);
        };
    }

    /**
    Resubscribes to the appropriate events

    @method _offProcessNode
    @private
    @param {Object} that The event context
    @param {String} event The event
    @param {Object} node The node linked list.
    @param {Function} [callback] The event callback to unsubscribe
    @param {Object} [context] The event context to unsubscribe
    @param {String} [namespace] The namespace to unsubscribe
    **/
    function _offProcessNode(that : any, event : string, node : IEventNode, callback : Function, context : any)
    {
        var tail, cb, ctx, ns;
        tail = node.tail;
        while ((node = node.next) !== tail)
        {
            cb = node.callback;
            ctx = node.context;
            ns = node.namespace;
            if ((callback && cb !== callback) || (context && ctx !== context))
            {
                that.subscribe(event + (ns && ('.' + ns) || ''), cb, ctx);
            }
        }
    }

    /**
    Gets the namespace information, the real event to pass back onto the methods.

    @method getNamespaceData
    @private
    @param {String} event The event to capture namespace data from.
    @returns {Object} Containing event and namespace.
    **/
    function getNamespaceData(event : string)
    {
        var nsIndex = (event || '').indexOf('.'),
            hasNs = nsIndex > -1,
            namespace = hasNs ? event.substring(nsIndex + 1) : undefined,
            event = hasNs ? event.substring(0, nsIndex) : event;

        if (nsIndex === 0)
            event = STARALL;

        return { event: event, namespace: namespace };
    }

    /**
    Thrust Events are based off of the Backbone event model, with special additions.

    * Events can be fired asyncronously.
    * Events can be namespaced.

    @class thrust.Events
    **/
    export var Events : IEventManager = (function() {
        var events : any = {
            /**
            Bind one or more space separated events, `events`, to a `callback`
            function. Passing `"all"` will bind the callback to all events fired.
    
            @method subscribe
            @param {String} events Spave seperated events
            @param {Function} callback The callback method to be called when the events are fired.
            @param {Object} context The context to bind the calling function to.
            @param {Boolean} once Call this event only once.
            @chainable
            **/
            subscribe: function(events: string, callback: Function, context?: any, once?: bool) {
                var calls, event, node, tail, list, nd;
                this.__namespace && (events = normalizeEvents(events, this.__namespace));

                var eventsArray = events.split(eventSplitter);
                calls = this._callbacks || (this._callbacks = {});

                // Create an immutable callback list, allowing traversal during
                // modification.  The tail is an empty object that will always be used
                // as the next node.
                while (event = eventsArray.shift())
                {
                    nd = getNamespaceData(event);
                    event = nd.event;
                    list = calls[event] || (calls[event] = {});
                    list = list[nd.namespace];
                    node = list ? list.tail : new EventNode();
                    node.next = tail = new EventNode();
                    node.context = context || this.__defaultContext || undefined;
                    node.callback = callback;
                    if (nd.namespace)
                        node.namespace = nd.namespace;
                    if (once)
                        node.once = once;
                    calls[event][nd.namespace] = { tail: tail, next: list ? list.next : node };
                }

                return this;
            },
            /**
            Bind one or more space separated events, `events`, to a `callback`
            function. Passing `"all"` will bind the callback to all events fired.
    
            Each event will only be called once.
    
            @method once
            @param {String} events Spave seperated events
            @param {Function} callback The callback method to be called when the events are fired.
            @param {Object} context The context to bind the calling function to.
            @chainable
            **/
            once: function(events : string, callback : Function, context? : any) {
                return this.subscribe(events, callback, context, true);
            },
            /**
            Remove one or many callbacks. If `context` is null, removes all callbacks
            with that function. If `callback` is null, removes all callbacks for the
            event. If `event` is null, removes all bound callbacks for all events.
    
            @method unsubscribe
            @param {String} events Spave seperated events
            @param {Function} callback The callback method to be called when the events are fired.
            @param {Object} context The context to bind the calling function to.
            @chainable
            **/
            unsubscribe: function(events : string, callback : Function, context? : any) {
                var event, calls, node, nd, ourNs, namespace, that = this, hasNs;

                ourNs = that.__namespace; ourNs && (ourNs = ourNs.substring(1));
                // No events, or removing *all* events.
                if (!(calls = that._callbacks)) return;
                if (!(events || callback || context))
                {
                    if (!ourNs)
                        delete that._callbacks;
                    else
                    {
                        var cbs = that._callbacks;
                        for (var i in cbs)
                        {
                            delete cbs[i][ourNs];
                            if (size(cbs[i]) === 0) delete cbs[i];
                        }
                    }
                    return that;
                }

                // Loop through the listed events and contexts, splicing them out of the
                // linked list of callbacks if appropriate.
                ourNs && (events = normalizeEvents(events, that.__namespace));
                var eventsArray = events ? events.split(eventSplitter) : _.keys(calls);
                while (event = eventsArray.shift())
                {
                    nd = getNamespaceData(event);
                    event = nd.event;
                    namespace = nd.namespace;
                    hasNs = !!namespace;
                    if (!ourNs)
                    {
                        node = calls[event];
                        delete calls[event];
                    }
                    else if (calls[event])
                    {
                        node = calls[event][ourNs];
                        delete calls[event][ourNs];
                        if (size(calls[event]) === 0) delete calls[event];
                    }
                    if (!node || !(callback || context)) continue;

                    /*if (event !== STARALL)
                    {
                        node = calls[event];
                        delete calls[event];
                        if (!node) continue;
                    }*/
                    if (event !== STARALL && !callback)
                    {
                        _offProcessNode(that, event, node, callback, context);
                    }
                    else if (event === ALL || !callback)
                    {
                        for (var i in calls)
                        {
                            if (hasNs)
                            {
                                delete calls[i];
                            }
                            else
                            {
                                node = calls[i];
                                delete calls[i];
                                _offProcessNode(that, i, node, callback, context);
                            }
                        }
                    }
                    else
                    {
                        _offProcessNode(that, event, node, callback, context);
                    }
                }
                return that;
            },
            /**
                Trigger one or many events, firing all bound callbacks. Callbacks are
                passed the same arguments as `trigger` is, apart from the event name
                (unless you're listening on `"all"`, which will cause your callback to
                receive the true name of the event as the first argument).
            
                @method fire
                @param {Object} events The events to be fired.
                    delimited by a space.
                @param [args]* The arguments to pass onto the callback methods.
                @returns {Array of Values} If more than on event is fired, an Object of Arrays is returned.
            **/
            __pubSubName: 'Events',
            /**
            Init's the Event module.
            This is only required if you wish to use fire.async, and namespacing.
    
            @method initEvents
            @chainable
            **/
            initEvents: function (defaultContext? : any) {
                this.fire = this.publish = createAsyncEvent(this);
                this.initEvents = noop;
                this.__pubSubName = this.name || 'Events';
                if (this.name && !this.__namespace) this.__namespace = '.' + this.name;
                this.__defaultContext = defaultContext;

                return this;
            },
            /**
            Extends Events into the given object.
    
            @method extend
            @param {Object} to The object ot extend events onto
            @param {Boolean} [init] Optionally init the events.
            **/
            extend: function (to : any, init : bool) {
                _.extend(to, Events);
                delete to.extend;
                init && to.initEvents();
                return to;
            }
        };

        events.fire = events.publish = createAsyncEvent({});
        return events;
    })();

