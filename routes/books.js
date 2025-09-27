import { v4 as uuidv4 } from 'uuid'
import path from 'path'
import { fileURLToPath } from 'url'


const mockBook = {
  id: 'uuidv4-1',
  title: 'Тестовая книга',
  description: 'Тестовое описание',
  authors: 'Я',
  favorite: 'Я',
  fileCover: 'фыв',
  fileName: 'фыв.txt'
}

// Мок БД
let books = [mockBook]

export const getAllBooks = (_req, res) => {
  res.json(books)
}

export const getBookFromId = (req, res) => {
  const book = books.find(b => b.id === req.params.id)

  if (!book) {
    return res.status(404).send()
  }

  res.json(book)
}

export const createBook = ({ body }, res) => {
  const newBook = {
    id: uuidv4(),
    title: body?.title ?? '',
    description: body?.description ?? '',
    authors: body?.authors ?? '',
    favorite: body?.favorite ?? '',
    fileCover: body?.fileCover ?? '',
    fileName: body?.fileName ?? ''
  }

  books.push(newBook)
  res.json(newBook)
}

export const updateBook = ({ body, params }, res) => {
  const index = books.findIndex(b => b.id === params.id)

  if (index === -1) {
    return res.status(404).send()
  }

  books[index] = {
    ...books[index],
    title: body?.title ?? books[index].title,
    description: body?.description ?? books[index].description,
    authors: body?.authors ?? books[index].authors,
    favorite: body?.favorite ?? books[index].favorite,
    fileCover: body?.fileCover ?? books[index].fileCover,
    fileName: body?.fileName ?? books[index].fileName
  }

  res.json(books[index])
}

export const deleteBook = (req, res) => {
  const index = books.findIndex(b => b.id === req.params.id)

  if (index === -1) {
    return res.status(404).send()
  }

  books.splice(index, 1)
  res.send(`Книга: ${req.params.id} - удалена`)
}

export const uploadFileForBook = (req, res) => {
  const { file, params } = req

  const index = books.findIndex(b => b.id === params.id)

  if (index === -1) {
    return res.status(404).send('Книга не найдена')
  }

  if (!req.file) {
    return res.status(400).send('Файл не загружен')
  }

  books[index] = {
    ...books[index],
    fileName: file ? file.filename : '',
    fileBook: file ? file.path : '',
  }

  res.send('Файл успешно загружен')
}

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const downloadBook = ({ params }, res) => {
  const index = books.findIndex(b => b.id === params.id)

  if (index === -1) {
    return res.status(404).send('Книга не найдена')
  }

  const filePath = path.join(__dirname, '../public/img', books[index].fileName)

  res.sendFile(filePath, (err) => {
    if (err) {
      res.status(404).send('Файл не найден')
    }
  })
}