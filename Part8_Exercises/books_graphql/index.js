const config = require("./utils/config");
const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { GraphQLError } = require("graphql");
const gql = require("graphql-tag");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Book = require("./models/Book");
const Author = require("./models/Author");
const mongoose = require("mongoose");
const User = require("./models/User");

const MONGODB_URI = config.MONGODB_URI;

console.log("connecting to", MONGODB_URI);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connection to MongoDB", error.message);
  });

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
    booksCount: Int
  }

  type Book {
    title: String!
    author: Author!
    published: Int!
    genres: [String!]!
    id: ID!
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

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (!args.genre && !args.author) {
        return Book.find({}).populate("author");
      }
      if (args.genre) {
        return Book.find({ genres: { $in: [args.genre] } }).populate("author");
      } else {
        const author = await Author.findOne({ name: args.author });
        if (!author) {
          throw new GraphQLError("Author does not exist", {
            extensions: {
              code: "BAD_USER_INPUT",
              invalidArgs: args.author,
            },
          });
        } else {
          return Book.find({ author: author._id }).populate("author");
        }
      }
    },
    allAuthors: async () => Author.find({}),
  },
  Author: {
    booksCount: async (root) =>
      Book.find({ author: root._id }).countDocuments(),
  },
  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new GraphQLError("not authenticated", {
          extensions: "BAD_USER_INPUT",
        });
      }
      if (args.title.length < 5 || args.author.length < 4) {
        throw new GraphQLError(
          "Author and Title should be atleast 4 and 5 characters long",
          {
            extensions: {
              code: "BAD_USER_INPUT",
              invalidArgs: args.title,
            },
          }
        );
      }
      const author = await Author.findOne({ name: args.author });
      const book = new Book({ ...args });
      if (!author) {
        try {
          const newAuthor = new Author({ name: args.author, born: null });
          await newAuthor.save();
          const newAddedAuthor = await Author.findOne({ name: args.author });
          book.author = newAddedAuthor._id;
          await book.save();
        } catch (error) {
          throw new GraphQLError("Saving book failed", {
            extensions: {
              code: "BAD_USER_INPUT",
              invalidArgs: args.name,
              error,
            },
          });
        }
      } else {
        book.author = author._id;
        await book.save();
      }
      return Book.populate(book, { path: "author" });
    },
    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new GraphQLError("not authenticated", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }
      const author = await Author.findOne({ name: args.name });
      if (!author) {
        throw new GraphQLError("Author does not exist", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
          },
        });
      }
      author.born = Number(args.born);
      try {
        author.born = Number(args.born);
        await author.save();
      } catch (error) {
        throw new GraphQLError("Setting Birth year failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
            error,
          },
        });
      }
      return author;
    },
    createUser: async (root, args) => {
      const salt = 10;
      const hashed_password = await bcrypt.hash(args.password, salt);
      const user = new User({ ...args, passwordHash: hashed_password });

      return user.save().catch((error) => {
        throw new GraphQLError("Creating the user failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.username,
            error,
          },
        });
      });
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });
      const correctPassword =
        user === null
          ? false
          : await bcrypt.compare(args.password, user.passwordHash);
      if (!user || !correctPassword) {
        throw new GraphQLError("Wrong credentials", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.startsWith("Bearer ")) {
      const decodedToken = jwt.verify(
        auth.substring(7),
        process.env.JWT_SECRET
      );

      const currentUser = await User.findById(decodedToken.id);

      return { currentUser };
    }
  },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
