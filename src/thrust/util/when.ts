/// <reference path="../../lib/DefinitelyTyped/requirejs/require-2.1.d.ts" />

// Disabled until TS supports module per file in some way (ie exports is exports.<export> not  exports.moduleName.<export>)
//export module guid {

    'use strict';
    import _ = module('lodash');

    //import when = module('when');
    import w = module('when/debug');
    import whenApply = module('when/apply');
    import whenDelay = module('when/delay');
    import whenTimeout = module('when/timeout');
    import whenParallel = module('when/parallel');
    import whenPipeline = module('when/pipeline');
    import whenSequence = module('when/sequence');
    import whenCancelable = module('when/cancelable');

    /**
    @module thrust.util
    @submodule thrust.util.when
    **/

    export var when = w;
	/**
	when.apply, used to apply when results over a function, similar to jQuerys Deferred.
	See for more information: [https://github.com/cujojs/when/wiki/when-apply](https://github.com/cujojs/when/wiki/when-apply)

	@for thrust.util.when
	@method when.apply
	**/
    export var apply = whenApply;
	/**
	when.delay, creates a promise that resolves in x ms, using setTimeout.
	See for more information: [https://github.com/cujojs/when/wiki/when-delay](https://github.com/cujojs/when/wiki/when-delay)

	@method when.delay
	**/
    export var delay = whenDelay;
	/**
	when.timeout, creates a promise that will timeout if x ms if not resolved.
	See for more information: [https://github.com/cujojs/when/wiki/when-timeout](https://github.com/cujojs/when/wiki/when-timeout)

	@method when.timeout
	**/
	export var timeout = whenTimeout;

	/**
	when.parallel
	See for more information: [https://github.com/cujojs/when/wiki/when-parallel](https://github.com/cujojs/when/wiki/when-parallel)

	@method when.parallel
	**/
	export var parallel = whenParallel;

	/**
	when.pipeline
	See for more information: [https://github.com/cujojs/when/wiki/when-pipeline](https://github.com/cujojs/when/wiki/when-pipeline)

	@method when.pipeline
	**/
	export var pipeline = whenPipeline;

	/**
	when.sequence
	See for more information: [https://github.com/cujojs/when/wiki/when-sequence](https://github.com/cujojs/when/wiki/when-sequence)

	@method when.sequence
	**/
	export var sequence = whenSequence;

	/**
	when.cancelable
	See for more information: [https://github.com/cujojs/when/wiki/when-cancelable](https://github.com/cujojs/when/wiki/when-cancelable)

	@method when.cancelable
	**/
	export var cancelable = whenCancelable;

	export var all = when.all;
	export var any = when.any;
	export var chain = when.chain;
	export var defer = when.defer;
	export var isPromise = when.isPromise;
	export var map = when.map;
	export var reduce = when.reduce;
	export var some = when.some;
	export var resolve = when.resolve;
	export var reject = when.reject;
	export var join = when.join;