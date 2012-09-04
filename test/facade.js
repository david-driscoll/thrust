/// <reference path="../lib/jasmine/jasmine.js" />
/// <reference path="../lib/requirejs/require.js" />
/// <reference path="./require.test.settings.js" />

(function (require, undefined)
{
    /*global jasmine:true, describe:true, it:true, expect:true, beforeEach:true, afterEach:true, spyOn:true, runs:true, waits:true, waitsFor:true */
    'use strict';
    require(['thrust/facade', 'thrust/convention', 'thrust/util'],
    function (Facade, Convention, util)
    {
        describe('Facade', function ()
        {
            var f, c1, c2;
            beforeEach(function ()
            {
                c1 = new Convention();
                spyOn(c1, 'init');
                spyOn(c1, 'start');
                spyOn(c1, 'stop');
                spyOn(c1, 'ready');
                spyOn(c1, 'destroy');

                c2 = new Convention();
                spyOn(c2, 'init');
                spyOn(c2, 'start');
                spyOn(c2, 'stop');
                spyOn(c2, 'ready');
                spyOn(c2, 'destroy');

                f = Facade.createFacade(function ()
                {
                    this.__conventions = [c1, c2];
                });
            });

            it('invokes init conventions', function ()
            {
                var ff = new f();
                ff.init();

                expect(c1.init).toHaveBeenCalled();
                expect(c2.init).toHaveBeenCalled();
            });

            it('invokes start conventions', function ()
            {
                var ff = new f();
                ff.start();

                expect(c1.start).toHaveBeenCalled();
                expect(c2.start).toHaveBeenCalled();
            });

            it('invokes ready conventions', function ()
            {
                var ff = new f();
                ff.ready();

                expect(c1.ready).toHaveBeenCalled();
                expect(c2.ready).toHaveBeenCalled();
            });

            it('invokes stop conventions', function ()
            {
                var ff = new f();
                ff.stop();

                expect(c1.stop).toHaveBeenCalled();
                expect(c2.stop).toHaveBeenCalled();
            });

            it('invokes destroy conventions', function ()
            {
                var ff = new f();
                ff.destroy();

                expect(c1.destroy).toHaveBeenCalled();
                expect(c2.destroy).toHaveBeenCalled();
            });
        });

        jasmine.getEnv().execute();
    });
})(require);