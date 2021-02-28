import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let blog
  let component
  let mockUpdateBlog
  let mockDeleteBlog
  let mockUsername

  beforeEach(() => {
    blog = {
      title: 'Blog title',
      author: 'Blog author',
      url: 'https://url.com',
      likes: 5,
      user: {
        username: 'username'
      }
    }

    mockUpdateBlog = jest.fn()
    mockDeleteBlog = jest.fn()
    mockUsername = 'mock'

    component = render(
      <Blog
        blog={blog}
        updateBlog={mockUpdateBlog}
        deleteBlog={mockDeleteBlog}
        username={mockUsername}/>
    )
  })

  test('renders only title and author by default', () => {
    const nonVerboseDiv = component.container.querySelector('.non-verbose')
    const verboseDiv = component.container.querySelector('.verbose')

    expect(nonVerboseDiv).not.toHaveStyle('display: none')
    expect(verboseDiv).toHaveStyle('display: none')
  })

  test('clicking view button shows url and likes', () => {
    const button = component.getByText('view')
    fireEvent.click(button)

    const verboseDiv = component.container.querySelector('.verbose')
    expect(verboseDiv).not.toHaveStyle('display: none')
  })

  test('clicking like button twice fires handler twice', () => {
    const button = component.getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)

    expect(mockUpdateBlog.mock.calls).toHaveLength(2)
  })
})