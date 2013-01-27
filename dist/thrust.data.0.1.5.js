/*! thrust-js - v0.1.5 - 2013-01-26 */
define('thrust/data/config',["require", "exports"], function(require, exports) {
    
    exports.resolve = [
        'name', 
        'mediator', 
        'cfg'
    ];
    exports.conventions = [
        'thrust/data/convention/start'
    ];
    exports.cache = true;
    exports.startTimeout = 100;
    exports.finishTimeout = 2000;
})
//@ sourceMappingURL=config.js.map
;
define('thrust/data/event.types',["require", "exports"], function(require, exports) {
    exports.wait = 'thrust/data/wait';
    exports.start = 'thrust/data/start';
    exports.status = 'thrust/data/status';
    exports.stop = 'thrust/data/stop';
    exports.event = {
        beforeSend: 'thrust/data/event/before-send',
        start: 'thrust/data/event/start',
        send: 'thrust/data/event/send',
        error: 'thrust/data/event/error',
        success: 'thrust/data/event/sucess',
        complete: 'thrust/data/event/complete',
        stop: 'thrust/data/event/stop'
    };
})
//@ sourceMappingURL=event.types.js.map
;
define('thrust/data/event.factory',["require", "exports", 'thrust/convention', 'thrust/util', './event.types'], function(require, exports, __c__, __util__, __eventTypes__) {
    
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
;
define('thrust/data/response.queue',["require", "exports", 'thrust/convention', 'thrust/util', './event.types', 'jquery', 'thrust/log', 'has'], function(require, exports, __c__, __util__, __eventTypes__, __jQuery__, __log__, __has__) {
    
    var c = __c__;

    var Convention = c.Convention;
    var util = __util__;

    var _ = util._;
    var eventTypes = __eventTypes__;

    var jQuery = __jQuery__;

    var log = __log__;

    var has = __has__;

    var slice = Array.prototype.slice, format = util.format, extend = _.extend, when = util.when, uid = _.uniqueId, ajax = jQuery.ajax, dataEventWait = eventTypes.wait, dataEventStart = eventTypes.start, dataEventStop = eventTypes.stop, dataEventStatus = eventTypes.status, queue = {
    }, updateXHRInternals = function (dfo, xhr) {
return function () {
if(!dfo._xhr) {
dfo._xhr = xhr;dfo.getAllResponseHeaders = function () {
return dfo._xhr.getAllResponseHeaders();                };dfo.getResponseHeader = function () {
return dfo._xhr.getAllResponseHeadersgetResponseHeader();                };dfo.abort = function () {
return dfo._xhr.abort();                };dfo.setRequestHeader = function (name, value) {
return dfo._xhr.setRequestHeader(name, value);                };            }dfo.responseText = xhr.responseText;dfo.responseXML = xhr.responseXML;dfo.readyState = xhr.readyState;dfo.status = xhr.status;dfo.statusText = xhr.statusText;        }    }, argumentResolver = function (method) {
return function () {
return method(_.toArray(arguments));        }    }, deferControllerItemCallback = function (func) {
return function () {
return func.call(this, arguments[0][0]);        }    };
    var ResponseQueue = (function () {
        function ResponseQueue(module, startTimeout, finishTimeout) {
            this.startTimeout = startTimeout;
            this.finishTimeout = finishTimeout;
            this.module = module;
            this.namespace = module.namespace;
        }
        ResponseQueue.prototype.addToQueue = function (type, url, options) {
            var dfo = when.defer(), that = this;
            if(options.beforeSend) {
                var beforeSend = options.beforeSend;
                dfo.progress(function (eventType) {
                    if(eventType && eventType == 'before-send') {
                        var args = slice.call(arguments, 1);
                        beforeSend.apply(beforeSend, args);
                    }
                });
                delete options.beforeSend;
            }
            if(options.complete) {
                dfo.promise.always(options.complete);
                delete options.complete;
            }
            if(options.success) {
                dfo.promise.then(options.success);
                delete options.success;
            }
            if(options.error) {
                dfo.promise.otherwise(options.error);
                delete options.error;
            }
            var hasQueue = !!queue[type], list = queue[type] || (queue[type] = {
            }), tail = list.tail || (list.tail = list.next = {
            });
            extend(tail, {
                url: url,
                options: options,
                dfo: dfo
            });
            list.tail = tail.next = {
            };
            if(!hasQueue) {
                when.delay(that.startTimeout).then(that.process(type));
            }
            return dfo.promise;
        };
        ResponseQueue.prototype.process = function (type) {
            var parent = queue[type], node = parent, that = this, queryId = uid('dq');
            false && log.debug(format('Data[{0}]: Creating queue for type "{1}"', that.namespace, type));
            that.module.fire(dataEventWait, queryId, type);
            return function () {
                false && log.debug(format('Data[{0}]: Processing queue for type "{1}"', that.namespace, type));
                var whenQueue = [], deferController = when.defer(), returnCount = 0;
                deferController.promise.then(function () {
                    false && log.debug(format('Data[{0}]: Finishing queue for type "{1}"', that.namespace, type));
                    that.module.fire(dataEventStop, queryId, type, returnCount);
                });
                delete queue[type];
                var tail = node.tail, statusCallback = function () {
that.module.fire(dataEventStatus, queryId, type, ++returnCount);                };
                while((node = node.next) !== tail) {
                    var dfo = node.dfo, options = extend({
                    }, node.options), xhrDfo = when.defer(), xhr = node.xhr = ajax(node.url, options).then(argumentResolver(xhrDfo.resolve), argumentResolver(xhrDfo.reject));
                    xhrDfo.promise.then(statusCallback);
                    whenQueue.push(xhr);
                    when.all([
                        xhrDfo, 
                        deferController.promise
                    ], when.apply(dfo.resolve), when.apply(dfo.reject), updateXHRInternals(dfo, xhr));
                    dfo.progress('before-send', [
                        dfo, 
                        options
                    ]);
                }
                that.module.fire(dataEventStart, queryId, type, whenQueue.length);
                when.any([
                    when.all(whenQueue), 
                    when.delay(that.finishTimeout)
                ], deferController.resolve, deferController.resolve);
            }
        };
        return ResponseQueue;
    })();
    exports.ResponseQueue = ResponseQueue;    
})
//@ sourceMappingURL=response.queue.js.map
;
define('thrust/data/main',["require", "exports", 'thrust/convention', 'thrust/util', 'jquery', 'thrust/log', './config', 'thrust/config', './event.factory', './response.queue', 'thrust/events', 'thrust/facade', './event.types', 'has'], function(require, exports, __c__, __util__, __jQuery__, __log__, __config__, __tConfig__, __eventFactory__, __responseQueue__, __events__, __facade__, __eventTypes__, __has__) {
    
    var c = __c__;

    var Convention = c.Convention;
    var util = __util__;

    var _ = util._;
    var jQuery = __jQuery__;

    var log = __log__;

    var config = __config__;

    var tConfig = __tConfig__;

    var eventFactory = __eventFactory__;

    var responseQueue = __responseQueue__;

    var ResponseQueue = responseQueue.ResponseQueue;
    var events = __events__;

    var Events = events.Events;
    var facade = __facade__;

    var eventTypes = __eventTypes__;

    var has = __has__;

    exports.className = 'Data';
    config;
    var format = util.format, extend = _.extend, type = util.type, when = util.when, slice = Array.prototype.slice, ajax = jQuery.ajax, uid = _.uniqueId, dataEventWait = eventTypes['wait'], dataEventStart = eventTypes['start'], dataEventStop = eventTypes['stop'], dataEventStatus = eventTypes['status'], argumentResolver = function (method) {
return function () {
return method(_.toArray(arguments));        }    };
    jQuery.ajaxSettings.traditional = !!tConfig.url.traditionalEncoding;
    var jDoc = jQuery(document);
    eventFactory.init(jDoc);
    var DataFacade = (function () {
        var dataFacade = facade.createFacade(function (module, parent) {
            this.name = module.name + '-data';
            this.module = module;
            this.parent = parent;
            this.__conventions = parent.__conventions;
            this._callbacks = parent._callbacks;
            this.responseQueue = parent.responseQueue;
            this.initEvents();
            this.defaults = parent.defaults;
            this.appPath = parent.appPath;
        });
        _.extend(dataFacade.prototype, events);
        return dataFacade;
    })();
    var Data = (function () {
        function Data(name, mediator, config) {
            if(!name) {
                throw new Error('Data: module name must be defined.');
            }
            this.name = name;
            this.responseQueue = new ResponseQueue(this, config.data.startTimeout, config.data.finishTimeout);
            false && log.debug('Data: Creating new Data');
            this.mediator = mediator;
            this._callbacks = (this).mediator._callbacks;
            this.initEvents();
            this.defaults = {
                cache: config.data.cache,
                beforeSend: eventFactory.beforeSendMethod,
                contentType: 'application/json',
                type: 'POST',
                url: '',
                data: '',
                dataType: 'json',
                __mediator_data_fired__: true,
                silent: false
            };
            this.appPath = config.url.path + '/';
        }
        Data.prototype.initEvents = function () {
        };
        Data.prototype.extend = function (to, init) {
            return null;
        };
        Data.prototype.subscribe = function (events, callback, context, once) {
        };
        Data.prototype.unsubscribe = function (events, callback, context) {
        };
        Data.prototype.once = function (events, callback, context) {
        };
        Data.prototype.createFacade = function (thrust, mod, facades) {
            if(mod.data && !(facades.data instanceof DataFacade)) {
                throw new Error('"data" is a reserved property');
            }
            var data;
            if(facades.data) {
                facades.data.updateFacade(mod, this);
                data = facades.data;
            } else {
                data = facades.data = mod.data = new DataFacade(mod, this);
            }
            return data;
        };
        Data.prototype.getData = function (url, data, settings) {
            settings = !settings ? {
                data: data
            } : extend(settings, {
                data: data
            });
            return this.get(url, settings);
        };
        Data.prototype.postData = function (url, data, settings) {
            settings = !settings ? {
                data: JSON.stringify(data)
            } : extend(settings, {
                data: JSON.stringify(data)
            });
            return this.post(url, settings);
        };
        Data.prototype.get = function (url, settings) {
            if(settings === undefined && typeof url === 'object') {
                settings = url;
                url = settings.url;
            }
            if(url === undefined && settings.url !== undefined) {
                url = settings.url;
            }
            if(url === undefined) {
                throw new Error('No url is defined');
            }
            return this.ajax(url, extend(settings || {
            }, {
                type: 'get'
            }));
        };
        Data.prototype.post = function (url, settings) {
            if(settings === undefined && typeof url === 'object') {
                settings = url;
                url = settings.url;
            }
            if(url === undefined && settings.url !== undefined) {
                url = settings.url;
            }
            if(url === undefined) {
                throw new Error('No url is defined');
            }
            return this.ajax(url, extend(settings || {
            }, {
                type: 'post'
            }));
        };
        Data.prototype.ajax = function (url, settings) {
            var that = this, options, type, beforeSend;
            false && log.info(format('Data[{0}]: Fetching data from "{1}"', that.namespace, url));
            if(settings === undefined && typeof url === 'object') {
                settings = url;
                url = settings.url;
            }
            if(!settings) {
                settings = {
                };
            }
            if(url === undefined && settings.url !== undefined) {
                url = settings.url;
            }
            url = util.fixupUrl(url, that.appPath);
            if(settings.silent) {
                var dfo = when.defer();
                var queryId = uid('dq');
                type = settings.type.toLowerCase();
                options = extend({
                }, that.defaults, {
                    beforeSend: util.noop
                }, settings);
                ajax(url, options).then(argumentResolver(dfo.resolve), argumentResolver(dfo.reject));
                return dfo.promise;
            }
            options = extend({
            }, that.defaults, settings, {
                beforeSend: eventFactory.beforeSendMethod
            });
            type = options.type.toLowerCase();
            return this.responseQueue.addToQueue(type, url, options);
        };
        Data.config = config;
        return Data;
    })();
    exports.Data = Data;    
    _.extend(Data.prototype, Events);
    _.extend(DataFacade.prototype, Data.prototype);
    jQuery.ajax = (Data).prototype.ajax;
})
//@ sourceMappingURL=main.js.map
;
define('thrust/data', ['thrust/data/main'], function (main) { return main; });

define('thrust/data/convention/start',["require", "exports", 'thrust/convention', 'thrust/util'], function(require, exports, __c__, __util__) {
    
    var c = __c__;

    var Convention = c.Convention;
    var util = __util__;

    var _ = util._;
    var when = util.when;
    var whenQueue = [];
    function waitCallback(uid) {
        var d = when.defer();
        d.resolver['uid'] = uid;
        whenQueue.push({
            uid: uid,
            resolver: d.resolver
        });
    }
    function stopCallback(uid) {
        var item = _.find(whenQueue, function (x) {
            return x.uid === uid;
        });
        whenQueue = _.without(whenQueue, item);
        item.resolver.resolve();
    }
    var methods = {
        countdown: function (thrust) {
            thrust.data.subscribe('thrust/data/wait', waitCallback);
            thrust.data.subscribe('thrust/data/stop', stopCallback);
        },
        orbit: function (thrust) {
            thrust.data.unsubscribe('thrust/data/wait', waitCallback);
            thrust.data.unsubscribe('thrust/data/stop', stopCallback);
            var defer = when.defer();
            if(thrust.cfg.data.finishTimeout === 0) {
                return when.all(whenQueue);
            }
            return when.any([
                when.all(whenQueue), 
                when.delay(thrust.cfg.data.finishTimeout)
            ], defer.resolve, defer.reject);
        }
    };
    exports.subscription = new Convention(methods);
})
//@ sourceMappingURL=start.js.map
;