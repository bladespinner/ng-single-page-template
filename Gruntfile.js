'use strict';

module.exports = function(grunt){
  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);
  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  grunt.initConfig({
    settings: {
      app: '.',
      cssPath: '<%= settings.app %>/content/css',
      sassPath: '<%= settings.app %>/content/sass',
      imagePath: '<%= settings.app %>/content/images',
      scriptPath: '<%= settings.app %>/scripts',
      viewPath: '<%= settings.app %>/views',
      livereload: 35729
    },
    
    requirejs: {
      dev: {
        options: {
          baseUrl: "<%= settings.scriptPath %>",
          mainConfigFile: "<%= settings.scriptPath %>/app.js",
          name: "path/to/almond", // assumes a production build using almond
          out: "<%= settings.scriptPath %>/script.js",
          optimize: "uglify",
        }
      }
    },
    
    sass: {
      dev: {
        options: {
          imagePath: '<%= settings.imagePath %>',
          sourceMap: true,
          debugInfo: true
        },
        files: {
          '<%= settings.cssPath %>/styles.css': '<%= settings.sassPath %>/styles.scss'
        }
      }
    },

    autoprefixer: {
      options: {
        map: true,
        browsers: ['last 2 versions']
      },
      dev: {
        src: '<%= settings.cssPath %>/styles.css'
      }
    },

    notify: {
      options: {
          enabled: true
      },
      requirejs: {
        options: {
          title: "Compilation Successful! ", // defaults to the name in package.json, or will use project directory's name
          message: 'Successfully compiled script.js'
        },
      }
      sass: {
        options: {
          title: "Compilation Successful! ", // defaults to the name in package.json, or will use project directory's name
          message: 'Successfully compiled style.css'
        },
      }
    },
    
    watch: {
      js: {
        files: [
          '<%= settings.scriptPath %>/**/*.js'
        ],
        options: {
          livereload: true
        },
        tasks: [
          'js-compile'
        ]
      },
      scss: {
        files: [
          '<%= settings.sassPath %>/**/*.scss'
        ],
        tasks: [
          'css-compile'
        ]
      },
      livereload: {
        files: [
          '<%= settings.cssPath %>/{,*/}*.css', 
          '<%= settings.imagePath %>/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ],
        options: {
          livereload: '<%= settings.livereload %>'
        }
      }
    }
  });

  grunt.registerTask('keepalive', 'keep task alive till manual action', function () {
      this.async();
  });

  grunt.registerTask('css-compile', [
    'sass:dev',
    'autoprefixer:dev',
    'notify:sass'
  ]);
  
  grunt.registerTask('js-compile', [
    'requirejs:dev',
    'notify:requirejs'
  ]);

  grunt.registerTask('default', ['watch']);
};