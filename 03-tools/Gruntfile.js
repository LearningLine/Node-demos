module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-notify');
    grunt.loadNpmTasks('grunt-newer');

    var publicFiles = [ 'public/!(*.min).js' ];

    grunt.initConfig({
        // https://github.com/gruntjs/grunt-contrib-jshint
        jshint: {
            options: {
                undef: true
            },
            public: {
                options: {
                    browser: true,
                    devel: true,
                    globals: {
                        bar: true
                    }
                },
                src: publicFiles
            },
            server: {
                src: 'server.js',
                options: {
                }
            }
        },

        // https://github.com/gruntjs/grunt-contrib-uglify
        uglify: {
            public: {
                options: {
                    sourceMap: true
                },
                src: publicFiles,
                dest: 'public/app.min.js'
            }
        }
    });

    grunt.registerTask('default', [
        'newer:jshint',
        'newer:uglify'
    ]);
};









//
