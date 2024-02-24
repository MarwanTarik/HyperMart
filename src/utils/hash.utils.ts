import bcrypt from 'bcrypt'
import stageConfig from '../configs/main.config'

async function comparePassword (password: string, hashedPassword: string): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword)
}

async function hashPassword (password: string): Promise<string> {
  const salt = await bcrypt.genSalt(stageConfig.SALT_SIZE)
  return await bcrypt.hash(password, salt as string)
}

export {
  comparePassword,
  hashPassword
}
