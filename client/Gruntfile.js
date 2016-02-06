module.exports = function(grunt) {

    // Load Grunt tasks declared in the package.json file.
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    // Get argument from command line
    var releaseVersion = "0.0.1";
    if( grunt.option( 'releaseVersion') ) {
        releaseVersion = grunt.option( 'releaseVersion' );
    }

    // Project configuration.
    grunt.initConfig({

        /**
        * This will load in our package.json file so we can have access
        * to the project name and appVersion number.
        */
        pkg: grunt.file.readJSON( 'package.json' ),

        /**
        * Constants for the Gruntfile so we can easily change the path for our environments.
        */
        SRC_PATH: 'src/',
        BUILD_PATH: 'build/',
        GENERATED_PATH: 'build/generated/',
        RELEASE_PATH: 'build/release/',

        /**
        * A code block that will be added to our minified code files.
        * Gets the name and appVersion and other info from the above loaded 'package.json' file.
        * @example <%= banner.join("\\n") %>
        */
        banner: [
            '/*',
            '* Project: <%= pkg.name %>',
            '* Version: <%= pkg.appVersion %> (<%= grunt.template.today("yyyy-mm-dd") %>)',
            '* Development By: <%= pkg.developedBy %>',
            '* Copyright(c): <%= grunt.template.today("yyyy") %>',
            '*/'
        ],

        /**
        * Cleans or deletes our production folder before we create a new production build.
        */
        clean: {
            dist: ['<%= BUILD_PATH %>', '.tmp']
        },

        /**
        * Copies certain files over from the development folder to the production folder so we don't have to do it manually.
        */
        copy: {
            dev: {
                files: [
                    { expand: true, cwd: '<%= SRC_PATH %>', src: ['style/**/*.css'], dest: '<%= GENERATED_PATH %>' }
                ]
            },
            dist:  {
                files: [
                    // Copy folders from development to production
                    { expand: true, cwd: '<%= SRC_PATH %>', src: ['i18n/**'], dest: '<%= RELEASE_PATH %>' },
                    { expand: true, cwd: '<%= SRC_PATH %>', src: ['fonts/**'], dest: '<%= RELEASE_PATH %>' },
                    { expand: true, cwd: '<%= SRC_PATH %>', src: ['images/**'], dest: '<%= RELEASE_PATH %>' },
                    { expand: true, cwd: '<%= SRC_PATH %>', src: ['lib/**/*map'], dest: '<%= RELEASE_PATH %>' },
                    { expand: true, cwd: '<%= SRC_PATH %>', src: ['lib/**/*.min.js'], dest: '<%= RELEASE_PATH %>' },
                    { expand: true, cwd: '<%= SRC_PATH %>', src: ['style/**/*.min.css'], dest: '<%= RELEASE_PATH %>' },

                    { expand: true, cwd: '<%= SRC_PATH %>', src: ['style/**/*.css'], dest: '<%= GENERATED_PATH %>' },
                    { expand: true, cwd: '<%= SRC_PATH %>', src: ['app/**/*.js'], dest: '<%= GENERATED_PATH %>' },
                    { expand: true, cwd: '<%= SRC_PATH %>', dest: '<%= GENERATED_PATH %>', src: ['*.html'], filter: 'isFile', dot: true },
                    { expand: true, cwd: '<%= SRC_PATH %>', dest: '<%= RELEASE_PATH %>', src: ['*.html'], filter: 'isFile', dot: true },
                ]
            }
        },

        /**
        * Prepends the banner above to the minified files.
        */
        usebanner: {
            dist: {
                options: {
                    position: 'top',
                    banner: '<%= banner.join("\\n") %>',
                    linebreak: true
                },
                files: {
                    src: [
                        '<%= RELEASE_PATH %>' + 'app/<%= pkg.name %>.min.js',
                        '<%= RELEASE_PATH %>' + 'css/<%= pkg.name %>.min.css'
                    ]
                }
            }
        },

        useminPrepare: {
            html: ['<%= GENERATED_PATH %>' + 'index.html'],
            options: {
                dest: '<%= RELEASE_PATH %>'// Moves the single concatenated files to production.
            }
        },
        usemin: {
            html: ['<%= RELEASE_PATH %>' + 'index.html'],
            options: {
                dirs: ['<%= RELEASE_PATH %>']
            }
        },

        /**
        * Removes all comments from the production htmls file. I can also remove all whitespace if desired.
        */
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                expand: true,
                cwd: '<%= RELEASE_PATH %>',
                src: ['**/*.html'],
                dest: '<%= RELEASE_PATH %>'
            }
        },

        /**
         * Uglify
         */
        uglify: {
            options: {
                mangle: true
            }
        },

        /**
         * ng Annotate
         */
        ngAnnotate: {
            options: {
                singleQuotes: true
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/concat/app',
                    src: '*.js',
                    dest: '.tmp/concat/app'
                }]
            }
        },

        /**
        * Replace the debug version of third-party to minified version.
        */
        replace: {
            dist: {
                src: ['<%= RELEASE_PATH %>index.html'],
                dest: '<%= RELEASE_PATH %>index.html',
                replacements: [
                {
                    from: '<!--ST-MIN',
                    to: '<!--ST-MIN-->'
                },
                {
                    from: 'ED-MIN-->',
                    to: '<!--ED-MIN-->'
                },
                {
                    from: '<!--ST-DEBUG-->',
                    to: '<!--ST-DEBUG'
                },
                {
                    from: '<!--ED-DEBUG-->',
                    to: 'ED-DEBUG-->'
                }
                ]
            }
        },
        ngtemplates:    {
            dist:          {
                options:    {
                    htmlmin:  {
                        removeComments: true,
                        collapseWhitespace: true
                    },
                    module: 'petstore'
                },
                cwd: 'src',
                src: 'app/**/*.html',
                dest: '<%= RELEASE_PATH %>app/templates.js'
            }
        },
        compress: {
            dist: {
                options: {
                    archive: 'build/<%= pkg.name %>-client-' + releaseVersion + '.zip'
                },
                files : [
                  { expand: true, src : "**/*", cwd : "build/release/" }
                ]
            }
        },
        karma:{
            options: {
                configFile: 'karma.conf.unit.js'
            },
            dev: {
                singleRun: true,
                browsers: ["Chrome"]
            },
            dist: {
                singleRun: true,
                browsers: ["PhantomJS"]
            },
            watch: {
                singleRun: false,
                autoWatch: true
            }
        },
        protractor: {
            options: {
                configFile: "protractor.conf.js"
            },
            dist: {
                keepAlive: false
            },
            watch: {
                keepAlive: true
            }
        },

        /*
        *   SASS configuration
        */
        project: {
            css: [
                '<%= SRC_PATH %>scss/style.scss',
            ],
            bootstrapCss: [
                '<%= SRC_PATH %>scss/custom-bootstrap.scss'
            ]
        },
        sass: {
            dev: {
                options: {
                    style: 'expanded',
                    banner: '<%= banner %>',
                    compass: false
                },
                files: [
                    { expand: true, cwd: '<%= SRC_PATH %>scss', src: ['*.scss'], dest: '<%= SRC_PATH %>/css', ext: '.css' }
                ]
            },
            dist: {
                options: {
                    style: 'expanded',
                    banner: '<%= banner %>',
                    compass: false
                },
                files: [
                    { expand: true, cwd: '<%= SRC_PATH %>scss', src: ['*.scss'], dest: '<%= GENERATED_PATH %>/css', ext: '.css' }
                ]
            }
        },

        watch: {
            sass: {
                files: '<%= SRC_PATH %>scss/*.scss',
                tasks: ['sass:dev']
            }
        },

        shell: {
            startWebserver: {
                command: [
                    'cd tools/webserver',
                    'nodemon webserver.js'
                ].join('&&'),
                options: {
                    // When running protractor tests, Avoid the server to stop itself because of too much output in console
                    execOptions: {
                        maxBuffer: Infinity
                    }
                }
            },
            startStubbedServer: {
                command: [
                    'cd test/server',
                    'nodemon stubbedserver.js'
                ].join('&&')
            }
        },

        /**
        * Sonar Runner Configuration
        */
        /*sonarRunner: {
            dist: {
                options: {
                    debug: false,
                    separator: '\n',
                    sonar: {
                        host: {
                            url: 'http://devsfeir2.sfeir-lux:9090'
                        },
                        jdbc: {
                            url: 'jdbc:mysql://devsfeir2:3306/sonar?useUnicode=true&amp;characterEncoding=utf8',
                            username: 'sonar',
                            password: 'sonar'
                        },

                        projectKey: 'legitech:progilex:webfront:client',
                        projectName: 'Legitech - Progilex Webfront Client',
                        projectVersion: releaseVersion,
                        sources: ['src/app'].join(','),
                        language: 'js',
                        sourceEncoding: 'UTF-8'
                    }
                }
            }
        }*/
    });
    /**
    * Grunt tasks:
    *
    * grunt             (copy all related files + )
    * grunt release     (build your production code)
    */
    grunt.registerTask('default', [
        'copy:dev',
        'sass:dev'
    ]);

    grunt.registerTask('start-webserver', ['shell:startWebserver']);
    grunt.registerTask('start-web', ['shell:startWebserver']);
    grunt.registerTask('start-stub', ['shell:startStubbedServer']);
    grunt.registerTask('test', ['karma:dev']);
    grunt.registerTask('unit-test', ['karma:dist']);
    grunt.registerTask('integration-test', ['protractor:dist']);
    grunt.registerTask('dev', ['copy:dev', 'sass:dev', 'watch']);
    //grunt.registerTask('quality-check', ['sonarRunner:dist']);
    grunt.registerTask('release', [
          'clean',
          //'sass:dist',
          'copy',
          'useminPrepare',
          'concat',
          'ngAnnotate',
          'uglify',
          'cssmin',
          'usemin',
          'usebanner',
          'replace',
          'ngtemplates',
          'htmlmin',
          'compress'
    ]);
};