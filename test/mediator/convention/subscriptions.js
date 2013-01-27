/// <reference path="../../helpers/thrust.ts" />
/// <reference path="../../../src/thrust/interfaces/util/util.d.ts" />
/// <reference path="../../../src/thrust/interfaces/thrust.d.ts" />
/// <reference path="../../../src/jasmine.async.d.ts" />
/// <reference path="../../../lib/DefinitelyTyped/jasmine/jasmine.d.ts" />
/// <reference path="../../../lib/DefinitelyTyped/requirejs/require.d.ts" />
/*global jasmine:true, AsyncSpec:true, describe:true, it:true, expect:true, beforeEach:true, afterEach:true, spyOn:true, runs:true, waits:true, waitsFor:true */
(function () {
    'use strict';
    var thrust = require('thrust'), thrustMediator = require('thrust/mediator'), util = require('thrust/util'), m = require('thrust/capsule'), thrustInstance = require('thrust/instance'), when = util.when, _ = util._;
    describe('Mediator', function () {
        describe('Convention subscription', function () {
            var async = new AsyncSpec(this), result = {
                thrust: undefined,
                mediator: undefined
            };
            window['helpers'].launchThrustInstance(this, {
                async: false,
                conventions: [
                    'thrust/mediator/convention/subscription'
                ]
            }, result);
            var mod, module2, s1, s2, s3, s4, f2, s5a, s6a, s7a, s8a, s5b, s6b, s7b, s8b, os1, os2, os3a, os3b, os4a, os4b, os5, os6, os7a, os7b, os8a, os8b;
            var fakeContext = {
                fake: true
            };
            beforeEach(function () {
                s1 = jasmine.createSpy('s1');
                s2 = jasmine.createSpy('s2');
                s3 = jasmine.createSpy('s3');
                s4 = jasmine.createSpy('s4');
                s5a = jasmine.createSpy('s5a');
                s5b = jasmine.createSpy('s5b');
                s6a = jasmine.createSpy('s6a');
                s6b = jasmine.createSpy('s6b');
                s7a = jasmine.createSpy('s7a');
                s7b = jasmine.createSpy('s7b');
                s8a = jasmine.createSpy('s8a');
                s8b = jasmine.createSpy('s8b');
                os1 = jasmine.createSpy('os1');
                os2 = jasmine.createSpy('os2');
                os3a = jasmine.createSpy('os3a');
                os3b = jasmine.createSpy('os3b');
                os4a = jasmine.createSpy('os4a');
                os4b = jasmine.createSpy('os4b');
                os5 = jasmine.createSpy('os5');
                os6 = jasmine.createSpy('os6');
                os7a = jasmine.createSpy('os7a');
                os7b = jasmine.createSpy('os7b');
                os8a = jasmine.createSpy('os8a');
                os8b = jasmine.createSpy('os8b');
                mod = result.thrust.create('module-test1', {
                    name: 'module-test1',
                    init: util.noop,
                    destroy: util.noop,
                    event2: s2,
                    event4: s4,
                    event6a: s6a,
                    event6b: s6b,
                    event8a: s8a,
                    event8b: s8b,
                    osEvent2: os2,
                    osEvent4a: os4a,
                    osEvent4b: os4b,
                    osEvent6: os6,
                    osEvent8a: os8a,
                    osEvent8b: os8b,
                    config: {
                        mediator: {
                            subscriptions: {
                                'test-event1': s1,
                                'test-event2': 'event2',
                                'test-event3': [
                                    s3, 
                                    fakeContext
                                ],
                                'test-event4': [
                                    'event4', 
                                    fakeContext
                                ],
                                'test-event5': [
                                    [
                                        s5a
                                    ], 
                                    [
                                        s5b
                                    ]
                                ],
                                'test-event6': [
                                    [
                                        'event6a'
                                    ], 
                                    [
                                        'event6b'
                                    ]
                                ],
                                'test-event7': [
                                    [
                                        s7a, 
                                        fakeContext
                                    ], 
                                    [
                                        s7b, 
                                        fakeContext
                                    ]
                                ],
                                'test-event8': [
                                    [
                                        'event8a', 
                                        fakeContext
                                    ], 
                                    [
                                        'event8b', 
                                        fakeContext
                                    ]
                                ],
                                'os-event1': {
                                    handler: os1
                                },
                                'os-event2': {
                                    moduleHandler: 'osEvent2'
                                },
                                'os-event3': [
                                    {
                                        handler: os3a
                                    }, 
                                    {
                                        handler: os3b
                                    }
                                ],
                                'os-event4': [
                                    {
                                        moduleHandler: 'osEvent4a'
                                    }, 
                                    {
                                        moduleHandler: 'osEvent4b'
                                    }
                                ],
                                'os-event5': {
                                    handler: os5,
                                    context: fakeContext
                                },
                                'os-event6': {
                                    moduleHandler: 'osEvent6',
                                    context: fakeContext
                                },
                                'os-event7': [
                                    {
                                        handler: os7a,
                                        context: fakeContext
                                    }, 
                                    {
                                        handler: os7b,
                                        context: fakeContext
                                    }
                                ],
                                'os-event8': [
                                    {
                                        moduleHandler: 'osEvent8a',
                                        context: fakeContext
                                    }, 
                                    {
                                        moduleHandler: 'osEvent8b',
                                        context: fakeContext
                                    }
                                ]
                            }
                        }
                    }
                });
            });
            async.afterEach(function (done) {
                mod.stop().then(done);
            });
            it('should have striped subscription', function () {
                expect(mod.instance.config).not.toBeDefined();
            });
            async.it('should have created subscriptions', function (done) {
                mod.start().then(function () {
                    expect((mod.instance.mediator)._internalSubscriptions.length).toBe(24);
                    expect((mod.instance.mediator)._callbacks['test-event1']).toBeDefined();
                    expect((mod.instance.mediator)._callbacks['test-event2']).toBeDefined();
                    expect((mod.instance.mediator)._callbacks['test-event3']).toBeDefined();
                    expect((mod.instance.mediator)._callbacks['test-event4']).toBeDefined();
                    expect((mod.instance.mediator)._callbacks['test-event5']).toBeDefined();
                    expect((mod.instance.mediator)._callbacks['test-event6']).toBeDefined();
                    expect((mod.instance.mediator)._callbacks['test-event7']).toBeDefined();
                    expect((mod.instance.mediator)._callbacks['test-event8']).toBeDefined();
                    expect((mod.instance.mediator)._callbacks['os-event1']).toBeDefined();
                    expect((mod.instance.mediator)._callbacks['os-event2']).toBeDefined();
                    expect((mod.instance.mediator)._callbacks['os-event3']).toBeDefined();
                    expect((mod.instance.mediator)._callbacks['os-event4']).toBeDefined();
                    expect((mod.instance.mediator)._callbacks['os-event5']).toBeDefined();
                    expect((mod.instance.mediator)._callbacks['os-event6']).toBeDefined();
                    expect((mod.instance.mediator)._callbacks['os-event7']).toBeDefined();
                    expect((mod.instance.mediator)._callbacks['os-event8']).toBeDefined();
                    done();
                });
            });
            async.it('subscriptions function', function (done) {
                mod.start().then(function () {
                    mod.instance.mediator.fire('test-event1');
                    mod.instance.mediator.fire('test-event2');
                    mod.instance.mediator.fire('test-event3');
                    mod.instance.mediator.fire('test-event4');
                    mod.instance.mediator.fire('test-event5');
                    mod.instance.mediator.fire('test-event6');
                    mod.instance.mediator.fire('test-event7');
                    mod.instance.mediator.fire('test-event8');
                    mod.instance.mediator.fire('os-event1');
                    mod.instance.mediator.fire('os-event2');
                    mod.instance.mediator.fire('os-event3');
                    mod.instance.mediator.fire('os-event4');
                    mod.instance.mediator.fire('os-event5');
                    mod.instance.mediator.fire('os-event6');
                    mod.instance.mediator.fire('os-event7');
                    mod.instance.mediator.fire('os-event8');
                    expect(s1).toHaveBeenCalled();
                    expect(s1.callCount).toBe(1);
                    expect(s1.mostRecentCall.object).toBe(mod.instance);
                    expect(s2).toHaveBeenCalled();
                    expect(s2.callCount).toBe(1);
                    expect(s2.mostRecentCall.object).toBe(mod.instance);
                    expect(s3).toHaveBeenCalled();
                    expect(s3.callCount).toBe(1);
                    expect(s3.mostRecentCall.object).toBe(fakeContext);
                    expect(s4).toHaveBeenCalled();
                    expect(s4.callCount).toBe(1);
                    expect(s4.mostRecentCall.object).toBe(fakeContext);
                    expect(s5a).toHaveBeenCalled();
                    expect(s5a.callCount).toBe(1);
                    expect(s5a.mostRecentCall.object).toBe(mod.instance);
                    expect(s5b).toHaveBeenCalled();
                    expect(s5b.callCount).toBe(1);
                    expect(s5b.mostRecentCall.object).toBe(mod.instance);
                    expect(s6a).toHaveBeenCalled();
                    expect(s6a.callCount).toBe(1);
                    expect(s6a.mostRecentCall.object).toBe(mod.instance);
                    expect(s6b).toHaveBeenCalled();
                    expect(s6b.callCount).toBe(1);
                    expect(s6b.mostRecentCall.object).toBe(mod.instance);
                    expect(s7a).toHaveBeenCalled();
                    expect(s7a.callCount).toBe(1);
                    expect(s7a.mostRecentCall.object).toBe(fakeContext);
                    expect(s7b).toHaveBeenCalled();
                    expect(s7b.callCount).toBe(1);
                    expect(s7b.mostRecentCall.object).toBe(fakeContext);
                    expect(s8a).toHaveBeenCalled();
                    expect(s8a.callCount).toBe(1);
                    expect(s8a.mostRecentCall.object).toBe(fakeContext);
                    expect(s8b).toHaveBeenCalled();
                    expect(s8b.callCount).toBe(1);
                    expect(s8b.mostRecentCall.object).toBe(fakeContext);
                    expect(os1).toHaveBeenCalled();
                    expect(os1.callCount).toBe(1);
                    expect(os1.mostRecentCall.object).toBe(mod.instance);
                    expect(os2).toHaveBeenCalled();
                    expect(os2.callCount).toBe(1);
                    expect(os2.mostRecentCall.object).toBe(mod.instance);
                    expect(os3a).toHaveBeenCalled();
                    expect(os3a.callCount).toBe(1);
                    expect(os3a.mostRecentCall.object).toBe(mod.instance);
                    expect(os3b).toHaveBeenCalled();
                    expect(os3b.callCount).toBe(1);
                    expect(os3b.mostRecentCall.object).toBe(mod.instance);
                    expect(os4a).toHaveBeenCalled();
                    expect(os4a.callCount).toBe(1);
                    expect(os4a.mostRecentCall.object).toBe(mod.instance);
                    expect(os4b).toHaveBeenCalled();
                    expect(os4b.callCount).toBe(1);
                    expect(os4b.mostRecentCall.object).toBe(mod.instance);
                    expect(os5).toHaveBeenCalled();
                    expect(os5.callCount).toBe(1);
                    expect(os5.mostRecentCall.object).toBe(fakeContext);
                    expect(os6).toHaveBeenCalled();
                    expect(os6.callCount).toBe(1);
                    expect(os6.mostRecentCall.object).toBe(fakeContext);
                    expect(os7a).toHaveBeenCalled();
                    expect(os7a.callCount).toBe(1);
                    expect(os7a.mostRecentCall.object).toBe(fakeContext);
                    expect(os7b).toHaveBeenCalled();
                    expect(os7b.callCount).toBe(1);
                    expect(os7b.mostRecentCall.object).toBe(fakeContext);
                    expect(os8a).toHaveBeenCalled();
                    expect(os8a.callCount).toBe(1);
                    expect(os8a.mostRecentCall.object).toBe(fakeContext);
                    expect(os8b).toHaveBeenCalled();
                    expect(os8b.callCount).toBe(1);
                    expect(os8b.mostRecentCall.object).toBe(fakeContext);
                    done();
                });
            });
            async.it('subscriptions unsubscribe', function (done) {
                var seq = [
                    function () {
                        return mod.start();
                    }, 
                    function () {
                        return mod.stop();
                    }                ];
                when.sequence(seq).then(function () {
                    expect((mod.instance.mediator)._internalSubscriptions).toBeNull();
                    expect((mod.instance.mediator)._callbacks['test-event1']).not.toBeDefined();
                    expect((mod.instance.mediator)._callbacks['test-event2']).not.toBeDefined();
                    expect((mod.instance.mediator)._callbacks['test-event3']).not.toBeDefined();
                    expect((mod.instance.mediator)._callbacks['test-event4']).not.toBeDefined();
                    expect((mod.instance.mediator)._callbacks['test-event5']).not.toBeDefined();
                    expect((mod.instance.mediator)._callbacks['test-event6']).not.toBeDefined();
                    expect((mod.instance.mediator)._callbacks['test-event7']).not.toBeDefined();
                    expect((mod.instance.mediator)._callbacks['test-event8']).not.toBeDefined();
                    done();
                });
            });
            async.it('subscriptions unsubscribe properly with multiple modules', function (done) {
                var fakeContext2 = {
                    fake: true
                };
                module2 = result.thrust.create('module-test2', {
                    name: 'module-test2',
                    init: util.noop,
                    destroy: util.noop,
                    event2: s2,
                    event4: s4,
                    config: {
                        mediator: {
                            subscriptions: {
                                'test-event1': s1,
                                'test-event2': 'event2',
                                'test-event3': [
                                    s3, 
                                    fakeContext2
                                ],
                                'test-event4': [
                                    'event4', 
                                    fakeContext2
                                ]
                            }
                        }
                    }
                });
                var seq = [
                    function () {
                        return mod.start();
                    }, 
                    //_.bind(when.delay, undefined, 10),
                    function () {
                        return module2.start();
                    }, 
                    //_.bind(when.delay, undefined, 10),
                    function () {
                        return mod.stop();
                    }                ];
                when.sequence(seq).then(function () {
                    expect((mod.instance.mediator)._internalSubscriptions).toBeNull();
                    expect((module2.instance.mediator)._callbacks['test-event1']['module-test2']).toBeDefined();
                    expect((module2.instance.mediator)._callbacks['test-event2']['module-test2']).toBeDefined();
                    expect((module2.instance.mediator)._callbacks['test-event3']['module-test2']).toBeDefined();
                    expect((module2.instance.mediator)._callbacks['test-event4']['module-test2']).toBeDefined();
                    expect((mod.instance.mediator)._callbacks['test-event1']['module-test1']).not.toBeDefined();
                    expect((mod.instance.mediator)._callbacks['test-event2']['module-test1']).not.toBeDefined();
                    expect((mod.instance.mediator)._callbacks['test-event3']['module-test1']).not.toBeDefined();
                    expect((mod.instance.mediator)._callbacks['test-event4']['module-test1']).not.toBeDefined();
                    done();
                });
            });
        });
    });
})();
//@ sourceMappingURL=subscriptions.js.map
