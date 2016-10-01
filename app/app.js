'use strict';

var APP = angular
  .module('clientApp', [
    'ui.router',
    'ngAnimate',
    'ngMaterial'
  ]);

APP
  .config(function ($stateProvider) {
    $stateProvider
      .state('root', {
        url: '/',
        abstract: true,
        template: '<div ui-view></div>'
      })
      .state('root.main', {
        url: '',
        abstract: false,
        templateUrl: 'app/views/main.html',
        controller: "MainCtrl"
      })
  })
  .run(['$rootScope', '$state', function ($rootScope, $state) {
    $state.go("root.main");
  }]);