/// <reference path="../lib/jasmine/lib/jasmine-1.3.1/jasmine.js" />
/// <reference path="../lib/requirejs/require.js" />
/// <reference path="./require.test.settings.js" />

/*global jasmine:true, describe:true, it:true, expect:true, beforeEach:true, afterEach:true, spyOn:true, runs:true, waits:true, waitsFor:true */
(function ()
{
    'use strict';
    var thrust = require('thrust'),
        thrustMediator = require('thrust/mediator'),
        util = require('thrust/util'),
        m = require('thrust/capsule'),
        _autostart = require('thrust/mediator/convention/autostart'),
        _subscription = require('thrust/mediator/convention/subscription'),
        Thrust = thrust.Thrust,
        Mediator = thrustMediator.Mediator,
        Module = m.Module,
        autostart = _autostart.autostart,
        subscription = _subscription.subscription;

    var t, c;
    beforeEach(function ()
    {
        t = new Thrust('global');
        t.__conventions = [];

        c = new Mediator('global');
        c.__conventions = [];

        t.mediator = c;
    });

    describe('Mediator', function ()
    {
        it('should bind to default events', function ()
        {
            expect(c._callbacks['thrust/ready']).toBeDefined();
        });

        it('should initEvents', function ()
        {
            expect(c.fire.async).toBeDefined();
            expect(c.publish.async).toBeDefined();

            expect(c.initEvents).toBe(util.noop);
        });

        it('should have event namespace', function ()
        {
            expect(c.__namespace).toBe('.global');
        });
    });

    describe('MediatorFacade', function ()
    {
        var f, module;
        beforeEach(function ()
        {
            module = { name: 'module-test1' };
            f = c.createFacade(t, module, {});
        });

        it('sets variables and inherits from parent', function ()
        {
            expect(f.name).toBeDefined();
            expect(f.module).toBe(module);
            expect(f.__conventions).toBe(c.__conventions);
            expect(f._callbacks).toBe(c._callbacks);
        });

        it('should initEvents', function ()
        {
            expect(f.fire.async).toBeDefined();
            expect(f.publish.async).toBeDefined();
            expect(f.initEvents).toBe(util.noop);
        });

        it('should have event namespace', function ()
        {
            expect(f.__namespace).toBe('.module-test1');
        });
    });

    describe('Convention autostart', function ()
    {
        var f, module;
        beforeEach(function ()
        {
            t.__conventions.push(autostart);
            c.__conventions.push(autostart);

            module = new Module(t, { name: 'module-test1', init: util.noop, destroy: util.noop, autoStart: true });
            f = c.createFacade(t, module, {});
        });

        it('should have striped autoStart properties', function ()
        {
            expect(f.module.autoStart).not.toBeDefined();
        });
    });

    describe('Convention subscription', function ()
    {
        var f, module, module2, s1, s2, s3, s4, f2;
        beforeEach(function ()
        {
            s1 = jasmine.createSpy();
            s2 = jasmine.createSpy();
            s3 = jasmine.createSpy();
            s4 = jasmine.createSpy();

            t.__conventions.push(subscription);
            c.__conventions.push(subscription);

            var fakeContext = { fake: true };

            module = new Module(t, {
                name: 'module-test1',
                init: util.noop,
                destroy: util.noop,
                event2: s2,
                event4: s4,
                subscriptions: {
                    'test-event1': s1,
                    'test-event2': 'event2',
                    'test-event3': [s3, fakeContext],
                    'test-event4': ['event4', fakeContext]
                }
            });
            f = c.createFacade(t, module, {});
        });

        it('should have striped subscription', function ()
        {
            expect(f.module.subscription).not.toBeDefined();
        });

        it('should have created subscriptions', function ()
        {
            f.start(module);

            expect(f._internalSubscriptions.length).toBe(4);
            expect(f._callbacks['test-event1']).toBeDefined();
            expect(f._callbacks['test-event2']).toBeDefined();
            expect(f._callbacks['test-event3']).toBeDefined();
            expect(f._callbacks['test-event4']).toBeDefined();
        });

        it('subscriptions function', function ()
        {
            f.start(module);

            f.fire('test-event1');
            f.fire('test-event2');
            f.fire('test-event3');
            f.fire('test-event4');

            expect(s1).toHaveBeenCalled();
            expect(s2).toHaveBeenCalled();
            expect(s3).toHaveBeenCalled();
            expect(s4).toHaveBeenCalled();
        });

        it('subscriptions unsubscribe', function ()
        {
            f.start(module);
            f.stop(module);

            expect(f._internalSubscriptions).not.toBeDefined();
            expect(f._callbacks['test-event1']).not.toBeDefined();
            expect(f._callbacks['test-event2']).not.toBeDefined();
            expect(f._callbacks['test-event3']).not.toBeDefined();
            expect(f._callbacks['test-event4']).not.toBeDefined();
        });

        it('subscriptions unsubscribe properly with multiple modules', function ()
        {
            var fakeContext = { fake: true };
            module2 = new Module(t, {
                name: 'module-test2',
                init: util.noop,
                destroy: util.noop,
                event2: s2,
                event4: s4,
                subscriptions: {
                    'test-event1': s1,
                    'test-event2': 'event2',
                    'test-event3': [s3, fakeContext],
                    'test-event4': ['event4', fakeContext]
                }
            });
            f2 = c.createFacade(t, module2, {});

            f.start(module);
            f2.start(module2);
            f.stop(module);

            expect(f._internalSubscriptions).not.toBeDefined();
            expect(f._callbacks['test-event1']['module-test2']).toBeDefined();
            expect(f._callbacks['test-event2']['module-test2']).toBeDefined();
            expect(f._callbacks['test-event3']['module-test2']).toBeDefined();
            expect(f._callbacks['test-event4']['module-test2']).toBeDefined();
            expect(f._callbacks['test-event1']['module-test1']).not.toBeDefined();
            expect(f._callbacks['test-event2']['module-test1']).not.toBeDefined();
            expect(f._callbacks['test-event3']['module-test1']).not.toBeDefined();
            expect(f._callbacks['test-event4']['module-test1']).not.toBeDefined();
        });
    });
})();