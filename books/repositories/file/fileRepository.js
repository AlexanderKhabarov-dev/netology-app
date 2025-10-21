import { v4 as uuidv4 } from 'uuid'
import path from 'path'
import { fileURLToPath } from 'url'

import File from './fileSchema.js'

class FileRepository {
  constructor() {
    this.__filename = fileURLToPath(import.meta.url);
    this.__dirname = path.dirname(this.__filename);
  }

  async getFilePath(id) {
    const file = await File.findById(id)
    
    if (!file) {
      return null
    }

    return path.join(
      this.__dirname,
      "../../public/files",
      file.fileName
    )
  }

  async createFile(fileData) {
    const newFile = new File({
      fileName: fileData.filename,
      date: new Date(),
    })

    await newFile.save()

    return newFile
  }
}

export default new FileRepository()