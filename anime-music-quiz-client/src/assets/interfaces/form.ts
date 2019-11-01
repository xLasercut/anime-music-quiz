interface ListFormInputs {
  password: string
}

interface MiscFormInputs {
  password: string
}

interface GameFormInputs {
  username: string
  password: string
  avatar: string
  score: number
}

interface AvatarMap {
  [key: string]: string
}

interface ComponentMap {
  [key: string]: any
}

interface InputInfo {
  username: string
  avatar: string
  score: number
}

export { ListFormInputs, GameFormInputs, MiscFormInputs, AvatarMap, ComponentMap, InputInfo }