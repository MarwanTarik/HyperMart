import config from './config/main'
import App from './app'

App.listen(config.PORT, function startServer () {
  console.log(`server ON http://localhost:${config.PORT}`)
})
