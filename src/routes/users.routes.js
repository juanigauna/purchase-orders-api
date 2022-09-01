import { Router } from "express"
import { body } from "express-validator"
import { getData, login, createUser, deleteUser, updateUser } from "../controllers/users.controller.js"
import auth from "../middlewares/auth.js"

const userRoutes = Router()

const registerValidator = [
    body('name').notEmpty(),
    body('email').isEmail(),
    body('password').isLength({ min: 8 })
]
const loginValidator = [
    body('email').notEmpty(),
    body('password').notEmpty()
]

userRoutes.get('/data', auth, getData)
userRoutes.post('/register', registerValidator, createUser)
userRoutes.post('/login', loginValidator, login)
userRoutes.patch('/:id', auth, updateUser)
userRoutes.delete('/:id', auth, deleteUser)

export default userRoutes