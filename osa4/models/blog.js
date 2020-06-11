const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
  title: { type: String, required: true, minlength: 5 },
  author: String,
  url: { type: String, required: true, minlength: 5 },
  likes: Number,
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog
