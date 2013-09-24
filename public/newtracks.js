var ngNewTracks = angular.module("ngNewTracks", ['ngResource']);

ngNewTracks.factory("Lastfm", function($resource){
  return {
    recentTracks        : $resource("/recent_tracks"),
    recommendedArtists  : $resource("/recommended_artists"),
    newTracks           : $resource("/new_tracks"),
    spotifyTrack        : $resource("http://ws.spotify.com/search/1/track.json")

  }
});

ngNewTracks.controller("RecentTracks", function($scope, Lastfm) {
  $scope.recentTracks = Lastfm.recentTracks.query({}, isArray = true);
});

ngNewTracks.controller("RecommendedArtists", function($scope, Lastfm) {
  $scope.recommendedArtists = Lastfm.recommendedArtists.query({}, isArray = true);
});

ngNewTracks.controller("NewTracks", function($scope, $q, Lastfm) {
  
  searchSpotify = function(track) {
    console.log("looking up spotify for " + track['name'] + "by" + track['artist']['name']);    
    var searchTerm = encodeURIComponent(track['artist']['name'] + " " + track['name']);    
    var d = $q.defer();
    var result = Lastfm.spotifyTrack.get({q: searchTerm}, function() {
      d.resolve(result);
    })
    return d.promise;
  }
  
  setupSpotifyPlayer = function(data) {
    console.log(data);
    data.forEach(function(obj, i) {
      $scope.spotifyTracks.push(obj['tracks'][0]['href'].substring(14));
    })
    $scope.spotifyTrackIds = $scope.spotifyTracks.join(',');
    console.log($scope.spotifyTrackIds);
  } 
  
  getSpotifyTracks = function (trackData) {
    console.log("processing tracks");   
    var promises = [];
    
    trackData.forEach(function(obj, i) {
      promises.push(searchSpotify(obj));      
    });
    
    console.log(promises);
    
    $q.all(promises).then(function(value) {
      setupSpotifyPlayer(value)
    });
    
  }
  
  $scope.spotifyTracks = [];
  
  Lastfm.newTracks.query({}, isArray = true).$then(function(value) {
    getSpotifyTracks(value.data);
  });
  
});




