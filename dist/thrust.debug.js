

/** @license MIT License (c) copyright B Cavalier & J Hann */

/*jshint devel: true*/
/*global console:true, setTimeout:true*/

/**
 * This is a drop-in replacement for the when module that sets up automatic
 * debug output for promises created or consumed by when.js.  Use this
 * instead of when to help with debugging.
 *
 * WARNING: This module **should never** be use this in a production environment.
 * It exposes details of the promise
 *
 * In an AMD environment, you can simply change your package mappings:
 *
 * packages: [
 *   // { name: 'when', location: 'path/to/when', main: 'when' }
 *   { name: 'when', location: 'path/to/when', main: 'debug' }
 * ]
 *
 * In a CommonJS environment, you can directly require this module where
 * you would normally require 'when':
 *
 * // var when = require('when');
 * var when = require('when/debug');
 *
 * Or you can temporarily modify the package.js to point main at debug.
 * For example, when/package.json:
 *
 * ...
 * "main": "./debug"
 * ...
 *
 * @author brian@hovercraftstudios.com
 */
(function(define) {
define('when/debug',['./when'], function(when) {

	var promiseId, pending, exceptionsToRethrow, own, warn, undef;

	promiseId = 0;
	pending = {};
	own = Object.prototype.hasOwnProperty;

	warn = (typeof console !== 'undefined' && typeof console.warn === 'function')
		? function(x) { console.warn(x); }
		: function() {};

	exceptionsToRethrow = {
		RangeError: 1,
		ReferenceError: 1,
		SyntaxError: 1,
		TypeError: 1
	};

	/**
	 * Replacement for when() that sets up debug logging on the
	 * returned promise.
	 */
	function whenDebug(promise, cb, eb, pb) {
		var args = [promise].concat(wrapCallbacks(promise, [cb, eb, pb]));
		return debugPromise(when.apply(null, args), when.resolve(promise));
	}

	/**
	 * Setup debug output handlers for the supplied promise.
	 * @param {Promise} p A trusted (when.js) promise
	 * @param {Promise?} parent promise from which p was created (e.g. via then())
	 * @return {Promise} a new promise that outputs debug info and
	 * has a useful toString
	 */
	function debugPromise(p, parent) {
		var id, origThen, newPromise, logReject;

		if(own.call(p, 'parent')) {
			return p;
		}

		promiseId++;
		id = (parent && 'id' in parent) ? (parent.id + '.' + promiseId) : promiseId;

		origThen = p.then;
		newPromise = beget(p);
		newPromise.id = id;
		newPromise.parent = parent;

		newPromise.toString = function() {
			return toString('Promise', id);
		};

		newPromise.then = function(cb, eb, pb) {
			checkCallbacks(cb, eb, pb);

			if(typeof eb === 'function') {
				var promise = newPromise;
				do {
					promise.handled = true;
				} while((promise = promise.parent) && !promise.handled);
			}

			return debugPromise(origThen.apply(p, wrapCallbacks(newPromise, arguments)), newPromise);
		};

		logReject = function() {
			console.error(newPromise.toString());
		};

		p.then(
			function(val) {
				newPromise.toString = function() {
					return toString('Promise', id, 'resolved', val);
				};
				return val;
			},
			wrapCallback(newPromise, function(err) {
				newPromise.toString = function() {
					return toString('Promise', id, 'REJECTED', err);
				};

				callGlobalHandler('reject', newPromise, err);

				if(!newPromise.handled) {
					logReject();
				}

				throw err;
			})
		);

		return newPromise;
	}

	/**
	 * Replacement for when.defer() that sets up debug logging
	 * on the created Deferred, its resolver, and its promise.
	 * @return {Deferred} a Deferred with debug logging
	 */
	function deferDebug(/* id */) {
		var d, status, value, origResolve, origReject, origProgress, origThen, id;

		// Delegate to create a Deferred;
		d = when.defer();

		status = 'pending';
		value = pending;

		// if no id provided, generate one.  Not sure if this is
		// useful or not.
		id = arguments[arguments.length - 1];
		if(id === undef) {
			id = ++promiseId;
		}

		// Promise and resolver are frozen, so have to delegate
		// in order to setup toString() on promise, resolver,
		// and deferred
		origThen = d.promise.then;
		d.id = id;
		d.promise = debugPromise(d.promise, d);

		d.resolver = beget(d.resolver);
		d.resolver.toString = function() {
			return toString('Resolver', id, status, value);
		};

		origProgress = d.resolver.progress;
		d.progress = d.resolver.progress = function(update) {
			// Notify global debug handler, if set
			callGlobalHandler('progress', d, update);

			return origProgress(update);
		};

		origResolve = d.resolver.resolve;
		d.resolve = d.resolver.resolve = function(val) {
			value = val;
			status = 'resolving';

			// Notify global debug handler, if set
			callGlobalHandler('resolve', d, val);

			return origResolve.apply(undef, arguments);
		};

		origReject = d.resolver.reject;
		d.reject = d.resolver.reject = function(err) {
			value = err;
			status = 'REJECTING';
			return origReject.apply(undef, arguments);
		};

		d.toString = function() {
			return toString('Deferred', id, status, value);
		};

		// Setup final state change handlers
		origThen(
			function(v) { status = 'resolved'; return v; },
			function(e) { status = 'REJECTED'; return when.reject(e); }
		);

		d.then = deprecated('deferred.then', 'deferred.promise.then', d.promise.then, d);

		// Add an id to all directly created promises.  It'd be great
		// to find a way to propagate this id to promise created by .then()
		d.resolver.id = id;

		return d;
	}

	whenDebug.defer = deferDebug;
	whenDebug.isPromise = when.isPromise;

	// For each method we haven't already replaced, replace it with
	// one that sets up debug logging on the returned promise
	for(var p in when) {
		if(when.hasOwnProperty(p) && !(p in whenDebug)) {
			makeDebug(p, when[p]);
		}
	}

	return whenDebug;

	// Wrap result of when[name] in a debug promise
	function makeDebug(name, func) {
		whenDebug[name] = function() {
			return debugPromise(func.apply(when, arguments));
		};
	}

	// Wrap a promise callback to catch exceptions and log or
	// rethrow as uncatchable
	function wrapCallback(promise, cb) {
		return function(v) {
			try {
				return cb(v);
			} catch(err) {
				if(err) {
					var toRethrow = (whenDebug.debug && whenDebug.debug.exceptionsToRethrow) || exceptionsToRethrow;

					if (err.name in toRethrow) {
						throwUncatchable(err);
					}

					callGlobalHandler('reject', promise, err);
				}

				throw err;
			}
		};
	}

	// Wrap a callback, errback, progressback tuple
	function wrapCallbacks(promise, callbacks) {
		var cb, args, len, i;

		args = [];

		for(i = 0, len = callbacks.length; i < len; i++) {
			args[i] = typeof (cb = callbacks[i]) == 'function'
				? wrapCallback(promise, cb)
				: cb;
		}

		return args;
	}

	function callGlobalHandler(handler, promise, triggeringValue, auxValue) {
		/*jshint maxcomplexity:5*/
		var globalHandlers = whenDebug.debug;

		if(!(globalHandlers && typeof globalHandlers[handler] === 'function')) {
			return;
		}

		if(arguments.length < 4 && handler == 'reject') {
			try {
				throw new Error(promise.toString());
			} catch(e) {
				auxValue = e;
			}
		}

		try {
			globalHandlers[handler](promise, triggeringValue, auxValue);
		} catch(handlerError) {
			throwUncatchable(new Error('when.js global debug handler threw: ' + String(handlerError)));
		}
	}

	// Stringify a promise, deferred, or resolver
	function toString(name, id, status, value) {
		var s = '[object ' + name + ' ' + id + ']';

		if(arguments.length > 2) {
			s += ' ' + status;
			if(value !== pending) {
				s += ': ' + value;
			}
		}

		return s;
	}

	function throwUncatchable(err) {
		setTimeout(function() {
			throw err;
		}, 0);
	}

	function deprecated(name, preferred, f, context) {
		return function() {
			warn(new Error(name + ' is deprecated, use ' + preferred).stack);

			return f.apply(context, arguments);
		};
	}

	function checkCallbacks() {
		var i, len, a;
		for(i = 0, len = arguments.length; i < len; i++) {
			a = arguments[i];
			if(!checkFunction(a)) {
				warn(new Error('arg ' + i + ' must be a function, null, or undefined, but was a ' + typeof a).stack);
			}
		}
	}

	function checkFunction(f) {
		return typeof f === 'function' || f == null;
	}

	// The usual Crockford
	function F() {}
	function beget(o) {
		F.prototype = o;
		o = new F();
		F.prototype = undef;

		return o;
	}

});
})(typeof define == 'function'
	? define
	: function (deps, factory) { typeof module != 'undefined'
		? (module.exports = factory(require('./when')))
		: (this.when      = factory(this.when));
	}
	// Boilerplate for AMD, Node, and browser global
);

/** @license MIT License (c) copyright B Cavalier & J Hann */

/**
 * apply.js
 * Helper for using arguments-based and variadic callbacks with any
 * {@link Promise} that resolves to an array.
 *
 * @author brian@hovercraftstudios.com
 */

(function(define) {
define('when/apply',[],function() {

    var toString = Object.prototype.toString;
    
    /**
     * Creates a function that accepts a function that takes individual
     * arguments (it can be variadic, too), and returns a new function that
     * takes a single array as its only param:
     *
     * function argBased(a, b, c) {
     *   return a + b + c;
     * }
     *
     * argBased(1, 2, 3); // 6
     *
     * // Create an array-based version of argBased
     * var arrayBased = apply(argBased);
     * var inputs = [1, 2, 3];
     *
     * arrayBased(inputs); // 6
     *
     * With promises:
     *
     * var d = when.defer();
     * d.promise.then(arrayBased);
     *
     * d.resolve([1, 2, 3]); // arrayBased called with args 1, 2, 3 -> 6
     *
     * @param f {Function} arguments-based function
     *
     * @returns {Function} a new function that accepts an array
     */
    return function(f) {
        /**
         * @param array {Array} must be an array of arguments to use to apply the original function
         *
         * @returns the result of applying f with the arguments in array.
         */
        return function(array) {
            // It better be an array
            if(toString.call(array) != '[object Array]') {
                throw new Error('apply called with non-array arg');
            }

            return f.apply(null, array);
        };
    };

});
})(typeof define == 'function'
    ? define
    : function (factory) { typeof module != 'undefined'
        ? (module.exports  = factory())
        : (this.when_apply = factory());
    }
    // Boilerplate for AMD, Node, and browser global
);



/** @license MIT License (c) copyright B Cavalier & J Hann */

/*global setTimeout:true*/

/**
 * delay.js
 *
 * Helper that returns a promise that resolves after a delay.
 *
 * @author brian@hovercraftstudios.com
 */

(function(define) {
define('when/delay',['./when'], function(when) {

    var undef;

    /**
     * Creates a new promise that will resolve after a msec delay.  If promise
     * is supplied, the delay will start *after* the supplied promise is resolved.
     *
     * Usage:
     * // Do something after 1 second, similar to using setTimeout
     * delay(1000).then(doSomething);
     * // or
     * when(delay(1000), doSomething);
     *
     * // Do something 1 second after triggeringPromise resolves
     * delay(triggeringPromise, 1000).then(doSomething, handleRejection);
     * // or
     * when(delay(triggeringPromise, 1000), doSomething, handleRejection);
     *
     * @param [promise] anything - any promise or value after which the delay will start
     * @param msec {Number} delay in milliseconds
     */
    return function delay(promise, msec) {
        if(arguments.length < 2) {
            msec = promise >>> 0;
            promise = undef;
        }

        var deferred = when.defer();

        setTimeout(function() {
            deferred.resolve(promise);
        }, msec);

        return deferred.promise;
    };

});
})(typeof define == 'function'
    ? define
    : function (deps, factory) { typeof module != 'undefined'
        ? (module.exports = factory(require('./when')))
        : (this.when_delay = factory(this.when));
    }
    // Boilerplate for AMD, Node, and browser global
);



/** @license MIT License (c) copyright B Cavalier & J Hann */

/*global setTimeout:true, clearTimeout:true*/

/**
 * timeout.js
 *
 * Helper that returns a promise that rejects after a specified timeout,
 * if not explicitly resolved or rejected before that.
 *
 * @author brian@hovercraftstudios.com
 */

(function(define) {
define('when/timeout',['./when'], function(when) {

    var undef;

    /**
     * Returns a new promise that will automatically reject after msec if
     * the supplied promise doesn't resolve or reject before that.
     *
     * Usage:
     *
     * var d = when.defer();
     * // Setup d however you need
     *
     * // return a new promise that will timeout if d doesn't resolve/reject first
     * return timeout(d.promise, 1000);
     *
     * @param promise anything - any promise or value that should trigger
     *  the returned promise to resolve or reject before the msec timeout
     * @param msec {Number} timeout in milliseconds
     *
     * @returns {Promise}
     */
    return function timeout(promise, msec) {
        var deferred, timeoutRef;

        deferred = when.defer();

        timeoutRef = setTimeout(function onTimeout() {
            timeoutRef && deferred.reject(new Error('timed out'));
        }, msec);

        function cancelTimeout() {
            clearTimeout(timeoutRef);
            timeoutRef = undef;
        }

        when(promise,
            function(value) {
                cancelTimeout();
                deferred.resolve(value);
            },
            function(reason) {
                cancelTimeout();
                deferred.reject(reason);
            }
        );

        return deferred.promise;
    };

});
})(typeof define == 'function'
    ? define
    : function (deps, factory) { typeof module != 'undefined'
        ? (module.exports = factory(require('./when')))
        : (this.when_timeout = factory(this.when));
    }
    // Boilerplate for AMD, Node, and browser global
);



/** @license MIT License (c) copyright B Cavalier & J Hann */

/**
 * parallel.js
 *
 * Run a set of task functions in parallel.  All tasks will
 * receive the same args
 *
 * @author brian@hovercraftstudios.com
 */

(function(define) {
define('when/parallel',['./when'], function(when) {

	/**
	 * Run array of tasks in parallel
	 * @param tasks {Array|Promise} array or promiseForArray of task functions
	 * @param [args] {*} arguments to be passed to all tasks
	 * @return {Promise} promise for array containing the
	 * result of each task in the array position corresponding
	 * to position of the task in the tasks array
	 */
	return function parallel(tasks /*, args... */) {
		var args = Array.prototype.slice.call(arguments, 1);
		return when.map(tasks, function(task) {
			return task.apply(null, args);
		});
	};

});
})(typeof define == 'function' && define.amd
	? define
	: function (deps, factory) { typeof exports == 'object'
		? (module.exports = factory(require('./when')))
		: (this.when_parallel = factory(this.when));
	}
	// Boilerplate for AMD, Node, and browser global
);



/** @license MIT License (c) copyright B Cavalier & J Hann */

/**
 * pipeline.js
 *
 * Run a set of task functions in sequence, passing the result
 * of the previous as an argument to the next.  Like a shell
 * pipeline, e.g. `cat file.txt | grep 'foo' | sed -e 's/foo/bar/g'
 *
 * @author brian@hovercraftstudios.com
 */

(function(define) {
define('when/pipeline',['./when'], function(when) {

	/**
	 * Run array of tasks in a pipeline where the next
	 * tasks receives the result of the previous.  The first task
	 * will receive the initialArgs as its argument list.
	 * @param tasks {Array|Promise} array or promise for array of task functions
	 * @param [initialArgs...] {*} arguments to be passed to the first task
	 * @return {Promise} promise for return value of the final task
	 */
	return function pipeline(tasks /* initialArgs... */) {
		var initialArgs, runTask;

		initialArgs = Array.prototype.slice.call(arguments, 1);

		// Self-optimizing function to run first task with multiple
		// args using apply, but subsequence tasks via direct invocation
		runTask = function(task, args) {
			runTask = function(task, arg) {
				return task(arg);
			};
			
			return task.apply(null, args);
		};

		return when.reduce(tasks,
			function(args, task) {
				return runTask(task, args);
			},
			initialArgs
		);
	};

});
})(typeof define == 'function' && define.amd
	? define
	: function (deps, factory) { typeof exports == 'object'
		? (module.exports = factory(require('./when')))
		: (this.when_pipeline = factory(this.when));
	}
	// Boilerplate for AMD, Node, and browser global
);



/** @license MIT License (c) copyright B Cavalier & J Hann */

/**
 * sequence.js
 *
 * Run a set of task functions in sequence.  All tasks will
 * receive the same args.
 *
 * @author brian@hovercraftstudios.com
 */

(function(define) {
define('when/sequence',['./when'], function(when) {

	/**
	 * Run array of tasks in sequence with no overlap
	 * @param tasks {Array|Promise} array or promiseForArray of task functions
	 * @param [args] {*} arguments to be passed to all tasks
	 * @return {Promise} promise for an array containing
	 * the result of each task in the array position corresponding
	 * to position of the task in the tasks array
	 */
	return function sequence(tasks /*, args... */) {
		var args = Array.prototype.slice.call(arguments, 1);
		return when.reduce(tasks, function(results, task) {
			return when(task.apply(null, args), function(result) {
				results.push(result);
				return results;
			});
		}, []);
	};

});
})(typeof define == 'function' && define.amd
	? define
	: function (deps, factory) { typeof exports == 'object'
		? (module.exports = factory(require('./when')))
		: (this.when_sequence = factory(this.when));
	}
	// Boilerplate for AMD, Node, and browser global
);



/** @license MIT License (c) copyright B Cavalier & J Hann */

/**
 * cancelable.js
 *
 * Decorator that makes a deferred "cancelable".  It adds a cancel() method that
 * will call a special cancel handler function and then reject the deferred.  The
 * cancel handler can be used to do resource cleanup, or anything else that should
 * be done before any other rejection handlers are executed.
 *
 * Usage:
 *
 * var cancelableDeferred = cancelable(when.defer(), myCancelHandler);
 *
 * @author brian@hovercraftstudios.com
 */

(function(define) {
define('when/cancelable',['./when'], function(when) {

    /**
     * Makes deferred cancelable, adding a cancel() method.
     *
     * @param deferred {Deferred} the {@link Deferred} to make cancelable
     * @param canceler {Function} cancel handler function to execute when this deferred is canceled.  This
     * is guaranteed to run before all other rejection handlers.  The canceler will NOT be executed if the
     * deferred is rejected in the standard way, i.e. deferred.reject().  It ONLY executes if the deferred
     * is canceled, i.e. deferred.cancel()
     *
     * @returns deferred, with an added cancel() method.
     */
    return function(deferred, canceler) {

        var delegate = when.defer();

        // Add a cancel method to the deferred to reject the delegate
        // with the special canceled indicator.
        deferred.cancel = function() {
            return delegate.reject(canceler(deferred));
        };

        // Ensure that the original resolve, reject, and progress all forward
        // to the delegate
        deferred.promise.then(delegate.resolve, delegate.reject, delegate.progress);

        // Replace deferred's promise with the delegate promise
        deferred.promise = delegate.promise;

        // Also replace deferred.then to allow it to be called safely and
        // observe the cancellation
		// TODO: Remove once deferred.then is removed
        deferred.then = delegate.promise.then;

        return deferred;
    };

});
})(typeof define == 'function'
    ? define
    : function (deps, factory) { typeof module != 'undefined'
        ? (module.exports = factory(require('./when')))
        : (this.when_cancelable = factory(this.when));
    }
    // Boilerplate for AMD, Node, and browser global
);



