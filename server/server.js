const express = require('express')
const cors = require('cors')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const router = express.Router()
const conf = require('./conf/conf')
const ping = require('ping')
const bodyParser = require('body-parser')
const wol = require('wake_on_lan')
const app = express()

require('./strategy/local')
require('./strategy/jwt')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors({ origin: conf.cors_origin }))

router.post('/login', (req, res, next) => {
  passport.authenticate('login', (err, payload) => {
    if (err || !payload) {
      return res.status(400).send(err)
    }
    req.login(payload, { session: false }, (error) => {
      if (error) return next(error)
      const token = jwt.sign(payload, conf.secret, {
        expiresIn: conf.session_expire,
      })
      return res.json({ token })
    })
  })(req, res, next)
})

router.post('/wol', (req, res, next) => {
  passport.authenticate('jwt', (err, payload) => {
    if (err || !payload) {
      return res.status(400).send('Unauthorized')
    }
    const mac_address = req.body.mac_address
    if (mac_address && mac_address !== '') {
      try {
        wol.wake(mac_address)
        return res.json({ done: true })
      } catch (e) {
        console.log(e)
        return res.json({ done: false })
      }
    }
    return res.json({ done: false })
  })(req, res, next)
})

router.post('/ping', (req, res, next) => {
  passport.authenticate('jwt', async (err, payload) => {
    if (err || !payload) {
      return res.status(400).send('Unauthorized')
    }
    const devicesAlive = []
    for (const { ip, mac_address } of conf.devices) {
      const probe = await ping.promise.probe(ip)
      devicesAlive.push({ ip, mac_address, isAlive: probe.alive })
    }
    return res.json(devicesAlive)
  })(req, res, next)
})

app.use(router)
app.listen(3000, () => {
  console.log('Listening on port 3000')
  console.log('http://localhost:3000')
})
