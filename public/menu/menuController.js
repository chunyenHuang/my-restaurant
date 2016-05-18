var app = angular.module('restaurant');
app.controller('menuController', menu);
app.$inject = ['$http', '$scope', 'infoService', '$location', '$anchorScroll'];

function menu($http, $scope, infoService, $rootScope, $location, $anchorScroll) {
  var vm = this;
  var today = new Date();
  vm.timeNow = today.getTime();

  $scope.update = function (body) {
    console.log(body);
    var update = $http.put('/product', body);
    update.then(function (res) {
      getMenu();
    })
  }
  $scope.sortType = 'name';
  $scope.sortReverse = false;
  $scope.searchProduct = '';
  $scope.create = function () {
    var product = {
      name: $scope.name,
      chinese: $scope.chinese,
      description: $scope.description,
      price: $scope.price,
      available: true
    }
    console.log(product);
    var create = $http.post('/product', product);
    create.then(function (res) {
      $scope.name = '';
      $scope.chinese = '';
      $scope.description = '';
      $scope.price = '';

      getMenu();
    })
  }
  $scope.delete = function (body) {
    if (confirm('Remove ' + body.name + ' from menu?')){
      var deleteM = $http.delete('/product/' + body._id );
      deleteM.then(function (res) {
        getMenu();
      })
    }
  }
  function getMenu() {
    var menu = $http.get('/products');
    menu.then(function (res) {
      vm.list = res.data;
    })
  }
  function activate() {
    getMenu();
  }
  activate();
}
