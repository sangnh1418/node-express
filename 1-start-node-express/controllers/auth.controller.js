const db = require("../db")
const md5 = require('md5');

module.exports.login = (req, res) => {
  res.render('auth/index')
}

module.exports.postLogin = (req, res) => {
  const { email, password } = req.body
  const user = db.get('users').find({ email: email }).value()
  if (!user) {
    res.render('auth/index', {
      errors: [
        "email not exist."
      ]
    })
  }
  if (user.password !== md5(password)) {
    res.render('auth/index', {
      errors: [
        "Password is wrong."
      ]
    })
  }
  res.cookie("user_id", user.id)
  res.redirect('/users')
}