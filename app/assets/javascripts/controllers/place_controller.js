/*globals TLApp*/

TLApp.Controllers
  .controller("PlaceController", ["$scope",
    "$routeParams",
    "PlacesService",
    "$location", function ($scope, $routeParams, PlacesService, $location) {

    $scope.loading = true;
    $scope.alert = "Carregando opções...";
    PlacesService.place($routeParams.slug).then(function (response) {
      $scope.place = response.data.place;
      $scope.loading = false;

    }, function () {
      $location.path("/logout");
    });
  }]);
