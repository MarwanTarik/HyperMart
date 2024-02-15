import config from './configs/main'
import App from './app'

App.listen(config.PORT, function startServer () {
  console.log(`server ON http://localhost:${config.PORT}`)
})
