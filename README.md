### newtracks.js

An angular.js experiment with last.fm & spotify - use it at [newtracks.cheerschopper.com](http://newtracks.cheerschopper.com)

Let's pretend we're extending an existing app but we're only allowed to update 
the HTML/CSS/JS - no new server side executable code is allowed.
The existing app can auth with last.fm and has a nice wrapper around its api. 

We want to show a spotify player with tracks found via last.fm. In order to satisfy 
our "no server executable code" rule we'll have to use javascript to talk to
spotify. In this case we're using angular.js.

At this point the basic functionality is working

* there's an angular module with a set of resources for talking to the internal last.fm api and with spotify directly
* the front-end references an angular controller that does a series of lookups to eventually populate a string of ids for the embedded spotify player
* the player loads and once all the api calls are done it's totally possible to play music
* permanent link to spotify with the suggested tracks
* artist images, linking back to their last.fm profiles

It could do with a serious makover and some error handling but it works and I enjoy using it every day.


