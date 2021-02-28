import React, { useState } from 'react'

const Blog = ({ blog, updateBlog, deleteBlog, username }) => {
  const [verbose, setVerbose] = useState(false)

  const hideWhenVerbose = { display: verbose ? 'none' : '' }
  const viewWhenVerbose = { display: verbose ? '' : 'none' }
  const showWhenUser = { display: username === blog.user.username ? '' : 'none' }

  const toggleVerbose = () => {
    setVerbose(!verbose)
  }

  const addLike = () => {
    const blogObject = {
      user: blog.user.id,
      likes: blog.likes + 1,
      title: blog.title,
      author: blog.author,
      url: blog.url
    }
    updateBlog(blog.id, blogObject)
  }

  const removeBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      deleteBlog(blog.id)
    }
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      <div style={hideWhenVerbose} className='non-verbose'>
        {blog.title} {blog.author}
        <button onClick={toggleVerbose}>view</button>
      </div>
      <div style={viewWhenVerbose} className='verbose'>
        {blog.title} {blog.author}
        <button onClick={toggleVerbose}>hide</button>
        <div>{blog.url}</div>
        <div>
          likes {blog.likes}
          <button onClick={addLike}>like</button>
        </div>
        <div>{blog.user.name}</div>
        <button style={showWhenUser} onClick={removeBlog}>remove</button>
      </div>
    </div>
  )
}

export default Blog