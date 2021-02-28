const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    console.log(blogObject)
    await blogObject.save()
  }

  for (let user of helper.initialUsers) {
    let userObject = new User(user)
    console.log(userObject)
    await userObject.save()
  }
})

describe('get', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  
  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
  
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('unique identifier of blog is named id', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body[0].id).toBeDefined()
  })
})

describe('post', () => {
  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'New blog about async/await',
      author: 'Adam',
      url: 'https://someurl.com',
      likes: 12
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      //.set( 'Authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJvb3QiLCJpZCI6IjYwMzNmMGFjN2RjZTZkMjEyODczZTAyYSIsImlhdCI6MTYxNDAyMTY4MCwiZXhwIjoxNjE0MDI1MjgwfQ.L-Q8_vs3QjbYm_U3uE7rr8sZysbxTo5GVy4dx7gtDqo')
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    
    const titles = blogsAtEnd.map(n => n.title)
    expect(titles).toContain(
      'New blog about async/await'
    )
  })

  test('likes property if undefined defaults to 0', async () => {
    const newBlog = {
      title: 'Likes default to 0',
      author: 'Adam',
      url: 'https://someurl.com'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    
    const addedBlog = blogsAtEnd.find(blog => blog.title === 'Likes default to 0')
    expect(addedBlog.likes).toBe(0)
  })

  test('failed with correct code if title or url are missing', async () => {
    const newBlog = {
      url: 'https://someurl.com'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    newBlog = {
      title: 'some title'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })
})

describe('delete', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]
  
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)

      .expect(204)
  
    const blogsAtEnd = await helper.blogsInDb()
  
    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length - 1
    )
  
    const titles = blogsAtEnd.map(r => r.title)
  
    expect(titles).not.toContain(blogToDelete.title)
  })
})

describe('put', () => {
  test('succeeds with status code 200 and number of likes updated', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]
    const originalLikes = blogToUpdate.likes
    console.log(originalLikes);

    blogToUpdate.likes = 50

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogToUpdate)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    const updatedBlog = blogsAtEnd[0]
    expect(updatedBlog.likes).toBe(50)
  })
})

afterAll(() => {
  // you're my wonderwall
  mongoose.connection.close()
})