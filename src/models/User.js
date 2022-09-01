import { DataTypes } from 'sequelize'
import bcrypt from 'bcrypt'

import { sequelize } from "../database/index.js"
import {Business} from './Business.js'
import {Reseller} from './Reseller.js'
import {PurchaseOrder} from './PurchaseOrder.js'
import {Product} from './Product.js'

export const User = sequelize.define('users', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        set(name) {
            this.setDataValue('name', name.toLowerCase())
        }
    },
    email: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING,
        set(password) {
            const hash = bcrypt.hashSync(password, 10)
            this.setDataValue('password', hash)
        }
    }
})

User.hasMany(Business, {
    foreignKey: 'userId',
    sourceKey: 'id'
})
Business.belongsTo(User, {
    foreignKey: 'userId',
    targetKey: 'id'
})

User.hasMany(Reseller, {
    foreignKey: 'userId',
    sourceKey: 'id'
})
Reseller.belongsTo(User, {
    foreignKey: 'userId',
    targetKey: 'id'
})

User.hasMany(PurchaseOrder, {
    foreignKey: 'userId',
    sourceKey: 'id'
})
PurchaseOrder.belongsTo(User, {
    foreignKey: 'userId',
    targetKey: 'id'
})

User.hasMany(Product, {
    foreignKey: 'userId',
    sourceKey: 'id'
})
Product.belongsTo(User, {
    foreignKey: 'userId',
    targetKey: 'id'
})