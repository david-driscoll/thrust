/// <reference path="../interfaces/data/data.d.ts" />
/// <reference path="../interfaces/data/data.facade.d.ts" />
/// <reference path="../../jquery.d.ts" />
/// <reference path="../../lib/DefinitelyTyped/requirejs/require-2.1.d.ts" />

// Disabled until TS supports module per file in some way (ie exports is exports.<export> not  exports.moduleName.<export>)
/*export module instance {*/

'use strict';
export import c = module('thrust/convention');
var Convention = c.Convention;
import util = module('thrust/util');
var _ = util._;
import jQuery = module('jquery');
import log = module('thrust/log');
import config = module('./config');
import tConfig = module('thrust/config');
import eventFactory = module('./event.factory');
import responseQueue = module('./response.queue');
var ResponseQueue = responseQueue.ResponseQueue;
import events = module('thrust/events');
var Events = events.Events;
import facade = module('thrust/facade');
import eventTypes = module('./event.types');
import has = module('has');
export var className = 'Data';
config;
    // Variable declaration.
    var format          = util.format,
        extend          = _.extend,
        type            = util.type,
        when            = util.when,
        slice           = Array.prototype.slice,
        ajax            = jQuery.ajax,
        uid             = _.uniqueId,
        dataEventWait   = eventTypes['wait'],
        dataEventStart  = eventTypes['start'],
        dataEventStop   = eventTypes['stop'],
        dataEventStatus = eventTypes['status'],
        argumentResolver = function (method)
        {
            return function ()
            {
                return method(_.toArray(arguments));
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
    var DataFacade: IThrustDataFacade = (() =>
    {    
        var dataFacade: any = facade.createFacade(function (module, parent)
        {
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
    export class Data implements IThrustData
    {
        private responseQueue : responseQueue.IResponseQueue;
        public mediator : IThrustMediator;
        private _callbacks: Object;
        public defaults : IThrustDataDefaults;
        public appPath : string;
        public namespace: string;
        public name: string;
            
		//#region Events
    	public initEvents(): any { }
    	public extend(to: Object, init?: bool): Object { return null; }

    	public subscribe(events: string, callback: Function, context?: any, once?: bool): any { }
    	public unsubscribe(events: string, callback: Function, context?: any): any{ }
    	public once(events: string, callback: Function, context?: any): any{ }

		public publish : IAsyncEvent;
		public fire : IAsyncEvent;
		//#endregion

        constructor(name, mediator, config)
        {
            if (!name)
                throw new Error('Data: module name must be defined.');

            this.name = name;
            this.responseQueue = new ResponseQueue(this, config.data.startTimeout, config.data.finishTimeout);

            has('DEBUG') && log.debug('Data: Creating new Data');

            this.mediator = mediator;
            this._callbacks = (<any> this).mediator._callbacks;
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
        };

        /**
        Creates a DataFacade for the given module.

        @for thrust.data.Data
        @method createFacade
        @param {Thrust} thrust The thrust instance
        @param {Module} module The module
        @param {Object} facades The available facades
        @returns {DataFacade} The new DataFacade
        **/
        public createFacade(thrust: IThrust, mod: IThrustModuleInstance, facades: IThrustModuleFacades): IThrustFacade
        {
            if (mod.data && !(facades.data instanceof DataFacade)) throw new Error('"data" is a reserved property');

            var data;
            if (facades.data)
            {
                facades.data.updateFacade(mod, this);
                data = facades.data;
            }
            else
            {
                data = facades.data = mod.data = new DataFacade(mod, this);
            }
            return data;
        }
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
        public getData(url: string, data : any, settings? : IThrustDataSettings): Promise
        {
            settings = !settings ? { data: data } : extend(settings, { data: data });
            return this.get(url, settings);
        }
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
        public postData(url: string, data : any, settings? : IThrustDataSettings): Promise
        {
            settings = !settings ? { data: JSON.stringify(data) } : extend(settings, { data: JSON.stringify(data) });
            return this.post(url, settings);
        }
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
        public get(url: string, settings?: IThrustDataSettings): Promise
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

            return this.ajax(url, extend(settings || {}, { type: 'get' }));
        }
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
        public post(url: string, settings?: IThrustDataSettings): Promise
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

            return this.ajax(url, extend(settings || {}, { type: 'post' }));
        }
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
        public ajax(url: string, settings?: IThrustDataSettings): Promise
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


            url = util.fixupUrl(url, that.appPath);

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

        public static config = config;
    }

    _.extend(<any> Data.prototype, Events);
	_.extend(DataFacade.prototype, <any> Data.prototype);

    // Take a hold of jQuery... this is sure to be contravesial
    jQuery.ajax = (<any> Data).prototype.ajax;
