/*global module:false*/
module.exports = function (grunt)
{
    grunt.loadNpmTasks('grunt-requirejs');
    grunt.loadNpmTasks('grunt-bom');
    grunt.loadNpmTasks('grunt-jasmine-task');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-bom');

    var extend = require('node.extend');

    var paths = {
        //#region lib References
        'require': 'lib/requirejs/require',
        'lodash': 'lib/lodash/lodash',
        //#endregion
        //#region References for RequireJs
        'text': 'lib/text/text',
        'i18n': 'lib/i18n/i18n',
        'domReady': 'lib/domReady/domReady',
        'doT': 'lib/doT/doT',
        'jquery': 'lib/jquery/jquery-1.8.1',
        'flatiron/director': 'lib/director/build/director-1.1.6',
        'has': 'lib/has/has',
        'backbone': 'lib/backbone/backbone',
        'knockout': 'lib/knockout/build/output/knockout-latest.debug',
        //#endregion
    };

    var packages = [
        { name: 'when', main: 'when', location: 'lib/when' },
        { name: 'kob-model', location: 'lib/kob-model/src' },
        { name: 'kob-model/simple', location: 'lib/kob-model/src/simple' },
        { name: 'kob-model/complex', location: 'lib/kob-model/src/complex' }
    ];

    var overallPackages = packages.concat([
        { name: 'thrust/util', location: 'src/util' },
        { name: 'thrust', location: 'src' },
        { name: 'thrust/mediator', location: 'src/mediator' },
        { name: 'thrust/data', location: 'src/data' },
        { name: 'thrust/dom', location: 'src/dom' },
        { name: 'thrust/template', location: 'src/template' },
        { name: 'thrust/spa', location: 'src/spa' },
    ]);

    var includedThrustModules = [
        'thrust/config',
        'thrust/convention',
        'thrust/events',
        'thrust/facade',
        'thrust/ignite',
        'thrust/log',
    ];

    var includedThrustModulePaths  ={};
    includedThrustModules.forEach(function(x) { includedThrustModulePaths[x] = 'build/thrust'; });

    includedThrustModulePaths['thrust'] = 'build/thrust';
    includedThrustModulePaths['thrust/util'] = 'build/thrust';
    includedThrustModulePaths['thrust/mediator'] = 'build/thrust';

    var thrustModules = [
        'when',
        'thrust',
        'thrust/util',
        'knockout',
        /*'kob-model',
        'kob-model/simple',
        'kob-model/complex',*/
    ].concat(includedThrustModules);

    var requireJsSettings = {},
        concatSettings = {},
        minSettings = {},
        overallInclude = ['when'];

    var buildRequireJsSettings = function (name, fileType, settings)
    {
        var settingName = name.replace(/\./g, '_');
        if (settings.exclude)
        {
            overallInclude = overallInclude.concat(settings.exclude.filter(function (x) { return !overallInclude.some(function (z) { return z === x; }); }));
        }
        if (settings.include)
        {
            overallInclude = overallInclude.concat(settings.include.filter(function (x) { return !overallInclude.some(function (z) { return z === x; }); }));
        }

        var base = {};
        if (fileType !== 'debug')
            base.has = { DEBUG: false };

        return (requireJsSettings[settingName + (fileType ? '_' + fileType : '')] = extend(base, {
            //dir: 'build',
            //appDir: 'src',
            baseUrl: '.',
            name: name.replace(/\./g, '/'),
            out: 'build/' + name + (fileType ? '.' + fileType : '') + '.js',
            optimize: 'none',
            exclude: settings.exclude || [],
            include: settings.include || [],
            paths: extend(settings.paths || {}, paths),
            packages: (settings.packages || []).concat(packages),
            shim: {
                'flatiron/director': { exports: 'Router' }
            },
            pragmas: {
                doExclude: true
            },
            skipModuleInsertion: false,
            optimizeAllPluginResources: true,
            findNestedDependencies: true
        }));
    };

    var buildConcatSettings = function (name, settings)
    {
        return extend({}, {
            src: ['<banner:meta.banner>']
                .concat(settings.preConcat || [])
                .concat(['build/' + name + (settings.fileType ? '.' + settings.fileType : '') + '.js'])
                .concat(settings.postConcat || []),
            dest: (settings.fileType !== 'debug' ? 'build' : 'dist') + '/' + name + (settings.fileType ? '.' + settings.fileType : '') + '.js'
        });
    };

    var buildPluginSettings = function (name, settings)
    {
        var settingName = settings.settingsName || name.replace(/\./g, '_');
        buildRequireJsSettings(name, 'debug', settings);
        concatSettings[settingName + '_debug'] = buildConcatSettings(name, extend({ fileType: 'debug' }, settings));

        buildRequireJsSettings(name, false, settings);
        concatSettings[settingName] = buildConcatSettings(name, settings);

        minSettings[settingName] = {
            src: ['<banner:meta.banner>', '<config:concat.' + settingName + '.dest>'],
            dest: 'dist/' + name + '.min.js'
        };
        grunt.registerTask(settingName + '_debug', 'requirejs:' + settingName + '_debug concat:' + settingName + '_debug');
        grunt.registerTask(settingName + '_release', 'requirejs:' + settingName + ' concat:' + settingName + ' min:' + settingName);
        grunt.registerTask(settingName, 'requirejs:' + settingName + '_debug concat:' + settingName + '_debug requirejs:' + settingName + ' concat:' + settingName + ' min:' + settingName);
    };

    // debug
    // release
    // release-min

    buildPluginSettings('thrust', {
        packages: [
            { name: 'thrust', location: 'src' },
            { name: 'thrust/util', location: 'src/util' },
            { name: 'thrust/mediator', location: 'src/mediator' },
        ],
        exclude: [
            'when',
            'lodash',
        ],
        include: includedThrustModules.concat([
            'thrust/mediator',
            'thrust/mediator/convention/autostart',
            'thrust/mediator/convention/container',
            'thrust/mediator/convention/dependant.modules',
            'thrust/mediator/convention/subscription',
        ]),
    });

    buildPluginSettings('thrust.data', {
        paths: includedThrustModulePaths,
        packages: [
            { name: 'thrust/data', location: 'src/data' },
        ],
        include: [
            'thrust/data/convention/start',
        ],
        exclude: ['jquery'].concat(thrustModules),
    });

    buildPluginSettings('thrust.dom', {
        paths: includedThrustModulePaths,
        packages: [
            { name: 'thrust/dom', location: 'src/dom' },
        ],
        include: [
            'thrust/dom/convention/action',
            'thrust/dom/convention/context',
            'thrust/dom/convention/event',
            //'thrust/dom/convention/page.ready',
        ],
        exclude: ['jquery'].concat(thrustModules),
    });

    buildPluginSettings('thrust.template', {
        paths: extend({ 'thrust/data': 'build/thrust.data' }, includedThrustModulePaths),
        packages: [
            { name: 'thrust/template', location: 'src/template' },
        ],
        include: [
            'thrust/template/convention/template',
            'thrust/template/convention/knockout.engine',
        ],
        exclude: ['thrust/data', 'doT', 'jquery'].concat(thrustModules),
    });

    buildPluginSettings('thrust.spa', {
        paths: includedThrustModulePaths,
        packages: [
            { name: 'thrust/spa', location: 'src/spa' },
        ],
        include: [
            'thrust/spa/convention/start',
        ],
        exclude: [].concat(thrustModules),
    });

    requireJsSettings['integrated'] = {
        baseUrl: '.',
        name: 'thrust',
        out: 'dist/thrust.integrated.js',
        optimize: 'none',
        include: overallInclude.concat(overallPackages.map(function (x) { return x.name; })),
        paths: paths,
        packages: overallPackages,
        shim: {
            'flatiron/director': { exports: 'Router' }
        },
        pragmas: {
            doExclude: true
        },
        skipModuleInsertion: false,
        optimizeAllPluginResources: true,
        findNestedDependencies: true
    };

    var pkg = require('./package.json'),
        fs = require('fs'),
        yuiConfig = {
        name: pkg.title || pkg.name,
        description: pkg.description || pkg.title || pkg.name,
        version: pkg.version,
        url: pkg.homepage ? pkg.homepage : 'h',
        options: {
            'linkNatives': true,
            'attributesEmit': true,
            'selleck': true,
            'paths': ['./src'],
            'outdir': './docs',
            'exclude': 'test,plugins,dist,build,lib,node_modules,example',
        }
    };

    fs.writeFileSync('./yuidoc.json', JSON.stringify(yuiConfig));

    // Project configuration.
    grunt.initConfig({
        pkg: '<json:package.json>',
        meta: {
            banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
              '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
              '<%= pkg.homepage ? "* " + pkg.homepage + "\n" : "" %>' +
              '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
              ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */',
        },
        lint: {
            files: [
                'grunt.js',
                'src/*.js',
                'src/lib/*.js',
                'src/mediator/**/*.js',
                'src/data/**/*.js',
                'src/dom/**/*.js',
                'src/template/**/*.js',
                'src/spa/**/*.js',
            ]
        },
        bom: {
            files: [
                'grunt.js',
                'src/**/*.js',
            ]
        },
        jasmine: {
            all: {
                src: ['test-runners/**/*.html'],
                errorReporting: true,
            }
        },
        concat: extend({
            all: {
                src: [
                    '<config:concat.thrust.dest>',
                    '<config:concat.thrust_data.dest>',
                    '<config:concat.thrust_dom.dest>',
                    '<config:concat.thrust_template.dest>',
                    '<config:concat.thrust_spa.dest>',
                ],
                dest: 'dist/thrust.all.js',
            }
        }, concatSettings),
        min: extend({
            all: {
                src: ['<banner:meta.banner>', '<config:concat.all.dest>'],
                dest: 'dist/thrust.all.min.js',
            },
            integrated: {
                src: ['<banner:meta.banner>', 'dist/thrust.integrated.js'],
                dest: 'dist/thrust.integrated.min.js',
            }
        }, minSettings),
        watch: {
            files: '<config:lint.files>',
            tasks: 'bom lint jasmine'
        },
        requirejs: requireJsSettings,
        jshint: {
            options: {
                // Settings
                'passfail': false,  // Stop on first error.
                'maxerr': 10000,    // Maximum error before stopping.

                // Predefined globals whom JSHint will ignore.
                'browser': true,   // Standard browser globals e.g. `window`, `document`.
                'node': false,
                'rhino': false,
                'couch': false,
                'wsh': true,   // Windows Scripting Host.

                'jquery': false,
                'prototypejs': false,
                'mootools': false,
                'dojo': false,

                // Development.
                'debug': false,  // Allow debugger statements e.g. browser breakpoints.
                'devel': true,   // Allow developments statements e.g. `console.log();`.

                // ECMAScript 5.
                'es5': true,   // Allow ECMAScript 5 syntax.
                'strict': false,  // Require `use strict` pragma  in every file.
                'globalstrict': false,  // Allow global "use strict" (also enables 'strict').

                // The Good Parts.
                'asi': false,  // Tolerate Automatic Semicolon Insertion (no semicolons).
                'laxbreak': true,  // Tolerate unsafe line breaks e.g. `return [\n] x` without semicolons.
                'bitwise': true,   // Prohibit bitwise operators (&, |, ^, etc.).
                'boss': true,  // Tolerate assignments inside if, for & while. Usually conditions & loops are for comparison, not assignments.
                'curly': false,  // Require {} for every new block or scope.
                'eqnull': true,  // Tolerate use of `== null`.
                'eqeqeq': false,  // Require triple equals i.e. `===`.
                'evil': false,  // Tolerate use of `eval`.
                'expr': true,  // Tolerate `ExpressionStatement` as Programs.
                'forin': false,  // Tolerate `for in` loops without `hasOwnPrototype`.
                'immed': false,   // Require immediate invocations to be wrapped in parens e.g. `( function(){}() );`
                'latedef': false,   // Prohipit variable use before definition.
                'loopfunc': false,  // Allow functions to be defined within loops.
                'noarg': true,   // Prohibit use of `arguments.caller` and `arguments.callee`.
                'regexp': false,   // Prohibit `.` and `[^...]` in regular expressions.
                'regexdash': false,  // Tolerate unescaped last dash i.e. `[-...]`.
                'scripturl': true,   // Tolerate script-targeted URLs.
                'shadow': true,  // Allows re-define variables later in code e.g. `var x=1; x=2;`.
                'supernew': false,  // Tolerate `new function () { ... };` and `new Object;`.
                'undef': true,   // Require all non-global variables be declared before they are used.

                // Personal styling preferences.
                'newcap': true,   // Require capitalization of all constructor functions e.g. `new F()`.
                'noempty': true,   // Prohibit use of empty blocks.
                'nonew': true,   // Prohibit use of constructors for side-effects.
                'nomen': false,   // Prohibit use of initial or trailing underbars in names.
                'onevar': false,  // Allow only one `var` statement per function.
                'plusplus': false,  // Prohibit use of `++` & `--`.
                'sub': true,  // Tolerate all forms of subscript notation besides dot notation e.g. `dict['key']` instead of `dict.key`.
                'trailing': true,   // Prohibit trailing whitespaces.
                'white': false,   // Check against strict whitespace and indentation rules.
                'indent': 4       // Specify indentation spacing
            },
            globals: {
                define: true,
                require: true,
            }
        },
        shell: {
            yuidoc: {
                command: 'yuidoc -c ./yuidoc.json',
                stdout: true
            },
        },
        uglify: {}
    });

    // Default task.
    grunt.registerTask('debug', 'bom lint jasmine thrust_debug thrust_data_debug thrust_dom_debug thrust_template_debug thrust_spa_debug');

    grunt.registerTask('default', 'bom lint jasmine thrust thrust_data thrust_dom thrust_template thrust_spa concat:all min:all shell:yuidoc');

    grunt.registerTask('integrated', 'bom default requirejs:integrated min:integrated');

    // min task
    //grunt.registerTask('min', 'requirejs:thrust-util requirejs:thrust-util.min requirejs:thrust-min requirejs:thrust-mediator-min');
};
