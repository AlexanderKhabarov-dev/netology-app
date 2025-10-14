import { incrementBookView } from '../api/counter/index.js'

const pathParts = window.location.pathname.split('/')
const bookId = pathParts[pathParts.length - 1]

incrementBookView(bookId)