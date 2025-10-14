import express from 'express'
import multer from 'multer'

import { storage } from '../../middleware/multer.js'

import { 
  createBook, 
  getAllBooks, 
  getBookFromId, 
  updateBook, 
  deleteBook, 
  uploadFileForBook,
  downloadBook
} from '../../controllers/api/apiBooksController.js'

const router = express.Router()
const upload = multer({ storage })

router.get('/', getAllBooks)
router.get('/:id', getBookFromId)
router.get('/:id/download', downloadBook)

router.put('/update/:id', updateBook)

router.post('/create', createBook)
router.post('/upload/:id', upload.single('file'), uploadFileForBook)

router.delete('/delete/:id', deleteBook)

export default router