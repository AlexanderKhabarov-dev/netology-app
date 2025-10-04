import fs from 'fs'
import path from 'path'
import multer from 'multer'

export const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    const dir = path.join('public', 'books')
    
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }

    cb(null, dir)
  },
  filename: (_req, file, cb) => {
    cb(null, `${Date.now()} ${file.originalname}`)
  },
})