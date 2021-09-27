const express = require('express')
const router = express.Router()
const Joi = require('joi')
const userService = require('services/user.service')

// route
router.post('/signin', authenticate)

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
