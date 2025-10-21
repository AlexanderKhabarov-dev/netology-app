import mongoose from 'mongoose'

const bookSchema = new mongoose.Schema({
  id: { type: String },       
  fileId: { type: String },                         
  title: { type: String },                             
  description: { type: String },                       
  authors: { type: String },                           
  favorite: { type: Boolean, default: false },         
  fileCover: { type: String },                         
  fileName: { type: String }                           
});

const Book = mongoose.model('Book', bookSchema)

export default Book