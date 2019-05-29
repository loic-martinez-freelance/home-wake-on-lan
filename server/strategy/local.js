const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const conf = require('../conf/conf')

passport.use(
  'login',
  new LocalStrategy(
    {
      session: false,
    },
    (username, password, done) => {
      if (username === conf.username && password === conf.password) {
        return done(null, { username })
      }
      return done('Unauthorized')
    }
  )
)
