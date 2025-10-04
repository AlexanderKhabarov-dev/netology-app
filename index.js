import express from 'express'

import { logger, errors } from './middleware/index.js'
import booksApiRouter from './routes/api/books.js'
import userApiRouter from './routes/api/user.js'
import viewRouter from './routes/views/index.js'

const app = express()

app.use(express.static('public'))
app.use(express.urlencoded())
app.use(express.json())
app.use(logger)

// API
app.use('/api/books', booksApiRouter)
app.use('/api/user', userApiRouter)

app.set("view engine", "ejs")

// VIEW
app.use('/', viewRouter)

// 404
app.use((_req, res) => res.status(404).render('404', { title: '404 - Страница не найдена' }))

app.use(errors)

const PORT = 3000
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
