module.exports = function(grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    // cleaning 'out/' path contents
    clean: {
      target: [
        '!out',
        'out/**/*'
      ]
    },

    // copying: required js files -> out/js (path flattened)
    // copying: src/assets -> out/assets (keeping dir structure)
    copy: {
      main: {
        files: [
          {
            src: 'bower_components/modernizr/**',
            dest: 'out/',
          },
          {
            src: 'bower_components/jquery/**',
            dest: 'out/',
          },
          {
            src: 'bower_components/foundation/**',
            dest: 'out/',
          },
          {
            src: 'bower_components/platform/**',
            dest: 'out/'
          },
          {
            src: 'bower_components/polymer/**',
            dest: 'out/'
          },
          {
            expand: true,
            cwd: 'src/assets/',
            src: ['**'],
            dest: 'out/assets/'
          },
          {
            src: 'bower_components/highlightjs/styles/github.css',
            dest: 'out/css/hljs-style.css',
          },
          {
            expand: true,
            cwd: 'templates/polymer-elements/',
            src: ['**'],
            dest: 'out/polymer-elements/',
          },
        ]
      }
    },

    // CSS concat to a single file (grunt-contrib-cssmin)
    // 1. foundation.css + hl_github + style.css
    sass: {
      dist: {
        options: {
          includePaths: [
            'bower_components/foundation/scss'
          ],
        },
        files: {
          'out/css/stasis-style.css': 'templates/scss/style.scss'
        }
      }
    },

    cssmin: {
      minify: {
        files: {
          'out/css/stasis-style.min.css': 'out/css/stasis-style.css',
          'out/css/hljs-style.min.css': 'out/css/hljs-style.css'
        }
      }
    },

    execute: {
      target: {
        src: ['build.js']
      }
    },

    connect: {
      out: {
        options: {
          base: './out'
        },
      },
      feature: {
        options: {
          base: '.'
        },
      }
    },

    watch: {
      options: {
        livereload: true,
      },
      out: {
        files: ['./src/**', './templates/**'],
        tasks: ['build-site']
      }
    },

    rsync: {
      options: {
        args: ['--verbose'],
        recursive: true
      },
      remote: {
        options: {
          src: './out/',
          dest: '~/Library/Web',
          host: 'hongchan@ccrma-gate.stanford.edu',
          syncDestIgnoreExcl: true
        }
      }
    }

  });

  // load tasks
  grunt.loadNpmTasks('grunt-execute');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-rsync');
  grunt.loadNpmTasks('grunt-gh-pages');

  // register tasks
  grunt.registerTask('build-style', ['sass', 'cssmin']);
  grunt.registerTask('build-contents', ['execute']);
  grunt.registerTask('build-site', ['clean', 'copy', 'build-style', 'build-contents']);
  grunt.registerTask('dev', ['build-site', 'connect:out', 'watch:out']);
  grunt.registerTask('publish', ['build-site', 'rsync']);
  grunt.registerTask('default', ['build-site']);
};