import { validationResult } from "express-validator"
import jwt from "jsonwebtoken"
import { PurchaseOrder } from "../models/PurchaseOrder.js"
import { Reseller } from "../models/Reseller.js"
import { User } from "../models/User.js"

export const getList = async (req, res) => {
    const token = req.headers.authorization
    const { id } = jwt.decode(token.replace('Bearer ', ''))

    try {
        const list = await Reseller.findAll({ where: { userId: id }, include: [PurchaseOrder]})
        return res.json({
            payload: list
        })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const getReseller = async (req, res) => {
    const { id } = req.params

    try {
        const reseller = await Reseller.findOne({ where: { id }, include: [User, PurchaseOrder] })
        return res.json({
            payload: reseller
        })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const createReseller = async (req, res) => {
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
        const reseller = await Reseller.create({...req.body, userId: id})
        return res.json({
            message: 'Reseller created.',
            payload: reseller
        })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const updateReseller = async (req, res) => {
    const { id } = req.params

    try {
        const reseller = await Reseller.findOne({ where: { id } })
        reseller.set(req.body)
        await reseller.save()

        return res.json({ message: 'Reseller updated.' })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const deleteReseller = async (req, res) => {
    try {
        const { id } = req.params
        await Reseller.destroy({ where: { id } })
        return res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}