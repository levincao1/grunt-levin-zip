/*
 * grunt-levin-zip
 * https://github.com/levincao1/grunt-levin-zip
 *
 * Copyright (c) 2015 levin
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    levin_zip: {
      options:{
        mode:'zip',
        isMd5Name:true
      },
      asserts:{
        files:[
          {src:['test/module1/**/*'],dest:'test/module1/',alias_name:'https://game.xiaomi.com/gift'},
          {src:['test/module2/**/*'],dest:'test/module2/',alias_name:'https://game.xiaomi.com/share'}
        ]
      }



    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  //grunt.registerTask('test', ['clean', 'levin_zip', 'nodeunit']);
  grunt.registerTask('test', ['clean', 'levin_zip']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
