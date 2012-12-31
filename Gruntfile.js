module.exports = function (grunt)
{
    var helpers = require('./zgrunt/helpers'),
        _ = grunt.util._,
        requireSettings = helpers.getRequireSettings(grunt);

    var metadata = {
        exclusions: ['when', 'lodash'],
        thrust: {
            scripts: 'src/thrust/**/*.js',
            typeScripts: 'src/thrust/**/*.ts',
            includedModules: [
                'src/thrust/*.js',
                '!src/thrust/util.js',
                '!src/thrust/main.js'
            ],
            mainExclusions: ['!src/thrust/**/*main.*'],
        },
        tests: {
            thrustScripts: ['src/thrust/**/*.js', '!src/thrust.js', '!src/thrust/util.js'],
            scripts: ['test/**/*.js'],
        },
        buildTests: {
            scripts: ['build-test/**/*.js'],
        },
        requireSettings: requireSettings,
        liDir: './lib'
    };
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        meta: metadata,
        doc: {
            //globbing-supported String or Array of Strings with gruntfile-relative
            //files to process for documentation
            include: 'src/deferreds/**/*.js',

            //directory to output generated HTML (default = 'doc/out')
            out: 'doc/out',

            //directory to store jsdoc cache (default = 'doc/cache')
            cache: 'doc/cache',

            //directory to look for markdown mixins (default = 'doc/mixin')
            mixin: 'doc/mixin',

            //github URL where source is available. the file path and line number of
            //each documented variable will be added to this to make source links.
            repoview: 'https://github.com/zship/deferreds.js/blob/develop/',

            //Array of Type (see tasks/doc/Types.js) objects to transform into links
            //when used as parameter types, return types, or description namepaths
            types: (function ()
            {
                var types = [];

                //make all built-in types link to their MDN pages
                ['Number', 'String', 'Object', 'Function', 'Array', 'RegExp', 'Boolean'].forEach(function (val)
                {
                    types.push({
                        name: val,
                        link: 'https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/' + val
                    });
                });

                types.push({
                    name: 'Any',
                    link: 'https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects'
                });

                types.push({
                    name: 'void',
                    link: 'https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/undefined'
                });

                types.push({
                    name: 'Element',
                    link: 'https://developer.mozilla.org/en-US/docs/DOM/element'
                });

                types.push({
                    name: 'Constructor',
                    link: 'https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Object/constructor'
                });

                types.push({
                    name: 'jQuery',
                    link: 'http://api.jquery.com/jQuery/'
                });

                types.push({
                    name: 'require',
                    link: 'http://requirejs.org/'
                });

                types.push({
                    //any name matching this RegExp (with name.search()) will be given
                    //the following link
                    regexp: /amd-utils\/.*/,
                    link: 'http://millermedeiros.github.com/amd-utils/'
                });

                return types;
            })()
        },
        /*bower: {
            install: {
                targetDir: '<%= meta.libDir %>',
                cleanup: false,
                install: true
            }
        },*/
        bom: {
            thrust: {
                src: [
                    'Gruntfile.js',
                    '<%= meta.thrust.scripts %>',
                ]
            }
        },
        clean: {
            build: ['build']
        },
        jasmine: {
            thrust: {
                src: ['<%= meta.tests.thrustScripts %>'],
                options: {
                    specs: '<%= meta.tests.scripts %>',
                    template: './zgrunt/RequireJSRunner.tmpl',
                    templateOptions: {
                        requirejs: './' + requireSettings.paths.require + '.js',
                        requireConfig: helpers.getRequireSettings(grunt, { baseUrl: './src/' })
                    },
                }
            }
        },
        jshint: {
            thrust: {
                src: ['<%= meta.thrust.scripts %>', '<%= meta.tests.scripts %>', '<%= meta.buildTests.scripts %>']
            },
            options: {
                jshintrc: '.jshintrc',
            }
        },
        /*less: {
            development: {
            options: {
            paths: ["assets/css"]
            },
            files: {
            "path/to/result.css": "path/to/source.less"
            }
            },
            production: {
            options: {
            paths: ["assets/css"],
            yuicompress: true
            },
            files: {
            "path/to/result.css": "path/to/source.less"
            }
            }
            },*/
        requirejs: {
            thrust: {
                options: {
                    //appDir: './src',
                    mainConfigFile: './require.settings.js',
                    //baseUrl: './',
                    dir: './dist',
                    skipDirOptimize: false,
                    keepBuildDir: true,
                    optimize: 'uglify2',
                    uglify2: {},
                    useStrict: true,
                    preserveLicenseComments: false,
                    generateSourceMaps: false, // RCA including typescript source maps
                    useSourceUrl: true,
                    has: {
                        DEBUG: false
                    },
                    modules: [
                        {
                            // Build thrust will all it's default modules
                            // Also include mediator, if a new mediator implementation comes around this may need to be customized later.
                            // This will also implcitly incude thrust/util
                            name: 'thrust',
                            exclude: metadata.exclusions,
                            include: metadata.thrust.includedModules.concat([
                                'thrust/mediator/*.js',
                                'thrust/mediator/convention/*.js',
                            ]).concat(metadata.thrust.mainExclusions),
                            override: {
                                out: 'dist/thrust.js',
                                optimize: 'none',
                                preserveLicenseComments: true,
                                has: {
                                    DEBUG: true
                                },
                            }
                        },
                        {
                            name: 'thrust',
                            exclude: metadata.exclusions,
                            include: metadata.thrust.includedModules.concat([
                                'thrust/mediator/*.js',
                                'thrust/mediator/convention/*.js',
                            ]).concat(metadata.thrust.mainExclusions),
                            override: {
                                out: 'dist/thrust.min.js',
                            },
                        },
                    ],
                }
            }
        },
        typescript: {
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
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            dist: {
                src: 'src/<%= pkg.name %>.js',
                dest: 'dist/<%= pkg.name %>.min.js'
            }
        },
        watch: {
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
        },
        yuidoc: {
            compile: {
                name: '<%= pkg.name %>',
                description: '<%= pkg.description %>',
                version: '<%= pkg.version %>',
                url: '<%= pkg.homepage %>',
                options: {
                    linkNatives: true,
                    attributesEmit: true,
                    selleck: true,
                    paths: [
                        "./thrust"
                    ],
                    outdir: "./docs",
                    exclude: "test,plugins,dist,build,lib,node_modules,example"
                }
            }
        }
    });

    //#region Plugins
    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-amd-doc');
    grunt.loadNpmTasks('grunt-benchmark');
    //grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-bom');
    grunt.loadNpmTasks('grunt-contrib-build');
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

    // Default task(s).
    grunt.registerTask('init', ['bower:install']);
    grunt.registerTask('default', ['typescript', 'bom', 'jshint', 'jasmine:thrust', 'jasmine:thrust:build', 'requirejs:thrust', 'yuidoc', 'clean']);
}
