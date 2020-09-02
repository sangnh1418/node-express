
const db = require("../db")

module.exports.requiredMiddleware = (req, res, next) => {
  const cookie = req.cookies
  if (!cookie.user_id) {
    res.redirect('/login')
    return;
  }
  const userId = db.get("users").find({ id: cookie.user_id })
  if (!userId) {
    res.redirect('/login')
    return;
  }
  next()
}