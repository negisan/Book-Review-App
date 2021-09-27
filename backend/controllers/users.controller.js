const express = require('express')
const router = express.Router()
const Joi = require('joi')
const userService = require('services/user.service')
const authorize = require('_middleware/authorize')

// route
router.post('/', create)
router.get('/', authorize(), show)
router.put('/', authorize(), update)

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
      res.json(user.name)
    })
    .catch(next)
}
