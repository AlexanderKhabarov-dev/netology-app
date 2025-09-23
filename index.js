import express from 'express'
import { v4 as uuidv4 } from 'uuid'

const app = express()

app.use(express.json())

const mockBook = {
  id: 'uuidv4-1',
  title: 'Тестовая книга',
  description: 'Тестовое описание',
  authors: 'Я',
  favorite: 'Я',
  fileCover: 'фыв',
  fileName: 'фыв.txt'
}

let books = [mockBook]

app.post('/api/user/login', (_req, res) => {
  res.status(201).json({ id: 1, mail: "test@mail.ru" })
})

app.get('/api/books', (_req, res) => {
  res.json(books)
})

app.get('/api/books/:id', (req, res) => {
  const book = books.find(b => b.id === req.params.id)

  if (!book) {
    return res.status(404).send()
  }

  res.json(book)
})

app.post('/api/books/create', ({ body }, res) => {
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
})

app.put('/api/books/:id', ({ body, params }, res) => {
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
})

app.delete('/api/books/:id', (req, res) => {
  const index = books.findIndex(b => b.id === req.params.id)

  if (index === -1) {
    return res.status(404).send()
  }

  books.splice(index, 1)
  res.send(`Книга: ${req.params.id} - удалена`)
})

const PORT = 3000
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
