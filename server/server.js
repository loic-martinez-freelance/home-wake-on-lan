const express = require('express')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const router = express.Router()
const conf = require('./conf/conf')
const ping = require('ping')
const bodyParser = require('body-parser')
const app = express()

require('./strategy/local')
require('./strategy/jwt')

app.use(bodyParser.urlencoded({ extended: false }))

router.post('/login', async (req, res, next) => {
  passport.authenticate('login', async (err, payload) => {
    if (err || !payload) {
      return res.status(400).send(err)
    }
    req.login(payload, { session: false }, async (error) => {
      if (error) return next(error)
      const token = jwt.sign(payload, conf.secret, {
        expiresIn: conf.session_expire,
      })
      return res.json({ token })
    })
  })(req, res, next)
})

router.post('/wol', async (req, res, next) => {
  passport.authenticate('jwt', async (err, payload) => {
    if (err || !payload) {
      return res.status(400).send('Unauthorized')
    }
    return res.json({ done: true })
  })(req, res, next)
})

router.post('/ping', async (req, res, next) => {
  passport.authenticate('jwt', async (err, payload) => {
    if (err || !payload) {
      return res.status(400).send('Unauthorized')
    }
    ping.sys.probe(conf.host, (isAlive) => {
      return res.json({ alive: isAlive })
    })
  })(req, res, next)
})

app.use(router)
app.listen(3000, () => {
  console.log('Listening on port 3000')
  console.log('http://localhost:3000')
})
