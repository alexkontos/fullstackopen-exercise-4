const dummy = (blogs) => 1;
const _ = require('lodash');

const totalLikes = (blogs) => {
  return blogs.reduce((acc, blog) => {
    return acc + blog.likes;
  }, 0)
}

const favoriteBlog = (blogs) => {
  let fav;
  blogs.reduce((acc, blog) => {
    if (blog.likes > acc.likes) {
      fav = blog;
      return blog
    } else {
      fav = acc;
      return acc;
    }
  })
  let { _id, url, __v, ...returnValue } = fav;
  return returnValue;
}

const mostBlogs = (blogs) => {
  const mostBloggingAuthor = _.chain(blogs)
    .groupBy("author")
    .map((group, author) => {
      return {
        author: author,
        blogs: group.length
      }
    })
    .maxBy((author) => author.blogs)
    .value()

  return mostBloggingAuthor
}

const mostLikes = (blogs) => {
  const mostLikedAuthor = _.chain(blogs) // begins a chain with blogs
    .groupBy("author") // creates an object with each author as key, inside their blogs as objects in array
    .map((group, author) => { // group is array of blog objects, author is the key
      return { // for each key, return this to replace it
        author: author, // the author key as author property
        likes: _.sumBy(group, blog => blog.likes)
      }
    })
    .maxBy((author) => author.likes) // find max value
    .value() // dewrap chain

  return mostLikedAuthor
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes };