define(["require", "exports", 'when', 'when/apply', 'when/delay', 'when/timeout', 'when/parallel', 'when/pipeline', 'when/sequence', 'when/cancelable'], function(require, exports, __w__, __whenApply__, __whenDelay__, __whenTimeout__, __whenParallel__, __whenPipeline__, __whenSequence__, __whenCancelable__) {
    'use strict';
    
    
    var w = __w__;

    var whenApply = __whenApply__;

    var whenDelay = __whenDelay__;

    var whenTimeout = __whenTimeout__;

    var whenParallel = __whenParallel__;

    var whenPipeline = __whenPipeline__;

    var whenSequence = __whenSequence__;

    var whenCancelable = __whenCancelable__;

    exports.when = w;
    exports.apply = whenApply;
    exports.delay = whenDelay;
    exports.timeout = whenTimeout;
    exports.parallel = whenParallel;
    exports.pipeline = whenPipeline;
    exports.sequence = whenSequence;
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
