var ngLastfm = angular.module("ngLastfm", ['ngResource']);

ngLastfm.factory("Lastfm", function($resource){
  return {
    recentTracks  : $resource("/recent_tracks"),
    recentArtists : $resource("/recent_artists"),
    newTracks     : $resource("/new_tracks")
  }
});

ngLastfm.controller("RecentTracks", function($scope, Lastfm) {
  $scope.recentTracks = Lastfm.recentTracks.query({}, isArray = true);
});



