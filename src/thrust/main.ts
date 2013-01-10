/// <reference path="interfaces/thrust.d.ts" />
/// <reference path="../../lib/DefinitelyTyped/requirejs/require-2.1.d.ts" />

// Disabled until TS supports module per file in some way (ie exports is exports.<export> not  exports.moduleName.<export>)
/*export module instance {*/

'use strict';

import requireModule = module('module')
import util = module('thrust/util')
var _ = util._;

import log = module('./log');
import thrustInstance = module('./instance');
import igniteSpec = module('./ignite');
export import m = module('./capsule');
var Module = m.Module;
import domReady = module('domReady');
import has = module('has');
import tConfig = module('thrust/config');
export var className = 'Thrust';
/**
	The thrust application!

@module thrust
@main thrust
**/

var INIT = 'init',
    START = 'start',
    READY = 'ready',
    STOP = 'stop',
    DESTROY = 'destroy',
    COUNTDOWN = 'countdown',
    IGNITE = 'ignite',
    ORBIT = 'orbit',
    DEPLOY = 'deploy',
    DEORBIT = 'deorbit',
    SPLASHDOWN = 'splashdown',
    INORBIT = 'inOrbit',
    memoize = _.memoize,
    each = _.each,
    map = _.map,
    extend = _.extend,
    when = util.when,
    bind = _.bind,
    isArray = _.isArray,
    slice = Array.prototype.slice,
    toArray = _.toArray,
    merge = _.merge,
    flatten = _.flatten,
    format = util.format,
    resolveMethods = [INIT, START, READY, STOP, DESTROY],
    instances = thrustInstance.instances,
    loadingInstances = thrustInstance.loadingInstances,
    safeInvoke = util.safeInvoke;

//#region Runner Factories
var runRunnerFactory = memoize(function (method: string) {
    var conventionMethod = (method === STOP && START) || (method === DESTROY && INIT) || method,
        conventionValue = !(method === STOP || method === DESTROY),
        unsetReady = method === STOP,
        conventionCheck = conventionMethod !== method,
        conventionName = format('{0}-status', conventionMethod),
        runner = runnerFactory(method, conventionName, conventionValue, unsetReady),
        logMessage = format('Thrust: {0}ing module "{{0}}" failed!', method),
        runningMessage = format('Thrust: Running {0} for module "{{0}}".', method);

    return function (names) {
        var that = this;
        if (!isArray(names))
            names = [names];
        var args = slice.call(arguments, 1),
            results = [];

        each(names, function (name) {
            has('DEBUG') && log.debug(format(runningMessage, name));
            var mod = that.modules[name];

            if (!mod && !that.failedModules[name]) {
                // try to fetch the module.
                // returning the proper defer in it's place
                var loaderDefer = when.defer();

                require([name], function (moduleDefn) {
                    that.createModule(moduleDefn && moduleDefn.name || name, moduleDefn);

                    var result = runRunnerFactory(method).apply(that, [moduleDefn.name].concat(args));
                    when.chain(when.all(flatten(result)), loaderDefer);
                }, function () {
                    that.failedModules[name] = true;
                    loaderDefer.resolve();
                });

                results.push(loaderDefer.promise);
            }
            else if ((conventionCheck && mod.convention(conventionName)) || !mod.convention(conventionName)) {
                if (tConfig.throwErrors) {
                    results.push(runner(that, name, mod, args));
                }
                else {
                    try {
                        results.push(runner(that, name, mod, args));
                    }
                    catch (e) {
                        has('DEBUG') && log.error(format(logMessage, name), e, e.stack);
                    }
                }
            }
        });

        return results.length && results;
    };
});

