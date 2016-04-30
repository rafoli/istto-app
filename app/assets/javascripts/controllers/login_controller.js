/*globals isttoApp*/

isttoApp.Controllers
  .controller("LoginController", ["$scope",
    "AuthService",
    "localStorageService",
    "$location", function ($scope, AuthService, Storage, $location) {

    $scope.showError = false;
    $scope.submitButton = "Entrar";
    $scope.params = {};

    $scope.login = function () {
      $scope.showError = false;
      $scope.submitButton = "Aguarde...";

      var auth = AuthService.getToken($scope.params);

      auth.then(function (response) {
        Storage.set("authToken", response.data.token);
        Storage.set("authTokenWhen", new Date().getTime());

        $location.path("/places");
      }, function () {
        $scope.showError = true;
      });
    };

    $scope.checkForToken = function () {
      var token = Storage.get("authToken");

      if (token) {
        $location.path("/places");
      }
    };

    $scope.checkForToken();
  }]);
