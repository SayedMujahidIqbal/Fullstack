import { gql } from "@apollo/client";

export const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      author {
        name
        born
        booksCount
      }
      published
      genres
    }
  }
`;

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      booksCount
    }
  }
`;

export const CREATE_BOOK = gql`
  mutation addBook(
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      title
      author {
        name
        born
        booksCount
      }
      published
      genres
    }
  }
`;

export const SET_BIRTHYEAR = gql`
  mutation editAuthor($name: String!, $born: String!) {
    editAuthor(name: $name, born: $born) {
      name
      born
      booksCount
    }
  }
`;

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;

export const GET_BOOKS_WITH_GENRE = gql`
  query ($genre: String!) {
    allBooks(genre: $genre) {
      title
      published
      author {
        name
        born
        booksCount
      }
      genres
    }
  }
`;
