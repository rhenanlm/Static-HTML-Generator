'use strict';
module.exports = function (grunt) {

    // Carregamos todas as tasks
    require('load-grunt-tasks')(grunt);

    // Show elapsed time
    require('time-grunt')(grunt);

    // JsFiles
    var jsFileList = [
        'assets/vendor/bootstrap/js/transition.js',
        'assets/vendor/bootstrap/js/alert.js',
        'assets/vendor/bootstrap/js/button.js',
        'assets/vendor/bootstrap/js/carousel.js',
        'assets/vendor/bootstrap/js/collapse.js',
        'assets/vendor/bootstrap/js/dropdown.js',
        'assets/vendor/bootstrap/js/modal.js',
        'assets/vendor/bootstrap/js/tooltip.js',
        'assets/vendor/bootstrap/js/popover.js',
        'assets/vendor/bootstrap/js/scrollspy.js',
        'assets/vendor/bootstrap/js/tab.js',
        'assets/vendor/bootstrap/js/affix.js',
        'assets/js/main.js'
    ];

    grunt.initConfig({
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                'Gruntfile.js',
                'assets/js/*.js',
                '!assets/js/scripts.js',
                '!assets/**/*.min.*'
            ]
        },

        less: {
            dev: {
                files: {
                    'public/v01/r/css/main.css': [
                        'assets/less/main.less'
                    ]
                },
                options: {
                    compress: false,
                    // LESS source map
                    // To enable, set sourceMap to true and update sourceMapRootpath based on your install
                    sourceMap: true,
                    sourceMapFilename: 'main.css.map',
                    sourceMapRootpath: ''
                }
            },
            build: {
                files: {
                    'public/v01/r/css/main.min.css': [
                        'assets/less/main.less'
                    ]
                },
                options: {
                    compress: true
                }
            }
        },

        sprite: {
            all: {
                algorithm: 'binary-tree',
                src: 'public/v01/r/sprites/*.png',
                destImg: 'public/v01/r/sprites.' + (new Date().getTime()) + '.png',
                destCSS: 'assets/less/_sprites.less',
                cssFormat: 'less',
                imgPath: '../sprites.' + (new Date().getTime()) + '.png'
            }
        },

        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: [jsFileList],
                dest: 'public/v01/r/js/scripts.js'
            }
        },

        uglify: {
            dist: {
                files: {
                    'public/v01/r/js/scripts.min.js': [jsFileList]
                }
            }
        },

        modernizr: {
            build: {
                devFile: 'assets/vendor/modernizr/modernizr.js',
                outputFile: 'assets/js/vendor/modernizr.min.js',
                files: {
                    'src': [
                        ['public/v01/r/js/scripts.min.js'],
                        ['public/v01/r/css/main.min.css']
                    ]
                },
                extra: {
                    shiv: false
                },
                uglify: true,
                parseFiles: true
            }
        },

        copy: {
            main: {
                files: [
                    // includes files within path
                    {
                        expand: true,
                        src: ['assets/vendor/jquery/dist/jquery.min.js'],
                        dest: 'public/v01/r/js/',
                        flatten: true,
                        filter: 'isFile'
                    },
                    {
                        expand: true,
                        src: ['assets/vendor/bootstrap/dist/fonts/*'],
                        dest: 'public/v01/r/fonts/',
                        flatten: true,
                        filter: 'isFile'
                    }
                ]
            }
        },

        ejs_static: {
            preview: {
                options: {
                    dest: 'public/v01',
                    path_to_data: 'templates/v01/data/data.json',
                    path_to_layouts: 'templates/v01/layouts',
                    index_page: 'home',
                    parent_dirs: false,
                    underscores_to_dashes: true,
                    file_extension: '.html',
                    helpers: [
                        'templates/v01/helper_functions.js'
                    ]
                }
            }
        },

        clean: {
            dist: [
                'public/v01/r/sprites.*.png'
            ]
        },

        watch: {
            less: {
                files: [
                    'assets/less/*.less',
                    'assets/less/**/*.less'
                ],
                tasks: ['less:dev']
            },
            js: {
                files: [
                    jsFileList,
                    '<%= jshint.all %>'
                ],
                tasks: ['jshint', 'concat']
            },
            sprite: {
                files: [
                    'public/v01/r/sprites/*.png'
                ],
                tasks: ['clean', 'sprite']
            },
            ejs_static: {
                files: [
                    'templates/v01/**/*.ejs',
                    'templates/v01/**/*.json'
                ],
                tasks: ['ejs_static']
            }
        }
    });

    // Register tasks
    grunt.registerTask('default', [
        'dev'
    ]);
    grunt.registerTask('dev', [
        'jshint',
        'clean',
        'copy',
        'sprite',
        'less:dev',
        'concat',
        'ejs_static'
    ]);
    grunt.registerTask('build', [
        'jshint',
        'clean',
        'copy',
        'sprite',
        'less:build',
        'uglify',
        'modernizr',
        'ejs_static'
    ]);

};