define('thrust/util/when',["require", "exports", 'when/debug', 'when/apply', 'when/delay', 'when/timeout', 'when/parallel', 'when/pipeline', 'when/sequence', 'when/cancelable'], function(require, exports, __w__, __whenApply__, __whenDelay__, __whenTimeout__, __whenParallel__, __whenPipeline__, __whenSequence__, __whenCancelable__) {
    /// <reference path="../../lib/DefinitelyTyped/requirejs/require-2.1.d.ts" />
    // Disabled until TS supports module per file in some way (ie exports is exports.<export> not  exports.moduleName.<export>)
    //export module guid {
    
    
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
    exports.all = exports.when.any;
    exports.any = exports.when.all;
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
;
define('thrust/util/function',["require", "exports", 'lodash', './when'], function(require, exports, _____, __when__) {
    /// <reference path="../../lib/DefinitelyTyped/requirejs/require-2.1.d.ts" />
    // Disabled until TS supports module per file in some way (ie exports is exports.<export> not  exports.moduleName.<export>)
    //export module function {
    
    var _ = _____;

    var when = __when__;

    /**
    @module thrust.util
    @submodule thrust.util.func
    **/
    var slice = Array.prototype.slice;
    /**
    A function that does nothing, or no operation.  Hence the name noop.
    
    @method noop
    **/
    function noop() {
    }
    exports.noop = noop;
    var propertyIsEnumerable = noop.propertyIsEnumerable;
    /**
    Attempts to invoke, similar to _.invoke, but in this case it verifies that the property exist,
    and also verifies that it is a function, and not the noop method available in thrust.
    
    The intent is a method that allows override of functions, without creating custom code.
    
    @method saveInvoke
    @param {Array|Object} collection The container that has the items
    @param {String|Function} method The method name on every item, or the method to invoke against each item.
    @param {Object} [args]* The additional arguments to pass onto the method.
    **/
    function safeInvoke(collection, methodName) {
        var args = [];
        for (var _i = 0; _i < (arguments.length - 2); _i++) {
            args[_i] = arguments[_i + 2];
        }
        /*jshint bitwise:false */
                var index, iteratee = collection, result;
        if(!collection) {
            return [];
        }
        var args = slice.call(arguments, 2), isFunc = typeof methodName == 'function', methodExists;
        var length = iteratee.length;
        index = -1;
        if(length === length >>> 0) {
            result = Array(length);
            while(++index < length) {
                methodExists = (isFunc ? methodName : iteratee[index][methodName]);
                methodExists && methodExists !== noop && (result[index] = methodExists.apply(iteratee[index], args));
            }
        } else {
            var skipProto = typeof iteratee == 'function' && propertyIsEnumerable.call(iteratee, 'prototype');
            var props = _.keys(iteratee), propIndex = -1, length = props.length;
            result = Array(length);
            while(++propIndex < length) {
                index = props[propIndex];
                if(!(skipProto && index == 'prototype')) {
                    methodExists = (isFunc ? methodName : iteratee[index][methodName]);
                    methodExists && methodExists !== noop && (result[propIndex] = ((isFunc ? methodName : iteratee[index][methodName]).apply(iteratee[index], args)));
                }
            }
        }
        return result;
    }
    exports.safeInvoke = safeInvoke;
    /**
    * Constructor used to beget objects that wire needs to create using new.
    * @param ctor {Function} real constructor to be invoked
    * @param args {Array} arguments to be supplied to ctor
    */
    function Begetter(ctor, args) {
        return ctor.apply(this, args);
    }
    /**
    * Creates an object by either invoking ctor as a function and returning the result,
    * or by calling new ctor().  It uses a simple heuristic to try to guess which approach
    * is the "right" one.
    *
    * @param ctor {Function} function or constructor to invoke
    * @param args {Array} array of arguments to pass to ctor in either case
    *
    * @returns The result of invoking ctor with args, with or without new, depending on
    * the strategy selected.
    */
    function instantiate(ctor, args) {
        Begetter.prototype = ctor.prototype;
        Begetter.prototype.constructor = ctor;
        var begotten = new Begetter(ctor, args);
        Begetter.prototype = void 0;
        return begotten;
    }
    exports.instantiate = instantiate;
    /**
    Flatten and filter arrays down to just the existing promises.
    
    @method flattenToPromises
    @param {Array} Array to flatten, and filter.
    @returns {Array of Promises}
    **/
    function flattenToPromises(array) {
        return _.flatten(array).filter(function (x) {
            return when.isPromise(x);
        });
    }
    exports.flattenToPromises = flattenToPromises;
})
//@ sourceMappingURL=function.js.map
;
define('thrust/util/object',["require", "exports"], function(require, exports) {
    /// <reference path="../../lib/DefinitelyTyped/requirejs/require-2.1.d.ts" />
    // Disabled until TS supports module per file in some way (ie exports is exports.<export> not  exports.moduleName.<export>)
    //export module guid {
    
    
    var hasOwn = Object.prototype.hasOwnProperty;
    function invert(obj) {
        var result = {
        };
        for(var i in obj) {
            if(hasOwn.call(obj, i)) {
                result[obj[i]] = i;
            }
        }
        return result;
    }
    exports.invert = invert;
})
//@ sourceMappingURL=object.js.map
;
define('thrust/util/lib/type',["require", "exports", 'lodash'], function(require, exports, _____) {
    /// <reference path="../../../lib/DefinitelyTyped/requirejs/require-2.1.d.ts" />
    // Disabled until TS supports module per file in some way (ie exports is exports.<export> not  exports.moduleName.<export>)
    //export module libType {
    
    var _ = _____;

    var toString = Object.prototype.toString, class2type = {
    };
    var _type = function (obj) {
        return obj == null ? String(obj) : class2type[toString.call(obj)] || "object";
    };
    _.each("Boolean Number String Function Array Date RegExp Object".split(" "), function (name) {
        class2type["[object " + name + "]"] = name.toLowerCase();
    });
    exports.type = _type;
})
//@ sourceMappingURL=type.js.map
;
define('thrust/util/type',["require", "exports", 'lodash', './lib/type'], function(require, exports, _____, __libType__) {
    /// <reference path="../../lib/DefinitelyTyped/requirejs/require-2.1.d.ts" />
    // Disabled until TS supports module per file in some way (ie exports is exports.<export> not  exports.moduleName.<export>)
    //export module function {
    
    var _ = _____;

    var libType = __libType__;
    /**
    @module thrust.util
    @submodule thrust.util.type
    **/
    /**
    Returns the type of the given Object
    
    NOTE: currently this type has been loaded from jQuery source code.
    
    @method type
    **/
    
    exports.type = libType.type;
    /**
    Checks is the object is array like, like the aruguments object, but not a string, oe array.
    jQuery objects for example would report as array like.
    As well as knockout observable arrays report as array like.
    
    @method isArrayLike
    @param {Object} o The object to check
    @returns {Boolean} Is it true or false.
    **/
    function isArrayLike(o) {
        return (o && !_.isString(o) && o.length !== undefined) || false;
    }
    exports.isArrayLike = isArrayLike;
    /**
    Checks if the given object is array or array like.
    
    @method isArrayOrArrayLike
    @param {Object} o The object to check
    @returns {Boolean} Is it true or false.
    **/
    function isArrayOrArrayLike(o) {
        return _.isArray(o) || (isArrayLike(o));
    }
    exports.isArrayOrArrayLike = isArrayOrArrayLike;
})
//@ sourceMappingURL=type.js.map
;
define('thrust/util/guid',["require", "exports", 'lodash'], function(require, exports, _____) {
    /// <reference path="../../lib/DefinitelyTyped/requirejs/require-2.1.d.ts" />
    // Disabled until TS supports module per file in some way (ie exports is exports.<export> not  exports.moduleName.<export>)
    //export module guid {
    
    var _ = _____;

    
    /**
    @module thrust.util
    @submodule thrust.util
    **/
        var S4 = function () {
        /*jshint bitwise:false */
        return (((1 + Math.random()) * 65536) | 0).toString(16).substring(1);    }, guidRegex = /^(\{{0,1}([0-9a-fA-F]){8}-([0-9a-fA-F]){4}-([0-9a-fA-F]){4}-([0-9a-fA-F]){4}-([0-9a-fA-F]){12}\}{0,1})$/, emtptyGuid = '00000000-0000-0000-0000-000000000000';
    /**
    Returns a new sudo guid, limiations in JavaScript make must more reliable guids fairly difficult to create.
    
    @for thrust.util
    @method newGuid
    @returns {Guid} The new guid.
    **/
    function newGuid() {
        return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
    }
    exports.newGuid = newGuid;
    /**
    Returns an empty guid.
    
    @method emptyGuid
    @returns {Guid} The emtpty guid.
    **/
    function emptyGuid() {
        return emtptyGuid;
    }
    exports.emptyGuid = emptyGuid;
    /**
    Checks if the given string is a guid.
    
    @method isGuid
    @param {Guid} guid
    @returns {Boolean} If the guid is a guid or not.
    **/
    function isGuid(guid) {
        return _.isString(guid) ? guidRegex.test(guid) : false;
    }
    exports.isGuid = isGuid;
    /**
    Checks if the Guid is an Empty Guid
    
    @method isGuidEmpty
    @param {Guid} guid
    @returns {Boolean} If the guid is a guid or not.
    **/
    function isGuidEmpty(guid) {
        return guid === emtptyGuid;
    }
    exports.isGuidEmpty = isGuidEmpty;
})
//@ sourceMappingURL=guid.js.map
;
define('thrust/util/lib/param',["require", "exports", 'lodash', '../type', 'module'], function(require, exports, _____, __uType__, __m__) {
    /*!
    * jQuery JavaScript lib v1.7.2
    * http://jquery.com/
    *
    * Copyright 2011, John Resig
    * Dual licensed under the MIT or GPL Version 2 licenses.
    * http://jquery.org/license
    *
    * Includes Sizzle.js
    * http://sizzlejs.com/
    * Copyright 2011, The Dojo Foundation
    * Released under the MIT, BSD, and GPL Licenses.
    *
    * Date: Wed Mar 21 12:46:34 2012 -0700
    */
    /// <reference path="../../../lib/DefinitelyTyped/requirejs/require-2.1.d.ts" />
    // Disabled until TS supports module per file in some way (ie exports is exports.<export> not  exports.moduleName.<export>)
    //export module guid {
    
    var _ = _____;

    var uType = __uType__;

    var m = __m__;

    var r20 = /%20/g, rbracket = /\[\]$/;
    function param(a, traditional) {
        var prefix, s = [], add = function (key, value) {
            // If value is a function, invoke it and return its value
            value = _.isFunction(value) ? value() : (value == null ? "" : value);s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value);        };
        // Set traditional to true for jQuery <= 1.3.2 behavior.
        if(traditional === undefined) {
            traditional = !!m.config().traditionalEncoding;
        }
        // If an array was passed in, assume that it is an array of form elements.
        if(uType.isArrayOrArrayLike(a)) {
            // Serialize the form elements
            _.each(a, function (x) {
                add(x.name, x.value);
            });
        } else {
            // If traditional, encode the "old" way (the way 1.3.2 or older
            // did it), otherwise encode params recursively.
            for(prefix in a) {
                buildParams(prefix, a[prefix], traditional, add);
            }
        }
        // Return the resulting serialization
        return s.join("&").replace(r20, "+");
    }
    exports.param = param;
    function buildParams(prefix, obj, traditional, add) {
        if(_.isArray(obj)) {
            // Serialize array item.
            _.each(obj, function (i, v) {
                if(traditional || rbracket.test(prefix)) {
                    // Treat each array item as a scalar.
                    add(prefix, v);
                } else {
                    // If array item is non-scalar (array or object), encode its
                    // numeric index to resolve deserialization ambiguity issues.
                    // Note that rack (as of 1.0.0) can't currently deserialize
                    // nested arrays properly, and attempting to do so may cause
                    // a server error. Possible fixes are to modify rack's
                    // deserialization algorithm or to provide an option or flag
                    // to force array serialization to be shallow.
                    buildParams(prefix + "[" + (typeof v === "object" || _.isArray(v) ? i : "") + "]", v, traditional, add);
                }
            });
        } else {
            if(!traditional && obj != null && typeof obj === "object") {
                // Serialize object item.
                for(var name in obj) {
                    buildParams(prefix + "[" + name + "]", obj[name], traditional, add);
                }
            } else {
                // Serialize scalar item.
                add(prefix, obj);
            }
        }
    }
})
//@ sourceMappingURL=param.js.map
;
define('thrust/util/url',["require", "exports", './lib/param'], function(require, exports, __libParam__) {
    /// <reference path="../../lib/DefinitelyTyped/requirejs/require-2.1.d.ts" />
    // Disabled until TS supports module per file in some way (ie exports is exports.<export> not  exports.moduleName.<export>)
    //export module guid {
    
    
    var libParam = __libParam__;

    
    /**
    @module thrust.util
    @submodule thrust.util.url
    **/
    
    var doubleSlashRegex = /\/\//g;
    /**
    jQuery param method to encode form parameters.
    
    @for thrust.util.url
    @method param
    **/
    exports.param = libParam;
    /**
    Cleans up double slashs in a url, used by thrust/data
    
    @method cleanUrl
    @param {String} url The url to clean
    @retrusn {String} The cleaned url
    **/
    function cleanUrl(url) {
        return url.replace(doubleSlashRegex, '/');
    }
    exports.cleanUrl = cleanUrl;
    /**
    Checks for existance of application path in the url, or http if the url is supposed to go to another location.
    
    @method fixupUrl
    @param {String} url The url to fixup
    @retrusn {String} The fixed url
    **/
    function fixupUrl(url, urlPath) {
        if(url.indexOf('http') === -1) {
            var path = urlPath.lastIndexOf('/') === urlPath.length - 1 ? urlPath.substring(0, -1) : urlPath;
            if(url.indexOf(path) === -1) {
                url = path + url;
            }
            url = cleanUrl(url);
        }
        return url;
    }
    exports.fixupUrl = fixupUrl;
})
//@ sourceMappingURL=url.js.map
;
define('thrust/util/string',["require", "exports"], function(require, exports) {
    /// <reference path="../../lib/DefinitelyTyped/requirejs/require-2.1.d.ts" />
    // Disabled until TS supports module per file in some way (ie exports is exports.<export> not  exports.moduleName.<export>)
    //export module guid {
    
    
    var objectCurlyRegex = /\{\{|\}\}|\{(.*?)\}/g, numberCurlyRegex = /\{\{|\}\}|\{(\d+)\}/g, slice = Array.prototype.slice;
    /**
    C# style string format.
    
    @for thrust.util
    @method format
    **/
    function format(str) {
        var args = [];
        for (var _i = 0; _i < (arguments.length - 1); _i++) {
            args[_i] = arguments[_i + 1];
        }
        var args = slice.call(arguments, 1);
        if(typeof args[0] === 'object') {
            var a = args[0];
            return str.replace(objectCurlyRegex, function (m, n) {
                if(m == '{{') {
                    return '{';
                }
                if(m == '}}') {
                    return '}';
                }
                return a && a[n] || '';
            });
        }
        return str.replace(numberCurlyRegex, function (m, n) {
            if(m == '{{') {
                return '{';
            }
            if(m == '}}') {
                return '}';
            }
            return args[n] || '';
        });
    }
    exports.format = format;
    function getModuleNameForPath(name) {
        return (name.lastIndexOf('/') > -1 ? name.substring(name.lastIndexOf('/') + 1) : name).replace(/\./g, '-');
    }
    exports.getModuleNameForPath = getModuleNameForPath;
})
//@ sourceMappingURL=string.js.map
;
define('thrust/util/lib/camelcase',["require", "exports"], function(require, exports) {
    
    /// <summary>
    /// Import jQuerys camelcase method.
    /// </summary>
    /// <returns></returns>
        var rmsPrefix = /^-ms-/, rdashAlpha = /-([\da-z])/gi, fcamelCase = function (all, letter) {
return (letter + "").toUpperCase();    };
    function camelCase(string) {
        return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase);
    }
    exports.camelCase = camelCase;
    function unCamelCase(str) {
        return str.replace(/([A-Z])/g, function (all, s) {
            return '-' + s.toLowerCase();
        });
    }
    exports.unCamelCase = unCamelCase;
})
//@ sourceMappingURL=camelcase.js.map
;
var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define('thrust/util/l2o',["require", "exports"], function(require, exports) {
    /*
    
    Copyright (c) Microsoft Open Technologies, Inc.  All rights reserved.
    Microsoft Open Technologies would like to thank its contributors, a list
    of whom are at http://aspnetwebstack.codeplex.com/wikipage?title=Contributors.
    
    Licensed under the Apache License, Version 2.0 (the "License"); you
    may not use this file except in compliance with the License. You may
    obtain a copy of the License at
    
    http://www.apache.org/licenses/LICENSE-2.0
    
    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
    implied. See the License for the specific language governing permissions
    and limitations under the License.
    */
    function noop() {
    }
    function identity(x) {
        return x;
    }
    function defaultComparer(x, y) {
        return x > y ? 1 : x < y ? -1 : 0;
    }
    function defaultEqualityComparer(x, y) {
        return x === y;
    }
    function defaultSerializer(x) {
        return x.toString();
    }
    var slice = Array.prototype.slice;
    var seqNoElements = 'Sequence contains no elements.';
    var invalidOperation = 'Invalid operation';
    var Enumerator = (function () {
        function Enumerator(moveNext, getCurrent, dispose) {
            this.moveNext = moveNext;
            this.getCurrent = getCurrent;
            this.dispose = dispose;
        }
        Enumerator.create = function create(moveNext, getCurrent, dispose) {
            var done = false;
            if(!dispose) {
                dispose = noop;
            }
            return new Enumerator(function () {
                if(done) {
                    return false;
                }
                var result = moveNext();
                if(!result) {
                    done = true;
                    dispose();
                }
                return result;
            }, function () {
                return getCurrent();
            }, function () {
                if(!done) {
                    dispose();
                    done = true;
                }
            });
        }
        return Enumerator;
    })();
    exports.Enumerator = Enumerator;    
    function arrayIndexOf(item, comparer) {
        comparer || (comparer = defaultComparer);
        var idx = this.length;
        while(idx--) {
            if(comparer(this[idx], item)) {
                return idx;
            }
        }
        return -1;
    }
    function arrayRemove(item, comparer) {
        var idx = arrayIndexOf.call(this, item, comparer);
        if(idx === -1) {
            return false;
        }
        this.splice(idx, 1);
        return true;
    }
    var Enumerable = (function () {
        function Enumerable(getEnumerator) {
            this.getEnumerator = getEnumerator;
        }
        Enumerable.prototype.__aggregate = function (func, seed, resultSelector) {
            resultSelector || (resultSelector = identity);
            var accumulate = seed, enumerator = this.getEnumerator();
            try  {
                while(enumerator.moveNext()) {
                    accumulate = func(accumulate, enumerator.getCurrent());
                }
            }finally {
                enumerator.dispose();
            }
            return resultSelector ? resultSelector(accumulate) : accumulate;
        };
        Enumerable.prototype.__aggregate1 = function (func) {
            var accumulate, enumerator = this.getEnumerator();
            try  {
                if(!enumerator.moveNext()) {
                    throw new Error(seqNoElements);
                }
                accumulate = enumerator.getCurrent();
                while(enumerator.moveNext()) {
                    accumulate = func(accumulate, enumerator.getCurrent());
                }
            }finally {
                enumerator.dispose();
            }
            return accumulate;
        };
        Enumerable.prototype.aggregate = function (func, seed, resultSelector) {
            /*jshint unused:false */
            var f = arguments.length === 1 ? this.__aggregate1 : this.__aggregate;
            return f.apply(this, arguments);
        };
        Enumerable.prototype.all = function (predicate) {
            var enumerator = this.getEnumerator();
            try  {
                while(enumerator.moveNext()) {
                    if(!predicate(enumerator.getCurrent())) {
                        return false;
                    }
                }
            }finally {
                enumerator.dispose();
            }
            return true;
        };
        Enumerable.prototype.any = function (predicate) {
            var enumerator = this.getEnumerator();
            try  {
                while(enumerator.moveNext()) {
                    if(!predicate || predicate(enumerator.getCurrent())) {
                        return true;
                    }
                }
            }finally {
                enumerator.dispose();
            }
            return false;
        };
        Enumerable.prototype.average = function (selector) {
            if(selector) {
                return this.select(selector).average();
            }
            var enumerator = this.getEnumerator(), count = 0, sum = 0;
            try  {
                while(enumerator.moveNext()) {
                    count++;
                    sum += enumerator.getCurrent();
                }
            }finally {
                enumerator.dispose();
            }
            if(count === 0) {
                throw new Error(seqNoElements);
            }
            return sum / count;
        };
        Enumerable.prototype.concat = function () {
            var args = [];
            for (var _i = 0; _i < (arguments.length - 0); _i++) {
                args[_i] = arguments[_i + 0];
            }
            var args = slice.call(arguments, 0);
            args.unshift(this);
            return Enumerable.concat.apply(null, args);
        };
        Enumerable.prototype.contains = function (value, comparer) {
            comparer || (comparer = defaultEqualityComparer);
            var enumerator = this.getEnumerator();
            try  {
                while(enumerator.moveNext()) {
                    if(comparer(value, enumerator.getCurrent())) {
                        return true;
                    }
                }
            }finally {
                enumerator.dispose();
            }
            return false;
        };
        Enumerable.prototype.count = function (predicate) {
            var c = 0, enumerator = this.getEnumerator();
            try  {
                while(enumerator.moveNext()) {
                    if(!predicate || predicate(enumerator.getCurrent())) {
                        c++;
                    }
                }
            }finally {
                enumerator.dispose();
            }
            return c;
        };
        Enumerable.prototype.defaultIfEmpty = function (defaultValue) {
            var parent = this;
            return new Enumerable(function () {
                var current, hasValue = false, enumerator;
                return Enumerator.create(function () {
                    enumerator || (enumerator = parent.getEnumerator());
                    if(!enumerator.moveNext()) {
                        return false;
                    }
                    hasValue = true;
                    current = enumerator.getCurrent();
                    return true;
                }, function () {
                    if(!hasValue) {
                        return defaultValue;
                    }
                    return current;
                }, function () {
                    enumerator.dispose();
                });
            });
        };
        Enumerable.prototype.distinct = function (comparer) {
            comparer || (comparer = defaultEqualityComparer);
            var parent = this;
            return new Enumerable(function () {
                var current, map = [], enumerator;
                return Enumerator.create(function () {
                    enumerator || (enumerator = parent.getEnumerator());
                    while(true) {
                        if(!enumerator.moveNext()) {
                            return false;
                        }
                        current = enumerator.getCurrent();
                        if(arrayIndexOf.call(map, current, comparer) === -1) {
                            map.push(current);
                            return true;
                        }
                    }
                }, function () {
                    return current;
                }, function () {
                    enumerator.dispose();
                });
            });
        };
        Enumerable.prototype.elementAt = function (index) {
            return this.skip(index).first();
        };
        Enumerable.prototype.elementAtOrDefault = function (index) {
            return this.skip(index).firstOrDefault();
        };
        Enumerable.prototype.except = function (second, comparer) {
            comparer || (comparer = defaultEqualityComparer);
            var parent = this;
            return new Enumerable(function () {
                var current, map = [], firstEnumerator = parent.getEnumerator(), secondEnumerator;
                while(firstEnumerator.moveNext()) {
                    map.push(firstEnumerator.getCurrent());
                }
                return Enumerator.create(function () {
                    secondEnumerator || (secondEnumerator = second.getEnumerator());
                    while(true) {
                        if(!secondEnumerator.moveNext()) {
                            return false;
                        }
                        current = secondEnumerator.getCurrent();
                        if(this.arrayIndexOf.call(map, current, comparer) === -1) {
                            map.push(current);
                            return true;
                        }
                    }
                }, function () {
                    return current;
                }, function () {
                    /*enumerator.dispose();*/                 });
            });
        };
        Enumerable.prototype.first = function (predicate) {
            var enumerator = this.getEnumerator();
            try  {
                while(enumerator.moveNext()) {
                    var current = enumerator.getCurrent();
                    if(!predicate || predicate(current)) {
                        return current;
                    }
                }
            }finally {
                enumerator.dispose();
            }
            throw new Error(seqNoElements);
        };
        Enumerable.prototype.firstOrDefault = function (predicate) {
            var enumerator = this.getEnumerator();
            try  {
                while(enumerator.moveNext()) {
                    var current = enumerator.getCurrent();
                    if(!predicate || predicate(current)) {
                        return current;
                    }
                }
            }finally {
                enumerator.dispose();
            }
            return null;
        };
        Enumerable.prototype.forEach = function (action) {
            var e = this.getEnumerator(), i = 0;
            try  {
                while(e.moveNext()) {
                    action(e.getCurrent(), i++);
                }
            }finally {
                e.dispose();
            }
        };
        Enumerable.prototype.groupBy = function (keySelector, elementSelector, resultSelector, keySerializer) {
            elementSelector || (elementSelector = identity);
            keySerializer || (keySerializer = defaultSerializer);
            var parent = this;
            return new Enumerable(function () {
                var map = {
                }, keys = [], index = 0, value, key, parentEnumerator = parent.getEnumerator(), parentCurrent, parentKey, parentSerialized, parentElement;
                while(parentEnumerator.moveNext()) {
                    parentCurrent = parentEnumerator.getCurrent();
                    parentKey = keySelector(parentCurrent);
                    parentSerialized = keySerializer(parentKey);
                    if(!map[parentSerialized]) {
                        map[parentSerialized] = [];
                        keys.push(parentSerialized);
                    }
                    parentElement = elementSelector(parentCurrent);
                    map[parentSerialized].push(parentElement);
                }
                return Enumerator.create(function () {
                    var values;
                    if(index < keys.length) {
                        key = keys[index++];
                        values = Enumerable.fromArray(map[key]);
                        if(!resultSelector) {
                            values.key = key;
                            value = values;
                        } else {
                            value = resultSelector(key, values);
                        }
                        return true;
                    }
                    return false;
                }, function () {
                    return value;
                });
            });
        };
        Enumerable.prototype.intersect = function (second, comparer) {
            comparer || (comparer = defaultEqualityComparer);
            var parent = this;
            return new Enumerable(function () {
                var current, map = [], firstEnumerator = parent.getEnumerator(), secondEnumerator;
                while(firstEnumerator.moveNext()) {
                    map.push(firstEnumerator.getCurrent());
                }
                return Enumerator.create(function () {
                    secondEnumerator || (secondEnumerator = second.getEnumerator());
                    while(true) {
                        if(!secondEnumerator.moveNext()) {
                            return false;
                        }
                        current = secondEnumerator.getCurrent();
                        if(arrayRemove.call(map, current, comparer)) {
                            return true;
                        }
                    }
                }, function () {
                    return current;
                }, function () {
                    /*enumerator.dispose();*/
                                    });
            });
        };
        Enumerable.prototype.last = function (predicate) {
            var hasValue = false, value, enumerator = this.getEnumerator();
            try  {
                while(enumerator.moveNext()) {
                    var current = enumerator.getCurrent();
                    if(!predicate || predicate(current)) {
                        hasValue = true;
                        value = current;
                    }
                }
            }finally {
                enumerator.dispose();
            }
            if(hasValue) {
                return value;
            }
            throw new Error(seqNoElements);
        };
        Enumerable.prototype.lastOrDefault = function (predicate) {
            var hasValue = false, value, enumerator = this.getEnumerator();
            try  {
                while(enumerator.moveNext()) {
                    var current = enumerator.getCurrent();
                    if(!predicate || predicate(current)) {
                        hasValue = true;
                        value = current;
                    }
                }
            }finally {
                enumerator.dispose();
            }
            return hasValue ? value : null;
        };
        Enumerable.prototype.max = function (selector) {
            if(selector) {
                return this.select(selector).max();
            }
            var m, hasElement = false, enumerator = this.getEnumerator();
            try  {
                while(enumerator.moveNext()) {
                    var x = enumerator.getCurrent();
                    if(!hasElement) {
                        m = x;
                        hasElement = true;
                    } else {
                        if(x > m) {
                            m = x;
                        }
                    }
                }
            }finally {
                enumerator.dispose();
            }
            if(!hasElement) {
                throw new Error(seqNoElements);
            }
            return m;
        };
        Enumerable.prototype.min = function (selector) {
            if(selector) {
                return this.select(selector).min();
            }
            var m, hasElement = false, enumerator = this.getEnumerator();
            try  {
                while(enumerator.moveNext()) {
                    var x = enumerator.getCurrent();
                    if(!hasElement) {
                        m = x;
                        hasElement = true;
                    } else {
                        if(x < m) {
                            m = x;
                        }
                    }
                }
            }finally {
                enumerator.dispose();
            }
            if(!hasElement) {
                throw new Error(seqNoElements);
            }
            return m;
        };
        Enumerable.prototype.orderBy = function (keySelector, comparer) {
            return new OrderedEnumerable(this, keySelector, comparer, false);
        };
        Enumerable.prototype.orderByDescending = function (keySelector, comparer) {
            return new OrderedEnumerable(this, keySelector, comparer, true);
        };
        Enumerable.prototype.reverse = function () {
            var arr = [], enumerator = this.getEnumerator();
            try  {
                while(enumerator.moveNext()) {
                    arr.unshift(enumerator.getCurrent());
                }
            }finally {
                enumerator.dispose();
            }
            return Enumerable.fromArray(arr);
        };
        Enumerable.prototype.select = function (selector) {
            var parent = this;
            return new Enumerable(function () {
                var current, index = 0, enumerator;
                return Enumerator.create(function () {
                    enumerator || (enumerator = parent.getEnumerator());
                    if(!enumerator.moveNext()) {
                        return false;
                    }
                    current = selector(enumerator.getCurrent(), index++);
                    return true;
                }, function () {
                    return current;
                }, function () {
                    enumerator.dispose();
                });
            });
        };
        Enumerable.prototype.selectMany = function (collectionSelector, resultSelector) {
            var parent = this;
            return new Enumerable(function () {
                var current, index = 0, outerEnumerator, innerEnumerator;
                return Enumerator.create(function () {
                    outerEnumerator || (outerEnumerator = parent.getEnumerator());
                    while(true) {
                        if(!innerEnumerator) {
                            if(!outerEnumerator.moveNext()) {
                                return false;
                            }
                            innerEnumerator = collectionSelector(outerEnumerator.getCurrent()).getEnumerator();
                        }
                        if(innerEnumerator.moveNext()) {
                            current = innerEnumerator.getCurrent();
                            if(resultSelector) {
                                var o = outerEnumerator.getCurrent();
                                current = resultSelector(o, current);
                            }
                            return true;
                        } else {
                            innerEnumerator.dispose();
                            innerEnumerator = null;
                        }
                    }
                }, function () {
                    return current;
                }, function () {
                    if(innerEnumerator) {
                        innerEnumerator.dispose();
                    }
                    outerEnumerator.dispose();
                });
            });
        };
        Enumerable.prototype.sequenceEqual = function (second, comparer) {
            comparer || (comparer = defaultEqualityComparer);
            var e1 = this.getEnumerator(), e2 = second.getEnumerator();
            try  {
                while(e1.moveNext()) {
                    if(!e2.moveNext() || !comparer(e1.getCurrent(), e2.getCurrent())) {
                        return false;
                    }
                }
                if(e2.moveNext()) {
                    return false;
                }
                return true;
            }finally {
                e1.dispose();
                e2.dispose();
            }
        };
        Enumerable.prototype.single = function (predicate) {
            if(predicate) {
                return this.where(predicate).single();
            }
            var enumerator = this.getEnumerator();
            try  {
                while(enumerator.moveNext()) {
                    var current = enumerator.getCurrent();
                    if(enumerator.moveNext()) {
                        throw new Error(invalidOperation);
                    }
                    return current;
                }
            }finally {
                enumerator.dispose();
            }
            throw new Error(seqNoElements);
        };
        Enumerable.prototype.singleOrDefault = function (predicate) {
            if(predicate) {
                return this.where(predicate).singleOrDefault();
            }
            var enumerator = this.getEnumerator();
            try  {
                while(enumerator.moveNext()) {
                    var current = enumerator.getCurrent();
                    if(enumerator.moveNext()) {
                        throw new Error(invalidOperation);
                    }
                    return current;
                }
            }finally {
                enumerator.dispose();
            }
            return null;
        };
        Enumerable.prototype.skip = function (count) {
            var parent = this;
            return new Enumerable(function () {
                var current, skipped = false, enumerator;
                return Enumerator.create(function () {
                    enumerator || (enumerator = parent.getEnumerator());
                    if(!skipped) {
                        for(var i = 0; i < count; i++) {
                            if(!enumerator.moveNext()) {
                                return false;
                            }
                        }
                        skipped = true;
                    }
                    if(!enumerator.moveNext()) {
                        return false;
                    }
                    current = enumerator.getCurrent();
                    return true;
                }, function () {
                    return current;
                }, function () {
                    enumerator.dispose();
                });
            });
        };
        Enumerable.prototype.skipWhile = function (selector) {
            var parent = this;
            return new Enumerable(function () {
                var current, skipped = false, enumerator;
                return Enumerator.create(function () {
                    enumerator || (enumerator = parent.getEnumerator());
                    if(!skipped) {
                        while(true) {
                            if(!enumerator.moveNext()) {
                                return false;
                            }
                            if(!selector(enumerator.getCurrent())) {
                                current = enumerator.getCurrent();
                                return true;
                            }
                        }
                        skipped = true;
                    }
                    if(!enumerator.moveNext()) {
                        return false;
                    }
                    current = enumerator.getCurrent();
                    return true;
                }, function () {
                    return current;
                }, function () {
                    enumerator.dispose();
                });
            });
        };
        Enumerable.prototype.sum = function (selector) {
            if(selector) {
                return this.select(selector).sum();
            }
            var s = 0, enumerator = this.getEnumerator();
            try  {
                while(enumerator.moveNext()) {
                    s += enumerator.getCurrent();
                }
            }finally {
                enumerator.dispose();
            }
            return s;
        };
        Enumerable.prototype.take = function (count) {
            var parent = this;
            return new Enumerable(function () {
                var current, enumerator, myCount = count;
                return Enumerator.create(function () {
                    enumerator || (enumerator = parent.getEnumerator());
                    if(myCount === 0) {
                        return false;
                    }
                    if(!enumerator.moveNext()) {
                        myCount = 0;
                        return false;
                    }
                    myCount--;
                    current = enumerator.getCurrent();
                    return true;
                }, function () {
                    return current;
                }, function () {
                    enumerator.dispose();
                });
            });
        };
        Enumerable.prototype.takeWhile = function (selector) {
            var parent = this;
            return new Enumerable(function () {
                var current, index = 0, enumerator;
                return Enumerator.create(function () {
                    enumerator || (enumerator = parent.getEnumerator());
                    if(!enumerator.moveNext()) {
                        return false;
                    }
                    current = enumerator.getCurrent();
                    if(!selector(current, index++)) {
                        return false;
                    }
                    return true;
                }, function () {
                    return current;
                }, function () {
                    enumerator.dispose();
                });
            });
        };
        Enumerable.prototype.toArray = function () {
            var results = [], e = this.getEnumerator();
            try  {
                while(e.moveNext()) {
                    results.push(e.getCurrent());
                }
                return results;
            }finally {
                e.dispose();
            }
        };
        Enumerable.prototype.where = function (selector) {
            var parent = this;
            return new Enumerable(function () {
                var current, index = 0, enumerator;
                return Enumerator.create(function () {
                    enumerator || (enumerator = parent.getEnumerator());
                    while(true) {
                        if(!enumerator.moveNext()) {
                            return false;
                        }
                        current = enumerator.getCurrent();
                        if(selector(current, index++)) {
                            return true;
                        }
                    }
                }, function () {
                    return current;
                }, function () {
                    enumerator.dispose();
                });
            });
        };
        Enumerable.prototype.union = function (second, comparer) {
            comparer || (comparer = defaultEqualityComparer);
            var parent = this;
            return Enumerable.create(function () {
                var current, enumerator, map = [], firstDone = false, secondDone = false;
                return Enumerator.create(function () {
                    while(true) {
                        if(!enumerator) {
                            if(secondDone) {
                                return false;
                            }
                            if(!firstDone) {
                                enumerator = parent.getEnumerator();
                                firstDone = true;
                            } else {
                                enumerator = second.getEnumerator();
                                secondDone = true;
                            }
                        }
                        if(enumerator.moveNext()) {
                            current = enumerator.getCurrent();
                            if(this.arrayIndexOf.call(map, current, comparer) === -1) {
                                map.push(current);
                                return true;
                            }
                        } else {
                            enumerator.dispose();
                            enumerator = null;
                        }
                    }
                }, function () {
                    return current;
                }, function () {
                    if(enumerator) {
                        enumerator.dispose();
                    }
                });
            });
        };
        Enumerable.prototype.zip = function (right, selector) {
            var parent = this;
            return new Enumerable(function () {
                var e1, e2, current;
                return Enumerator.create(function () {
                    if(!e1 && !e2) {
                        e1 = parent.getEnumerator();
                        e2 = right.getEnumerator();
                    }
                    if(e1.moveNext() && e2.moveNext()) {
                        current = selector(e1.getCurrent(), e2.getCurrent());
                        return true;
                    }
                    return false;
                }, function () {
                    return current;
                }, function () {
                    e1.dispose();
                    e2.dispose();
                });
            });
        };
        Enumerable.concat = function concat() {
            var args = [];
            for (var _i = 0; _i < (arguments.length - 0); _i++) {
                args[_i] = arguments[_i + 0];
            }
            return Enumerable.fromArray(args).selectMany(identity);
        }
        Enumerable.create = function create(getEnumerator) {
            return new Enumerable(getEnumerator);
        }
        Enumerable.empty = function empty() {
            return new Enumerable(function () {
                return Enumerator.create(function () {
                    return false;
                }, function () {
                    throw new Error(seqNoElements);
                });
            });
        }
        Enumerable.fromArray = function fromArray(array) {
            return new Enumerable(function () {
                var index = 0, value;
                return Enumerator.create(function () {
                    if(index < array.length) {
                        value = array[index++];
                        return true;
                    }
                    return false;
                }, function () {
                    return value;
                });
            });
        }
        Enumerable.returnValue = function returnValue(value) {
            return new Enumerable(function () {
                var done = false;
                return Enumerator.create(function () {
                    if(done) {
                        return false;
                    }
                    done = true;
                    return true;
                }, function () {
                    return value;
                });
            });
        }
        Enumerable.range = function range(start, count) {
            return new Enumerable(function () {
                var current = start - 1, end = start + count - 1;
                return Enumerator.create(function () {
                    if(current < end) {
                        current++;
                        return true;
                    } else {
                        return false;
                    }
                }, function () {
                    return current;
                });
            });
        }
        Enumerable.repeat = function repeat(value, count) {
            return new Enumerable(function () {
                var myCount = count;
                if(myCount === undefined) {
                    myCount = -1;
                }
                return Enumerator.create(function () {
                    if(myCount !== 0) {
                        myCount--;
                        return true;
                    } else {
                        return false;
                    }
                }, function () {
                    return value;
                });
            });
        }
        return Enumerable;
    })();
    exports.Enumerable = Enumerable;    
    function swap(arr, idx1, idx2) {
        var temp = arr[idx1];
        arr[idx1] = arr[idx2];
        arr[idx2] = temp;
    }
    function quickSort(array, start, end) {
        if(start === undefined && end === undefined) {
            start = 0;
            end = array.length - 1;
        }
        var i = start, k = end;
        if(end - start >= 1) {
            var pivot = array[start];
            while(k > i) {
                while(this.compareKeys(array[i], pivot) <= 0 && i <= end && k > i) {
                    i++;
                }
                while(this.compareKeys(array[k], pivot) > 0 && k >= start && k >= i) {
                    k--;
                }
                if(k > i) {
                    swap(array, i, k);
                }
            }
            swap(array, start, k);
            quickSort.call(this, array, start, k - 1);
            quickSort.call(this, array, k + 1, end);
        }
    }
    var EnumerableSorter = (function () {
        function EnumerableSorter(keySelector, comparer, descending, next) {
            this.keySelector = keySelector;
            this.comparer = comparer;
            this.descending = descending;
            this.next = next;
        }
        EnumerableSorter.prototype.computeKeys = function (elements, count) {
            this.keys = new Array(count);
            for(var i = 0; i < count; i++) {
                this.keys[i] = this.keySelector(elements[i]);
            }
            if(this.next) {
                this.next.computeKeys(elements, count);
            }
        };
        EnumerableSorter.prototype.compareKeys = function (idx1, idx2) {
            var n = this.comparer(this.keys[idx1], this.keys[idx2]);
            if(n === 0) {
                return !this.next ? idx1 - idx2 : this.next.compareKeys(idx1, idx2);
            }
            return this.descending ? -n : n;
        };
        EnumerableSorter.prototype.sort = function (elements, count) {
            this.computeKeys(elements, count);
            var map = new Array(count);
            for(var i = 0; i < count; i++) {
                map[i] = i;
            }
            quickSort.call(this, map, 0, count - 1);
            return map;
        };
        return EnumerableSorter;
    })();
    exports.EnumerableSorter = EnumerableSorter;    
    var OrderedEnumerable = (function (_super) {
        __extends(OrderedEnumerable, _super);
        function OrderedEnumerable(source, keySelector, comparer, descending) {
                _super.call(this, function () {
        return source.getEnumerator();
    });
            this.getEnumerator = this.__getEnumerator;
            this.source = source;
            this.keySelector = keySelector || identity;
            this.comparer = comparer || defaultComparer;
            this.descending = descending;
        }
        OrderedEnumerable.prototype.getEnumerableSorter = function (next) {
            var next1 = new EnumerableSorter(this.keySelector, this.comparer, this.descending, next);
            if(this.parent) {
                next1 = this.parent.getEnumerableSorter(next1);
            }
            return next1;
        };
        OrderedEnumerable.prototype.createOrderedEnumerable = function (keySelector, comparer, descending) {
            var e = new OrderedEnumerable(this.source, keySelector, comparer, descending);
            e.parent = this;
            return e;
        };
        OrderedEnumerable.prototype.__getEnumerator = function () {
            var buffer = this.source.toArray(), length = buffer.length, sorter = this.getEnumerableSorter(), map = sorter.sort(buffer, length), index = 0, current;
            return Enumerator.create(function () {
                if(index < length) {
                    current = buffer[map[index++]];
                    return true;
                }
                return false;
            }, function () {
                return current;
            });
        };
        OrderedEnumerable.prototype.thenBy = function (keySelector, comparer) {
            return new OrderedEnumerable(this, keySelector, comparer, false);
        };
        OrderedEnumerable.prototype.thenByDescending = function (keySelector, comparer) {
            return new OrderedEnumerable(this, keySelector, comparer, true);
        };
        return OrderedEnumerable;
    })(Enumerable);
    exports.OrderedEnumerable = OrderedEnumerable;    
})
//@ sourceMappingURL=l2o.js.map
;
define('thrust/util/main',["require", "exports", 'lodash', './function', './object', './type', './guid', './url', './string', './when', './lib/camelcase', './l2o'], function(require, exports, ______, __uFunction__, __uObject__, __uType__, __uGuid__, __uUrl__, __uString__, __uWhen__, __uLibCamelCase__, __ul2o__) {
    /// <reference path="../../lib/DefinitelyTyped/requirejs/require-2.1.d.ts" />
    // Disabled until TS supports module per file in some way (ie exports is exports.<export> not  exports.moduleName.<export>)
    /*export module util {*/
    var __ = ______;

    var uFunction = __uFunction__;

    var uObject = __uObject__;

    var uType = __uType__;

    var uGuid = __uGuid__;

    var uUrl = __uUrl__;

    var uString = __uString__;

    var uWhen = __uWhen__;

    var uLibCamelCase = __uLibCamelCase__;

    var ul2o = __ul2o__;

    
    exports._ = __;
    exports.linq = ul2o;
    exports.instantiate = uFunction.instantiate;
    exports.noop = uFunction.noop;
    exports.safeInvoke = uFunction.safeInvoke;
    exports.invert = uObject.invert;
    exports.type = uType.type;
    exports.isArrayLike = uType.isArrayLike;
    exports.isArrayOrArrayLike = uType.isArrayOrArrayLike;
    exports.emptyGuid = uGuid.emptyGuid;
    exports.isGuid = uGuid.isGuid;
    exports.isGuidEmpty = uGuid.isGuidEmpty;
    exports.newGuid = uGuid.newGuid;
    exports.getModuleNameForPath = uString.getModuleNameForPath;
    exports.format = uString.format;
    exports.param = uUrl.param;
    exports.cleanUrl = uUrl.cleanUrl;
    exports.fixupUrl = uUrl.fixupUrl;
    exports.when = uWhen;
    exports.flattenToPromises = uFunction.flattenToPromises;
    exports.camelCase = uLibCamelCase.camelCase;
    exports.unCamelCase = uLibCamelCase.unCamelCase;
})
//@ sourceMappingURL=main.js.map
;
define('thrust/util', ['thrust/util/main'], function (main) { return main; });

