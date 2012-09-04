/// <reference path="../lib/jasmine/jasmine.js" />
/// <reference path="../lib/requirejs/require.js" />
/// <reference path="./require.test.settings.js" />

(function (require, undefined)
{
    /*global jasmine:true, describe:true, it:true, expect:true, beforeEach:true, afterEach:true, spyOn:true, runs:true, waits:true, waitsFor:true */
    'use strict';
    require(['thrust/module', 'thrust', 'thrust/convention', 'thrust/util'],
    function (Module, Thrust, Convention, util)
    {
        describe('Module', function ()
        {
            var t, c1, c2, s1, s2;
            beforeEach(function ()
            {
                t = new Thrust('global');

                c1 = new Convention({
                    properties: ['prop1']
                });
                spyOn(c1, 'create');

                c2 = new Convention({
                    properties: ['prop2']
                });
                spyOn(c2, 'create');

                t.__conventions = [c1, c2];
            });

            it('should throw errors for missing required methods', function ()
            {
                expect(function () { new Module(t, {}); }).toThrow('All Modules must have a name!');
                expect(function () { new Module(t, {}, 'myName'); }).toThrow('Required "init" method not found on module "myName"!');
                expect(function () { new Module(t, { name: 'myName' }); }).toThrow('Required "init" method not found on module "myName"!');
                expect(function () { new Module(t, { init: util.noop }, 'myName'); }).toThrow('Required "destroy" method not found on module "myName"!');
                expect(function () { new Module(t, { init: util.noop, name: 'myName' }); }).toThrow('Required "destroy" method not found on module "myName"!');
            });

            it('extracts custom convention properties', function ()
            {
                var d = {
                    init: util.noop,
                    destroy: util.noop,
                    name: 'myName',
                    prop1: 'myValue',
                    prop2: 3
                };
                var e = util.extend({}, d);
                var m = new Module(t, d);

                expect(d.prop1).not.toBeDefined();
                expect(d.prop2).not.toBeDefined();

                expect(m.convention('prop1')).toEqual(e.prop1);
                expect(m.convention('prop2')).toEqual(e.prop2);
            });
        });

        jasmine.getEnv().execute();
    });
})(require);