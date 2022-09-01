import { Router } from "express"
import jwt from 'jsonwebtoken'

const auth = Router()

auth.use((req, res, next) => {
    try {
        if (!req.headers.authorization || !jwt.verify(req.headers.authorization.replace('Bearer ', ''), process.env.JWT_KEY)) {
            return res.sendStatus(401)
        }
    } catch(error) {
        return res.sendStatus(500)
    }
    next()
})

export default auth