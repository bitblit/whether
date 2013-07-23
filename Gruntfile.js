module.exports = function (grunt) {

  grunt.initConfig({
    env: process.env,
    pkg: grunt.file.readJSON('package.json'),

    bgShell: {
      bundle: {
        cmd: 'bundle install',
        bg: false,
        fail: true,
        done: function (err, stdout, stderr) {
          if (err) {
            console.log("Please run `gem install bundle && bundle install` to install the required dependencies.");
          }
        }
      },
      boot: {
        cmd: 'AWS_ACCESS_KEY_ID=<%= env.AWS_ACCESS_KEY_ID %> AWS_SECRET_KEY=<%= env.AWS_SECRET_KEY %> AWS_REGION=us-east-1 node ./node_modules/nodemon/nodemon.js ./app/app.js',
        bg: true
      }
    },

    compass: {
      compile: {
        options: {
          sassDir: 'app/assets/stylesheets',
          cssDir: 'app/public/stylesheets',
          environment: 'production'
        }
      }
    },

    snockets: {
      core: {
        src: ['app/assets/javascripts/redress.js'],
        options: {
          concat: {
            destExtension: "js",
            destDir: "app/public/javascripts",
          },
          min: {
            destExtension: "min.js",
            destDir: "app/public/javascripts"
          }
        }
      }
    },

    jshint: {
      options: {
        "curly": true,
        "camelcase": true,
        "indent": 2,
        "latedef": true,
        "undef": true,
        "node": true,
        "white": true,
        "browser": true,
        "immed": true
      },
      watch: {
        options: {
          force: true,
        },
        files: {
          src: [
            'app/*.js',
            'app/collections/*.js',
            'app/controllers/*.js',
            'app/models/*.js',
            'app/assets/**/*.js'
          ],
        }
      },
      build: {
        options: {
          force: false,
        },
        files: {
          src: [
            'app/*.js',
            'app/collections/*.js',
            'app/controllers/*.js',
            'app/models/*.js',
            'app/assets/**/*.js'
          ],
        }
      }
    },

    cafemocha: {
      test: {
        src: 'test/**/*-test.js',
        options: {
          reporter: 'dot'
        },
      },
    },

    watch: {
      app: {
        files: [
          'app/*.js',
          'app/collections/*.js',
          'app/controllers/*.js',
          'app/models/*.js',
          'app/assets/**/*.js'
        ],
        tasks: ['jshint:watch'],
        options: {
          interrupt: true
        }
      },
      javascripts: {
        files: ['app/assets/**/*.js'],
        tasks: ['snockets'],
        options: {
          interrupt: true
        }
      },
      stylesheets: {
        files: 'app/assets/stylesheets/*.scss',
        tasks: ['compass'],
        options: {
          interrupt: true
        }
      }
    },

    plato: {
      your_task: {
        files: {
          'report/output/directory': ['app/**/*.js', 'test/**/*.js'],
        },
      },
    },

    mocha_phantomjs: {
      all: ['test/**/*.html'],
      options: {
        'reporter': 'tap',
        'output': 'report/phantomjs/result.tap'
      },
    }

  });

  grunt.loadNpmTasks('grunt-bg-shell');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-cafe-mocha');
  grunt.loadNpmTasks('grunt-barkeep');
  grunt.loadNpmTasks('grunt-plato');
  grunt.loadNpmTasks('grunt-mocha-phantomjs');

  grunt.registerTask('test', ['cafemocha', 'jshint:build']);
  grunt.registerTask('compile', ['compass', 'snockets', 'jshint:watch']);
  grunt.registerTask('server', ['bgShell', 'compile', 'watch']);
  grunt.registerTask('default', ['test']);

  grunt.registerTask('continuous-deployment-build', ['compile','test', 'plato']);

  grunt.registerTask('integration-test', ['mocha_phantomjs']);

};