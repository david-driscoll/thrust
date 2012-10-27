/// <reference path="../lib/jasmine/jasmine.js" />
/// <reference path="../lib/requirejs/require.js" />
/// <reference path="./require.test.settings.js" />

(function (require, undefined)
{
    /*global jasmine:true, describe:true, it:true, expect:true, beforeEach:true, afterEach:true, spyOn:true, runs:true, waits:true, waitsFor:true */
    'use strict';
    require(['thrust', 'thrust/mediator', 'thrust/util', 'thrust/convention'],
    function (Thrust, ThrustMediator, util, Convention)
    {
        describe('Thrust', function ()
        {
            describe('constructor', function ()
            {
                it('Assigns values properly', function ()
                {
                    var t = new Thrust('test');
                    expect(t.name).toBe('test');
                    expect(t.modules).toEqual({});
                });
            });

            describe('launch', function ()
            {
                it('begins launching', function ()
                {
                    var launchDefer = Thrust.launch();
                    expect(launchDefer).not.toBeFalsy();
                    expect(launchDefer).toBeTruthy();
                    expect(typeof launchDefer.then).toBe('function');
                });
            });

            describe('create', function ()
            {
                var t = new Thrust('test');
                t.mediator = new ThrustMediator('test');

                it('creates a module', function ()
                {
                    var module = t.create('name', { init: util.noop, destroy: util.noop });

                    expect(module).toBeTruthy();
                    expect(t.modules['name']).toBeTruthy();
                });
            });

            var t, c1, c2;
            beforeEach(function ()
            {
                t = new Thrust('test'),
                c1 = new Convention(),
                c2 = new Convention();
                t.mediator = new ThrustMediator('test');
            });

            describe('countdown', function ()
            {
                it('begins countdown', function ()
                {
                    spyOn(c1, 'countdown').andCallThrough();
                    spyOn(c2, 'countdown').andCallThrough();

                    t.__conventions = [c1, c2];

                    var cd = t.countdown();

                    expect(c1.countdown).toHaveBeenCalled();
                    expect(c2.countdown).toHaveBeenCalled();
                });

                it('fires thrust/init event', function ()
                {
                    var cd, started = false;
                    runs(function ()
                    {
                        t.mediator.subscribe('thrust/init', function ()
                        {
                            started = true;
                        });
                        cd = t.countdown();
                    });

                    waitsFor(function ()
                    {
                        return started;
                    }, 'Thrust failed to fire thrust/init event', 100);

                    runs(function ()
                    {
                        expect(started).toBe(true);
                    });
                });
            });

            describe('ignite', function ()
            {
                it('begins ignite', function ()
                {
                    spyOn(c1, 'ignite').andCallThrough();
                    spyOn(c2, 'ignite').andCallThrough();

                    t.__conventions = [c1, c2];

                    var cd = t.ignite();

                    expect(c1.ignite).toHaveBeenCalled();
                    expect(c2.ignite).toHaveBeenCalled();
                });

                it('fires thrust/start event', function ()
                {
                    var cd, started = false;
                    runs(function ()
                    {
                        t.mediator.subscribe('thrust/start', function ()
                        {
                            started = true;
                        });
                        cd = t.ignite();
                    });

                    waitsFor(function ()
                    {
                        return started;
                    }, 'Thrust failed to fire thrust/start event', 100);

                    runs(function ()
                    {
                        expect(started).toBe(true);
                    });
                });
            });

            describe('orbit', function ()
            {
                it('begins orbit', function ()
                {
                    spyOn(c1, 'orbit').andCallThrough();
                    spyOn(c2, 'orbit').andCallThrough();

                    t.__conventions = [c1, c2];

                    var cd = t.orbit();

                    expect(c1.orbit).toHaveBeenCalled();
                    expect(c2.orbit).toHaveBeenCalled();
                });

                xit('fires thrust/ready event', function ()
                {
                    var cd, started = false;
                    runs(function ()
                    {
                        t.mediator.subscribe('thrust/ready', function ()
                        {
                            started = true;
                        });
                        cd = t.orbit();
                    });

                    waitsFor(function ()
                    {
                        return started;
                    }, 'Thrust failed to fire thrust/ready event', 200);

                    runs(function ()
                    {
                        expect(started).toBe(true);
                    });
                });
            });

            xdescribe('deorbit', function ()
            {
                it('begins deorbit', function ()
                {
                    spyOn(c1, 'deorbit').andCallThrough();
                    spyOn(c2, 'deorbit').andCallThrough();

                    t.__conventions = [c1, c2];

                    var cd = t.deorbit();

                    expect(c1.deorbit).toHaveBeenCalled();
                    expect(c2.deorbit).toHaveBeenCalled();
                });

                it('fires thrust/stop event', function ()
                {
                    var cd, started = false;
                    runs(function ()
                    {
                        t.mediator.subscribe('thrust/stop', function ()
                        {
                            started = true;
                        });
                        cd = t.deorbit();
                    });

                    waitsFor(function ()
                    {
                        return started;
                    }, 'Thrust failed to fire thrust/stop event', 100);

                    runs(function ()
                    {
                        expect(started).toBe(true);
                    });
                });
            });

            xdescribe('splashdown', function ()
            {
                it('begins splashdown', function ()
                {
                    spyOn(c1, 'splashdown').andCallThrough();
                    spyOn(c2, 'splashdown').andCallThrough();

                    t.__conventions = [c1, c2];

                    var cd = t.splashdown();

                    expect(c1.splashdown).toHaveBeenCalled();
                    expect(c2.splashdown).toHaveBeenCalled();
                });

                it('fires thrust/destroy event', function ()
                {
                    var cd, started = false;
                    runs(function ()
                    {
                        t.mediator.subscribe('thrust/destroy', function ()
                        {
                            started = true;
                        });
                        cd = t.splashdown();
                    });

                    waitsFor(function ()
                    {
                        return started;
                    }, 'Thrust failed to fire thrust/destroy event', 100);

                    runs(function ()
                    {
                        expect(started).toBe(true);
                    });
                });
            });

            describe('registerModule', function ()
            {
                it('must require an instance name', function ()
                {
                    expect(function () { Thrust.registerModule(); }).toThrow('instanceName is required!');
                });

                it('must require a module name', function ()
                {
                    expect(function () { Thrust.registerModule('global'); }).toThrow('name is required!');
                    expect(function () { t.registerModule(); }).toThrow('name is required!');
                });

                it('retrieves registered arguments properly', function ()
                {
                    var emptyArray = [],
                        registrationArgs1 = [1, 'two', ['three']],
                        registrationArgs2 = ['arg1', { item: 'arg2' }],
                        startArgs = [4, 'five', ['six']];
                    
                    Thrust.registerModule.apply(Thrust, ['test', 'my/test/module1'].concat(registrationArgs1));
                    Thrust.registerModule.apply(Thrust, ['test', 'my/test/module2'].concat(registrationArgs2));


                    expect(Thrust.__getModuleArgs('test', 'my/test/module1', emptyArray)).toEqual(registrationArgs1);
                    expect(Thrust.__getModuleArgs('test', 'my/test/module2', emptyArray)).toEqual(registrationArgs2);

                    expect(Thrust.__getModuleArgs('test', 'my/test/module1', startArgs)).toEqual(startArgs);
                    expect(Thrust.__getModuleArgs('test', 'my/test/module2', startArgs)).toEqual(startArgs);
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

        jasmine.getEnv().execute();
    });
})(require);