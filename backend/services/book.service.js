const { v4: uuidv4 } = require('uuid')
const db = require('models')

module.exports = {
  index,
  create,
  show,
  update,
  delete: _delete,
}

async function index(userId, query) {
  const limit = 10
  let booksWithUser = []

  if (query.offset) {
    booksWithUser = await db.Book.findAndCountAll({
      where: {
        reviewerId: userId,
      },
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
      where: { reviewerId: userId },
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
    const isMine = book.User.id === userId
    return {
      id: book.uuid,
      title: book.title,
      url: book.url,
      detail: book.detail,
      review: book.review,
      reviewer: book.User.name,
      isMine: isMine,
    }
  })
  return res
}

async function create(user, body) {
  const book = Object.assign({}, body)

  book.reviewerId = user.id
  book.uuid = uuidv4()

  await db.Book.create(book)
  return Promise.resolve()
}

async function show(user, bookId) {
  const bookWithUser = await db.Book.findOne({
    where: { uuid: bookId },
    include: [
      {
        model: db.User,
      },
    ],
  })

  if (!bookWithUser) {
    throw 'review does not exist'
  }

  const res = {
    id: bookWithUser.uuid,
    title: bookWithUser.title,
    url: bookWithUser.url,
    detail: bookWithUser.detail,
    review: bookWithUser.review,
    reviewer: bookWithUser.User.name,
    isMine: user.id === bookWithUser.User.id,
  }
  return res
}

// interface body {
// title: string
// url: string
// detail: string
// review: string
// }

async function update(user, bookId, body) {
  const book = await db.Book.findOne({ where: { uuid: bookId } })

  // validate
  if (user.id !== book.reviewerId) {
    throw 'You have no authorization to edit this review'
  }

  Object.assign(book, body)
  await book.save()

  const res = {
    id: book.uuid,
    title: book.title,
    url: book.url,
    detail: book.detail,
    review: book.review,
    reviewer: user.name,
  }
  return res
}

async function _delete(user, bookId) {
  const book = await db.Book.findOne({ where: { uuid: bookId } })

  // validate
  if (user.id !== book.reviewerId) {
    throw 'You have no authorization to edit this review'
  }
  await book.destroy()
  return Promise.resolve()
}
