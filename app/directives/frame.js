'use strict';
APP
  .directive('frameVideo', function ($http,  $templateCache, $compile) {
    return {
      restrict: 'E',
      controller: "FrameCtrl",
      replace: true,
      templateUrl: "app/views/frame.html",
      scope: {
        'id': '='
      },
      link: function(scope, element, attrs) {
        scope.$watch("id", function(value){
          scope.id = value;
          scope.reloadVars();
        });
      }
    }
  });