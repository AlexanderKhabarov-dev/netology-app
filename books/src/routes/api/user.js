import express from 'express'
import passport from 'passport'

import { loginUser, logoutUser, registerUser } from '../../controllers/api/userController.js'

const router = express.Router()

router.post('/login', passport.authenticate('local'), loginUser)
router.post('/signup', registerUser)

router.get('/logout', logoutUser)

export default router