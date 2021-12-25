const { Router } = require('express')
const config = require('config')
const { check, validationResult } = require('express-validator')
const Article = require('../models/Article')
const router = Router()

router.get(
    '/',
    [
        check('sortType').exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                sortType = 'All'
            }

            const articles = await Article.find({}, {
                _id: 0,
                text: 0,
                creator: 0,
            }).sort({ date: -1 })
            console.log(articles);

            return res.json(articles)
            if (sortType == 'All') {
                return res.json(article)
            }
        } catch (e) {
            res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
        }
    }
)


module.exports = router