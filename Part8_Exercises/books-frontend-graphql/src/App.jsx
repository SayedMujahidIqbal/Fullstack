import { Link, Route, Routes } from "react-router-dom";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import { useQuery } from "@apollo/client";
import { ALL_AUTHORS, ALL_BOOKS } from "./queries";
import Notify from "./components/Notify";
import { useState } from "react";

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const booksResult = useQuery(ALL_BOOKS);
  const authorsResult = useQuery(ALL_AUTHORS);

  if (booksResult.loading || authorsResult.loading) {
    return <div>Loading....</div>;
  }

  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 3000);
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
        <Link to="/add-book" style={{ paddingRight: "0.5rem" }}>
          add book
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
        </Routes>
      </div>
    </div>
  );
};

export default App;
