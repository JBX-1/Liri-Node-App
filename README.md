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