define('thrust/instance',["require", "exports", 'thrust/util'], function(require, exports, __util__) {
    /// <reference path="interfaces/thrust.d.ts" />
    /// <reference path="../lib/DefinitelyTyped/requirejs/require-2.1.d.ts" />
    // Disabled until TS supports module per file in some way (ie exports is exports.<export> not  exports.moduleName.<export>)
    /*export module instance {*/
    /**
    Gets the thrust instances.
    
    @module thrust
    **/
    var util = __util__;

    var when = util.when;
    /**
    The available thrust instances
    index by name
    
    @for thrust.instance
    @property instances
    @private
    **/
    exports.instances = {
    };
    /**
    The loading thurst instances.
    index by name
    
    @property loadingInstances
    @private
    **/
    exports.loadingInstances = {
    };
    /**
    Gets a named thrust stance if it exists.
    
    @method getInstance
    @static
    @param {String} name The instance name
    @returns {Thrust} The thrust instance
    **/
    function getInstance(name) {
        return exports.instances[name] || null;
    }
    exports.getInstance = getInstance;
    /**
    Fetchs a named thrust stance if it exists.
    This loads asyncronously, as the instance may not be loaded
    
    @method __fetchInstance
    @static
    @private
    @param {String} name The instance name
    @returns {Promise} To a thrust instance spec
    **/
    function fetchInstance(name) {
        var defer = exports.loadingInstances[name] || (exports.loadingInstances[name] = when.defer());
        return defer;
    }
    exports.fetchInstance = fetchInstance;
    /*}*/ })
