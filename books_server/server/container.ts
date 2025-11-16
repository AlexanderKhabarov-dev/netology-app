import { Container } from 'inversify'
import { Model } from 'mongoose'

import Book from './repositories/book/bookSchema.ts'
import BooksRepository from './repositories/book/BooksRepository.ts'
import { MongooseBookType } from './repositories/book/types.ts'

const container = new Container()
container.bind<Model<MongooseBookType>>('BookModel').toConstantValue(Book)
container.bind(BooksRepository).toSelf()

export { container }
