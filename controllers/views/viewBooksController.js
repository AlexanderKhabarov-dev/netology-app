import bookRepository from '../../repositories/booksRepository.js'

export const renderHomePage = (req, res) => {
  const books = bookRepository.getAll()

  const data = { title: 'Книги', books }
  res.render('index', data)
}

export const renderViewBookPage = (req, res) => {
  const book = bookRepository.getById(req.params.id)

  const data = { title: book.title, book }
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