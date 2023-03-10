const { rest } = require('lodash')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('../utils/list_helper')


const api = supertest(app)

let blogContent = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(blogContent)
})

describe('blog utilities', () => {
  test('of empty list is zero', () => {
    expect(helper.totalLikes([])).toBe(0)
  })
  test('when list has only one blog equals the likes of that', () => {
    expect(helper.totalLikes([blogContent[0]])).toBe(7)
  })
  test('of a bigger list is calculated right', () => {
    const result = helper.totalLikes(blogContent)
    expect(result).toBe(36)
  })
  test('contains property id instead of _id', async () => {
    const res = await api
      .get('/api/blogs')
    expect(res.body[0].id).toBeDefined();
  })
})

describe('api tests', () => {
  test('get blogs', async () => {
    const res = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    expect(res.body).toHaveLength(6)
  })
  test('make new blog', async () => {
    const blogPost = {
      "title": "Test Blog Post",
      "author": "Alex Kontos",
      "url": "url",
    }
    await api
      .post('/api/blogs')
      .send(blogPost)
      .expect(201)
    const res = await api.get('/api/blogs')
    const responseTitles = res.body.map(blog => blog.title)
    expect(responseTitles).toContain("Test Blog Post")
    expect(res.body).toHaveLength(7)
    const responseNewPost = res.body.find(blog => blog.title === "Test Blog Post")
    expect(responseNewPost.likes).toBe(0)
  })
  test('make bad new blog', async () => {
    const badBlogPost = {
      "author": "Alex Kontos",
    }
    await api
      .post('/api/blogs')
      .send(badBlogPost)
      .expect(400)
  })
})



afterAll(async () => {
  await mongoose.connection.close()
})