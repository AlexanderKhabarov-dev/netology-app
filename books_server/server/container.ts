import { Container } from 'inversify'
import { Model } from 'mongoose'

import BooksRepository from './repositories/book/BooksRepository.ts'
import Book from './repositories/book/BookSchema.ts'
import { MongooseBookType } from './repositories/book/types.ts'

import CommentsRepository from './repositories/comments/CommentsRepository.ts'
import Comment from './repositories/comments/CommentsSchema.ts'
import { MongooseCommentType } from './repositories/comments/types.ts'

import UserRepository from './repositories/user/UserRepository.ts'
import User from './repositories/user/UserSchema.ts'
import { MongooseUserType } from './repositories/user/types.ts'

const container = new Container()
container.bind<Model<MongooseBookType>>('BookModel').toConstantValue(Book)
container.bind(BooksRepository).toSelf()

container.bind<Model<MongooseCommentType>>('CommentModel').toConstantValue(Comment)
container.bind(CommentsRepository).toSelf()

container.bind<Model<MongooseUserType>>('UserModel').toConstantValue(User)
container.bind(UserRepository).toSelf()

export { container }