var runnerFactory = memoize(function (method: string, conventionName: string, conventionValue: any, unsetReady: bool) {
    var eventName = format('thrust/module/{0}', method),
        infoFormat = format('Thrust: {0}ing module "{{0}}"', method.charAt(0).toUpperCase() + method.substring(1)),
        debugFormat = format('Thrust: Calling module "{{0}}" {0}()', method),
        compAfter = method === STOP || method === DESTROY || false;

    return function (that, name, mod, args) {
        has('DEBUG') && log.info(format(infoFormat, name));
        has('DEBUG') && log.debug(format(conventionName, name));
        return mod.thrustCall(method, compAfter, __getModuleArgs(that.name, name, args)).then(function () {
            that.mediator && that.mediator.fire(eventName, name);
            mod.convention(conventionName, conventionValue);
            if (unsetReady) mod.convention(READY + '-status', false);
        });
    };
});

var allRunnerFactory = memoize(function (method: string) {
    var infoFormat = format('Thrust: {0}ing all modules... [{{0}}]', method.charAt(0).toUpperCase() + method.substring(1)),
        pluralName = format('thrust/module/all/{0}', method),
        checkAutoStart = method === INIT || method === START;

    return function (that: IThrust) {
        that.mediator && that.mediator.fire(pluralName);
        var modules = that.modules,
            results: Promise[] = [];

        has('DEBUG') && log.info(format(infoFormat, map(
            modules,
            function (x: any, i: string) {
                return x.convention('autoStart') && i;
            }).join(', '))
        );

        each(modules, function (x, i) {
            if (!checkAutoStart || (checkAutoStart && x.convention('autoStart')))
                results.push(that[method](i));
        });

        if (that.startingModules && checkAutoStart) {
            has('DEBUG') && log.info(format(infoFormat, that.startingModules.join(', ')));
            that[method](that.startingModules);
        }

        return when.all(results);
    };
});

function fireThrustEvent(that: IThrust, event: string) {
    return function () {
        that.mediator && that.mediator.fire(event);
    };
}

function childrenCallMethod(that: IThrust, method: string, stopping?: bool) {
    var items = [];
    each(that.children, function (child: IThrust) {
        if (stopping)
            child.__previousState = child.started;
        if (child.cfg.autoStart || (!stopping && child.__previousState) || (stopping && child.started))
            items.push(child[method](false, true));
    });
    if (items.length)
        return when.all(items);
}

function flattenWithAsync(that, arr: any[]) {
    return util.flattenToPromises(arr.concat(that.cfg.async && [when.delay(0)] || []));
}

var thrustLogEvent;
if (has('DEBUG')) {
    thrustLogEvent = function (message, name) {
        return function () {
            log.debug(format.apply(format, [message].concat(toArray(arguments))));
        };
    };
}
else {
    thrustLogEvent = function () {
        return util.noop;
    };
}

var thrustShouldExecute = function (that: IThrust, calledByParent: bool, stopping?: bool) {
    if (that.parent && that.cfg.childInstance && !that.parent.started && !calledByParent) {
        log.warn(format('Cannot execute on child instance "{0}" parent instance "{1}" must be started first.', that.name, that.parent.name));
    }

    if (!stopping && that.started || stopping && !that.started) {
        log.warn(format('Cannot start thrust instance "{0}" since it already started', that.name));
    }

    return true;
};

/**
Gets the modules arguments from the registrations.

If original args contains anything it is passed instead of the registrations.
If the registrations are in place it will return them.

@method __getModuleArgs
@static
@private
@param {String} instanceName The thrust instance
@param {String} name The module name
@param {Array} originalArgs The original arguments passed into the calling method.
**/
function __getModuleArgs(instanceName: string, name: string, originalArgs: any[]) {
    var args = toArray(originalArgs);
    if (args.length)
        return args;

    var instanceRegistrations = Thrust.__moduleRegistrations[instanceName];
    if (instanceRegistrations && instanceRegistrations[name])
        return instanceRegistrations[name];

    return args;
}
//#endregion

