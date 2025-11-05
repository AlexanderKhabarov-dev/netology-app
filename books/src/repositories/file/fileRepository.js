import path from 'path'
import { fileURLToPath } from 'url'

import FileModel from './fileSchema.js'

class FileRepository {
  constructor() {
    this.__filename = fileURLToPath(import.meta.url)
    this.__dirname = path.dirname(this.__filename)
  }

  async getFilePath(id) {
    const file = await FileModel.findById(id)

    if (!file) {
      return null
    }

    return path.join(this.__dirname, '../../public/files', file.fileName)
  }

  async createFile(fileData) {
    const newFile = new FileModel({
      fileName: fileData.filename,
      date: new Date(),
    })

    await newFile.save()

    return newFile
  }
}

export default new FileRepository()
