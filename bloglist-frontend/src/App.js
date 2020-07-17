import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Message from './components/Message'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

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

  const handleBlogAdd = async (event) => {
    event.preventDefault()
    try {
      const blog = await blogService.create({
        title: title,
        author: author,
        url: url,
      })

      setTitle('')
      setAuthor('')
      setUrl('')
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

  return (
    <div>
      {user ? (
        <div>
          <h2>blogs</h2>
          <Message message={message} severity={messageSeverity}></Message>
          <p>
            {user.name} logged in <button onClick={handleLogout}>logout</button>
          </p>
          <h2>create new</h2>
          <BlogForm
            title={title}
            setTitle={setTitle}
            author={author}
            setAuthor={setAuthor}
            url={url}
            setUrl={setUrl}
            handleBlogAdd={handleBlogAdd}
          ></BlogForm>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
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
