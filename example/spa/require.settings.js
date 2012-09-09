(function (require, undefined)
{
    'use strict';
    define.unordered = true;

    var debug = true;

    require.config({
        //baseUrl: 'example/spa',
        paths: {
            //#region lib References
            'require': '../../lib/requirejs/require',         // Quick reference for requirejs
            'lodash': '../../lib/lodash/lodash',
            'underscore': '../../lib/lodash/lodash',
            'aop': '../../lib/aop/aop',
            'knockout': '../../lib/knockout/build/output/knockout-latest.debug',
            //#endregion
            //#region References for RequireJs
            'text': '../../lib/text/text',
            'i18n': '../../lib/i18n/i18n',
            'domReady': '../../lib/domReady/domReady',
            'sizzle': '../../lib/sizzle/sizzle',
            'jquery': '../../lib/jquery/jquery-1.8.1',
            'doT': '../../lib/doT/doT',
            'davis': '../../lib/davis/davis',
            'has': '../../lib/has/has',
            'backbone': '../../lib/backbone/backbone',
            'module/index/main': 'module/index',
            'showdown': '../../lib/showdown/compressed/showdown'
            //#endregion
        },
        packages: [
            { name: 'thrust', location: '../../src' },
            { name: 'thrust/util', location: '../../src/util' },
            { name: 'thrust/mediator', location: '../../src/mediator' },
            { name: 'thrust/data', location: '../../src/data' },
            { name: 'thrust/dom', location: '../../src/dom' },
            { name: 'thrust/template', location: '../../src/template' },
            { name: 'thrust/spa', location: '../../src/spa' },
            { name: 'when', main: 'when', location: '../../lib/when' },
            { name: 'kob-model', location: '../../lib/kob-model/src' },
            { name: 'kob-model/simple', location: '../../lib/kob-model/src/simple' },
            { name: 'kob-model/complex', location: '../../lib/kob-model/src/complex' }
        ],
        shim: {
            'davis': {
                deps: ['jquery'],
                exports: 'Davis'
            },
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
                    path: '/example/spa'
                },
                data: {
                    startTimeout: 0
                },
                modules: [
                    'account.controls/account.controls',
                    'menu/menu',
                    'menu/side',
                    'ready',
                ],
                spa: {
                    routes: {
                        '/': 'module/home',
                        '/:path': 'module/:path'
                    }
                }
            }
        }
    });

    var load = requirejs.load;
    requirejs.load = function (context, moduleId, url)
    {
        if (moduleId.indexOf('module/') === 0 && moduleId.indexOf('/') === 6 && moduleId.indexOf('index') !== moduleId.length - 5 && moduleId.indexOf('alert') !== moduleId.length - 5)
        {
            url = url.replace(moduleId, moduleId + '/main');
        }
        return load(context, moduleId, url);
    };

    require(['has'], function (has)
    {
        has.add('DEBUG', true);

        require(['main']);
    });
    //require(['spa.example.compiled'], function () { require(['main']); });
})(require);
