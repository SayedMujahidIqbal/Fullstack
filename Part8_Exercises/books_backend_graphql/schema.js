const gql = require("graphql-tag");

const typeDefs = gql`
  type User {
    username: String!
    password: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Author {
    name: String!
    born: Int
    booksCount: [Book!]!
  }

  type Book {
    title: String!
    author: Author!
    published: Int!
    genres: [String!]!
    id: ID!
  }

  type Subscription {
    bookAdded: Book!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(name: String!, born: Int!, bookCount: Int): Author
    createUser(
      username: String!
      password: String!
      favoriteGenre: String!
    ): User
    login(username: String!, password: String!): Token
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(genre: String, author: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }
`;

module.exports = typeDefs;
