const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const results = await User.find({})
  response.json(results)
})

usersRouter.post('/', async (request, response) => {
  const body = request.body

  if (body.password === undefined || body.password.length < 4) {
    return response.status(400).json({
      error: 'User validation failed: Password missing or length less than 4',
    })
  }
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.json(savedUser)
})

module.exports = usersRouter
