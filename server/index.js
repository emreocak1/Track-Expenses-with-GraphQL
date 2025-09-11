import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { expressMiddleware } from '@as-integrations/express5';
import express from 'express';
import http from 'http';
import cors from 'cors';
import dotenv from 'dotenv'
import passport from 'passport'
import session from 'express-session';
import connectMongo from 'connect-mongodb-session'; //? ConnectMongoDBSession
import { buildContext } from 'graphql-passport';

import mergedResolvers from './resolvers/index.js'
import mergedTypeDefs from "./typeDefs/index.js";

import {connectDB} from './database/connectDB.js'
import {configurePassport} from './passport/passport.config.js'

dotenv.config()
configurePassport()

const app = express()
const httpServer = http.createServer(app)

const MongoDBStore = connectMongo(session)
const store = new MongoDBStore({
  uri: process.env.MONGO_URI,
  collection: "sessions"
})

store.on('error',(error)=>{
  console.log(error)
})

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false, //* Specifies whether to save the session to the store on every request
    saveUninitialized: false, //* Specifies whether to save the uninitialized sessions
    cookie: {
      maxAge: 1000*60*60*24*7, // 1 WEEK
      httpOnly: true //! Preventing from XSS attacks
    },
    store: store
  })
)


app.use(passport.initialize())
app.use(passport.session())

const server = new ApolloServer({
  typeDefs: mergedTypeDefs,
  resolvers: mergedResolvers,
  plugins: [ApolloServerPluginDrainHttpServer({httpServer})]
})

await server.start()

app.use(
  '/graphql',
  cors({ origin:'http://localhost:3000',credentials:true }),
  express.json(),
  expressMiddleware(server,{
    context: async({req,res}) => buildContext({req,res})
  })
)

await new Promise((resolve)=> httpServer.listen({port:4000},resolve))
await connectDB()

console.log('Server start at port 4000/graphql');
