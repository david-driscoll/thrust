define(["require", "exports", 'thrust/convention', 'thrust/util', 'jquery', 'thrust/log', './config', 'thrust/config', './event.factory', './response.queue', 'thrust/events', 'thrust/facade', './event.types', 'has'], function(require, exports, __c__, __util__, __jQuery__, __log__, __config__, __tConfig__, __eventFactory__, __responseQueue__, __events__, __facade__, __eventTypes__, __has__) {
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
    jQuery.ajax = (Data).prototype.ajax;
})
//@ sourceMappingURL=main.js.map
