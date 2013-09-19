var ngLastfm = angular.module("ngLastfm", ['ngResource']);

ngLastfm.factory("Lastfm", function($resource){
  return {
    recentTracks       : $resource("/recent_tracks"),
    recommendedArtists : $resource("/recommended_artists"),
    newTracks          : $resource("/new_tracks")
  }
});

ngLastfm.controller("RecentTracks", function($scope, Lastfm) {
  $scope.recentTracks = Lastfm.recentTracks.query({}, isArray = true);
});

ngLastfm.controller("RecommendedArtists", function($scope, Lastfm) {
  $scope.recommendedArtists = Lastfm.recommendedArtists.query({}, isArray = true);
});

ngLastfm.controller("NewTracks", function($scope, Lastfm)) {
   newTracks = Lastfm.newTracks.query({}, isArray = true).then(function(data){
     
   });
  
  
}
