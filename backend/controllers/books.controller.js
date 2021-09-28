const express = require('express')
const router = express.Router()
const Joi = require('joi')
const bookService = require('services/book.service')
const authorize = require('_middleware/authorize')
const validateRequest = require('_middleware/validate-request')

// route
router.get('/', authorize(), index)
router.post('/', authorize(), createSchema, create)
router.get('/:id', authorize(), show)
router.put('/:id', authorize(), updateSchema, update)
router.delete('/:id', authorize(), _delete)

module.exports = router

function index(req, res, next) {
  bookService
    .index(req.user.id, req.query)
    .then((books) => {
      res.json(books)
    })
    .catch(next)
}

function create(req, res, next) {
  bookService
    .create(req.user, req.body)
    .then(() => res.status(200).send())
    .catch(next)
}

function show(req, res, next) {
  bookService
    .show(req.user, req.params.id)
    .then((book) => res.json(book))
    .catch(next)
}

function update(req, res, next) {
  bookService
    .update(req.user, req.params.id, req.body)
    .then((updatedBook) => res.json(updatedBook))
    .catch(next)
}

function _delete(req, res, next) {
  bookService
    .delete(req.user, req.params.id)
    .then(() => res.status(200).send())
    .catch(next)
}

// validation

function createSchema(req, res, next) {
  const schema = Joi.object({
    title: Joi.string().required(),
    url: Joi.string().required(),
    detail: Joi.string().required(),
    review: Joi.string().required(),
  })
  validateRequest(req, next, schema)
}

function updateSchema(req, res, next) {
  const schema = Joi.object({
    title: Joi.string().empty(''),
    url: Joi.string().empty(''),
    detail: Joi.string().empty(''),
    review: Joi.string().empty(''),
  })
  validateRequest(req, next, schema)
}
