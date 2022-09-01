import { DataTypes } from 'sequelize'
import { sequelize } from "../database/index.js"

export const Product = sequelize.define('products', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        type: DataTypes.BIGINT,
    },
    poId: {
        type: DataTypes.BIGINT,
    },
    page: {
        type: DataTypes.STRING
    },
    code: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.TEXT
    },
    quantity: {
        type: DataTypes.INTEGER
    },
    price: {
        type: DataTypes.FLOAT
    },
    total: {
        type: DataTypes.FLOAT
    }
})
