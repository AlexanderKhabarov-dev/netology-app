import fileRepository from '../../repositories/file/fileRepository.js'

export const uploadFile = async (req, res) => {
  if (!req.file) {
    return res.status(400).send({ errorMessage: 'Файл не загружен' })
  }

  const createdFile = await fileRepository.createFile(req.file)

  res.json({ fileName: createdFile.fileName, id: createdFile._id })
}

export const downloadFile = async (req, res) => {
  const filePath = await fileRepository.getFilePath(req.params.id)

  if (!filePath) {
    return res.status(404).send({ errorMessage: 'Файл не найден' })
  }
  
  res.sendFile(filePath, err => {
    if (err) {
      res.status(404).send({ errorMessage: 'Файл не найден' })
    }
  })
}