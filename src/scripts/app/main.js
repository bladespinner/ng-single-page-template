/*
 * Load jquery, angular modules, bootstrap,
 * and run application start logic
 */
define([
  "jquery",
  "app/angularModules",
  "lib/bootstrap"
  ],function($,angularModules /*other modules*/){
    angularModules.bootstrap();
    
    //application start
    
    return {}; 
});
