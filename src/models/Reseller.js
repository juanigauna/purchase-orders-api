import { DataTypes} from 'sequelize'

import { sequelize } from '../database/index.js'
import {PurchaseOrder} from './PurchaseOrder.js'


export const Reseller = sequelize.define('resellers', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        type: DataTypes.BIGINT,
    },
    numRegistered: {
        type: DataTypes.STRING,
    },
    name: {
        type: DataTypes.STRING,
    }
})

Reseller.hasMany(PurchaseOrder, {
    foreignKey: 'resellerId',
    sourceKey: 'id'
})
PurchaseOrder.belongsTo(Reseller, {
    foreignKey: 'resellerId',
    targetKey: 'id'
})
