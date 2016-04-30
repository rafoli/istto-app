/*globals isttoApp*/

isttoApp.Controllers
  .controller("PlacesController", ["$scope",
    "PlacesService",
    "$location", function ($scope, PlacesService, $location) {

    $scope.loading = true;
    $scope.alert = "Carregando opções...";

    var places = function () {
      PlacesService.places().then(function (response) {
        $scope.places = response.data.places;
        $scope.loading = false;
      }, function () {
        $location.path("/logout");
      });
    };
    places();

    $scope.goTo = function (placeId) {
      $location.path("/place/" + placeId);
    };

    $scope.createPlace = function () {

      var place = PlacesService.createPlace(
                  $scope.params.placeName, 
                  $scope.params.placeDescription, 
                  $scope.params.placeMoreDescription, 
                  $scope.params.placeLogo
                );

      place.then(function (response) {
        places();
      }, function () {
        $scope.showError = true;
      });
    };

  }]);
