import { validationResult } from "express-validator"
import jwt from 'jsonwebtoken'
import { Business } from "../models/Business.js"
import { PurchaseOrder } from "../models/PurchaseOrder.js"
import { User } from "../models/User.js"
export const getList = async (req, res) => {
    const token = req.headers.authorization
    const { id } = jwt.decode(token.replace('Bearer ', ''))

    try {
        const list = await Business.findAll({ where: { userId: id }, include: [PurchaseOrder] })
        return res.json({
            payload: list
        })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const createBusiness = async (req, res) => {
    const errors = validationResult(req)
    const token = req.headers.authorization
    const { id } = jwt.decode(token.replace('Bearer ', ''))

    if (!errors.isEmpty()) {
        return res.status(400).json({ message: 'Check your form and try again.', payload: errors.array() })
    }

    const user = await User.findOne({ where: { id } })
    if (!user) {
        return res.status(404).json({ message: 'User not found' })
    }

    try {
        const business = await Business.create({ ...req.body, userId: id })
        return res.json({
            message: 'Business created.',
            payload: business
        })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const updateBusiness = async (req, res) => {
    const { id } = req.params

    try {
        const business = await Business.findOne({ where: { id } })
        business.set(req.body)
        await Business.save()

        return res.json({ message: 'Business updated.' })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const deleteBusiness = async (req, res) => {
    try {
        const { id } = req.params
        await Business.destroy({ where: { id } })
        return res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}