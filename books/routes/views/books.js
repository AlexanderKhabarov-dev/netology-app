import express from 'express'
import { renderCreateBookPage, renderEditBookPage, renderHomePage, renderViewBookPage } from '../../controllers/views/viewBooksController.js'

const router = express.Router()

router.get('/books/homePage', renderHomePage)
router.get('/books/create', renderCreateBookPage)
router.get('/books/:id', renderViewBookPage)
router.get('/books/update/:id', renderEditBookPage)

export default router