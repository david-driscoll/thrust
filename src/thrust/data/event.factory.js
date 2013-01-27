define(["require", "exports", 'thrust/convention', 'thrust/util', './event.types'], function(require, exports, __c__, __util__, __eventTypes__) {
    'use strict';
    var c = __c__;

    var Convention = c.Convention;
    var util = __util__;

    var _ = util._;
    var eventTypes = __eventTypes__;

    var camelCase = util.camelCase, format = util.format, bind = _.bind, dataEvents = eventTypes.event, slice = Array.prototype.slice, memoize = _.memoize;
    var eventHandlers = {
        'before-send': true,
        'send': true,
        'error': true,
        'success': true,
        'complete': true,
        'start': true,
        'stop': true
    };
    function beforeSendMethod(jqXHR, settings) {
        this.fire(dataEvents['beforeSend'], jqXHR, settings);
    }
    exports.beforeSendMethod = beforeSendMethod;
    var eventFactory = memoize(function (event) {
        var evt = dataEvents[event];
        return function () {
            var args = slice.call(arguments, 0);
            args.unshift(evt);
            this.fire.apply(this.fire.async, args);
        }
    });
    var normalizeEvents = function (evts) {
        evts = evts.split(' ');
        for(var i = 0, iLen = evts.length; i < iLen; i++) {
            if(!eventHandlers[evts[i]]) {
                throw new Error(format('Event "{0}" is not a valid data event', evts[i]));
            }
            evts[i] = dataEvents[evts[i]];
        }
        return evts.join(' ');
    };
    var sendEventFactory = function (i) {
        return function (event, jqXHR, settings) {
            if(!settings.__mediator_data_fired__) {
                jqXHR.abort();
                throw new Error('Request aborted, all ajax calls must pass through thrust-data.');
            }
            if(!settings.silent) {
                eventFactory(i).apply(this, arguments);
            }
        }
    };
    function init(jDoc) {
        for(var i in eventHandlers) {
            var jqEvt = 'ajax-' + i, method = eventFactory(i);
            if(i === 'send') {
                method = bind(sendEventFactory(i), this);
            }
            jDoc.on(camelCase(jqEvt) + this.namespace, method);
        }
    }
    exports.init = init;
})
//@ sourceMappingURL=event.factory.js.map
