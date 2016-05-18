var app = angular.module('restaurant');
app.controller('navController', nav);
app.$inject = ['$scope', '$location'];

function nav($scope, $location) {
  var vm = this;
  $scope.isActive = function (location) {
    return location === $location.path();
  };
}

app.directive('navbar', function () {
  return {
    templateUrl: '../nav/navbar.html'
  }
})
