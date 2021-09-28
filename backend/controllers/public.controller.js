const express = require('express')
const router = express.Router()
const publicService = require('services/public.service')

// route
router.get('/books', getBooks)

module.exports = router

function getBooks(req, res, next) {
  publicService
    .getBooks(req.query)
    .then((books) => res.json(books))
    .catch(next)
}
