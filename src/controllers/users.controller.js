import { validationResult } from "express-validator"
import bcrypt from 'bcrypt'

import jwt from "jsonwebtoken"

import { User } from "../models/User.js"

export const login = async (req, res) => {
    console.log(req.body)
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: 'Check the form and try again.', errors: errors.array() })
    }

    const { email, password } = req.body
    const user = await User.findOne({ where: { email } })

    if (!user) {
        return res.status(401).json({ message: 'Email or password incorrect.' })
    }

    if (!bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({ message: 'Email or password incorrect.' })
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_KEY, {
        algorithm: "HS256",
        expiresIn: Number(process.env.JWT_EXPIRE)
    })
    return res.json({
        message: 'Login successful',
        payload: { token }
    })


}

export const getData = async (req, res) => {
    const token = req.headers.authorization
    const { id } = jwt.decode(token.replace('Bearer ', ''))

    const user = await User.findOne({ where: { id }, attributes: { exclude: ['password'] } })

    if (!user) {
        return res.status(404).json({ message: 'User not found' })
    }

    return res.json({
        payload: user
    })
}

export const createUser = async (req, res) => {
    const { name, email, password } = req.body
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: "Check your form and try again.",
            payload: errors.array()
        })
    }

    const search = await User.findOne({ where: { email } })

    if (search) {
        return res.status(400).json({
            message: "Email address already in use",
        })
    }
    try {
        const user = await User.create({
            name,
            email,
            password
        })

        return res.json({
            message: "User created successfully",
            payload: user
        })

    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}

export const updateUser = async (req, res) => {
    const { id } = req.params
    const user = await User.findOne({ where: { id } })

    if (!user) {
        return res.status(404).json({ message: 'User not found' })
    }
    try {
        user.set(req.body)
        await user.save()
        return res.json({ message: 'User updated successfully', payload: user })
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}

export const deleteUser = async (req, res) => {
    const { id } = req.params

    try {
        await User.destroy({ where: { id } })
        return res.sendStatus(204)
    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}