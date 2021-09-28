const db = require('models')

module.exports = {
  getBooks,
}

async function getBooks(query) {
  const limit = 10
  let booksWithUser = []

  if (query.offset) {
    booksWithUser = await db.Book.findAndCountAll({
      offset: parseInt(query.offset, 10),
      limit: limit,
      include: [
        {
          model: db.User,
        },
      ],
    })
      .then((res) => {
        return res.rows
      })
      .catch((e) => console.log(e))
  } else {
    booksWithUser = await db.Book.findAll({
      limit: limit,
      include: [
        {
          model: db.User,
        },
      ],
    })
  }

  // data shaping
  const res = booksWithUser.map((book) => {
    return {
      id: book.uuid,
      title: book.title,
      url: book.url,
      detail: book.detail,
      review: book.review,
      reviewer: book.User.name,
    }
  })
  return res
}
