'use strict';

module.exports = function(grunt){
  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);
  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  grunt.initConfig({
    settings: {
      /**
       * Application base path.
       */
      app: '.',
      cssPath: '<%= settings.app %>/content/css',
      bowerComponents: '<%= settings.app %>/bower_components',
      contentPath : '<%= settings.app %>/content',
      sourcePath : '<%= settings.app %>/src',
      scriptPath: '<%= settings.sourcePath %>/scripts',
      sassPath: '<%= settings.sourcePath %>/sass',
      imagePath: '<%= settings.contentPath %>/images',
      fontsPath: '<%= settings.contentPath %>/fonts',
      scriptsLibs: '<%= settings.scriptPath %>/libs',
      viewPath: '<%= settings.app %>/views',
      bootstrapFonts: '<%= settings.bowerComponents %>/bootstrap-sass/assets/fonts',
      contentScripts: '<%= settings.contentPath %>/js',
      livereload: 35729
    },
    
    requirejs: {
      prod: {
        options: {
          appDir: "<%= settings.scriptPath %>/",
          baseUrl: ".",
          dir: "<%= settings.contentScripts %>",
          optimize: 'uglify',
          mainConfigFile:'<%= settings.scriptPath %>/main.js',
          modules:[
            {
              name:'app/main'
            }
          ],
          logLevel: 0,
          findNestedDependencies: true,
          fileExclusionRegExp: /^\./,
          inlineText: true
        }
      }
    },
    
    sass: {
      dev: {
        options: {
          //imagePath: '<%= settings.imagePath %>',
          sourceMap: false,
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
      },
      sass: {
        options: {
          title: "Compilation Successful! ", // defaults to the name in package.json, or will use project directory's name
          message: 'Successfully compiled style.css'
        },
      }
    },
    copy: {
      bootstrapFonts : {
        files : [
          {expand: true, cwd:"bower_components/bootstrap-sass/assets/fonts", src: '**', dest: '<%= settings.fontsPath %>', filter: 'isFile'}
        ]
      },
      scriptLibraries: {
        files : [
          {expand: true, cwd:"bower_components/bootstrap-sass/assets/javascripts/bootstrap", src: '**', dest: '<%= settings.scriptsLibs %>/bootstrap', filter:'isFile'},
          {expand: true, cwd:"bower_components/requirejs", src: 'require.js', dest: '<%= settings.scriptsLibs %>', filter:'isFile'},
          {expand: true, cwd:"bower_components/jquery/dist", src: 'jquery.min.js', dest: '<%= settings.scriptsLibs %>', filter:'isFile'}
        ]
      },
      requirejsDev: {
        files : [
          {expand: true, cwd:"<%= settings.scriptPath %>/", src: '**', dest: '<%= settings.contentScripts %>'}
        ]
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
          'js-compile-dev'
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
    'notify:sass',
    'copy:bootstrapFonts'
  ]);
  
  grunt.registerTask('js-compile-dev', [
    'copy:requirejsDev',
    'notify:requirejs'
  ]);
  
  grunt.registerTask('js-compile-prod', [
    'requirejs:prod',
    'notify:requirejs'
  ]);

  grunt.registerTask('default', ['watch']);
};