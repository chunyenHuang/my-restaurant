var app = angular.module('restaurant', ['ngRoute', 'infinite-scroll', 'ngSanitize', 'xeditable', 'ui.bootstrap', 'ngAnimate', 'ngScrollable', 'ngclipboard', '720kb.socialshare']);
app.$inject = ['$http'];

app.run(function ($rootScope, $http) {
  $rootScope.logged = false;
  $rootScope.restaurant = {};
  var info = $http.get('/info');
  info.then(function (res) {
    $rootScope.restaurant = res.data;
  })
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
    .when('/home', {
      templateUrl: '../home/home.html',
      controller: 'homeController',
      controllerAs: 'home',
    })
    .when('/info', {
      templateUrl: '../info/info.html',
      controller: 'infoController',
      controllerAs: 'info',
    })
    .when('/menu', {
      templateUrl: '../menu/menu.html',
      controller: 'menuController',
      controllerAs: 'menu',
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
