/*globals TLApp*/

TLApp.Controllers
  .controller("PlacesController", ["$scope",
    "PlacesService",
    "$location", function ($scope, PlacesService, $location) {

    $scope.loading = true;
    $scope.alert = "Carregando opções...";
    PlacesService.places().then(function (response) {
      $scope.places = response.data.places;
      $scope.loading = false;

    }, function () {
      $location.path("/logout");
    });

    $scope.goTo = function (placeSlug) {
      $location.path("/place/" + placeSlug);
    }
  }]);
