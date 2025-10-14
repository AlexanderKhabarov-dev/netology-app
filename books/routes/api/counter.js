import express from 'express'

const router = express.Router()

router.post('/:bookId/incr', async (req, res) => {
  const { bookId } = req.params
  const url = `${process.env.COUNTER_API}/counter/${bookId}/incr`

  const result = await fetch(url, { method: 'POST' })
  const data = await result.json()

  res.json(data)
})

export default router
