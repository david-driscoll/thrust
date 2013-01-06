require.config({
    baseUrl: './src',
    paths: {
        'require': '../lib/requirejs/require',
        'lodash': '../lib/lodash/lodash',
        'text': '../lib/requirejs-text/text',
        'i18n': '../lib/requirejs-i18n/i18n',
        'domReady': '../lib/requirejs-domready/domReady',
        'doT': '../lib/doT/doT',
        'jquery': '../lib/jquery/jquery',
        'flatiron/director': '../lib/director/build/director',
        'has': '../lib/has/has',
        'backbone': '../lib/backbone/backbone',
        'knockout': '../lib/knockout/build/output/knockout-latest.debug',
    },
    packages: [
        { name: 'when', main: 'when', location: '../lib/when' },
        { name: 'thrust/util', location: 'thrust/util' },
        { name: 'thrust', location: 'thrust' },
        { name: 'thrust/mediator', location: 'thrust/mediator' },
        { name: 'thrust/data', location: 'thrust/data' },
        { name: 'thrust/dom', location: 'thrust/dom' },
        { name: 'thrust/template', location: 'thrust/template' },
        { name: 'thrust/spa', location: 'thrust/spa' },
    ],
    shim: {
        'flatiron/director': { exports: 'Router' }
    },
})