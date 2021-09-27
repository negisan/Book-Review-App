const express = require('express')
const router = express.Router()
const Joi = require('joi')
const userService = require('services/user.service')
const validateRequest = require('../_middleware/validate-request')

// route
router.post('/signin', authenticateSchema, authenticate)

module.exports = router

function authenticate(req, res, next) {
  console.log('controller==========', req.body)
  userService
    .authenticate(req.body)
    .then((user) => {
      res.json(user)
    })
    .catch(next)
}

// validate

function authenticateSchema(req, res, next) {
  const schema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  })
  validateRequest(req, next, schema)
}
