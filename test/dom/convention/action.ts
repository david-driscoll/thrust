/// <reference path="../../../src/thrust/dom/convention/action.ts" />
/// <reference path="../../../src/thrust/interfaces/dom/dom.d.ts" />
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

    describe('Thrust.Dom', () => {
        describe('Convention action', function () {
            var async = new AsyncSpec(this),
                result = { thrust: <IThrust> undefined };

            var settings : IThrustConfig = {
                async: false,
                plugins: ['thrust/dom'],
                dom: {
                    conventions: ['thrust/dom/convention/action']
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
                            actions: {
                                'click': <any[]>[
                                    ['test-action1', s1],
                                    ['test-action2', 'action2'],
                                    ['test-action3', s3, fakeContext],
                                    ['test-action4', 'action4', <any>fakeContext],
                                    {
                                        name: 'test-action5',
                                        handler: s5,
                                    }, {
                                        name: 'test-action6',
                                        moduleHandler: 'action6',
                                    }, {
                                        name: 'test-action7',
                                        handler: s7,
                                        context: fakeContext
                                    }, {
                                        name: 'test-action8',
                                        handler: 'action8',
                                        context: fakeContext
                                    }
                                ],
                                'dblclick': {
                                    name: 'otest-action3',
                                    handler: os3,
                                },
                                'focus': {
                                    name: 'otest-action4',
                                    moduleHandler: 'oevent4',
                                },
                                'mouseenter': ['test-oaction1', os1],
                                'mouseleave': ['test-oaction2', 'oevent2'],
                            }
                        }
                    }
                });
            });

            async.it('should have created actions', function (done) {
                mod.start().then(() => {
                    var actionHandler = result.thrust.dom.actionHandler;
                    expect(_.size(actionHandler.events['click'])).toBe(8);
                    expect(_.size(actionHandler.events['dblclick'])).toBe(1);
                    expect(_.size(actionHandler.events['focus'])).toBe(1);
                    expect(_.size(actionHandler.events['mouseenter'])).toBe(1);
                    expect(_.size(actionHandler.events['mouseleave'])).toBe(1);
                    done();
                })
            });
        });
    });
} ();