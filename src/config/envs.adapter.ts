import 'dotenv/config'
import { get } from 'env-var'

export const envs = {
  PORT: get('PORT').required().asPortNumber(),
  ADMIN_TOKEN: get('ADMIN_TOKEN').required().asString(),
  JWT_TOKEN: get('JWT_TOKEN').required().asString(),
  MONGO_URI: get('MONGO_URI').required().asString(),
  MONGO_DB_NAME: get('MONGO_DB_NAME').required().asString()
}
