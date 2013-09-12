var key = "";
var api_resource = "http://ws.audioscrobbler.com/2.0/?";
var format = "&format=json";
var user = "&user=foaf";
var api = "&api_key=" + key;


var RecentTracks = function($scope, $http) {
  var method = "method=user.getrecenttracks";
  var request = api_resource+method+user+api+format
  
  var result = $http.get(request);
  result.success(function(data) {
    $scope.items = data["recenttracks"]["track"];
  });
  
  
}