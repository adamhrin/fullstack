import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

test('<BlogForm /> updates parent state and calls onSubmit', () => {
  const createBlog = jest.fn()

  const component = render(
    <BlogForm createBlog={createBlog} />
  )

  const titleInput = component.container.querySelector('#title')
  const authorInput = component.container.querySelector('#author')
  const urlInput = component.container.querySelector('#url')

  const form = component.container.querySelector('form')

  fireEvent.change(titleInput, {
    target: { value: 'New testing blog' }
  })
  fireEvent.change(authorInput, {
    target: { value: 'Author of new testing blog' }
  })
  fireEvent.change(urlInput, {
    target: { value: 'https://clickme.com' }
  })

  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('New testing blog')
  expect(createBlog.mock.calls[0][0].author).toBe('Author of new testing blog')
  expect(createBlog.mock.calls[0][0].url).toBe('https://clickme.com')
})