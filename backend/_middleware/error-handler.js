module.exports = errorHandler

function errorHandler(err, req, res, next) {
  console.log('errHandler==========', err)
  switch (true) {
    case typeof err === 'string':
      const is404 = err.toLowerCase().endsWith('not found')
      const statusCode = is404 ? 404 : 400
      if (is404) {
        return res.status(statusCode).json({
          ErrorMessageJP: 'その書籍はまだレビューされていません。',
          ErrorMessageEN: 'Error occured at server',
        })
      } else {
        return res.status(statusCode).json({
          ErrorMessageJP: 'バリデーションエラー',
          ErrorMessageEN: 'validation error',
          message: err,
        })
      }
    case err.name === 'UnauthorizedError':
      return res
        .status(401)
        .json({ ErrorMessageJP: '認証エラー', ErrorMessageEN: 'Unautorized' })
    default:
      return res.status(500).json({
        ErrorMessageJP: 'サーバーでエラーが発生しました。',
        ErrorMessageEN: 'Error occured at server',
      })
  }
}
