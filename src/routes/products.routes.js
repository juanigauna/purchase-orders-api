import { Router } from 'express'
import { body } from 'express-validator'
import { createProduct, deleteProduct, getProduct, updateProduct } from '../controllers/products.controller.js'
import auth from '../middlewares/auth.js'


const productRoutes = Router()

const createValidator = [
    body('userId').notEmpty(),
    body('poId').notEmpty(),
    body('page').notEmpty(),
    body('code').notEmpty(),
    body('description').notEmpty(),
    body('quantity').notEmpty(),
    body('price').notEmpty()
]

productRoutes.use(auth)

productRoutes.get('/:id', getProduct)
productRoutes.post('/', createValidator, createProduct)
productRoutes.patch('/:id', updateProduct)
productRoutes.delete('/:id', deleteProduct)

export default productRoutes