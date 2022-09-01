import { Router } from 'express'
import { body } from 'express-validator'
import { createReseller, deleteReseller, getReseller, getList, updateReseller } from '../controllers/resellers.controller.js'
import auth from '../middlewares/auth.js'

const resellerRoutes = Router()

const createValidator = [
    body('numRegistered').notEmpty(),
    body('name').notEmpty(),
]

resellerRoutes.use(auth)

resellerRoutes.get('/list', getList)
resellerRoutes.get('/:id', getReseller)
resellerRoutes.post('/', createValidator, createReseller)
resellerRoutes.patch('/:id', updateReseller)
resellerRoutes.delete('/:id', deleteReseller)

export default resellerRoutes