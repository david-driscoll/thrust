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
            'text': '../lib/requirejs-text/text',
            'i18n': '../lib/requirejs-i18n/i18n',
            'domReady': '../lib/requirejs-domready/domReady',
            'doT': '../lib/doT/doT',
            'jquery': '../lib/jquery/jquery-1.8.1',
            'has': '../lib/has/has',
            'knockout': '../lib/knockout/build/output/knockout-latest.debug',
            'flatiron/director': '../lib/director/build/director-1.1.6',
            //#endregion
        },
        packages: [
            { name: 'thrust', location: '../thrust' },
            { name: 'thrust/util', location: '../thrust/util' },
            { name: 'thrust/mediator', location: '../thrust/mediator' },
            { name: 'thrust/data', location: '../thrust/data' },
            { name: 'thrust/dom', location: '../thrust/dom' },
            { name: 'thrust/template', location: '../thrust/template' },
            { name: 'thrust/spa', location: '../thrust/spa' },
            { name: 'when', main: 'when', location: '../lib/when' }
        ],
        shim: {
            'flatiron/director': { exports: 'Router' }
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
