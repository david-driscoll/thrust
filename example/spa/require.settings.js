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
            'knockout.mapping': '../../lib/knockout.mapping/build/output/knockout.mapping-latest.debug',
            //#endregion
            //#region References for RequireJs
            'text': '../../lib/requirejs-text/text',
            'i18n': '../../lib/requirejs-i18n/i18n',
            'domReady': '../../lib/requirejs-domready/domReady',
            'sizzle': '../../lib/sizzle/sizzle',
            'jquery': '../../lib/jquery/jquery',
            'doT': '../../lib/doT/doT',
            'flatiron/director': '../../lib/director/build/director',
            'has': '../../lib/has/has',
            'backbone': '../../lib/backbone/backbone',
            'showdown': '../../lib/showdown/compressed/showdown'
            //#endregion
        },
        packages: [
            { name: 'thrust', location: '../../thrust' },
            { name: 'thrust/util', location: '../../thrust/util' },
            { name: 'thrust/mediator', location: '../../thrust/mediator' },
            { name: 'thrust/data', location: '../../thrust/data' },
            { name: 'thrust/dom', location: '../../thrust/dom' },
            { name: 'thrust/template', location: '../../thrust/template' },
            { name: 'thrust/spa', location: '../../thrust/spa' },
            { name: 'when', main: 'when', location: '../../lib/when' },
            /*{ name: 'kob-model', location: '../../lib/kob-model/thrust' },
            { name: 'kob-model/simple', location: '../../lib/kob-model/thrust/simple' },
            { name: 'kob-model/complex', location: '../../lib/kob-model/thrust/complex' }*/
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
                    path: '/example/spa'
                },
                data: {
                    startTimeout: 0
                },
                plugins: [
                    'thrust/data',
                    'thrust/dom',
                    'thrust/template',
                    'thrust/spa'
                ],
                modules: [
                    'account.controls/account.controls',
                    'menu/menu',
                    'menu/side',
                    'ready',
                ],
                spa: {
                    params: {
                        'path': /(.*?)\.html/i
                    },
                    routes: {
                        '/': 'module/index',
                        '/:path': 'module/:path'
                    }
                }
            }
        }
    });

    var load = requirejs.load;
    requirejs.load = function (context, moduleId, url)
    {
        if (moduleId.indexOf('module/') === 0 && moduleId.indexOf('/') === 6 && moduleId.indexOf('alert') !== moduleId.length - 5)
        {
            url = url.replace(moduleId, moduleId.replace('.html', '') + '/main');
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
