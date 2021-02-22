const logger = require('../utils/logger')
const helper = require('../tests/test_helper')

const totalLikes = require('../utils/list_helper').totalLikes
const favoriteBlog = require('../utils/list_helper').favoriteBlog
const mostBlogs = require('../utils/list_helper').mostBlogs

const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }
]

const listWithManyBlogs = helper.initialBlogs

describe('total likes', () => {
  test('of empty list is zero', () => {
    expect(totalLikes([])).toBe(0)
  })

  test('when list has only one blog equals the likes of that', () => {
    const result = totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('of many is calculated right', () => {
    const result = totalLikes(listWithManyBlogs)
    expect(result).toBe(36)
  })
})

describe('favorite blog', () => {
  test('of empty list is empty object', () => {
    expect(favoriteBlog([])).toEqual({})
  })

  test('of list of many is one with most likes', () => {
    const result = favoriteBlog(listWithManyBlogs)
    const withMostLikes = {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12
    }

    expect(result).toEqual(withMostLikes)
  })
})

describe('most common author', () => {
  test('of empty list is empty object', () => {
    expect(mostBlogs([])).toEqual({})
  })

  test('of list of many is author with most blogs', () => {
    const result = mostBlogs(listWithManyBlogs)
    const mostFrequent = {
      author: "Robert C. Martin",
      blogs: 3
    }
    expect(result.toEqual)
  })
})