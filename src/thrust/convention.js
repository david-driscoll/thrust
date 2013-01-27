define(["require", "exports", 'thrust/util'], function(require, exports, __util__) {
    var util = __util__;

    var _ = util._;
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
    var Convention = (function () {
        function Convention(methodOverrides) {
            _.extend(this, methodOverrides);
            var keys = _.difference(methods, _.intersection(methods, _.keys(methodOverrides)));
            _.each(keys, function (x) {
                if(_.isFunction(this[x])) {
                    this[x] = util.noop;
                }
            }, this);
        }
        Convention.prototype.create = function (thrust, mod, facades) {
        };
        Convention.prototype.init = function (mod, facades) {
        };
        Convention.prototype.start = function (mod, facades) {
        };
        Convention.prototype.ready = function (mod, facades) {
        };
        Convention.prototype.stop = function (mod, facades) {
        };
        Convention.prototype.destroy = function (mod, facades) {
        };
        Convention.prototype.countdown = function (thrust) {
        };
        Convention.prototype.ignite = function (thrust) {
        };
        Convention.prototype.orbit = function (thrust) {
        };
        Convention.prototype.deorbit = function (thrust) {
        };
        Convention.prototype.splashdown = function (thrust) {
        };
        return Convention;
    })();
    exports.Convention = Convention;    
})
//@ sourceMappingURL=convention.js.map
