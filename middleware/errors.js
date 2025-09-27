export const errors = (req, res, next) => {
  const status = err.status ?? 500
  const message = err.message ?? 'Ошибка сервера'

  res.status(status).send(message)
}

