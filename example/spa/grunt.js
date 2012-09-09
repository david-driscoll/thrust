/*global module:false*/
module.exports = function (grunt)
{
    grunt.loadNpmTasks('grunt-requirejs');
    grunt.loadNpmTasks('grunt-bom');

    var include = ['lodash',
                   'aop',
                   'knockout',
                   'text',
                   'i18n',
                   'domReady',
                   'jquery',
                   'doT',
                   'davis',
                   'backbone',
                   'thrust',
                   'thrust/util',
                   'thrust/mediator',
                   'thrust/data',
                   'thrust/dom',
                   'thrust/template',
                   'thrust/spa',
        ];


    // Project configuration.
    grunt.initConfig({
        pkg: '<json:package.json>',
        meta: {
            banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
              '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
              '<%= pkg.homepage ? "* " + pkg.homepage + "\n" : "" %>' +
              '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
              ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */'
        },
        bom: {
            main: {
                src: ['**/*.js']
            }
        },
        min: { example: { src: ['spa.example.compiled.js'], dest: 'spa.example.compiled.min.js' } },
        requirejs: {
            baseUrl: '.',
            out: 'spa.example.compiled.js',
            name: 'main',
            include: include.concat(['account.controls/account.controls', 'menu/menu', 'menu/side', 'ready']),
            optimize: 'none',
            pragmas: {
                doExclude: true
            },
            skipModuleInsertion: false,
            optimizeAllPluginResources: true,
            findNestedDependencies: true,
            paths: {
                'require': '../../lib/requirejs/require',         // Quick reference for requirejs
                'lodash': '../../lib/lodash/lodash',
                'underscore': '../../lib/lodash/lodash',
                'aop': '../../lib/aop/aop',
                'knockout': '../../lib/knockout/build/output/knockout-latest.debug',
                'text': '../../lib/text/text',
                'i18n': '../../lib/i18n/i18n',
                'domReady': '../../lib/domReady/domReady',
                'sizzle': '../../lib/sizzle/sizzle',
                'jquery': '../../lib/jquery/jquery-1.8.1',
                'doT': '../../lib/doT/doT',
                'davis': '../../lib/davis/davis',
                'backbone': '../../lib/backbone/backbone',
                'thrust': '../../dist/thrust.debug',
                'thrust/util': '../../dist/thrust.util.debug',
                'thrust/mediator': '../../dist/thrust.mediator.debug',
                'thrust/data': '../../dist/thrust.data.debug',
                'thrust/dom': '../../dist/thrust.dom.debug',
                'thrust/template': '../../dist/thrust.template.debug',
                'thrust/spa': '../../dist/thrust.spa.debug',
                'has': '../../lib/has/has',
                'showdown': '../../lib/showdown/compressed/showdown'
            },
            packages: [
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
            }
        }
    });

    // Default task.
    grunt.registerTask('default', 'bom requirejs:example min:example');

    // min task
    //grunt.registerTask('min', 'requirejs:thrust-util requirejs:thrust-util.min requirejs:thrust-min requirejs:thrust-mediator-min');
};
