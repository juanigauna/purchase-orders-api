import { DataTypes } from 'sequelize'
import { sequelize } from "../database/index.js"
import { Product } from './Product.js'

export const PurchaseOrder = sequelize.define('purchaseOrders', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        type: DataTypes.BIGINT
    },
    date: {
        type: DataTypes.DATE
    },
    campaign: {
        type: DataTypes.STRING
    },
    startDate: {
        type: DataTypes.DATE
    },
    endDate: {
        type: DataTypes.DATE,
    },
    businessId: {
        type: DataTypes.BIGINT,
    },
    resellerId: {
        type: DataTypes.BIGINT
    }
})

PurchaseOrder.hasMany(Product, {
    foreignKey: 'poId',
    sourceKey: 'id',
})
Product.belongsTo(PurchaseOrder, {
    foreignKey: 'poId',
    targetKey: 'id'
})