/**
	The primary thrust class.

@class thrust.Thrust
@constructor
@param {String} name The name of this thrust instance
@returns {Thrust}
**/
export class Thrust implements IThrust {
    public name: string;
    public modules: Object;
    public failedModules: Object;
    public parent: IThrust;
    public children: IThrust[];
    public startingModules: string[];
    public __previousState: bool;
    public started: bool;
    public __conventions: ThrustConvention[] = [];
    public __conventionPluckPropertiesCache: any[] = null;
    public __thrustConventions: ThrustConvention[] = [];

    public cfg: IThrustConfig = merge(tConfig, {
        autoStart: false,
        async: false,
        childInstance: false,
        automaticLifecycle: true
    });

    public config: IThrustConfig = merge(tConfig, {
        autoStart: false,
        async: false,
        childInstance: false,
        automaticLifecycle: true
    });

    public mediator: IThrustMediator;

    constructor(name: string) {
        this.name = name;
        this.modules = {};
        this.failedModules = {};
        this.children = [];
        this.started = false;
    }

    /**
    Lists the module registrations.

    @property __moduleRegistrations
    @static
    @private
    **/
    public static __moduleRegistrations = {};
    /**
		Creates a new thrust module.

	@method create
	@param {String} name The unique module name.
	@param {Object} module The module defintion.
	@param {Boolean} preBuild Has this module been prebuilt, in other words has it been created, by wire.js and needs to be injected.
	@returns {Module} The new module instance.
	**/
    public create(name: string, mod: any, preBuilt?: bool): IThrustModule {
        has('DEBUG') && log.debug(format('Thrust: Creating new instance of "{0}"', name));

        var oldModule, that = this;
        if (preBuilt) {
            oldModule = mod;
            mod = mod.instance;
        }

        if (!preBuilt)
            mod = new m.Module(that, mod, name);
        else
            mod = oldModule;

        // Modules cannot have duplicate names, choose a new one.
        if (that.modules[mod.name])
            throw new Error(format('Duplicate module name "{0}".', name));

        // m is the mediators internal module.
        that.modules[mod.name] = mod;

        has('DEBUG') && log.info(format('Thrust: Created module "{0}"', name));
        // Notify the mediator that a module has been created.
        that.mediator.fire('thrust/module/create', name);

        if (that && that.started && mod.convention('autoStart'))
            that.start(mod.name);

        return <IThrustModule> mod;
    }
    //#region Global Runners

    private startup(event: string, eventType: string): Promise {
        var that = this;
        var promise = when.all(flattenWithAsync(that, [
            safeInvoke(that.__conventions, event, that),
            that[eventType](),
            childrenCallMethod(that, event)
        ]));
        when.any([promise]).then(fireThrustEvent(that, 'thrust/' + eventType));
        return promise;
    }

