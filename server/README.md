# Anime Music Quiz Server
A websocket based anime music quiz server.

## Packages
### Base Server
- [express](https://expressjs.com/)
- [socket.io](https://socket.io/)
- [winston](https://github.com/winstonjs/) (logging)

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
1. Groups some animes together by replacing names (e.g. Attack on Titan OVA -> Attack On Titan)
2. Add alternative names for animes (e.g. A Certain Scientific Railgun for To Aru Kagaku no Railgun)
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

### Updating Anime Maps
## Replacing Anime Name
For some animes, it's better to replace name to a more easily typable one. e.g. Yu☆Gi☆Oh! -> Yu-Gi-Oh!.
This is controlled by `tools/shared/name-swap.js`
```js
module.exports = {
  // key is the name to convert from
  // value is the name to convert to. so in this case 'Yu☆Gi☆Oh! Zexal' is converted to 'Yu-Gi-Oh! Zexal'
  'Yu☆Gi☆Oh! Zexal': 'Yu-Gi-Oh! Zexal',
  ...
}
```

## Adding Alternative Answers
You can add alternative answer to animes. e.g. Attack on Titan will be flagged as correct for Shingeki no Kyojin.
This is controlled by `tools/shared/alternate-name.js`
```js
module.exports = {
  // key is the name of the anime
  // value is an array of alternative names
  // So in this case, 'Suzumiya Haruhi no Yuuutsu' songs will all get an alternative answer of 'The Melancholy of Haruhi Suzumiya'
  'Suzumiya Haruhi no Yuuutsu': ['The Melancholy of Haruhi Suzumiya'],
  ...
}
```

## Anime OP/ED that applies to multiple seasons
Some songs applies to multiple seasons of anime. e.g. Database is correct for both Log Horizon and Log Horizon II.
This is controlled by `tools/shared/multi-season-songs.js`
```js
module.exports = {
  // Key is the song id to map (you can find this in the song list page of the client)
  // dupe contains duplicate songs to be removed from the song list
  // altName works the same way as above
  // so in this case, song 'LogHorizon-OP1' (aka database), will have alternative answer of 'Log Horizon 2nd Season' and 'LogHorizonS2-OP1' (which is also database) will be removed from the list
  'LogHorizon-OP1': {
    dupe: ['LogHorizonS2-OP1'],
    altName: ['Log Horizon 2nd Season']
  },
  ...
}
```

After updating the anime maps. you must run `npm run process` again to regenerate the anime database.
To update user lists, run `npm run convert`