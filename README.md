# LIRI Node App

LIRI is a command-line Node.js application that searches for concert, song, and movie information using external APIs.

## Features
- Search upcoming concerts for an artist
- Search Spotify for song details
- Search OMDb for movie details
- Run a preset command from `random.txt`

## Technologies Used
- Node.js
- JavaScript
- Spotify API
- OMDb API
- Bands in Town API
- Dotenv

## Installation
1. Clone this repository
2. Run `npm install`
3. Create a `.env` file in the root folder
4. Add your Spotify credentials:

```env
SPOTIFY_ID=your_spotify_id
SPOTIFY_SECRET=your_spotify_secret







Commands
Concert Search
node liri.js concert-this "Beyonce"
Spotify Song Search
node liri.js spotify-this-song "Halo"
Movie Search
node liri.js movie-this "Interstellar"
Read from File
node liri.js do-what-it-says
Default Searches
If no song is entered, the app searches for: The Sign Ace of Base
If no movie is entered, the app searches for: Mr. Nobody
If no artist is entered, the app searches for: Drake
