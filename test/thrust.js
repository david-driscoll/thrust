/// <reference path="helpers/thrust.ts" />
/// <reference path="../src/thrust/interfaces/util/util.d.ts" />
/// <reference path="../src/thrust/interfaces/thrust.d.ts" />
/// <reference path="../lib/DefinitelyTyped/jasmine.async/jasmine.async.d.ts" />
/// <reference path="../lib/DefinitelyTyped/jasmine/jasmine-1.2.d.ts" />
/// <reference path="../lib/DefinitelyTyped/requirejs/require-2.1.d.ts" />
/*global jasmine:true, describe:true, it:true, xdescribe:true, xit:true, expect:true, beforeEach:true, afterEach:true, spyOn:true, runs:true, waits:true, waitsFor:true */
(function () {
    'use strict';
    var thrust = require('thrust'), Thrust = thrust.Thrust, thrustMediator = require('thrust/mediator'), util = require('thrust/util'), m = require('thrust/capsule'), thrustInstance = require('thrust/instance'), ignite = require('thrust/ignite'), when = util.when, convention = require('thrust/convention'), _ = util._;
    describe('Thrust', function () {
        var async = new AsyncSpec(this), result = {
thrust: undefined,
mediator: undefined,
promise: undefined        };
        window['helpers'].launchThrustInstance(this, {
            async: false,
            automaticLifecycle: false
        }, result);
        describe('create', function () {
            async.it('creates a module', function (done) {
                result.promise.then(function () {
                    var mod = result.thrust.create('name', {
                        init: util.noop,
                        destroy: util.noop
                    });
                    expect(mod).toBeTruthy();
                    expect(result.thrust.modules['name']).toBeTruthy();
                    done();
                });
            });
        });
        [
            {
                tEvent: 'countdown',
                mEvent: 'init'
            }, 
            {
                tEvent: 'ignite',
                mEvent: 'start'
            }, 
            {
                tEvent: 'orbit',
                mEvent: 'ready'
            }, 
            
        ].forEach(function (z) {
            describe(z.tEvent, function () {
                async.it('begins ' + z.tEvent, function (done) {
                    var conventions = result.thrust.__conventions;
                    conventions.forEach(function (x) {
                        spyOn(x, z.tEvent).andCallThrough();
                    });
                    Thrust.launchSequence(result.thrust).then(function () {
                        conventions.forEach(function (x) {
                            expect(x[z.tEvent]).toHaveBeenCalled();
                        });
                        done();
                    });
                });
                async.it('fires thrust/' + z.mEvent + ' event', function (done) {
                    var spy = jasmine.createSpy(z.mEvent);
                    result.mediator.subscribe('thrust/' + z.mEvent, spy);
                    Thrust.launchSequence(result.thrust).then(function () {
                        expect(spy).toHaveBeenCalled();
                        done();
                    });
                });
            });
        });
        [
            {
                tEvent: 'deorbit',
                mEvent: 'stop'
            }, 
            {
                tEvent: 'splashdown',
                mEvent: 'destroy'
            }, 
            
        ].forEach(function (z) {
            describe(z.tEvent, function () {
                async.it('begins ' + z.tEvent, function (done) {
                    var conventions = result.thrust.__conventions;
                    conventions.forEach(function (x) {
                        spyOn(x, z.tEvent).andCallThrough();
                    });
                    var seq = [
                        function () {
                            return Thrust.launchSequence(result.thrust);
                        }, 
                        function () {
                            return result.thrust.deorbit();
                        }                    ];
                    when.sequence(seq).then(function () {
                        conventions.forEach(function (x) {
                            expect(x[z.tEvent]).toHaveBeenCalled();
                        });
                        done();
                    });
                });
                async.it('fires thrust/' + z.mEvent + ' event', function (done) {
                    var spy = jasmine.createSpy(z.mEvent);
                    result.mediator.subscribe('thrust/' + z.mEvent, spy);
                    var seq = [
                        function () {
                            return Thrust.launchSequence(result.thrust);
                        }, 
                        function () {
                            return result.thrust.deorbit();
                        }                    ];
                    when.sequence(seq).then(function () {
                        expect(spy).toHaveBeenCalled();
                        done();
                    });
                });
            });
        });
        describe('module events', function () {
            var m1, m2, m3, s1i, s1s, s1r, s1t, s1d, s2i, s2s, s2r, s2t, s2d, s3i, s3s, s3r, s3t, s3d;
            beforeEach(function () {
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
                m1 = result.thrust.create('test-module1', {
                    init: s1i,
                    start: s1s,
                    ready: s1r,
                    stop: s1t,
                    destroy: s1d
                });
                m2 = result.thrust.create('test-module2', {
                    init: s2i,
                    start: s2s,
                    ready: s2r,
                    stop: s2t,
                    destroy: s2d
                });
                m3 = result.thrust.create('test-module3', {
                    init: s3i,
                    start: s3s,
                    ready: s3r,
                    stop: s3t,
                    destroy: s3d
                });
            });
            [
                {
                    action: 'init'
                }/*, { action: 'start' }, { action: 'ready' }*/ 
            ].forEach(function (z) {
                describe(z.action, function () {
                    async.it(z.action + 's all modules in settings', function (done) {
                        var m = result.thrust.modules;
                        delete result.thrust.modules;
                        result.thrust.cfg.modules = [
                            'test-module2', 
                            'test-module3'
                        ];
                        Thrust.launchSequence(result.thrust).then(function () {
                            result.thrust[z.action]().then(function () {
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
                            });
                        });
                    });
                    async.it(z.action + 's a single module', function (done) {
                        var m = result.thrust.modules;
                        result.thrust.modules = {
                        };
                        Thrust.launchSequence(result.thrust).then(function () {
                            result.thrust.modules = m;
                            result.thrust[z.action]('test-module1').then(function () {
                                expect(m1.cache[z.action + '-status']).toBe(true);
                                expect(s1i).toHaveBeenCalled();
                                if(z.action !== 'init') {
                                    expect(s1s).toHaveBeenCalled();
                                    expect(s1r).toHaveBeenCalled();
                                }
                                done();
                            });
                        });
                    });
                    async.it(z.action + 's multiple modules', function (done) {
                        var m = result.thrust.modules;
                        result.thrust.modules = {
                        };
                        Thrust.launchSequence(result.thrust).then(function () {
                            result.thrust.modules = m;
                            result.thrust[z.action]([
                                'test-module1', 
                                'test-module2', 
                                'test-module3'
                            ]).then(function () {
                                expect(m1.cache[z.action + '-status']).toBe(true);
                                expect(m2.cache[z.action + '-status']).toBe(true);
                                expect(m3.cache[z.action + '-status']).toBe(true);
                                expect(s1i).toHaveBeenCalled();
                                expect(s2i).toHaveBeenCalled();
                                expect(s3i).toHaveBeenCalled();
                                if(z.action !== 'init') {
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
                    async.it(z.action + ' sends arguments to module methods', function (done) {
                        var a1 = 'a1', a2 = 2, a3 = {
a3: true                        };
                        var m = result.thrust.modules;
                        result.thrust.modules = {
                        };
                        Thrust.launchSequence(result.thrust).then(function () {
                            result.thrust.modules = m;
                            result.thrust[z.action]('test-module1', a1, a2, a3).then(function () {
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
//@ sourceMappingURL=thrust.js.map
