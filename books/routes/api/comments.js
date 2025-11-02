import express from 'express'

import { createComment, deleteComment } from '../../controllers/api/apiCommentsController.js'

const router = express.Router()

router.post('/create', createComment)
router.delete('/delete/:id', deleteComment)

export default router