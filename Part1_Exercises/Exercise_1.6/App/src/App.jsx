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
    <>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {all}</p>
      <p>average {!average ? '0' : average}</p>
      <p>positive {!positive ? '0' : positive}</p>
    </>
  )
}

const Button = (props) => {
  return(
    <button onClick={props.handleClick}>{props.text}</button>
  )
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
