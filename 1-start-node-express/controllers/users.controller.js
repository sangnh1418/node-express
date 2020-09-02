const db = require("../db")
const shortid = require('shortid')

module.exports.index = (req, res) => {
  res.render('users/index', {
    users: db.get("users").value()
  })
}

module.exports.search = (req, res) => {
  const { q } = req.query
  const matchUser = db.get("users").value().filter((user) => user.name.indexOf(q) !== -1)
  res.render('users/index', {
    users: matchUser
  })
}

module.exports.id = (req, res) => {
  const id = req.params.id
  const user = db.get("users").find({ id: id }).value()
  res.render("users/view", {
    user: user
  })
}

module.exports.create = (req, res) => {
  res.render('users/create')
}

module.exports.postCreate = (req, res) => {
  const { name, phone } = req.body
  let errors = []
  if (!name) {
    errors.push("Name is required")
  }
  if (!phone) {
    errors.push("Phone is required")
  }
  if (errors.length) {
    res.render('users/create', {
      errors,
      value: req.body
    })
    return
  }
  console.log(errors)
  db.get("users").push({
    id: shortid.generate(),
    ...req.body
  }).write()
  res.redirect('/users')
}