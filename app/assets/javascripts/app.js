/*globals angular, componentHandler */

var tomorrowLand = "tomorrowLand";

angular.module(tomorrowLand, ["ngRoute",
  "tomorrowLand.controllers",
  "tomorrowLand.directives",
  "tomorrowLand.services",
  "tomorrowLand.filters",
  "LocalStorageModule",
  "angularMoment",
  "ngLodash",
  "angular.filter"]);

angular.module(tomorrowLand).config(function ($routeProvider, $locationProvider, localStorageServiceProvider) {
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

    .when("/place/:slug", {
      templateUrl: "templates/place/index.html" + now,
      controller: "PlaceController"
    });

  localStorageServiceProvider.setPrefix(tomorrowLand);

}).run(function ($rootScope, $timeout, localStorageService, $location, AuthService, $window) {
  if (!AuthService.validateToken(localStorageService.get("authTokenWhen"), $location.url())) {
    localStorageService.clearAll();
    if ($window.location.hash !== '') $window.location.href = '/?timestamp=' + Date.now();
  }
});

var TLApp = TLApp || {};

TLApp.Controllers = angular.module("tomorrowLand.controllers", []);
TLApp.Directives = angular.module("tomorrowLand.directives", []);
TLApp.Services = angular.module("tomorrowLand.services", []);
TLApp.Filters = angular.module("tomorrowLand.filters", []);
