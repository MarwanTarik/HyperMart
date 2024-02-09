import express from 'express'
import morgan from 'morgan'

const App = express()

App.use(morgan('dev'))
App.use(express.json())
App.use(express.urlencoded({ extended: true }))

export default App
