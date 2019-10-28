interface LogBaseConfig {
  [key: string]: LogConfig
}

interface LogConfig {
  Level: string
  Text: string
}

export { LogConfig, LogBaseConfig }