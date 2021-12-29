const { Router } = require('express')
const config = require('config')
const jwt = require('jsonwebtoken')
const { check, validationResult } = require('express-validator')
const auth = require('../middleware/auth.middleware')
const Game = require('../models/Game')
const Type = require('../models/Type')
const Article = require('../models/Article')
const router = Router()

router.post(
    '/create',
    auth,
    async (req, res) => {
        try {

            const { title, content, isNews, game, type } = req.body

            const candidate = await Article.findOne({ title, isNews })
            const gameId = await Game.findOne({ name: game }, { name: 0 })
            const typeId = await Type.findOne({ name: type }, { name: 0 })

            if (candidate) {
                return res.status(400).json({ message: 'Such an article or news already exists' })
            }

            const authorized = req.headers.authorization

            if (!authorized) {
                return res.status(401).json({ message: 'No authorization' })
            }

            const token = req.headers.authorization.split(' ')[1]

            const decoded = jwt.verify(token, config.get('jwtSecret'))
            req.user = decoded

            const article = new Article({
                title: title, content: content, isNews: isNews,
                gameId: gameId, typeId: typeId, authorId: req.user.userId
            })

            await article.save()

            res.status(201).json({ message: 'article or news created' })

        } catch (e) {
            console.log(e.message)
            const decoded = req.user
            console.log(decoded)
            console.log(req.token)
            res.status(500).json({ message: 'Something goes wrong, try again' })
        }
    })

/*router.post(
    '/delete',
    [
        check('email', 'Неверный email или пароль').normalizeEmail().isEmail(),
        check('password', 'Введите пароль').exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректные данные при входе в систему'
                })
            }

            const { email, password } = req.body

            const user = await User.findOne({ email })

            if (!user) {
                return res.status(400).json({ message: 'Пользователь не найден' })
            }

            const isMatch = await bcrypt.compare(password, user.password)

            if (!isMatch) {
                return res.status(400).json({ message: 'Неверный email или пароль' })
            }

            const token = jwt.sign(
                { userId: user.id },
                config.get('jwtSecret'),
                { expiresIn: '1h' }
            )

            res.json({ token, userId: user.id })

        } catch (e) {
            res.status(500).json({ message: e.message })
        }
    })*/

module.exports = router