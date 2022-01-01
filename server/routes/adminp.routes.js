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
    '/remove_comment',
    auth,
    async (req, res) => {
        try {
            const { articleTitle, isNews, userName, date } = req.body

            const authorId = await User.findOne({ name: userName },
                {
                    name: 0,
                    email: 0,
                    password: 0,
                    isAdmin:0
                })

            const articleId = await Article.findOne({ title: articleTitle, isNews: isNews },
                {
                    title: 0,
                    content: 0,
                    gameId: 0,
                    typeId: 0,
                    isNews: 0,
                    picture: 0,
                    authorId: 0,
                    date:0
                })

            const candidate = await Comment.findOne({ articleId: articleId, authorId: authorId, date: date })

            if (!candidate) {
                return res.status(404).json({ message: 'Not found' })
            }

            const authorized = req.headers.authorization

            if (!authorized) {
                return res.status(401).json({ message: 'No authorization' })
            }

            await Comment.deleteOne({ articleId: articleId, authorId: authorId, date: date })

            res.json({ message: 'comment deleted' })

        } catch (e) {
            res.status(500).json({ message: e.message })
        }
    })

module.exports = router