module.exports = function (grunt)
{
    var requireSettings,
        _ = grunt.util._;
    function getRequireSettings(settings)
    {
        if (requireSettings == null)
        {
            var rs = grunt.file.read('./require.settings.js').toString();
            rs = rs.substring(rs.indexOf('({') + 1);
            rs = rs.substring(0, rs.lastIndexOf('})') + 1);
            var resultFn = new Function('return ' + rs);
            requireSettings = resultFn();
        }
        return _.merge(settings || {}, requireSettings)
    }

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        meta: {
            thrust: {
                scripts: 'thrust/**/*.js',
                typeScripts: 'thrust/**/*.ts'
            },
            tests: {
                thrustScripts: ['thrust/**/*.js', '!thrust.js', '!thrust/util.js'],
                scripts: ['test/**/*.js'],
            },
            buildTests: {
                scripts: ['build-test/**/*.js'],
            },
            requireSettings: getRequireSettings(),
            liDir: './lib'
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
                    template: './RequireJSRunner.tmpl',
                    templateOptions: {
                        requirejs: './' + requireSettings.paths.require + '.js',
                        requireConfig: getRequireSettings({ baseUrl: '' })
                    },
                }
            }
        },
        jshint: {
            thrust: {
                src: ['<%= meta.tests.scripts %>', ]
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
    //grunt.loadNpmTasks('grunt-amd-dist');
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
    grunt.loadNpmTasks('grunt-contrib-symlink');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-yuidoc');
    grunt.loadNpmTasks('grunt-typescript');
    //#endregion

    // Default task(s).
    grunt.registerTask('init', ['bower:install']);
    grunt.registerTask('default', ['typescript', 'bom', 'jshint', 'jasmine:thrust', 'jasmine:thrust:build', 'yuidoc', 'clean']);
}
