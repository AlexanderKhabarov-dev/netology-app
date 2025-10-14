import express from 'express'

import { login } from '../../controllers/api/apiUserController.js'

const router = express.Router()

router.post('/login', login)

export default router