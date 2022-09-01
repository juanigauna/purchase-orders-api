import { Router } from 'express'
import { body } from 'express-validator'
import { createBusiness, deleteBusiness, getList, updateBusiness } from '../controllers/business.controller.js'
import auth from '../middlewares/auth.js'

const businessRoutes = Router()

const createValidator = [
    body('name').notEmpty(),
    body('distributor').notEmpty()
]

businessRoutes.use(auth)

businessRoutes.get('/list', getList)
businessRoutes.post('/', createValidator, createBusiness)
businessRoutes.patch('/:id', updateBusiness)
businessRoutes.delete('/:id', deleteBusiness)

export default businessRoutes