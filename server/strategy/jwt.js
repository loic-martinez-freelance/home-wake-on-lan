const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const conf = require('../conf/conf')

passport.use(
  'jwt',
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: conf.secret,
    },
    function(jwtPayload, done) {
      if (!jwtPayload.exp) {
        return done(null, false)
      }
      done(null, jwtPayload)
    }
  )
)
