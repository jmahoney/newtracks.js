### newtracks.js

An angular.js experiment with last.fm & spotify

Let's pretend we're extending an existing app but we're only allowed to update 
the HTML/CSS/JS - no new server side executable code is allowed.
The existing app can auth with last.fm and has a nice wrapper around its api. 

We want to show a spotify player with tracks found via last.fm. In order to satisfy 
our "no server executable code" rule we'll have to use javascript to talk to
spotify. In this case we're using angular.js.

##### September 24, 2013

At this point the basic functionality is working

* there's an angular module with a set of resources for talking to the internal last.fm api and with spotify directly
* the front-end references an angular controller that does a series of lookups to eventually populate a string of ids for the embedded spotify player
* the player loads and once all the api calls are done it's totally possible to play music

On the todo list is:

* only show the player once tracks are loaded
* dive into angular routing and show different players based on different urls


