/// <reference path="../../jquery.d.ts" />
/// <reference path="../../lib/DefinitelyTyped/requirejs/require-2.1.d.ts" />

// Disabled until TS supports module per file in some way (ie exports is exports.<export> not  exports.moduleName.<export>)
/*export module instance {*/

'use strict';
export import c = module('thrust/convention');
var Convention = c.Convention;
import util = module('thrust/util');
var _ = util._;
import eventTypes = module('./event.types');

    var camelCase   = util.camelCase,
        format      = util.format,
        bind        = _.bind,
        dataEvents  = eventTypes.event,
        slice       = Array.prototype.slice,
        memoize     = _.memoize;

    /**
    The event factory links jQuery Events up to thrust centric events.
    The event factory would be replaced if we were ever moved off of the jQuery dependancy.

    @module thrust.data
    **/

    var eventHandlers = {    // Supported event handlers
        'before-send' : true,
        'send'        : true,
        'error'       : true,
        'success'     : true,
        'complete'    : true,
        'start'       : true,
        'stop'        : true
    };

    /**
    Wraps beforeSend, which is a custom property on the jQuery ajax data call.

    @method beforeSendMethod
    @private
    **/
    export function beforeSendMethod(jqXHR : JQueryXHR, settings)
    {
		/*jshint validthis:true */
        this.fire(dataEvents['beforeSend'], jqXHR, settings);
    }

    var eventFactory = memoize(function (event)
    {
        var evt = dataEvents[event];
        return function ()
        {
            var args = slice.call(arguments, 0);
            args.unshift(evt);
            this.fire.apply(this.fire.async, args);
        };
    });

    var normalizeEvents = function (evts)
    {
        evts = evts.split(' ');
        for (var i = 0, iLen = evts.length; i < iLen; i++)
        {
            if (!eventHandlers[evts[i]])
                throw new Error(format('Event "{0}" is not a valid data event', evts[i]));
            evts[i] = dataEvents[evts[i]];
        }
        return evts.join(' ');
    };

    var sendEventFactory = function (i)
    {
        return function (event, jqXHR, settings)
        {
			/*jshint validthis:true */
            if (!settings.__mediator_data_fired__)
            {
                jqXHR.abort();
                throw new Error('Request aborted, all ajax calls must pass through thrust-data.');
            }
            if (!settings.silent)
            {
                eventFactory(i).apply(this, arguments);
            }
        };
    };

    /**
    Binds all the jQuery data events and creates event native thrust events out of them.

    @for thrust.data
    @private
    @method init
    @param {jQuery} A jQuery instance wrapping 'document'
    **/
    export function init(jDoc)
    {
		/*jshint validthis:true */
        for (var i in eventHandlers)
        {
            var jqEvt = 'ajax-' + i,
                method = eventFactory(i);

            if (i === 'send')
            {
                method = bind(sendEventFactory(i), this);
            }
            jDoc.on(camelCase(jqEvt) + this.namespace, method);
        }
    }
