module.exports.postCreate = (req, res, next) => {
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
  next()
}