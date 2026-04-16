require("dotenv").config();

const fs = require("fs");
const request = require("request");
const Spotify = require("node-spotify-api");
const keys = require("./keys.js");

const spotify = new Spotify(keys.spotify);

const command = process.argv[2];
const userInput = process.argv.slice(3).join(" ").trim();

function runLiri(action, input) {
  switch (action) {
    case "concert-this":
      bandsInTown(input);
      break;

    case "spotify-this-song":
      searchSpotify(input);
      break;

    case "movie-this":
      searchOmdb(input);
      break;

    case "do-what-it-says":
      whateverItSays();
      break;

    default:
      console.log(`
Please use one of these commands:
- node liri.js concert-this "Artist Name"
- node liri.js spotify-this-song "Song Name"
- node liri.js movie-this "Movie Name"
- node liri.js do-what-it-says
      `);
  }
}

function bandsInTown(artist) {
  const artistName = artist || "Drake";
  const queryUrl = `https://rest.bandsintown.com/artists/${encodeURIComponent(
    artistName
  )}/events?app_id=codingbootcamp`;

  request(queryUrl, (error, response, body) => {
    if (error) {
      console.log("Error fetching concert data:", error);
      return;
    }

    if (response.statusCode !== 200) {
      console.log("Unable to retrieve concert data.");
      return;
    }

    const data = JSON.parse(body);

    if (!Array.isArray(data) || data.length === 0) {
      console.log("No upcoming concerts found.");
      return;
    }

    console.log("\n--- Concert Information ---");
    console.log("Venue:", data[0].venue.name);
    console.log("Location:", `${data[0].venue.city}, ${data[0].venue.country}`);
    console.log("Date:", data[0].datetime);
  });
}

function searchSpotify(song) {
  const songName = song || "The Sign Ace of Base";

  spotify.search({ type: "track", query: songName, limit: 1 }, (err, data) => {
    if (err) {
      console.log("Spotify error:", err);
      return;
    }

    if (
      !data ||
      !data.tracks ||
      !data.tracks.items ||
      data.tracks.items.length === 0
    ) {
      console.log("No song found.");
      return;
    }

    const track = data.tracks.items[0];

    console.log("\n--- Song Information ---");
    console.log(
      "Artist(s):",
      track.artists.map((artist) => artist.name).join(", ")
    );
    console.log("Song Name:", track.name);
    console.log("Preview URL:", track.preview_url || "No preview available");
    console.log("Album:", track.album.name);
  });
}

function searchOmdb(movie) {
  const movieName = movie || "Mr. Nobody";
  const queryUrl = `http://www.omdbapi.com/?t=${encodeURIComponent(
    movieName
  )}&plot=short&apikey=trilogy`;

  request(queryUrl, (error, response, body) => {
    if (error) {
      console.log("Error fetching movie data:", error);
      return;
    }

    if (response.statusCode !== 200) {
      console.log("Unable to retrieve movie data.");
      return;
    }

    const data = JSON.parse(body);

    if (data.Response === "False") {
      console.log("Movie not found.");
      return;
    }

    console.log("\n--- Movie Information ---");
    console.log("Title:", data.Title);
    console.log("Year:", data.Year);
    console.log("IMDB Rating:", data.imdbRating);
    console.log("Rotten Tomatoes Rating:", getRottenTomatoesRating(data.Ratings));
    console.log("Country:", data.Country);
    console.log("Language:", data.Language);
    console.log("Plot:", data.Plot);
    console.log("Actors:", data.Actors);
  });
}

function getRottenTomatoesRating(ratings) {
  if (!ratings || !Array.isArray(ratings)) {
    return "N/A";
  }

  const rottenTomatoes = ratings.find(
    (rating) => rating.Source === "Rotten Tomatoes"
  );

  return rottenTomatoes ? rottenTomatoes.Value : "N/A";
}

function whateverItSays() {
  fs.readFile("random.txt", "utf8", (error, data) => {
    if (error) {
      console.log("Error reading random.txt:", error);
      return;
    }

    const parts = data.split(",");

    if (parts.length < 2) {
      console.log("random.txt is not formatted correctly.");
      return;
    }

    const fileCommand = parts[0].trim();
    const fileInput = parts[1].replace(/"/g, "").trim();

    runLiri(fileCommand, fileInput);
  });
}

runLiri(command, userInput);
