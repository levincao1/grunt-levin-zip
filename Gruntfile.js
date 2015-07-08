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
      before:{
        src:['tmp']
      },
      after:{
        src:['tmp/module1/**/*','tmp/module2/**/*','!tmp/**/*.zip']
      }

    },
    copy:{
      main:{
        files:[
          {expand:true,cwd:'test/',src:['module1/**/*','module2/**/*'],dest:'tmp/'}
        ]
      }
    },

    // Configuration to be run (and then tested).
    levin_zip: {
      options:{
        mode:'zip',
        isMd5Name:false
      },
      asserts:{
        files:[
          {src:['tmp/module1/**/*'],comp_inner_dir:'tmp/module1/',dest:'tmp/module1/',alias_name:'gift'},
          {src:['tmp/module2/**/*'],comp_inner_dir:'tmp/module2/',dest:'tmp/module2/',alias_name:'share'}
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
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  //grunt.registerTask('test', ['clean', 'levin_zip', 'nodeunit']);
  grunt.registerTask('test', ['clean:before','copy','levin_zip','clean:after']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
