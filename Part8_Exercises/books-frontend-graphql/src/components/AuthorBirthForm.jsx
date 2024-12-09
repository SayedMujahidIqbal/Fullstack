import { useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { ALL_AUTHORS, SET_BIRTHYEAR } from "../queries";

const AuthorBirthForm = ({ setError }) => {
  const authorsResult = useQuery(ALL_AUTHORS);
  const [name, setName] = useState("");
  const [born, setBorn] = useState("");

  const [setYear] = useMutation(SET_BIRTHYEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      const messages = error.graphQLErrors.map((e) => e.message).join("\n");
      setError(messages);
    },
  });

  const submit = (event) => {
    event.preventDefault();

    if (name === "" || born === "") {
      setError("fields cannot be empty");
    } else {
      setYear({ variables: { name, born } });
      setName("");
      setBorn("");
    }
  };

  return (
    <div style={{ padding: "0.4rem" }}>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          name
          <select value={name} onChange={({ target }) => setName(target.value)}>
            <option value="default">select author</option>
            {authorsResult.data.allAuthors &&
              authorsResult.data.allAuthors.map((author) => (
                <option key={author.name}>{author.name}</option>
              ))}
          </select>
        </div>
        <div>
          year{" "}
          <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">Set</button>
      </form>
    </div>
  );
};

export default AuthorBirthForm;
