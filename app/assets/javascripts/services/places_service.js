/*globals isttoApp, btoa*/
isttoApp.Services
  .service("PlacesService", ["lodash",
    "$http",
    "$q",
    "localStorageService", function (_, $http, $q, Storage) {

    return {
      createPlace: function (name, description, moreDescription, logo) {
        return $http({
          method: "POST",
          url: TT_API_PATH + "chef/places",
          data: { 'name' : name, 'description' : description, 'moreDescription' : moreDescription, 'logo' : logo },
          headers: { "Authorization": "Basic " + btoa(Storage.get("authToken") + ":") }
        });
      },
      createMenu: function (name, description, price, image, placeId) {
        return $http({
          method: "POST",
          url: TT_API_PATH + "chef/menus",
          data: { 'name' : name, 'description' : description, 'price' : price, 'image' : image, chef : placeId },
          headers: { "Authorization": "Basic " + btoa(Storage.get("authToken") + ":") }
        });
      },      

      places: function () {
        return $http({
          method: "GET",
          url: TT_API_PATH + "chef/places",
          headers: { "Authorization": "Basic " + btoa(Storage.get("authToken") + ":") }
        });
      },

      place: function (placeId) {
        return $http({
          method: "GET",
          url: TT_API_PATH + "chef/menus/" + placeId,
          headers: { "Authorization": "Basic " + btoa(Storage.get("authToken") + ":") }
        });
      }
    };
  }]);
