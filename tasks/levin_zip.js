/*
 * grunt-levin-zip
 * https://github.com/levincao1/grunt-levin-zip
 *
 * Copyright (c) 2015 levin
 * Licensed under the MIT license.
 */

'use strict';

var fs = require('fs');
var crypto = require('crypto');
var path = require('path');
var prettySize = require('prettysize');
var chalk = require('chalk');
var zlib = require('zlib');
var archiver = require('archiver');

module.exports = function(grunt) {
  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks
  grunt.registerMultiTask('levin_zip', 'Generate pkg zip by user appoint static asserts directory', function() {
    var fileStatSync = function() {
      var filepath = path.join.apply(path, arguments);

      if (grunt.file.exists(filepath)) {
        return fs.statSync(filepath);
      }

      return false;
    };

    var unixifyPath = function(filepath) {
      if (process.platform === 'win32') {
        return filepath.replace(/\\/g, '/');
      } else {
        return filepath;
      }
    };

    var getSize = function(filename, pretty) {
      var size = 0;
      if (typeof filename === 'string') {
        try {
          size = fs.statSync(filename).size;
        } catch (e) {}
      } else {
        size = filename;
      }
      if (pretty !== false) {
        return prettySize(size);
      }
      return Number(size);
    };

    var md5 = function(str){
      var md5sum = crypto.createHash('md5');
      md5sum.update(str);
      return md5sum.digest('hex');
    };

    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      mode:'zip',
      isMd5Name:false

    });

    var count = 0;

    var done = this.async();

    this.files.forEach(function(file) {
      //var isExpandedPair = file.orig.expand || false;
      //grunt.log.writeln('levin count value is -> ' + count ++);
      // Where to write the file
      var archive = archiver.create(options.mode);

      var alias_name = options.isMd5Name?md5(file.alias_name):file.alias_name;
      var dest = file.dest + alias_name +'.zip';
      var compressInnerDir = file.comp_inner_dir;
      var sourcePaths = {};
      var destStream = fs.createWriteStream(dest);
      if(!grunt.file.exists(path.dirname(dest))){
        // Ensure dest folder exists
        grunt.file.mkdir(path.dirname(dest));
      }
      archive.on('error', function(err) {
        grunt.log.error(err);
        grunt.fail.warn('Archiving failed.');
      });

      archive.on('entry', function(file) {
        var sp = sourcePaths[file.name] || 'unknown';
        grunt.verbose.writeln('Archived ' + chalk.cyan(sp) + ' -> ' + chalk.cyan(dest + '/' + file.name));
      });
      destStream.on('error', function(err) {
        grunt.log.error(err);
        grunt.fail.warn('WriteStream failed.');
      });

      destStream.on('close', function() {
        var size = archive.pointer();
        grunt.log.writeln('Created ' + chalk.cyan(dest) + ' (' + getSize(size) + ')');
        done();
      });
      archive.pipe(destStream);
      var src = file.src.filter(function(filePath) {
        if (/\.+(zip|tar|gz)$/.test(filePath)) {
          grunt.log.warn('filter "' + filePath + '" ');
          return false;
        } else {
          return true;
        }
      });
      src.forEach(function(srcFile) {
        var fstat = fileStatSync(srcFile);
        if (!fstat) {
          grunt.fail.warn('unable to stat srcFile (' + srcFile + ')');
          return;
        }

        //var internalFileName = (isExpandedPair) ? file.dest : unixifyPath(path.join(file.dest || '', srcFile));
        var internalFileName = srcFile.replace(compressInnerDir,'');//: unixifyPath(path.join(file.dest || '', srcFile));
        // check if internal file name is not a dot, should not be present in an archive
        if (internalFileName === '.') {
          return;
        }

        if (fstat.isDirectory() && internalFileName.slice(-1) !== '/') {
          srcFile += '/';
          internalFileName += '/';
        }

        var fileData = {
          name: internalFileName
        };
        if (fstat.isFile()) {
          archive.file(srcFile, fileData);
        } else if (fstat.isDirectory()) {
          archive.append(null, fileData);
        } else {
          grunt.fail.warn('srcFile (' + srcFile + ') should be a valid file or directory');
          return;
        }

        sourcePaths[internalFileName] = srcFile;
      });
      archive.finalize();
    });
  });

};
