module.exports = function(grunt) {

  grunt.initConfig({
    clean: {
      app: {
        options: {
          force: true
        },
        src: [
          'client/**/build/**.*',
          'client/**/{js,css}/**/*.{css}'
        ]
      }
    },
    stylus: {
      options: {
        'include css': true,
        'compress': false
      },
      all: {
        files: [
          {
            expand: true,
            src: ['client/app/css/**/*.styl'],
            ext: '.css'
          }
        ]
      },
      app: {
        files: [
          {
            expand: true,
            src: 'client/app/css/app.styl',
            ext: '.css'
          }
        ]
      }
    },
    esteTemplates: {
      app: {
        src: ['client/app/js/**/*.soy']
      }
    },
    esteDeps: {
      all: {
        options: {
          outputFile: 'client/deps.js',
          prefix: '../../../../',
          root: [
            'bower_components/closure-library',
            'bower_components/closure-templates',
            'client/app/js'
          ]
        }
      }
    },
    cssmin: {
      app: {
        files: {
          'client/app/build/app.css': 'client/app/css/app.css'
        }
      }
    },
    closureBuilder: {
      options: {
        root: '<%= esteDeps.all.options.root%>',
        depsPath: '<%= esteDeps.all.options.outputFile %>',
        compilerFlags: (function() {
          var flags;
          flags = [
            '--output_wrapper=(function(){%output%})();',
            '--compilation_level=ADVANCED_OPTIMIZATIONS',
            '--warning_level=VERBOSE'
          ];

          flags = flags.concat([
            '--define=goog.net.XmlHttp.ASSUME_NATIVE_XHR=true',
            '--define=este.json.SUPPORTS_NATIVE_JSON=true',
            '--define=goog.style.GET_BOUNDING_CLIENT_RECT_ALWAYS_EXISTS=true'
          ]);

          if (grunt.option('stage') === 'debug') {
            flags = flags.concat([
              '--debug=true',
              '--formatting=PRETTY_PRINT',
              '--define=goog.DEBUG=true'
            ]);
          } else {
            flags = flags.concat(['--define=goog.DEBUG=false']);
          }
          return flags.concat(['--externs=client/app/js/externs/react.js']);
        })()
      },
      app: {
        options: {
          namespace: 'app.start',
          outputFilePath: 'client/app/build/app.js'
        }
      }
    },
    replace: {
      esteLibraryVersion: {
        src: 'server/app/views/home.jade',
        overwrite: true,
        replacements: [
          {
            from: /\(v.+\)/g,
            to: function() {
              var version;
              version = "require('./package.json').version";
              return "(v" + version + ")";
            }
          }
        ]
      }
    },
    env: {
      development: {
        NODE_ENV: 'development'
      },
      stage: {
        NODE_ENV: 'stage'
      },
      production: {
        NODE_ENV: 'production'
      }
    },
    bgShell: {
      app: {
        cmd: 'node server/app',
        bg: true
      }
    },
    esteWatch: {
      options: {
        dirs: ['client/**/{js,css}/**/', 'server/**/']
      },
      soy: function(filepath) {
        grunt.config(['esteTemplates', 'app'], filepath);
        return ['esteTemplates:app'];
      },
      js: function(filepath) {
        var tasks;
        grunt.config(['esteDeps', 'all', 'src'], filepath);
        tasks = [
          'esteDeps:all'
        ];
        if (grunt.option('stage')) {
          tasks.push('closureBuilder:app');
        }
        return tasks;
      },
      styl: function(filepath) {
        grunt.config(['stylus', 'all', 'files'], [
          {
            expand: true,
            src: filepath,
            ext: '.css'
          }
        ]);
        return ['stylus:all', 'stylus:app'];
      },
      css: function(filepath) {
        if (grunt.option('stage')) {
          return 'cssmin:app';
        }
      }
    },
    esteExtractMessages: {
      app: {
        options: {
          root: ['client/app/js'],
          messagesPath: 'messages/app',
          languages: ['en', 'cs']
        }
      }
    },
    bump: {
      options: {
        commitFiles: ['-a'],
        files: ['bower.json', 'package.json'],
        pushTo: 'origin',
        tagName: '%VERSION%'
      }
    }
  });

  grunt.loadNpmTasks('grunt-bg-shell');
  grunt.loadNpmTasks('grunt-bump');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-env');
  grunt.loadNpmTasks('grunt-este');
  grunt.loadNpmTasks('grunt-este-watch');
  grunt.loadNpmTasks('grunt-npm');
  grunt.loadNpmTasks('grunt-text-replace');

  grunt.registerTask('build', 'Build app.', function(app) {
    var tasks;
    if (app == null) {
      app = 'app';
    }

    tasks = [
      "clean:" + app,
      "stylus:all",
      "esteTemplates:" + app,
      "esteDeps"
    ];

    if (grunt.option('stage')) {
      tasks = tasks.concat([
        "cssmin:" + app,
        "closureBuilder:" + app
      ]);
    }

    grunt.task.run(tasks);
  });

  grunt.registerTask('run', 'Run stack.', function(app) {
    if (app == null) {
      app = 'app';
    }

    grunt.task.run([
      "replace:esteLibraryVersion",
      grunt.option('stage') ? 'env:stage' : 'env:development',
      "bgShell:" + app,
      "esteWatch"
    ]);
  });
  
  grunt.registerTask('default', 'Build app and run stack.', function(app) {
    if (app == null) {
      app = 'app';
    }

    grunt.task.run(["build:" + app, "run:" + app]);
  });
};