    public _countdown(calledByParent?: bool): Promise {
        var that = this;
        if (!thrustShouldExecute(that, calledByParent))
            return;

        has('DEBUG') && thrustLogEvent('Launch instance "{0}" in 5... 4... 3... 2... 1...', that.name);

        var promise = this.startup(COUNTDOWN, INIT);

        has('DEBUG') && when.any([promise]).then(thrustLogEvent('Thrust instance "{0}" has been initalized.', that.name));

        return promise;
    }
    /**
		Begins the countdown to thrusts start.
		Loading can be deferred by returning a promise from any convention, or module method.

	@method countdown
	@async
	@returns {Promise} The promise of when the countdown is completed.
	**/
    public countdown(calledByParent?: bool): Promise {
        var that = this;
        if (!thrustShouldExecute(that, calledByParent))
            return;

        if (that.cfg.automaticLifecycle && (!that.cfg.childInstance)) {
            return Thrust.launchSequence(that, calledByParent);
        }
        return that._countdown(calledByParent);
    }
    /**
		Begins the ingition as thrust starts up.
		Loading can be deferred by returning a promise from any convention, or module method.

	@method ignite
	@async
	@returns {Promise} The promise of when the ingition is completed.
	**/
    public ignite(calledByParent?: bool): Promise {
        var that = this;
        if (!thrustShouldExecute(that, calledByParent))
            return;

        has('DEBUG') && thrustLogEvent('Firing rockets for thurst instance "{0}".', that.name);

        var promise = this.startup(IGNITE, START);

        has('DEBUG') && when.any([promise]).then(thrustLogEvent('Thrust instance "{0}" has been started.', that.name));

        return promise;
    }
    /**
		Thrust prepares for orbit.
		Loading can be deferred by returning a promise from any convention.

	@method orbit
	@async
	@returns {Promise} The promise of when thrust is in orbit.
	**/
    public orbit(calledByParent?: bool): Promise {
        var that = this;
        if (!thrustShouldExecute(that, calledByParent))
            return;

        has('DEBUG') && thrustLogEvent('Firing stage two thrusters for thrust instance "{0}".', that.name)();

        var domReadyDefer = when.defer();
        domReadyDefer.promise.then(fireThrustEvent(that, 'thrust/dom/ready'));
        domReady(domReadyDefer.resolve);

        var promise = when.all(flattenWithAsync(that, [
            domReadyDefer.promise,
            safeInvoke(that.__conventions, ORBIT, that),
            childrenCallMethod(that, ORBIT)
        ]));

        has('DEBUG') && when.any([promise]).then(thrustLogEvent('Thrust instance "{0}" is almost ready.', that.name));

        return promise;
    }
    /**
		Thrust deploys components in orbit
		Loading can be deferred by returning a promise from any module method.

	@method deploy
	@async
	@returns {Promise} The promise of when thrust has fully deployed.
	**/
    public deploy(calledByParent?: bool): Promise {
        var that = this;
        if (!thrustShouldExecute(that, calledByParent))
            return;

        if (has('DEBUG')) {
            var timeStart = that.config.debug.timeStart,
            timeEnd = new Date().getTime(),
            startTime = (timeEnd - timeStart),
            ttoDiv = document.getElementById('tto');

            if (ttoDiv)
                ttoDiv.innerHTML = startTime + 'ms';
        }

        var promise = when.all(flattenWithAsync(that, [
            that.ready(),
            childrenCallMethod(that, DEPLOY)
        ])).then(fireThrustEvent(that, 'thrust/ready'));

        has('DEBUG') && when.any([promise]).then(thrustLogEvent('Thrust instance "{0}" is now ready.', that.name));

        return promise;
    }

    public inOrbit() {
        var that = this;
        that.started = true;

        childrenCallMethod(that, INORBIT);

        if (has('DEBUG')) {
            var timeStart = that.config.debug.timeStart,
                timeEnd = new Date().getTime(),
                startTime = (timeEnd - timeStart);

            log.info('Started in ' + startTime + 'ms');

            var ttrDiv = document.getElementById('ttr');
            if (ttrDiv)
                ttrDiv.innerHTML = startTime + 'ms';
        }
    }

    private shutdown(event: string, eventType: string): Promise {
        var that = this;
        var promise = when.all(flattenWithAsync(that, [
            childrenCallMethod(that, event, true),
            that[eventType](),
            safeInvoke(that.__conventions, event, that)
        ]))
        when.any([promise]).then(fireThrustEvent(that, 'thrust/' + eventType));
        return promise;
    }

