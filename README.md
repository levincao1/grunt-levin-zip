# grunt-levin-zip

> Generate pkg zip by user appoint static asserts directory

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-levin-zip --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-levin-zip');
```

## The "levin_zip" task

### Overview
In your project's Gruntfile, add a section named `levin_zip` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  levin_zip: {
    options: {
      // Task-specific options go here.

    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

#### options.mode
mode: `String`
Default value: `zip`

A string value that is used to do something with whatever.

#### options.isMd5Name
isMd5Name: `Boolean`
Default value: `false`

A string value that is used to do something else with whatever else.

### Usage Examples

#### Default Options
In this example, the default options are used to do something with whatever. So if the `testing` file has the content `Testing` and the `123` file had the content `1 2 3`, the generated result would be `Testing, 1 2 3.`

```js
grunt.initConfig({
  levin_zip: {
    options: {},
    files: [
      {src:['test/module1/**/*'],comp_inner_dir:'tmp/module1/',dest:'test/module1/',alias_name:'https://game.xiaomi.com/gift'},
      {src:['test/module2/**/*'],comp_inner_dir:'tmp/module2/',dest:'test/module2/',alias_name:'https://game.xiaomi.com/share'}
    ],
  },
});
```

#### Custom Options
In this example, custom options are used to do something else with whatever else. So if the `testing` file has the content `Testing` and the `123` file had the content `1 2 3`, the generated result in this case would be `Testing: 1 2 3 !!!`

```js
grunt.initConfig({
  levin_zip: {
    options: {
       //compress mode
       mode:'zip',
       //set the name to be md5 string for the result zip file
       isMd5Name:true
    },
    files: [
     {
       //need compress static asserts
       src:['test/module1/**/*'],
       //zip package inner directory
       comp_inner_dir:'tmp/module1/',
       //the directory is storage the result of zip file
       dest:'test/module1/',
       //zip file alias name
       alias_name:'https://game.xiaomi.com/gift'
     },
     {
       src:['test/module2/**/*'],
       //zip package inner directory
       comp_inner_dir:'tmp/module1/',
       dest:'test/module2/',
       alias_name:'https://game.xiaomi.com/share'
     }
    ],
  },
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
