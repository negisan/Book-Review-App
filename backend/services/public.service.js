const db = require('models')

module.exports = {
  getBooks,
}

async function getBooks(query) {
  const limit = 10

  if (query.offset) {
    return await db.Book.findAndCountAll({
      offset: parseInt(query.offset, 10),
      limit: limit,
    })
  }

  return await db.Book.findAll({
    limit: limit,
  })
}
