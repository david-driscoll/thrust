define(["require", "exports", './config', 'thrust/util'], function(require, exports, __tConfig__, __util__) {
    var tConfig = __tConfig__;

    var util = __util__;

    'use strict';
    var LEVEL = {
        DEBUG: 4,
        INFO: 3,
        WARN: 2,
        ERROR: 1
    };
    var console = window.console, timers = {
    }, cLog = (console && console.log) || false, cWarn = (console && console.warn) || false, cInfo = (console && console.info) || false, cError = (console && console.error) || false, cTime = (console && console['time']) || false, cTimeEnd = (console && console['timeEnd']) || false, slice = Array.prototype.slice, configLevel = tConfig.log.level || LEVEL.ERROR, logLevel = LEVEL[configLevel] || (typeof configLevel === 'string' && LEVEL[configLevel.toUpperCase()]) || (typeof configLevel === 'number' && configLevel) || LEVEL.ERROR;
    var logRunner = function (consoleMethod, logType) {
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
    function debug() {
        var args = [];
        for (var _i = 0; _i < (arguments.length - 0); _i++) {
            args[_i] = arguments[_i + 0];
        }
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
    function info() {
        var args = [];
        for (var _i = 0; _i < (arguments.length - 0); _i++) {
            args[_i] = arguments[_i + 0];
        }
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
    function warn() {
        var args = [];
        for (var _i = 0; _i < (arguments.length - 0); _i++) {
            args[_i] = arguments[_i + 0];
        }
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
    function error() {
        var args = [];
        for (var _i = 0; _i < (arguments.length - 0); _i++) {
            args[_i] = arguments[_i + 0];
        }
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
    function time(message) {
        var args = [];
        for (var _i = 0; _i < (arguments.length - 1); _i++) {
            args[_i] = arguments[_i + 1];
        }
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
    function timeEnd(message) {
        var args = [];
        for (var _i = 0; _i < (arguments.length - 1); _i++) {
            args[_i] = arguments[_i + 1];
        }
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
