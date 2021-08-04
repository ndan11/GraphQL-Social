const {ApolloServer} = require('apollo-server')
const {typeDefs} = require('./schema/index.js')
const {resolvers} = require('./resolvers/index.js')
const mongoose = require('mongoose')
const config = require('../config.js')

const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen().then(({url}) => {
    console.log(`Server started on ${url}`)
})

mongoose.Promise = global.Promise
mongoose.connect(config.mongoUri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false })
mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${config.mongoUri}`)
})
