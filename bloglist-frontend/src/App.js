import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Message from './components/Message'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  const [message, setMessage] = useState(null)
  const [messageSeverity, setMessageSeverity] = useState(1)

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const parsedUser = JSON.parse(loggedUserJSON)
      setUser(parsedUser)
      blogService.setToken(parsedUser.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })
      setUser(user)
      setUsername('')
      setPassword('')
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      console.log(user.token)
      blogService.setToken(user.token)
      setMessage('user signed in')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (exception) {
      setMessage('wrong username or password')
      setMessageSeverity(2)
      setTimeout(() => {
        setMessage(null)
        setMessageSeverity(1)
      }, 5000)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    console.log('logging out', user.name)
    setUser(null)
    window.localStorage.removeItem('loggedBlogappUser')
  }

  const addBlog = async (newBlog) => {
    try {
      const blog = await blogService.create(newBlog)
      blogFormRef.current.toggleVisibility()
      setBlogs(blogs.concat(blog))

      setMessage(`a new blog ${blog.title} by ${blog.author} added`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (exception) {
      setMessage('Blog not added')
      setMessageSeverity(2)
      setTimeout(() => {
        setMessage(null)
        setMessageSeverity(1)
      }, 5000)
    }
  }

  const like = async (blog) => {
    const likedBlog = await blogService.like({
      ...blog,
      user: blog.user.id,
      likes: blog.likes + 1,
    })

    setBlogs(blogs.filter((post) => post.id !== blog.id).concat(likedBlog))
  }

  return (
    <div>
      {user ? (
        <div>
          <h2>blogs</h2>
          <Message message={message} severity={messageSeverity}></Message>
          <p>
            {user.name} logged in <button onClick={handleLogout}>logout</button>
          </p>
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm addBlog={addBlog}></BlogForm>
          </Togglable>
          {blogs
            .sort((a, b) => {
              return a.likes - b.likes
            })
            .map((blog) => (
              <Blog key={blog.id} blog={blog} like={like} />
            ))}
        </div>
      ) : (
        <div>
          <h2>log in to application</h2>
          <Message message={message} severity={messageSeverity}></Message>
          <LoginForm
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            handleLogin={handleLogin}
          ></LoginForm>
        </div>
      )}
    </div>
  )
}

export default App
