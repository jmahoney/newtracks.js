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
  $scope.spotifyTracks = [];
  $scope.showplayer = false;  
  
  Lastfm.newTracks.query({}, isArray = true).$then(function(value) {
    getSpotifyTracks(value.data);
  });
  
  Lastfm.recommendedArtists.query({}, isArray = true).$then(function(value) {
    getArtists(value.data);
  });
  
  getArtists = function(artistData) {
    $scope.artists = artistData;
  }
  
  // do spoitify searches with the data provied by lastfm
  getSpotifyTracks = function(trackData) {
    // we wait till all our spotify calls are done before we do 
    // anything with the data
    var promises = [];    
    trackData.forEach(function(obj, i) {
      promises.push(searchSpotify(obj));      
    });
        
    $q.all(promises).then(function(value) {
      populatePlaylist(value);
      showSpotifyPlayer();
    });
  }
  
  // search for a track on spotify, passing in the artist name and track name
  searchSpotify = function(track) {
    var searchTerm = encodeURIComponent(track['artist']['name'] + " " + track['name']);
    
    // We're deferring the actual execution api call to the function that calls us        
    var d = $q.defer();
    var result = Lastfm.spotifyTrack.get({q: searchTerm}, function() {
      d.resolve(result);
    })
    return d.promise;
  }
  
  // the spotify player is an iframe that takes a string of ids
  // as part of its url. this method massages the array
  // of hrefs we got from the spotify api and turns them into 
  // a comma delimited string the iframe player can use
  populatePlaylist = function(data) {
    data.forEach(function(obj, i) {
      $scope.spotifyTracks.push(obj['tracks'][0]['href'].substring(14));
    })
    $scope.spotifyTrackIds = $scope.spotifyTracks.join(',');
  } 
  
  showSpotifyPlayer = function() {
    $scope.showplayer = true;
  }
  
});

ngNewTracks.directive("spotifyPlayer", function(){
  return {
    restrict: "E",
    transclude: true,
    replace: true,
    scope: {
      tracks: "@"
    },
    template: "<iframe src='https://embed.spotify.com/?uri=spotify:trackset:NewTracks.js:{{tracks}}' frameborder='0' allowtransparency='true' width='300' height='800' ng-transclude></iframe>"        
  }
});

ngNewTracks.directive("artistTile", function(){
  return {
    restrict: "E",
    transclue: true,
    replace: true,
    scope: {
      src: "@",
      name: "@",
      link: "@"
    },
    template: "<div class='artist'><a href='{{link}}'><img src='{{src}}' width='252' alt='{{name}}' border='0'></a><a href='{{link}}'>{{name}}</a>"    
  }
});


