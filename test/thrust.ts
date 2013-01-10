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
                s1 : Function, s2 : Function, s3 : Function;
            
            beforeEach((done) => {
                s1 = jasmine.createSpy('s1');
                s2 = jasmine.createSpy('s2');
                s3 = jasmine.createSpy('s3');

                m1 = <IThrustModuleInternal> result.thrust.create('test-module1', {
                    init: s1,
                    destroy: s1
                });

                m2 = <IThrustModuleInternal> result.thrust.create('test-module2', {
                    init: s2,
                    destroy: s2
                });

                m3 = <IThrustModuleInternal> result.thrust.create('test-module3', {
                    init: s3,
                    destroy: s3
                });
            });

            [{ action: 'init' }, {action: 'start'}, {action: 'ready'}].forEach((z) => {
                describe(z.action, () => {
                    async.it(z.action + 's all modules in settings', (done) => {
                        Thrust.launchSequence(result.thrust).then(() => {
                            result.thrust[z.action]().then(() => {
                                expect(m2.cache[z.action + '-status']).toBe(true);
                                expect(m3.cache[z.action + '-status']).toBe(true);

                                expect(s2).toHaveBeenCalled();
                                expect(s3).toHaveBeenCalled();

                                done();
                            })
                        })
                    });

                    async.it(z.action + 's a single module', (done) => {

                        Thrust.launchSequence(result.thrust).then(() => {
                            result.thrust[z.action]('test-module1').then(() => {
                                expect(m1.cache[z.action + '-status']).toBe(true);

                                expect(s1).toHaveBeenCalled();
                                done();
                            });
                        });
                    });

                    async.it(z.action + 's multiple modules', (done) => {
                        Thrust.launchSequence(result.thrust).then(() => {
                            result.thrust[z.action](['test-module1', 'test-module2', 'test-module3']).then(() => {
                                expect(m1.cache[z.action + '-status']).toBe(true);
                                expect(m2.cache[z.action + '-status']).toBe(true);
                                expect(m3.cache[z.action + '-status']).toBe(true);

                                expect(s1).toHaveBeenCalled();
                                expect(s2).toHaveBeenCalled();
                                expect(s3).toHaveBeenCalled();
                                done();
                            });
                        });
                    });
                });

            });
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
