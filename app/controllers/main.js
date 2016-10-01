'use strict';

APP.controller('MainCtrl', function ($rootScope, $scope){
  $scope.id = 0;
  $scope.list_frame = [];

  $scope.addFrame = function(){
    if(typeof YT == 'undefined') return;
    $scope.list_frame.push({
      id: ++$scope.id 
    });
  }

  $scope.closeFrame = function(index){
    $scope.list_frame.splice(index, 1);
  }
});