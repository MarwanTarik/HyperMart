import development from './development'
import 'dotenv/config'

const appConfigs = new Map()
appConfigs.set('development', development)

process.env.NODE_ENV = process.env.NODE_ENV ?? 'development'
const stage = process.env.STAGE

const { port } = appConfigs.get(stage)

const stageConfig = {
  stage,
  port
}

export default stageConfig
