import { validationResult } from "express-validator"
import { Product } from "../models/Product.js"
import { PurchaseOrder } from "../models/PurchaseOrder.js"
import { User } from "../models/User.js"

export const getProduct = async (req, res) => {
    const { id } = req.params
    const product = await Product.findOne({ where: { id }, include: [User, PurchaseOrder] })

    if (!product) {
        return res.status(404).json({ message: 'Product not found' })
    }

    return res.json({ payload: product })
}

export const createProduct = async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({ message: 'Check the form and try again', error: errors.array() })
    }
    const user = await User.findOne({ where: { id: req.body.userId } })
    const purchaseOrder = await PurchaseOrder.findOne({ where: { id: req.body.poId } })

    if (!user || !purchaseOrder) {
        return res.sendStatus(404)
    }

    if (purchaseOrder.userId !== req.body.userId) {
        return res.sendStatus(401)
    }

    const { 
        userId,
        poId,
        page,
        code,
        description,
        quantity,
        price
    } = req.body

    try {
        const product = await Product.create({
            userId,
            poId,
            page,
            code,
            description,
            quantity,
            price,
            total: price*quantity
        })
        return res.json({
            message: 'Product created.',
            payload: product
        })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }


}

export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params
        const product = await Product.findOne({ where: { id } })
        product.set(req.body)
        await product.save()
        return res.json({ message: 'Purchase order updated.', payload: product })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params
        await Product.destroy({ where: { id } })
        return res.status(204)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}