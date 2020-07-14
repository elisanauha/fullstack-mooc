const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')

const api = supertest(app)

describe('initial blogs saved', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    await helper.createUser()
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
  })

  test('id field is called id not _id', async () => {
    const blogs = await helper.blogsInDb()
    expect(blogs[0].id).toBeDefined()
  })

  describe('get', () => {
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
  })

  describe('post', () => {
    test('adding does not work without a token', async () => {
      const newBlog = {
        title: 'How to Refactor',
        author: 'Blog Writer',
        url: 'www.example.com',
        likes: 10,
      }

      await api.post('/api/blogs').send(newBlog).expect(401)

      const blogs = await helper.blogsInDb()
      expect(blogs).toHaveLength(helper.initialBlogs.length)
    })

    test('adding blog adds to the number of blogs', async () => {
      const newBlog = {
        title: 'How to Refactor',
        author: 'Blog Writer',
        url: 'www.example.com',
        likes: 10,
      }
      const bearertoken = await helper.getUserToken()

      await api
        .post('/api/blogs')
        .set('Authorization', bearertoken)
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

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
      const bearertoken = await helper.getUserToken()

      await api
        .post('/api/blogs')
        .set('Authorization', bearertoken)
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const blogs = await helper.blogsInDb()
      const titles = blogs.map((n) => n.title)
      expect(titles).toContain(newBlog.title)
    })

    test('adding blog with no likes has 0 likes', async () => {
      const newBlog = {
        title: 'This post has no likes',
        author: 'Blog Writer',
        url: 'www.nolikes.com',
      }
      const bearertoken = await helper.getUserToken()
      const result = await api
        .post('/api/blogs')
        .set('Authorization', bearertoken)
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      expect(result.body.likes).toBeDefined()
      expect(result.body.likes).toBe(0)
    })

    test('adding blog with no title gives bad request', async () => {
      const newBlog = {
        author: 'No Title Writer',
        url: 'www.notitle.com',
        likes: 10,
      }
      const bearertoken = await helper.getUserToken()
      await api
        .post('/api/blogs')
        .set('Authorization', bearertoken)
        .send(newBlog)
        .expect(400)
    })

    test('adding blog with url gives bad request', async () => {
      const newBlog = {
        title: 'This post has no url',
        author: 'No URL Writer',
        likes: 10,
      }
      const bearertoken = await helper.getUserToken()
      await api
        .post('/api/blogs')
        .set('Authorization', bearertoken)
        .send(newBlog)
        .expect(400)
    })
  })
  describe('delete/put', () => {
    test('deleting someone elses blog does not work', async () => {
      const blogs = await helper.blogsInDb()
      const blogToDelete = blogs[0]
      const bearertoken = await helper.getUserToken()
      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set('Authorization', bearertoken)
        .expect(401)

      const blogsAfter = await helper.blogsInDb()
      expect(blogsAfter).toHaveLength(helper.initialBlogs.length)
    })

    test('deleting blog works', async () => {
      // Add a new blog for user
      const newBlog = {
        title: 'How to Refactor',
        author: 'Blog Writer',
        url: 'www.example.com',
        likes: 10,
      }
      const bearertoken = await helper.getUserToken()

      const blogresponse = await api
        .post('/api/blogs')
        .set('Authorization', bearertoken)
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      // Then delete that blog
      const blogIdToDelete = blogresponse.body.id

      await api
        .delete(`/api/blogs/${blogIdToDelete}`)
        .set('Authorization', bearertoken)
        .expect(204)
      // Number of blogs should not have changed from original
      const blogsAfter = await helper.blogsInDb()
      expect(blogsAfter).toHaveLength(helper.initialBlogs.length)
    })

    test('editing blog works', async () => {
      const blogs = await helper.blogsInDb()
      const blogToEdit = blogs[0]
      const blogEdited = {
        title: blogToEdit.title,
        author: blogToEdit.author,
        url: blogToEdit.url,
        likes: 1492,
      }

      const result = await api
        .put(`/api/blogs/${blogToEdit.id}`)
        .send(blogEdited)
        .expect(200)

      expect(result.body.likes).toBe(blogEdited.likes)
    })
  })
})

afterAll(() => {
  mongoose.connection.close()
})
