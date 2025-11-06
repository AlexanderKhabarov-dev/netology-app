import bookRepository from '../../repositories/book/booksRepository.js'
import commentsRepository from '../../repositories/comments/commentsRepository.js'

export const renderHomePage = async (_req, res) => {
  const books = await bookRepository.getAll() ?? []

  const data = { title: 'Книги', books: books }
  res.render('index', data)
}

export const renderViewBookPage = async (req, res) => {
  const book = await bookRepository.getById(req.params.id)
  const url = `${process.env.COUNTER_API}/counter/${book._id}`

  const result = await fetch(url, { method: 'GET' })
  const { counter: viewCounter } = await result.json()

  const comments = await commentsRepository.getAllCommentsFromBookId(book._id)
  const commentsWithDeletePermission = 
    comments.map(item => ({
      ...item, 
      canDelete: req.user.id === item.userId
    }))

  const data = { 
    title: book.title, 
    book, 
    viewCounter, 
    comments: commentsWithDeletePermission 
  }

  res.render('view', data)
}

export const renderEditBookPage = async (req, res) => {
  const book = await bookRepository.getById(req.params.id)

  const data = { title: 'Редактирование книги', book }
  res.render('update', data)
}

export const renderCreateBookPage = (req, res) => {
  res.render('create', { title: 'Создание книги '})
}