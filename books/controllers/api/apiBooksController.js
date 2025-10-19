import bookRepository from '../../repositories/booksRepository.js'

export const getAllBooks = (_req, res) => {
  const books = bookRepository.getAll()

  res.json(books)
}

export const getBookFromId = async (req, res) => {
  const book = await bookRepository.getById('68f5111a6b28085a82518341')

  if (!book) {
    return res.status(404).send({ errorMessage: 'Книга не найдена' })
  }

  res.json(book)
}

export const createBook = (req, res) => {
  bookRepository.create(req.body)

  res.json({ redirectUrl: '/' })
}

export const updateBook = (req, res) => {
  const updatedBook = bookRepository.update(req.params.id, req.body)

  if (!updatedBook) {
    return res.status(404).send({ errorMessage: 'Книга не найдена' })
  }

  res.json({ redirectUrl: `/` })
}

export const deleteBook = (req, res) => {
  const isDeleted = bookRepository.delete(req.params.id)

  if (!isDeleted) {
    return res.status(404).send({ errorMessage: 'Книга не найдена' })
  }

  res.send(`Книга с id ${req.params.id} удалена`)
}

export const uploadFileForBook = (req, res) => {
  if (!req.file) {
    return res.status(400).send({ errorMessage: 'Файл не загружен' })
  }

  const updated = bookRepository.uploadFile(req.params.id, req.file)

  if (!updated) {
    return res.status(404).send({ errorMessage: 'Книга не найдена' })
  }

  res.send('Файл успешно загружен')
}

export const downloadBook = (req, res) => {
  const filePath = bookRepository.getFilePath(req.params.id)

  if (!filePath) {
    return res.status(404).send({ errorMessage: 'Книга не найдена' })
  }
  
  res.sendFile(filePath, err => {
    if (err) {
      res.status(404).send({ errorMessage: 'Файл не найден' })
    }
  })
}