    public _deorbit(calledByParent?: bool): Promise {
        var that = this;
        if (!thrustShouldExecute(that, calledByParent, true))
            return;

        has('DEBUG') && thrustLogEvent('Reentering earths atmosphere for thrust instance "{0}".', that.name);

        var promise = this.shutdown(DEORBIT, STOP);

        has('DEBUG') && when.any([promise]).then(thrustLogEvent('Thrust instance "{0}" is now stopped.', that.name));

        return promise;
    }
    /**
		Begins the deorbit as thrust shutdown.
		Shutdown can be deferred by returning a promise from any convention, or module method.

	@method deorbit
	@async
	@returns {Promise} The promise of when the ingition is completed.
	**/
    public deorbit(calledByParent?: bool): Promise {
        var that = this;
        if (!thrustShouldExecute(that, calledByParent))
            return;

        if (that.cfg.automaticLifecycle && (!that.cfg.childInstance)) {
            return when.sequence([
                _.bind(that._deorbit, that),
                _.bind(that.splashdown, that)
            ], calledByParent);
        }
        return that._deorbit(calledByParent);
    }
    /**
		Begins the splashdown as thrust shutdown.
		Shutdown can be deferred by returning a promise from any convention, or module method.

	@method splashdown
	@async
	@returns {Promise} The promise of when the ingition is completed.
	**/
    public splashdown(calledByParent?: bool): Promise {
        var that = this;
        if (!thrustShouldExecute(that, calledByParent, true))
            return;

        has('DEBUG') && thrustLogEvent('Landing in the middle of the atlantic for thrust instance "{0}".', that.name);

        var promise = this.shutdown(SPLASHDOWN, DESTROY);

        has('DEBUG') && when.any([promise]).then(thrustLogEvent('Thrust instance "{0}" is now being destroyed', that.name));

        promise.then(function () {
            that.started = false;
        });

        return promise;
    }

    private moduleMethod(method: string, name: string, args: any[], reverse: bool, dependentMethods?: string[], startedMethods?: string[]): Promise {
        var that = this, pipe = [];

        var result = !name && allRunnerFactory(method)(that);
        if (result)
            return result;

        var names: string[] = [];
        if (!isArray(name))
            names = [name];
        else
            names = (<any> name);

        if (dependentMethods && dependentMethods.length) {
            var items = {};
            for (var i = 0, iLen = names.length; i < iLen; i++) {
                var n = names[i],
                    mod = that.modules[n];

                each(dependentMethods, (x) => {
                    if (!items[x])
                        items[x] = [];
                    if (!reverse && (!mod || !mod.convention(x + '-status')) || (reverse && mod.convention(x + '-status')))
                        items[x].push(n);
                });
            }
            each(dependentMethods, (x) => {
                if (items[x] && items[x].length)
                    pipe.push(() => when.all(flatten(that[x].apply(that, [items[x]].concat(args)))));
            });
        }

        pipe.push(() => when.all(flatten(runRunnerFactory(method).apply(that, [names].concat(args)))));

        if (that.started && startedMethods && startedMethods.length) {
            each(startedMethods, (x) => { 
                pipe.push(() => when.all(flatten(that[x].apply(that, [names].concat(args)))));
            })
        }

        if (pipe.length === 1)
            return pipe[0]();
        return when.pipeline(pipe);
    }

