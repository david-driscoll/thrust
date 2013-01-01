define(["require", "exports", 'when/debug', 'when/apply', 'when/delay', 'when/timeout', 'when/parallel', 'when/pipeline', 'when/sequence', 'when/cancelable'], function(require, exports, __w__, __whenApply__, __whenDelay__, __whenTimeout__, __whenParallel__, __whenPipeline__, __whenSequence__, __whenCancelable__) {
    /// <reference path="../../../lib/DefinitelyTyped/requirejs/require-2.1.d.ts" />
    // Disabled until TS supports module per file in some way (ie exports is exports.<export> not  exports.moduleName.<export>)
    //export module guid {
    'use strict';
    
    //import when = module('when');
    var w = __w__;

    var whenApply = __whenApply__;

    var whenDelay = __whenDelay__;

    var whenTimeout = __whenTimeout__;

    var whenParallel = __whenParallel__;

    var whenPipeline = __whenPipeline__;

    var whenSequence = __whenSequence__;

    var whenCancelable = __whenCancelable__;

    /**
    @module thrust.util
    @submodule thrust.util.when
    **/
    exports.when = w;
    /**
    when.apply, used to apply when results over a function, similar to jQuerys Deferred.
    See for more information: [https://github.com/cujojs/when/wiki/when-apply](https://github.com/cujojs/when/wiki/when-apply)
    
    @for thrust.util.when
    @method when.apply
    **/
    exports.apply = whenApply;
    /**
    when.delay, creates a promise that resolves in x ms, using setTimeout.
    See for more information: [https://github.com/cujojs/when/wiki/when-delay](https://github.com/cujojs/when/wiki/when-delay)
    
    @method when.delay
    **/
    exports.delay = whenDelay;
    /**
    when.timeout, creates a promise that will timeout if x ms if not resolved.
    See for more information: [https://github.com/cujojs/when/wiki/when-timeout](https://github.com/cujojs/when/wiki/when-timeout)
    
    @method when.timeout
    **/
    exports.timeout = whenTimeout;
    /**
    when.parallel
    See for more information: [https://github.com/cujojs/when/wiki/when-parallel](https://github.com/cujojs/when/wiki/when-parallel)
    
    @method when.parallel
    **/
    exports.parallel = whenParallel;
    /**
    when.pipeline
    See for more information: [https://github.com/cujojs/when/wiki/when-pipeline](https://github.com/cujojs/when/wiki/when-pipeline)
    
    @method when.pipeline
    **/
    exports.pipeline = whenPipeline;
    /**
    when.sequence
    See for more information: [https://github.com/cujojs/when/wiki/when-sequence](https://github.com/cujojs/when/wiki/when-sequence)
    
    @method when.sequence
    **/
    exports.sequence = whenSequence;
    /**
    when.cancelable
    See for more information: [https://github.com/cujojs/when/wiki/when-cancelable](https://github.com/cujojs/when/wiki/when-cancelable)
    
    @method when.cancelable
    **/
    exports.cancelable = whenCancelable;
    exports.all = exports.when.all;
    exports.any = exports.when.any;
    exports.chain = exports.when.chain;
    exports.defer = exports.when.defer;
    exports.isPromise = exports.when.isPromise;
    exports.map = exports.when.map;
    exports.reduce = exports.when.reduce;
    exports.some = exports.when.some;
    exports.resolve = exports.when.resolve;
    exports.reject = exports.when.reject;
    exports.join = exports.when.join;
})
//@ sourceMappingURL=when.js.map
