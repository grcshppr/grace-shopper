const AdminMW = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next()
  } else {
    console.log(req.user)
    res.status(401).end()
  }
}

module.exports = AdminMW
