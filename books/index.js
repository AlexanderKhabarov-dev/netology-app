import express from 'express'
import dotenv from 'dotenv'

import { logger, errors } from './middleware/index.js'
import booksApiRouter from './routes/api/books.js'
import counterApiRouter from './routes/api/counter.js'
import userApiRouter from './routes/api/user.js'
import viewRouter from './routes/views/index.js'

dotenv.config()
const app = express()

app.use(express.static('public'))
app.use(express.urlencoded())
app.use(express.json())
app.use(logger)

// API
app.use('/api/books', booksApiRouter)
app.use('/api/user', userApiRouter)
app.use('/counter', counterApiRouter)

app.set("view engine", "ejs")

// VIEW
app.use('/', viewRouter)

// 404
app.use((_req, res) => res.status(404).render('404', { title: '404 - Страница не найдена' }))

app.use(errors)

app.listen(process.env.PORT, () => console.log(`Server started on port ${process.env.PORT}`))