    //#endregion
    //#region Module runners
    /**
		Begins the initalization process for a module.  This runs as part of the
			countdown phase, during start up, or in order, when creating modules.
		Loading can be deferred by returning a promise from any convention, or module method.

	@method init
	@param {String|Array of String} [name] The name of the module.  If name is null, all modules
		that return the property autoStart will be inited.
	@returns {Promise} The promise of when the init is completed.
	**/
    public init(name?: string[], ...args: any[]): Promise;
    public init(name?: string, ...args: any[]): Promise {
        var that = this;

        return that.moduleMethod(INIT, name, args, false)
    }
    /**
		Begins the startup process for a module.  This runs as part of the
			ignite phase, during start up, or in order, when creating modules.
		Loading can be deferred by returning a promise from any convention, or module method.

	@method start
	@param {String|Array of String} [name] The name of the module.  If name is null, all modules
		that return the property autoStart will be started.
	@returns {Promise} The promise of when the init is completed.
	**/
    public start(names?: string[], ...args: any[]): Promise;
    public start(name?: string, ...args: any[]): Promise {
        var that = this;

        return that.moduleMethod(START, name, args, false, [INIT], [READY]);
    }
    /**
		Begins the ready process for a module.  This runs as part of the
			orbit phase, during ready, or in order, when creating modules.
		Loading can be deferred by returning a promise from any convention, or module method.

	@method ready
	@param {String|Array of String} [name] The name of the module.  If name is null, all modules
		that return the property autoStart will be started.
	@returns {Promise} The promise of when the init is completed.
	**/
    public ready(name?: string[], ...args: any[]): Promise;
    public ready(name?: string, ...args: any[]): Promise {
        var that = this;

        return that.moduleMethod(READY, name, args, false, [INIT, START]);
    }
    /**
		Begins the stop process for a module.  This runs as part of the
			deorbit phase, during stop, or in order, when creating modules.
		Loading can be deferred by returning a promise from any convention, or module method.

	@method stop
	@param {String|Array of String} [name] The name of the module.  If name is null, all modules
		will be stopped.
	@returns {Promise} The promise of when the stop is completed.
	**/
    public stop(name?: string[], ...args: any[]): Promise;
    public stop(name?: string, ...args: any[]): Promise {
        var that = this;

        return that.moduleMethod(STOP, name, args, true);
    }
    /**
		Begins the destroy process for a module.  This runs as part of the
			slashdown phase, during destroy, or in order, when creating modules.
		Loading can be deferred by returning a promise from any convention, or module method.

	@method destroy
	@param {String|Array of String} [name] The name of the module.  If name is null, all modules
		will be destroyed.
	@returns {Promise} The promise of when the destroy is completed.
	**/
    public destroy(name?: string[], ...args: any[]): Promise;
    public destroy(name?: string, ...args: any[]): Promise {
        var that = this, method = DESTROY;

        return that.moduleMethod(DESTROY, name, args, true, [STOP]);
    }
    //#endregion
    /**
		Injects a preconstructed module into the thrust instance.

	@method __injectModule
	@private
	@param {Module} module The module to inject.
	**/
    public __injectModule(module: IThrustModule) {
        this.create(module.name, module , true);
    }
    /**
	Creates a module from the given definition object, with the given name.

	@method createModule
	@param {String} name The module name
	@param {Object} moduleDefn The module definition
	**/
    public createModule(name, moduleDefn) {
        var that = this;
        if (that.modules[name]) return that.modules[name];

        var module = new Module(that, moduleDefn, name);

        that.__injectModule(module );

        return module;
    }
    /**
	Launches another child module for thrust.

	@method spawn
	@param {Object} settings
	@returns {Promise} The promise that resolves once the child instance has fully loaded.  Resolves with the context that contains the thrust instance and all plugins that were loaded.
	**/
    public spawn(settings) {
        var that = this;
        return Thrust.launch(extend({}, { childInstance: true }, settings), true).then(function (context) {
            var thrust = context.thrust;
            that.children.push(thrust);
            thrust.parent = that;
            return context;
        });
    }
    /**
	Registers a specific module name, and arguments.  The arguments will be used when initantiating the module.
	
	@method registerModule
	@param {String} name The module name to assign the arguments with.
	@param {Object*} arguments, additional arguments that will be passed onto the moudle
	**/
    public registerModule(name) {
        var that = this;
        Thrust.registerModule.apply(Thrust, [that.name].concat(toArray(arguments)));
    }

    public static launchSequence(instance: IThrust, calledByParent: bool) {
        return when.sequence([
                _.bind(instance._countdown, instance),
                _.bind(instance.ignite, instance),
                _.bind(instance.orbit, instance),
                _.bind(instance.deploy, instance),
                _.bind(instance.inOrbit, instance)],
                calledByParent);
    }

