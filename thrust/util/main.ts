/// <reference path="../../lib/DefinitelyTyped/requirejs/require-2.1.d.ts" />

// Disabled until TS supports module per file in some way (ie exports is exports.<export> not  exports.moduleName.<export>)
/*export module util {*/

    import __ = module('lodash')
    import uFunction = module('./function');
    import uObject = module('./object');
    import uType = module('./type');
    import uGuid = module('./guid');
    import uUrl = module('./url');
    import uString = module('./string');
    import uWhen = module('./when');
    import uLibCamelCase = module('./lib/camelcase');
    import ul2o = module('./l2o');

    'use strict';
    /**
    @class thrust.util
    @uses thrust-util.array
    @uses thrust-util.collection
    @uses thrust-util.func
    @uses thrust-util.obj
    @uses thrust-util.type
    @uses thrust-util.url
    @uses thrust-util.when
    **/

    declare var arguments;

    export var _ : ILodash = __;
    export var linq = ul2o;

    export var instantiate = uFunction.instantiate;
    export var noop = uFunction.noop;
    export var safeInvoke = uFunction.safeInvoke;

    export var invert = uObject.invert;

    export var type = uType.type;
    export var isArrayLike = uType.isArrayLike;
    export var isArrayOrArrayLike = uType.isArrayOrArrayLike;

    export var emptyGuid = uGuid.emptyGuid;
    export var isGuid = uGuid.isGuid;
    export var isGuidEmpty = uGuid.isGuidEmpty;
    export var newGuid = uGuid.newGuid;

    export var getModuleNameForPath = uString.getModuleNameForPath;
    export var format = uString.format;

    export var param = uUrl.param;
    export var cleanUrl = uUrl.cleanUrl;
    export var fixupUrl = uUrl.fixupUrl;

    export var when = uWhen;
    export var flattenToPromises = uFunction.flattenToPromises;
    
    export var camelCase = uLibCamelCase.camelCase;
    export var unCamelCase = uLibCamelCase.unCamelCase;