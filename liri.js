require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('Node-Spotify-API');
var spotify = new Spotify(keys.spotify);
var Twitter = require('twitter');
var client = new Twitter(keys.Twitter);
var request = require('request');
var fs = require("fs");
var command = process.argv[2];

var myTweets = function () {
    var params = { screen_name: 'dcjj123' };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            //console.log(tweets);
            for (var i = 0; i < tweets.length; i++) {
                console.log("Username: " + tweets[i].user.name);
                console.log("Tweet: " + tweets[i].text);
            }
        }

    });
}


var spotifythissong = function () {

    var [, , , ...input] = process.argv;
    var songinput = input.join(" ");
    var song = '';
    if (songinput === '') {
        song = 'The Sign Ace of Base'
    } else {
        song = songinput;
    }
    console.log(song);
    spotify.search({
        type: 'track',
        query: song,
        limit: 1
    },

        function (err, response) {
            if (err) {
                console.log(err);
            }
            //cant seem to get past artists in object
            var songinfo = response.tracks.items[0];        
            console.log("Artist: " + songinfo.artists[0].name);
            console.log("Songname: " + songinfo.name);
            console.log("Preview link " + songinfo.external_urls.spotify);
            console.log("Album: " + songinfo.album.name);
        });

};





var moviethis = function () {
    var [, , , ...input] = process.argv;
    var movieinput = input.join(" ");
    var movie = '';
    if (movieinput === '') {
        movie = 'Mr. Nobody'
    } else {
        movie = movieinput;
    }
    var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&apikey=73dab00"
    //console.log(queryUrl);
    request(queryUrl, function (error, response, body) {
        if (error) {
            console.log('err');
        } 
        var data = JSON.parse(body);
        var tomatoerating = (data.Ratings[1]);
        console.log('Title: ' + data.Title);
        console.log('Year: ' + data.Year);
        console.log('Imdb Rating: ' + data.imdbRating);
        // how to call object within an object for loop? key?
        console.log(tomatoerating);
        console.log('Country: ' + data.Country);
        console.log('Plot: ' + data.Plot);
        console.log('Actors: ' + data.Actors);

    });
};


var doWhatItSays = function () {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        } console.log(data);
    });

}


if (command === 'my-tweets') {
    myTweets();

} else if (command === 'spotify-this-song') {
    spotifythissong();
} else if (command === 'movie-this') {
    moviethis();
} else if (command === 'do-what-it-says') {
    doWhatItSays();
} else {
    console.log("error")
};