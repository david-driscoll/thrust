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
            'jquery': '../lib/jquery/jquery',
            'has': '../lib/has/has',
            'knockout': '../lib/knockout/build/output/knockout-latest.debug',
            'flatiron/director': '../lib/director/build/director',
            //#endregion
            'thrust': '../build/thrust.debug',
            'thrust/util': '../build/thrust.debug',
            'thrust/mediator': '../build/thrust.debug',
            'thrust/data': '../build/thrust.data.debug',
            'thrust/dom': '../build/thrust.dom.debug',
            'thrust/template': '../build/thrust.template.debug',
            'thrust/spa': '../build/thrust.spa.debug',
        },
        packages: [
            { name: 'when', main: 'when', location: '../lib/when' }
        ],
        shim: {
            'flatiron/director': { exports: 'Router' }
        },
        has: {
            DEBUG: true
        },
        config: {
            'thrust/ignite': {
                'test': 1
            }
        }
    });

    require(['has'], function (has)
    {
        has.add('DEBUG', true);
    });
})(require);
