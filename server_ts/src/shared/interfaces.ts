import { UserData } from "../database/user"


interface Song {
  songId: string
  src: string
  anime: Array<string>
  title: string
  artist: string
  type: string
}

interface UserDatas {
  [key: string]: UserData
}

export { Song, UserDatas }