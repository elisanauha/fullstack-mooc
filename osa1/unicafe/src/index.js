import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>{props.name}</button>
  )
}

const Stats = (props) => {
  return (
    <p>{props.text} {props.stat}</p>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => {
    setGood(good + 1)
  }

  const handleNeutral = () => {
    setNeutral(neutral + 1)
  }

  const handleBad = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>Give feedback</h1>
      <Button name="good" handleClick={handleGood}></Button>
      <Button name="neutral" handleClick={handleNeutral}></Button>
      <Button name="bad" handleClick={handleBad}></Button>
      <h1>Statistics</h1>
      <Stats text="good" stat={good}></Stats>
      <Stats text="neutral" stat={neutral}></Stats>
      <Stats text="bad" stat={bad}></Stats>
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)
