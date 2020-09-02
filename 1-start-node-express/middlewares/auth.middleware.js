
const db = require("../db")

module.exports.requiredMiddleware = (req, res, next) => {
  const signedCookies = req.signedCookies
  if (!signedCookies.user_id) {
    res.redirect('/login')
    return;
  }
  const user = db.get("users").find({ id: signedCookies.user_id }).value()
  if (!user) {
    res.redirect('/login')
    return;
  }
  res.locals.user = user
  next()
}