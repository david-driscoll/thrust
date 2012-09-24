require.config({
    shim: {
    },

    paths: {
        jquery: 'vendor/jquery.min',
        'thrust': 'vendor/thrust/thrust.min',
        'thrust/util': 'vendor/thrust/thrust.min', // Lives inside thrust.min
        'thrust/mediator': 'vendor/thrust/thrust.min', // Lives inside thrust.min
        'thrust/data': 'vendor/thrust/thrust.data.min',
        'thrust/template': 'vendor/thrust/thrust.template.min',
        'thrust/dom': 'vendor/thrust/thrust.dom.min',
        'domReady': 'vendor/domReady/domReady', // Required bth thrust
        'lodash': 'vendor/lodash/lodash', // Required by thrust
        'has': 'vendor/has/has', // Required by thrust
        'doT': 'vendor/doT/doT' // Required by thrust/template
    },

    packages: [
        { name: 'when', main: 'when', location: 'vendor/when' }, // Required by thrust
    ],

    config: {
        'thrust/config': {
            plugins: ['thrust/data', 'thrust/dom', 'thrust/template'],
            template: {
                conventions: ['thrust/template/convention/template']
            }
        }

    }
});

require(['app', 'thrust'], function (app, thrust)
{
    // use app here
    console.log(app);

    // Launch a default instance
    thrust.launch({
        plugins: ['thrust/data', 'thrust/dom', 'thrust/template'],
        // Tell thrust what modules we want to load by default.
        modules: ['module/sample.module', 'module/module.dom']
    });
});