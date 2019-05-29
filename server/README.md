# Anime Music Quiz Server
A websocket based anime music quiz server.

## Packages
### Base Server
- [express](https://expressjs.com/)
- [socket.io](https://socket.io/)
- [winston](https://github.com/winstonjs/) (logging)
- [get-video-duration](https://github.com/caffco/get-video-duration)

### Database Generation
- [axios](https://github.com/axios/axios)
- [cheerio](https://github.com/cheeriojs/cheerio)

## Quick Start
1. Create a user list file `database/user/userlist.json` containing an empty array

2. Run the following commands to generate the anime database
```
npm run generate
npm run process
```

3. Run command `npm run start` to start server

## Database Generation
### Step 1 - generate-anime-list.js
Anime database information is obtained from [/r/AnimeThemes/wiki](https://www.reddit.com/r/AnimeThemes/wiki/index).
The script uses axios to get all 'anime year' page html. Then these are parsed using cheerio. Each song is then saved in `database/raw-anime.json` with a format:
```json
{
  "name": "Clannad",
  "src": "https://animethemes.moe/video/Clannad-OP1.webm",
  "title": "Megumeru ~cuckool mix 2007~",
  "artist": "",
  "type": "Opening"
}
```

### Step 2 - format-anime-list.js
Reads `database/raw-anime.json` produced in step 1. The do the following process:
1. Convert anime names based on a map. see `tools/shared/converter.js`
2. Removes any japanese names from song titles (these are always in brackets)
3. Removes any duplicate songs
This is then saved to `database/anime.json`

### Step 3 - generate-choices.js
Reads `database/anime.json` and generates all possible user choices (for the game).
Saves to `database/chocies.json`

## User Lists
The game uses one or more user list to generate a pool of songs to choose from.
User lists must first be initialised by creating a `.json` file in the `database/user` directory.
The `.json` file must contain an empty array. example:

`database/user/example.json`
content:
```
[]
```

All user lists will be picked up by the server when started. This will allow the client to add or remove songs to any user list.

### Updating Anime Map
Some animes require grouping. This is done by adding to the map variable in `tools/shared/converter.js`. exaple:
```js
const map = {
  ...
  // the key is the name to convert to. Everything in the array are names to group
  // so in this case 'Log Horizon 2' and 'Log Horizon 2nd Season' will be converted to 'Log Horizon'
  'Log Horizon': ['Log Horizon 2nd Season', 'Log Horizon 2'],
  ...
}
```

After updating the anime map. you must run `npm run process` again to regenerate the anime database.
To update user lists, run `npm run convert`