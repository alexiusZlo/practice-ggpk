const { Router } = require('express')
const config = require('config')
const jwt = require('jsonwebtoken')
const { check, validationResult } = require('express-validator')
const auth = require('../middleware/auth.middleware')
const Article = require('../models/Article')
const User = require('../models/User')
const Comment = require('../models/Comment')
const router = Router()

router.delete(
    '/delete',
    auth,
    async (req, res) => {
        try {
            const { articleTitle, isNews, name, date } = req.body

            const authorId = await User.findOne({ name: name },
                {
                    name: 0,
                    email: 0,
                    password: 0,
                    isAdmin: 0
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
                    date: 0
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


router.get(
    '/findall',
    auth,
    async (req, res) => {
        try {
            const { articleTitle, isNews, name } = req.body

            const articleId = await Article.findOne({ title: articleTitle, isNews: isNews },
                {
                    title: 0,
                    content: 0,
                    gameId: 0,
                    typeId: 0,
                    isNews: 0,
                    picture: 0,
                    authorId: 0,
                    date: 0
                })

            const authorId = await User.findOne({ name: name },
                {
                    name: 0,
                    email: 0,
                    password: 0,
                    isAdmin: 0
                })

            const candidate = await Comment.find({ articleId, authorId }, { _id: 0, articleId:0, authorId:0 })


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

router.post(
    '/create',
    auth,
    async (req, res) => {
        try {

            const { articleTitle, isNews, text } = req.body

            const articleId = await Article.findOne({ title: articleTitle, isNews: isNews },
                {
                    title: 0,
                    content: 0,
                    gameId: 0,
                    typeId: 0,
                    isNews: 0,
                    picture: 0,
                    authorId: 0,
                    date: 0
                })

            if (!articleId) {
                return res.status(404).json({ message: 'Not found' })
            }

            const authorized = req.headers.authorization

            if (!authorized) {
                return res.status(401).json({ message: 'No authorization' })
            }

            const token = req.headers.authorization.split(' ')[1]

            const decoded = jwt.verify(token, config.get('jwtSecret'))
            req.user = decoded

            const comment = new Comment({
                text: text, articleId: articleId, authorId: req.user.userId
            })

            await comment.save()

            res.status(201).json({ message: 'comment created' })

        } catch (e) {
            res.status(500).json({ message: 'Something goes wrong, try again' })
        }
    })

module.exports = router