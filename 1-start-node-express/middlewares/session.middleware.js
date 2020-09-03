const db = require("../db")
const shortid = require('shortid')

module.exports = (req, res, next) => {
  if (!req.signedCookies.sessionId) {
    const sessionId = shortid.generate()
    res.cookie("sessionId", sessionId, {
      signed: true
    })
    db.get("sessions").push({ id: sessionId }).write()
  }
  const sessionData = db.get("sessions").find({ id: req.signedCookies.sessionId }).value()
  if (sessionData && sessionData["cart"]) {
    const countCart = Object.values(sessionData["cart"]).reduce((a, b) => a + b)
    res.locals.countCart = countCart
  }
  next()
}