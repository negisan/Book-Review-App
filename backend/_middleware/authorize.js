const jwt = require('express-jwt')
const db = require('models')

const { secret } = require('config/config.json')

module.exports = authorize

function authorize() {
  return [
    jwt({ secret, algorithms: ['HS256'] }),

    async (req, res, next) => {
      console.log('authorizeMiddleware==========', req.user)
      const user = await db.User.findByPk(req.user.sub)

      if (!user)
        return res.status(401).json({
          ErrorMessageJP: '認証エラー',
          ErrorMessageEN: 'Unauthorized',
        })

      req.user = user.get()
      next()
    },
  ]
}