//@ sourceMappingURL=instance.js.map
;
define('thrust/config',["require", "exports", './instance'], function(require, exports, __thrustInstance__) {
    /// <reference path="../lib/DefinitelyTyped/requirejs/require-2.1.d.ts" />
    // Disabled until TS supports module per file in some way (ie exports is exports.<export> not  exports.moduleName.<export>)
    /*export module config {*/
    
    var thrustInstance = __thrustInstance__;

    /**
    Provides thrust configuration
    
    @module thrust
    @submodule thrust.config
    **/
    /**
    This property, tells the framework if it should throw errors or not.
    In production it's recommended not to throw errors, that way if a component fails
    there is a chance the application can still recover.
    
    @for thrust.config
    @property throwErrors
    @readOnly
    @type {Boolean}
    @default false
    **/
    exports.throwErrors = true;
    /**
    Tells the framework to run in async mode, this may delay start up, but will make image loading and inital running appear faster.
    
    @property async
    @readOnly
    @type {Boolean}
    @default true
    **/
    exports.async = true;
    /**
    Tells thrust to expose each instance as a global, this allows legacy components to utilize parts of thrust, or easily
    get at your thrust instance during debugging.
    
    @property exposeGlobals
    @readOnly
    @type {Boolean}
    @default true
    **/
    exports.exposeGlobals = true;
    exports.url = {
        path: /**
        This property, gives the framework it's default path, if different than '/'
        
        @property url.path
        @readOnly
        @type {String}
        @default "/"
        **/
        '/',
        traditionalEncoding: /**
        This property, tells the framework how it should encode array form data.
        In general, for ASP.NET based applications, traditional should be true.
        For Ruby/Python based applications, this should be false.
        
        @property url.traditionalEncoding
        @readOnly
        @type {Boolean}
        @default false
        **/
        true
    };
    exports.log = {
        level: /**
        This lends to the log level of thrust.
        
        ERROR: 1
        WARN: 2
        INFO: 3
        DEBUG: 4
        
        @property log.level
        @readOnly
        @type {String}
        @default 1
        **/
        4,
        enabled: /**
        This toggles enabling on or off.
        
        @property log.enabled
        @readOnly
        @type {Boolean}
        @default false
        **/
        true
    };
    /**
    Plugins for thrust to load, override with your own set if you have a different set.
    
    @property plugins
    @readOnly
    @type {Array}
    **/
    exports.plugins = [];
    /**
    * The set of modules to preload with the inital wireup of the Thrust instance.
    *
    * Accepts the module path a string or the module as an object in the following format.
    *   Where args will be handed off to the module life cycle methods.
    *
    *    {
    *        path: '',
    *        args: []
    *    }
    *
    * @property modules
    * @readOnly
    * @type {Array}
    **/
    exports.modules = [];
    /**
    Used internally by thrust to determine if the life-cycle is controlled by thrust, or a parent instance.
    
    @property childInstance
    @readOnly
    @type {Boolean}
    **/
    exports.childInstance = false;
    /**
    Used internally by thrust to determine if thrust should control the life-cycle, or the consumer
    
    @property automaticLifecycle
    @readOnly
    @type {Boolean}
    **/
    exports.automaticLifecycle = true;
    /**
    Used internally by thrust to determin if the thrust instance should automatically start upon creation.
    
    @property autoStart
    @readOnly
    @type {Boolean}
    **/
    exports.autoStart = false;
    /**
    AMD API
    load
    
    Handles fetching of a current config for the current thrust instance, or the config of the given plugin.
    Adding the : character requests a specific config plugin.
    thrust/config!global = thrust!global:config = Thrust instance config from the instance named global.
    
    @method load
    @static
    @param {String} name The name of the instance that is being fetched
    @param {Function} parentRequire the require method to be loaded
    @param {Function} load Allows the load to inform that AMD for the value to hand off
    @param {Object} config The custom configuration.
    **/
    function load(name, parentRequire, load, config) {
        var parts = name.split(':'), realName = parts[0], pluginName = parts[1] || false;
        var instanceDeferred = thrustInstance.fetchInstance(realName);
        instanceDeferred.promise.then(function (context) {
            var plugin = pluginName && context.cfg[pluginName] || context.config;
            if(!plugin) {
                throw new Error('Plugin "' + pluginName + '" does not exist on thrust instance "' + realName + '".');
            }
            load(plugin);
        });
    }
    exports.load = load;
    /*}*/ })
//@ sourceMappingURL=config.js.map
;
define('thrust/log',["require", "exports", './config', 'thrust/util'], function(require, exports, __tConfig__, __util__) {
    /// <reference path="../lib/DefinitelyTyped/requirejs/require-2.1.d.ts" />
    // Disabled until TS supports module per file in some way (ie exports is exports.<export> not  exports.moduleName.<export>)
    /*export module instance {*/
    var tConfig = __tConfig__;

    var util = __util__;

    /**
    A basic logger for the thrust framework.
    Disables debug logging when thrust is not in debug mode.
    
    @module thrust
    
    **/
    
    // Log levels
    var LEVEL = {
        DEBUG: 4,
        INFO: 3,
        WARN: 2,
        ERROR: 1
    };
    // Declare our variables
        var console = window.console, timers = {
    }, cLog = (console && console.log) || false, cWarn = (console && console.warn) || false, cInfo = (console && console.info) || false, cError = (console && console.error) || false, cTime = (console && console['time']) || false, cTimeEnd = (console && console['timeEnd']) || false, slice = Array.prototype.slice, configLevel = tConfig.log.level || LEVEL.ERROR, logLevel = LEVEL[configLevel] || (typeof configLevel === 'string' && LEVEL[configLevel.toUpperCase()]) || (typeof configLevel === 'number' && configLevel) || LEVEL.ERROR;
    // Various loggers to handle IE8/9 support.
    var logRunner = function (consoleMethod, logType) {
        // Show logs when enabled or if they are errors
        var args = slice.call(arguments, 1);
        if(consoleMethod) {
            if(consoleMethod.apply) {
                consoleMethod.apply(console, args);
            } else {
                consoleMethod(args);
            }
        } else {
            if(!consoleMethod && cLog) {
                if(cLog.apply) {
                    cLog.apply(console, args);
                } else {
                    cLog(args);
                }
            }
        }
    };
    /**
    A basic logger for the thrust framework.
    Disables debug logging when thrust is not in debug mode.
    
    @class thrust.Log
    **/
    /**
    Logs a debug type message using the console log method
    
    @method debug
    **/
    function debug() {
        var args = [];
        for (var _i = 0; _i < (arguments.length - 0); _i++) {
            args[_i] = arguments[_i + 0];
        }
        // Short circuit if logging is disabled.  This is as close to noop as we can get, incase there is a direct reference to this method.
        if(!tConfig.log.enabled) {
            return;
        }
        if(logLevel >= LEVEL.DEBUG) {
            var args = slice.call(arguments);
            args.unshift(cLog);
            logRunner.apply(this, args, 'log');
        }
    }
    exports.debug = debug;
    /**
    Logs a info type message using the console info method if available, otherwise it uses the console log method.
    
    @method info
    **/
    function info() {
        var args = [];
        for (var _i = 0; _i < (arguments.length - 0); _i++) {
            args[_i] = arguments[_i + 0];
        }
        // Short circuit if logging is disabled.  This is as close to noop as we can get, incase there is a direct reference to this method.
        if(!tConfig.log.enabled) {
            return;
        }
        if(logLevel >= LEVEL.INFO) {
            var args = slice.call(arguments);
            args.unshift(cInfo);
            logRunner.apply(this, args, 'info');
        }
    }
    exports.info = info;
    /**
    Logs a warn type message using the console warn method if available, otherwise it uses the console log method.
    
    @method warn
    **/
    function warn() {
        var args = [];
        for (var _i = 0; _i < (arguments.length - 0); _i++) {
            args[_i] = arguments[_i + 0];
        }
        // Short circuit if logging is disabled.  This is as close to noop as we can get, incase there is a direct reference to this method.
        if(!tConfig.log.enabled) {
            return;
        }
        if(logLevel >= LEVEL.WARN) {
            var args = slice.call(arguments);
            args.unshift(cWarn);
            logRunner.apply(this, args, 'warn');
        }
    }
    exports.warn = warn;
    /**
    Logs a error type message using the console error method if available, otherwise it uses the console log method.
    
    @method error
    **/
    function error() {
        var args = [];
        for (var _i = 0; _i < (arguments.length - 0); _i++) {
            args[_i] = arguments[_i + 0];
        }
        // Short circuit if logging is disabled.  This is as close to noop as we can get, incase there is a direct reference to this method.
        if(!tConfig.log.enabled) {
            return;
        }
        if(logLevel >= LEVEL.ERROR) {
            var args = slice.call(arguments);
            args.unshift(cError);
            logRunner.apply(this, args, 'error');
        }
    }
    exports.error = error;
    /**
    Logs a time type message using the console time method if available, otherwise it uses the console log method.
    
    @method time
    **/
    function time(message) {
        var args = [];
        for (var _i = 0; _i < (arguments.length - 1); _i++) {
            args[_i] = arguments[_i + 1];
        }
        // Short circuit if logging is disabled.  This is as close to noop as we can get, incase there is a direct reference to this method.
        if(!tConfig.log.enabled) {
            return;
        }
        if(logLevel >= LEVEL.DEBUG) {
            timers[message] = {
                start: new Date().getTime()
            };
            var msg = util.format('{0}: timer started', message), args = slice.call(arguments, 1);
            args.unshift(msg);
            args.unshift(cTime);
            logRunner.apply(this, args);
        }
    }
    exports.time = time;
    /**
    Logs a timeEnd type message using the console timeEnd method if available, otherwise it uses the console log method.
    Causes the timer to end, for the given message.
    
    @method timeEnd
    **/
    function timeEnd(message) {
        var args = [];
        for (var _i = 0; _i < (arguments.length - 1); _i++) {
            args[_i] = arguments[_i + 1];
        }
        // Short circuit if logging is disabled.  This is as close to noop as we can get, incase there is a direct reference to this method.
        if(!tConfig.log.enabled) {
            return;
        }
        if(logLevel >= LEVEL.DEBUG) {
            timers[message].end = (new Date()).getTime();
            var time = timers[message].end - timers[message].start, msg = util.format('{0}: {1}ms', message, time);
            var args = slice.call(arguments, 1);
            args.unshift(msg);
            args.unshift(cTimeEnd);
            logRunner.apply(this, args);
        }
    }
    exports.timeEnd = timeEnd;
})
//@ sourceMappingURL=log.js.map
;
;(function(g){

    // summary: A simple feature detection function/framework.
    //
    // name: String
    //      The name of the feature to detect, as defined by the overall `has` tests.
    //      Tests can be registered via `has.add(testname, testfunction)`.
    //
    // example:
    //      mylibrary.bind = has("native-bind") ? function(fn, context){
    //          return fn.bind(context);
    //      } : function(fn, context){
    //          return function(){
    //              fn.apply(context, arguments);
    //          }
    //      }

    var NON_HOST_TYPES = { "boolean": 1, "number": 1, "string": 1, "undefined": 1 },
        VENDOR_PREFIXES = ["Webkit", "Moz", "O", "ms", "Khtml"],
        d = isHostType(g, "document") && g.document,
        el = d && isHostType(d, "createElement") && d.createElement("DiV"),
        freeExports = typeof exports == "object" && exports,
        freeModule = typeof module == "object" && module,
        testCache = {}
    ;

    function has(/* String */name){
        if(typeof testCache[name] == "function"){
            testCache[name] = testCache[name](g, d, el);
        }
        return testCache[name]; // Boolean
    }

    function add(/* String */name, /* Function */test, /* Boolean? */now){
        // summary: Register a new feature detection test for some named feature
        //
        // name: String
        //      The name of the feature to test.
        //
        // test: Function
        //      A test function to register. If a function, queued for testing until actually
        //      needed. The test function should return a boolean indicating
        //      the presence of a feature or bug.
        //
        // now: Boolean?
        //      Optional. Omit if `test` is not a function. Provides a way to immediately
        //      run the test and cache the result.
        // example:
        //      A redundant test, testFn with immediate execution:
        //  |       has.add("javascript", function(){ return true; }, true);
        //
        // example:
        //      Again with the redundantness. You can do this in your tests, but we should
        //      not be doing this in any internal has.js tests
        //  |       has.add("javascript", true);
        //
        // example:
        //      Three things are passed to the testFunction. `global`, `document`, and a generic element
        //      from which to work your test should the need arise.
        //  |       has.add("bug-byid", function(g, d, el){
        //  |           // g  == global, typically window, yadda yadda
        //  |           // d  == document object
        //  |           // el == the generic element. a `has` element.
        //  |           return false; // fake test, byid-when-form-has-name-matching-an-id is slightly longer
        //  |       });
        testCache[name] = now ? test(g, d, el) : test;
    }

    // cssprop adapted from http://gist.github.com/598008 (thanks, ^pi)
    function cssprop(name, el){
        var supported = false,
            capitalized = name.charAt(0).toUpperCase() + name.slice(1),
            length = VENDOR_PREFIXES.length,
            style = el.style;

        if(typeof style[name] == "string"){
            supported = true;
        }else{
            while(length--){
                if(typeof style[VENDOR_PREFIXES[length] + capitalized] == "string"){
                    supported = true;
                    break;
                }
            }
        }
        return supported;
    }

    function clearElement(el){
        if(el){
            while(el.lastChild){
                el.removeChild(el.lastChild);
            }
        }
        return el;
    }

    // Host objects can return type values that are different from their actual
    // data type. The objects we are concerned with usually return non-primitive
    // types of object, function, or unknown.
    function isHostType(object, property){
        var type = typeof object[property];
        return type == "object" ? !!object[property] : !NON_HOST_TYPES[type];
    }

        has.add = add;
    has.clearElement = clearElement;
    has.cssprop = cssprop;
    has.isHostType = isHostType;
    has._tests = testCache;

    has.add("dom", function(g, d, el){
        return d && el && isHostType(g, "location") && isHostType(d, "documentElement") &&
            isHostType(d, "getElementById") && isHostType(d, "getElementsByName") &&
            isHostType(d, "getElementsByTagName") && isHostType(d, "createComment") &&
            isHostType(d, "createElement") && isHostType(d, "createTextNode") &&
            isHostType(el, "appendChild") && isHostType(el, "insertBefore") &&
            isHostType(el, "removeChild") && isHostType(el, "getAttribute") &&
            isHostType(el, "setAttribute") && isHostType(el, "removeAttribute") &&
            isHostType(el, "style") && typeof el.style.cssText == "string";
    });

    // Stop repeat background-image requests and reduce memory consumption in IE6 SP1
    // http://misterpixel.blogspot.com/2006/09/forensic-analysis-of-ie6.html
    // http://blogs.msdn.com/b/cwilso/archive/2006/11/07/ie-re-downloading-background-images.aspx?PageIndex=1
    // http://support.microsoft.com/kb/823727
    try{
        document.execCommand("BackgroundImageCache", false, true);
    }catch(e){}

    // Expose has()
    // some AMD build optimizers, like r.js, check for specific condition patterns like the following:
    if(typeof define == "function" && typeof define.amd == "object" && define.amd){
        define("has",[], function(){
            return has;
        });
    }
    // check for `exports` after `define` in case a build optimizer adds an `exports` object
    else if(freeExports){
        // in Node.js or RingoJS v0.8.0+
        if(freeModule && freeModule.exports == freeExports){
          (freeModule.exports = has).has = has;
        }
        // in Narwhal or RingoJS v0.7.0-
        else{
          freeExports.has = has;
        }
    }
    // in a browser or Rhino
    else{
        // use square bracket notation so Closure Compiler won't munge `has`
        // http://code.google.com/closure/compiler/docs/api-tutorial3.html#export
        g["has"] = has;
    }
})(this);

