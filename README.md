# LIRI Node App

A command-line Node.js application that retrieves song and movie information using external APIs.

## Features
- Search song information
- Search movie information
- Read commands from a text file
- Display clean terminal output

## Tech Stack
- Node.js
- JavaScript
- Axios or Request
- Spotify API
- OMDb API
- Dotenv

## Installation
1. Clone the repo
2. Run `npm install`
3. Create a `.env` file for your API keys
4. Run the app with:
   - `node liri.js spotify-this-song "Song Name"`
   - `node liri.js movie-this "Movie Name"`
   - `node liri.js do-what-it-says`

## Why I Built This
This project helped me practice working with Node.js, APIs, command-line arguments, and environment variables.

## Future Improvements
- Better error handling
- Cleaner command parsing
- Add more APIs
- Improve terminal formatting
