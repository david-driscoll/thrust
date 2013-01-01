define(["require", "exports", 'thrust/util', 'thrust/log', './jquery.interface', 'thrust/facade', 'thrust/events', 'has', 'thrust/instance', './config'], function(require, exports, __util__, __log__, __jQueryInterface__, __facade__, __events__, __has__, __instance__, __config__) {
    /// <reference path="../interfaces/dom/dom.d.ts" />
    /// <reference path="../interfaces/module.d.ts" />
    /// <reference path="../interfaces/dom/dom.facade.d.ts" />
    /// <reference path="../interfaces/mediator/mediator.d.ts" />
    /// <reference path="../interfaces/facade.d.ts" />
    /// <reference path="../../../lib/DefinitelyTyped/requirejs/require-2.1.d.ts" />
    // Disabled until TS supports module per file in some way (ie exports is exports.<export> not  exports.moduleName.<export>)
    /*export module instance {*/
    'use strict';
    
    var util = __util__;

    var _ = util._;
    var log = __log__;

    var jQueryInterface = __jQueryInterface__;

    var facade = __facade__;

    var events = __events__;

    var Events = events.Events;
    var has = __has__;

    var instance = __instance__;

    var config = __config__;

    exports.className = 'Dom';
    //#region Variable declaration
        var format = util.format, extend = _.extend, bind = _.bind, hasOwn = Object.prototype.hasOwnProperty, isObject = _.isObject, slice = Array.prototype.slice, when = util.when, isArray = _.isArray, initalizeContext = jQueryInterface.initalizeContext, updatejQueryInternals = jQueryInterface.updatejQueryInternals, updateThrustDomPrototype = jQueryInterface.updateThrustDomPrototype, GLOBAL = '.global';
    //#endregion
    var createFacade = function (dom) {
        if(!dom.query) {
            dom.query = bind(function (context) {
                if(typeof context !== 'undefined') {
                    return new DomFacade(dom.module, dom, context, true);
                }
                return dom;
            }, dom);
        }
        return dom.query;
    };
    var normalizeEvents = function (events, namespace) {
        if(isObject(events)) {
            for(var key in events) {
                events[key + namespace] = events[key];
                delete events[key];
            }
            return events;
        } else {
            if(!events) {
                return namespace;
            }
            events = events.split(' ');
            for(var i = 0, iLen = events.length; i < iLen; i++) {
                events.push(events[i] + namespace);
            }
            return events.slice(events.length / 2).join(' ');
        }
    };
    //#region DomFacade
    var DomFacade = (function () {
        var domFacade = facade.createFacade(function (module, parent, context, fake) {
            this.name = parent.name;
            //this.module = module;
            //this.parent = parent;
            this.__conventions = parent.__conventions;
            this.namespace = parent.namespace;
            //this._callbacks = parent._callbacks;
            //this.initEvents();
            // We're building a dom selector, aka jquery wrapper
            if(context && fake) {
                // Reference the parent module.
                this._parentDom = parent._parentDom;
                if(this._parentDom) {
                    // Init the context
                    initalizeContext.call(this, context);
                }
            } else {
                has('DEBUG') && log.debug('Dom: Creating new Dom facade');
                this._parentDom = this;
                this._rootContext = true;
                this.changeContext(document);
                createFacade(this);
                this._internalEvents = [];
            }
        });
        domFacade.prototype.init = function (fake) {
            this._internalEvents = this._internalEvents || [];
            has('DEBUG') && log.debug(format('Dom[{0}]: Initalizing {1}Dom facade', this.namespace, fake ? 'fake ' : ''));
            return this;
        };
        domFacade.prototype.start = function (m) {
            has('DEBUG') && log.debug(format('Dom[{0}]: Starting Dom facade', this.namespace));
            return null;
        };
        domFacade.prototype.stop = function (m) {
            has('DEBUG') && log.debug(format('Dom[{0}]: Stopping Dom facade', this.namespace));
            for(var i = this._internalEvents.length - 1; i >= 0; i--) {
                var sub = this._internalEvents[i];
                this._internalEvents.splice(i, 1);
                this.changeContext(sub.context);
                this.off.apply(this, (isArray(sub)) ? sub : (isArray(sub.args)) ? sub.args : []);
            }
            return null;
        };
        domFacade.prototype.destroy = function (m) {
            if(this._rootContext) {
                has('DEBUG') && log.debug(format('Dom[{0}]: Destroying Dom facade', this.namespace));
                delete this._internalEvents;
            }
            this._context = null;
            delete this._context;
            return null;
        };
        return domFacade;
    })();
    //#endregion
    var updatedDomPrototype = {
        changeContext: function (selector) {
            has('DEBUG') && log.info(format('Dom[{0}]: Changing Dom context', this.namespace || GLOBAL));
            updatejQueryInternals.call(this, selector);
            return this;
        },
        on: function (events) {
            has('DEBUG') && log.debug(format('Dom[{0}]: Binding events...', this.namespace || GLOBAL));
            var args = slice.call(arguments);
            args[0] = normalizeEvents(events, this.namespace || GLOBAL);
            this._context.on.apply(this._context, args);
            return this;
        },
        one: function (events) {
            has('DEBUG') && log.debug(format('Dom[{0}]: Binding one events...', this.namespace || GLOBAL));
            var args = slice.call(arguments);
            args[0] = normalizeEvents(events, this.namespace || GLOBAL);
            this._context.one.apply(this._context, args);
            return this;
        },
        off: function (events) {
            has('DEBUG') && log.debug(format('Dom[{0}]: Unbinding events...', this.namespace || GLOBAL));
            var args = slice.call(arguments);
            args[0] = normalizeEvents(events, this.namespace || GLOBAL);
            this._context.on.apply(this._context, args);
            return this;
        }
    };
    updateThrustDomPrototype(updatedDomPrototype, DomFacade);
    extend(DomFacade.prototype, updatedDomPrototype);
    DomFacade.prototype.$ = DomFacade.prototype.find;
    //#region Dom
    var UntypedDom = (function () {
        //#endregion
        function UntypedDom(name, mediator) {
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
                var aThat = that;
                aThat.query = aThat.$ = aThat.find = mod.$;
            });
        }
        UntypedDom.prototype.initEvents = //#region Events
        function () {
        };
        UntypedDom.prototype.extend = function (to, init) {
            return null;
        };
        UntypedDom.prototype.subscribe = function (events, callback, context, once) {
        };
        UntypedDom.prototype.unsubscribe = function (events, callback, context) {
        };
        UntypedDom.prototype.once = function (events, callback, context) {
        };
        UntypedDom.config = config;
        UntypedDom.prototype.createFacade = function (thrust, mod, facades) {
            if(mod.dom && !(facades.dom instanceof DomFacade)) {
                throw new Error('"dom" is a reserved property');
            }
            var dom;
            if(facades.dom) {
                facades.dom.updateFacade(mod, this, document);
                dom = facades.dom;
            } else {
                dom = facades.dom = new DomFacade(mod, this, document);
                mod.dom = mod.$ = dom.query;
                mod.dom.$ = mod.dom.find = function (selector) {
                    return dom.find(selector);
                };
            }
            return dom;
        };
        return UntypedDom;
    })();    
    var _dom = UntypedDom;
    extend(_dom.prototype, updatedDomPrototype, Events);
    exports.Dom = _dom;
    //#endregion
    })
//@ sourceMappingURL=main.js.map
