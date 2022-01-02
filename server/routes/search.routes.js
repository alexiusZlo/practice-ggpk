const { Router } = require('express')
const config = require('config')
const { check, validationResult } = require('express-validator')
const Article = require('../models/Article')
const Game = require('../models/Game')
const Type = require('../models/Type')
const router = Router()

router.get(
    '/',
    async (req, res) => {
        try {
            const { searching } = req.body

            if (await Article.find({ name: searching })) {
                return res.json(Article.find({ name: searching },
                    {
                        _id: 0,
                        content: 0,
                        authorId: 0
                    }).sort({ date: -1 })
                )
            }

            if (await Game.findOne({ name: searching })) {
                const gameId = await Game.findOne({ name: searching }, {name: 0})
                return res.json(Article.find({ gameId: gameId}, {
                    _id: 0,
                    content: 0,
                    authorId: 0
                }).sort({ date: -1 }))
            }

            if (await Type.findOne({ name: searching })) {
                const typeId = await Type.findOne({ name: searching }, { name: 0 })
                return res.json(Article.find({ typeId: typeId }, {
                    _id: 0,
                    content: 0,
                    authorId: 0
                }).sort({ date: -1 }))
            }

            return res.status(404).json({ message: 'Not found'})

        } catch (e) {
            res.status(500).json({ message: 'Something goes wrong, try again' })
        }
    }
)

module.exports = router