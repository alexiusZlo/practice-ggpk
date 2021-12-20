const { Router } = require('express')
const config = require('config')
const { check, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/User')
const Admin = require('../models/Admin')
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

        const { email, password } = req.body

        const candidate = await User.findOne({ email })

        if (candidate) {
            return res.status(400).json({message: '����� ������������ ��� ����������'})
        }

        const hashedPassword = await bcrypt.hash(password, 12)
        const user = new User({ email, hashedPassword })

        await user.save()

        res.status(201).json({ message: '������������ ������' })

    } catch (e) {
        res.status(500).json({message: '���-�� ����� �� ���, ���������� �����'})
    }
})

router.post(
    '/login',
    [
        check('email', '�������� email ��� ������').normalizeEmail().isEmail(),
        check('password', '������� ������').exists
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

            if (password != config.get('jwtSecret')) {
                const user = await User.findOne({ email })

                if (!user) {
                    return res.status(400).json({ message: '������������ �� ������' })
                }

                const isMatch = await bcrypt.compare(password, user.password)

                if (!isMatch) {
                    return res.status(400).json({ message: '�������� email ��� ������' })
                }

                const token = jwt.sign(
                    { userId: user.id },
                    config.get('jwtSecret'),
                    { expiresIn: '1h' }
                )

                res.json({ token, userId: user.id })
            } else {
                const admin = await Admin.findOne({ email })

                if (!user) {
                    return res.status(400).json({ message: '������������ �� ������' })
                }

                const isMatch = await bcrypt.compare(password, admin.password)

                if (!isMatch) {
                    return res.status(400).json({ message: '�������� email ��� ������' })
                }

                const token = jwt.sign(
                    { adminId: admin.id },
                    config.get('jwtSecret'),
                    { expiresIn: '1h' }
                )

                res.json({ token, adminId: admin.id })
            }

        } catch (e) {
            res.status(500).json({ message: '���-�� ����� �� ���, ���������� �����' })
        }
})

module.exports = router