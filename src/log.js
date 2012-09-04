define(['thrust/config', 'thrust/util'],
function (tConfig, util)
{
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
        log         = (console && console.log) || false,
        warn        = (console && console.warn) || false,
        info        = (console && console.info) || false,
        error       = (console && console.error) || false,
        time        = (console && console.time) || false,
        timeEnd     = (console && console.timeEnd) || false,
        slice       = Array.prototype.slice,
        configLevel = tConfig.log.level || LEVEL.ERROR,
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
        else if (!consoleMethod && log)
        {
            if (log.apply)
                log.apply(console, args);
            else
                log(args);
        }
    };

    /**
    A basic logger for the thrust framework.
        Disables debug logging when thrust is not in debug mode.

    @class thrust.Log
    **/
    var Log = {
        /**
        Logs a debug type message using the console log method
        
        @method debug
        **/
        debug: function ()
        {
            // Short circuit if logging is disabled.  This is as close to noop as we can get, incase there is a direct reference to this method.
            if (!tConfig.log.enabled) return;
            if (logLevel >= LEVEL.DEBUG)
            {
                var args = slice.call(arguments);
                args.unshift(log);

                logRunner.apply(this, args, 'log');
            }
        },
        /**
        Logs a info type message using the console info method if available, otherwise it uses the console log method.

        @method info
        **/
        info: function ()
        {
            // Short circuit if logging is disabled.  This is as close to noop as we can get, incase there is a direct reference to this method.
            if (!tConfig.log.enabled) return;
            if (logLevel >= LEVEL.INFO)
            {
                var args = slice.call(arguments);
                args.unshift(info);

                logRunner.apply(this, args, 'info');
            }
        },
        /**
        Logs a warn type message using the console warn method if available, otherwise it uses the console log method.

        @method warn
        **/
        warn: function ()
        {
            // Short circuit if logging is disabled.  This is as close to noop as we can get, incase there is a direct reference to this method.
            if (!tConfig.log.enabled) return;
            if (logLevel >= LEVEL.WARN)
            {
                var args = slice.call(arguments);
                args.unshift(warn);

                logRunner.apply(this, args, 'warn');
            }
        },
        /**
        Logs a error type message using the console error method if available, otherwise it uses the console log method.

        @method error
        **/
        error: function ()
        {
            // Short circuit if logging is disabled.  This is as close to noop as we can get, incase there is a direct reference to this method.
            if (!tConfig.log.enabled) return;
            if (logLevel >= LEVEL.ERROR)
            {
                var args = slice.call(arguments);
                args.unshift(error);

                logRunner.apply(this, args, 'error');
            }
        },
        /**
        Logs a time type message using the console time method if available, otherwise it uses the console log method.

        @method time
        **/
        time: function (message)
        {
            // Short circuit if logging is disabled.  This is as close to noop as we can get, incase there is a direct reference to this method.
            if (!tConfig.log.enabled) return;
            if (logLevel >= LEVEL.DEBUG)
            {
                timers[message] = { start: new Date().getTime() };
                var msg = util.format('{0}: timer started', message),
                    args = slice.call(arguments, 1);
                args.unshift(msg);
                args.unshift(time);

                logRunner.apply(this, args);
            }
        },
        /**
        Logs a timeEnd type message using the console timeEnd method if available, otherwise it uses the console log method.
        Causes the timer to end, for the given message.

        @method timeEnd
        **/
        timeEnd: function (message)
        {
            // Short circuit if logging is disabled.  This is as close to noop as we can get, incase there is a direct reference to this method.
            if (!tConfig.log.enabled) return;
            if (logLevel >= LEVEL.DEBUG)
            {
                timers[message].end = new Date.getTime();
                var time = timers[message].end - timers[message].start,
                    msg = util.format('{0}: {1}ms', message, time);
                var args = slice.call(arguments, 1);
                args.unshift(msg);
                args.unshift(timeEnd);

                logRunner.apply(this, args);
            }
        }
    };

    return Log;
});
