﻿/// <reference path="../../helpers/thrust.ts" />
/// <reference path="../../../src/thrust/interfaces/util/util.d.ts" />
/// <reference path="../../../src/thrust/interfaces/thrust.d.ts" />
/// <reference path="../../../src/jasmine.async.d.ts" />
/// <reference path="../../../lib/DefinitelyTyped/jasmine/jasmine.d.ts" />
/// <reference path="../../../lib/DefinitelyTyped/requirejs/require.d.ts" />

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

            window['helpers'].launchThrustInstance(this, {
                async: false,
                conventions: ['thrust/convention/dependent.modules']
            }, result);

            // need to do tests that support async data nonsense... sigh
        });
    });
}();