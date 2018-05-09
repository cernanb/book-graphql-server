const express = require('express')
const expressGraphql = require('express-graphql')
const schema = require('./schema/schema')
const cors = require('cors')

const app = express()

app.use(cors())

app.use(
  '/graphql',
  expressGraphql({
    schema,
    graphiql: true,
  })
)

app.listen(4000, () => console.log('Express GraphQL Server Now Running On localhost:4000/graphql'))
