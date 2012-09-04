/// <reference path="../lib/jasmine/jasmine.js" />
/// <reference path="../lib/requirejs/require.js" />
/// <reference path="./require.test.settings.js" />

(function (require, undefined)
{
    /*global jasmine:true, describe:true, it:true, expect:true, beforeEach:true, afterEach:true, spyOn:true, runs:true, waits:true, waitsFor:true */
    'use strict';
    require(['thrust/convention', 'thrust/util'],
    function (Convention, util)
    {
        describe('Convention', function ()
        {
            it('creates', function ()
            {
                var c = new Convention();
                expect(c).toBeDefined();
            });

            it('overloads methods', function ()
            {
                var c = new Convention({ start: function () { }, deorbit: function () { } });
                expect(c).toBeDefined();
                expect(c.start).not.toBe(Convention.fn.start);
                expect(c.deorbit).not.toBe(Convention.fn.deorbit);
            });
        });

        jasmine.getEnv().execute();
    });
})(require);