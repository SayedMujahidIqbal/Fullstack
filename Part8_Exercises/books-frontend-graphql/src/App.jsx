import { useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import { useApolloClient, useQuery, useSubscription } from "@apollo/client";
import { ALL_AUTHORS, ALL_BOOKS, BOOK_ADDED } from "./queries";
import Notify from "./components/Notify";
import LoginForm from "./components/LoginForm";

export const updateCache = (cache, query, addedBook) => {
  const uniqByName = (a) => {
    let seen = new Set();
    return a.filter((item) => {
      let k = item.title;
      return seen.has(k) ? false : seen.add(k);
    });
  };
  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniqByName(allBooks.concat(addedBook)),
    };
  });
  cache.updateQuery({ query: ALL_AUTHORS }, ({ allAuthors }) => {
    return {
      allAuthors: allAuthors.concat({
        name: addedBook.author.name,
        born: null,
      }),
    };
  });
};

const App = () => {
  const client = useApolloClient();
  const [token, setToken] = useState(localStorage.getItem("bookapp-user"));
  const [errorMessage, setErrorMessage] = useState(null);
  const booksResult = useQuery(ALL_BOOKS);
  const authorsResult = useQuery(ALL_AUTHORS);

  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      const addedBook = data.data.bookAdded;
      notify(`${addedBook.title} added`);
      updateCache(client.cache, { query: ALL_BOOKS }, addedBook);
    },
  });

  if (booksResult.loading || authorsResult.loading) {
    return <div>Loading....</div>;
  }

  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  return (
    <div>
      <div>
        <Link to="/" style={{ paddingRight: "0.5rem" }}>
          books
        </Link>
        <Link to="/authors" style={{ paddingRight: "0.5rem" }}>
          authors
        </Link>
        {token && (
          <Link to="/add-book" style={{ paddingRight: "0.5rem" }}>
            add book
          </Link>
        )}
        <Link to="/login" onClick={logout}>
          {token ? "logout" : "login"}
        </Link>
      </div>
      <Notify message={errorMessage} />
      <div style={{ padding: "0.3rem" }}>
        <Routes>
          <Route
            path="/"
            element={<Books books={booksResult.data.allBooks} />}
          />
          <Route
            path="/authors"
            element={
              <Authors
                authors={authorsResult.data.allAuthors}
                setError={notify}
              />
            }
          />
          <Route path="/add-book" element={<NewBook setError={notify} />} />
          <Route
            path="/login"
            element={<LoginForm setError={notify} setToken={setToken} />}
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;