define('thrust/capsule',["require", "exports", 'thrust/util', './log', 'has'], function(require, exports, __util__, __log__, __has__) {
    /// <reference path="../lib/DefinitelyTyped/requirejs/require-2.1.d.ts" />
    // Disabled until TS supports module per file in some way (ie exports is exports.<export> not  exports.moduleName.<export>)
    /*export module instance {*/
    
    var util = __util__;

    var _ = util._;
    var log = __log__;

    var has = __has__;

    var type = util.type, format = util.format, isObject = _.isObject, extend = _.extend, when = util.when, flatten = _.flatten, pluck = _.pluck, flattenToPromises = util.flattenToPromises, thrustCache = {
    }, __optionalMethods = [
        // Optional methods that may be on a module
        'start', 
'stop', 
'ready'    ];
    var __requiredMethods = [
        // Required methods that must be on every module
        'init', 
        'destroy'
    ];
    /**
    Moves all properties, that should exist outside of the module, into a private object for holding.
    
    @method moveToThrustCache
    @private
    @param {Object} from Object to extract items from
    @param {Object} to Object to place items on
    @param {Array} list Items to move from to the other object
    **/
    function moveToThrustCache(from, to, list) {
        for(var i = 0, iLen = list.length; i < iLen; i++) {
            to[list[i]] = from[list[i]];
            delete from[list[i]];
        }
    }
    function getEventNamespace(name, prefix) {
        if(!prefix) {
            prefix = 'module-';
        }
        return '.' + (name === 'global' ? 'global' : prefix + name.replace(/\./g, '-'));
    }
    function callFacadeMethods(method, mid) {
        var results = [];
        for(var i in thrustCache[mid].facades) {
            var moduleCache = thrustCache[mid], facade = moduleCache.facades[i];
            has('DEBUG') && log.debug(format('thrust/capsule: Calling facade "{0}" {1}()', i, method));
            if(facade[method] && isObject(facade)) {
                results.push(facade[method].call(facade, thrustCache[mid].module));
            }
        }
        return results;
    }
    /**
    The module is the heart of the thrust, every module gets one facade per module.
    
    @module thrust
    @class thrust.Module
    @param {Thrust} thrust The thrust instance
    @param {Object} def The module definition
    @param {String} [name] The module name.
    **/
    var Module = (function () {
        //var Module =
        function Module(thrust, def, name) {
            name = this.name = (name || def.name);
            if(typeof def === 'function') {
                def = def(name);
                def.name = name;
            }
            var mid = this.mid = thrust.name + ':' + name;
            var tCache = thrustCache[def.hash || mid];
            this.instance = extend(def, tCache && tCache.instance || {
            });
            this.instance.name = (this.instance.name || name);
            this.instance.mid = mid;
            if(!this.instance.name) {
                throw new Error('All Modules must have a name!');
            }
            // Modules must have an init method and a destroy method, it's up to the module developer to populate these methods.
            for(var i = 0, iLen = __requiredMethods.length; i < iLen; i++) {
                if(!def[__requiredMethods[i]]) {
                    throw new Error(format('Required "{0}" method not found on module "{1}"!', __requiredMethods[i], name));
                }
            }
            // If the module name is undefined, bring the name into the module.
            if(typeof def.name === 'undefined') {
                def.name = name;
            }
            var thrustModuleCacheItem = thrustCache[mid] = extend(tCache || {
            }, {
                _started: false,
                name: util.getModuleNameForPath(name),
                module: this
            });
            delete thrustCache[def.hash];
            var facades = thrustModuleCacheItem.facades || (thrustModuleCacheItem.facades = {
            });
            if(!thrust.__conventionPluckPropertiesCache) {
                thrust.__conventionPluckPropertiesCache = flatten(pluck(thrust.__conventions || [], 'properties'));
            }
            // Move all special properties off to the thrust's internal method.
            moveToThrustCache(this.instance, thrustModuleCacheItem, __requiredMethods);
            moveToThrustCache(this.instance, thrustModuleCacheItem, __optionalMethods);
            moveToThrustCache(this.instance, thrustModuleCacheItem, thrust.__conventionPluckPropertiesCache);
            util.safeInvoke(thrust, 'createFacade', thrust, this.instance, facades);
            this.__namespace = getEventNamespace(this.instance.name);
            this.thrust = thrust;
        }
        /**
        Getter/Setter for convention methods.
        Gets the value convention property (defined in the properties array of a facade).
        Sets the value of a convention property (for storing convention configuration)
        
        @param {String} property The property to get or set
        @param {object} [value] The value to set
        @method convention
        @returns {Object} The valaue.
        **/
                Module.thrustCache = thrustCache;
        Module.prototype.convention = function (property, value) {
            if(typeof value !== 'undefined') {
                thrustCache[this.mid][property] = value;
                return;
            }
            return thrustCache[this.mid][property];
        }/**
        Injects this module into the given thrust instance.
        
        @method thrustCreate
        @param {Thrust} thrust The thrust instance.
        **/
        ;
        Module.prototype.thrustCreate = function (thrust) {
            thrust.__injectModule(this);
        }/**
        Makes a call to all the modules facades
        The order of the call depends on the order required.
        During the startup stage (init, start, ready) facades are called first.
        During the shutdown state (stop, destroy) facades are called last.
        This allows modules to startup and shutdown will all the tools it had to begin with.
        
        @method thrustCall
        @protected
        @param {String} method the method to call
        @param {Boolean} facadeAfter calls facade methods before or after module method.
        @param {Array} args Args to be passed onto the module method.
        **/
        ;
        Module.prototype.thrustCall = function (method, facadeAfter, args) {
            var defer = when.defer(), results, that = this;
            has('DEBUG') && log.debug(format('thrust/capsule: Calling facades for "{0}"', that.name));
            var m = thrustCache[that.mid][method];
            if(!facadeAfter) {
                results = callFacadeMethods(method, that.mid);
                if(results) {
                    when.chain(when.all(flattenToPromises(results)), defer);
                } else {
                    defer.resolve();
                }
                if(m) {
                    var newDefer = when.defer();
                    defer.promise.then(function () {
                        var result = m.apply(that.instance, args);
                        if(result) {
                            when.chain(when.all(flattenToPromises(result)), newDefer);
                        } else {
                            newDefer.resolve();
                        }
                    });
                    defer = newDefer;
                }
            } else {
                var m = thrustCache[that.mid][method];
                if(m) {
                    results = m.apply(that.instance, args);
                    if(results) {
                        when.chain(when.all(flattenToPromises(results)), defer);
                    } else {
                        defer.resolve();
                    }
                } else {
                    defer.resolve();
                }
                var newDefer = when.defer();
                defer.promise.then(function () {
                    var result = callFacadeMethods(method, that.mid);
                    if(result) {
                        when.chain(when.all(flattenToPromises(result)), newDefer);
                    } else {
                        newDefer.resolve();
                    }
                });
                defer = newDefer;
            }
            return defer.promise;
        }/**
        Start the module, inside the thrust container it was created on.
        
        @method start
        **/
        ;
        Module.prototype.start = function () {
            var that = this;
            that.thrust.start(that.name);
        }/**
        Stop the module, inside the thrust container it was created on.
        
        @method start
        **/
        ;
        Module.prototype.stop = function () {
            var that = this;
            that.thrust.stop(that.name);
        };
        return Module;
    })();
    exports.Module = Module;    
    /**
    AMD API
    load
    
    Handles fetching of a module instance.
    Format:
    thrust/capsule!{instance}:{moduleName}
    
    @method load
    @static
    @param {String} name The name of the instance that is being fetched
    @param {Function} parentRequire the require method to be loaded
    @param {Function} load Allows the load to inform that AMD for the value to hand off
    @param {Object} config The custom configuration.
    **/
    function load(name, parentRequire, load, config) {
        var parts = name.split(':'), instanceName = parts[0], moduleName = parts[1];
        require([
            'thrust!' + instanceName
        ], function (thrust) {
            var module = thrust.modules[moduleName];
            if(!module) {
                throw new Error(format('Module "{0}" does not exist on thrust instance "{1}".', moduleName, instanceName));
            }
            load(module);
        });
    }
    exports.load = load;
})
//@ sourceMappingURL=capsule.js.map
;
define('thrust/ignite',["require", "exports", 'module', 'thrust/util', './config', './capsule'], function(require, exports, __requireModule__, __util__, __config__, __tm__) {
    /// <reference path="interfaces/thrust.d.ts" />
    /// <reference path="../lib/DefinitelyTyped/requirejs/require-2.1.d.ts" />
    // Disabled until TS supports module per file in some way (ie exports is exports.<export> not  exports.moduleName.<export>)
    /*export module instance {*/
    
    var requireModule = __requireModule__;

    var util = __util__;

    var _ = util._;
    
    var config = __config__;

    var tm = __tm__;

    var slice = Array.prototype.slice, isArray = _.isArray, toArray = _.toArray, isFunction = _.isFunction, each = _.each, map = _.map, any = _.any, all = _.all, when = util.when, extend = _.extend, flatten = _.flatten, pluck = _.pluck, isObject = _.isObject, keys = _.keys, union = _.union, stageOneComplete = {
    };
    function reconcileArrays(config, settings, to) {
        var keys = _.keys(config);
        if(settings) {
            keys = union(_.keys(settings), keys);
        } else {
            settings = {
            };
        }
        each(keys, function (i) {
            var x = settings[i] || config[i];
            if(isArray(x)) {
                to[i] = toArray(settings[i] || to[i]);
            } else {
                if(isObject(x) && !isFunction(x)) {
                    reconcileArrays(x, null, to[i]);
                }
            }
        });
    }
    /**
    Contructs a wire spec for thrust to launch from.
    
    @module thrust
    **/
    /**
    Merges a all the plugins configurations, with the default config, and then finally with
    any customized config from requirejs
    
    @method stageOne
    @param {Object} settings The settints to pass onto the thrust instance being created.
    **/
    function stageOne(settings) {
        /*jshint validthis:true */
        var that = this;
        if(stageOneComplete[settings.name]) {
            return that.stateTwo(settings);
        }
        var plugins = [
'thrust/mediator'        ].concat(settings.plugins || requireModule.config().plugins || config.plugins || []), defer = when.defer();
        settings.plugins = plugins;
        require(plugins.map(function (x) {
            return x;
        }), function () {
            var args = arguments;
            plugins.forEach(function (plugin, i) {
                var name = plugin.substring(plugin.lastIndexOf('/') + 1);
                var pluginClass = args[i][args[i].className];
                config[name] = pluginClass.config;
            });
            _.merge(config, requireModule.config());
            when.chain(that.stateTwo(settings), defer);
        });
        stageOneComplete[settings.name] = true;
        return defer.promise;
    }
    exports.stageOne = stageOne;
    /**
    Creates a thrust instance, from the given settings.
    Including the plugins.
    
    @method stateTwo
    @param {Object} settings The settints to pass onto the thrust instance being created.
    **/
    function stateTwo(settings) {
        /*jshint loopfunc:true */
        // Get the configuration
                var localConfig = _.merge({
        }, config, settings), defer = when.defer();
        // Reconicle the arrays so they are properly arrays
        reconcileArrays(config, settings, localConfig);
        // Mediator is a required plugin, include all the others in addition to it.
                var plugins = localConfig.plugins, modulesToLoad = // The modules to load
        [], modulesConfigurations = // The module configuration object
        {
thrust: 'thrust'        };
        // Loop through all the plugins, creating a proper dependancy list.
        for(var i = 0, iLen = plugins.length; i < iLen; i++) {
            var plugin = plugins[i], name = plugin.substring(plugin.lastIndexOf('/') + 1), pluginConfig = localConfig[name];
            modulesToLoad.push(plugin);
            modulesToLoad.push(pluginConfig && pluginConfig.conventions || []);
            modulesConfigurations[plugin] = pluginConfig;
        }
        // Name and cfg are default properties of the configuration context
                var orderedPlugins = [
'name', 
'cfg'        ], reloop = // We loop through until all the plugins are in proper order.
        true, iLen = modulesToLoad.length, i = 0;
        // Loop through all the plugins until we have a set that will load in proper order.
        while(i < iLen) {
            // The plugin
                        var plugin = modulesToLoad[i], name = // The implied plugin name
            plugin.substring(plugin.lastIndexOf('/') + 1), pluginConfig = // The plugins configuration
            localConfig[name];
            // Check if the plugin has to resolve anything.
            if(pluginConfig && pluginConfig.resolve && pluginConfig.resolve.length > 0 && !all(pluginConfig.resolve, function (x) {
                return any(orderedPlugins, function (z) {
                    return x === z || x === z;
                });
            })) {
                // The modules to load.
                // Also includes any conventions.
                modulesToLoad.push.apply(modulesToLoad, modulesToLoad.splice(i, 2));
            } else {
                // reorder the plugin
                i += 2;
                orderedPlugins.push(name);
            }
        }
        // The modules config
        var modules = localConfig.modules || [];
        // Thrust and thrust/capsule also need to be loaded.
        modulesToLoad.push.apply(modulesToLoad, [
            'thrust'
        ]);
        // Flatten the resultant array
        modulesToLoad = flatten(modulesToLoad);
        // Create the configuration spec
        var spec = {
            name: localConfig.name || 'global',
            cfg: localConfig
        };
        // Load everything
        require(modulesToLoad, function () {
            // Get ready to loop
                        var currentPlugin = null, allConventions = [];
            // Loop through all the modules being loaded
            for(var i = 0, iLen = modulesToLoad.length; i < iLen; i++) {
                // Get plugin and configuration
                                var plugin = modulesToLoad[i], mConfig = modulesConfigurations[plugin];
                // Check if we have a configuration object
                if(mConfig) {
                    // Load a new plugin.
                                        var pluginObject = arguments[i], name = // Get the plugin name
                    plugin.substring(plugin.lastIndexOf('/') + 1), resolveItems = // Resolve all the required items.
                    map(mConfig.resolve, function (x) {
return spec[x];                    });
                    var pluginClass = pluginObject[pluginObject.className];
                    // Instantiate the plugin
                    currentPlugin = spec[name] = util.instantiate(pluginClass, resolveItems);
                    // Setup the conventions
                    currentPlugin.__conventions = [];
                } else {
                    // Load all the conventions
                    if(currentPlugin) {
                        // Load the conventions into the plugin
                        _.forOwn(arguments[i], function (x) {
                            return currentPlugin.__conventions.push(x);
                        });
                        // Load the conventions into the thrust instance.
                        _.forOwn(arguments[i], function (x) {
                            return allConventions.push(x);
                        });
                    }
                }
            }
            // The last current plugin, will always be thrust.
            currentPlugin.__conventions = allConventions;
            // Extend thrust with the spec
            extend(currentPlugin, spec);
            defer.resolve(spec);
        }, defer.reject);
        return defer.promise;
    }
    exports.stateTwo = stateTwo;
    /**
    Loads up the default modules as indicated to thrust.
    
    @method stageThree
    @param {Object} context The context to use to load the modules.
    **/
    function stageThree(context) {
        var thrust = context.thrust, defer = when.defer(), modules = context.cfg.modules;
        require(modules, function () {
            var args = [];
            for (var _i = 0; _i < (arguments.length - 0); _i++) {
                args[_i] = arguments[_i + 0];
            }
            var Module = tm.Module;
            // Get the definitions
            var moduleDefinitions = args;
            // Loop over all the modules
            for(var i = 0, iLen = modules.length; i < iLen; i++) {
                // Get the module name
                                var mod = modules[i], definition = // Get the definition
                moduleDefinitions[i];
                // Create the instance
                var moduleInstance = new Module(thrust, definition, mod);
                // Inject it into the thrust instance
                moduleInstance.thrustCreate(thrust);
            }
            defer.resolve();
        }, defer.reject);
        return defer.promise;
    }
    exports.stageThree = stageThree;
})
//@ sourceMappingURL=ignite.js.map
;
/**
 * @license RequireJS domReady 2.0.1 Copyright (c) 2010-2012, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/requirejs/domReady for details
 */
/*jslint */
/*global require: false, define: false, requirejs: false,
  window: false, clearInterval: false, document: false,
  self: false, setInterval: false */


