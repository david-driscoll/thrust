/// <reference path="../../../src/thrust/interfaces/dom/dom.d.ts" />
/// <reference path="../../../src/thrust/interfaces/dom/convention/event.d.ts" />
/// <reference path="../../helpers/thrust.ts" />
/// <reference path="../../../src/thrust/interfaces/util/util.d.ts" />
/// <reference path="../../../src/thrust/interfaces/thrust.d.ts" />
/// <reference path="../../../lib/DefinitelyTyped/jasmine.async/jasmine.async.d.ts" />
/// <reference path="../../../lib/DefinitelyTyped/jasmine/jasmine-1.2.d.ts" />
/// <reference path="../../../lib/DefinitelyTyped/requirejs/require-2.1.d.ts" />

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

    describe('Thrust.Data', () => {
        describe('Data Convention dependent.modules start', function () {
            var async = new AsyncSpec(this),
                result = { thrust: <IThrust> undefined };

            var settings: IThrustConfig = {
                async: false,
                plugins: ['thrust/dom'],
                dom: {
                    conventions: ['thrust/dom/convention/event']
                }
            };
            window['helpers'].launchThrustInstance(this, settings, result);

            // need to do tests that support async data nonsense... sigh
            var mod: IThrustModuleInternal, s1, s2, s3, s4, f2, s5, s6, s7, s8, os1, os2, os3, os4, os5, os6, os7, os8;

            var fakeContext = { fake: true };
            beforeEach(() =>
            {
                s1 = jasmine.createSpy('s1');
                s2 = jasmine.createSpy('s2');
                s3 = jasmine.createSpy('s3');
                s4 = jasmine.createSpy('s4');
                s5 = jasmine.createSpy('s5');
                s6 = jasmine.createSpy('s6');
                s7 = jasmine.createSpy('s7');
                s8 = jasmine.createSpy('s8');
                os1 = jasmine.createSpy('os1');
                os2 = jasmine.createSpy('os2');
                os3 = jasmine.createSpy('os3');
                os4 = jasmine.createSpy('os4');
                os5 = jasmine.createSpy('os5');
                os6 = jasmine.createSpy('os6');
                os7 = jasmine.createSpy('os7');
                os8 = jasmine.createSpy('os8');

                mod = <IThrustModuleInternal> result.thrust.create('module-test1', {
                    name: 'module-test1',
                    init: util.noop,
                    destroy: util.noop,
                    action2: s2,
                    action4: s4,
                    action6: s6,
                    action8: s8,
                    oevent2: os2,
                    oevent4: os4,
                    oevent6: os6,
                    oevent8: os8,
                    config: {
                        dom: {
                            events: {
                                'click': <any[]>[
                                    [s1],
                                    ['action2'],
                                    ['a', s1],
                                    ['a', 'action2'],
                                    ['a', s1, fakeContext],
                                    ['a', 'action2', <any>fakeContext],
                                    [{ items: [] }, s1],
                                    [{ items: [] }, <any>'action2'],
                                    [{ items: [] }, s1, fakeContext],
                                    [{ items: [] }, 'action2', <any>fakeContext],
                                    ['a', { items: [] }, s1],
                                    ['a', <any>{ items: [] }, 'action2'],
                                    ['a', { items: [] }, s1, fakeContext],
                                    ['a', { items: [] }, 'action2', <any>fakeContext],
                                    [s1, fakeContext],
                                    ['action2', <any>fakeContext],
                                    { handler: s1 },
                                    { moduleHandler: 'action2' },
                                    { selector: 'a', handler: s1 },
                                    { selector: 'a', moduleHandler: 'action2' },
                                    { selector: 'a', handler: s1, context: fakeContext },
                                    { selector: 'a', moduleHandler: 'action2', context: fakeContext },
                                    { data: { items: [] }, handler: s1 },
                                    { data: { items: [] }, moduleHandler: 'action2' },
                                    { data: { items: [] }, handler: s1, context: fakeContext },
                                    { data: { items: [] }, moduleHandler: 'action2', context: fakeContext },
                                    { selector: 'a', data: { items: [] }, handler: s1 },
                                    { selector: 'a', data: { items: [] }, moduleHandler: 'action2' },
                                    { selector: 'a', data: { items: [] }, handler: s1, context: fakeContext },
                                    { selector: 'a', data: { items: [] }, moduleHandler: 'action2', context: fakeContext },
                                    { handler: s1, context: fakeContext },
                                    { moduleHandler: 'action2', context: fakeContext },
                                ],
                                'focus': { selector: 'a', data: { items: [] }, moduleHandler: 'action2', context: fakeContext },
                                'blur': ['a', { items: [] }, 'action2', <any>fakeContext],
                            }
                        }
                    }
                });
            });

            async.it('should have bound events and not had any errors', function (done) {
                mod.start().then(() => {
                    done();
                })
            });
        });
    });
} ();