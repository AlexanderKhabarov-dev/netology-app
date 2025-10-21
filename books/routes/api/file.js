import express from 'express'
import multer from 'multer'

import { storage } from '../../middleware/multer.js'
import { downloadFile, uploadFile } from '../../controllers/api/apiFileController.js'

const router = express.Router()
const upload = multer({ storage })

router.post('/upload', upload.single('file'), uploadFile)
router.get('/:id/download', downloadFile)

export default router