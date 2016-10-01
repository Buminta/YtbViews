'use strict';

APP.controller('FrameCtrl', function ($rootScope, $scope, $mdDialog){
  $scope.reloadVars = function(){
    if(typeof YT == "undefined" || !$scope.id) return;
    if($scope.player) $scope.player.destroy();
    $scope.player = new YT.Player('player-'+$scope.id, {
      height: '195',
      width: '320',
      events: {
        'onReady': $scope.onPlayerReady,
        'onStateChange': $scope.onPlayerStateChange
      }
    });   
  };

  $scope.onPlayerReady = function(event) {
    event.target.setLoop(true);
    event.target.mute();
  };

  $scope.play = function(){
    if($scope.player) {
      $scope.player.playVideo();
      $scope.isPlaying = true;
    }
  }

  $scope.pause = function(){
    if($scope.timeout) clearTimeout($scope.timeout);
    if($scope.player && $scope.isPlaying) {
      $scope.player.pauseVideo();
      $scope.isPlaying = false;
    }
  }

  $scope.tooglePlay = function(){
    if($scope.isPlaying) $scope.pause();
    else $scope.play();
  }

  $scope.setPlaylist = function(list){
    if($scope.player) $scope.player.cuePlaylist(
      list,
      0,
      0,
      "small"
      );
  };

  $scope.setPlayVideo = function(id){
    if($scope.player) $scope.player.cueVideoById(
      id,
      0,
      "small"
      );

  };
  $scope.list = {
    ids: [],
    maxTimeDuration: 0
  }

  $scope.openList = function(){
    $mdDialog.show({
        templateUrl: 'app/views/dialog.html',
        controller: ['$scope', function($myScope) {
          $myScope.list = $scope.originList;
          $myScope.time = $scope.list.maxTimeDuration/1000;
          $myScope.update = function(list, time){
            $scope.originList = list;
            $scope.list.ids = list.split("\n");
            $scope.list.maxTimeDuration = parseInt(time)*1000;
            $scope.setPlaylist($scope.list.ids);
            $scope.pause();
          }
          $myScope.close = function(){
            $mdDialog.hide()
          }
        }]
    });
  }

  $scope.onPlayerStateChange = function(event) {
    if($scope.timeout) clearTimeout($scope.timeout);
    if (event.data == YT.PlayerState.PLAYING) {
      $scope.isPlaying = true;
      var time = $scope.list.maxTimeDuration;
      var timeSeek = $scope.player.getDuration() - time/1000;
      if(timeSeek < 0) timeSeek = 0;
      if(time && time > 0 && $scope.player.getCurrentTime() < timeSeek) {
        $scope.player.seekTo(timeSeek);
      }
    }
    if(event.data == YT.PlayerState.ENDED){
      $scope.isPlaying = false;
      $scope.timeout = setTimeout(function(){
        $scope.player.playVideoAt(0);
      }, 500);
    }
  };
  $scope.$on("$destroy", function(){
    if($scope.player) $scope.player.destroy();
  })
});