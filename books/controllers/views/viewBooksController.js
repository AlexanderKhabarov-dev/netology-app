import bookRepository from '../../repositories/booksRepository.js'

export const renderHomePage = (_req, res) => {
  const books = bookRepository.getAll()

  const data = { title: 'Книги', books }
  res.render('index', data)
}

export const renderViewBookPage = async (req, res) => {
  const book = bookRepository.getById(req.params.id)
  const url = `${process.env.COUNTER_API}/counter/${book.id}`

  const result = await fetch(url, { method: 'GET' })
  const { counter: viewCounter } = await result.json()

  const data = { title: book.title, book, viewCounter }
  res.render('view', data)
}

export const renderEditBookPage = (req, res) => {
  const book = bookRepository.getById(req.params.id)

  const data = { title: 'Редактирование книги', book }
  res.render('update', data)
}

export const renderCreateBookPage = (req, res) => {
  res.render('create', { title: 'Создание книги '})
}