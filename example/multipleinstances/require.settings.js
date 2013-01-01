(function (require, undefined)
{
    'use strict';
    define.unordered = true;

    var debug = true;

    require.config({
        //baseUrl: 'example/spa',
        paths: {
            //#region lib References
            'require': '../../lib/requirejs/require',
            'lodash': '../../lib/lodash/lodash',
            //#endregion
            //#region References for RequireJs
            'text': '../../lib/requirejs-text/text',
            'i18n': '../../lib/requirejs-i18n/i18n',
            'domReady': '../../lib/requirejs-domready/domReady',
            'doT': '../../lib/doT/doT',
            'jquery': '../../lib/jquery/jquery',
            'flatiron/director': '../../lib/director/build/director',
            'has': '../../lib/has/has',
            'backbone': '../../lib/backbone/backbone',
            'knockout': '../../lib/knockout/build/output/knockout-latest.debug',
            //#endregion 
        },
        packages: [
            /*{ name: 'thrust', location: '../../thrust' },
            { name: 'thrust/util', location: '../../thrust/util' },
            { name: 'thrust/mediator', location: '../../thrust/mediator' },
            { name: 'thrust/data', location: '../../thrust/data' },
            { name: 'thrust/dom', location: '../../thrust/dom' },
            { name: 'thrust/template', location: '../../thrust/template' },
            { name: 'thrust/spa', location: '../../thrust/spa' },*/
            { name: 'when', main: 'when', location: '../../lib/when' },
            /*{ name: 'kob-model', location: '../../lib/kob-model/src' },
            { name: 'kob-model/simple', location: '../../lib/kob-model/src/simple' },
            { name: 'kob-model/complex', location: '../../lib/kob-model/src/complex' }*/
        ],
        shim: {
            'flatiron/director': { exports: 'Router' },
            'showdown': {
                exports: 'Showdown'
            },
            'backbone': {
                deps: ['lodash', 'jquery'],
                exports: 'Backbone'
            }
        },
        has: {
            DEBUG: true
        },
        config: {
            'thrust/ignite': {
                url: {
                    path: '/example/multipleinstances'
                },
                plugins: [
                    'thrust/dom'
                ],
                data: {
                    startTimeout: 0
                },
                modules: []
            }
        }
    });

    require(['has'], function (has)
    {
        has.add('DEBUG', true);

        require(['main']);
    });
    //require(['spa.example.compiled'], function () { require(['main']); });
})(require);
