import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notif, setNotif] = useState(null)
  const [notifClassName, setNotifClassName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs => {
      const sortedBlogs = blogs.sort((a,b) => (a.likes > b.likes) ? -1 : 1)
      setBlogs( sortedBlogs )
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotifClassName('error')
      setNotif('Wrong credentials')
      setTimeout(() => {
        setNotif(null)
      }, 5000)
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <h2>login to application</h2>
      <Notification notif={notif} className={notifClassName} />
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        // NEVER MUTATE STATE DIRECTLY in React
        // therefore using concat which creates a new copy with added note object
        returnedBlog.user = user
        setBlogs(blogs.concat(returnedBlog))
      })
  }

  const updateBlog = (blogId, blogObject) => {
    blogService
      .update(blogId, blogObject)
      .then(returnedBlog => {
        const updatedBlog = blogs.find(b => b.id === returnedBlog.id)
        updatedBlog.likes += 1

        setBlogs(
          blogs.map(
            blog => blog.id !== blogId ?
              blog :
              updatedBlog
          )
        )
      })
  }

  const deleteBlog = (blogId) => {
    blogService
      .deleteBlog(blogId)
      .then(() => {
        setBlogs(blogs.filter(b => b.id !== blogId))
      })
  }

  const blogForm = () => (
    <Togglable buttonLabel='create new blog' ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )

  const blogList = () => (
    <div>
      {blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          updateBlog={updateBlog}
          deleteBlog={deleteBlog}
          username={user.username}/>
      )}
    </div>
  )

  return (
    <div>
      {user === null ?
        loginForm() :
        <div>
          <h2>blogs</h2>
          <Notification notif={notif} className={notifClassName} />
          <span>{user.name} logged-in</span>
          <button onClick={() => handleLogout()}>logout</button>
          {blogForm()}
          {blogList()}
        </div>
      }


    </div>
  )
}

export default App