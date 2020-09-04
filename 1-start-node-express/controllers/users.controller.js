const db = require("../db")

const Users = require("../models/users.model")

module.exports.index = async (req, res) => {
  const usersData = await Users.find()
  res.render('users/index', {
    users: usersData
  })
}

module.exports.search = async (req, res) => {
  const { q } = req.query
  /*mongonose query  params*/
  const users = await Users.find()
  const matchUser = users.filter((user) => user.name.indexOf(q) !== -1)
  res.render('users/index', {
    users: matchUser
  })
}

module.exports.id = async (req, res) => {
  const { id } = req.params
  /*mongonose query  params*/
  const user = await Users.findById(id).exec()
  res.render("users/view", {
    user
  })
}

module.exports.create = (req, res) => {
  res.render('users/create')
}

module.exports.postCreate = async (req, res) => {
  const data = {
    avatar: req.file.path.split("\\").slice(1).join("\\"),
    ...req.body
  }
  /*mongonose query  params*/
  await Users.create(data)

  res.redirect('/users')
}