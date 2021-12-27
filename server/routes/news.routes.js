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

            const articles = await Article.find({isNews: 'true'}, {
                _id: 0,
                content: 0,
                authorId: 0,
            }).sort({ date: -1 })

            return res.json(articles)

        } catch (e) {
            res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
        }
    }
)

router.get(
    '/pc',
    [
    ],
    async (req, res) => {
        try {

            const articles = await Article.find({ type: '61c8b435b2ea460b456c306e', isNews: 'true'}, {
                _id: 0,
                content: 0,
                authorId: 0,
            }).sort({ date: -1 })

            return res.json(articles)

        } catch (e) {
            res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
        }
    }
)

router.get(
    '/xbox_one',
    [
    ],
    async (req, res) => {
        try {

            const articles = await Article.find({ type: '61c8b445b2ea460b456c306f', isNews: 'true' }, {
                _id: 0,
                content: 0,
                authorId: 0,
            }).sort({ date: -1 })

            return res.json(articles)

        } catch (e) {
            res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
        }
    }
)

router.get(
    '/xbox_series_x_s',
    [
    ],
    async (req, res) => {
        try {

            const articles = await Article.find({ type: '61c8b458b2ea460b456c3070', isNews: 'true' }, {
                _id: 0,
                content: 0,
                authorId: 0,
            }).sort({ date: -1 })

            return res.json(articles)

        } catch (e) {
            res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
        }
    }
)

router.get(
    '/ps4',
    [
    ],
    async (req, res) => {
        try {

            const articles = await Article.find({ type: '61c8b478b2ea460b456c3071', isNews: 'true' }, {
                _id: 0,
                content: 0,
                authorId: 0,
            }).sort({ date: -1 })

            return res.json(articles)

        } catch (e) {
            res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
        }
    }
)

router.get(
    '/ps5',
    [
    ],
    async (req, res) => {
        try {

            const articles = await Article.find({ type: '61c8b490b2ea460b456c3072', isNews: 'true' }, {
                _id: 0,
                content: 0,
                authorId: 0,
            }).sort({ date: -1 })

            return res.json(articles)

        } catch (e) {
            res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
        }
    }
)

router.get(
    '/stadia',
    [
    ],
    async (req, res) => {
        try {

            const articles = await Article.find({ type: '61c8b4aab2ea460b456c3073', isNews: 'true' }, {
                _id: 0,
                content: 0,
                authorId: 0,
            }).sort({ date: -1 })

            return res.json(articles)

        } catch (e) {
            res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
        }
    }
)

router.get(
    '/vr',
    [
    ],
    async (req, res) => {
        try {

            const articles = await Article.find({ type: '61c8b4bfb2ea460b456c3074', isNews: 'true' }, {
                _id: 0,
                content: 0,
                authorId: 0,
            }).sort({ date: -1 })

            return res.json(articles)

        } catch (e) {
            res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
        }
    }
)

router.get(
    '/nintendo_switch',
    [
    ],
    async (req, res) => {
        try {

            const articles = await Article.find({ type: '61c8b4d5b2ea460b456c3075', isNews: 'true' }, {
                _id: 0,
                content: 0,
                authorId: 0,
            }).sort({ date: -1 })

            return res.json(articles)

        } catch (e) {
            res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
        }
    }
)

module.exports = router