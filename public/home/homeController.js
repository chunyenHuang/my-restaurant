var app = angular.module('restaurant');
app.controller('homeController', home);
app.$inject = ['$http', '$scope', 'infoService', '$location', '$anchorScroll'];

function home($http, $scope, infoService, $rootScope, $location, $anchorScroll) {
  var vm = this;
  var today = new Date();
  vm.timeNow = today.getTime();

  $scope.update = function (body) {
    var update = infoService.update($rootScope.restaurant);
    update.then(function (res) {
      getInfo();
    })
  }
  function getInfo() {
    var info = infoService.get();
    info.then(function (res) {
      $rootScope.restaurant = res.data;
    })
  }
  function activate() {
    getInfo();
  }
  activate();
}