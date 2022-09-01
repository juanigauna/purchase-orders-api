import { validationResult } from "express-validator"
import jwt from 'jsonwebtoken'
import { Business } from "../models/Business.js"
import { PurchaseOrder } from "../models/PurchaseOrder.js"
import { Reseller } from "../models/Reseller.js"
import { User } from "../models/User.js"

export const getList = async (req, res) => {
    const token = req.headers.authorization
    const { id } = jwt.decode(token.replace('Bearer ', ''))

    const purchaseOrder = await PurchaseOrder.findAll({ where: { userId: id }, include: [Business, Reseller] })

    if (!purchaseOrder) {
        return res.status(404).json({ message: 'Purchase order not found' })
    }

    return res.json({ payload: purchaseOrder })
}

export const createPurchaseOrder = async (req, res) => {
    const errors = validationResult(req)
    const token = req.headers.authorization
    const { id } = jwt.decode(token.replace('Bearer ', ''))

    if (!errors.isEmpty()) {
        return res.status(400).json({ message: 'Check the form and try again', error: errors.array() })
    }
    const user = await User.findOne({ where: { id } })
    const business = await Business.findOne({ where: { id: req.body.businessId } })
    const reseller = await Reseller.findOne({ where: { id: req.body.resellerId } })

    if (!user || !business || !reseller) {
        return res.sendStatus(404)
    }

    if (business.userId !== id && reseller.userId !== id) {
        return res.sendStatus(401)
    }

    try {
        const purchaseOrder = await PurchaseOrder.create({...req.body, userId: id})
        return res.json({
            message: 'Purchase order created.',
            payload: purchaseOrder
        })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }


}

export const updatePurchaseOrder = async (req, res) => {
    try {
        const { id } = req.params
        const purchaseOrder = await PurchaseOrder.findOne({ where: { id } })
        purchaseOrder.set(req.body)
        await purchaseOrder.save()
        return res.json({ message: 'Purchase order updated.', payload: purchaseOrder })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const deletePurchaseOrder = async (req, res) => {
    try {
        const { id } = req.params
        await PurchaseOrder.destroy({ where: { id } })
        return res.status(204)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}