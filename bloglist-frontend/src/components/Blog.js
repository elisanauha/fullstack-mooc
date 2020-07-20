import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, like, remove, usersPost }) => {
  const [showAll, setShowAll] = useState(false)

  const deleteBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      remove(blog.id)
    }
  }

  return (
    <div className="blogStyle">
      {!showAll ? (
        <div>
          {blog.title} {blog.author}{' '}
          <button onClick={() => setShowAll(true)}>view</button>
        </div>
      ) : (
        <div>
          <p>
            {blog.title} {blog.author}{' '}
            <button onClick={() => setShowAll(false)}>hide</button>
          </p>
          <p>{blog.url}</p>
          <p>
            likes {blog.likes} <button onClick={() => like(blog)}>like</button>
          </p>
          <p>{blog.user.name}</p>
          {usersPost && <button onClick={deleteBlog}>remove</button>}
        </div>
      )}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  like: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  usersPost: PropTypes.bool.isRequired,
}

export default Blog
