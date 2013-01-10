define(["require", "exports", './subjquery', 'thrust/util', 'thrust/log', 'thrust/facade', 'has', 'thrust/instance', './config'], function(require, exports, __subjquery__, __util__, __log__, __facade__, __has__, __instance__, __config__) {
    /// <reference path="../interfaces/dom/dom.d.ts" />
    /// <reference path="../../../lib/DefinitelyTyped/requirejs/require-2.1.d.ts" />
    // Disabled until TS supports module per file in some way (ie exports is exports.<export> not  exports.moduleName.<export>)
    /*export module instance {*/
    'use strict';
    var subjquery = __subjquery__;

    var tQuery = subjquery.tQuery;
    var util = __util__;

    var _ = util._;
    var log = __log__;

    var facade = __facade__;

    var has = __has__;

    var instance = __instance__;

    var config = __config__;

    exports.className = 'Dom';
    var format = util.format, extend = _.extend, bind = _.bind, hasOwn = Object.prototype.hasOwnProperty, isObject = _.isObject, slice = Array.prototype.slice, when = util.when, isArray = _.isArray;
    //#region DomFacade
    var DomFacade = (function () {
        var domFacade = facade.createFacade(function (mod, parent) {
            this.name = parent.name;
            this.__conventions = parent.__conventions;
            this.context = tQuery(document, undefined, this.name);
        });
        domFacade.prototype.init = function (fake) {
            this._internalEvents = this._internalEvents || [];
            has('DEBUG') && log.debug(format('Dom[{0}]: Initalizing {1}Dom facade', this.name, fake ? 'fake ' : ''));
            return this;
        };
        domFacade.prototype.start = function (m) {
            has('DEBUG') && log.debug(format('Dom[{0}]: Starting Dom facade', this.name));
            return null;
        };
        domFacade.prototype.stop = function (m) {
            has('DEBUG') && log.debug(format('Dom[{0}]: Stopping Dom facade', this.name));
            for(var i = this._internalEvents.length - 1; i >= 0; i--) {
                var sub = this._internalEvents[i];
                this._internalEvents.splice(i, 1);
                sub.context.off.apply(this, (isArray(sub)) ? sub : (isArray(sub.args)) ? sub.args : []);
            }
            return null;
        };
        domFacade.prototype.destroy = function (m) {
            has('DEBUG') && log.debug(format('Dom[{0}]: Destroying Dom facade', this.name));
            delete this._internalEvents;
            return null;
        };
        return domFacade;
    })();
    //#endregion
    //#region Dom
    var Dom = (function () {
        //#endregion
        function Dom(name, mediator) {
            if(!name) {
                throw new Error('Dom: module name must be defined.');
            }
            has('DEBUG') && log.debug('Data: Creating new Data');
            this.mediator = mediator;
            this._callbacks = (mediator)._callbacks;
            this.initEvents();
            this.name = name;
            var that = this;
            instance.fetchInstance(name).promise.then(function (thrust) {
                var mod = {
                }, facade = that.createFacade(thrust, mod, {
                });

            });
        }
        Dom.prototype.initEvents = //#region Events
        function () {
        };
        Dom.prototype.extend = function (to, init) {
            return null;
        };
        Dom.prototype.subscribe = function (events, callback, context, once) {
        };
        Dom.prototype.unsubscribe = function (events, callback, context) {
        };
        Dom.prototype.once = function (events, callback, context) {
        };
        Dom.config = config;
        Dom.prototype.createFacade = function (thrust, mod, facades) {
            if(facades.dom && !(facades.dom instanceof DomFacade)) {
                throw new Error('"dom" is a reserved property');
            }
            var dom;
            if(facades.dom) {
                facades.dom.updateFacade(mod, this);
                dom = facades.dom;
            } else {
                dom = facades.dom = new DomFacade(mod, this);
            }
            return dom;
        };
        return Dom;
    })();
    exports.Dom = Dom;    
    //#endregion
    })
//@ sourceMappingURL=main.js.map
