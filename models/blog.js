const config = require('../utils/config')
const mongoose = require('mongoose')
const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: {
    type: Number,
    default: 0
  }
}) // define schema of blog

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
  }
})

const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl) // mongoose

module.exports = mongoose.model('Blog', blogSchema)