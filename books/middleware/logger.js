import fs from 'fs'
import os from 'os'

export const logger = ({ url, method }, res, next) => {
  const now = new Date()
  const data = `${now} ${method} ${url}`

  fs.appendFile('server.log', data + os.EOL, (err) => {
    if (err) {
      throw err
    }
  })
  
  next()
}