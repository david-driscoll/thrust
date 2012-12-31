/// <reference path="../lib/jasmine/lib/jasmine-1.3.1/jasmine.js" />
/// <reference path="../lib/requirejs/require.js" />
/// <reference path="./require.test.settings.js" />

/*global jasmine:true, describe:true, it:true, expect:true, beforeEach:true, afterEach:true, spyOn:true, runs:true, waits:true, waitsFor:true */
(function ()
{
    'use strict';
    var events = require('thrust/events'),
        util = require('thrust/util'),
        Events = events.Events;

    describe('Events', function ()
    {
        describe('extends', function ()
        {
            it('extends as expected', function ()
            {
                var o = {};
                Events.extend(o);

                expect(o.fire).toBeDefined();
                expect(o.publish).toBeDefined();
                expect(o.subscribe).toBeDefined();
                expect(o.once).toBeDefined();
                expect(o.unsubscribe).toBeDefined();
                expect(o.fire.async).toBeDefined();
                expect(o.publish.async).toBeDefined();
                expect(o.initEvents).not.toBeNull();
                expect(o.__pubSubName).toBe('Events');
            });

            it('extends and inits as expected', function ()
            {
                var o = {};
                Events.extend(o, true);

                expect(o.fire).toBeDefined();
                expect(o.publish).toBeDefined();
                expect(o.subscribe).toBeDefined();
                expect(o.once).toBeDefined();
                expect(o.unsubscribe).toBeDefined();
                expect(o.fire.async).toBeDefined();
                expect(o.publish.async).toBeDefined();
                expect(o.initEvents).toBe(util.noop);
                expect(o.__pubSubName).toBe('Events');
            });
        });

        describe('subscribe', function ()
        {
            var o;
            beforeEach(function ()
            {
                o = {};
                Events.extend(o, true);
            });

            it('subscribes to single events', function ()
            {
                o.subscribe('test-event', util.noop);
                o.subscribe('test-event2', util.noop);
                o.subscribe('test-event2', function () { return; });
                o.subscribe('all', util.noop);

                expect(o._callbacks['test-event']).toBeDefined();
                expect(o._callbacks['test-event2']).toBeDefined();
                expect(o._callbacks['all']).toBeDefined();
            });

            it('subscribes to many events', function ()
            {
                o.subscribe('test-event test-event2 all', util.noop);

                expect(o._callbacks['test-event']).toBeDefined();
                expect(o._callbacks['test-event2']).toBeDefined();
                expect(o._callbacks['all']).toBeDefined();
            });
        });

        describe('subscribe namespace', function ()
        {
            var o;
            beforeEach(function ()
            {
                o = { name: 'test' };
                Events.extend(o, true);
            });

            it('subscribes to single events', function ()
            {
                o.subscribe('test-event', util.noop);
                o.subscribe('test-event2', util.noop);
                o.subscribe('test-event2', function () { return; });
                o.subscribe('all', util.noop);

                expect(o._callbacks['test-event']).toBeDefined();
                expect(o._callbacks['test-event2']).toBeDefined();
                expect(o._callbacks['all']).toBeDefined();
            });

            it('subscribes to many events', function ()
            {
                o.subscribe('test-event test-event2 all', util.noop);

                expect(o._callbacks['test-event']).toBeDefined();
                expect(o._callbacks['test-event2']).toBeDefined();
                expect(o._callbacks['all']).toBeDefined();
            });
        });

        describe('unsubscribe', function ()
        {
            var o;
            beforeEach(function ()
            {
                o = {};
                Events.extend(o, true);
                o.subscribe('test-event test-event2 all', util.noop);
            });

            it('unsubscribes from single events', function ()
            {
                o.unsubscribe('test-event');

                expect(o._callbacks['test-event']).not.toBeDefined();
                expect(o._callbacks['test-event2']).toBeDefined();
                expect(o._callbacks['all']).toBeDefined();
            });

            it('unsubscribes from many events', function ()
            {
                o.unsubscribe('test-event all');

                expect(o._callbacks['test-event']).not.toBeDefined();
                expect(o._callbacks['test-event2']).toBeDefined();
                expect(o._callbacks['all']).not.toBeDefined();
            });

            it('unsubscribes from all events', function ()
            {
                o.unsubscribe();

                expect(o._callbacks).not.toBeDefined();
            });
        });

        describe('unsubscribe namespace', function ()
        {
            var o, x;
            beforeEach(function ()
            {
                o = { name: 'o' };
                Events.extend(o, true);

                x = { name: 'x' };
                Events.extend(x, true);

                o._callbacks = x._callbacks = {};

                o.subscribe('test-event test-event2 all', util.noop);
                x.subscribe('test-event3 test-event2 all', util.noop);
            });

            it('unsubscribes from single events', function ()
            {
                o.unsubscribe('test-event');
                x.unsubscribe('test-event2');

                expect(o._callbacks['test-event']).not.toBeDefined();
                expect(o._callbacks['test-event2']).toBeDefined();
                expect(o._callbacks['test-event3']).toBeDefined();
                expect(o._callbacks['all']).toBeDefined();
            });

            it('unsubscribes from many events', function ()
            {
                o.unsubscribe('test-event all');
                x.unsubscribe('test-event3 all');

                expect(o._callbacks['test-event']).not.toBeDefined();
                expect(o._callbacks['test-event2']).toBeDefined();
                expect(o._callbacks['test-event3']).not.toBeDefined();
                expect(o._callbacks['all']).not.toBeDefined();
            });

            it('unsubscribes from all events', function ()
            {
                o.unsubscribe();

                expect(o._callbacks).toBeDefined();
                expect(o._callbacks['test-event']).not.toBeDefined();
            });
        });

        describe('fire', function ()
        {
            var o, x, y, s1, s2, s3, s4;
            beforeEach(function ()
            {
                o = { name: 'o' };
                Events.extend(o, true);

                x = { name: 'x' };
                Events.extend(x, true);

                y = {};
                Events.extend(y, true);

                o._callbacks = x._callbacks = y._callbacks = {};

                s1 = jasmine.createSpy('s1');
                s2 = jasmine.createSpy('s2');
                s3 = jasmine.createSpy('s3');
                s4 = jasmine.createSpy('s4');

                o.subscribe('test-event', s1);
                x.subscribe('test-event', s1);
                y.subscribe('test-event', s1);
                o.subscribe('test-event2', s2);
                x.subscribe('test-event2 test-event3 all', s3);
                y.subscribe('test-event3 test-event4 all', s4);
            });

            describe('fire synchronously', function ()
            {
                it('fires single event', function ()
                {
                    o.fire('test-event');

                    expect(s1).toHaveBeenCalled();
                    expect(s1.callCount).toBe(3);
                    expect(s2).not.toHaveBeenCalled();
                    expect(s2.callCount).toBe(0);
                    expect(s3).toHaveBeenCalled();
                    expect(s3.callCount).toBe(1);
                    expect(s4).toHaveBeenCalled();
                    expect(s4.callCount).toBe(1);
                });

                it('fires single events in succession', function ()
                {
                    o.fire('test-event');
                    x.fire('test-event2');

                    expect(s1).toHaveBeenCalled();
                    expect(s1.callCount).toBe(3);
                    expect(s2).toHaveBeenCalled();
                    expect(s2.callCount).toBe(1);
                    expect(s3).toHaveBeenCalled();
                    expect(s3.callCount).toBe(3);
                    expect(s4).toHaveBeenCalled();
                    expect(s4.callCount).toBe(2);
                });

                it('fires multiple events', function ()
                {
                    o.fire('test-event test-event2');

                    expect(s1).toHaveBeenCalled();
                    expect(s1.callCount).toBe(3);
                    expect(s2).toHaveBeenCalled();
                    expect(s2.callCount).toBe(1);
                    expect(s3).toHaveBeenCalled();
                    expect(s3.callCount).toBe(3);
                    expect(s4).toHaveBeenCalled();
                    expect(s4.callCount).toBe(2);
                });

                it('fires with arguments', function ()
                {
                    o.fire('test-event', 'testValue');

                    expect(s1).toHaveBeenCalledWith('testValue');
                });

                it('fires with multiple arguments', function ()
                {
                    o.fire('test-event', 'testValue', true);

                    expect(s1).toHaveBeenCalledWith('testValue', true);
                });
            });

            describe('fire asynchronously', function ()
            {
                it('fires single event', function ()
                {
                    runs(function ()
                    {
                        o.fire.async('test-event');
                    });

                    waits(100);

                    runs(function ()
                    {
                        expect(s1).toHaveBeenCalled();
                        expect(s1.callCount).toBe(3);
                        expect(s2).not.toHaveBeenCalled();
                        expect(s2.callCount).toBe(0);
                        expect(s3).toHaveBeenCalled();
                        expect(s3.callCount).toBe(1);
                        expect(s4).toHaveBeenCalled();
                        expect(s4.callCount).toBe(1);
                    });
                });

                it('fires single events in succession', function ()
                {
                    runs(function ()
                    {
                        o.fire.async('test-event');
                        x.fire.async('test-event2');
                    });

                    waits(100);

                    runs(function ()
                    {
                        expect(s1).toHaveBeenCalled();
                        expect(s1.callCount).toBe(3);
                        expect(s2).toHaveBeenCalled();
                        expect(s2.callCount).toBe(1);
                        expect(s3).toHaveBeenCalled();
                        expect(s3.callCount).toBe(3);
                        expect(s4).toHaveBeenCalled();
                        expect(s4.callCount).toBe(2);
                    });
                });

                it('fires multiple events', function ()
                {
                    runs(function ()
                    {
                        o.fire.async('test-event test-event2');
                    });

                    waits(100);

                    runs(function ()
                    {
                        expect(s1).toHaveBeenCalled();
                        expect(s1.callCount).toBe(3);
                        expect(s2).toHaveBeenCalled();
                        expect(s2.callCount).toBe(1);
                        expect(s3).toHaveBeenCalled();
                        expect(s3.callCount).toBe(3);
                        expect(s4).toHaveBeenCalled();
                        expect(s4.callCount).toBe(2);
                    });
                });

                it('fires with arguments', function ()
                {
                    runs(function ()
                    {
                        o.fire.async('test-event', 'testValue');
                    });

                    waits(100);

                    runs(function ()
                    {
                        expect(s1).toHaveBeenCalledWith('testValue');
                    });
                });

                it('fires with multiple arguments', function ()
                {
                    runs(function ()
                    {
                        o.fire.async('test-event', 'testValue', true);
                    });

                    waits(100);

                    runs(function ()
                    {
                        expect(s1).toHaveBeenCalledWith('testValue', true);
                    });
                });
            });
        });
    });

})();
