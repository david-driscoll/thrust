/*! thrust-js - v0.1.0 - 2013-01-01 */
define('thrust/data/config',["require", "exports"], function(require, exports) {
    /// <reference path="../../../lib/DefinitelyTyped/requirejs/require-2.1.d.ts" />
    // Disabled until TS supports module per file in some way (ie exports is exports.<export> not  exports.moduleName.<export>)
    /*export module instance {*/
    
    /**
    Provides thrust configuration
    
    @module thrust.data
    @submodule thrust.data.config
    **/
    /**
    Resolves the given properties when creating an instance of the plugin.
    
    This is for internal thrust use.  Thrust uses this array to generate the properties that need to be handed
    to the plugin constructor method.
    
    @for thrust.data.config
    @private
    @property resolve
    @readOnly
    @type {Array}
    **/
    exports.resolve = [
        'name', 
        'mediator', 
        'cfg'
    ];
    /**
    The set of conventions to load into thrust/dom.
    
    @property conventions
    @readOnly
    @type {Array}
    **/
    exports.conventions = [
        'thrust/data/convention/start'
    ];
    /**
    Decides if `thrust/data` should cache requests or not.
    
    You should turn this to `false`, if you are experiencing caching issues and need to debug.
    
    @property cache
    @readOnly
    @type {Boolean}
    @default true
    **/
    exports.cache = true;
    /**
    *
    * `startTimeout` is part of queueing built into `thrust/data`.  It defines the wait time before requests
    * are started.
    *
    *
    * The queueing system works in the followig manner.  All requests that are queued together per HTTP
    * request method (`GET`, `POST`, `PUT`, `DELETE`, `PATCH`, etc).  After the first request, the timer
    * starts, once the timeout elapses, all the requests are shipped off at once.
    *
    *
    * This counter intuitive if you're looking to get the request back immediately, but from a UX perspective
    * this allows the UI to stay in sync and give the user a cohesive, instead of seeing loaders, show up and
    * disappear at seemingly random intervals, the user does an action, and then sees a response.
    *
    *
    * @property startTimeout
    * @readOnly
    * @type {Number}
    * @default 500
    **/
    exports.startTimeout = 100;
    /**
    *
    * `finishTimeout` is part of queueing built into `thrust/data`.  It defines the wait time before the
    * queue is completed.  If all the requests finish early, the timeout is canceled.
    *
    *
    * The queueing system works in the followig manner.  All requests that are queued together per HTTP
    * request method (`GET`, `POST`, `PUT`, `DELETE`, `PATCH`, etc).  After the requests are fired off
    * `thrust/data` will wait until it gets a response from everyone of them.  If for some reason a request
    * takes to long, and the timeout is hit, all the requests that have completed, will be releaseed, allowing
    * the application to continue undisrupted.
    *
    *
    * This counter intuitive if you're looking to get the request back immediately, but from a UX perspective
    * this allows the UI to stay in sync and give the user a cohesive, instead of seeing loaders, show up and
    * disappear at seemingly random intervals, the user does an action, and then sees a response.
    *
    *
    @property finishTimeout
    @readOnly
    @type {Number}
    @default 2000
    **/
    exports.finishTimeout = 2000;
})
//@ sourceMappingURL=config.js.map
;
define('thrust/data/event.types',["require", "exports"], function(require, exports) {
    /**
    
    @module thrust.data
    @for thrust.data
    **/
    /**
    The `thrust/data/wait` event is fired once a data call is made.
    
    @event thrust/data/wait
    @param {String} queryId The internal id of the outbound queue.
    @param {String} type The type of the outbound event queue (Get/Post/etc)
    **/
    exports.wait = 'thrust/data/wait';
    /**
    The `thrust/data/start` event is fired the queue is started.
    
    @event thrust/data/start
    @param {String} queryId The internal id of the outbound queue.
    @param {String} type The type of the outbound event queue (Get/Post/etc)
    @param {Number} count The outgoing call count
    **/
    exports.start = 'thrust/data/start';
    /**
    The `thrust/data/status` event is fired for every item that returns from the queue.
    
    NOTE: It is entirely possible for `thrust/data/status** to be called after `thrust/data/stop** if several
    calls take to long to complete.  This is intended, and potentially useful information.
    
    @event thrust/data/status
    @param {String} queryId The internal id of the outbound queue.
    @param {String} type The type of the outbound event queue (Get/Post/etc)
    @param {Number} count The current completed call count for this queue.
    **/
    exports.status = 'thrust/data/status';
    /**
    The `thrust/data/stop` event is fired when all items in the queue return, or the finishedTimeout setting elapses.
    
    @event thrust/data/stop
    @param {String} queryId The internal id of the outbound queue.
    @param {String} type The type of the outbound event queue (Get/Post/etc)
    @param {Number} count The (current) completed call count for this queue.
    **/
    exports.stop = 'thrust/data/stop';
    exports.event = {
        beforeSend: /**
        The `thrust/data/event/before-send` event is wrapped by thrust, and fired through jQuery.
        
        
        NOTE: Marked as private because this event exposes underlying jQuery arguments, and may
        be changed in the future.
        
        @event thrust/data/event/before-send
        @private
        **/
        'thrust/data/event/before-send',
        start: /**
        The `thrust/data/event/start` event is wrapped by thrust, and fired through jQuery.
        
        
        NOTE: Marked as private because this event exposes underlying jQuery arguments, and may
        be changed in the future.
        
        @event thrust/data/event/start
        @private
        **/
        'thrust/data/event/start',
        send: /**
        The `thrust/data/event/send` event is wrapped by thrust, and fired through jQuery.
        
        
        NOTE: Marked as private because this event exposes underlying jQuery arguments, and may
        be changed in the future.
        
        @event thrust/data/event/send
        @private
        **/
        'thrust/data/event/send',
        error: /**
        The `thrust/data/event/error` event is wrapped by thrust, and fired through jQuery.
        
        
        NOTE: Marked as private because this event exposes underlying jQuery arguments, and may
        be changed in the future.
        
        @event thrust/data/event/error
        @private
        **/
        'thrust/data/event/error',
        success: /**
        The `thrust/data/event/success` event is wrapped by thrust, and fired through jQuery.
        
        
        NOTE: Marked as private because this event exposes underlying jQuery arguments, and may
        be changed in the future.
        
        @event thrust/data/event/success
        @private
        **/
        'thrust/data/event/sucess',
        complete: /**
        The `thrust/data/event/complete` event is wrapped by thrust, and fired through jQuery.
        
        
        NOTE: Marked as private because this event exposes underlying jQuery arguments, and may
        be changed in the future.
        
        @event thrust/data/event/complete
        @private
        **/
        'thrust/data/event/complete',
        stop: /**
        The `thrust/data/event/stop` event is wrapped by thrust, and fired through jQuery.
        
        
        NOTE: Marked as private because this event exposes underlying jQuery arguments, and may
        be changed in the future.
        
        @event thrust/data/event/stop
        @private
        **/
        'thrust/data/event/stop'
    };
})
//@ sourceMappingURL=event.types.js.map
;
define('thrust/data/event.factory',["require", "exports", 'thrust/convention', 'thrust/util', './event.types'], function(require, exports, __c__, __util__, __eventTypes__) {
    /// <reference path="../../jquery.d.ts" />
    /// <reference path="../../../lib/DefinitelyTyped/requirejs/require-2.1.d.ts" />
    // Disabled until TS supports module per file in some way (ie exports is exports.<export> not  exports.moduleName.<export>)
    /*export module instance {*/
    
    var c = __c__;

    var Convention = c.Convention;
    var util = __util__;

    var _ = util._;
    var eventTypes = __eventTypes__;

    var camelCase = util.camelCase, format = util.format, bind = _.bind, dataEvents = eventTypes.event, slice = Array.prototype.slice, memoize = _.memoize;
    /**
    The event factory links jQuery Events up to thrust centric events.
    The event factory would be replaced if we were ever moved off of the jQuery dependancy.
    
    @module thrust.data
    **/
    var eventHandlers = {
        'before-send': // Supported event handlers
        true,
        'send': true,
        'error': true,
        'success': true,
        'complete': true,
        'start': true,
        'stop': true
    };
    /**
    Wraps beforeSend, which is a custom property on the jQuery ajax data call.
    
    @method beforeSendMethod
    @private
    **/
    function beforeSendMethod(jqXHR, settings) {
        /*jshint validthis:true */
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
            /*jshint validthis:true */
            if(!settings.__mediator_data_fired__) {
                jqXHR.abort();
                throw new Error('Request aborted, all ajax calls must pass through thrust-data.');
            }
            if(!settings.silent) {
                eventFactory(i).apply(this, arguments);
            }
        }
    };
    /**
    Binds all the jQuery data events and creates event native thrust events out of them.
    
    @for thrust.data
    @private
    @method init
    @param {jQuery} A jQuery instance wrapping 'document'
    **/
    function init(jDoc) {
        /*jshint validthis:true */
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
    /// <reference path="../interfaces/data/data.d.ts" />
    /// <reference path="../interfaces/module.d.ts" />
    /// <reference path="../../jquery.d.ts" />
    /// <reference path="../../../lib/DefinitelyTyped/requirejs/require-2.1.d.ts" />
    // Disabled until TS supports module per file in some way (ie exports is exports.<export> not  exports.moduleName.<export>)
    /*export module instance {*/
    
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
    /**
    The response queue class handles creation of a queue or batching system.
    With this system, we can batch up all our server requests, and request them from the server all around the same time.
    In addition to that, when the requests come back we can also spool them together, so that the calls don't resolve until
    either all the calls come back, or a specific time has elapsed.
    
    @for thrust.data
    @class thrust.data.ResponseQueue
    @constructor
    @param {thrust.Module} module The module to create the response queue for
    @param {Number} startTimeout The time to wait for additional requests.
    @param {Number} finishTimeout The maximum time to wait for requests to return.
    **/
    var ResponseQueue = (function () {
        function ResponseQueue(module, startTimeout, finishTimeout) {
            this.startTimeout = startTimeout;
            this.finishTimeout = finishTimeout;
            this.module = module;
            this.namespace = module.namespace;
        }
        /**
        Adds a request to the queue
        Queues are split up by HTTP type, so GET requests go with GET requests and POST requests go with POST requests.
        
        @method addToQueue
        @param {String} type The request type (POST, GET, etc)
        @param {String} url The request url to queue up
        @param {Object} options The request options.
        @returns {Promise} The promise that will resolve or reject, when the request is completed.
        **/
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
        }/**
        Returns a function, that will process the given queue after the start time has elapsed.
        
        @method process
        @param {String} type The queue type, to process.
        @returns {Function} The function that will do the work on the queue.
        **/
        ;
        ResponseQueue.prototype.process = function (type) {
            var parent = queue[type], node = parent, that = this, queryId = uid('dq');
            true && log.debug(format('Data[{0}]: Creating queue for type "{1}"', that.namespace, type));
            that.module.fire(dataEventWait, queryId, type);
            return function () {
                true && log.debug(format('Data[{0}]: Processing queue for type "{1}"', that.namespace, type));
                var whenQueue = [], deferController = when.defer(), returnCount = 0;
                deferController.promise.then(function () {
                    true && log.debug(format('Data[{0}]: Finishing queue for type "{1}"', that.namespace, type));
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
    /// <reference path="../interfaces/data/data.d.ts" />
    /// <reference path="../interfaces/data/data.facade.d.ts" />
    /// <reference path="../../jquery.d.ts" />
    /// <reference path="../../../lib/DefinitelyTyped/requirejs/require-2.1.d.ts" />
    // Disabled until TS supports module per file in some way (ie exports is exports.<export> not  exports.moduleName.<export>)
    /*export module instance {*/
    
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
    // Variable declaration.
        var format = util.format, extend = _.extend, type = util.type, when = util.when, slice = Array.prototype.slice, ajax = jQuery.ajax, uid = _.uniqueId, dataEventWait = eventTypes['wait'], dataEventStart = eventTypes['start'], dataEventStop = eventTypes['stop'], dataEventStatus = eventTypes['status'], argumentResolver = function (method) {
return function () {
return method(_.toArray(arguments));        }    };
    jQuery.ajaxSettings.traditional = !!tConfig.url.traditionalEncoding;
    var jDoc = jQuery(document);
    eventFactory.init(jDoc);
    //#region DataFacade
    /**
    The data facade that is handed off to modules.
    
    
    Enables data transport, using jQuery for thrust.
    
    @for thrust.data
    @class thrust.data.DataFacade
    @param {thrust.Module} module The module to create the facade for
    @param {thrust.data.Data} parent The parent thrust data object to create the facade for.
    @constructor
    **/
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
    //#endregion
    /**
    The master data plugin.
    
    
    Enables data transport, using jQuery for thrust.
    
    @for thrust.data
    @class thrust.data.Data
    @param {String} name The thrust instance name.
    @param {thrust.mediator.Mediator} mediator The thrust mediator instance.
    @param {Object} config The thrust instance configuration.
    @constructor
    **/
    var Data = (function () {
        //#endregion
        function Data(name, mediator, config) {
            if(!name) {
                throw new Error('Data: module name must be defined.');
            }
            this.name = name;
            this.responseQueue = new ResponseQueue(this, config.data.startTimeout, config.data.finishTimeout);
            true && log.debug('Data: Creating new Data');
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
        Data.prototype.initEvents = //#region Events
        function () {
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
        Data.prototype.createFacade = /**
        Creates a DataFacade for the given module.
        
        @for thrust.data.Data
        @method createFacade
        @param {Thrust} thrust The thrust instance
        @param {Module} module The module
        @param {Object} facades The available facades
        @returns {DataFacade} The new DataFacade
        **/
        function (thrust, mod, facades) {
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
        }/**
        Does a GET to the server, for the given data and settings.
        
        @for thrust.data.Data
        @method getData
        @param {String} url The url to get data from
        @param {Object} data The data to pass to the given url
        @param {Object} settings The settings of the task to be done
        @param {Boolean} settings.cache Do we cache this call or not.
        @param {Boolean} settings.silent Do we use the built in data queue.
        @returns {Promise} The promise if this request completes or fails
        **/
        /**
        Does a GET to the server, for the given data and settings.
        
        @for thrust.data.DataFacade
        @method getData
        @param {String} url The url to get data from
        @param {Object} data The data to pass to the given url
        @param {Object} settings The settings of the task to be done
        @param {Boolean} settings.cache Do we cache this call or not.
        @param {Boolean} settings.silent Do we use the built in data queue.
        @returns {Promise} The promise if this request completes or fails
        **/
        ;
        Data.prototype.getData = function (url, data, settings) {
            settings = !settings ? {
                data: data
            } : extend(settings, {
                data: data
            });
            return this.get(url, settings);
        }/**
        Does a POST to the server, for the given data and settings.
        
        @for thrust.data.Data
        @method postData
        @param {String} url The url to get data from
        @param {Object} data The data to pass to the given url
        @param {Object} settings The settings of the task to be done
        @param {Boolean} settings.cache Do we cache this call or not.
        @param {Boolean} settings.silent Do we use the built in data queue.
        @returns {Promise} The promise if this request completes or fails
        **/
        /**
        Does a POST to the server, for the given data and settings.
        
        @for thrust.data.DataFacade
        @method postData
        @param {String} url The url to get data from
        @param {Object} data The data to pass to the given url
        @param {Object} settings The settings of the task to be done
        @param {Boolean} settings.cache Do we cache this call or not.
        @param {Boolean} settings.silent Do we use the built in data queue.
        @returns {Promise} The promise if this request completes or fails
        **/
        ;
        Data.prototype.postData = function (url, data, settings) {
            settings = !settings ? {
                data: JSON.stringify(data)
            } : extend(settings, {
                data: JSON.stringify(data)
            });
            return this.post(url, settings);
        }/**
        Does a GET to the server, using the given settings.
        
        Data must be passed in using settings: { data: {} } otherwise use getData.
        
        @for thrust.data.Data
        @method get
        @param {String} url The url to get data from
        @param {Object} settings The settings of the task to be done
        @param {Boolean} settings.cache Do we cache this call or not.
        @param {Boolean} settings.silent Do we use the built in data queue.
        @returns {Promise} The promise if this request completes or fails
        **/
        /**
        Does a GET to the server, using the given settings.
        
        Data must be passed in using settings: { data: {} } otherwise use getData.
        
        @for thrust.data.DataFacade
        @method get
        @param {String} url The url to get data from
        @param {Object} settings The settings of the task to be done
        @param {Boolean} settings.cache Do we cache this call or not.
        @param {Boolean} settings.silent Do we use the built in data queue.
        @returns {Promise} The promise if this request completes or fails
        **/
        ;
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
        }/**
        Does a POST to the server, using the given settings.
        
        Data must be passed in using settings: { data: {} } otherwise use postData.
        
        @for thrust.data.Data
        @method post
        @param {String} url The url to get data from
        @param {Object} settings The settings of the task to be done
        @param {Boolean} settings.cache Do we cache this call or not.
        @param {Boolean} settings.silent Do we use the built in data queue.
        @returns {Promise} The promise if this request completes or fails
        **/
        /**
        Does a POST to the server, using the given settings.
        
        Data must be passed in using settings: { data: {} } otherwise use postData.
        
        @for thrust.data.DataFacade
        @method post
        @param {String} url The url to get data from
        @param {Object} settings The settings of the task to be done
        @param {Boolean} settings.cache Do we cache this call or not.
        @param {Boolean} settings.silent Do we use the built in data queue.
        @returns {Promise} The promise if this request completes or fails
        **/
        ;
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
        }/**
        Does an ajax call to the given url, with the given settings.
        
        @for thrust.data.Data
        @method ajax
        @param {String} url The url to get data from
        @param {Object} settings The settings of the task to be done
        @param {Boolean} settings.cache Do we cache this call or not.
        @param {Boolean} settings.silent Do we use the built in data queue.
        @returns {Promise} The promise if this request completes or fails
        **/
        /**
        Does an ajax call to the given url, with the given settings.
        
        @for thrust.data.DataFacade
        @method ajax
        @param {String} url The url to get data from
        @param {Object} settings The settings of the task to be done
        @param {Boolean} settings.cache Do we cache this call or not.
        @param {Boolean} settings.silent Do we use the built in data queue.
        @returns {Promise} The promise if this request completes or fails
        **/
        ;
        Data.prototype.ajax = function (url, settings) {
            var that = this, options, type, beforeSend;
            true && log.info(format('Data[{0}]: Fetching data from "{1}"', that.namespace, url));
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
    // Take a hold of jQuery... this is sure to be contravesial
    jQuery.ajax = (Data).prototype.ajax;
})
//@ sourceMappingURL=main.js.map
;
define('thrust/data', ['thrust/data/main'], function (main) { return main; });

define('thrust/data/convention/start',["require", "exports", 'thrust/convention', 'thrust/util'], function(require, exports, __c__, __util__) {
    /// <reference path="../../interfaces/data/data.config.d.ts" />
    /// <reference path="../../interfaces/data/data.d.ts" />
    /// <reference path="../../interfaces/convention.d.ts" />
    /// <reference path="../../../../lib/DefinitelyTyped/requirejs/require-2.1.d.ts" />
    // Disabled until TS supports module per file in some way (ie exports is exports.<export> not  exports.moduleName.<export>)
    /*export module instance {*/
    
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
            // Subscribe to the wait and stop events
            thrust.data.subscribe('thrust/data/wait', waitCallback);
            thrust.data.subscribe('thrust/data/stop', stopCallback);
            return null;
        },
        orbit: function (thrust) {
            // Unsubscribe from the wait and stop events
            thrust.data.unsubscribe('thrust/data/wait', waitCallback);
            thrust.data.unsubscribe('thrust/data/stop', stopCallback);
            // defer until any of the events that were captured are resolved, or the delay passes.
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