const logger = require('./logger')
const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, blog) => {
    return sum + blog.likes
  }
  return blogs.length === 0
    ? 0
    : blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  const reducer = (max, blog) => {
    const maxLikes = max.likes > blog.likes ? max : blog
    return {
      title: maxLikes.title,
      author: maxLikes.author,
      likes: maxLikes.likes
    }
  }
  
  return blogs.length === 0
    ? {}
    : blogs.reduce(reducer)
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return {}
  }
  
  const authorArr = _.map(blogs, 'author')
  const mostCommonAuthor = _
    .chain(authorArr)
    .countBy()
    .toPairs()
    .max(_.last)

  return {
    author: mostCommonAuthor.head().value(),
    blogs: mostCommonAuthor.tail().value()[0]
  }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return {}
  }

  const authorsLikesArr = _(blogs)
    .groupBy('author')
    .map((blogs, author) => ({
      'author': author,
      'likes': _.sumBy(blogs, 'likes')
    }))
    .value()

  return _.maxBy(authorsLikesArr, 'likes')
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}