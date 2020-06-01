const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes
  }
  return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return {}
  const reducer = (maxLikes, item) => {
    return Math.max(maxLikes, item.likes)
  }
  const favorite = blogs.find((blog) => blog.likes === blogs.reduce(reducer, 0))
  const strippedFavorite = {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes,
  }
  return strippedFavorite
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
}
