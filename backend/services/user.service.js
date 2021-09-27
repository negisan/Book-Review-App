const config = require('config/config.json')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { v4: uuidv4 } = require('uuid')
const db = require('models')

module.exports = {
  authenticate,
  create,
  show,
  update,
}

async function authenticate({ email, password }) {
  const user = await db.User.scope('withHash').findOne({ where: { email } })

  if (!user || !(await bcrypt.compare(password, user.hash)))
    throw 'email or password is incorrect'

  const token = jwt.sign({ sub: user.id }, config.secret, { expiresIn: '7d' })
  return { token }
}

async function create(params) {
  // validate
  if (await db.User.findOne({ where: { email: params.email } })) {
    throw 'Email "' + params.emaiil + '" is already used'
  }
  if (await db.User.findOne({ where: { email: params.name } })) {
    throw 'Name "' + params.name + '" is already used'
  }

  // hash password
  if (params.password) {
    params.hash = await bcrypt.hash(params.password, 10)
  }
  // save user
  await db.User.create(params)

  // return token
  const user = await db.User.findOne({ where: { email: params.email } })
  const token = jwt.sign({ sub: user.id }, config.secret, { expiresIn: '7d' })
  return { token }
}

async function show(req) {
  return await omitHash(req.user)
}

async function update(id, params) {
  const user = await getUser(id)
  //validate
  const usernameChanged = params.name && user.name !== params.name
  if (
    usernameChanged &&
    (await db.User.findOne({ where: { name: params.name } }))
  ) {
    throw 'Name "' + params.name + '" is already used'
  }

  Object.assign(user, params)
  await user.save

  return omitHash(user.get())
}

// helper function

async function getUser(id) {
  const user = await db.User.findByPk(id)
  if (!user) throw 'User not found'
  return user
}

function omitHash(user) {
  const { hash, ...userWithoutHash } = user
  return userWithoutHash
}
