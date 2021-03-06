﻿(function (require, undefined)
{
    'use strict';
    define.unordered = true;

    require.config({
        //baseUrl: '../../',
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
            'flatiron/director': '../../lib/director/build/director-1.1.6',
            'has': '../../lib/has/has',
            'backbone': '../../lib/backbone/backbone'
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
            /*{ name: 'kob-model', location: '../../lib/kob-model/src' },
            { name: 'kob-model/simple', location: '../../lib/kob-model/src/simple' },
            { name: 'kob-model/complex', location: '../../lib/kob-model/src/complex' }*/
],
        shim: {
            'flatiron/director': { exports: 'Router' }
        },
        config: {
            'thrust': {
                'test': 1,
                spa: {
                    routes: {
                        'local': 'body-module-1',
                        'home': 'body-module-2'
                    }
                }
            }
        }
    });
})(require);
