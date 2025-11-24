import mongoose from 'mongoose'
import passportLocalMongoose from 'passport-local-mongoose'
import { ModelUserType, MongooseUserType } from './types.ts'

const UserSchema = new mongoose.Schema<MongooseUserType>({ username: String /*...*/ })

UserSchema.plugin(passportLocalMongoose)

const User = mongoose.model<MongooseUserType, ModelUserType>('User', UserSchema)

export default User
