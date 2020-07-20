const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const results = await Blog.find({}).populate('user', {
    username: 1,
    name: 1,
    id: 1,
  })
  response.json(results)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes === undefined ? 0 : body.likes,
    user: user._id,
  })

  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  const populatedSavedBlog = await savedBlog.execPopulate('user', {
    username: 1,
    name: 1,
    id: 1,
  })
  return response.json(populatedSavedBlog.toJSON())
})

blogsRouter.delete('/:id', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  const user = await User.findById(decodedToken.id)

  if (user.blogs.includes(request.params.id.toString())) {
    // Poistetaan käyttäjältä
    user.blogs = user.blogs.filter(
      (blog) => blog.toString() !== request.params.id
    )
    await user.save()
    // Poistetaan itse blogi
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } else {
    response.status(401).json({
      error: 'deletion blog not allowed',
    })
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, body, {
    new: true,
  }).populate('user', {
    username: 1,
    name: 1,
    id: 1,
  })

  response.json(updatedBlog.toJSON())
})

module.exports = blogsRouter
