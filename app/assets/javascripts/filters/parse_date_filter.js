/*globals TLApp*/
TLApp.Filters
  .filter("parseDate", [function () {
    return function(value) {
      return Date.parse(value);
    };
}]);
