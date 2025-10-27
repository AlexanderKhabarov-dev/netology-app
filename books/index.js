import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import passport from 'passport'
import session from 'express-session'
import { Strategy as LocalStrategy } from 'passport-local'

import { logger, errors } from './middleware/index.js'
import booksApiRouter from './routes/api/books.js'
import counterApiRouter from './routes/api/counter.js'
import userApiRouter from './routes/api/user.js'
import booksView from './routes/views/books.js'
import userView from './routes/views/user.js'
import fileApiRouter from './routes/api/file.js'

import User from './repositories/user/userSchema.js'
import { isLoggedIn, redirectFromLoginToHome } from './middleware/isLoggedIn.js'
import { isLoggedInApi } from './middleware/isLoggedIn.js'

dotenv.config()
const app = express()

// SESSION
app.use(session({
  secret: '1234_5678_910',   
  resave: false,               
  saveUninitialized: false 
}))

app.use(passport.initialize())
app.use(passport.session())

app.use('/api/books', isLoggedInApi)
app.use('/api/file', isLoggedInApi)
app.use('/counter', isLoggedInApi)
app.use('/books', isLoggedIn)
app.use('/profile', isLoggedIn)
app.use('/login', redirectFromLoginToHome)
app.use('/register', redirectFromLoginToHome)

// AUTH
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

// COMMON
app.use(express.static('public'))
app.use(express.urlencoded())
app.use(express.json())
app.use(logger)

// API
app.get('/', (_req, res) => {
  res.redirect('/books/homePage')
})

app.use('/api/books', booksApiRouter)
app.use('/api/user', userApiRouter)
app.use('/api/file', fileApiRouter)
app.use('/counter', counterApiRouter)

app.set("view engine", "ejs")

// VIEW
app.use('/', booksView)
app.use('/', userView)

// ERRORS
app.use((_req, res) => res.status(404).render('404', { title: '404 - Страница не найдена' }))
app.use(errors)

// START SERVER
app.listen(process.env.PORT, () => console.log(`Server started on port ${process.env.PORT}`))

const uri = 'mongodb://root:root@mongo:27017/?authSource=admin'

mongoose.connect(uri).catch(console.error);
mongoose.connect(uri)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err))
