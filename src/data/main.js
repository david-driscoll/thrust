define([
    'jquery',
    'thrust/util',
    'thrust/log',
    'thrust/data/config',
    'thrust/config',
    './event.factory',
    './response.queue',
    'thrust/events',
    'thrust/facade',
    './event.types',
    'has'
],
function (jQuery, util, log, config, tConfig, eventFactory, ResponseQueue, events, facade, eventTypes, has)
{
    'use strict';
    // Variable declaration.
    var format          = util.format,
        extend          = util.extend,
        type            = util.type,
        when            = util.when,
        slice           = Array.prototype.slice,
        ajax            = jQuery.ajax,
        uid             = util.uniqueId,
        dataEventWait   = eventTypes['wait'],
        dataEventStart  = eventTypes['start'],
        dataEventStop   = eventTypes['stop'],
        dataEventStatus = eventTypes['status'],
        argumentResolver = function (method)
        {
            return function ()
            {
                return method(util.toArray(arguments));
            };
        };

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
    var DataFacade = facade.createFacade(function (module, parent)
    {
        this.name = module.name + '-data';
        this.module = module;
        this.parent = parent;
        this.__conventions = parent.__conventions;
        this._callbacks = parent._callbacks;
        this.responseQueue = parent.responseQueue;
        this.initEvents();

        this.defaults = parent.defaults;
    });
    util.extend(DataFacade.fn, events);
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
    var Data = function (name, mediator, config)
    {
        // Enforce new
        if (!(this instanceof Data))
            return new Data(name, mediator);

        if (!name)
            throw new Error('Data: module name must be defined.');

        this.responseQueue = new ResponseQueue(this, config.data.startTimeout, config.data.finishTimeout);

        has('DEBUG') && log.debug('Data: Creating new Data');

        this.mediator = mediator;
        this._callbacks = this.mediator._callbacks;
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
    };

    var DataMethods = {
        /**
        Creates a DataFacade for the given module.

        @for thrust.data.Data
        @method createFacade
        @param {Thrust} thrust The thrust instance
        @param {Module} module The module
        @param {Object} facades The available facades
        @returns {DataFacade} The new DataFacade
        **/
        createFacade: function (thrust, module, facades)
        {
            if (module.data && !(facades.data instanceof DataFacade)) throw new Error('"data" is a reserved property');

            var data;
            if (facades.data)
            {
                facades.data.updateFacade(module, this);
                data = facades.data;
            }
            else
            {
                data = facades.data = module.data = new DataFacade(module, this);
            }
            return data;
        },
    };

    var DataPrototype = {
        /**
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
        getData: function (url, data, settings)
        {
            settings = !settings ? { data: data } : extend(settings, { data: data });
            return this.get(url, settings);
        },
        /**
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
        postData: function (url, data, settings)
        {
            settings = !settings ? { data: JSON.stringify(data) } : extend(settings, { data: JSON.stringify(data) });
            return this.post(url, settings);
        },
        /**
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
        get: function (url, settings, skipQueue)
        {
            if (settings === undefined && typeof url === 'object')
            {
                settings = url;
                url = settings.url;
            }

            if (url === undefined && settings.url !== undefined)
                url = settings.url;
            if (url === undefined)
                throw new Error('No url is defined');

            return this.ajax(url, extend(settings || {}, { type: 'get' }), skipQueue);
        },
        /**
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
        post: function (url, settings, skipQueue)
        {
            if (settings === undefined && typeof url === 'object')
            {
                settings = url;
                url = settings.url;
            }

            if (url === undefined && settings.url !== undefined)
                url = settings.url;
            if (url === undefined)
                throw new Error('No url is defined');

            return this.ajax(url, extend(settings || {}, { type: 'post' }), skipQueue);
        },
        /**
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
        ajax: function (url, settings, skipQueue)
        {
            var that = this, options, type, beforeSend;
            has('DEBUG') && log.info(format('Data[{0}]: Fetching data from "{1}"', that.namespace, url));

            if (settings === undefined && typeof url === 'object')
            {
                settings = url;
                url = settings.url;
            }
            if (!settings)
                settings = {};

            if (url === undefined && settings.url !== undefined)
                url = settings.url;


            url = util.fixupUrl(url);

            var module = (that.module && that.module.module);
            if (settings.silent)
            {
                var dfo = when.defer();

                var queryId = uid('dq');
                type = settings.type.toLowerCase();

                options = extend({}, that.defaults, { beforeSend: util.noop }, settings);

                ajax(url, options).then(argumentResolver(dfo.resolve), argumentResolver(dfo.reject));
                return dfo.promise;
            }

            options = extend({}, that.defaults, settings, { beforeSend: eventFactory.beforeSendMethod });

            type = options.type.toLowerCase();

            return this.responseQueue.addToQueue(type, url, options);
        }
    };

    util.extend(DataFacade.fn, DataPrototype);

    Data.prototype = Data.fn = util.extend({}, DataMethods, DataPrototype, events);

    // Take a hold of jQuery... this is sure to be contravesial
    jQuery.ajax = Data.ajax;

    return Data;
});
