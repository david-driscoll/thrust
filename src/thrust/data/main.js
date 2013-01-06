define(["require", "exports", 'thrust/convention', 'thrust/util', 'jquery', 'thrust/log', './config', 'thrust/config', './event.factory', './response.queue', 'thrust/events', 'thrust/facade', './event.types', 'has'], function(require, exports, __c__, __util__, __jQuery__, __log__, __config__, __tConfig__, __eventFactory__, __responseQueue__, __events__, __facade__, __eventTypes__, __has__) {
    /// <reference path="../interfaces/data/data.d.ts" />
    /// <reference path="../../jquery.d.ts" />
    /// <reference path="../../../lib/DefinitelyTyped/requirejs/require-2.1.d.ts" />
    // Disabled until TS supports module per file in some way (ie exports is exports.<export> not  exports.moduleName.<export>)
    /*export module instance {*/
    'use strict';
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
            has('DEBUG') && log.debug('Data: Creating new Data');
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
            has('DEBUG') && log.info(format('Data[{0}]: Fetching data from "{1}"', that.namespace, url));
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
