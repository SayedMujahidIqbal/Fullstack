import { useEffect, useState } from "react";
import { Diary, Notification, ValidationError } from "./types";
import { createDiary, getAllDiaries } from "./service/diaryService";
import axios from "axios";

const Notify = (props: Notification) => {
  return <div style={{ color: "red" }}>{props.message}</div>;
};

function App() {
  const [diares, setDiaries] = useState<Diary[]>([]);
  const [date, setDate] = useState("");
  const [comment, setComment] = useState("");
  const [visibility, setVisibility] = useState("");
  const [weather, setWeather] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    getAllDiaries().then((data) => setDiaries(data));
  }, []);

  const createNewDiary = (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (!date || !comment || !visibility || !weather) {
      setMessage("Fields cannot be empty");
      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
    const newDiary = {
      date,
      comment,
      visibility,
      weather,
    };
    createDiary(newDiary)
      .then((data) => setDiaries(diares.concat(data)))
      .catch((error: unknown) => {
        if (
          axios.isAxiosError<ValidationError, Record<string, unknown>>(error)
        ) {
          const e: string[] | unknown = error.response?.data.error;
          setMessage(e.map((e: string | unknown) => e.message));
          setTimeout(() => {
            setMessage("");
          }, 3000);
        } else {
          setMessage(error);
        }
      });
    setDate("");
    setComment("");
    setWeather("");
    setVisibility("");
  };

  return (
    <div>
      <h1>Create New Diary</h1>
      {message && <Notify message={message} />}
      <form onSubmit={createNewDiary}>
        <div>
          date{" "}
          <input
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
        </div>
        <div>
          visibility
          <input
            type="radio"
            value="great"
            onChange={(event) => setVisibility(event.target.value)}
          />
          great
          <input
            type="radio"
            value="good"
            onChange={(event) => setVisibility(event.target.value)}
          />
          good
          <input
            type="radio"
            value="ok"
            onChange={(event) => setVisibility(event.target.value)}
          />
          ok
          <input
            type="radio"
            value="poor"
            onChange={(event) => setVisibility(event.target.value)}
          />
          poor
        </div>
        <div>
          weather
          <input
            type="radio"
            value="sunny"
            onChange={(event) => setWeather(event.target.value)}
          />
          sunny
          <input
            type="radio"
            value="rainy"
            onChange={(event) => setWeather(event.target.value)}
          />
          rainy
          <input
            type="radio"
            value="cloudy"
            onChange={(event) => setWeather(event.target.value)}
          />
          cloudy
          <input
            type="radio"
            value="stormy"
            onChange={(event) => setWeather(event.target.value)}
          />
          stormy
          <input
            type="radio"
            value="windy"
            onChange={(event) => setWeather(event.target.value)}
          />
          windy
        </div>
        <div>
          comment{" "}
          <input
            value={comment}
            onChange={(event) => setComment(event.target.value)}
          />
        </div>
        <button type="submit">save diary</button>
      </form>
      <h1>Illari's Diaries</h1>
      <table>
        <tbody>
          <tr>
            <th>date</th>
            <th>visibility</th>
            <th>weather</th>
          </tr>
          {diares.map((diary: Diary) => (
            <tr key={diary.id}>
              <td>{diary.date}</td>
              <td>{diary.visibility}</td>
              <td>{diary.weather}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
