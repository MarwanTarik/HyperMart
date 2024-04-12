import express from 'express'
import morgan from 'morgan'
import corsOptionsDelegate from './configs/cors.config'
import cors from 'cors'
import authRouter from './routes/api/auth.route'
import userRouter from './routes/api/user.route'
import productRouter from './routes/api/product.route'
import orderRouter from './routes/api/order.route'

const App = express()

App.use(cors(corsOptionsDelegate))
App.use(morgan('dev'))
App.use(express.json())
App.use(express.urlencoded({ extended: true }))

App.use('/api/v1', authRouter)
App.use('/api/v1', userRouter)
App.use('/api/v1', productRouter)
App.use('/api/v1', orderRouter)

export default App
