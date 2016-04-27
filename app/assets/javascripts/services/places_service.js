/*globals TLApp, btoa*/
TLApp.Services
  .service("PlacesService", ["lodash",
    "$http",
    "$q",
    "localStorageService", function (_, $http, $q, Storage) {

    return {
      places: function () {
        return $http({
          method: "GET",
          url: TML_API_PATH + "chef/places",
          headers: { "Authorization": "Basic " + btoa(Storage.get("authToken") + ":") }
        });
      },

      place: function (placeId) {
        return $http({
          method: "GET",
          url: TML_API_PATH + "chef/menus/" + placeId,
          headers: { "Authorization": "Basic " + btoa(Storage.get("authToken") + ":") }
        });
      }
    };
  }]);
