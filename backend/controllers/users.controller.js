const express = require('express')
const router = express.Router()
const Joi = require('joi')
const userService = require('services/user.service')
const authorize = require('_middleware/authorize')
const validateRequest = require('../_middleware/validate-request')

// route
router.post('/', createSchema, create)
router.get('/', authorize(), show)
router.put('/', authorize(), updateSchema, update)

module.exports = router

function create(req, res, next) {
  userService
    .create(req.body)
    .then((token) => res.json(token))
    .catch(next)
}

function show(req, res, next) {
  userService
    .show(req)
    .then((user) => res.json(user))
    .catch(next)
}

function update(req, res, next) {
  userService
    .update(req.user.id, req.body)
    .then((user) => {
      res.json({ name: user.name })
    })
    .catch(next)
}

// validate

function createSchema(req, res, next) {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  })
  validateRequest(req, next, schema)
}

function updateSchema(req, res, next) {
  const schema = Joi.object({
    name: Joi.string().empty(''),
  })
  validateRequest(req, next, schema)
}
