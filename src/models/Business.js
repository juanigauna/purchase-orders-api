import { DataTypes } from 'sequelize'
import { sequelize } from "../database/index.js"
import {PurchaseOrder} from './PurchaseOrder.js'

export const Business = sequelize.define('business', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        type: DataTypes.BIGINT,
    },
    name: {
        type: DataTypes.STRING
    },
    distributor: {
        type: DataTypes.STRING
    }
})

Business.hasMany(PurchaseOrder, {
    foreignKey: 'businessId',
    sourceKey: 'id'
})
PurchaseOrder.belongsTo(Business, {
    foreignKey: 'businessId',
    targetKey: 'id'
})