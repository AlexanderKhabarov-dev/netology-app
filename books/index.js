import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

import { logger, errors } from './middleware/index.js'
import booksApiRouter from './routes/api/books.js'
import counterApiRouter from './routes/api/counter.js'
import userApiRouter from './routes/api/user.js'
import viewRouter from './routes/views/index.js'
import fileApiRouter from './routes/api/file.js'

dotenv.config()
const app = express()

app.use(express.static('public'))
app.use(express.urlencoded())
app.use(express.json())
app.use(logger)

// API
app.use('/api/books', booksApiRouter)
app.use('/api/user', userApiRouter)
app.use('/api/file', fileApiRouter)
app.use('/counter', counterApiRouter)

app.set("view engine", "ejs")

// VIEW
app.use('/', viewRouter)

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
