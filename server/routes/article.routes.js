const { Router } = require('express')
const config = require('config')
const { check, validationResult } = require('express-validator')
const Article = require('../models/Article')
const router = Router()

router.get(
    '/',
    [
    ],
    async (req, res) => {
        try {

            const articles = await Article.find({isNews: 'false'}, {
                _id: 0,
                content: 0,
                authorId: 0,
            }).sort({ date: -1 })

            return res.json(articles)

        } catch (e) {
            res.status(500).json({ message: 'Something goes wrong, try again' })
        }
    }
)

router.get(
    '/interview',
    [
    ],
    async (req, res) => {
        try {

            const articles = await Article.find({ typeId: '61c8a779b2ea460b456c306b', isNews: 'false'}, {
                _id: 0,
                content: 0,
                authorId: 0,
            }).sort({ date: -1 })

            return res.json(articles)

        } catch (e) {
            res.status(500).json({ message: 'Something goes wrong, try again' })
        }
    }
)

router.get(
    '/review',
    [
    ],
    async (req, res) => {
        try {

            const articles = await Article.find({ typeId: '61c8a832b2ea460b456c306c', isNews: 'false' }, {
                _id: 0,
                content: 0,
                authorId: 0,
            }).sort({ date: -1 })

            return res.json(articles)

        } catch (e) {
            res.status(500).json({ message: 'Something goes wrong, try again' })
        }
    }
)

router.get(
    '/preview',
    [
    ],
    async (req, res) => {
        try {

            const articles = await Article.find({ typeId: '61c8a867b2ea460b456c306d', isNews: 'false' }, {
                _id: 0,
                content: 0,
                authorId: 0,
            }).sort({ date: -1 })

            return res.json(articles)

        } catch (e) {
            res.status(500).json({ message: 'Something goes wrong, try again' })
        }
    }
)

router.get(
    '/show',
    async (req, res) => {
        try {
            const { title } = req.body

            const articles = await Article.findOne({ title: title, isNews: 'false' }, {_id: 0})

            return res.json(articles)

        } catch (e) {
            res.status(500).json({ message: 'Something goes wrong, try again' })
        }
    }
)

module.exports = router