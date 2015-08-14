/*global module:false*/
module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({
    // Task configuration.
    wiredep: {
      task: {
        // Point to the files that should be updated when
        // you run `grunt wiredep`
        src: [
          'index.html' // .html support...
        ]
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      lib_test: {
        src: ['js/**/*.js']
      }
    },
    sass: { // Task
      dist: { // Target
        options: { // Target options
          style: 'expanded',
          noCache: true
        },
        files: { // Dictionary of files
          'styles/css/style.css': 'styles/sass/style.scss' // 'destination': 'source'
        }
      }
    },
    connect: {
      server: {
        options: {
          hostname: '*',
          port: 9009,
          livereload: 35729,
          open: true
        }
      }
    },
    watch: {
      options: {
        livereload: true
      },
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      bower: {
        files: ['bower_components/*'],
        tasks: ['wiredep']
      },
      lib_test: {
        files: '<%= jshint.lib_test.src %>',
        tasks: ['jshint:lib_test']
      },
      sass: {
        files: ['styles/sass/**/*.scss'],
        tasks: ['sass'],
        options: {
          spawn: false
        }
      },
      html: {
        files: ['**/*.html']
      }
    }
  });

  // Default task.
  grunt.registerTask('init', 'Lint and compile stuff', ['wiredep', 'jshint', 'sass']);

  //Init for things like libs
  grunt.registerTask('serve', 'watch and serve stuff', ['jshint', 'sass', 'connect', 'watch']);

};
