const jwt = require('jsonwebtoken')
const { jwtSecret } = require('config')

module.exports = (err, res, req, next) => {

    if (req.method === "OPTIONS") {
        next()
    }

    try {

        const token = req.headers.authorization.split(' ')[1] //"Bearer TOKEN"
        console.log(token)

        if (!token) {
            return res.status(401).json({ message: 'No authorization' })
        }

        const decoded = jwt.verify(token, jwtSecret)
        req.user = decoded
        next()

    } catch (e) {
       res.status(401).json({ message: 'No authorization' })
    }
}