define('domReady',[],function () {
    

    var isTop, testDiv, scrollIntervalId,
        isBrowser = typeof window !== "undefined" && window.document,
        isPageLoaded = !isBrowser,
        doc = isBrowser ? document : null,
        readyCalls = [];

    function runCallbacks(callbacks) {
        var i;
        for (i = 0; i < callbacks.length; i += 1) {
            callbacks[i](doc);
        }
    }

    function callReady() {
        var callbacks = readyCalls;

        if (isPageLoaded) {
            //Call the DOM ready callbacks
            if (callbacks.length) {
                readyCalls = [];
                runCallbacks(callbacks);
            }
        }
    }

    /**
     * Sets the page as loaded.
     */
    function pageLoaded() {
        if (!isPageLoaded) {
            isPageLoaded = true;
            if (scrollIntervalId) {
                clearInterval(scrollIntervalId);
            }

            callReady();
        }
    }

    if (isBrowser) {
        if (document.addEventListener) {
            //Standards. Hooray! Assumption here that if standards based,
            //it knows about DOMContentLoaded.
            document.addEventListener("DOMContentLoaded", pageLoaded, false);
            window.addEventListener("load", pageLoaded, false);
        } else if (window.attachEvent) {
            window.attachEvent("onload", pageLoaded);

            testDiv = document.createElement('div');
            try {
                isTop = window.frameElement === null;
            } catch (e) {}

            //DOMContentLoaded approximation that uses a doScroll, as found by
            //Diego Perini: http://javascript.nwbox.com/IEContentLoaded/,
            //but modified by other contributors, including jdalton
            if (testDiv.doScroll && isTop && window.external) {
                scrollIntervalId = setInterval(function () {
                    try {
                        testDiv.doScroll();
                        pageLoaded();
                    } catch (e) {}
                }, 30);
            }
        }

        //Check if document already complete, and if so, just trigger page load
        //listeners. Latest webkit browsers also use "interactive", and
        //will fire the onDOMContentLoaded before "interactive" but not after
        //entering "interactive" or "complete". More details:
        //http://dev.w3.org/html5/spec/the-end.html#the-end
        //http://stackoverflow.com/questions/3665561/document-readystate-of-interactive-vs-ondomcontentloaded
        //Hmm, this is more complicated on further use, see "firing too early"
        //bug: https://github.com/requirejs/domReady/issues/1
        //so removing the || document.readyState === "interactive" test.
        //There is still a window.onload binding that should get fired if
        //DOMContentLoaded is missed.
        if (document.readyState === "complete") {
            pageLoaded();
        }
    }

    /** START OF PUBLIC API **/

    /**
     * Registers a callback for DOM ready. If DOM is already ready, the
     * callback is called immediately.
     * @param {Function} callback
     */
    function domReady(callback) {
        if (isPageLoaded) {
            callback(doc);
        } else {
            readyCalls.push(callback);
        }
        return domReady;
    }

    domReady.version = '2.0.1';

    /**
     * Loader Plugin API method
     */
    domReady.load = function (name, req, onLoad, config) {
        if (config.isBuild) {
            onLoad(null);
        } else {
            domReady(onLoad);
        }
    };

    /** END OF PUBLIC API **/

    return domReady;
});

define('thrust/main',["require", "exports", 'thrust/util', './log', './instance', './ignite', './capsule', 'domReady', 'has', 'thrust/config'], function(require, exports, __util__, __log__, __thrustInstance__, __igniteSpec__, __m__, __domReady__, __has__, __tConfig__) {
    /// <reference path="interfaces/thrust.plugin.d.ts" />
    /// <reference path="interfaces/thrust.d.ts" />
    /// <reference path="../lib/DefinitelyTyped/requirejs/require-2.1.d.ts" />
    // Disabled until TS supports module per file in some way (ie exports is exports.<export> not  exports.moduleName.<export>)
    /*export module instance {*/
    
    
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
    /**
    The thrust application!
    
    @module thrust
    @main thrust
    **/
        var INIT = 'init', START = 'start', READY = 'ready', STOP = 'stop', DESTROY = 'destroy', COUNTDOWN = 'countdown', IGNITE = 'ignite', ORBIT = 'orbit', DEPLOY = 'deploy', DEORBIT = 'deorbit', SPLASHDOWN = 'splashdown', INORBIT = 'inOrbit', memoize = _.memoize, each = _.each, map = _.map, extend = _.extend, when = util.when, bind = _.bind, isArray = _.isArray, slice = Array.prototype.slice, toArray = _.toArray, merge = _.merge, flatten = _.flatten, format = util.format, resolveMethods = [
INIT, 
START, 
READY, 
STOP, 
DESTROY    ], instances = thrustInstance.instances, loadingInstances = thrustInstance.loadingInstances, safeInvoke = util.safeInvoke;
    //#region Runner Factories
    var runRunnerFactory = memoize(function (method) {
        var conventionMethod = (method === STOP && START) || (method === DESTROY && INIT) || method, conventionValue = !(method === STOP || method === DESTROY), unsetReady = method === STOP, conventionCheck = conventionMethod !== method, conventionName = format('{0}-status', conventionMethod), runner = runnerFactory(method, conventionName, conventionValue, unsetReady), logMessage = format('Thrust: {0}ing module "{{0}}" failed!', method), runningMessage = format('Thrust: Running {0} for module "{{0}}".', method);
        return function (names) {
            var that = this;
            if(!isArray(names)) {
                names = [
                    names
                ];
            }
            var args = slice.call(arguments, 1), results = [];
            each(names, function (name) {
                has('DEBUG') && log.debug(format(runningMessage, name));
                var mod = that.modules[name];
                if(!mod && !that.failedModules[name]) {
                    // try to fetch the module.
                    // returning the proper defer in it's place
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
                        if(tConfig.throwErrors) {
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
        var eventName = format('thrust/capsule/{0}', method), infoFormat = format('Thrust: {0}ing module "{{0}}"', method.charAt(0).toUpperCase() + method.substring(1)), debugFormat = format('Thrust: Calling module "{{0}}" {0}()', method), compAfter = method === STOP || method === DESTROY || false;
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
        var infoFormat = format('Thrust: {0}ing all modules... [{{0}}]', method.charAt(0).toUpperCase() + method.substring(1)), pluralName = format('thrust/capsule/all/{0}', method), checkAutoStart = method === INIT || method === START;
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
    //#endregion
    /**
    The primary thrust class.
    
    @class thrust.Thrust
    @constructor
    @param {String} name The name of this thrust instance
    @returns {Thrust}
    **/
    var Thrust = (function () {
        function Thrust(name) {
            this.__conventions = [];
            this.__conventionPluckPropertiesCache = null;
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
        /**
        Lists the module registrations.
        
        @property __moduleRegistrations
        @static
        @private
        **/
                Thrust.__moduleRegistrations = {
        };
        Thrust.prototype.create = /**
        Creates a new thrust module.
        
        @method create
        @param {String} name The unique module name.
        @param {Object} module The module defintion.
        @param {Boolean} preBuild Has this module been prebuilt, in other words has it been created, by wire.js and needs to be injected.
        @returns {Module} The new module instance.
        **/
        function (name, mod, preBuilt) {
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
            // Modules cannot have duplicate names, choose a new one.
            if(that.modules[mod.name]) {
                throw new Error(format('Duplicate module name "{0}".', name));
            }
            // m is the mediators internal module.
            that.modules[mod.name] = mod;
            has('DEBUG') && log.info(format('Thrust: Created module "{0}"', name));
            // Notify the mediator that a module has been created.
            that.mediator.fire('thrust/capsule/create', name);
            if(that && that.started && mod.convention('autoStart')) {
                that.start(mod.name);
            }
            return mod;
        }//#region Global Runners
        /**
        Begins the countdown to thrusts start.
        Loading can be deferred by returning a promise from any convention, or module method.
        
        @method countdown
        @async
        @param {Boolean} ignoreChild Ignores the child instance flag, allows children to be controlled.
        @returns {Promise} The promise of when the countdown is completed.
        **/
        ;
        Thrust.prototype.countdown = function (ignoreChild, calledByParent) {
            var that = this;
            if(!thrustShouldExecute(that, calledByParent)) {
                return;
            }
            has('DEBUG') && thrustLogEvent('Launch instance "{0}" in 5... 4... 3... 2... 1...', that.name);
            var stageOne = when.all(flattenWithAsync(that, [
                safeInvoke(that.__conventions, COUNTDOWN, that), 
                that.init(), 
                childrenCallMethod(that, COUNTDOWN)
            ])).then(fireThrustEvent(that, 'thrust/init'));
            has('DEBUG') && stageOne.then(thrustLogEvent('Thrust instance "{0}" has been initalized.', that.name));
            if(that.cfg.automaticLifecycle && (!that.cfg.childInstance || ignoreChild)) {
                stageOne.then(bind(that.ignite, that, ignoreChild, calledByParent));
            }
            return stageOne;
        }/**
        Begins the ingition as thrust starts up.
        Loading can be deferred by returning a promise from any convention, or module method.
        
        @method ignite
        @async
        @param {Boolean} ignoreChild Ignores the child instance flag, allows children to be controlled.
        @returns {Promise} The promise of when the ingition is completed.
        **/
        ;
        Thrust.prototype.ignite = function (ignoreChild, calledByParent) {
            var that = this;
            if(!thrustShouldExecute(that, calledByParent)) {
                return;
            }
            has('DEBUG') && thrustLogEvent('Firing rockets for thurst instance "{0}".', that.name);
            var stageOne = when.all(flattenWithAsync(that, [
                safeInvoke(that.__conventions, IGNITE, that), 
                that.start(), 
                childrenCallMethod(that, IGNITE)
            ])).then(fireThrustEvent(that, 'thrust/start'));
            has('DEBUG') && stageOne.then(thrustLogEvent('Thrust instance "{0}" has been started.', that.name));
            if(that.cfg.automaticLifecycle && (!that.cfg.childInstance || ignoreChild)) {
                stageOne.then(bind(that.orbit, that, ignoreChild, calledByParent));
            }
            return stageOne;
        }/**
        Thrust prepares for orbit.
        Loading can be deferred by returning a promise from any convention.
        
        @method orbit
        @async
        @param {Boolean} ignoreChild Ignores the child instance flag, allows children to be controlled.
        @returns {Promise} The promise of when thrust is in orbit.
        **/
        ;
        Thrust.prototype.orbit = function (ignoreChild, calledByParent) {
            var that = this;
            if(!thrustShouldExecute(that, calledByParent)) {
                return;
            }
            has('DEBUG') && thrustLogEvent('Firing stage two thrusters for thrust instance "{0}".', that.name)();
            var domReadyDefer = when.defer();
            domReadyDefer.promise.then(fireThrustEvent(that, 'thrust/dom/ready'));
            domReady(domReadyDefer.resolve);
            var stageOne = when.all(flattenWithAsync(that, [
                domReadyDefer.promise, 
                safeInvoke(that.__conventions, ORBIT, that), 
                childrenCallMethod(that, ORBIT)
            ]));
            has('DEBUG') && stageOne.then(thrustLogEvent('Thrust instance "{0}" is almost ready.', that.name));
            if(that.cfg.automaticLifecycle && (!that.cfg.childInstance || ignoreChild)) {
                stageOne.then(bind(that.deploy, that, ignoreChild, calledByParent));
            }
            return stageOne;
        }/**
        Thrust deploys components in orbit
        Loading can be deferred by returning a promise from any module method.
        
        @method deploy
        @async
        @param {Boolean} ignoreChild Ignores the child instance flag, allows children to be controlled.
        @returns {Promise} The promise of when thrust has fully deployed.
        **/
        ;
        Thrust.prototype.deploy = function (ignoreChild, calledByParent) {
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
            var stageOne = when.all(flattenWithAsync(that, [
                that.ready(), 
                childrenCallMethod(that, DEPLOY)
            ])).then(fireThrustEvent(that, 'thrust/ready'));
            has('DEBUG') && stageOne.then(thrustLogEvent('Thrust instance "{0}" is now ready.', that.name));
            if(that.cfg.automaticLifecycle && (!that.cfg.childInstance || ignoreChild)) {
                stageOne.then(bind(that.inOrbit, that));
            }
            return stageOne;
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
        }/**
        Begins the deorbit as thrust shutdown.
        Shutdown can be deferred by returning a promise from any convention, or module method.
        
        @method deorbit
        @async
        @param {Boolean} ignoreChild Ignores the child instance flag, allows children to be controlled.
        @returns {Promise} The promise of when the ingition is completed.
        **/
        ;
        Thrust.prototype.deorbit = function (ignoreChild, calledByParent) {
            var that = this;
            if(!thrustShouldExecute(that, calledByParent, true)) {
                return;
            }
            has('DEBUG') && thrustLogEvent('Reentering earths atmosphere for thrust instance "{0}".', that.name);
            var stageOne = when.all(flattenWithAsync(that, [
                childrenCallMethod(that, DEORBIT, true), 
                that.stop(), 
                safeInvoke(that.__conventions, DEORBIT, that)
            ])).then(fireThrustEvent(that, 'thrust/stop'));
            has('DEBUG') && stageOne.then(thrustLogEvent('Thrust instance "{0}" is now stopped.', that.name));
            if(that.cfg.automaticLifecycle && (!that.cfg.childInstance || ignoreChild)) {
                stageOne.then(bind(that.splashdown, that, ignoreChild, calledByParent));
            }
            return stageOne;
        }/**
        Begins the splashdown as thrust shutdown.
        Shutdown can be deferred by returning a promise from any convention, or module method.
        
        @method splashdown
        @async
        @param {Boolean} ignoreChild Ignores the child instance flag, allows children to be controlled.
        @returns {Promise} The promise of when the ingition is completed.
        **/
        ;
        Thrust.prototype.splashdown = function (ignoreChild, calledByParent) {
            var that = this;
            if(!thrustShouldExecute(that, calledByParent, true)) {
                return;
            }
            has('DEBUG') && thrustLogEvent('Landing in the middle of the atlantic for thrust instance "{0}".', that.name);
            var stageOne = when.all(flattenWithAsync(that, [
                childrenCallMethod(that, SPLASHDOWN, true), 
                that.destroy(), 
                safeInvoke(that.__conventions, SPLASHDOWN, that)
            ])).then(fireThrustEvent(that, 'thrust/destroy'));
            has('DEBUG') && stageOne.then(thrustLogEvent('Thrust instance "{0}" is now being destroyed', that.name));
            stageOne.then(function () {
                that.started = false;
            });
            return stageOne;
        }//#endregion
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
        ;
        Thrust.prototype.init = function (name) {
            var args = [];
            for (var _i = 0; _i < (arguments.length - 1); _i++) {
                args[_i] = arguments[_i + 1];
            }
            var that = this, method = INIT;
            var result = !name && allRunnerFactory(method)(that);
            if(result) {
                return result;
            }
            var args = toArray(arguments).slice(1);
            if(isArray(name)) {
                result = map(name, function (x) {
                    return that.init.apply(that, [
                        x
                    ].concat(args));
                });
            } else {
                result = runRunnerFactory(method).apply(that, arguments);
            }
            return when.all(flatten(result));
        }/**
        Begins the startup process for a module.  This runs as part of the
        ignite phase, during start up, or in order, when creating modules.
        Loading can be deferred by returning a promise from any convention, or module method.
        
        @method start
        @param {String|Array of String} [name] The name of the module.  If name is null, all modules
        that return the property autoStart will be started.
        @returns {Promise} The promise of when the init is completed.
        **/
        ;
        Thrust.prototype.start = function (name) {
            var args = [];
            for (var _i = 0; _i < (arguments.length - 1); _i++) {
                args[_i] = arguments[_i + 1];
            }
            var that = this, method = START;
            var result = !name && allRunnerFactory(method)(that);
            if(result) {
                return result;
            }
            var names = [];
            if(!isArray(name)) {
                names = [
                    name
                ];
            }
            var items = [], origionalArgs = arguments, args = toArray(arguments).slice(1);
            for(var i = 0, iLen = names.length; i < iLen; i++) {
                var n = names[i], mod = that.modules[n];
                if(!mod) {
                    items.push(that.init.call(that, [
                        n
                    ].concat(args)));
                } else {
                    if(!mod.convention(INIT + '-status')) {
                        items.push(that.init.call(that, [
                            n
                        ].concat(args)));
                    }
                }
            }
            var startDefer = when.defer();
            when.all(flatten(items)).then(function () {
                var results = [];
                var result = runRunnerFactory(method).apply(that, origionalArgs);
                results.push(result);
                var resultsDefer = when.all(flatten(results));
                if(that.started) {
                    var runReady = function () {
                        when.chain(that.ready.apply(that, origionalArgs), startDefer);
                    };
                    resultsDefer.then(runReady);
                } else {
                    when.chain(resultsDefer, startDefer);
                }
            });
            return startDefer.promise;
        }/**
        Begins the ready process for a module.  This runs as part of the
        orbit phase, during ready, or in order, when creating modules.
        Loading can be deferred by returning a promise from any convention, or module method.
        
        @method ready
        @param {String|Array of String} [name] The name of the module.  If name is null, all modules
        that return the property autoStart will be started.
        @returns {Promise} The promise of when the init is completed.
        **/
        ;
        Thrust.prototype.ready = function (name) {
            var args = [];
            for (var _i = 0; _i < (arguments.length - 1); _i++) {
                args[_i] = arguments[_i + 1];
            }
            var that = this, method = READY;
            var result = !name && allRunnerFactory(method)(that);
            if(result) {
                return result;
            }
            var names = [];
            if(!isArray(name)) {
                names = [
                    name
                ];
            }
            var items = [], args = toArray(arguments).slice(1);
            for(var i = 0, iLen = names.length; i < iLen; i++) {
                var n = names[i], mod = that.modules[n];
                if(!mod.convention(START + '-status') && !that.started) {
                    items.push(that.start.apply(that, [
                        n
                    ].concat(args)));
                }
            }
            items.push(runRunnerFactory(method).apply(that, arguments));
            return when.all(flatten(items));
        }/**
        Begins the stop process for a module.  This runs as part of the
        deorbit phase, during stop, or in order, when creating modules.
        Loading can be deferred by returning a promise from any convention, or module method.
        
        @method stop
        @param {String|Array of String} [name] The name of the module.  If name is null, all modules
        will be stopped.
        @returns {Promise} The promise of when the stop is completed.
        **/
        ;
        Thrust.prototype.stop = function (name) {
            var args = [];
            for (var _i = 0; _i < (arguments.length - 1); _i++) {
                args[_i] = arguments[_i + 1];
            }
            var that = this, method = STOP;
            var result = !name && allRunnerFactory(method)(that);
            if(result) {
                return result;
            }
            result = runRunnerFactory(method).apply(that, arguments);
            return when.all(flatten(result));
        }/**
        Begins the destroy process for a module.  This runs as part of the
        slashdown phase, during destroy, or in order, when creating modules.
        Loading can be deferred by returning a promise from any convention, or module method.
        
        @method destroy
        @param {String|Array of String} [name] The name of the module.  If name is null, all modules
        will be destroyed.
        @returns {Promise} The promise of when the destroy is completed.
        **/
        ;
        Thrust.prototype.destroy = function (name) {
            var args = [];
            for (var _i = 0; _i < (arguments.length - 1); _i++) {
                args[_i] = arguments[_i + 1];
            }
            var that = this, method = DESTROY;
            var result = !name && allRunnerFactory(method)(that);
            if(result) {
                return result;
            }
            var names = [];
            if(!isArray(name)) {
                names = [
                    name
                ];
            }
            var items = [], args = toArray(arguments).slice(1);
            for(var i = 0, iLen = names.length; i < iLen; i++) {
                var n = names[i], mod = that.modules[n];
                if(mod.convention(START + '-status')) {
                    items.push(that.stop.call(that, [
                        n
                    ].concat(args)));
                }
            }
            items.push(runRunnerFactory(method).apply(that, arguments));
            return when.all(flatten(items));
        }//#endregion
        /**
        Injects a preconstructed module into the thrust instance.
        
        @method __injectModule
        @private
        @param {Module} module The module to inject.
        **/
        ;
        Thrust.prototype.__injectModule = function (module) {
            this.create(module.name, module, true);
        }/**
        Creates a module from the given definition object, with the given name.
        
        @method createModule
        @param {String} name The module name
        @param {Object} moduleDefn The module definition
        **/
        ;
        Thrust.prototype.createModule = function (name, moduleDefn) {
            var that = this;
            if(that.modules[name]) {
                return that.modules[name];
            }
            var module = new Module(that, moduleDefn, name);
            that.__injectModule(module);
            return module;
        }/**
        Launches another child module for thrust.
        
        @method spawn
        @param {Object} settings
        @returns {Promise} The promise that resolves once the child instance has fully loaded.  Resolves with the context that contains the thrust instance and all plugins that were loaded.
        **/
        ;
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
        }/**
        Registers a specific module name, and arguments.  The arguments will be used when initantiating the module.
        
        @method registerModule
        @param {String} name The module name to assign the arguments with.
        @param {Object*} arguments, additional arguments that will be passed onto the moudle
        **/
        ;
        Thrust.prototype.registerModule = function (name) {
            var that = this;
            Thrust.registerModule.apply(Thrust, [
                that.name
            ].concat(toArray(arguments)));
        }/**
        Initalizes a new Thrust instance based on the given settings.
        
        @method launch
        @static
        @param {Object} settings The module to inject
        **/
        ;
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
            var setupDefer = Thrust.__fetchInstance(settings.name);
            setupDefer.promise.then(function (context) {
                var thrust = context.thrust, modules = thrust.startingModules = context.cfg.modules, config = thrust.config = thrust.cfg;
                instances[thrust.name] = thrust;
                if(config.modules && config.modules.length) {
                    var newModules = modules.map(function (x) {
                        if(typeof x === 'string') {
                            return x;
                        }
                    });
                    var stage3 = igniteSpec.stageThree(context);
                    if(config.automaticLifecycle) {
                        stage3.then(bind(thrust.countdown, thrust, null, calledByParent));
                    }
                } else {
                    if(config.automaticLifecycle) {
                        thrust.countdown(null, calledByParent);
                    }
                }
                return context;
            });
            // We're only going to expose globals if requested.  This is a potential usecase that may be needed for some teams.
            if(tConfig.exposeGlobals) {
                if(!window['Thrust']) {
                    window['Thrust'] = Thrust;
                }
                setupDefer.promise.then(function (context) {
                    window[settings.name] = context.thrust;
                });
            }
            when.chain(igniteSpec.stageOne(settings), setupDefer);
            return setupDefer.promise;
        }
        /**
        Gets a named thrust stance if it exists.
        
        @method getInstance
        @static
        @param {String} name The instance name
        @returns {Thrust} The thrust instance
        **/
                Thrust.getInstance = function getInstance(name) {
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
                Thrust.__fetchInstance = function __fetchInstance(name) {
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
                Thrust.createModule = function createModule(instanceName, name, moduleDefn) {
            var instance = Thrust.getInstance(instanceName);
            if(instance) {
                var module = new Module(instance, moduleDefn, name);
                instance.__injectModule(module);
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
;
define('thrust', ['thrust/main'], function (main) { return main; });

define('thrust/convention',["require", "exports", 'thrust/util'], function(require, exports, __util__) {
    /// <reference path="interfaces/convention.d.ts" />
    /// <reference path="../lib/DefinitelyTyped/requirejs/require-2.1.d.ts" />
    // Disabled until TS supports module per file in some way (ie exports is exports.<export> not  exports.moduleName.<export>)
    /*export module instance {*/
    var util = __util__;

    var _ = util._;
    /**
    A Convention allows thrust to be as extendable as possible, by giving extension points at every step along the way.
    
    @module thrust
    **/
    var methods = [
        'create', 
        'init', 
        'start', 
        'ready', 
        'stop', 
        'destroy', 
        'countdown', 
        'ignite', 
        'orbit', 
        'deorbit', 
        'splashdown'
    ];
    /**
    The convention class, takes an overloaded set of methods, for any method that needs to be overloaded.
    
    @class thrust.Convention
    @constructor
    @param {Object} methods An object of applicable methods.
    **/
    var Convention = (function () {
        function Convention(methodOverrides) {
            this.emptyPromise = null;
            _.extend(this, methodOverrides);
            var keys = _.difference(_.keys(methodOverrides), methods);
            _.each(keys, function (x) {
                if(_.isFunction(this[x])) {
                    this[x] = util.noop;
                }
            }, this);
        }
        Convention.prototype.create = /**
        This is called during create of a module, generally used to create a facade, that is then bound to the module.
        @method create
        @optional
        @param {Thrust} thrust The thrust instance.
        @param {Module} module The module instance.
        @param {Object} facades All the facades already attached to the module.
        **/
        function (thrust, mod, facades) {
        }/**
        This method is called during the thrust init phase, or an individual module's init phase
        
        @method init
        @optional
        @param {Object} facades The facades for the module.
        @returns {Promise} A promise may be returned, to delay the next phase from begining.
        **/
        ;
        Convention.prototype.init = function (facades, mod) {
            return this.emptyPromise;
        }/**
        This method is called during the thrust start phase, or an individual module's start phase
        
        @method start
        @optional
        @param {Object} facades The facades for the module.
        @returns {Promise} A promise may be returned, to delay the next phase from begining.
        **/
        ;
        Convention.prototype.start = function (facades, mod) {
            return this.emptyPromise;
        }/**
        This method is called during the thrust ready phase, or an individual module's ready phase
        
        @method ready
        @optional
        @param {Object} facades The facades for the module.
        @returns {Promise} A promise may be returned, to delay the next phase from begining.
        **/
        ;
        Convention.prototype.ready = function (facades, mod) {
            return this.emptyPromise;
        }/**
        This method is called during the thrust stop phase, or an individual module's stop phase
        
        @method stop
        @optional
        @param {Object} facades The facades for the module.
        @returns {Promise} A promise may be returned, to delay the next phase from begining.
        **/
        ;
        Convention.prototype.stop = function (facades, mod) {
            return this.emptyPromise;
        }/**
        This method is called during the thrust destroy phase, or an individual module's destroy phase
        
        @method destroy
        @optional
        @param {Object} facades The facades for the module.
        @returns {Promise} A promise may be returned, to delay the next phase from begining.
        **/
        ;
        Convention.prototype.destroy = function (facades, mod) {
            return this.emptyPromise;
        }/**
        This is called during the init phase of a Thrust instance.
        @method countdown
        @optional
        @param {Thrust} thrust The thrust instance.
        @returns {Promise} A promise may be returned, to delay the next phase from begining.
        **/
        ;
        Convention.prototype.countdown = function (thrust) {
            return this.emptyPromise;
        }/**
        This is called during the start phase of a Thrust instance.
        @method ignite
        @optional
        @param {Thrust} thrust The thrust instance.
        @returns {Promise} A promise may be returned, to delay the next phase from begining.
        **/
        ;
        Convention.prototype.ignite = function (thrust) {
            return this.emptyPromise;
        }/**
        This is called during the ready phase of a Thrust instance.
        @method orbit
        @optional
        @param {Thrust} thrust The thrust instance.
        @returns {Promise} A promise may be returned, to delay the next phase from begining.
        **/
        ;
        Convention.prototype.orbit = function (thrust) {
            return this.emptyPromise;
        }/**
        This is called during the stop phase of a Thrust instance.
        @method deorbit
        @optional
        @param {Thrust} thrust The thrust instance.
        @returns {Promise} A promise may be returned, to delay the next phase from begining.
        **/
        ;
        Convention.prototype.deorbit = function (thrust) {
            return this.emptyPromise;
        }/**
        This is called during the destroy phase of a Thrust instance.
        @method splashdown
        @optional
        @param {Thrust} thrust The thrust instance.
        @returns {Promise} A promise may be returned, to delay the next phase from begining.
        **/
        ;
        Convention.prototype.splashdown = function (thrust) {
            return this.emptyPromise;
        };
        return Convention;
    })();
    exports.Convention = Convention;    
})
//@ sourceMappingURL=convention.js.map
;
define('thrust/define',['thrust/util', 'thrust/capsule'],
function (util, Module)
{
    var regex = /[\[\]\'\"\s]/g,
        each = util.each;

    var thrustCache = Module.thrustCache;
    return {
        dynamic: true,
        // thrust/define!{instance}[{plugins}]
        load: function (resourceId, require, load, config)
        {
            var instanceName = resourceId.substring(0, resourceId.indexOf('[')),
                pluginString = resourceId.substring(instanceName.length).replace(regex, ''),
                plugins = pluginString.split(',');

            require(['thrust!' + instanceName], function (thrust)
            {
                var method = function (definition)
                {
                    // Maybe overlay params on the function itself.
                    return function (name)
                    {
                        var thrustModuleCacheItem = thrustCache[thrust.name + ':' + name] = { facades: {}, instance: {} },
                            args = [];

                        each(plugins, function (x)
                        {
                            var pluginName = x.substring(x.lastIndexOf('/') + 1 || 0),
                                plugin = thrust[pluginName];

                            var facade = plugin.createFacade(thrust, thrustModuleCacheItem.instance, thrustModuleCacheItem.facades);

                            args.push(facade);
                        });

                        return definition.apply(definition, args);
                    };
                };

                load(method);
            });
        }
    };
});
define('thrust/events',["require", "exports", './log', './config', 'has', 'thrust/util'], function(require, exports, __log__, __tConfig__, __has__, __util__) {
    /// <reference path="interfaces/mediator/mediator.d.ts" />
    /// <reference path="interfaces/thrust.d.ts" />
    /// <reference path="../lib/DefinitelyTyped/requirejs/require-2.1.d.ts" />
    // Disabled until TS supports module per file in some way (ie exports is exports.<export> not  exports.moduleName.<export>)
    /*export module instance {*/
    
    //     Backbone.js 0.9.1
    //     (c) 2010-2012 Jeremy Ashkenas, DocumentCloud Inc.
    //     Backbone may be freely distributed under the MIT license.
    //     For all details and documentation:
    //     http://backbonejs.org
    /**
    Thrust Events are based off of the Backbone event model, with special additions.
    
    * Events can be fired asyncronously.
    * Events can be namespaced.
    
    @module thrust
    **/
    var log = __log__;

    var tConfig = __tConfig__;

    var has = __has__;

    var util = __util__;

    var _ = util._;
    var EventNode = (function () {
        function EventNode() {
            this.tail = null;
            this.next = null;
            this.callback = null;
            this.context = null;
            this.namespace = '';
            this.once = false;
        }
        return EventNode;
    })();
    exports.EventNode = EventNode;    
    var createAsyncEvent = function (object) {
        var f = function f(events) {
            var args = [];
            for (var _i = 0; _i < (arguments.length - 1); _i++) {
                args[_i] = arguments[_i + 1];
            }
            _trigger.apply(object, [
                false
            ].concat(slice.call(arguments)));
            return object;
        };
        f.async = function (events) {
            var args = [];
            for (var _i = 0; _i < (arguments.length - 1); _i++) {
                args[_i] = arguments[_i + 1];
            }
            _trigger.apply(object, [
                true
            ].concat(slice.call(arguments)));
            return object;
        };
        return f;
    };
    var slice = Array.prototype.slice, asyncFire, noop = util.noop, when = util.when, size = _.size, each = _.each, defer = _.defer, bind = _.bind, extend = _.extend, format = util.format;
    var eventSplitter = /\s+/, ALL = 'all', STARALL = '*all';
    /**
    Normalizes the given events to the expected namespace.
    
    @method normalizeEvents
    @private
    @param {String} events The events delimited by a space
    @param {String} namespace The namespace, including prefixed '.'
    **/
    function normalizeEvents(events, namespace) {
        var eventsArray = events.split(eventSplitter);
        for(var i = 0, iLen = eventsArray.length; i < iLen; i++) {
            eventsArray[i] = eventsArray[i] + namespace;
        }
        return eventsArray.join(' ');
    }
    /**
    Trigger one or many events, firing all bound callbacks. Callbacks are
    passed the same arguments as `trigger` is, apart from the event name
    (unless you're listening on `"all"`, which will cause your callback to
    receive the true name of the event as the first argument).
    
    @method _trigger
    @private
    @param {Boolean} async Fire event async or sync
    @param {Object} events The events to be fired.
    delimited by a space.
    @param [args]* The arguments to pass onto the callback methods.
    @returns If async then returns a Promise, where the first argument contains all the returned values, as an array
    If sync then returns an array of the return values.
    If more than one event, returns an object of arrays or promises, with the key for each event.
    **/
    function _trigger(async, events) {
        /*jshint validthis:true */
                var that = this, event, node, calls, tail, args, all, rest, namespace, onceNodes;
        if(!(calls = this._callbacks)) {
            return that;
        }
        all = calls.all;
        var eventsArray = events.split(eventSplitter);
        rest = slice.call(arguments, 2);
        while(event = eventsArray.shift()) {
            if(node = calls[event]) {
                triggerNodes(that, event, async, node, rest);
            }
            if(node = all) {
                triggerNodes(that, ALL, async, node, [
                    event
                ].concat(rest));
            }
        }
    }
    /**
    Triggers all events on a node.
    Also unbinds any node that is set to only be called once.
    
    @method triggerNodes
    @private
    @param {Object} that The event container context.
    @param {String} event The event to be bound or unbound.
    @param {Boolean} async Fire event async or sync
    @param {Object} node The node linked list.
    @param {Array} args The arguments to pass onto the triggered nodes
    
    **/
    function triggerNodes(that, event, async, nodeList, args) {
        var tail, onceNodes = [];
        has('DEBUG') && log.info(format('{0}: triggering {1} event "{2}"', that.__pubSubName, async && 'async' || '', event));
        each(nodeList, function (node) {
            tail = node.tail;
            while((node = node.next) !== tail) {
                triggerCallback(async, node.callback, node.context || that, args);
                node.once && onceNodes.push(node);
            }
        });
        if(onceNodes.length) {
            each(onceNodes, function (x) {
                that.unsubscribe(event, x.callback, x.context, x.namespace);
            });
        }
    }
    /**
    Invokes a trigger callback
    
    @method triggerCallback
    @private
    @param {Boolean} async Fire event async or sync
    @param {Function} callback The callback method
    @param {Object} context The calling context
    @param {Array} args The arguments to call the callback with.
    @returns {Object} The returned value.
    For async calls, this is a promise
    For sync calls this is the value from the method.
    **/
    function triggerCallback(async, callback, context, args) {
        if(async) {
            defer(triggerAsyncCallback(callback, context, args), 0);
        } else {
            try  {
                return callback.apply(context, args);
            } catch (e) {
                if(tConfig.throwErrors) {
                    throw e;
                }
            }
        }
    }
    /**
    Creates an async event handler
    
    @method asyncEventFactory
    @private
    @param {Function} callback The callback method
    @param {Object} that The calling context
    @param {Array} args The arguments to call the callback with.
    @returns {Function} The callback for the given arguments.
    **/
    function triggerAsyncCallback(callback, context, args) {
        return function () {
            return callback.apply(context, args);
        }
    }
    /**
    Resubscribes to the appropriate events
    
    @method _offProcessNode
    @private
    @param {Object} that The event context
    @param {String} event The event
    @param {Object} node The node linked list.
    @param {Function} [callback] The event callback to unsubscribe
    @param {Object} [context] The event context to unsubscribe
    @param {String} [namespace] The namespace to unsubscribe
    **/
    function _offProcessNode(that, event, node, callback, context) {
        var tail, cb, ctx, ns;
        tail = node.tail;
        while((node = node.next) !== tail) {
            cb = node.callback;
            ctx = node.context;
            ns = node.namespace;
            if((callback && cb !== callback) || (context && ctx !== context)) {
                that.subscribe(event + (ns && ('.' + ns) || ''), cb, ctx);
            }
        }
    }
    /**
    Gets the namespace information, the real event to pass back onto the methods.
    
    @method getNamespaceData
    @private
    @param {String} event The event to capture namespace data from.
    @returns {Object} Containing event and namespace.
    **/
    function getNamespaceData(event) {
        var nsIndex = (event || '').indexOf('.'), hasNs = nsIndex > -1, namespace = hasNs ? event.substring(nsIndex + 1) : undefined, event = hasNs ? event.substring(0, nsIndex) : event;
        if(nsIndex === 0) {
            event = STARALL;
        }
        return {
            event: event,
            namespace: namespace
        };
    }
    /**
    Thrust Events are based off of the Backbone event model, with special additions.
    
    * Events can be fired asyncronously.
    * Events can be namespaced.
    
    @class thrust.Events
    **/
    exports.Events = (function () {
        var events = {
            subscribe: /**
            Bind one or more space separated events, `events`, to a `callback`
            function. Passing `"all"` will bind the callback to all events fired.
            
            @method subscribe
            @param {String} events Spave seperated events
            @param {Function} callback The callback method to be called when the events are fired.
            @param {Object} context The context to bind the calling function to.
            @param {Boolean} once Call this event only once.
            @chainable
            **/
            function (events, callback, context, once) {
                var calls, event, node, tail, list, nd;
                this.__namespace && (events = normalizeEvents(events, this.__namespace));
                var eventsArray = events.split(eventSplitter);
                calls = this._callbacks || (this._callbacks = {
                });
                // Create an immutable callback list, allowing traversal during
                // modification.  The tail is an empty object that will always be used
                // as the next node.
                while(event = eventsArray.shift()) {
                    nd = getNamespaceData(event);
                    event = nd.event;
                    list = calls[event] || (calls[event] = {
                    });
                    list = list[nd.namespace];
                    node = list ? list.tail : new EventNode();
                    node.next = tail = new EventNode();
                    node.context = context;
                    node.callback = callback;
                    if(nd.namespace) {
                        node.namespace = nd.namespace;
                    }
                    if(once) {
                        node.once = once;
                    }
                    calls[event][nd.namespace] = {
                        tail: tail,
                        next: list ? list.next : node
                    };
                }
                return this;
            },
            once: /**
            Bind one or more space separated events, `events`, to a `callback`
            function. Passing `"all"` will bind the callback to all events fired.
            
            Each event will only be called once.
            
            @method once
            @param {String} events Spave seperated events
            @param {Function} callback The callback method to be called when the events are fired.
            @param {Object} context The context to bind the calling function to.
            @chainable
            **/
            function (events, callback, context) {
                return this.subscribe(events, callback, context, true);
            },
            unsubscribe: /**
            Remove one or many callbacks. If `context` is null, removes all callbacks
            with that function. If `callback` is null, removes all callbacks for the
            event. If `event` is null, removes all bound callbacks for all events.
            
            @method unsubscribe
            @param {String} events Spave seperated events
            @param {Function} callback The callback method to be called when the events are fired.
            @param {Object} context The context to bind the calling function to.
            @chainable
            **/
            function (events, callback, context) {
                var event, calls, node, nd, ourNs, namespace, that = this, hasNs;
                ourNs = that.__namespace;
                ourNs && (ourNs = ourNs.substring(1));
                // No events, or removing *all* events.
                if(!(calls = that._callbacks)) {
                    return;
                }
                if(!(events || callback || context)) {
                    if(!ourNs) {
                        delete that._callbacks;
                    } else {
                        var cbs = that._callbacks;
                        for(var i in cbs) {
                            delete cbs[i][ourNs];
                            if(size(cbs[i]) === 0) {
                                delete cbs[i];
                            }
                        }
                    }
                    return that;
                }
                // Loop through the listed events and contexts, splicing them out of the
                // linked list of callbacks if appropriate.
                ourNs && (events = normalizeEvents(events, that.__namespace));
                var eventsArray = events ? events.split(eventSplitter) : _.keys(calls);
                while(event = eventsArray.shift()) {
                    nd = getNamespaceData(event);
                    event = nd.event;
                    namespace = nd.namespace;
                    hasNs = !!namespace;
                    if(!ourNs) {
                        node = calls[event];
                        delete calls[event];
                    } else {
                        if(calls[event]) {
                            node = calls[event][ourNs];
                            delete calls[event][ourNs];
                            if(size(calls[event]) === 0) {
                                delete calls[event];
                            }
                        }
                    }
                    if(!node || !(callback || context)) {
                        continue;
                    }
                    /*if (event !== STARALL)
                    {
                    node = calls[event];
                    delete calls[event];
                    if (!node) continue;
                    }*/
                    if(event !== STARALL && !callback) {
                        _offProcessNode(that, event, node, callback, context);
                    } else {
                        if(event === ALL || !callback) {
                            for(var i in calls) {
                                if(hasNs) {
                                    delete calls[i];
                                } else {
                                    node = calls[i];
                                    delete calls[i];
                                    _offProcessNode(that, i, node, callback, context);
                                }
                            }
                        } else {
                            _offProcessNode(that, event, node, callback, context);
                        }
                    }
                }
                return that;
            },
            __pubSubName: /**
            Trigger one or many events, firing all bound callbacks. Callbacks are
            passed the same arguments as `trigger` is, apart from the event name
            (unless you're listening on `"all"`, which will cause your callback to
            receive the true name of the event as the first argument).
            
            @method fire
            @param {Object} events The events to be fired.
            delimited by a space.
            @param [args]* The arguments to pass onto the callback methods.
            @returns {Array of Values} If more than on event is fired, an Object of Arrays is returned.
            **/
            'Events',
            initEvents: /**
            Init's the Event module.
            This is only required if you wish to use fire.async, and namespacing.
            
            @method initEvents
            @chainable
            **/
            function () {
                this.fire = this.publish = createAsyncEvent(this);
                this.initEvents = noop;
                this.__pubSubName = this.name || 'Events';
                if(this.name && !this.__namespace) {
                    this.__namespace = '.' + this.name;
                }
                return this;
            },
            extend: /**
            Extends Events into the given object.
            
            @method extend
            @param {Object} to The object ot extend events onto
            @param {Boolean} [init] Optionally init the events.
            **/
            function (to, init) {
                _.extend(to, exports.Events);
                delete to.extend;
                init && to.initEvents();
                return to;
            }
        };
        events.fire = events.publish = createAsyncEvent({
        });
        return events;
    })();
})
//@ sourceMappingURL=events.js.map
;
define('thrust/facade',["require", "exports", 'thrust/util', './capsule'], function(require, exports, __util__, __tm__) {
    /// <reference path="interfaces/facade.d.ts" />
    /// <reference path="../lib/DefinitelyTyped/requirejs/require-2.1.d.ts" />
    // Disabled until TS supports module per file in some way (ie exports is exports.<export> not  exports.moduleName.<export>)
    /*export module instance {*/
    
    var util = __util__;

    var _ = util._;
    var tm = __tm__;

    var Module = tm.Module;
    /**
    
    The Facade module offers the ability to create an interface or similar concept.
    With the Facade in thrust, it allows you to capture events from a module, when loaded via convention.
    Facades are mainly for use in thrust plugins.
    
    @module thrust
    **/
    /**
    Facades are mainly for use in thrust plugins.
    
    Facade has these built in methods:
    * init
    * start
    * ready
    * stop
    * destroy
    
    Behind the scenes the facade methods, invoke any conventions loaded for the plugin.
    
    @class thrust.Facade
    **/
    var thrustCache = Module.thrustCache;
    var facadeMethods = [
'init', 
'start', 
'ready', 
'stop', 
'destroy'    ], defaultPrototype = {
    };
    function conventionFunctionFactory(name) {
        return function (m) {
            var that = this;
            var returnValues = [];
            if(m && !((m).convention)) {
                m = thrustCache[m.mid].module;
            }
            if(that.__conventions) {
                return util.safeInvoke(that.__conventions, name, that, m);
            }
        }
    }
    function methodWrap(method) {
        return function (f) {
            var args = Array.prototype.slice.call(arguments, 1);
            f.apply(this, args);
            return method.apply(this, args);
        }
    }
    for(var i = 0, iLen = facadeMethods.length; i < iLen; i++) {
        var method = facadeMethods[i];
        defaultPrototype[method] = conventionFunctionFactory(method);
    }
    /**
    Facade init
    
    Called during the init phase of a module startup.
    
    @method init
    @returns Promise any facade method may optionally return a promise to delay the start of the next phase.
    **/
    /**
    Facade start
    
    Called during the start phase of a module startup.
    
    @method start
    @returns Promise any facade method may optionally return a promise to delay the start of the next phase.
    **/
    /**
    Facade ready
    
    Called during the ready phase of a module startup.
    
    @method ready
    @returns Promise any facade method may optionally return a promise to delay the start of the next phase.
    **/
    /**
    Facade stop
    
    Called during the init phase of a module startup.
    
    @method stop
    @returns Promise any facade method may optionally return a promise to delay the start of the next phase.
    **/
    /**
    Facade destroy
    
    Called during the destroy phase of a module startup.
    
    @method destroy
    @returns Promise any facade method may optionally return a promise to delay the start of the next phase.
    **/
    /**
    AMD API
    load
    
    Handles fetching of a module instance
    
    Format:
    thrust/capsule!{instance}:{pluginName}:{hashKey}
    
    hasKey: is a unique key, that the module shares with the facade, allows for defining dependencies
    in your define block, and get access to the modules facade.
    
    @method load
    @static
    @obsolete
    @param {String} name The name of the instance that is being fetched
    @param {Function} parentRequire the require method to be loaded
    @param {Function} load Allows the load to inform that AMD for the value to hand off
    @param {Object} config The custom configuration.
    **/
    function load(name, parentRequire, load, config) {
        var parts = name.split(':'), instanceName = parts[0], plugin = parts[1], pluginName = plugin.substring(plugin.lastIndexOf('/') + 1 || 0), hashKey = parts[2];
        if(!instanceName) {
            throw new Error('instanceName is required!');
        }
        if(!pluginName) {
            throw new Error('pluginName is required!');
        }
        if(!hashKey) {
            throw new Error('hashKey is required!');
        }
        require([
            'thrust!' + instanceName
        ], function (thrust) {
            var thrustPlugin = thrust[pluginName];
            if(!thrustPlugin) {
                require([
                    plugin
                ], function (p) {
                    load(p);
                });
                return;
            }
            var thrustModuleCacheItem = thrustCache[hashKey] || (thrustCache[hashKey] = {
                facades: {
                },
                instance: {
                }
            });
            var facade = thrustPlugin.createFacade(thrust, thrustModuleCacheItem.instance, thrustModuleCacheItem.facades);
            load(facade);
        });
    }
    exports.load = load;
    function createFacade(initMethod) {
        var f = (function () {
            var Facade = function (mod) {
                initMethod.apply(this, arguments);
                for(var i = 0, iLen = facadeMethods.length; i < iLen; i++) {
                    var method = facadeMethods[i];
                    if(this[method] !== defaultPrototype[method]) {
                        this[method] = _.wrap(this[method], methodWrap(defaultPrototype[method]));
                    }
                }
                this.mod = mod;
                //this.init(mod);
                            };
            Facade.prototype = _.extend({
                updateFacade: function (mod, facade) {
                    initMethod.apply(this, arguments);
                }
            }, defaultPrototype);
            return Facade;
        })();
        return f;
    }
    exports.createFacade = createFacade;
})
//@ sourceMappingURL=facade.js.map
;
define('thrust/mediator/config',["require", "exports"], function(require, exports) {
    /// <reference path="../../lib/DefinitelyTyped/requirejs/require-2.1.d.ts" />
    // Disabled until TS supports module per file in some way (ie exports is exports.<export> not  exports.moduleName.<export>)
    /*export module instance {*/
    
    /**
    Provides thrust configuration
    
    @module thrust.mediator
    @submodule thrust.mediator.config
    **/
    /**
    Resolves the given properties when creating an instance of the plugin.
    
    This is for internal thrust use.  Thrust uses this array to generate the properties that need to be handed
    to the plugin constructor method.
    
    @for thrust.mediator.config
    @private
    @property resolve
    @readOnly
    @type {Array}
    **/
    exports.resolve = [
        'name', 
        'cfg'
    ];
    /**
    The set of conventions to load into thrust/mediator.
    
    @property conventions
    @readOnly
    @type {Array}
    **/
    exports.conventions = [
        'thrust/mediator/convention/container', 
        'thrust/mediator/convention/subscription', 
        'thrust/mediator/convention/autostart', 
        'thrust/mediator/convention/dependent.modules'
    ];
})
//@ sourceMappingURL=config.js.map
;
define('thrust/mediator/main',["require", "exports", 'thrust/util', 'thrust/log', 'thrust/events', 'thrust/facade', 'has', 'thrust/config', './config'], function(require, exports, __util__, __log__, __events__, __facade__, __has__, __config__, __mediatorConfig__) {
    /// <reference path="../../has.d.ts" />
    /// <reference path="../interfaces/mediator/mediator.facade.d.ts" />
    /// <reference path="../../lib/DefinitelyTyped/requirejs/require-2.1.d.ts" />
    // Disabled until TS supports module per file in some way (ie exports is exports.<export> not  exports.moduleName.<export>)
    /*export module instance {*/
    
    var util = __util__;

    var _ = util._;
    var log = __log__;

    //import events = module('thrust/events');
    var events = __events__;

    var Events = events.Events;
    var facade = __facade__;

    var has = __has__;

    var config = __config__;

    var mediatorConfig = __mediatorConfig__;

    exports.className = 'Mediator';
    // Variable declaration.
        var format = util.format, extend = // string format method
    _.extend, type = // object extension method
    util.type, when = // object type method
    util.when, memoize = _.memoize, mediator, slice = Array.prototype.slice;
    var c = config;
    //#region Facade
    /**
    Creates a new mediator facade for the given module.
    
    @for thrust.mediator
    @class thrust.mediator.MediatorFacade
    @constructor
    @param {thrust.Module} module The module to create the facade for
    @param {thrust.Mediator} parent The parent mediator to create the facade on.
    **/
    var MediatorFacade = (function () {
        var mediatorFacade = facade.createFacade(function (module, parent) {
            this.name = module.name;
            this.module = module;
            this.parent = parent;
            this.__conventions = parent.__conventions;
            this._callbacks = parent._callbacks;
            this.initEvents();
        });
        _.extend(mediatorFacade.prototype, Events);
        /**
        During the start of a mediator facade, start creates the internal subscriptions array.
        
        @for thrust.mediator.MediatorFacade
        @method start
        **/
        mediatorFacade.prototype.init = function (m) {
            if(!this._internalSubscriptions) {
                this._internalSubscriptions = [];
            }
            return null;
        };
        mediatorFacade.prototype.start = mediatorFacade.prototype.init;
        /**
        Overrides the subscribe method, and tracks the any event that is bound.
        
        @for thrust.mediator.MediatorFacade
        @method subscribe
        **/
        (mediatorFacade).prototype.subscribe = function (events, callback, context) {
            this._internalSubscriptions.push({
                events: events,
                callback: callback,
                context: context
            });
            Events.subscribe.call(this, events, callback, context);
        };
        /**
        Unsubscribes from all events that were subscribed to.
        
        @for thrust.mediator.MediatorFacade
        @method stop
        **/
        mediatorFacade.prototype.stop = function (m) {
            if(this._internalSubscriptions) {
                for(var i = this._internalSubscriptions.length - 1; i >= 0; i--) {
                    var sub = this._internalSubscriptions[i];
                    this.unsubscribe(sub.events, sub.callback, sub.context);
                }
                delete this._internalSubscriptions;
            }
            return null;
        };
        return mediatorFacade;
    })();
    //#endregion
    // Our default namespace prefix.
    /**
    Mediator class.
    This creates a instance of the mediator, for use inside thrust.
    
    @for thrust.mediator
    @class thrust.mediator.Mediator
    @constructor
    @param {String} name The name of the mediator.
    **/
    var Mediator = (function () {
        //#endregion
        function Mediator(name, config) {
            var that = this, appPath = config && config.url && config.url.path;
            that.name = name;
            has('DEBUG') && log.debug(format('Mediator: Creating new Mediator {0}', name));
            that.initEvents();
            that.subscribe('thrust/ready', function () {
                has('DEBUG') && log.info('Mediator: Ready!');
            });
        }
        Mediator.prototype.initEvents = //#region Events
        function () {
        };
        Mediator.prototype.extend = function (to, init) {
            return null;
        };
        Mediator.prototype.subscribe = function (events, callback, context, once) {
        };
        Mediator.prototype.unsubscribe = function (events, callback, context) {
        };
        Mediator.prototype.once = function (events, callback, context) {
        };
        Mediator.prototype.createFacade = function (thrust, mod, facades) {
            if((mod).mediator && !(facades.mediator instanceof MediatorFacade)) {
                throw new Error('"mediator" is a reserved property');
            }
            var mediator;
            if(facades.mediator) {
                facades.mediator.updateFacade(mod, this);
                mediator = facades.mediator;
            } else {
                mediator = facades.mediator = (mod).mediator = new MediatorFacade(mod, this);
            }
            return mediator;
        };
        Mediator.config = mediatorConfig;
        return Mediator;
    })();
    exports.Mediator = Mediator;    
    // Get the actual event methods onto the Mediator
    _.extend(Mediator.prototype, Events);
})
//@ sourceMappingURL=main.js.map
;
define('thrust/mediator', ['thrust/mediator/main'], function (main) { return main; });

define('thrust/mediator/convention/autostart',["require", "exports", 'thrust/convention'], function(require, exports, __c__) {
    /// <reference path="../../interfaces/convention.d.ts" />
    /// <reference path="../../../lib/DefinitelyTyped/requirejs/require-2.1.d.ts" />
    // Disabled until TS supports module per file in some way (ie exports is exports.<export> not  exports.moduleName.<export>)
    /*export module instance {*/
    
    var c = __c__;

    var Convention = c.Convention;
    /**
    @module thrust.mediator
    @submodule thrust.mediator.convention
    **/
    /**
    * # __thrust/mediator__ Convention - Auto Start
    *
    * The auto start property allows for a module, to be automatically started once it is
    * included into a thrust instnace, without having to explicity call start on the module.
    *
    *
    * This is useful for certian types of modules, usually persistant ones that always need to load regardless.
    * For example a navigation module, or user settings module.
    *
    * @for thrust.mediator.convention
    * @property autoStart
    **/
    var methods = {
        properties: [
            'autoStart'
        ]
    };
    exports.autostart = new Convention(methods);
})
//@ sourceMappingURL=autostart.js.map
;
define('thrust/mediator/convention/container',["require", "exports", 'thrust/convention', 'thrust/util'], function(require, exports, __c__, __util__) {
    /// <reference path="../../interfaces/mediator/mediator.facade.d.ts" />
    /// <reference path="../../interfaces/facade.d.ts" />
    /// <reference path="../../interfaces/convention.d.ts" />
    /// <reference path="../../../lib/DefinitelyTyped/requirejs/require-2.1.d.ts" />
    // Disabled until TS supports module per file in some way (ie exports is exports.<export> not  exports.moduleName.<export>)
    /*export module instance {*/
    
    var c = __c__;

    var Convention = c.Convention;
    var util = __util__;

    var _ = util._;
    /**
    @module thrust.mediator
    @submodule thrust.mediator.convention
    **/
        var event = {
anyContainer: 'thrust/mediator/convention/container/any',
changeContainer: 'thrust/mediator/convention/container/change'    }, any = _.any, bind = _.bind, CONTAINER = 'container', START = 'start-status', defer = _.defer;
    var methods = {
        properties: [
            CONTAINER
        ],
        change: function (mod, container) {
            var containerValue = mod.convention(CONTAINER);
            if(containerValue && container && containerValue === container) {
                if(mod.convention(START)) {
                    defer(bind(mod.stop, mod));
                }
            }
        },
        start: function (facade, mod) {
            var that = this, containerValue = mod.convention(CONTAINER);
            if(containerValue) {
                facade.fire(event.changeContainer, containerValue);
                // Facade subscriptions get unsubscribed when stopping a module, so we need to resubscribe every time here.
                // This is probably better, as the events will be less chatty.
                facade.subscribe(event.changeContainer, bind(that.change, that, mod));
            }
            return undefined;
        },
        stop: function (facade, mod) {
            return undefined;
        }
    };
    exports.container = new Convention(methods);
})
//@ sourceMappingURL=container.js.map
;
define('thrust/mediator/convention/dependent.modules',["require", "exports", 'thrust/convention', 'thrust/util'], function(require, exports, __c__, __util__) {
    /// <reference path="../../interfaces/mediator/mediator.facade.d.ts" />
    /// <reference path="../../interfaces/convention.d.ts" />
    /// <reference path="../../../lib/DefinitelyTyped/requirejs/require-2.1.d.ts" />
    // Disabled until TS supports module per file in some way (ie exports is exports.<export> not  exports.moduleName.<export>)
    /*export module instance {*/
    
    var c = __c__;

    var Convention = c.Convention;
    var util = __util__;

    var _ = util._;
    /**
    @module thrust.mediator
    @submodule thrust.mediator.convention
    **/
        var any = _.any, map = _.map, DMODULES = 'dependentModules', CMODULES = 'childModules', START = 'start-status', defer = _.defer, bind = _.bind;
    var invokedependentModules = function (module, method) {
        var requiredModules = module.convention(DMODULES);
        if(requiredModules) {
            return module.thrust[method](requiredModules);
        }
    };
    var invokeChildModules = function (module, method) {
        var requiredModules = module.convention(CMODULES);
        if(requiredModules) {
            return module.thrust[method](requiredModules);
        }
    };
    var methods = {
        properties: [
            DMODULES, 
            CMODULES
        ],
        start: function (facade, mod) {
            return util.when.all(util.flattenToPromises([
                invokedependentModules(mod, 'start'), 
                invokeChildModules(mod, 'start')
            ]));
        },
        ready: function (facade, mod) {
            if(!mod.thrust.started) {
                return util.when.all(util.flattenToPromises([
                    invokedependentModules(mod, 'ready'), 
                    invokeChildModules(mod, 'ready')
                ]));
            }
        },
        stop: function (facade, mod) {
            return invokeChildModules(mod, 'stop');
        },
        destroy: function (facade, mod) {
            return invokeChildModules(mod, 'destroy');
        }
    };
    exports.dependentModules = new Convention(methods);
})
//@ sourceMappingURL=dependent.modules.js.map
;
define('thrust/mediator/convention/subscription',["require", "exports", 'thrust/convention', 'thrust/util'], function(require, exports, __c__, __util__) {
    /// <reference path="../../interfaces/mediator/mediator.facade.d.ts" />
    /// <reference path="../../interfaces/convention.d.ts" />
    /// <reference path="../../../lib/DefinitelyTyped/requirejs/require-2.1.d.ts" />
    // Disabled until TS supports module per file in some way (ie exports is exports.<export> not  exports.moduleName.<export>)
    /*export module instance {*/
    
    var c = __c__;

    var Convention = c.Convention;
    var util = __util__;

    var _ = util._;
    /**
    The facade convention, creates the mediator facade for each module.
    
    @module thrust.mediator
    @submodule thrust.mediator.convention
    **/
        var SUBSCRIPTIONS = 'subscriptions', isFunction = _.isFunction, isString = _.isString, isArray = _.isArray;
    var methods = {
        properties: [
            SUBSCRIPTIONS
        ],
        start: function (facade, mod) {
            var subscriptions = mod.convention(SUBSCRIPTIONS);
            if(subscriptions && !subscriptions._subscriptionsSet) {
                var moduleInstance = mod.instance;
                for(var subscription in subscriptions) {
                    var definition = subscriptions[subscription];
                    if(isFunction(definition)) {
                        definition = [
                            subscription, 
                            definition, 
                            moduleInstance
                        ];
                    } else {
                        if(isString(definition)) {
                            definition = [
                                subscription, 
                                moduleInstance[definition], 
                                moduleInstance
                            ];
                        } else {
                            if(isArray(definition)) {
                                if(isString(definition[0])) {
                                    definition[0] = moduleInstance[definition[0]];
                                }
                                definition.unshift(subscription);
                            }
                        }
                    }
                    facade.subscribe.apply(facade, definition);
                }
                mod.convention(SUBSCRIPTIONS)._subscriptionsSet = true;
            }
            return null;
        },
        stop: function (facade, mod) {
            var subscriptions = mod.convention(SUBSCRIPTIONS);
            if(subscriptions && subscriptions._subscriptionsSet) {
                mod.convention(SUBSCRIPTIONS)._subscriptionsSet = false;
            }
            return null;
        }
    };
    exports.subscription = new Convention(methods);
})
//@ sourceMappingURL=subscription.js.map
;