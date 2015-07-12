/*
 * Main application entry point
 */
/* @if NODE_ENV='test' **
var allTestFiles = [];
var TEST_REGEXP = /(spec|test)\.js$/i;

// Get a list of all the test files to include
Object.keys(window.__karma__.files).forEach(function(file) {
  if (TEST_REGEXP.test(file)) {
    // Normalize paths to RequireJS module names.
    // If you require sub-dependencies of test files to be loaded as-is (requiring file extension)
    // then do not normalize the paths
    var normalizedTestModule = file.replace(/^\/base\/content\/js\/|\.js$/g, '');
    allTestFiles.push(normalizedTestModule);
  }
});
/* @endif */
 
require.config({
    /* @if NODE_ENV='test' **
    baseUrl: '/base/content/js',
    deps: allTestFiles,
    callback: window.__karma__.start,
    /* @endif */
    shim: {
        'bootstrap/affix':      { deps: ['jquery'], exports: '$.fn.affix' }, 
        'bootstrap/alert':      { deps: ['jquery'], exports: '$.fn.alert' },
        'bootstrap/button':     { deps: ['jquery'], exports: '$.fn.button' },
        'bootstrap/carousel':   { deps: ['jquery'], exports: '$.fn.carousel' },
        'bootstrap/collapse':   { deps: ['jquery'], exports: '$.fn.collapse' },
        'bootstrap/dropdown':   { deps: ['jquery'], exports: '$.fn.dropdown' },
        'bootstrap/modal':      { deps: ['jquery'], exports: '$.fn.modal' },
        'bootstrap/popover':    { deps: ['jquery', 'bootstrap/tooltip'], exports: '$.fn.popover' },
        'bootstrap/scrollspy':  { deps: ['jquery'], exports: '$.fn.scrollspy' },
        'bootstrap/tab':        { deps: ['jquery'], exports: '$.fn.tab'        },
        'bootstrap/tooltip':    { deps: ['jquery'], exports: '$.fn.tooltip' },
        'bootstrap/transition': { deps: ['jquery'], exports: '$.fn.transition' },
        'angular' : {exports: 'angular'},
        /* @if NODE_ENV='test' **
        'angular-mocks' : { deps: ['angular'] },
        /* @endif */
        'angular-route' : { deps: ['angular'] }
    },
    paths: {
        /* path to folder where individual bootstrap files have been saved. (affix.js, alert.js, etc) */
        'bootstrap': 'libs/bootstrap',
        'jquery': 'libs/jquery.min',
        'angular-route': 'libs/angular-route.min',
        'angular': 'libs/angular.min',
        /* @if NODE_ENV='test' **
        'angular-mocks': 'libs/angular-mocks',
        /* @endif */
        lib: 'libs',
        app: 'app'
    },
});


requirejs(['app/main'], function(app){
});