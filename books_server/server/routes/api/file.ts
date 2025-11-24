import express from 'express'
import multer from 'multer'

import { storage } from '../../middleware/multer.js'
import { downloadFile, uploadFile } from '../../controllers/api/apiFileController.js'

const router = express.Router()
const upload = multer({ storage })

// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
router.post('/upload', upload.single('file'), uploadFile)
router.get('/:id/download', downloadFile)

export default router
