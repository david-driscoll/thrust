/// <reference path="../helpers/thrust.ts" />
/// <reference path="../../src/thrust/interfaces/util/util.d.ts" />
/// <reference path="../../src/thrust/interfaces/thrust.d.ts" />
/// <reference path="../../lib/DefinitelyTyped/jasmine.async/jasmine.async.d.ts" />
/// <reference path="../../lib/DefinitelyTyped/jasmine/jasmine-1.2.d.ts" />
/// <reference path="../../lib/DefinitelyTyped/requirejs/require-2.1.d.ts" />

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

    describe('Thrust', () => {

        describe('Convention dependent.modules', function () {
            var async = new AsyncSpec(this),
                result = { thrust: <IThrust> undefined };

            window['helpers'].launchThrustInstance(this, {
                async: false,
                conventions: ['thrust/convention/dependent.modules']
            }, result);

            var mod: IThrustModuleInternal,
                child1: IThrustModuleInternal,
                child2: IThrustModuleInternal,
                child3: IThrustModuleInternal,
                dependent1: IThrustModuleInternal,
                dependent2: IThrustModuleInternal;

            beforeEach(() =>
            {
                mod = <IThrustModuleInternal> result.thrust.create('module-test1', {
                    init: util.noop,
                    destroy: util.noop,
                    config: {
                        childModules: ['module-test1-child1', 'module-test1-child2'],
                        dependentModules: ['module-dependent1', 'module-dependent2'],
                    }
                })

                child1 = <IThrustModuleInternal> result.thrust.create('module-test1-child1', {
                    init: util.noop,
                    destroy: util.noop,
                })

                child2 = <IThrustModuleInternal> result.thrust.create('module-test1-child2', {
                    init: util.noop,
                    destroy: util.noop,
                })

                child3 = <IThrustModuleInternal> result.thrust.create('module-test1-child3', {
                    init: util.noop,
                    destroy: util.noop,
                })

                dependent1 = <IThrustModuleInternal> result.thrust.create('module-dependent1', {
                    init: util.noop,
                    destroy: util.noop,
                })

                dependent2 = <IThrustModuleInternal> result.thrust.create('module-dependent2', {
                    init: util.noop,
                    destroy: util.noop,
                })
            });

            it('should have striped dependentModules and childModules property', function () {
                expect(mod.instance.config).not.toBeDefined();
            });

            async.it('should automatically start child modules', (done) => {
                var seq = [() => mod.start(),
                     _.bind(when.delay, undefined, 10)];

                when.sequence(seq).then(() => {
                    expect(child1.cache['start-status']).toBe(true);
                    expect(child2.cache['start-status']).toBe(true);
                    expect(child3.cache['start-status']).not.toBeDefined();

                    done();
                });
            })

            async.it('should automatically start dependent modules', (done) => {
                var seq = [() => mod.start(),
                     _.bind(when.delay, undefined, 10)];

                when.sequence(seq).then(() => {
                    expect(dependent1.cache['start-status']).toBe(true);
                    expect(dependent2.cache['start-status']).toBe(true);

                    done();
                });
            })

            async.it('should automatically stop child modules', (done) => {
                var seq = [() => mod.start(),
                    //_.bind(when.delay, undefined, 10), 
                    () => mod.stop(),
                    //_.bind(when.delay, undefined, 10)
                ];

                when.sequence(seq).then(() => {
                    expect(child1.cache['start-status']).toBe(false);
                    expect(child2.cache['start-status']).toBe(false);
                    expect(child3.cache['start-status']).not.toBeDefined();

                    done();
                });
            })

            async.it('should not automatically stop dependent modules', (done) => {
                var seq = [() => mod.start(),
                    //_.bind(when.delay, undefined, 10), 
                    () => mod.stop(),
                     //_.bind(when.delay, undefined, 10)
                ];

                when.sequence(seq).then(() => {
                    expect(dependent1.cache['start-status']).toBe(true);
                    expect(dependent2.cache['start-status']).toBe(true);

                    done();
                });
            })

            async.it('should restart dependant modules that have stopped', (done) => {
                var seq = [() => mod.start(),
                    //_.bind(when.delay, undefined, 10), 
                    () => mod.stop(),
                     //_.bind(when.delay, undefined, 10),
                     () => when.all([dependent1.stop(), dependent2.stop()])]

                when.sequence(seq).then(() => {
                    expect(dependent1.cache['start-status']).toBe(false);
                    expect(dependent2.cache['start-status']).toBe(false);

                    mod.start().then(() => {
                        expect(dependent1.cache['start-status']).toBe(true);
                        expect(dependent2.cache['start-status']).toBe(true);
                        done();
                    });
                });
            });
        });
    });
} ();