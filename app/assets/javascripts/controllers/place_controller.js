/*globals isttoApp*/

isttoApp.Controllers
  .controller("PlaceController", ["$scope",
    "$routeParams",
    "PlacesService",
    "$location", function ($scope, $routeParams, PlacesService, $location) {

    $scope.loading = true;
    $scope.alert = "Carregando opções...";

    var place = function() {
      PlacesService.place($routeParams.placeId).then(function (response) {
        $scope.place = response.data.place;
        $scope.loading = false;

      }, function () {
        $location.path("/logout");
      });
    }
    place();

    $scope.createMenu = function () {

      var menu = PlacesService.createMenu(
                  $scope.params.menuName, 
                  $scope.params.menuDescription, 
                  $scope.params.menuPrice, 
                  $scope.params.menuImage,
                  $routeParams.placeId  
                );

      menu.then(function (response) {
        place();
      }, function () {
        $scope.showError = true;
      });
    };

  }]);
