/// <reference path="../lib/jasmine/lib/jasmine-1.3.1/jasmine.js" />
/// <reference path="../lib/requirejs/require.js" />
/// <reference path="./require.test.settings.js" />

(function (require, undefined)
{
    /*global jasmine:true, describe:true, it:true, expect:true, beforeEach:true, afterEach:true, spyOn:true, runs:true, waits:true, waitsFor:true */
    'use strict';
    describe('Thrust', function ()
    {
        it('build file loads', function ()
        {
            var flag = false;
            runs(function ()
            {
                require(['thrust'], function ()
                {
                    flag = true;
                });
            });

            waitsFor(function ()
            {
                return flag;
            }, 'Thrust did not load', 1000);
        });
    });

    describe('Thrust Util', function ()
    {
        it('build file loads', function ()
        {
            var flag = false;
            runs(function ()
            {
                require(['thrust/util'], function ()
                {
                    flag = true;
                });
            });

            waitsFor(function ()
            {
                return flag;
            }, 'Thrust Util did not load', 1000);
        });
    });

    describe('Thrust Mediator', function ()
    {
        it('build file loads', function ()
        {
            var flag = false;
            runs(function ()
            {
                require(['thrust/mediator'], function ()
                {
                    flag = true;
                });
            });

            waitsFor(function ()
            {
                return flag;
            }, 'Thrust Mediator did not load', 1000);
        });
    });

    describe('Thrust Data', function ()
    {
        it('build file loads', function ()
        {
            var flag = false;
            runs(function ()
            {
                require(['thrust/data'], function ()
                {
                    flag = true;
                });
            });

            waitsFor(function ()
            {
                return flag;
            }, 'Thrust Data did not load', 1000);
        });
    });

    describe('Thrust Dom', function ()
    {
        it('build file loads', function ()
        {
            var flag = false;
            runs(function ()
            {
                require(['thrust/dom'], function ()
                {
                    flag = true;
                });
            });

            waitsFor(function ()
            {
                return flag;
            }, 'Thrust Dom did not load', 1000);
        });
    });

    describe('Thrust Template', function ()
    {
        it('build file loads', function ()
        {
            var flag = false;
            runs(function ()
            {
                require(['thrust/template'], function ()
                {
                    flag = true;
                });
            });

            waitsFor(function ()
            {
                return flag;
            }, 'Thrust Template did not load', 1000);
        });
    });

    describe('Thrust SPA', function ()
    {
        it('build file loads', function ()
        {
            var flag = false;
            runs(function ()
            {
                require(['thrust/spa'], function ()
                {
                    flag = true;
                });
            });

            waitsFor(function ()
            {
                return flag;
            }, 'Thrust SPA did not load', 1000);
        });
    });

    //jasmine.getEnv().execute();

})(require);