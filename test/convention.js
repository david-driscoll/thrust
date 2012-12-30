/// <reference path="../lib/DefinitelyTyped/jasmine/jasmine-1.2.d.ts" />
/// <reference path="../lib/jasmine/jasmine.js" />
/// <reference path="../lib/requirejs/require.js" />
/// <reference path="./require.test.settings.js" />

/*global jasmine:true, describe:true, it:true, expect:true, beforeEach:true, afterEach:true, spyOn:true, runs:true, waits:true, waitsFor:true */
'use strict';
require(['thrust/convention', 'thrust/util'],
function (convention, util)
{
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

    jasmine.getEnv().execute();
});
