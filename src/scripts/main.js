require.config({
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
        'angular-route' : { deps: ['angular'] }
    },
    paths: {
        /* path to folder where individual bootstrap files have been saved. (affix.js, alert.js, etc) */
        'bootstrap': './libs/bootstrap',
        'jquery': './libs/jquery.min',
        'angular': './libs/angular.min',
        'angular-route': './libs/angular-route.min',
        lib: './libs',
        app: './app'
    },
});


requirejs(['app/main'], function(app){
});