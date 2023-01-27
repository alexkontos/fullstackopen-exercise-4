const config = require('../utils/config')
const mongoose = require('mongoose')
const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
}) // define schema of blog
const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl) // mongoose

module.exports = mongoose.model('Blog', blogSchema)