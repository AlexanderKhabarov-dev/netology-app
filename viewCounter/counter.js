import express from 'express'
import fs from 'fs'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const COUNTERS_FILE = './counters.json'

const INCREMENT = 1

app.use(express.json())

let counters = {}

if (fs.existsSync(COUNTERS_FILE)) {
  counters = JSON.parse(fs.readFileSync(COUNTERS_FILE, 'utf8'))
}

const saveCounters = () => {
  fs.writeFileSync(COUNTERS_FILE, JSON.stringify(counters, null, 2))
}

app.post('/counter/:bookId/incr', (req, res) => {
  const { bookId } = req.params
  counters[bookId] = (counters[bookId] || INCREMENT) + INCREMENT
  saveCounters()
  res.json({ bookId, counter: counters[bookId] })
})

app.get('/counter/:bookId', (req, res) => {
  const { bookId } = req.params
  res.json({ bookId, counter: counters[bookId] || INCREMENT })
})

app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`)
})
