import 'dotenv/config'

import express from 'express'
import cors from 'cors'
import userRoutes from './routes/users.routes.js'

import { sequelize } from './database/index.js'

import './models/User.js'
import './models/Business.js'
import './models/Reseller.js'
import './models/PurchaseOrder.js'
import './models/Product.js'
import resellerRoutes from './routes/resellers.routes.js'
import businessRoutes from './routes/businesses.routes.js'
import purchaseOrderRoutes from './routes/purchaseOrders.routes.js'
import productRoutes from './routes/products.routes.js'

class Server {
    constructor() {
        this.app = express()

        this.middlewares()

        this.routes()
    }

    middlewares() {
        this.app.use(cors({
            origin: process.env.CLIENT_ORIGIN
        }))
        this.app.use(express.json({type: '*/*'}))
        this.app.use(express.urlencoded({ extended: true }))
    }

    routes() {
        this.app.use('/user', userRoutes)
        this.app.use('/reseller', resellerRoutes)
        this.app.use('/business', businessRoutes)
        this.app.use('/purchase-order', purchaseOrderRoutes)
        this.app.use('/product', productRoutes)
    }


    async start() {
        try {
            await sequelize.sync({ logging: false })
            this.app.listen(process.env.PORT, () => console.log('Server started.'))
        } catch(err) {

        }
    }
}

export default Server