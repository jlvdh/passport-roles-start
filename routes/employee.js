const express = require('express')
const router = express.Router()
const passport = require('passport')

function checkRoles(role) {
  return function(req, res, next) {
    if (req.isAuthenticated() && req.user.role === role) {
      return next();
    } else {
      res.redirect('/auth/login')
    }
  }
}

router.get('/', checkRoles('BOSS'), (req, res, next) => {
  res.render('employee/add')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/main',
  failureRedirect: '/auth/login'
}))

module.exports = router