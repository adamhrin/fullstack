import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setMessage } from '../reducers/notificationReducer'
import { createBlog } from '../reducers/blogReducer'

const BlogForm = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }

    dispatch(createBlog(blogObject, user))

    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
    dispatch(setMessage(`a new blog ${newTitle} by ${newAuthor} added`))
  }

  return (
    <form onSubmit={addBlog}>
      <h2>create new</h2>
      <div>
        title:
        <input
          id='title'
          type="text"
          value={newTitle}
          name="newTitle"
          onChange={({ target }) => setNewTitle(target.value)}
        />
      </div>
      <div>
        author:
        <input
          id='author'
          type="text"
          value={newAuthor}
          name="newAuthor"
          onChange={({ target }) => setNewAuthor(target.value)}
        />
      </div>
      <div>
        url:
        <input
          id='url'
          type="text"
          value={newUrl}
          name="newUrl"
          onChange={({ target }) => setNewUrl(target.value)}
        />
      </div>
      <button id="createBtn" type="submit">create</button>
    </form>
  )
}

export default BlogForm