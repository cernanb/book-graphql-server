const graphql = require('graphql')
const data = require('./data/data')

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLList, GraphQLInt } = graphql

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    title: { type: GraphQLString },
    _id: { type: GraphQLID },
    price: { type: GraphQLString },
  }),
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    books: {
      type: new GraphQLList(BookType),
      args: { page: { type: GraphQLInt } },
      resolve(parent, args) {
        return data
          .map(book => Object.assign({}, book, { _id: book._id.$oid }))
          .slice((args.page - 1) * 10, args.page * 10)
      },
    },
    book: {
      type: BookType,
      args: { _id: { type: GraphQLString } },
      resolve(parent, args) {
        const book = data.find(book => book._id.$oid === args._id)
        const modifiedBook = Object.assign({}, book, { _id: book._id.$oid })
        return modifiedBook
        // return data.filter
      },
    },
  },
})

module.exports = new GraphQLSchema({
  query: RootQuery,
})
