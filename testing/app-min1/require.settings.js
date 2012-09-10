(function (require, undefined)
{
    'use strict';
    define.unordered = true;

    require.config({
        baseUrl: '../',
        paths: {
            //#region lib References
            'require': '../../lib/requirejs/require',         // Quick reference for requirejs
            'lodash': '../../lib/lodash/lodash',
            'aop': '../../lib/aop/aop',
            //#endregion
            //#region References for RequireJs
            'text': '../../lib/text/text',
            'i18n': '../../lib/i18n/i18n',
            'domReady': '../../lib/domReady/domReady',
            'jquery': '../../lib/jquery/jquery-1.8.1',
            'has': '../../lib/has/has',
            'knockout': '../../lib/knockout/build/output/knockout-latest.debug',
            'flatiron/director': '../../lib/director/build/director-1.1.6',
            //#endregion
        },
        packages: [
            { name: 'when', main: 'when', location: '../../lib/when' },
            { name: 'kob-model', location: '../../lib/kob-model/src' }
        ],
        config: {
            'thrust': {
                'test': 1
            }
        }
    });
})(require);
