// Load env file
require('dotenv').config()

import * as torm from 'typeorm'
import * as fs from 'fs'
import * as util from 'util'
import {
  ApolloServer,
  makeExecutableSchema
} from 'apollo-server-express'

import { Box } from './types'
import { createDbConnection, seed } from './models'
import { resolvers } from './resolvers'
import { auths } from './routes'
import { generateAdminModel } from './services/Admin'

const PORT = process.env.PORT
// const MODE = process.env.MODE || 'dev'

const express = require('express')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const readFile = util.promisify(fs.readFile);


async function start() {
  const box = await createDbConnection()
  if (process.env.DB_SEED != 'false') {
    await seed(box)
  }

  const expressApp = express()
  expressApp.use(cors())
  expressApp.use(fileUpload())
  expressApp.use(express.static('static'))

  await auths({ app: expressApp, repo: box.repo })

  const textGql = (await readFile('schema.graphql')).toString();
  const schema = makeExecutableSchema({
    typeDefs: textGql,
    resolvers: resolvers
  })

  const apolloServer = new ApolloServer({ 
    schema,
    context: ({ req }) => {
      let user = req.user
      let authToken = req.authToken
      console.log('user ', user)
      return {
        authToken: req.authToken,
        user: req.user,
        models: {
          Admin: generateAdminModel({ user, box, authToken })
        }
      }
    }
  })

  apolloServer.applyMiddleware({ app: expressApp })

  expressApp.listen({ port: PORT }, () => {
    console.log(`SERVER RUN AT ${PORT}`)
  })
}

start()