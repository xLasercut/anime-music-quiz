import * as fs from 'fs'

function readFile(filepath: string): Array<any> {
  return JSON.parse(fs.readFileSync(filepath, { encoding: 'utf-8' }))
}

function writeFile(filepath: string, data: Array<any>): void {
  fs.writeFileSync(filepath, JSON.stringify(data, null, 2))
}

export { readFile, writeFile }