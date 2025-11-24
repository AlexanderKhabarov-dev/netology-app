import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import passport from 'passport'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import http from 'node:http'
import { Server } from 'socket.io'
import sharedsession from 'express-socket.io-session'
import { createServer } from 'vite'

import { logger, errors } from './middleware/index.js'
import booksApiRouter from './routes/api/books.js'
import counterApiRouter from './routes/api/counter.js'
import commentsApiRouter from './routes/api/comments.js'
import userApiRouter from './routes/api/user.js'
import booksView from './routes/views/books.js'
import userView from './routes/views/user.js'
import fileApiRouter from './routes/api/file.js'

import User from './repositories/user/UserSchema.ts'
import { isLoggedIn, redirectFromLoginToHome } from './middleware/isLoggedIn.js'
import { isLoggedInApi } from './middleware/isLoggedIn.js'
import { setupCommentsSocketHandlers } from './websockets/comments.js'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config()
const app = express()
const server = new http.Server(app)
const io = new Server(server)

// #region SESSION
const expressSession = session({
  secret: '1234_5678_910',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.DB_URI,
    ttl: 24 * 60 * 60,
  }),
  cookie: {
    maxAge: 3 * 60 * 60 * 1000,
  },
})

app.use(expressSession)
io.use(
  sharedsession(expressSession, {
    autoSave: true,
  })
)

app.use(passport.initialize())
app.use(passport.session())

// #region PRIVATE ROUTES
app.use('/api/books', isLoggedInApi)
app.use('/api/file', isLoggedInApi)
app.use('/api/comments', isLoggedInApi)
app.use('/counter', isLoggedInApi)

app.use('/books', isLoggedIn)
app.use('/profile', isLoggedIn)

app.use('/login', redirectFromLoginToHome)
app.use('/signup', redirectFromLoginToHome)

// #region AUTH
passport.use(User.createStrategy())

// TODO: почему-то конфликт типов
// @ts-ignore
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

// #region COMMON
app.use((_req, res, next) => {
  res.locals.port = process?.env?.CLIENT_HOST || 3001
  next()
})

app.use(express.static('client'))
app.use(express.static('public'))
app.use(express.urlencoded())
app.use(express.json())
app.use(logger)

//#region API ROUTES
app.get('/', (_req, res) => {
  res.redirect('/books/homePage')
})

app.use('/api/books', booksApiRouter)
app.use('/api/user', userApiRouter)
app.use('/api/file', fileApiRouter)
app.use('/api/comments', commentsApiRouter)
app.use('/counter', counterApiRouter)

// #region VIEW
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use('/', booksView)
app.use('/', userView)

// #region ERRORS
app.use((_req, res) => res.status(404).render('404', { title: '404 - Страница не найдена' }))
app.use(errors)

// #region START SERVER
const viteDevServer = await createServer({
  server: {
    middlewareMode: true,
  },
  root: 'client',
  base: '/',
})
app.use(viteDevServer.middlewares)
server.listen(process.env.PORT, () => console.log(`Server started on port ${process.env.PORT}`))

mongoose.connect(process?.env?.DB_URI).catch(console.error)
mongoose
  .connect(process?.env?.DB_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err))

setupCommentsSocketHandlers(io)
