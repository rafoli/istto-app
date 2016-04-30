/*globals angular, componentHandler */

var istto = "istto";

angular.module(istto, ["ngRoute",
  "istto.controllers",
  "istto.directives",
  "istto.services",
  "istto.filters",
  "LocalStorageModule",
  "ngLodash",
  "angular.filter"]);

angular.module(istto).config(function ($routeProvider, $locationProvider, localStorageServiceProvider) {
  var now = "?timestamp=" + Date.now();

  $routeProvider
    .when("/", {
      templateUrl: "templates/login/index.html" + now,
      controller: "LoginController"
    })

    .when("/logout", {
      templateUrl: "templates/login/index.html" + now,
      controller: "LogoutController"
    })

    .when("/places", {
      templateUrl: "templates/places/index.html" + now,
      controller: "PlacesController"
    })

    .when("/place/:placeId", {
      templateUrl: "templates/place/index.html" + now,
      controller: "PlaceController"
    });

  localStorageServiceProvider.setPrefix(istto);

}).run(function ($rootScope, $timeout, localStorageService, $location, AuthService, $window) {
  if (!AuthService.validateToken(localStorageService.get("authTokenWhen"), $location.url())) {
    localStorageService.clearAll();
    if ($window.location.hash !== '') $window.location.href = '/?timestamp=' + Date.now();
  }
});

var isttoApp = isttoApp || {};

isttoApp.Controllers = angular.module("istto.controllers", []);
isttoApp.Directives = angular.module("istto.directives", []);
isttoApp.Services = angular.module("istto.services", []);
isttoApp.Filters = angular.module("istto.filters", []);
