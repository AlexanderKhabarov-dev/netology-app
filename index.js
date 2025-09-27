import express from 'express'
import multer from 'multer'

import { logger, errors, storage } from './middleware/index.js'
import { 
  createBook, 
  getAllBooks, 
  getBookFromId, 
  updateBook, 
  deleteBook, 
  uploadFileForBook,
  downloadBook
} from './routes/books.js'

import { login } from './routes/user.js'


const app = express()
const upload = multer({ storage })

app.use(express.json())
app.use(logger)

// User
app.post('/api/user/login', login)

// Books
app.get('/api/books', getAllBooks)
app.get('/api/books/:id', getBookFromId)

app.put('/api/books/:id', updateBook)

app.post('/api/books/create', createBook)
app.post('/api/books/upload/:id', upload.single('file'), uploadFileForBook)

app.delete('/api/books/:id', deleteBook)

// Files
app.get('/api/books/:id/download', downloadBook)

app.use(errors)

const PORT = 3000
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
