import fs from 'fs'
import path from 'path'
import multer from 'multer'

export const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    const dir = path.join('public', 'files')
    
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }

    cb(null, dir)
  },
  filename: (_req, file, cb) => {
    const originalnameUtf8 = Buffer.from(file.originalname, 'latin1').toString('utf8')

    cb(null, `${Date.now()} ${originalnameUtf8}`)
  },
})
