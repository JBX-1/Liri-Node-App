var request = require("request");
var dotenv = require("dotenv").config();
var keys = require("./keys.js");
var fs = require("fs");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);



var argument = process.argv[2];
var input = process.argv.slice(3).join("-");


function liri() {
if(argument === "concert-this") {
    console.log(input);
    bandsInTown(input);

}else if(argument === "spotify-this-song") {
    console.log("");
    searchSpotify(input);

} else if (argument === "movie-this") {
    console.log(input);
    searchOmdb(input);

} else if (argument === "do-what-it-says") {
    console.log("");
    whateverItSays(input);
    
}
};

liri();


function bandsInTown(artist) {
    request("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp", function(error, response, body) {
        
        // console.log(response)
        
        // If the request is successful
        if (!error && response.statusCode === 200) {
      
          // Parse the body of the site and recover just the imdbRating
          // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
        //   console.log(JSON.parse(body));
          console.log(JSON.parse(body)[0].venue.name)
          console.log(JSON.parse(body)[0].venue.city)
          console.log(JSON.parse(body)[0].datetime)

          var parsedInfo = JSON.parse(body);

        }
      });
    
}
// spotify search only got it give me the name of who wrote the song//
function searchSpotify (song) {
    spotify
        .search({ type: "track", query: song, limit: 1 }, function (err, data) {
            if (err) {
                return console.log("Error occurred: " + err);
            }
            else {
                console.log("artist: " + data.tracks.items[0].album.artists[0].name);
			}
        });
        console.log(searchOmdb)
}


// i put in where it only gives me space jam//
function searchOmdb () {

    var movieName =  "http://www.omdbapi.com/?t= space jam  &y=&plot=short&apikey=trilogy";

    if (!input) {
        input = "terminator";
    }

    request(movieName, function(error, response, body) {

        // If the request is successful
        if (!error && response.statusCode === 200) {
      
          // Parse the body of the site and recover just the imdbRating
          // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
        //   console.log("Release Year: " + JSON.parse(body).Year);

        //   var parsedInfo = JSON.parse(body);
          
          console.log("Title: " + JSON.parse(body).Released);
          
        

        }
      });
}

// doesnt take in the information i put in //
function whateverItSays() {
    
    fs.readFile("random.txt", "utf8", function(error, data) {
        // If the code experiences any errors it will log the error to the console.
        if (error) {
          return console.log(error);
        }
 });
}

