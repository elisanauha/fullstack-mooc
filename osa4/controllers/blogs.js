const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const results = await Blog.find({})

  response.json(results)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes === undefined ? 0 : body.likes,
  })

  // try {
  //   const result = await blog.save()
  //   return response.status(201).json(result.toJSON())
  // } catch (exception) {
  //   return response.status(400)
  // }

  const result = await blog.save()
  return response.json(result.toJSON())
})

module.exports = blogsRouter
