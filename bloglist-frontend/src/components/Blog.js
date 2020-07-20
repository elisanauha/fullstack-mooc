import React, { useState } from 'react'
const Blog = ({ blog }) => {
  const [showAll, setShowAll] = useState(false)

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
            likes {blog.likes}{' '}
            <button onClick={() => console.log('liked')}>like</button>
          </p>
          <p>{blog.user.name}</p>
        </div>
      )}
    </div>
  )
}

export default Blog
