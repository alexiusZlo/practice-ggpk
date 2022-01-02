const { Router } = require('express')
const config = require('config')
const { check, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/User')
const router = Router()

router.post(
    '/register',
    [
        check('email', 'Invalid email').isEmail(),
        check('password', 'Minimum password length 6 characters').isLength({min: 6})
    ],
    async (req, res) => {
    try {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Incorrect registration data'
            })
        }

        const { email, password, name } = req.body

        const candidate = await User.findOne({ email })

        if (candidate) {
            return res.status(400).json({ message: 'This user already exists'})
        }

        const hashedPassword = await bcrypt.hash(password, 12)
        const user = new User({ email: email, password: hashedPassword, name: name })

        await user.save()

        res.status(201).json({ message: 'User created' })

    } catch (e) {
        res.status(500).json({ message: 'Something went wrong, please try again'})
    }
    })

router.post(
    '/login',
    [
        check('email', 'Invalid email or password').normalizeEmail().isEmail(),
        check('password', 'enter password').exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Incorrect login data'
            })
            }

            const { email, password } = req.body

            const user = await User.findOne({ email })

            if (!user) {
                return res.status(400).json({ message: 'User is not found' })
            }

            const isMatch = await bcrypt.compare(password, user.password)

            if (!isMatch) {
                return res.status(400).json({ message: 'Invalid email or password' })
            }

            const token = jwt.sign(
                { userId: user._id },
                config.get('jwtSecret'),
                { expiresIn: '24h' }
            )

            res.json({ token, userId: user.id })

        } catch (e) {
            res.status(500).json({ message: e.message })
        }
})

module.exports = router