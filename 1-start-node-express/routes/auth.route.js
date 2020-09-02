const express = require('express')

const router = express.Router()

const controllers = require('../controllers/auth.controller')

router.get('/', controllers.login)

router.post('/', controllers.postLogin)

module.exports = router
