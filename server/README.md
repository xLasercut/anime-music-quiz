# Anime Music Quiz Server
A websocket based anime music quiz server.

## Packages
### Base Server
- [express](https://expressjs.com/)
- [socket.io](https://socket.io/)
- [winston](https://github.com/winstonjs/) (logging)

## Quick Start
1. Create a user list file `database/data/user/<name>.json` containing an empty array
2. Run command `npm run start` to start server


## Misc
### Adding More Emojis
Add emojis to `database/data/emoji.json`.
For standard emojis, use the dec code as the source and `dec` as type.
```json
{
  "notes": {
    "src": "&#127926;",
    "type": "dec"
  }
}
```

For custom emojis, add the image source and `img` as type.
```json
{
  "worry": {
    "src": "https://cdn.discordapp.com/emojis/384946988770131970.png",
    "type": "img"
  }
}
```
