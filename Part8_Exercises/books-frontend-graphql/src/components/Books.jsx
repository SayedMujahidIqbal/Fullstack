import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { GET_BOOKS_WITH_GENRE } from "../queries";

const Books = ({ books }) => {
  const [booksWithGenres, setBooksWithGenres] = useState(books);
  const [genre, setGenre] = useState("");
  let extractGenres = [];
  books.map((b) => b.genres.map((g) => extractGenres.push(g)));
  const genres = [...new Set(extractGenres)];
  const result = useQuery(GET_BOOKS_WITH_GENRE, {
    variables: { genre: genre },
  });

  useEffect(() => {
    if (result.data) {
      setBooksWithGenres(result.data.allBooks);
    }
  }, [result.data]);

  const getBooksWithGenre = (g) => {
    setGenre(g);
  };

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {booksWithGenres.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {genres.map((gn) => (
        <button key={gn} onClick={() => getBooksWithGenre(gn)}>
          {gn}
        </button>
      ))}
    </div>
  );
};

export default Books;
