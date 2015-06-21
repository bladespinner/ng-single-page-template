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
      bowerComponents: '<%= settings.app %>/bower_components',
      contentPath : '<%= settings.app %>/content',
      cssPath: '<%= settings.contentPath %>/css',
      sourcePath : '<%= settings.app %>/src',
      rawViewsPath : '<%= settings.sourcePath %>/views',
      viewsPath : 'content/views', //hardcoded for angular templates, since this will expand to a template name
      scriptPath: '<%= settings.sourcePath %>/scripts',
      rawImagePath: '<%= settings.sourcePath %>/images',
      imagePath: '<%= settings.contentPath %>/img',
      sassPath: '<%= settings.sourcePath %>/sass',
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
          wrapShim: true,
          uglify: {
              no_mangle: true
          },
          removeCombined: true,
          findNestedDependencies: true,
          fileExclusionRegExp: /^\./,
          inlineText: true
        }
      }
    },
    
    cssmin: {
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1
      },
      target: {
        files: {
          '<%= settings.cssPath %>/styles.css': ['<%= settings.cssPath %>/styles.css']
        }
      }
    },
    
    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: [{
            expand: true,
            cwd: '<%= settings.rawViewsPath %>/',
            src: '**.html',
            dest: '<%= settings.viewsPath %>'
        }]
      },
    },

    ngtemplates: {
      app: {
        src: '<%= settings.viewsPath %>/**.html',
        dest: '<%= settings.scriptPath %>/app/modules/application/templateCache.js',
        options: {
          bootstrap:  function(module, script) {
            return '/*This code is generated by an tool, changes to it may be overriten.*/ \ndefine([], function() { \n  return ["$templateCache", function($templateCache) {\n'+ script + '  }];\n});';
          },
        }
      }
    },
    
    imagemin: {
      images: {
        files: [{
          expand: true,
          cwd: '<%= settings.rawImagePath %>/',
          src: ['**/*.{png,jpg,gif}'],
          dest: '<%= settings.imagePath %>/'
        }]
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
          title: "Compilation Successful! ",
          message: 'Successfully compiled script.js'
        },
      },
      sass: {
        options: {
          title: "Compilation Successful! ",
          message: 'Successfully compiled style.css'
        },
      },
      views: {
        options: {
          title: "Compilation Successful! ",
          message: 'Successfully compiled views'
        },
      }
    },
    
    clean: {
      build: ["<%= settings.contentPath %>"]
    },
    
    copy: {
      views : {
        files : [
          {expand: true, cwd:"<%= settings.rawViewsPath %>", src: '**.html', dest: '<%= settings.viewsPath %>', filter: 'isFile'}
        ]
      },
      bootstrapFonts : {
        files : [
          {expand: true, cwd:"bower_components/bootstrap-sass/assets/fonts", src: '**', dest: '<%= settings.fontsPath %>', filter: 'isFile'}
        ]
      },
      scriptLibraries: {
        files : [
          {expand: true, cwd:"bower_components/bootstrap-sass/assets/javascripts/bootstrap", src: '**', dest: '<%= settings.scriptsLibs %>/bootstrap', filter:'isFile'},
          {expand: true, cwd:"bower_components/requirejs", src: 'require.js', dest: '<%= settings.scriptsLibs %>', filter:'isFile'},
          {expand: true, cwd:"bower_components/jquery/dist", src: 'jquery.min.js', dest: '<%= settings.scriptsLibs %>', filter:'isFile'},
          {expand: true, cwd:"bower_components/angular", src: 'angular.min.js', dest: '<%= settings.scriptsLibs %>', filter:'isFile'},
          {expand: true, cwd:"bower_components/angular-route", src: 'angular-route.min.js', dest: '<%= settings.scriptsLibs %>', filter:'isFile'}
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
      images: {
        files: [
          '<%= settings.rawImagePath %>/**/*.{png,jpg,gif}'
        ],
        tasks: [
          'newer:imagemin:images'
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
      views: {
        files: [
          '<%= settings.rawViewsPath %>/**.html'
        ],
        tasks: [
          'views-compile-dev',
          'js-compile-dev'
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
  
  grunt.registerTask('views-compile-dev', [
    'htmlmin:dist',
    'ngtemplates:app',
  ]);
  
  grunt.registerTask('views-compile-prod', [
    'htmlmin:dist',
    'ngtemplates:app',
    'notify:views'
  ]);

  grunt.registerTask('css-compile', [
    'sass:dev',
    'autoprefixer:dev',
    'copy:bootstrapFonts',
    'cssmin',
    'notify:sass'
  ]);
  
  grunt.registerTask('js-compile-dev', [
    'copy:scriptLibraries',
    'copy:requirejsDev',
    'notify:requirejs'
  ]);
  
  grunt.registerTask('js-compile-prod', [
    'requirejs:prod',
    'notify:requirejs'
  ]);
  
  grunt.registerTask('build-prod', [
    'clean:build',
    'css-compile',
    'views-compile-prod',
    'js-compile-prod',
    'imagemin:images',
  ]);
  
  grunt.registerTask('build-dev', [
    'clean:build',
    'css-compile',
    'views-compile-dev',
    'js-compile-dev',
    'imagemin:images',
  ]);

  grunt.registerTask('default', ['watch']);
};