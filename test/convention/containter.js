/// <reference path="../helpers/thrust.ts" />
/// <reference path="../../src/thrust/interfaces/util/util.d.ts" />
/// <reference path="../../src/thrust/interfaces/thrust.d.ts" />
/// <reference path="../../lib/DefinitelyTyped/jasmine.async/jasmine.async.d.ts" />
/// <reference path="../../lib/DefinitelyTyped/jasmine/jasmine-1.2.d.ts" />
/// <reference path="../../lib/DefinitelyTyped/requirejs/require-2.1.d.ts" />
/*global jasmine:true, AsyncSpec:true, describe:true, it:true, expect:true, beforeEach:true, afterEach:true, spyOn:true, runs:true, waits:true, waitsFor:true */
(function () {
    'use strict';
    var thrust = require('thrust'), thrustMediator = require('thrust/mediator'), util = require('thrust/util'), m = require('thrust/capsule'), thrustInstance = require('thrust/instance'), when = util.when, _ = util._;
    describe('Thrust', function () {
        describe('Convention container', function () {
            var async = new AsyncSpec(this), result = {
thrust: undefined            };
            window['helpers'].launchThrustInstance(this, {
                async: false,
                conventions: [
                    'thrust/convention/container'
                ]
            }, result);
            var mod, module2;
            async.beforeEach(function (done) {
                mod = result.thrust.create('module-test1', {
                    init: util.noop,
                    destroy: util.noop,
                    config: {
                        container: 'main'
                    }
                });
                module2 = result.thrust.create('module-test2', {
                    init: util.noop,
                    destroy: util.noop,
                    config: {
                        container: 'main'
                    }
                });
                result.thrust.start([
                    'module-test1'
                ]).then(done);
            });
            afterEach(function () {
                thrustInstance.clearCache();
            });
            it('should have striped container property', function () {
                expect(mod.instance.config).not.toBeDefined();
            });
            async.it('should only let one module per container run', function (done) {
                var defer = when.defer();
                result.thrust.mediator.subscribe('thrust/module/stop', function () {
                    return _.delay(defer.resolve, 10);
                });
                when.join(result.thrust.start('module-test2'), defer.promise).then(function () {
                    expect(mod.cache['start-status']).toBe(false);
                    expect(module2.cache['start-status']).toBe(true);
                }).then(done);
            });
        });
    });
})();
