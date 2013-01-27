/// <reference path="../../../src/thrust/interfaces/dom/convention/context.d.ts" />
/// <reference path="../../../src/thrust/interfaces/dom/dom.d.ts" />
/// <reference path="../../helpers/thrust.ts" />
/// <reference path="../../../src/thrust/interfaces/util/util.d.ts" />
/// <reference path="../../../src/thrust/interfaces/thrust.d.ts" />
/// <reference path="../../../src/jasmine.async.d.ts" />
/// <reference path="../../../lib/DefinitelyTyped/jasmine/jasmine.d.ts" />
/// <reference path="../../../lib/DefinitelyTyped/requirejs/require.d.ts" />
/*global jasmine:true, AsyncSpec:true, describe:true, it:true, expect:true, beforeEach:true, afterEach:true, spyOn:true, runs:true, waits:true, waitsFor:true */
(function () {
    'use strict';
    var thrust = require('thrust'), tQuery = require('thrust/dom/subjquery').tQuery, thrustMediator = require('thrust/mediator'), util = require('thrust/util'), m = require('thrust/capsule'), thrustInstance = require('thrust/instance'), when = util.when, _ = util._;
    describe('Thrust.Dom', function () {
        describe('Convention context', function () {
            var async = new AsyncSpec(this), result = {
                thrust: undefined
            };
            var settings = {
                async: false,
                plugins: [
                    'thrust/dom'
                ],
                dom: {
                    conventions: [
                        'thrust/dom/convention/context'
                    ]
                }
            };
            window['helpers'].launchThrustInstance(this, settings, result);
            var mod;
            beforeEach(function () {
                mod = result.thrust.create('module-test1', {
                    name: 'module-test1',
                    init: util.noop,
                    destroy: util.noop,
                    config: {
                        dom: {
                            context: 'body'
                        }
                    }
                });
            });
            async.it('should fetch the proper context', function (done) {
                mod.start().then(function () {
                    expect(mod.instance.$).toBeDefined();
                    expect(mod.instance.dom).toBeDefined();
                    expect(mod.instance.$[0]).toBe(tQuery('body')[0]);
                    expect(mod.instance.dom[0]).toBe(tQuery('body')[0]);
                    expect(mod.instance.$).toBe(mod.instance.dom);
                    expect(mod.instance.$.query).toBeDefined();
                    expect(mod.instance.$.$).toBeDefined();
                    done();
                });
            });
            async.it('context should be correct after multiple starts and stops', function (done) {
                var seq = [
                    function () {
                        return mod.start();
                    }, 
                    function () {
                        return mod.stop();
                    }, 
                    function () {
                        return mod.start();
                    }                ];
                when.sequence(seq).then(function () {
                    expect(mod.instance.$).toBeDefined();
                    expect(mod.instance.dom).toBeDefined();
                    expect(mod.instance.$[0]).toBe(tQuery('body')[0]);
                    expect(mod.instance.dom[0]).toBe(tQuery('body')[0]);
                    expect(mod.instance.$).toBe(mod.instance.dom);
                    expect(mod.instance.$.query).toBeDefined();
                    expect(mod.instance.$.$).toBeDefined();
                    done();
                });
            });
            // need to do tests that support async data nonsense... sigh
                    });
    });
})();
//@ sourceMappingURL=context.js.map
