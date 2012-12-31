/// <reference path="../lib/jasmine/lib/jasmine-1.3.1/jasmine.js" />

/*global jasmine:true, describe:true, it:true, expect:true, beforeEach:true, afterEach:true, spyOn:true, runs:true, waits:true, waitsFor:true */
(function ()
{
    'use strict';
    var convention = require('thrust/convention'),
        util = require('thrust/util');

    describe('Convention', function ()
    {
        it('creates', function ()
        {
            var c = new convention.Convention();
            expect(c).toBeDefined();
        });

        it('overloads methods', function ()
        {
            var c = new convention.Convention({ start: function () { }, deorbit: function () { } });
            expect(c).toBeDefined();
            expect(c.start).not.toBe(convention.Convention.prototype.start);
            expect(c.deorbit).not.toBe(convention.Convention.prototype.deorbit);
        });
    });
})()