import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { expressMiddleware } from '@as-integrations/express5';
import express from 'express';
import http from 'http';
import cors from 'cors';
import dotenv from 'dotenv'


import mergedResolvers from './resolvers/index.js'
import mergedTypeDefs from "./typeDefs/index.js";

import {connectDB} from './database/connectDB.js'

dotenv.config()

const app = express()
const httpServer = http.createServer(app)

const server = new ApolloServer({
  typeDefs: mergedTypeDefs,
  resolvers: mergedResolvers,
  plugins: [ApolloServerPluginDrainHttpServer({httpServer})]
})

await server.start()

app.use(
  '/',
  cors(),
  express.json(),
  expressMiddleware(server,{
    context: async({req}) => ({req})
  })
)

await new Promise((resolve)=> httpServer.listen({port:4000},resolve))
await connectDB()

console.log('Server start at port 4000');
