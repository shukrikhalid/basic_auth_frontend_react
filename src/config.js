import dotenv from 'dotenv'
import dotenvExpand from 'dotenv-expand'

const myEnv = dotenv.config()
dotenvExpand(myEnv)

export default {
  API_URL: process.env.REACT_APP_API_URL
}