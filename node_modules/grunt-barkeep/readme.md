# grunt-barkeep

<img src="http://bit.ly/wAqCqY" alt="Barkeep" title="Barkeep" height="336" width="535"/>

grunt 0.4.x tasks for snockets, Amazon S3 uploads, and ducksboard updates.

## Getting Started
If you haven't used [grunt](https://github.com/gruntjs) before, be sure to check out the [Getting Started](https://github.com/gruntjs/grunt/wiki/Getting-started) guide, as it explains how to create a gruntfile as well as install and use grunt plugins. Once you're familiar with that process, install this plugin with this command:

```sh
npm install grunt-barkeep --save-dev
```

Then add this line to your project's `Gruntfile.js`:

```javascript
grunt.loadNpmTasks('grunt-barkeep');
```

## Documentation

grunt-barkeep is bundled with the following tasks:

### snockets
*Build a dependency tree of source files for the `concat` and `min` grunt tasks using [snockets](https://github.com/TrevorBurnham/snockets). Snockets is a JavaScript dependency parser similar to Ruby's sprockets. This is a [multi task][0].*

snockets will automatically concatenate files in the correct order, so you don't need to use grunt's
`concat` task if you use the `snockets` task.

barkeep, using snockets, can also concatenate coffeescript files.

__Example__:
```javascript
grunt.initConfig({
    meta: {
        buildDirectory: 'dist',
        header: '/* Copyright 2012, Flite Inc. */',
        footer: '/* End of source */',
    },
    snockets: {
        core: {
            src: ['public/javascript/main-rollup.js'],
            options: {
                concat: {
                        header: '<%= meta.header %>',
                        destExtension: "debug.js",
                        destDir: "<%= meta.buildDirectory %>",
                        footer: '<%= meta.footer %>'
                },
                min: {
                        destExtension: "js",
                        destDir: "<%= meta.buildDirectory %>"
                }
            }
        }
    }
});
```

### prepare-deploy
*An experimental task that determines what files to upload or delete from an Amazon S3 buckets when mirroring a local directory. It is meant to be run before the `s3` task in the [grunt-s3](https://github.com/pifantastic/grunt-s3) project.*

### ducksboard
*Sends file size data to ducksboard for reporting purposes. Useful for tracking the size of your JavaScript web applications over time. This is a [multi task][0].*

__Example__:
```javascript
grunt.initConfig({
    meta: {
        ducksboard_api_key: process.env.DUCKSBOARD_API_KEY
    },
    ducksboard: {
        everything_gzip: {
            src: ['public/rollup.js'],
            endpoint: 'everything',
            gzip: true
        },
        everything_no_gzip: {
            src: ['public/rollup.js'],
            endpoint: 'everything-no-gzip'
        }
    }   
});
```

### clean
*Delete the files and/or directories of your choice. This is a [multi task][0].*

__Example__:
```javascript
grunt.initConfig({
    clean: {
      files: ['build/**/*.js']
    }
});
```

### More Examples
See Gruntfile.js in the barkeep directory.

## Contributing
In lieu of a formal style guide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [grunt][grunt].

## Release History

0.4.0 - Version compatible with grunt-0.4.x.

## License
Copyright (c) 2012 Flite, Inc.  
Licensed under the MIT license.

[0]: https://github.com/cowboy/grunt/blob/master/docs/types_of_tasks.md#multi-tasks-%E2%9A%91 "Grunt Multitasks"
