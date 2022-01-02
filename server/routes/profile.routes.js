const { Router } = require('express')
const config = require('config')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { check, validationResult } = require('express-validator')
const auth = require('../middleware/auth.middleware')
const User = require('../models/User')
const router = Router()

router.get(
    '/',
    auth,
    async (req, res) => {
        try {

            const authorized = req.headers.authorization

            if (!authorized) {
                return res.status(401).json({ message: 'No authorization' })
            }

            const token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, config.get('jwtSecret'))
            req.user = decoded

            const user = await User.findOne({ _id: req.user.userId }, { _id: 0, password: 0, isAdmin: 0})

            res.json(user)

        } catch (e) {
            res.status(500).json({ message: e.message })
        }
    })

router.put(
    '/redact',
    auth,
    async (req, res) => {
        try {

            const { name, password, email } = req.body

            const authorized = req.headers.authorization

            if (!authorized) {
                return res.status(401).json({ message: 'No authorization' })
            }

            const token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, config.get('jwtSecret'))
            req.user = decoded

            const user = await User.findOne({ _id: req.user.userId })

            if (!name) {
                return res.status(401).json({ message: "Write name"})
            }

            if (!password) {
                return res.status(401).json({ message: "Write password" })
            }

            if (!email) {
                return res.status(401).json({ message: "Write email" })
            }

            const hashedPassword = await bcrypt.hash(password, 12)

            await User.updateOne({ name: user.name }, { name: name, password: hashedPassword, email: email })

            res.json({ message: 'User data changed' })

        } catch (e) {
            res.status(500).json({ message: e.message })
        }
    })

module.exports = router