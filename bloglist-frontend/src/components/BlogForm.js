import React, { useState } from 'react'
import PropTypes from 'prop-types'
const BlogForm = ({ addBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleBlogAdd = (event) => {
    event.preventDefault()
    addBlog({
      title,
      author,
      url,
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <form onSubmit={handleBlogAdd}>
      <h2>create new</h2>
      <div>
        title:
        <input
          type="text"
          value={title}
          name="Title"
          id="title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author:
        <input
          type="text"
          value={author}
          name="Author"
          id="author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url:
        <input
          type="text"
          value={url}
          name="URL"
          id="url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit" id="create-button">
        create
      </button>
    </form>
  )
}
BlogForm.propTypes = {
  addBlog: PropTypes.func.isRequired,
}

export default BlogForm
