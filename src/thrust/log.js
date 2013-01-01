define(["require", "exports", './config', 'thrust/util'], function(require, exports, __tConfig__, __util__) {
    /// <reference path="../../lib/DefinitelyTyped/requirejs/require-2.1.d.ts" />
    // Disabled until TS supports module per file in some way (ie exports is exports.<export> not  exports.moduleName.<export>)
    /*export module instance {*/
    var tConfig = __tConfig__;

    var util = __util__;

    /**
    A basic logger for the thrust framework.
    Disables debug logging when thrust is not in debug mode.
    
    @module thrust
    
    **/
    'use strict';
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
