/// <reference path="../helpers/thrust.ts" />
/// <reference path="../../src/thrust/interfaces/util/util.d.ts" />
/// <reference path="../../src/thrust/interfaces/thrust.d.ts" />
/// <reference path="../../src/jasmine.async.d.ts" />
/// <reference path="../../lib/DefinitelyTyped/jasmine/jasmine.d.ts" />
/// <reference path="../../lib/DefinitelyTyped/requirejs/require.d.ts" />

/*global jasmine:true, AsyncSpec:true, describe:true, it:true, expect:true, beforeEach:true, afterEach:true, spyOn:true, runs:true, waits:true, waitsFor:true */
() => {
    'use strict';
    var thrust = require('thrust'),
        thrustMediator = require('thrust/mediator'),
        util: IThrustUtil = require('thrust/util'),
        m = require('thrust/capsule'),
        thrustInstance = require('thrust/instance'),
        when = util.when,
        _ = util._;

    describe('Mediator Tests', function () {
        var async = new AsyncSpec(this),
            result = {
                thrust: <IThrust> undefined,
                mediator: <IThrustMediator> undefined
            };

        window['helpers'].launchThrustInstance(this, {
            async: false,
            conventions: ['thrust/mediator/convention/subscription']
        }, result);

        describe('Mediator', function () {
            it('should bind to default events', function () {
                expect((<any> result.mediator)._callbacks['thrust/ready']).toBeDefined();
            });

            it('should initEvents', function () {
                expect(result.mediator.fire.async).toBeDefined();
                expect(result.mediator.publish.async).toBeDefined();

                expect(result.mediator.initEvents).toBe(util.noop);
            });

            it('should have event namespace', function () {
                expect((<any> result.mediator).__namespace).toBe('.global');
            });
        });

        describe('MediatorFacade', function () {
            var mod: IThrustModule;
            async.beforeEach((done) =>
            {
                mod = result.thrust.create('module-test1', {
                    name: 'module-test1',
                    init: util.noop,
                    destroy: util.noop,
                    config: {
                        autoStart: true
                    }
                })

                result.thrust.start(['module-test1'])
                    .then(done, done);
            });

            it('sets variables and inherits from parent', function () {
                expect((<any>mod.instance.mediator).__conventions).toBe((<any>result.mediator).__conventions);
                expect((<any>mod.instance.mediator)._callbacks).toBe((<any>result.mediator)._callbacks);
            });

            it('should initEvents', function () {
                expect(mod.instance.mediator.fire.async).toBeDefined();
                expect(mod.instance.mediator.publish.async).toBeDefined();
                expect(mod.instance.mediator.initEvents).toBe(util.noop);
            });

            it('should have event namespace', function () {
                expect((<any>mod.instance.mediator).__namespace).toBe('.module-test1');
            });
        });
    });
} ();