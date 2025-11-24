import express from 'express'

import { createComment, deleteComment } from '../../controllers/api/apiCommentsController.ts'

const router = express.Router()

router.post('/create', createComment)
router.delete('/delete/:id', deleteComment)

export default router
