import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch(action.type) {
    case 'NEW_BLOG':
      return [...state, action.data]
    case 'VOTE': {
      const id = action.data.id
      const blogToChange = state.find(b => b.id === id)
      const changedBlog = {
        ...blogToChange,
        likes: blogToChange.likes + 1
      }
      console.log(changedBlog)
      return state.map(b => b.id !== id ? b : changedBlog)
    }
    case 'DELETE': {
      const id = action.data
      console.log(id)
      console.log(state.filter(b => b.id !== id))
      return state.filter(b => b.id !== id)
    }
    case 'INIT_BLOGS':
      return action.data
    default:
      return state
  }
}

export const createBlog = (content, user) => {
  return async dispatch => {
    const newBlog = await blogService.create(content)
    console.log(user)
    newBlog.user = user
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog,
    })
  }
}

export const vote = data => {
  return async dispatch => {
    const updatedBlog = await blogService.update(data.id, data)
    dispatch({
      type: 'VOTE',
      data: updatedBlog,
    })
  }
}

export const deleteBlog = id => {
  return async dispatch => {
    await blogService.deleteBlog(id)
    dispatch({
      type: 'DELETE',
      data: id
    })
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    const sortedBlogs = blogs.sort((a,b) => (a.likes > b.likes) ? -1 : 1)
    dispatch({
      type: 'INIT_BLOGS',
      data: sortedBlogs,
    })
  }
}

export default blogReducer