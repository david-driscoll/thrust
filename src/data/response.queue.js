define(['jquery', 'thrust/util', 'thrust/config', 'thrust/log', './event.types', 'has'],
function(jQuery, util, config, log, eventTypes, has)
{
    var slice              = Array.prototype.slice,
        format             = util.format,
        extend             = util.extend,
        when               = util.when,
        uid                = util.uniqueId,
        ajax               = jQuery.ajax,
        dataEventWait      = eventTypes['wait'],
        dataEventStart     = eventTypes['start'],
        dataEventStop      = eventTypes['stop'],
        dataEventStatus    = eventTypes['status'],
        queue              = {},
        updateXHRInternals = function (dfo, xhr)
        {
            return function ()
            {
                if (!dfo._xhr)
                {
                    dfo._xhr = xhr;
                    dfo.getAllResponseHeaders = function () { return dfo._xhr.getAllResponseHeaders(); };
                    dfo.getResponseHeader = function () { return dfo._xhr.getAllResponseHeadersgetResponseHeader(); };
                    dfo.abort = function () { return dfo._xhr.abort(); };
                    dfo.setRequestHeader = function (name, value) { return dfo._xhr.setRequestHeader(name, value); };
                }

                dfo.responseText = xhr.responseText;
                dfo.responseXML = xhr.responseXML;
                dfo.readyState = xhr.readyState;
                dfo.status = xhr.status;
                dfo.statusText = xhr.statusText;
            };
        },
        argumentResolver = function (method)
        {
            return function ()
            {
                return method(util.toArray(arguments));
            };
        },
        deferControllerItemCallback = function (func)
        {
            return function ()
            {
                return func.call(this, arguments[0][0]);
            };
        };

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
    var ResponseQueue = function (module, startTimeout, finishTimeout)
    {
        this.startTimeout = startTimeout;
        this.finishTimeout = finishTimeout;
        this.module = module;
    };

    ResponseQueue.prototype = {
        /**
        Adds a request to the queue
        Queues are split up by HTTP type, so GET requests go with GET requests and POST requests go with POST requests.

        @method addToQueue
        @param {String} type The request type (POST, GET, etc)
        @param {String} url The request url to queue up
        @param {Object} options The request options.
        @returns {Promise} The promise that will resolve or reject, when the request is completed.
        **/
        addToQueue: function (type, url, options)
        {
            var dfo  = when.defer(),
                that = this;

            if (options.beforeSend)
            {
                var beforeSend = options.beforeSend;
                dfo.progress(function (eventType)
                {
                    if (eventType && eventType == 'before-send')
                    {
                        var args = slice.call(arguments, 1);
                        beforeSend.apply(beforeSend, args);
                    }
                });
                delete options.beforeSend;
            }

            if (options.complete)
            {
                dfo.always(options.complete);
                delete options.complete;
            }
            if (options.success)
            {
                dfo.then(options.success);
                delete options.success;
            }

            if (options.error)
            {
                dfo.otherwise(options.error);
                delete options.error;
            }

            var hasQueue = !!queue[type],
                list = queue[type] || (queue[type] = {}),
                tail = list.tail || (list.tail = list.next = {});

            extend(tail, { url: url, options: options, dfo: dfo });
            list.tail = tail.next = {};

            if (!hasQueue)
                when.delay(that.startTimeout).then(that.process(type));

            return dfo.promise;
        },
        /**
        Returns a function, that will process the given queue after the start time has elapsed.

        @method process
        @param {String} type The queue type, to process.
        @returns {Function} The function that will do the work on the queue.
        **/
        process: function (type)
        {
            var parent  = queue[type],
                node    = parent,
                that    = this,
                queryId = uid('dq');

            has('DEBUG') && log.debug(format('Data[{0}]: Creating queue for type "{1}"', that.namespace, type));
            that.module.fire(dataEventWait, queryId, type);

            return function ()
            {
                has('DEBUG') && log.debug(format('Data[{0}]: Processing queue for type "{1}"', that.namespace, type));
                var whenQueue = [], deferController = when.defer(), returnCount = 0;

                deferController.then(function ()
                {
                    has('DEBUG') && log.debug(format('Data[{0}]: Finishing queue for type "{1}"', that.namespace, type));
                    that.module.fire(dataEventStop, queryId, type, returnCount);
                });

                delete queue[type];

                var tail = node.tail,
                    statusCallback = function () { that.module.fire(dataEventStatus, queryId, type, ++returnCount); };

                while ((node = node.next) !== tail)
                {
                    var dfo = node.dfo,
                        options = extend({}, node.options),
                        xhrDfo = when.defer(),
                        xhr = node.xhr = ajax(node.url, options).then(argumentResolver(xhrDfo.resolve), argumentResolver(xhrDfo.reject));

                    xhrDfo.then(statusCallback);
                    whenQueue.push(xhr);

                    when.all([xhrDfo, deferController.promise], when.apply(dfo.resolve), when.apply(dfo.reject), updateXHRInternals(dfo, xhr));

                    dfo.progress('before-send', [dfo, options]);
                }

                that.module.fire(dataEventStart, queryId, type, whenQueue.length);

                when.any([when.all(whenQueue), when.delay(that.finishTimeout)], deferController.resolve, deferController.resolve);
            };
        }
    };

    return ResponseQueue;
});