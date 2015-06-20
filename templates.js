define([], function() { return ["$templateCache", function($templateCache) {  'use strict';

  $templateCache.put('/content/views/home.html',
    "<div style=\"background:red\">Home {{message}} <a href=\"#test\">Test</a></div>"
  );


  $templateCache.put('/content/views/test.html',
    "<div style=\"width:50px;height:50px;background:blue\">Test {{value}}</div>"
  );
}];});