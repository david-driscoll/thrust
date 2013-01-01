/// <reference path="interfaces/thrust.d.ts" />
/// <reference path="../../lib/DefinitelyTyped/requirejs/require-2.1.d.ts" />

// Disabled until TS supports module per file in some way (ie exports is exports.<export> not  exports.moduleName.<export>)
/*export module instance {*/
    /**
    Gets the thrust instances.

    @module thrust
    **/
    import util = module('thrust/util');
    var when = util.when;

    /**
    The available thrust instances
    index by name

    @for thrust.instance
    @property instances
    @private
    **/
    export var instances = {};

    /**
    The loading thurst instances.
    index by name

    @property loadingInstances
    @private
    **/
    export var loadingInstances = {};

    /**
    Gets a named thrust stance if it exists.
    
    @method getInstance
    @static
    @param {String} name The instance name
    @returns {Thrust} The thrust instance
    **/
    export function getInstance(name: string): IThrust
    {
        return instances[name] || null;
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
    export function fetchInstance(name : string) : Deferred
    {
    	var defer : Deferred = loadingInstances[name] || (loadingInstances[name] = when.defer());
        return defer;
    }
/*}*/