define(["require", "exports", 'thrust/util', './log', './instance', './ignite', './capsule', 'domReady', 'has', 'thrust/config'], function(require, exports, __util__, __log__, __thrustInstance__, __igniteSpec__, __m__, __domReady__, __has__, __tConfig__) {
    'use strict';
    
    var util = __util__;

    var _ = util._;
    var log = __log__;

    var thrustInstance = __thrustInstance__;

    var igniteSpec = __igniteSpec__;

    var m = __m__;

    var Module = m.Module;
    var domReady = __domReady__;

    var has = __has__;

    var tConfig = __tConfig__;

    exports.className = 'Thrust';
    var INIT = 'init', START = 'start', READY = 'ready', STOP = 'stop', DESTROY = 'destroy', COUNTDOWN = 'countdown', IGNITE = 'ignite', ORBIT = 'orbit', DEPLOY = 'deploy', DEORBIT = 'deorbit', SPLASHDOWN = 'splashdown', INORBIT = 'inOrbit', memoize = _.memoize, each = _.each, map = _.map, extend = _.extend, when = util.when, bind = _.bind, isArray = _.isArray, slice = Array.prototype.slice, toArray = _.toArray, merge = _.merge, flatten = _.flatten, format = util.format, resolveMethods = [
INIT, 
START, 
READY, 
STOP, 
DESTROY    ], instances = thrustInstance.instances, loadingInstances = thrustInstance.loadingInstances, safeInvoke = util.safeInvoke;
    var runRunnerFactory = memoize(function (method) {
        var conventionMethod = (method === STOP && START) || (method === DESTROY && INIT) || method, conventionValue = !(method === STOP || method === DESTROY), unsetReady = method === STOP, conventionCheck = conventionMethod !== method, conventionName = format('{0}-status', conventionMethod), runner = runnerFactory(method, conventionName, conventionValue, unsetReady), logMessage = format('Thrust: {0}ing module "{{0}}" failed!', method), runningMessage = format('Thrust: Running {0} for module "{{0}}".', method);
        return function (names) {
            var args = [];
            for (var _i = 0; _i < (arguments.length - 1); _i++) {
                args[_i] = arguments[_i + 1];
            }
            var that = this;
            if(!isArray(names)) {
                names = [
                    names
                ];
            }
            var args, results = [];
            each(names, function (name) {
                has('DEBUG') && log.debug(format(runningMessage, name));
                var mod = that.modules[name];
                if(!mod && !that.failedModules[name]) {
                    var loaderDefer = when.defer();
                    require([
                        name
                    ], function (moduleDefn) {
                        that.createModule(moduleDefn && moduleDefn.name || name, moduleDefn);
                        var result = runRunnerFactory(method).apply(that, [
                            moduleDefn.name
                        ].concat(args));
                        when.chain(when.all(flatten(result)), loaderDefer);
                    }, function () {
                        that.failedModules[name] = true;
                        loaderDefer.resolve();
                    });
                    results.push(loaderDefer.promise);
                } else {
                    if((conventionCheck && mod.convention(conventionName)) || !mod.convention(conventionName)) {
                        if(has('DEBUG') && tConfig.throwErrors) {
                            results.push(runner(that, name, mod, args));
                        } else {
                            try  {
                                results.push(runner(that, name, mod, args));
                            } catch (e) {
                                has('DEBUG') && log.error(format(logMessage, name), e, e.stack);
                            }
                        }
                    }
                }
            });
            return results.length && results;
        }
    });
    var runnerFactory = memoize(function (method, conventionName, conventionValue, unsetReady) {
        var eventName = format('thrust/module/{0}', method), infoFormat = format('Thrust: {0}ing module "{{0}}"', method.charAt(0).toUpperCase() + method.substring(1)), debugFormat = format('Thrust: Calling module "{{0}}" {0}()', method), compAfter = method === STOP || method === DESTROY || false;
        return function (that, name, mod, args) {
            has('DEBUG') && log.info(format(infoFormat, name));
            has('DEBUG') && log.debug(format(conventionName, name));
            return mod.thrustCall(method, compAfter, __getModuleArgs(that.name, name, args)).then(function () {
                that.mediator && that.mediator.fire(eventName, name);
                mod.convention(conventionName, conventionValue);
                if(unsetReady) {
                    mod.convention(READY + '-status', false);
                }
            });
        }
    });
    var allRunnerFactory = memoize(function (method) {
        var infoFormat = format('Thrust: {0}ing all modules... [{{0}}]', method.charAt(0).toUpperCase() + method.substring(1)), pluralName = format('thrust/module/all/{0}', method), checkAutoStart = method === INIT || method === START || method === READY;
        return function (that) {
            that.mediator && that.mediator.fire(pluralName);
            var modules = that.modules, results = [];
            has('DEBUG') && log.info(format(infoFormat, map(modules, function (x, i) {
                return x.convention('autoStart') && i;
            }).join(', ')));
            each(modules, function (x, i) {
                if(!checkAutoStart || (checkAutoStart && x.convention('autoStart'))) {
                    results.push(that[method](i));
                }
            });
            if(that.startingModules && checkAutoStart) {
                has('DEBUG') && log.info(format(infoFormat, that.startingModules.join(', ')));
                that[method](that.startingModules);
            }
            return when.all(results);
        }
    });
    function fireThrustEvent(that, event) {
        return function () {
            that.mediator && that.mediator.fire(event);
        }
    }
    function childrenCallMethod(that, method, stopping) {
        var items = [];
        each(that.children, function (child) {
            if(stopping) {
                child.__previousState = child.started;
            }
            if(child.cfg.autoStart || (!stopping && child.__previousState) || (stopping && child.started)) {
                items.push(child[method](false, true));
            }
        });
        if(items.length) {
            return when.all(items);
        }
    }
    function flattenWithAsync(that, arr) {
        return util.flattenToPromises(arr.concat(that.cfg.async && [
            when.delay(0)
        ] || []));
    }
    var thrustLogEvent;
    if(has('DEBUG')) {
        thrustLogEvent = function (message, name) {
            return function () {
                log.debug(format.apply(format, [
                    message
                ].concat(toArray(arguments))));
            }
        };
    } else {
        thrustLogEvent = function () {
            return util.noop;
        };
    }
    var thrustShouldExecute = function (that, calledByParent, stopping) {
        if(that.parent && that.cfg.childInstance && !that.parent.started && !calledByParent) {
            log.warn(format('Cannot execute on child instance "{0}" parent instance "{1}" must be started first.', that.name, that.parent.name));
        }
        if(!stopping && that.started || stopping && !that.started) {
            log.warn(format('Cannot start thrust instance "{0}" since it already started', that.name));
        }
        return true;
    };
    function __getModuleArgs(instanceName, name, originalArgs) {
        var args = toArray(originalArgs);
        if(args.length) {
            return args;
        }
        var instanceRegistrations = Thrust.__moduleRegistrations[instanceName];
        if(instanceRegistrations && instanceRegistrations[name]) {
            return instanceRegistrations[name];
        }
        return args;
    }
    var Thrust = (function () {
        function Thrust(name) {
            this.__conventions = [];
            this.__conventionPluckPropertiesCache = null;
            this.__thrustConventions = [];
            this.cfg = merge(tConfig, {
                autoStart: false,
                async: false,
                childInstance: false,
                automaticLifecycle: true
            });
            this.config = merge(tConfig, {
                autoStart: false,
                async: false,
                childInstance: false,
                automaticLifecycle: true
            });
            this.name = name;
            this.modules = {
            };
            this.failedModules = {
            };
            this.children = [];
            this.started = false;
        }
        Thrust.__moduleRegistrations = {
        };
        Thrust.prototype.create = function (name, mod, preBuilt) {
            has('DEBUG') && log.debug(format('Thrust: Creating new instance of "{0}"', name));
            var oldModule, that = this;
            if(preBuilt) {
                oldModule = mod;
                mod = mod.instance;
            }
            if(!preBuilt) {
                mod = new m.Module(that, mod, name);
            } else {
                mod = oldModule;
            }
            if(that.modules[mod.name]) {
                throw new Error(format('Duplicate module name "{0}".', name));
            }
            that.modules[mod.name] = mod;
            has('DEBUG') && log.info(format('Thrust: Created module "{0}"', name));
            that.mediator.fire('thrust/module/create', name);
            if(that && that.started && mod.convention('autoStart')) {
                that.start(mod.name);
            }
            return mod;
        };
        Thrust.prototype.startup = function (event, eventType) {
            var that = this;
            var promise = when.all(flattenWithAsync(that, [
                safeInvoke(that.__conventions, event, that), 
                that[eventType](), 
                childrenCallMethod(that, event)
            ]));
            when.any([
                promise
            ]).then(fireThrustEvent(that, 'thrust/' + eventType));
            return promise;
        };
        Thrust.prototype._countdown = function (calledByParent) {
            var that = this;
            if(!thrustShouldExecute(that, calledByParent)) {
                return;
            }
            has('DEBUG') && thrustLogEvent('Launch instance "{0}" in 5... 4... 3... 2... 1...', that.name);
            var promise = this.startup(COUNTDOWN, INIT);
            has('DEBUG') && when.any([
                promise
            ]).then(thrustLogEvent('Thrust instance "{0}" has been initalized.', that.name));
            return promise;
        };
        Thrust.prototype.countdown = function (calledByParent) {
            var that = this;
            if(!thrustShouldExecute(that, calledByParent)) {
                return;
            }
            if(that.cfg.automaticLifecycle && (!that.cfg.childInstance)) {
                return Thrust.launchSequence(that, calledByParent);
            }
            return that._countdown(calledByParent);
        };
        Thrust.prototype.ignite = function (calledByParent) {
            var that = this;
            if(!thrustShouldExecute(that, calledByParent)) {
                return;
            }
            has('DEBUG') && thrustLogEvent('Firing rockets for thurst instance "{0}".', that.name);
            var promise = this.startup(IGNITE, START);
            has('DEBUG') && when.any([
                promise
            ]).then(thrustLogEvent('Thrust instance "{0}" has been started.', that.name));
            return promise;
        };
        Thrust.prototype.orbit = function (calledByParent) {
            var that = this;
            if(!thrustShouldExecute(that, calledByParent)) {
                return;
            }
            has('DEBUG') && thrustLogEvent('Firing stage two thrusters for thrust instance "{0}".', that.name)();
            var domReadyDefer = when.defer();
            domReadyDefer.promise.then(fireThrustEvent(that, 'thrust/dom/ready'));
            domReady(domReadyDefer.resolve);
            var promise = when.all(flattenWithAsync(that, [
                domReadyDefer.promise, 
                safeInvoke(that.__conventions, ORBIT, that), 
                childrenCallMethod(that, ORBIT)
            ]));
            has('DEBUG') && when.any([
                promise
            ]).then(thrustLogEvent('Thrust instance "{0}" is almost ready.', that.name));
            return promise;
        };
        Thrust.prototype.deploy = function (calledByParent) {
            var that = this;
            if(!thrustShouldExecute(that, calledByParent)) {
                return;
            }
            if(has('DEBUG')) {
                var timeStart = that.config.debug.timeStart, timeEnd = new Date().getTime(), startTime = (timeEnd - timeStart), ttoDiv = document.getElementById('tto');
                if(ttoDiv) {
                    ttoDiv.innerHTML = startTime + 'ms';
                }
            }
            var promise = when.all(flattenWithAsync(that, [
                that.ready(), 
                childrenCallMethod(that, DEPLOY)
            ])).then(fireThrustEvent(that, 'thrust/ready'));
            has('DEBUG') && when.any([
                promise
            ]).then(thrustLogEvent('Thrust instance "{0}" is now ready.', that.name));
            return promise;
        };
        Thrust.prototype.inOrbit = function () {
            var that = this;
            that.started = true;
            childrenCallMethod(that, INORBIT);
            if(has('DEBUG')) {
                var timeStart = that.config.debug.timeStart, timeEnd = new Date().getTime(), startTime = (timeEnd - timeStart);
                log.info('Started in ' + startTime + 'ms');
                var ttrDiv = document.getElementById('ttr');
                if(ttrDiv) {
                    ttrDiv.innerHTML = startTime + 'ms';
                }
            }
        };
        Thrust.prototype.shutdown = function (event, eventType) {
            var that = this;
            var promise = when.all(flattenWithAsync(that, [
                childrenCallMethod(that, event, true), 
                that[eventType](), 
                safeInvoke(that.__conventions, event, that)
            ]));
            when.any([
                promise
            ]).then(fireThrustEvent(that, 'thrust/' + eventType));
            return promise;
        };
        Thrust.prototype._deorbit = function (calledByParent) {
            var that = this;
            if(!thrustShouldExecute(that, calledByParent, true)) {
                return;
            }
            has('DEBUG') && thrustLogEvent('Reentering earths atmosphere for thrust instance "{0}".', that.name);
            var promise = this.shutdown(DEORBIT, STOP);
            has('DEBUG') && when.any([
                promise
            ]).then(thrustLogEvent('Thrust instance "{0}" is now stopped.', that.name));
            return promise;
        };
        Thrust.prototype.deorbit = function (calledByParent) {
            var that = this;
            if(!thrustShouldExecute(that, calledByParent, true)) {
                return;
            }
            if(that.cfg.automaticLifecycle && (!that.cfg.childInstance)) {
                return when.sequence([
                    _.bind(that._deorbit, that), 
                    _.bind(that.splashdown, that)
                ], calledByParent);
            }
            return that._deorbit(calledByParent);
        };
        Thrust.prototype.splashdown = function (calledByParent) {
            var that = this;
            if(!thrustShouldExecute(that, calledByParent, true)) {
                return;
            }
            has('DEBUG') && thrustLogEvent('Landing in the middle of the atlantic for thrust instance "{0}".', that.name);
            var promise = this.shutdown(SPLASHDOWN, DESTROY);
            has('DEBUG') && when.any([
                promise
            ]).then(thrustLogEvent('Thrust instance "{0}" is now being destroyed', that.name));
            promise.then(function () {
                that.started = false;
            });
            return promise;
        };
        Thrust.prototype.moduleMethod = function (method, name, args, reverse, dependentMethods, startedMethods) {
            var that = this, pipe = [];
            if(!name) {
                var result = allRunnerFactory(method)(that);
                if(result) {
                    return result;
                }
            }
            var names = [];
            if(!isArray(name)) {
                names = [
                    name
                ];
            } else {
                names = (name);
            }
            if(dependentMethods && dependentMethods.length) {
                var items = {
                };
                for(var i = 0, iLen = names.length; i < iLen; i++) {
                    var n = names[i], mod = that.modules[n];
                    each(dependentMethods, function (x) {
                        if(!items[x]) {
                            items[x] = [];
                        }
                        if(!reverse && (!mod || !mod.convention(x + '-status')) || (reverse && mod.convention(x + '-status'))) {
                            items[x].push(n);
                        }
                    });
                }
                each(dependentMethods, function (x) {
                    if(items[x] && items[x].length) {
                        pipe.push(function () {
                            return when.all(flatten(that[x].apply(that, [
                                items[x]
                            ].concat(args))));
                        });
                    }
                });
            }
            pipe.push(function () {
                return when.all(flatten(runRunnerFactory(method).apply(that, [
                    names
                ].concat(args))));
            });
            if(that.started && startedMethods && startedMethods.length) {
                each(startedMethods, function (x) {
                    pipe.push(function () {
                        return when.all(flatten(that[x].apply(that, [
                            names
                        ].concat(args))));
                    });
                });
            }
            return when.pipeline(pipe);
        };
        Thrust.prototype.init = function (name) {
            var args = [];
            for (var _i = 0; _i < (arguments.length - 1); _i++) {
                args[_i] = arguments[_i + 1];
            }
            var that = this;
            return that.moduleMethod(INIT, name, args, false);
        };
        Thrust.prototype.start = function (name) {
            var args = [];
            for (var _i = 0; _i < (arguments.length - 1); _i++) {
                args[_i] = arguments[_i + 1];
            }
            var that = this;
            return that.moduleMethod(START, name, args, false, [
                INIT
            ], [
                READY
            ]);
        };
        Thrust.prototype.ready = function (name) {
            var args = [];
            for (var _i = 0; _i < (arguments.length - 1); _i++) {
                args[_i] = arguments[_i + 1];
            }
            var that = this;
            return that.moduleMethod(READY, name, args, false, [
                INIT, 
                START
            ]);
        };
        Thrust.prototype.stop = function (name) {
            var args = [];
            for (var _i = 0; _i < (arguments.length - 1); _i++) {
                args[_i] = arguments[_i + 1];
            }
            var that = this;
            return that.moduleMethod(STOP, name, args, true);
        };
        Thrust.prototype.destroy = function (name) {
            var args = [];
            for (var _i = 0; _i < (arguments.length - 1); _i++) {
                args[_i] = arguments[_i + 1];
            }
            var that = this, method = DESTROY;
            return that.moduleMethod(DESTROY, name, args, true, [
                STOP
            ]);
        };
        Thrust.prototype.__injectModule = function (module) {
            this.create(module.name, module, true);
        };
        Thrust.prototype.createModule = function (name, moduleDefn) {
            var that = this;
            if(that.modules[name]) {
                return that.modules[name];
            }
            var module = new Module(that, moduleDefn, name);
            that.__injectModule(module);
            return module;
        };
        Thrust.prototype.spawn = function (settings) {
            var that = this;
            return Thrust.launch(extend({
            }, {
                childInstance: true
            }, settings), true).then(function (context) {
                var thrust = context.thrust;
                that.children.push(thrust);
                thrust.parent = that;
                return context;
            });
        };
        Thrust.prototype.registerModule = function (name) {
            var that = this;
            Thrust.registerModule.apply(Thrust, [
                that.name
            ].concat(toArray(arguments)));
        };
        Thrust.launchSequence = function launchSequence(instance, calledByParent) {
            return when.sequence([
                _.bind(instance._countdown, instance), 
                _.bind(instance.ignite, instance), 
                _.bind(instance.orbit, instance), 
                _.bind(instance.deploy, instance), 
                _.bind(instance.inOrbit, instance)
            ], calledByParent);
        }
        Thrust.launch = function launch(settings, calledByParent) {
            if(!settings) {
                settings = {
                    name: 'global'
                };
            }
            if(!settings.name) {
                settings.name = 'global';
            }
            if(has('DEBUG')) {
                settings.debug = {
                    timeStart: new Date().getTime()
                };
            }
            settings = igniteSpec.mergeSettings(settings);
            var pipe = [
                igniteSpec.fuse
            ];
            var setupDefer = Thrust.__fetchInstance(settings.name);
            pipe.push(function (context) {
                var thrust = context.thrust, modules = thrust.startingModules = context.cfg.modules, config = thrust.config = thrust.cfg;
                instances[thrust.name] = thrust;
                return context;
            });
            if(settings.automaticLifecycle) {
                pipe.push(function (context) {
                    var thrust = context.thrust, d = when.defer();
                    Thrust.launchSequence(thrust, calledByParent).then(function () {
                        return d.resolve(context);
                    });
                    return d.promise;
                });
            }
            var pipeline = when.pipeline(pipe, settings).then(function (context) {
                return setupDefer.resolve(context);
            });
            if(tConfig.exposeGlobals) {
                if(!window['Thrust']) {
                    window['Thrust'] = Thrust;
                }
                pipeline.then(function (context) {
                    window[settings.name] = context;
                });
            }
            return pipeline;
        }
        Thrust.getInstance = function getInstance(name) {
            return thrustInstance.getInstance(name);
        }
        Thrust.__fetchInstance = function __fetchInstance(name) {
            return thrustInstance.fetchInstance(name);
        }
        Thrust.createModule = function createModule(instanceName, name, moduleDefn) {
            var instance = Thrust.getInstance(instanceName);
            if(instance) {
                var module = new Module(instance, moduleDefn, name);
                instance.__injectModule(module);
                return module;
            }
        }
        Thrust.registerModule = function registerModule(instanceName, name) {
            if(!instanceName) {
                throw new Error('instanceName is required!');
            }
            if(!name) {
                throw new Error('name is required!');
            }
            if(!Thrust.__moduleRegistrations[instanceName]) {
                Thrust.__moduleRegistrations[instanceName] = {
                };
            }
            var args = toArray(arguments).slice(2);
            if(Thrust.__moduleRegistrations[instanceName][name]) {
                throw new Error(format('Module "{0}" already registered to instance "{1}"', name, instanceName));
            }
            Thrust.__moduleRegistrations[instanceName][name] = args || [];
        }
        Thrust.__getModuleArgs = __getModuleArgs;
        return Thrust;
    })();
    exports.Thrust = Thrust;    
    function load(name, parentRequire, load, config) {
        var parts = name.split(':'), realName = parts[0], pluginName = parts[1] || 'thrust';
        var instancePromise = Thrust.__fetchInstance(realName);
        instancePromise.promise.then(function (context) {
            var plugin = context[pluginName];
            if(!plugin) {
                throw new Error(format('Plugin "{0}" does not exist on thrust instance "{1}".', pluginName, realName));
            }
            load(plugin);
        });
    }
    exports.load = load;
})
//@ sourceMappingURL=main.js.map
