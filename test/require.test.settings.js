(function (require, undefined)
{
    'use strict';
    define.unordered = true;

    require.config({
        //baseUrl: '../../',
        paths: {
            //#region lib References
            'require': '../lib/requirejs/require',         // Quick reference for requirejs
            'lodash': '../lib/lodash/lodash',
            'aop': '../lib/aop/aop',
            //#endregion
            //#region References for RequireJs
            'text': '../lib/text/text',
            'i18n': '../lib/i18n/i18n',
            'domReady': '../lib/domReady/domReady',
            'doT': '../lib/doT/doT',
            'jquery': '../lib/jquery/dist/jquery',
            'has': '../lib/has/has',
            'knockout': '../lib/knockout/build/output/knockout-latest.debug',
            'davis': '../lib/davis/davis',
            //#endregion
        },
        packages: [
            { name: 'thrust', location: '../src' },
            { name: 'thrust/util', location: '../src/util' },
            { name: 'thrust/mediator', location: '../src/mediator' },
            { name: 'thrust/data', location: '../src/data' },
            { name: 'thrust/dom', location: '../src/dom' },
            { name: 'thrust/template', location: '../src/template' },
            { name: 'thrust/spa', location: '../src/spa' },
            { name: 'when', main: 'when', location: '../lib/when' }
        ],
        shim: {
            'davis': {
                deps: ['jquery'],
                exports: 'Davis'
            }
        },
        has: {
            DEBUG: false
        },
        config: {
            'thrust': {
                'test': 1
            }
        }
    });

    require(['has'], function (has)
    {
        has.add('DEBUG', false);
    });
})(require);
