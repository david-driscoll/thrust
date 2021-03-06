/// <reference path="../../src/thrust/interfaces/util/util.d.ts" />
/// <reference path="../../src/thrust/interfaces/thrust.d.ts" />
/// <reference path="../../src/jasmine.async.d.ts" />
/// <reference path="../../lib/DefinitelyTyped/jasmine/jasmine.d.ts" />
/// <reference path="../../lib/DefinitelyTyped/requirejs/require.d.ts" />
/*global jasmine:true, AsyncSpec:true, describe:true, it:true, expect:true, beforeEach:true, afterEach:true, spyOn:true, runs:true, waits:true, waitsFor:true */
(function (global) {
    'use strict';
    if(!global.helpers) {
        global.helpers = {
        };
    }
    global.helpers.launchThrustInstance = function (self, settings, resultObject, doneEarly) {
        var has = require('has').add('DEBUG', false);
        var exports = {
        }, thrust = require('thrust'), Thrust = thrust.Thrust, util = require('thrust/util'), _ = util._, thrustMediator = require('thrust/mediator'), thrustInstance = require('thrust/instance');
        var async = new AsyncSpec(self), t;
        async.beforeEach(function (done) {
            resultObject.promise = Thrust.launch(_.extend({
            }, settings)).then(function (instance) {
                _.keys(instance).forEach(function (x) {
                    resultObject[x] = instance[x];
                });
                if(!doneEarly) {
                    done();
                }
            });
            if(doneEarly) {
                done();
            }
        });
        afterEach(function () {
            thrustInstance.clearCache();
        });
    };
})(this);
//@ sourceMappingURL=thrust.js.map
