define([
    'jquery',
    'thrust/util',
    'thrust/log',
    './jquery.interface',
    'thrust/facade',
    'thrust/events',
    'has',
    'thrust/instance',
    './config'
],
function (jQuery, util, log, jQueryInterface, facade, events, has, instance, config)
{
    'use strict';
    //#region Variable declaration
    var format                   = util.format,
        extend                   = util.extend,
        type                     = util.type,
        bind                     = util.bind,
        proxy                    = util.proxy,
        hasOwn                   = Object.prototype.hasOwnProperty,
        isObject                 = util.isObject,
        slice                    = Array.prototype.slice,
        when                     = util.when,
        initalizeContext         = jQueryInterface.initalizeContext,
        updatejQueryInternals    = jQueryInterface.updatejQueryInternals,
        updateThrustDomPrototype = jQueryInterface.updateThrustDomPrototype,
        GLOBAL                   = '.global',
        Dom, DomMethods, DomPrototype;
    //#endregion

    //#region DomFacade
    var DomFacade = facade.createFacade(function (module, parent, context, fake)
    {
        this.name = parent.name;
        //this.module = module;
        //this.parent = parent;
        this.__conventions = parent.__conventions;
        this.namespace = parent.namespace;
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
            has('DEBUG') && log.info(format('Dom[{0}]: Changing Dom context', this.namespace || GLOBAL));
            updatejQueryInternals.call(this, selector);
            return this;
        },
        on: function (events)
        {
            has('DEBUG') && log.debug(format('Dom[{0}]: Binding events...', this.namespace || GLOBAL));
            var args = slice.call(arguments);
            args[0] = normalizeEvents(events, this.namespace || GLOBAL);
            this._context.on.apply(this._context, args);
            return this;
        },
        one: function (events)
        {
            has('DEBUG') && log.debug(format('Dom[{0}]: Binding one events...', this.namespace || GLOBAL));
            var args = slice.call(arguments);
            args[0] = normalizeEvents(events, this.namespace || GLOBAL);
            this._context.one.apply(this._context, args);
            return this;
        },
        off: function (events)
        {
            has('DEBUG') && log.debug(format('Dom[{0}]: Unbinding events...', this.namespace || GLOBAL));
            var args = slice.call(arguments);
            args[0] = normalizeEvents(events, this.namespace || GLOBAL);
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

        var that = this;
        instance.fetchInstance(name).then(function (thrust)
        {
            var module = {},
                facade = that.createFacade(thrust, module, {});

            that.query = that.$ = that.find = module.$;
        });
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

    Dom.config = config;

    return Dom;
});
