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
        describe('Convention autostart', function () {
            var async = new AsyncSpec(this), result = {
thrust: undefined            };
            window['helpers'].launchThrustInstance(this, {
                async: false,
                conventions: [
                    'thrust/convention/autostart'
                ]
            }, result);
            var mod;
            async.beforeEach(function (done) {
                mod = result.thrust.create('module-test1', {
                    name: 'module-test1',
                    init: util.noop,
                    destroy: util.noop,
                    config: {
                        autoStart: true
                    }
                });
                result.thrust.start([
                    'module-test1'
                ]).then(done);
            });
            it('should have striped autoStart property', function () {
                expect(mod.instance.config).not.toBeDefined();
            });
        });
    });
})();
