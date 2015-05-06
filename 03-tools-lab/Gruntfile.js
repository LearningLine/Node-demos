module.exports = function(grunt) {
    // grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-newer');

    require('load-grunt-tasks');

    grunt.registerTask('default', [
        'newer:copy'
    ]);

    grunt.initConfig({
        copy: {
            public: {
                files: [
                    {
                        expand: true,
                        cwd: 'node_modules/jquery/dist',
                        src: 'jquery.*',
                        dest: 'public/jquery'
                    },
                    {
                        expand: true,
                        cwd: 'node_modules/bootstrap/dist',
                        src: '**',
                        dest: 'public/bootstrap'
                    }
                ]
            }
        }
    });
};
