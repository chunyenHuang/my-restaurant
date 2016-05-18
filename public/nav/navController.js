var app = angular.module('restaurant');
app.controller('navController', nav);
app.$inject = ['$scope', '$location'];

function nav($scope, $location) {
  var vm = this;
  $scope.isActive = function (location) {
    return location === $location.path();
  };
  $scope.hideNav = function () {
    var nav = $("#bs-example-navbar-collapse-1").collapse('hide');
  }
}

app.directive('navbar', function () {
  return {
    templateUrl: '../nav/navbar.html'
  }
})
