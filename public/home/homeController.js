var app = angular.module('restaurant');
app.controller('homeController', home);
app.$inject = ['$http', '$scope', 'infoService', '$location', '$anchorScroll'];

function home($http, $scope, infoService, $rootScope, $location, $anchorScroll) {
  var vm = this;
  var today = new Date();
  vm.timeNow = today.getTime();

  function activate() {
  }
  activate();
}
