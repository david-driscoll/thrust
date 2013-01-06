/// <reference path="helpers/thrust.ts" />
/// <reference path="../src/thrust/interfaces/util/util.d.ts" />
/// <reference path="../src/thrust/interfaces/thrust.d.ts" />
/// <reference path="../lib/DefinitelyTyped/jasmine.async/jasmine.async.d.ts" />
/// <reference path="../lib/DefinitelyTyped/jasmine/jasmine-1.2.d.ts" />
/// <reference path="../lib/DefinitelyTyped/requirejs/require-2.1.d.ts" />

/*global jasmine:true, AsyncSpec:true, describe:true, it:true, expect:true, beforeEach:true, afterEach:true, spyOn:true, runs:true, waits:true, waitsFor:true */
(function ()
{
    'use strict';
    var convention = require('thrust/convention'),
        Convention = convention.Convention,
        util = require('thrust/util');

    describe('Convention', function ()
    {
        it('overloads methods', function ()
        {
            var newMethod = () => {};
            var c = new Convention({ start: () => { return null; }, deorbit: () => { return null; }, newMethod: newMethod });
            expect(c).toBeDefined();
            expect(c.start).not.toBe(Convention.prototype.start);
            expect(c.deorbit).not.toBe(Convention.prototype.deorbit);
            expect(c.newMethod).toBe(newMethod);
        });
    });
})()