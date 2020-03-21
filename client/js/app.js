angular
  .module('app', [
    'lbServices',
    'ui.router'
  ])
  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider,
      $urlRouterProvider) {
    $stateProvider
      .state('draw', {
        url: '',
        templateUrl: 'views/draw.html',
        controller: 'DrawController'
      });

    $urlRouterProvider.otherwise('draw');
  }]);