    /**
	Initalizes a new Thrust instance based on the given settings.

	@method launch
	@static
	@param {Object} settings The module to inject
	**/
    public static launch(settings: IThrustConfig, calledByParent?: bool) {
        if (!settings)
            settings = { name: 'global' };

        if (!settings.name)
            settings.name = 'global';

        if (has('DEBUG')) {
            settings.debug = { timeStart: new Date().getTime() };
        }

        igniteSpec.mergeSettings(settings);

        var pipe: Function[] = [igniteSpec.fuse];

        var setupDefer = Thrust.__fetchInstance(settings.name);

        pipe.push((context) =>
        {
            var thrust = context.thrust,
                modules = thrust.startingModules = context.cfg.modules,
                config = thrust.config = thrust.cfg;
            instances[thrust.name] = thrust;
            return context;
        });

        if (settings.automaticLifecycle)
            pipe.push((context) => {
                var thrust: IThrust = context.thrust,
                    d = when.defer();

                launchSequence(thrust, calledByParent).then(() => d.resolve(context));
                return d.promise;
            });

        var pipeline = when.pipeline(pipe, settings)
            .then((context) => setupDefer.resolve(context));
        // We're only going to expose globals if requested.  This is a potential usecase that may be needed for some teams.
        if (tConfig.exposeGlobals) {
            if (!window['Thrust']) window['Thrust'] = Thrust;
            pipeline.then((context) => { window[settings.name] = context });
        }

        return pipeline;
    }

    /**
	Gets a named thrust stance if it exists.

	@method getInstance
	@static
	@param {String} name The instance name
	@returns {Thrust} The thrust instance
	**/
    public static getInstance(name: string): IThrust {
        return thrustInstance.getInstance(name);
    }

    /**
	Fetchs a named thrust stance if it exists.
	This loads asyncronously, as the instance may not be loaded

	@method __fetchInstance
	@static
	@private
	@param {String} name The instance name
	@returns {Promise} To a thrust instance spec
	**/
    public static __fetchInstance(name: string): Deferred {
        return thrustInstance.fetchInstance(name);
    }

    /**
	Creates a new module and hands it off to the given instance, if that instance exists.

	@method createModule
	@static
	@param {String} instanceName The thrust instance name
	@param {String} name The module name
	@param {Object} moduleDefn The module definition
	**/
    public static createModule(instanceName, name, moduleDefn) {
        var instance = Thrust.getInstance(instanceName);
        if (instance) {
            var module = new Module(instance, moduleDefn, name);
            instance.__injectModule(module );
            return module;
        }
    }

    /**
	Registers a specific module name, and arguments.  The arguments will be used when initantiating the module.

	@method registerModule
	@static
	@param {String} instanceName The thrust instance the module is to be associated with.
	@param {String} name The module name to assign the arguments with.
	@param {Object*} arguments, additional arguments that will be passed onto the moudle
	**/
    public static registerModule(instanceName, name) {
        if (!instanceName) throw new Error('instanceName is required!');
        if (!name) throw new Error('name is required!');

        if (!Thrust.__moduleRegistrations[instanceName])
            Thrust.__moduleRegistrations[instanceName] = {};

        var args = toArray(arguments).slice(2);

        if (Thrust.__moduleRegistrations[instanceName][name])
            throw new Error(format('Module "{0}" already registered to instance "{1}"', name, instanceName));

        Thrust.__moduleRegistrations[instanceName][name] = args || [];
    }

    public static __getModuleArgs = __getModuleArgs;
}

/**
AMD API
load

Handles fetching of a current thurst instance, by expected name.
Adding the : character requests a specific plugin.
thrust!global = Thrust instance
thrust!global:dom = The thrust dom plugin instance

@method load
@static
@param {String} name The name of the instance that is being fetched
@param {Function} parentRequire the require method to be loaded
@param {Function} load Allows the load to inform that AMD for the value to hand off
@param {Object} config The custom configuration.
**/
export function load(name: string, parentRequire, load, config) {
    var parts = name.split(':'),
        realName = parts[0],
        pluginName = parts[1] || 'thrust';

    var instancePromise = Thrust.__fetchInstance(realName);
    instancePromise.promise.then(function (context) {
        var plugin = context[pluginName];
        if (!plugin)
            throw new Error(format('Plugin "{0}" does not exist on thrust instance "{1}".', pluginName, realName));

        load(plugin);
    });
}
