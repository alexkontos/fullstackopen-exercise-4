const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  if (request.body.hasOwnProperty('title') && request.body.hasOwnProperty('url')) {
    const blog = new Blog(request.body)
    const savedBlog = blog.save()
    response.status(201).json(savedBlog)
  }
  else {
    response.status(400)
    response.end()
    return
  }
})

module.exports = blogRouter