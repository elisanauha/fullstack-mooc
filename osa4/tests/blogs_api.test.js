const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('id field is called id not _id', async () => {
  const blogs = await helper.blogsInDb()
  expect(blogs[0].id).toBeDefined()
})

test('adding blog adds to the number of blogs', async () => {
  const newBlog = {
    title: 'How to Refactor',
    author: 'Blog Writer',
    url: 'www.example.com',
    likes: 10,
  }

  await api.post('/api/blogs').send(newBlog).expect(201)

  const blogs = await helper.blogsInDb()
  expect(blogs).toHaveLength(helper.initialBlogs.length + 1)
})

test('adding blog adds the new blog title', async () => {
  const newBlog = {
    title: 'How to Refactor',
    author: 'Blog Writer',
    url: 'www.example.com',
    likes: 10,
  }

  await api.post('/api/blogs').send(newBlog).expect(201)

  const blogs = await helper.blogsInDb()
  const titles = blogs.map((n) => n.title)
  expect(titles).toContain(newBlog.title)
})

afterAll(() => {
  mongoose.connection.close()
})
