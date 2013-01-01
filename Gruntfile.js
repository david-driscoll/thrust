module.exports = function (grunt)
{
    var helpers = require('./zgrunt/helpers'),
        _ = grunt.util._,
        requireSettings = helpers.getRequireSettings(grunt);

    var metadata = {
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                    '<%= grunt.template.today("yyyy-mm-dd") %> */',
        libraryExclusions: _.keys(requireSettings.paths).concat(['when', 'when/debug', 'when/apply', 'when/delay', 'when/timeout', 'when/parallel', 'when/pipeline', 'when/sequence', 'when/cancelable']),
        thrust: {
            fileVersionFormat: '.<%= pkg.version %>',
            scripts: 'src/thrust/**/*.js',
            typeScripts: 'src/thrust/**/*.ts',
            inclusions: [
                'src/thrust/*.js',
                '!src/thrust/util.js',
                '!src/thrust/main.js',
                /*'thrust/mediator',
                'src/thrust/mediator/*.js',
                'src/thrust/mediator/convention/*.js',*/
            ],
            mainExclusions: ['!src/thrust/**/*main.*'],
            mainInclusions: ['src/thrust/**/*main.*'],
            pluginExclusions: ['thrust/util', 'src/thrust/*.js'],
            plugin: {
                mediator: {
                    inclusions: [
                        'src/thrust/mediator/*.js',
                        'src/thrust/mediator/convention/*.js',
                    ],
                    exclusions: []
                },
                data: {
                    inclusions: [
                        'src/thrust/data/*.js',
                        'src/thrust/data/convention/*.js',
                    ],
                    exclusions: []
                },
                dom: {
                    inclusions: [
                        'src/thrust/dom/*.js',
                        'src/thrust/dom/convention/*.js',
                    ],
                    exclusions: []
                },
                template: {
                    inclusions: [
                        'src/thrust/template/*.js',
                        'src/thrust/template/convention/*.js',
                    ],
                    exclusions: []
                },
                spa: {
                    inclusions: [
                        'src/thrust/spa/*.js',
                        'src/thrust/spa/convention/*.js',
                    ],
                    exclusions: []
                }
            }
        },
        tests: {
            thrustScripts: ['src/thrust/**/*.js', '!src/thrust.js', '!src/thrust/util.js'],
            scripts: ['test/**/*.js'],
            //specFile: 'TestRunner.html',
        },
        buildTests: {
            scripts: ['test-build/**/*.js'],
        },
        requireSettings: requireSettings,
        liDir: './lib'
    };

    metadata.thrust.inclusions.push(metadata.thrust.mainExclusions);
    _.each(metadata.thrust.plugin, function (x)
    {
        x.inclusions.push.apply(x.inclusions, metadata.thrust.mainExclusions);
        x.exclusions.push.apply(x.exclusions, metadata.thrust.pluginExclusions);
    });

    var bomConfig = {
        thrust: {
            src: [
                'Gruntfile.js',
                '<%= meta.thrust.scripts %>',
            ]
        }
    };

    var cleanConfig = {
        build: ['build'],
        dist: ['dist'],
        'require.settings': ['require.settings-*.js']
    };

    var copyConfig = {
    };

    var concatConfig = {
        options: {
            banner: metadata.banner,
        },
        debug: {
            files: helpers.buildCopyPaths(grunt, metadata, true, 'debug/'),
            options: {
                stripBanners: false,
            }
        },
        release: {
            files: helpers.buildCopyPaths(grunt, metadata, true, null, metadata.thrust.fileVersionFormat),
            options: {
                stripBanners: true,
            }
        },
        'debug-integrated': {
            files: helpers.buildCopyPaths(grunt, metadata, true, 'debug/', '.all', true),
            options: {
                stripBanners: false,
            }
        },
        'release-integrated': {
            files: helpers.buildCopyPaths(grunt, metadata, true, null, '.all' + metadata.thrust.fileVersionFormat, true),
            options: {
                stripBanners: true,
            }
        }
    };

    var uglifyConfig = {
        options: {
            banner: metadata.banner,
            options: {
                sourceMap: '.',
            }
        },
        release: {
            files: helpers.buildUglifyPaths(grunt, metadata, null, metadata.thrust.fileVersionFormat)
        },
        'release-integrated': {
            files: helpers.buildUglifyPaths(grunt, metadata, null, '.all' + metadata.thrust.fileVersionFormat, true)
        }
    };


    var jasmineGetSettingsMethod = function (from) { return helpers.getRequireSettingsFrom(grunt, from); },
        buildVBOptions = function (type)
        {
            return {
                src: ['<%= meta.tests.thrustScripts %>'],
                options: {
                    specs: ['<%= meta.buildTests.scripts %>', '<%= meta.tests.scripts %>'],
                    //outfile: '<%= meta.buildTests.debugSpecFile %>',
                    templateOptions: {
                        requirejs: './src/' + requireSettings.paths.require + '.js',
                        requireConfig: './require.settings-' + type + '-test.js',
                        loadSettings: jasmineGetSettingsMethod,
                    },
                }
            }
        };

    var jasmineConfig = {
        options: {
            template: './zgrunt/RequireJSRunner.tmpl',
        },
        thrust: {
            src: ['<%= meta.tests.thrustScripts %>'],
            options: {
                specs: '<%= meta.tests.scripts %>',
                templateOptions: {
                    requirejs: './src/' + requireSettings.paths.require + '.js',
                    requireConfig: helpers.getRequireSettings(grunt, { baseUrl: './src/' })
                },
            }
        },
        'vb-debug': buildVBOptions('debug'),
        'vb-release': buildVBOptions('release'),
        'vb-release-min': buildVBOptions('release-min'),
        'vb-debug-integrated': buildVBOptions('debug-integrated'),
        'vb-release-integrated': buildVBOptions('release-integrated'),
        'vb-release-min-integrated': buildVBOptions('release-integrated-min'),
    };

    var jshintConfig = {
        thrust: {
            src: ['<%= meta.thrust.scripts %>', '<%= meta.tests.scripts %>', '<%= meta.buildTests.scripts %>']
        },
        options: {
            jshintrc: '.jshintrc',
        }
    };

    var rjsConfig = (function ()
    {
        var c = helpers.getRequireSettings(grunt);
        return _.merge({}, c, {
            appDir: './src',
            //mainConfigFile: ,
            baseUrl: '.',
            dir: 'build',
            optimize: 'none',
            preserveLicenseComments: true,
            useSourceUrl: false,
            has: {
                DEBUG: false
            },
        });
    })();

    var integratedInclusions = metadata.thrust.inclusions
                .concat(_.flatten(_.pluck(metadata.thrust.plugin, 'inclusions')))
                .concat(_.keys(metadata.thrust.plugin).map(function (x) { return 'thrust/' + x; }));
    helpers.expandFileArrays(grunt,
        helpers.getRelativeDir(rjsConfig.appDir, rjsConfig.baseUrl))(integratedInclusions);

    var requirejsConfig = {
        debug: {
            options: _.merge({}, rjsConfig, {
                modules: helpers.makeModules(grunt, './src', metadata, {
                    exclude: metadata.libraryExclusions,
                    override: {
                        generateSourceMaps: false,
                        preserveLicenseComments: true,
                        has: {
                            DEBUG: true
                        },
                    }
                }),
            })
        },
        release: {
            options: _.merge({}, rjsConfig, {
                modules: helpers.makeModules(grunt, './src', metadata, {
                    exclude: metadata.libraryExclusions,
                }),
            })
        },
        'debug-integrated': {
            options: _.merge({}, rjsConfig, {
                modules: [{
                    name: 'thrust',
                    include: integratedInclusions,
                    exclude: ['jquery'],
                    override: {
                        generateSourceMaps: false,
                        preserveLicenseComments: true,
                        has: {
                            DEBUG: true
                        },
                    }
                }],
            })
        },
        'release-integrated': {
            options: _.merge({}, rjsConfig, {
                modules: [{
                    name: 'thrust',
                    include: integratedInclusions,
                    exclude: ['jquery'],
                    override: {},
                }],
            })
        },
    };

    var typescriptConfig = {
        thrust: {
            src: ['<%= meta.thrust.typeScripts %>'],
            dest: '.',
            options: {
                module: 'amd',
                target: 'es3',
                sourcemap: true,
                compiler: //base_path: '.'
                {
                    styleSettings: {
                    },
                    propagateConstants: false,
                    emitComments: true
                }
            }
        }
    };

    var watchConfig = {
        scripts: {
            files: ['<%= meta.thrust.typeScripts %>'],
            tasks: [
                'typescript',
                'bom',
                'jshint'
            ],
            options: {
                interrupt: true
            }
        }
    };

    var yuidocConfig = {
        compile: {
            name: '<%= pkg.name %>',
            description: '<%= pkg.description %>',
            version: '<%= pkg.version %>',
            url: '<%= pkg.homepage %>',
            options: {
                linkNatives: true,
                attributesEmit: true,
                selleck: true,
                extension: '.tsdoc',
                paths: [
                    "./build/doc/src/thrust"
                ],
                outdir: "./docs",
                exclude: "test,plugins,dist,build,lib,node_modules,example"
            }
        }
    }

    //#region Config
    var gruntConfig = {
        pkg: grunt.file.readJSON('package.json'),
        meta: metadata,
        bom: bomConfig,
        copy: copyConfig,
        concat: concatConfig,
        clean: cleanConfig,
        jasmine: jasmineConfig,
        jshint: jshintConfig,
        requirejs: requirejsConfig,
        typescript: typescriptConfig,
        uglify: uglifyConfig,
        watch: watchConfig,
        yuidoc: yuidocConfig,
        jsdocextract: {
            thrust: {
                src: metadata.thrust.typeScripts,
                dest: 'build/doc',
            }
        }
    };

    grunt.initConfig(gruntConfig);
    //#endregion

    //#region Tasks
    grunt.registerTask('build-test-settings', 'Rebuilds test settings js files', function ()
    {
        helpers.buildTestRequireSettings(grunt, metadata);
    });

    grunt.registerTask('build-test-integrated-settings', 'Rebuilds test settings js files', function ()
    {
        helpers.buildTestRequireSettings(grunt, metadata, true);
    });

    grunt.registerTask('build-example-settings', 'Creates or Updates the example settings files.', function ()
    {
        helpers.buildExampleSettings(grunt, metadata);
    });


    grunt.registerMultiTask('jsdocextract', '', function ()
    {
        debugger;
        var options = this.options({}),
            r = /(\/\*\*[\s\S]*?\*\*\/)/gi,
            dest = this.file.dest;

        this.file.src.forEach(function (x)
        {
            var file = grunt.file.read(x).toString();
            var result = null,
                fileResult = '';

            while ((result = r.exec(file)))
            {
                fileResult += result[1] + '\n';
            }

            grunt.verbose.writeln(fileResult);

            grunt.file.write(dest + '/' + x + 'doc', fileResult);
        });
    });
    //#endregion

    //#region Plugins
    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-benchmark');
    //grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-bom');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-yuidoc');
    grunt.loadNpmTasks('grunt-typescript');
    //#endregion

    // Build our release scripts (excludes logging, etc)
    grunt.registerTask('release', [
        'requirejs:release', // compile require js for release mode
        'concat:release', // move and add our header to the file.
        'uglify:release', // minify the files
        'clean:build' // clean up the build dir
    ]);

    // Build our debug scripts (includes logging, etc)
    grunt.registerTask('debug', [
        'requirejs:debug', // compile require js for debug mode
        'concat:debug', // move and add our header to the file
        'clean:build' // clean up the build dir
    ]);

    // Build our release integrated scripts (identical to release, except this also integrats any third party libraries)
    // One exception is this does not integrate jQuery, and jQuery is a dependency currently for thrust/data and thrust/dom
    grunt.registerTask('release-integrated', [
        'requirejs:release-integrated', // compile require js for release mode
        'concat:release-integrated', // move and add our header to the file.
        'uglify:release-integrated', // minify the files
        'clean:build' // clean up the build dir
    ]);

    // Build our debug integrated scripts (identical to debug, except this also integrats any third party libraries)
    // One exception is this does not integrate jQuery, and jQuery is a dependency currently for thrust/data and thrust/dom
    grunt.registerTask('debug-integrated', [
        'requirejs:debug-integrated', // compile require js for debug mode
        'concat:debug-integrated', // move and add our header to the file
        'clean:build' // clean up the build dir
    ]);

    // Build our docs
    grunt.registerTask('docs', [
        'jsdocextract', // Extract jsdoc comments into their own file
        'yuidoc',  // process the doc comments
        'clean:build' // we drop the jsdocs in the build folder, clean that up now
    ]);

    // Validate our builds
    // We want to make sure that nothing was lost in translation between compiling with r.js and minifying with uglify.
    grunt.registerTask('validate-build', [
        'build-test-settings', // compile our config settings file, based off the common settings file.
        'jasmine:vb-debug', // Valdiate our debug build pass our build tests and our normal test suite.
        'jasmine:vb-release', // Valdiate our release build pass our build tests and our normal test suite.
        'jasmine:vb-release-min' // Valdiate our release minified build pass our build tests and our normal test suite.
    ]);

    // Validate our builds
    // We want to make sure that nothing was lost in translation between compiling with r.js and minifying with uglify.
    grunt.registerTask('validate-build-integrated', [
        'build-test-integrated-settings', // compile our config settings file, based off the common settings file.
        'jasmine:vb-debug-integrated', // Valdiate our debug build pass our build tests and our normal test suite.
        'jasmine:vb-release-integrated', // Valdiate our release build pass our build tests and our normal test suite.
        'jasmine:vb-release-min-integrated' // Valdiate our release minified build pass our build tests and our normal test suite.
    ]);

    // Validate the code
    grunt.registerTask('code-validation', [
        'typescript', // Compile all type script module
        'bom', // watch for boms (when using VS 2012)
        'jshint', // check for linting
        'jasmine:thrust' // run unit tests against base code
    ]);
    // Potentially integrate test runners so they always persist.  Right not easy enought to run the proper jasmine call from the console.
    //grunt.registerTask('jasmine-build-runners', ['jasmine:thrust:build', 'jasmine:vb-debug:build', 'jasmine:vb-release:build', 'jasmine:vb-release-min:build']);

    // Default task(s).
    grunt.registerTask('__default-partial__', ['debug', 'release'])
    grunt.registerTask('default', ['clean:dist', '__default-partial__', 'docs']);

    grunt.registerTask('__integrated-partial__', ['debug-integrated', 'release-integrated'])
    grunt.registerTask('integrated', ['code-validation', '__integrated-partial__']);

    // by default we don't build or test integrated.
    // full should be run though before every push, just as a sanity check.
    // integrated before default to hand a strange exception from r.js
    grunt.registerTask('full', ['clean:dist', 'code-validation', '__integrated-partial__', '__default-partial__', 'validate-build', 'validate-build-integrated', 'build-example-settings', 'clean:require.settings', 'docs']);
}
