import { Router } from 'express'
import { body } from 'express-validator'
import { createPurchaseOrder, deletePurchaseOrder, getList, updatePurchaseOrder } from '../controllers/purchaseOrders.controller.js'
import auth from '../middlewares/auth.js'

const purchaseOrderRoutes = Router()

const createValidator = [
    body('date').isDate(),
    body('campaign').notEmpty(),
    body('startDate').isDate(),
    body('endDate').isDate(),
    body('businessId').notEmpty(),
    body('resellerId').notEmpty()
]

purchaseOrderRoutes.use(auth)

purchaseOrderRoutes.get('/list', getList)
purchaseOrderRoutes.post('/', createValidator, createPurchaseOrder)
purchaseOrderRoutes.patch('/:id', updatePurchaseOrder)
purchaseOrderRoutes.delete('/:id', deletePurchaseOrder)

export default purchaseOrderRoutes