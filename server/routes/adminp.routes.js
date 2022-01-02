const { Router } = require('express')
const config = require('config')
const jwt = require('jsonwebtoken')
const { check, validationResult } = require('express-validator')
const auth = require('../middleware/auth.middleware')
const Game = require('../models/Game')
const Type = require('../models/Type')
const Article = require('../models/Article')
const Comment = require('../models/Comment')
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

            if (!gameId) {
                return res.status(404).json({ message: 'Game not found' })
            }

            if (!typeId) {
                return res.status(404).json({ message: 'Type not found' })
            }

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

router.get(
    '/find',
    auth,
    async (req, res) => {
        try {
            const { title, isNews } = req.body

            const candidate = await Article.findOne({ title, isNews }, { _id: 0 })


            if (!candidate) {
                return res.status(404).json({ message: 'Not found' })
            }

            const authorized = req.headers.authorization

            if (!authorized) {
                return res.status(401).json({ message: 'No authorization' })
            }

            return res.json(candidate)

        } catch (e) {
            res.status(500).json({ message: e.message })
        }
    })

router.put(
    '/redact',
    auth,
    async (req, res) => {
        try {
            const { title, redTitle, content, isNews, game, type } = req.body

            const authorized = req.headers.authorization
            const gameId = await Game.findOne({ name: game }, { name: 0 })
            const typeId = await Type.findOne({ name: type }, { name: 0 })

            if (!gameId) {
                return res.status(404).json({ message: 'Game not found' })
            }

            if (!typeId) {
                return res.status(404).json({ message: 'Type not found' })
            }

            if (!authorized) {
                return res.status(401).json({ message: 'No authorization' })
            }

            await Article.updateOne({ title: title, isNews: isNews }, {title: redTitle, content: content, gameId: gameId, typeId: typeId})

            res.json({ message: 'article redacted' })

        } catch (e) {
            res.status(500).json({ message: e.message })
        }
    })

router.delete(
    '/delete',
    auth,
    async (req, res) => {
        try {
            const { title, isNews } = req.body

            const candidate = Article.findOne({ title, isNews })

            if (!candidate) {
                return res.status(404).json({ message: 'Not found' })
            }

            const authorized = req.headers.authorization

            if (!authorized) {
                return res.status(401).json({ message: 'No authorization' })
            }

            await Article.deleteOne({ title: title, isNews: isNews})

            res.json({ message: 'article deleted' })

        } catch (e) {
            res.status(500).json({ message: e.message })
        }
    })

router.delete(
    '/banhammer',
    auth,
    async (req, res) => {
        try {
            const { name } = req.body

            const candidate = User.findOne({ name: name })
            const isAdmin = User.findOne({ name: name },
                { _id: 0, name: 0, email: 0, password: 0 })

            if (isAdmin == true) {
                return res.status(403).json({ message: 'You can not ban admin' })
            }

            if (!candidate) {
                return res.status(404).json({ message: 'Not found' })
            }

            const authorized = req.headers.authorization

            if (!authorized) {
                return res.status(401).json({ message: 'No authorization' })
            }

            await User.deleteOne({ name: name })

            res.json({ message: 'User banned' })

        } catch (e) {
            res.status(500).json({ message: e.message })
        }
    })

module.exports = router