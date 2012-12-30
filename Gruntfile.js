module.exports = function (grunt)
{
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        meta: {
            thrust: {
                scripts: 'thrust/**/*.js',
                typeScripts: 'thrust/**/*.ts'
            },
            tests: {
                scripts: 'tests/**/*.js',
                typeScripts: 'tests/**/*.ts'
            },
            buildTests: {
                scripts: 'tests/**/*.js',
                typeScripts: 'tests/**/*.ts'
            },
            liDir: './lib'
        },
        bower: {
            install: {
                targetDir: '<%= meta.libDir %>',
                cleanup: false,
                install: true
            }
        },
        bom: {
            thrust: {
                src: [
                    'Gruntfile.js',
                    '<%= meta.thrust.scripts %>',
                ]
            }
        },
        clean: {
            build: [
                'build'
            ]
        },
        jasmine: {
            thrust: {
                src: [
                    '<%= meta.thrust.scripts %>'
                ]
            }
        },
        jshint: {
            thrust: {
                src: [
                    '<%= meta.tests.scripts %>',
                ]
            },
            options: {
                jshintrc: '.jshintrc'
            }
        },
        typescript: /*less: {
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
        {
            thrust: {
                src: [
                    '<%= meta.thrust.typeScripts %>'
                ],
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
                files: [
                    '<%= meta.thrust.typeScripts %>'
                ],
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
    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    //grunt.loadNpmTasks('grunt-amd-dist');
    grunt.loadNpmTasks('grunt-amd-doc');
    grunt.loadNpmTasks('grunt-benchmark');
    grunt.loadNpmTasks('grunt-bower-task');
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
    // Default task(s).
    grunt.registerTask('init', [
        'bower:install'
    ]);
    grunt.registerTask('default', [
        'typescript',
        'bom',
        'jshint',
        'yuidoc',
        'clean'
    ]);
}
