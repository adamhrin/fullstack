import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { vote, deleteBlog } from '../reducers/blogReducer'
import { setMessage } from '../reducers/notificationReducer'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  const [verbose, setVerbose] = useState(false)

  const hideWhenVerbose = { display: verbose ? 'none' : '' }
  const viewWhenVerbose = { display: verbose ? '' : 'none' }
  const showWhenUser = { display: user.username === blog.user.username ? '' : 'none' }

  const toggleVerbose = () => {
    setVerbose(!verbose)
  }

  const addLike = () => {
    const updatedBlog = {
      user: blog.user.id,
      likes: blog.likes + 1,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      id: blog.id
    }

    dispatch(vote(updatedBlog))
    dispatch(setMessage(`you voted for '${blog.title}'`, 5))
  }

  const removeBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      dispatch(deleteBlog(blog.id))
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
    <div className='blog' style={blogStyle}>
      <div style={hideWhenVerbose} className='non-verbose'>
        {blog.title} {blog.author}
        <button className='viewBtn' onClick={toggleVerbose}>view</button>
      </div>
      <div style={viewWhenVerbose} className='verbose'>
        {blog.title} {blog.author}
        <button onClick={toggleVerbose}>hide</button>
        <div>{blog.url}</div>
        <div>
          likes {blog.likes}
          <button id='likeBtn' className='likeBtn' onClick={addLike}>like</button>
        </div>
        <div>{blog.user.name}</div>
        <button id='removeBtn' style={showWhenUser} onClick={removeBlog}>remove</button>
      </div>
    </div>
  )
}

export default Blog