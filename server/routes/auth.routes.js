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
        check('email', '������������ email').isEmail(),
        check('password', '����������� ������ ������ 6 ��������').isLength({min: 6})
    ],
    async (req, res) => {
    try {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: '������������ ������ ��� �����������'
            })
        }

        const { email, password, name } = req.body

        const candidate = await User.findOne({ email })

        if (candidate) {
            return res.status(400).json({message: '����� ������������ ��� ����������'})
        }

        const hashedPassword = await bcrypt.hash(password, 12)
        const user = new User({ email: email, password: hashedPassword, name: name })

        await user.save()

        res.status(201).json({ message: '������������ ������' })

    } catch (e) {
        res.status(500).json({message: '���-�� ����� �� ���, ���������� �����'})
    }
    })

/*router.post(
    '/login',
    [],
    async (req, res) => {
        console.log(req)
        const usersCollection = await User.find()

        res.status(200).json({
            users: usersCollection
        })
    })*/

router.post(
    '/login',
    [
        check('email', '�������� email ��� ������').normalizeEmail().isEmail(),
        check('password', '������� ������').exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: '������������ ������ ��� ����� � �������'
            })
            }

            const { email, password } = req.body

            const user = await User.findOne({ email })

            if (!user) {
                return res.status(400).json({ message: '������������ �� ������' })
            }

            const isMatch = await bcrypt.compare(password, user.password)

            if (!isMatch) {
                return res.status(400).json({ message: '�������� email ��� ������' })
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