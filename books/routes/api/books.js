import express from 'express'

import { 
  createBook, 
  getAllBooks, 
  getBookFromId, 
  updateBook, 
  deleteBook, 
} from '../../controllers/api/apiBooksController.js'

const router = express.Router()


router.get('/', getAllBooks)
router.get('/:id', getBookFromId)

router.put('/update/:id', updateBook)

router.post('/create', createBook)

router.delete('/delete/:id', deleteBook)

export default router