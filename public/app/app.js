var app = angular.module('restaurant', ['ngRoute', 'infinite-scroll', 'ngSanitize', 'xeditable', 'ui.bootstrap', 'ngAnimate', 'ngScrollable', 'ngclipboard', '720kb.socialshare']);
app.$inject = ['$http'];

app.run(function ($rootScope, $http) {
  $rootScope.logged = false;
  $rootScope.home = true;
  $rootScope.restaurant = {};
})

app.run(function(editableOptions) {
  editableOptions.theme = 'bs3';
});

app.config(['$compileProvider', function($compileProvider) {
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|blob|file|chrome-extension):|data:image\//);
  }
]);

app.config(['$routeProvider', function($routeProvider, $routeParams) {
  $routeProvider
    .when('/', {
      templateUrl: '../home/home.html',
      controller: 'homeController',
      controllerAs: 'home',
    })
}]);

app.factory('infoService', infoService);
infoService.$inject=['$http'];
function infoService($http) {
  function get() {
    return $http.get('/info');
  }
  function update(body) {
    return $http.put('/info', body);
  }
  return {
    get: get,
    update: update,
  }
}
