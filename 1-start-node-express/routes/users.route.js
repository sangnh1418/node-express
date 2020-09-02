const express = require('express')
const shortid = require('shortid')

const router = express.Router()

const db = require("../db")

router.get('/', (req, res) => {
  res.render('users/index', {
    users: db.get("users").value()
  })
})

router.get('/:id', (req, res) => {
  const id = req.params.id
  const user = db.get("users").find({ id: id }).value()
  res.render("users/view", {
    user: user
  })
})

router.get('/search', (req, res) => {
  const { q } = req.query
  const matchUser = db.get("users").value().filter((user) => user.name.indexOf(q) !== -1)
  res.render('users/index', {
    users: matchUser
  })
})

router.get('/create', (req, res) => {
  res.render('users/create')
})

router.post('/create', (req, res) => {
  db.get("users").push({
    id: shortid.generate(),
    ...req.body
  }).write()
  res.redirect('/users')
})

module.exports = router
