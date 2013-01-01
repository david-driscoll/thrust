/// <reference path="../../lib/DefinitelyTyped/requirejs/require-2.1.d.ts" />

// Disabled until TS supports module per file in some way (ie exports is exports.<export> not  exports.moduleName.<export>)
/*export module instance {*/

    import tConfig = module('./config');
    import util = module('thrust/util');
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
    var console     = window.console,
        timers      = {},
        cLog         = (console && console.log) || false,
        cWarn        = (console && console.warn) || false,
        cInfo        = (console && console.info) || false,
        cError       = (console && console.error) || false,
        cTime        = (console && console['time']) || false,
        cTimeEnd     = (console && console['timeEnd']) || false,
        slice       = Array.prototype.slice,
        configLevel : any = tConfig.log.level || LEVEL.ERROR,
        logLevel    = LEVEL[configLevel] || (typeof configLevel === 'string' && LEVEL[configLevel.toUpperCase()]) || (typeof configLevel  === 'number' && configLevel) || LEVEL.ERROR;

    // Various loggers to handle IE8/9 support.
    var logRunner = function (consoleMethod, logType)
    {
        // Show logs when enabled or if they are errors
        var args = slice.call(arguments, 1);
        if (consoleMethod)
        {
            if (consoleMethod.apply)
                consoleMethod.apply(console, args);
            else
                consoleMethod(args);
        }
        else if (!consoleMethod && cLog)
        {
            if (cLog.apply)
                cLog.apply(console, args);
            else
                cLog(args);
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
    export function debug(...args : any[]): void
    {
        // Short circuit if logging is disabled.  This is as close to noop as we can get, incase there is a direct reference to this method.
        if (!tConfig.log.enabled) return;
        if (logLevel >= LEVEL.DEBUG)
        {
            var args = slice.call(arguments);
            args.unshift(cLog);

            logRunner.apply(this, args, 'log');
        }
    }

    /**
    Logs a info type message using the console info method if available, otherwise it uses the console log method.

    @method info
    **/
    export function info(...args : any[]): void
    {
        // Short circuit if logging is disabled.  This is as close to noop as we can get, incase there is a direct reference to this method.
        if (!tConfig.log.enabled) return;
        if (logLevel >= LEVEL.INFO)
        {
            var args = slice.call(arguments);
            args.unshift(cInfo);

            logRunner.apply(this, args, 'info');
        }
    }

    /**
    Logs a warn type message using the console warn method if available, otherwise it uses the console log method.

    @method warn
    **/
    export function warn(...args: any[]): void
    {
        // Short circuit if logging is disabled.  This is as close to noop as we can get, incase there is a direct reference to this method.
        if (!tConfig.log.enabled) return;
        if (logLevel >= LEVEL.WARN)
        {
            var args = slice.call(arguments);
            args.unshift(cWarn);

            logRunner.apply(this, args, 'warn');
        }
    }

    /**
    Logs a error type message using the console error method if available, otherwise it uses the console log method.

    @method error
    **/
    export function error(...args : any[]): void
    {
        // Short circuit if logging is disabled.  This is as close to noop as we can get, incase there is a direct reference to this method.
        if (!tConfig.log.enabled) return;
        if (logLevel >= LEVEL.ERROR)
        {
            var args = slice.call(arguments);
            args.unshift(cError);

            logRunner.apply(this, args, 'error');
        }
    }

    /**
    Logs a time type message using the console time method if available, otherwise it uses the console log method.

    @method time
    **/
    export function time(message : string, ...args : any[]): void
    {
        // Short circuit if logging is disabled.  This is as close to noop as we can get, incase there is a direct reference to this method.
        if (!tConfig.log.enabled) return;
        if (logLevel >= LEVEL.DEBUG)
        {
            timers[message] = { start: new Date().getTime() };
            var msg = util.format('{0}: timer started', message),
                args = slice.call(arguments, 1);
            args.unshift(msg);
            args.unshift(cTime);

            logRunner.apply(this, args);
        }
    }

    /**
    Logs a timeEnd type message using the console timeEnd method if available, otherwise it uses the console log method.
    Causes the timer to end, for the given message.

    @method timeEnd
    **/
    export function timeEnd(message : string, ...args : any[]): void
    {
        // Short circuit if logging is disabled.  This is as close to noop as we can get, incase there is a direct reference to this method.
        if (!tConfig.log.enabled) return;
        if (logLevel >= LEVEL.DEBUG)
        {
            timers[message].end = (new Date).getTime();
            var time = timers[message].end - timers[message].start,
                msg = util.format('{0}: {1}ms', message, time);
            var args = slice.call(arguments, 1);
            args.unshift(msg);
            args.unshift(cTimeEnd);

            logRunner.apply(this, args);
        }
    }