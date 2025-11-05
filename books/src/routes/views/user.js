import express from 'express'
import { renderLoginPage, renderRegisterPage, renderUserProfile } from '../../controllers/views/viewLoginController.js'

const router = express.Router()

router.get('/login', renderLoginPage)
router.get('/signup', renderRegisterPage)
router.get('/profile', renderUserProfile)

export default router