import { useState } from "react"

const Statistics = (props) => {
  if(props.good === 0 && props.neutral === 0 && props.bad === 0){
    return <p>No feedback given</p>
  }
  const { good, neutral, bad } = props
  const all = good + neutral + bad
  const average = (good - bad) / all
  const positive = good / all * 100

  return(
    <table>
      <tbody>
        <tr>
          <td><StatisticsLine text="good" value={good} /></td>
        </tr>
        <tr>
          <td><StatisticsLine text="neutral" value={neutral} /></td>
        </tr>
        <tr>
          <td><StatisticsLine text="bad" value={bad} /></td>
        </tr>
        <tr>
          <td><StatisticsLine text="all" value={all} /></td>
        </tr>
        <tr>
          <td><StatisticsLine text="average" value={!average ? 0 : average} /></td>
        </tr>
        <tr>
          <td><StatisticsLine text="positive" value={!positive ? 0 : positive} /></td>
        </tr>
      </tbody>
    </table>
  )
}

const Button = (props) => {
  return(
    <button onClick={props.handleClick}>{props.text}</button>
  )
}

const StatisticsLine = (props) => {
  return <p>{props.text} {props.value}</p>
}

function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)  
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGoodClick} text="good" />
      <Button handleClick={handleNeutralClick} text="neutral" />
      <Button handleClick={handleBadClick} text="bad" />
      <h1>statistics</h1>
      <Statistics 
        good={good} 
        neutral={neutral} 
        bad={bad}
      />
    </div>
  )
}

export default App
