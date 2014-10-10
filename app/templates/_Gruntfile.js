module.exports = function(grunt) {

    'use strict';

    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);

    grunt.initConfig({

        banner: '/*! <%%= grunt.template.today("yyyy-mm-dd, h:MM:ss TT") %> */\n',

        // Пути 
        paths: {
            static: 'static',
            scripts: '<%%= paths.static %>/js/',
            styles: '<%%= paths.static %>/css/',
            less: '<%%= paths.static %>/less/',
            ejs: '<%%= paths.static %>/blocks/',
            deploy: 'deploy',
            deploycss: '<%%= paths.deploy %>/css/',
            deployjs: '<%%= paths.deploy %>/js/',
            deployimg: '<%%= paths.deploy %>/img/',
            deployhtml: '<%%= paths.deploy %>/'
        },

        connect: {
            server: {
                options: {
                    port: 200,
                    base: './deploy'
                }
            }
        },

        concat: {
            dist: {
                src: ['<%%= paths.less %>partials/reset.less',
                    '<%%= paths.less %>partials/mixins.less',
                    '<%= paths.less %>blocks/*.less',
                    '<%%= paths.less %>blocks/**/*.less'],
                dest: '<%%= paths.less %>__main.less'
            }
        },

        less: {
            development: {
                options: {
                    compress: true
                },
                files: {
                    "<%%= paths.deploycss %>/__main.css": "<%%= paths.less %>/__main.less"
                }
            }
        },

        watch: {
            less: {
                files: ['<%%= paths.less %>/**/*.less'],
                tasks: ['concat', 'less']
            },
            scripts: {
                files: ['<%%= paths.scripts %>/main.js'],
                tasks: ['uglify']
            },
            ejs: {
                files: ['<%%= paths.ejs %>**/*.ejs', '<%%= paths.static %>/*.ejs'],
                tasks: ['ejs']
            }
        },

        uglify: {
            options: {
                beautify: true
            },
            my_target: {
                files: {
                    '<%%= paths.deployjs %>__main.js': ['bower_components/jquery/dist/jquery.js',
                        '<%%= paths.scripts %>*.js']
                }
            }
        },

        ejs: {
            dist: {
                expand: true,
                flatten: true,
                ext: '.html',
                src: ['<%%= paths.static %>/*.ejs'],
                dest: 'deploy/'
            }
        },

        clean: [
            '<%%= paths.deploy %>/css/*',
            '<%%= paths.deploy %>/js/*',
            '<%%= paths.deploy %>/img/*',
            '<%%= paths.deploy %>/*.html'
        ]
    });

    grunt.registerTask('default', ['connect', 'uglify', 'concat', 'less', 'ejs', 'watch']);
};
