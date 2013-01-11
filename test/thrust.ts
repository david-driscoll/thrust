/// <reference path="helpers/thrust.ts" />
/// <reference path="../src/thrust/interfaces/util/util.d.ts" />
/// <reference path="../src/thrust/interfaces/thrust.d.ts" />
/// <reference path="../lib/DefinitelyTyped/jasmine.async/jasmine.async.d.ts" />
/// <reference path="../lib/DefinitelyTyped/jasmine/jasmine-1.2.d.ts" />
/// <reference path="../lib/DefinitelyTyped/requirejs/require-2.1.d.ts" />

/*global jasmine:true, describe:true, it:true, xdescribe:true, xit:true, expect:true, beforeEach:true, afterEach:true, spyOn:true, runs:true, waits:true, waitsFor:true */
(() => {
    'use strict';
    var thrust = require('thrust'),
        Thrust = thrust.Thrust,
        thrustMediator = require('thrust/mediator'),
        util: IThrustUtil = require('thrust/util'),
        m = require('thrust/capsule'),
        thrustInstance = require('thrust/instance'),
        ignite = require('thrust/ignite'),
        when = util.when,
        convention = require('thrust/convention'),
        _ = util._;

    describe('Thrust', function () {
        var async = new AsyncSpec(this),
           result = {
               thrust: <IThrust> undefined,
               mediator: <IThrustMediator> undefined,
               promise: <Promise> undefined,
           };

        window['helpers'].launchThrustInstance(this, {
            async: false,
            automaticLifecycle: false,
        }, result);

        describe('create', () => {
            async.it('creates a module', (done) => {
                result.promise.then(() => {
                    var mod = result.thrust.create('name', { init: util.noop, destroy: util.noop });

                    expect(mod).toBeTruthy();
                    expect(result.thrust.modules['name']).toBeTruthy();
                    done();
                });
            });
        });

        [
            { tEvent: 'countdown', mEvent: 'init' },
            { tEvent: 'ignite', mEvent: 'start' },
            { tEvent: 'orbit', mEvent: 'ready' },
        ].forEach((z) => {

            describe(z.tEvent, () =>
            {
                async.it('begins ' + z.tEvent, (done) =>
                {
                    var conventions = result.thrust.__conventions;
                    conventions.forEach((x) => {
                        spyOn(x, z.tEvent).andCallThrough();
                    });

                    Thrust.launchSequence(result.thrust).then(() => {
                        conventions.forEach((x) => {
                            expect(x[z.tEvent]).toHaveBeenCalled();
                        })
                        done();
                    })

                });

                async.it('fires thrust/' + z.mEvent + ' event', (done) =>
                {
                    var spy = jasmine.createSpy(z.mEvent);
                    result.mediator.subscribe('thrust/' + z.mEvent, spy);

                    Thrust.launchSequence(result.thrust).then(() => {
                        expect(spy).toHaveBeenCalled();
                        done();
                    })
                });
            });
        });

        [
            { tEvent: 'deorbit', mEvent: 'stop' },
            { tEvent: 'splashdown', mEvent: 'destroy' },
        ].forEach((z) => {
            describe(z.tEvent, () =>
            {
                async.it('begins ' + z.tEvent, (done) =>
                {
                    var conventions = result.thrust.__conventions;
                    conventions.forEach((x) => {
                        spyOn(x, z.tEvent).andCallThrough();
                    });

                    var seq = [() => Thrust.launchSequence(result.thrust), () => result.thrust.deorbit()]
                    when.sequence(seq).then(() => {
                        conventions.forEach((x) => {
                            expect(x[z.tEvent]).toHaveBeenCalled();
                        })
                        done();
                    })

                });

                async.it('fires thrust/' + z.mEvent + ' event', (done) =>
                {
                    var spy = jasmine.createSpy(z.mEvent);
                    result.mediator.subscribe('thrust/' + z.mEvent, spy);

                    var seq = [() => Thrust.launchSequence(result.thrust), () => result.thrust.deorbit()]
                    when.sequence(seq).then(() => {
                        expect(spy).toHaveBeenCalled();
                        done();
                    })
                });
            });
        });

        describe('module events', () => {

            var m1: IThrustModuleInternal, m2: IThrustModuleInternal, m3: IThrustModuleInternal,
                s1i: Function, s1s: Function, s1r: Function, s1t: Function, s1d: Function,
                s2i: Function, s2s: Function, s2r: Function, s2t: Function, s2d: Function,
                s3i: Function, s3s: Function, s3r: Function, s3t: Function, s3d: Function;

            beforeEach(() => {
                s1i = jasmine.createSpy('s1i');
                s1s = jasmine.createSpy('s1s');
                s1r = jasmine.createSpy('s1r');
                s1t = jasmine.createSpy('s1t');
                s1d = jasmine.createSpy('s1d');
                s2i = jasmine.createSpy('s2i');
                s2s = jasmine.createSpy('s2s');
                s2r = jasmine.createSpy('s2r');
                s2t = jasmine.createSpy('s2t');
                s2d = jasmine.createSpy('s2d');
                s3i = jasmine.createSpy('s3i');
                s3s = jasmine.createSpy('s3s');
                s3r = jasmine.createSpy('s3r');
                s3t = jasmine.createSpy('s3t');
                s3d = jasmine.createSpy('s3d');

                m1 = <IThrustModuleInternal> result.thrust.create('test-module1', {
                    init: s1i,
                    start: s1s,
                    ready: s1r,
                    stop: s1t,
                    destroy: s1d
                });

                m2 = <IThrustModuleInternal> result.thrust.create('test-module2', {
                    init: s2i,
                    start: s2s,
                    ready: s2r,
                    stop: s2t,
                    destroy: s2d
                });

                m3 = <IThrustModuleInternal> result.thrust.create('test-module3', {
                    init: s3i,
                    start: s3s,
                    ready: s3r,
                    stop: s3t,
                    destroy: s3d
                });
            });

            [{ action: 'init' }/*, { action: 'start' }, { action: 'ready' }*/].forEach((z) => {
                describe(z.action, () => {
                    async.it(z.action + 's all modules in settings', (done) => {

                        var m = result.thrust.modules;
                        delete result.thrust.modules;
                        result.thrust.cfg.modules = ['test-module2', 'test-module3'];
                        Thrust.launchSequence(result.thrust).then(() => {
                            result.thrust[z.action]().then(() => {
                                expect(m2.cache[z.action + '-status']).toBe(true);
                                expect(m3.cache[z.action + '-status']).toBe(true);
                                expect(m1.cache[z.action + '-status']).toBe(false);

                                expect(s2i).toHaveBeenCalled();
                                expect(s2s).toHaveBeenCalled();
                                expect(s2r).toHaveBeenCalled();
                                expect(s3i).toHaveBeenCalled();
                                expect(s3s).toHaveBeenCalled();
                                expect(s3r).toHaveBeenCalled();

                                done();
                            })
                        })
                    });

                    async.it(z.action + 's a single module', (done) => {
                        var m = result.thrust.modules;
                        result.thrust.modules = {};

                        Thrust.launchSequence(result.thrust).then(() => {
                            result.thrust.modules = m;

                            result.thrust[z.action]('test-module1').then(() => {
                                expect(m1.cache[z.action + '-status']).toBe(true);

                                expect(s1i).toHaveBeenCalled();
                                if (z.action !== 'init') {
                                    expect(s1s).toHaveBeenCalled();
                                    expect(s1r).toHaveBeenCalled();
                                }
                                done();
                            });
                        });
                    });

                    async.it(z.action + 's multiple modules', (done) => {
                        var m = result.thrust.modules;
                        result.thrust.modules = {};

                        Thrust.launchSequence(result.thrust).then(() => {
                            result.thrust.modules = m;
                            result.thrust[z.action](['test-module1', 'test-module2', 'test-module3']).then(() => {
                                expect(m1.cache[z.action + '-status']).toBe(true);
                                expect(m2.cache[z.action + '-status']).toBe(true);
                                expect(m3.cache[z.action + '-status']).toBe(true);

                                expect(s1i).toHaveBeenCalled();
                                expect(s2i).toHaveBeenCalled();
                                expect(s3i).toHaveBeenCalled();
                                if (z.action !== 'init') {
                                    expect(s1s).toHaveBeenCalled();
                                    expect(s1r).toHaveBeenCalled();
                                    expect(s2s).toHaveBeenCalled();
                                    expect(s2r).toHaveBeenCalled();
                                    expect(s3s).toHaveBeenCalled();
                                    expect(s3r).toHaveBeenCalled();
                                }
                                done();
                            });
                        });
                    });

                    async.it(z.action + ' sends arguments to module methods', (done) => {
                        var a1 = 'a1', a2 = 2, a3 = { a3: true };

                        var m = result.thrust.modules;
                        result.thrust.modules = {};

                        Thrust.launchSequence(result.thrust).then(() => {
                            result.thrust.modules = m;
                            result.thrust[z.action]('test-module1', a1, a2, a3).then(() => {

                                expect(s1i).toHaveBeenCalledWith(a1, a2, a3);
                                expect(s1s).toHaveBeenCalledWith(a1, a2, a3);
                                expect(s1r).toHaveBeenCalledWith(a1, a2, a3);
                                done();
                            });
                        });
                    });
                });

            });

            //[{ action: 'stop' }, { action: 'destroy' }].forEach((z) => {
            //    describe(z.action, () => {
            //        async.it(z.action + 's all modules in settings', (done) => {
            //            Thrust.launchSequence(result.thrust).then(() => {
            //                result.thrust[z.action]().then(() => {
            //                    expect(m2.cache[z.action + '-status']).toBe(true);
            //                    expect(m3.cache[z.action + '-status']).toBe(true);

            //                    expect(s2).toHaveBeenCalled();
            //                    expect(s3).toHaveBeenCalled();

            //                    done();
            //                })
            //            })
            //        });

            //        async.it(z.action + 's a single module', (done) => {

            //            Thrust.launchSequence(result.thrust).then(() => {
            //                result.thrust[z.action]('test-module1').then(() => {
            //                    expect(m1.cache[z.action + '-status']).toBe(true);

            //                    expect(s1).toHaveBeenCalled();
            //                    done();
            //                });
            //            });
            //        });

            //        async.it(z.action + 's multiple modules', (done) => {
            //            Thrust.launchSequence(result.thrust).then(() => {
            //                result.thrust[z.action](['test-module1', 'test-module2', 'test-module3']).then(() => {
            //                    expect(m1.cache[z.action + '-status']).toBe(true);
            //                    expect(m2.cache[z.action + '-status']).toBe(true);
            //                    expect(m3.cache[z.action + '-status']).toBe(true);

            //                    expect(s1).toHaveBeenCalled();
            //                    expect(s2).toHaveBeenCalled();
            //                    expect(s3).toHaveBeenCalled();
            //                    done();
            //                });
            //            });
            //        });
            //    });

            //});
        });

        //TODO:
        //init
        //start
        //ready
        //stop
        //destroy

        /*describe('child instances', function ()
        {
            var started, t, childStarted;
            beforeEach(function()
            {
                started = false;
                childStarted = false;
                t = Thrust.launch({
                    })
                    .then(function (context)
                    {
                        context.thrust.spawn({ name: 'child' })
                        .then(function(childContext)
                        {
                            childStarted = true;

                            childContext.mediator.subscribe('thrust/destroy', function ()
                            {
                                childStarted = false;
                            });
                        });

                        context.mediator.subscribe('thrust/destroy', function ()
                        {
                            started = false;
                        });
                    });
            });

            afterEach(function ()
            {
                t.deorbit();
            });
            it('must spawn child instances', function ()
            {
                runs(function(){});

                waitsFor(function ()
                {
                    return started;
                }, 300);

                runs(function ()
                {
                    expect(started).toBe(true);
                    expect(childStarted).toBe(true);
                });
            });

            it('controls child instances', function ()
            {
                runs(function () { });

                waitsFor(function ()
                {
                    return started && childStarted;
                }, 300);

                runs(function ()
                {
                    t.deorbit();
                });

                waitsFor(function ()
                {
                    return (!started && !childStarted);
                }, 300);

                runs(function ()
                {
                    expect(started).toBe(false);
                    expect(childStarted).toBe(false);
                });
            });
        });*/
    });
})();
