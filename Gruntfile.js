module.exports = function(grunt) {
  var filename =  "leap.playback-<%= pkg.version %>";
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    watch: {
      options: {
        livereload: true
      },
      js: {
        files: ['javascripts/*.js'],
        tasks: [],
        options: {
          spawn: false,
          livereload: true
        }
      },
      html: {
        files: ['index.html', 'textures/index.html'],
        tasks: [],
        options: {
          spawn: false,
          livereload: true
        }
      }
    }
  });
  require('load-grunt-tasks')(grunt);
  return grunt.registerTask('default', []);
};
