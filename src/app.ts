import express from 'express'
import morgan from 'morgan'
import corsOptionsDelegate from './configs/cors.config'
import cors from 'cors'
import userRouter from './routes/api/user.route'

const App = express()

App.use(cors(corsOptionsDelegate))
App.use(morgan('dev'))
App.use(express.json())
App.use(express.urlencoded({ extended: true }))

App.use('/api/v1', userRouter)

export default App
